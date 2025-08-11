"use client";

import React, { useState } from "react";
import {
  DataMeetings,
  SampleMeetingMinutes,
} from "@/lib/detailMeeting/sampleData";
import {
  getTypeBadgeVariant,
  getStatusBadgeVariant,
  getActionStatusBadge,
  formatDate,
  formatTime,
  formatDateTime,
} from "@/lib/detailMeeting/utils";
import type { Meeting, MeetingMinutes } from "@/lib/detailMeeting/types";

// Komponen hasil pecahan:
import MeetingHeader from "@/components/detailMeeting/MeetingHeader";
import MeetingInfoCard from "@/components/detailMeeting/MeetingInfoCard";
import AttendanceSection from "@/components/detailMeeting/AttendanceSection";
import AgendaList from "@/components/detailMeeting/AgendaList";
import DecisionsList from "@/components/detailMeeting/DecisionsList";
import ActionItemsSidebar from "@/components/detailMeeting/ActionItemsSidebar";
import MeetingNotesSection from "@/components/detailMeeting/MeetingNotesSection";
import MeetingInfoSidebar from "@/components/detailMeeting/MeetingInfoSidebar";
import AlertIncompleteItems from "@/components/detailMeeting/AlertIncompleteItems";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Export PDF function without additional notes
function exportToPDFWithoutNotes(meeting: Meeting, minutes: MeetingMinutes) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Notulensi - ${meeting.title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 210mm;
          margin: 0 auto;
          padding: 20mm;
          background: white;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .meeting-info {
          background: #f8fafc;
          border-left: 4px solid #2563eb;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .meeting-info h2 {
          font-size: 20px;
          color: #1e40af;
          margin-bottom: 15px;
          font-weight: bold;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 10px;
        }
        
        .info-item {
          display: flex;
          align-items: center;
        }
        
        .info-item strong {
          min-width: 100px;
          color: #374151;
          font-weight: 600;
        }
        
        .section {
          margin: 30px 0;
          page-break-inside: avoid;
        }
        
        .section h3 {
          font-size: 18px;
          color: #1e40af;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
          margin-bottom: 15px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .attendees {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .attendance-group h4 {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        
        .present h4 { color: #059669; }
        .absent h4 { color: #dc2626; }
        
        .participant-list {
          list-style: none;
        }
        
        .participant-list li {
          padding: 5px 0;
          padding-left: 20px;
          position: relative;
        }
        
        .participant-list.present li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #059669;
          font-weight: bold;
        }
        
        .participant-list.absent li::before {
          content: "✗";
          position: absolute;
          left: 0;
          color: #dc2626;
          font-weight: bold;
        }
        
        .agenda-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .agenda-item h4 {
          font-size: 16px;
          margin-bottom: 8px;
          color: #374151;
        }
        
        .agenda-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .agenda-status.completed {
          background: #dcfce7;
          color: #166534;
        }
        
        .agenda-status.incomplete {
          background: #fef3c7;
          color: #92400e;
        }
        
        .agenda-notes {
          color: #6b7280;
          font-style: italic;
          margin-top: 8px;
        }
        
        .decision-item {
          background: #eff6ff;
          border-left: 4px solid #3b82f6;
          padding: 15px;
          margin: 10px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .decision-item h4 {
          color: #1e40af;
          margin-bottom: 8px;
          font-size: 16px;
        }
        
        .decision-by {
          font-size: 12px;
          color: #6b7280;
          margin-top: 8px;
          font-weight: 600;
        }
        
        .action-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
          position: relative;
        }
        
        .action-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .action-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .action-status.completed {
          background: #dcfce7;
          color: #166534;
        }
        
        .action-status.in-progress {
          background: #ddd6fe;
          color: #6b21a8;
        }
        
        .action-status.pending {
          background: #fef3c7;
          color: #92400e;
        }
        
        .action-due {
          font-size: 12px;
          color: #6b7280;
          float: right;
        }
        
        .action-task {
          font-weight: 600;
          margin: 8px 0;
          color: #374151;
        }
        
        .action-assignee {
          font-size: 14px;
          color: #6b7280;
        }
        
        .notes-section {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        
        .footer-info {
          margin: 10px 0;
        }
        
        .next-meeting {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .next-meeting h4 {
          color: #92400e;
          margin-bottom: 5px;
        }
        
        /* Signature Section Styles */
        .signature-section {
          margin-top: 50px;
          padding: 30px 0;
          border-top: 2px solid #e5e7eb;
          page-break-inside: avoid;
        }
        
        .signature-section h3 {
          font-size: 18px;
          color: #1e40af;
          text-align: center;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: bold;
        }
        
        .signature-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 30px;
        }
        
        .signature-box {
          text-align: center;
          flex: 1;
          margin: 0 20px;
        }
        
        .signature-title {
          font-weight: bold;
          color: #374151;
          margin-bottom: 15px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .signature-line {
          border-bottom: 2px solid #374151;
          margin: 60px auto 15px;
          width: 200px;
          height: 80px;
          position: relative;
        }
        
        .signature-name {
          font-weight: 600;
          color: #1f2937;
          font-size: 14px;
          margin-top: 10px;
        }
        
        .signature-position {
          font-size: 12px;
          color: #6b7280;
          font-style: italic;
          margin-top: 5px;
        }
        
        .signature-date {
          font-size: 12px;
          color: #6b7280;
          margin-top: 15px;
        }
        
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          
          .section {
            page-break-inside: avoid;
          }
          
          .signature-section {
            page-break-inside: avoid;
            margin-top: 50px;
          }
        }
        
        .status-summary {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        
        .status-summary.warning {
          background: #fffbeb;
          border-color: #fed7aa;
        }
        
        .status-summary h4 {
          color: #dc2626;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .status-summary.warning h4 {
          color: #d97706;
        }
      </style>
    </head>
    <body>
      <!-- Header -->
      <div class="header">
        <h1>Notulensi Rapat</h1>
        <p style="color: #6b7280; font-size: 16px; margin-top: 10px;">${
          meeting.title
        }</p>
      </div>

      <!-- Meeting Information -->
      <div class="meeting-info">
        <h2>Informasi Meeting</h2>
        <div class="info-grid">
          <div class="info-item">
            <strong>Tanggal:</strong>
            <span>${formatDate(meeting.date)}</span>
          </div>
          <div class="info-item">
            <strong>Waktu:</strong>
            <span>${formatTime(meeting.startTime)} - ${formatTime(
    meeting.endTime
  )}</span>
          </div>
          <div class="info-item">
            <strong>Lokasi:</strong>
            <span>${meeting.location}</span>
          </div>
          <div class="info-item">
            <strong>Organizer:</strong>
            <span>${meeting.organizer}</span>
          </div>
        </div>
      </div>

      <!-- Status Summary -->
      ${
        minutes.agendaItems.filter((item) => item.discussed && !item.completed)
          .length > 0 ||
        minutes.actionItems.filter((item) => item.status !== "completed")
          .length > 0
          ? `<div class="status-summary warning">
          <h4>⚠️ Perhatian: Ada item yang belum selesai</h4>
          <p>Meeting sudah selesai namun masih ada ${
            minutes.agendaItems.filter(
              (item) => item.discussed && !item.completed
            ).length
          } agenda yang belum selesai dan ${
              minutes.actionItems.filter((item) => item.status !== "completed")
                .length
            } action item yang pending.</p>
        </div>`
          : `<div class="status-summary">
          <h4>✅ Semua agenda dan action item sudah selesai</h4>
        </div>`
      }

      <!-- Attendance -->
      <div class="section">
        <h3>Kehadiran Peserta</h3>
        <div class="attendees">
          <div class="attendance-group present">
            <h4>Hadir (${minutes.attendees.length} orang)</h4>
            <ul class="participant-list present">
              ${minutes.attendees.map((name) => `<li>${name}</li>`).join("")}
            </ul>
          </div>
          ${
            minutes.absentees.length > 0
              ? `
          <div class="attendance-group absent">
            <h4>Tidak Hadir (${minutes.absentees.length} orang)</h4>
            <ul class="participant-list absent">
              ${minutes.absentees.map((name) => `<li>${name}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }
        </div>
      </div>

      <!-- Agenda Items -->
      <div class="section">
        <h3>Agenda yang Dibahas</h3>
        ${minutes.agendaItems
          .map(
            (item) => `
          <div class="agenda-item">
            <h4>${item.title}</h4>
            <span class="agenda-status ${
              item.completed ? "completed" : "incomplete"
            }">
              ${item.completed ? "✓ Selesai" : "⏳ Belum Selesai"}
            </span>
            <div class="agenda-notes">${item.notes}</div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Decisions -->
      <div class="section">
        <h3>Keputusan Rapat</h3>
        ${minutes.decisions
          .map(
            (decision) => `
          <div class="decision-item">
            <h4>${decision.title}</h4>
            <p>${decision.description}</p>
            <div class="decision-by">Diputuskan oleh: <strong>${decision.decidedBy}</strong></div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Action Items -->
      <div class="section">
        <h3>Action Items</h3>
        ${minutes.actionItems
          .map(
            (item) => `
          <div class="action-item">
            <div class="action-header">
              <span class="action-status ${item.status.replace("-", "")}">${
              item.status
            }</span>
              <span class="action-due">Due: ${item.dueDate}</span>
            </div>
            <div class="action-task">${item.task}</div>
            <div class="action-assignee">PIC: ${item.assignedTo}</div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Additional Notes -->
      <!-- Not included in this export version -->

      <!-- Next Meeting -->
      ${
        minutes.nextMeetingDate
          ? `
      <div class="next-meeting">
        <h4>📅 Rapat Selanjutnya</h4>
        <p>${formatDate(minutes.nextMeetingDate)}</p>
      </div>
      `
          : ""
      }

      <!-- Signature Section -->
      <div class="signature-section">
        <h3>Pengesahan Notulensi</h3>
        <div class="signature-container">
          <div class="signature-box">
            <div class="signature-title">Pemimpin Rapat</div>
            <div class="signature-line"></div>
            <div class="signature-name">${meeting.organizer}</div>
            <div class="signature-position">Ketua Rapat</div>
            <div class="signature-date">Tanggal: _________________</div>
          </div>
          
          <div class="signature-box">
            <div class="signature-title">Notulen</div>
            <div class="signature-line"></div>
            <div class="signature-name">_________________________</div>
            <div class="signature-position">Penulis Notulensi</div>
            <div class="signature-date">Tanggal: _________________</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-info">
          <strong>Notulensi dibuat pada:</strong> ${formatDateTime(
            minutes.createdAt
          )}
        </div>
        <div class="footer-info">
          <strong>Terakhir diperbarui:</strong> ${formatDateTime(
            minutes.lastModified
          )}
        </div>
        <div style="margin-top: 20px; color: #9ca3af;">
          Dokumen ini dibuat secara otomatis oleh sistem Meeting Management
        </div>
      </div>
    </body>
    </html>
  `;

  // Open print window with styled content
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then show print dialog
    printWindow.onload = function () {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
}

// Export PDF function with additional notes
function exportToPDFWithNotes(meeting: Meeting, minutes: MeetingMinutes) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Notulensi - ${meeting.title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 210mm;
          margin: 0 auto;
          padding: 20mm;
          background: white;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .meeting-info {
          background: #f8fafc;
          border-left: 4px solid #2563eb;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .meeting-info h2 {
          font-size: 20px;
          color: #1e40af;
          margin-bottom: 15px;
          font-weight: bold;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 10px;
        }
        
        .info-item {
          display: flex;
          align-items: center;
        }
        
        .info-item strong {
          min-width: 100px;
          color: #374151;
          font-weight: 600;
        }
        
        .section {
          margin: 30px 0;
          page-break-inside: avoid;
        }
        
        .section h3 {
          font-size: 18px;
          color: #1e40af;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
          margin-bottom: 15px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .attendees {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .attendance-group h4 {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        
        .present h4 { color: #059669; }
        .absent h4 { color: #dc2626; }
        
        .participant-list {
          list-style: none;
        }
        
        .participant-list li {
          padding: 5px 0;
          padding-left: 20px;
          position: relative;
        }
        
        .participant-list.present li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #059669;
          font-weight: bold;
        }
        
        .participant-list.absent li::before {
          content: "✗";
          position: absolute;
          left: 0;
          color: #dc2626;
          font-weight: bold;
        }
        
        .agenda-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .agenda-item h4 {
          font-size: 16px;
          margin-bottom: 8px;
          color: #374151;
        }
        
        .agenda-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .agenda-status.completed {
          background: #dcfce7;
          color: #166534;
        }
        
        .agenda-status.incomplete {
          background: #fef3c7;
          color: #92400e;
        }
        
        .agenda-notes {
          color: #6b7280;
          font-style: italic;
          margin-top: 8px;
        }
        
        .decision-item {
          background: #eff6ff;
          border-left: 4px solid #3b82f6;
          padding: 15px;
          margin: 10px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .decision-item h4 {
          color: #1e40af;
          color: #1e40af;
          margin-bottom: 8px;
          font-size: 16px;
        }
        
        .decision-by {
          font-size: 12px;
          color: #6b7286;
          margin-top: 8px;
          font-weight: 600;
        }
        
        .action-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin: 10px 0;
          position: relative;
        }
        
        .action-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .action-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .action-status.completed {
          background: #dcfce7;
          color: #166534;
        }
        
        .action-status.in-progress {
          background: #ddd6fe;
          color: #6b21a8;
        }
        
        .action-status.pending {
          background: #fef3c7;
          color: #92400e;
        }
        
        .action-due {
          font-size: 12px;
          color: #6b7280;
          float: right;
        }
        
        .action-task {
          font-weight: 600;
          margin: 8px 0;
          color: #374151;
        }
        
        .action-assignee {
          font-size: 14px;
          color: #6b7280;
        }
        
        .notes-section {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        
        .footer-info {
          margin: 10px 0;
        }
        
        .next-meeting {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .next-meeting h4 {
          color: #92400e;
          margin-bottom: 5px;
        }
        
        /* Signature Section Styles */
        .signature-section {
          margin-top: 50px;
          padding: 30px 0;
          border-top: 2px solid #e5e7eb;
          page-break-inside: avoid;
        }
        
        .signature-section h3 {
          font-size: 18px;
          color: #1e40af;
          text-align: center;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: bold;
        }
        
        .signature-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 30px;
        }
        
        .signature-box {
          text-align: center;
          flex: 1;
          margin: 0 20px;
        }
        
        .signature-title {
          font-weight: bold;
          color: #374151;
          margin-bottom: 15px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .signature-line {
          border-bottom: 2px solid #374151;
          margin: 60px auto 15px;
          width: 200px;
          height: 80px;
          position: relative;
        }
        
        .signature-name {
          font-weight: bold;
          color: #1f2937;
          font-size: 14px;
          margin-top: 10px;
        }
        
        .signature-position {
          font-size: 12px;
          color: #6b7280;
          font-style: italic;
          margin-top: 5px;
        }
        
        .signature-date {
          font-size: 12px;
          color: #6b7280;
          margin-top: 15px;
        }
        
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          
          .section {
            page-break-inside: avoid;
          }
          
          .signature-section {
            page-break-inside: avoid;
            margin-top: 50px;
          }
        }
        
        .status-summary {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        
        .status-summary.warning {
          background: #fffbeb;
          border-color: #fed7aa;
          color: #d97706;
        }
        
        .status-summary h4 {
          color: #dc2626;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .status-summary.warning h4 {
          color: #d97706;
        }
      </style>
    </head>
    <body>
      <!-- Header -->
      <div class="header">
        <h1>Notulensi Rapat</h1>
        <p style="color: #6b7280; font-size: 16px; margin-top: 10px;">${
          meeting.title
        }</p>
      </div>

      <!-- Meeting Information -->
      <div class="meeting-info">
        <h2>Informasi Meeting</h2>
        <div class="info-grid">
          <div class="info-item">
            <strong>Tanggal:</strong>
            <span>${formatDate(meeting.date)}</span>
          </div>
          <div class="info-item">
            <strong>Waktu:</strong>
            <span>${formatTime(meeting.startTime)} - ${formatTime(
    meeting.endTime
  )}</span>
          </div>
          <div class="info-item">
            <strong>Lokasi:</strong>
            <span>${meeting.location}</span>
          </div>
          <div class="info-item">
            <strong>Organizer:</strong>
            <span>${meeting.organizer}</span>
          </div>
        </div>
      </div>

      <!-- Status Summary -->
      ${
        minutes.agendaItems.filter((item) => item.discussed && !item.completed)
          .length > 0 ||
        minutes.actionItems.filter((item) => item.status !== "completed")
          .length > 0
          ? `<div class="status-summary warning">
          <h4>⚠️ Perhatian: Ada item yang belum selesai</h4>
          <p>Meeting sudah selesai namun masih ada ${
            minutes.agendaItems.filter(
              (item) => item.discussed && !item.completed
            ).length
          } agenda yang belum selesai dan ${
              minutes.actionItems.filter((item) => item.status !== "completed")
                .length
            } action item yang pending.</p>
        </div>`
          : `<div class="status-summary">
          <h4>✅ Semua agenda dan action item sudah selesai</h4>
        </div>`
      }

      <!-- Attendance -->
      <div class="section">
        <h3>Kehadiran Peserta</h3>
        <div class="attendees">
          <div class="attendance-group present">
            <h4>Hadir (${minutes.attendees.length} orang)</h4>
            <ul class="participant-list present">
              ${minutes.attendees.map((name) => `<li>${name}</li>`).join("")}
            </ul>
          </div>
          ${
            minutes.absentees.length > 0
              ? `
          <div class="attendance-group absent">
            <h4>Tidak Hadir (${minutes.absentees.length} orang)</h4>
            <ul class="participant-list absent">
              ${minutes.absentees.map((name) => `<li>${name}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }
        </div>
      </div>

      <!-- Agenda Items -->
      <div class="section">
        <h3>Agenda yang Dibahas</h3>
        ${minutes.agendaItems
          .map(
            (item) => `
          <div class="agenda-item">
            <h4>${item.title}</h4>
            <span class="agenda-status ${
              item.completed ? "completed" : "incomplete"
            }">
              ${item.completed ? "✓ Selesai" : "⏳ Belum Selesai"}
            </span>
            <div class="agenda-notes">${item.notes}</div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Decisions -->
      <div class="section">
        <h3>Keputusan Rapat</h3>
        ${minutes.decisions
          .map(
            (decision) => `
          <div class="decision-item">
            <h4>${decision.title}</h4>
            <p>${decision.description}</p>
            <div class="decision-by">Diputuskan oleh: <strong>${decision.decidedBy}</strong></div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Action Items -->
      <div class="section">
        <h3>Action Items</h3>
        ${minutes.actionItems
          .map(
            (item) => `
          <div class="action-item">
            <div class="action-header">
              <span class="action-status ${item.status.replace("-", "")}">${
              item.status
            }</span>
              <span class="action-due">Due: ${item.dueDate}</span>
            </div>
            <div class="action-task">${item.task}</div>
            <div class="action-assignee">PIC: ${item.assignedTo}</div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Additional Notes -->
      ${
        minutes.additionalNotes
          ? `<div class="section">
          <h3>Catatan Tambahan</h3>
          <div class="notes-section">
            <p>${minutes.additionalNotes}</p>
          </div>
        </div>`
          : ""
      }

      <!-- Next Meeting -->
      ${
        minutes.nextMeetingDate
          ? `
      <div class="next-meeting">
        <h4>📅 Rapat Selanjutnya</h4>
        <p>${formatDate(minutes.nextMeetingDate)}</p>
      </div>
      `
          : ""
      }

      <!-- Signature Section -->
      <div class="signature-section">
        <h3>Pengesahan Notulensi</h3>
        <div class="signature-container">
          <div class="signature-box">
            <div class="signature-title">Pemimpin Rapat</div>
            <div class="signature-line"></div>
            <div class="signature-name">${meeting.organizer}</div>
            <div class="signature-position">Ketua Rapat</div>
            <div class="signature-date">Tanggal: _________________</div>
          </div>
          
          <div class="signature-box">
            <div class="signature-title">Notulen</div>
            <div class="signature-line"></div>
            <div class="signature-name">_________________________</div>
            <div class="signature-position">Penulis Notulensi</div>
            <div class="signature-date">Tanggal: _________________</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-info">
          <strong>Notulensi dibuat pada:</strong> ${formatDateTime(
            minutes.createdAt
          )}
        </div>
        <div class="footer-info">
          <strong>Terakhir diperbarui:</strong> ${formatDateTime(
            minutes.lastModified
          )}
        </div>
        <div style="margin-top: 20px; color: #9ca3af;">
          Dokumen ini dibuat secara otomatis oleh sistem Meeting Management
        </div>
      </div>
    </body>
    </html>
  `;

  // Open print window with styled content
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then show print dialog
    printWindow.onload = function () {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
}

export default function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const meetingId = parseInt(id);
  const meeting = DataMeetings.find((m) => m.id === meetingId);
  const [minutes, setMinutes] = useState<MeetingMinutes>(SampleMeetingMinutes);

  if (!meeting) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <CardTitle className="mb-2">Meeting tidak ditemukan</CardTitle>
              <CardDescription>
                Meeting dengan ID {meetingId} tidak ada.
              </CardDescription>
              <Button className="mt-4" onClick={() => window.history.back()}>
                Kembali
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSaveMinutes = (updatedMinutes: MeetingMinutes) => {
    setMinutes(updatedMinutes);
    // In real app, this would be an API call to save to backend
    console.log("Minutes updated:", updatedMinutes);
  };

  const uncompletedAgenda = minutes.agendaItems.filter(
    (item) => item.discussed && !item.completed
  );
  const pendingActions = minutes.actionItems.filter(
    (item) => item.status !== "completed"
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <MeetingHeader
          meeting={meeting}
          minutes={minutes}
          onExportPDFWithoutNotes={() =>
            exportToPDFWithoutNotes(meeting, minutes)
          }
          onExportPDFWithNotes={() => exportToPDFWithNotes(meeting, minutes)}
          onSaveMinutes={handleSaveMinutes}
        />
        <MeetingInfoCard meeting={meeting} />
        <AlertIncompleteItems
          uncompletedAgendaCount={uncompletedAgenda.length}
          pendingActionsCount={pendingActions.length}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AttendanceSection
              attendees={minutes.attendees}
              absentees={minutes.absentees}
            />
            <AgendaList agendaItems={minutes.agendaItems} />
            <DecisionsList decisions={minutes.decisions} />
          </div>
          <div className="space-y-6">
            <ActionItemsSidebar actionItems={minutes.actionItems} />
            <MeetingInfoSidebar
              createdAt={minutes.createdAt}
              lastModified={minutes.lastModified}
              nextMeetingDate={minutes.nextMeetingDate}
            />
            <MeetingNotesSection additionalNotes={minutes.additionalNotes} />
          </div>
        </div>
      </div>
    </div>
  );
}
