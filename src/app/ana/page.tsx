import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  CheckSquare,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
  Target,
} from "lucide-react";

const AnalyticsPage = () => {
  // Sample data - in real app, this would come from your API
  const analyticsData = {
    meetings: {
      total: 45,
      attended: 38,
      upcoming: 7,
      attendance_rate: 84,
    },
    tasks: {
      total: 156,
      completed: 89,
      in_progress: 34,
      overdue: 12,
      pending: 21,
    },
    notes: {
      total: 67,
      exported_pdf: 45,
      shared_whatsapp: 23,
      shared_email: 31,
    },
    productivity: {
      daily_average_tasks: 8.5,
      weekly_completion_rate: 76,
      on_time_delivery: 82,
    },
  };

  const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    trend,
    trendValue,
  }) => (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">
              +{trendValue}% dari bulan lalu
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-4 pl-2">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Web Toolbox PKC - Monitor performa tim dan aktivitas perusahaan
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Meeting"
            value={analyticsData.meetings.total}
            description="Meeting bulan ini"
            icon={Calendar}
            trend={true}
            trendValue={12}
          />
          <StatCard
            title="Task Selesai"
            value={analyticsData.tasks.completed}
            description={`dari ${analyticsData.tasks.total} total task`}
            icon={CheckSquare}
            trend={true}
            trendValue={8}
          />
          <StatCard
            title="Notulensi Dibuat"
            value={analyticsData.notes.total}
            description="Dokumen meeting"
            icon={FileText}
            trend={true}
            trendValue={15}
          />
          <StatCard
            title="Tingkat Kehadiran"
            value={`${analyticsData.meetings.attendance_rate}%`}
            description="Rata-rata attendance"
            icon={Users}
            trend={true}
            trendValue={5}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Meeting Analytics */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Meeting Analytics
              </CardTitle>
              <CardDescription>
                Statistik meeting dan kehadiran tim
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meeting Dihadiri</span>
                  <span className="font-medium">
                    {analyticsData.meetings.attended}/
                    {analyticsData.meetings.total}
                  </span>
                </div>
                <Progress
                  value={analyticsData.meetings.attendance_rate}
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {analyticsData.meetings.upcoming}
                  </div>
                  <div className="text-xs text-blue-600">Meeting Mendatang</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {analyticsData.meetings.attendance_rate}%
                  </div>
                  <div className="text-xs text-green-600">Attendance Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Management */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Task Management
              </CardTitle>
              <CardDescription>Progress dan status task tim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completed</span>
                  <Badge variant="default">
                    {analyticsData.tasks.completed}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">In Progress</span>
                  <Badge variant="secondary">
                    {analyticsData.tasks.in_progress}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending</span>
                  <Badge variant="outline">{analyticsData.tasks.pending}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overdue</span>
                  <Badge variant="destructive">
                    {analyticsData.tasks.overdue}
                  </Badge>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(
                      (analyticsData.tasks.completed /
                        analyticsData.tasks.total) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Completion Rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notulensi & Export */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notulensi & Export
              </CardTitle>
              <CardDescription>Dokumentasi dan sharing meeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Export PDF</div>
                    <div className="text-xs text-muted-foreground">
                      Dokumen formal
                    </div>
                  </div>
                  <div className="text-lg font-bold text-red-600">
                    {analyticsData.notes.exported_pdf}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Share WhatsApp</div>
                    <div className="text-xs text-muted-foreground">
                      Komunikasi cepat
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {analyticsData.notes.shared_whatsapp}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Share Email</div>
                    <div className="text-xs text-muted-foreground">
                      Distribusi resmi
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {analyticsData.notes.shared_email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Productivity Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Produktivitas Tim
            </CardTitle>
            <CardDescription>
              Metrik performa dan efisiensi kerja tim
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Rata-rata Task Harian
                  </span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">
                  {analyticsData.productivity.daily_average_tasks}
                </div>
                <div className="text-xs text-muted-foreground">
                  task per hari per orang
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Weekly Completion Rate
                  </span>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">
                  {analyticsData.productivity.weekly_completion_rate}%
                </div>
                <Progress
                  value={analyticsData.productivity.weekly_completion_rate}
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">On-Time Delivery</span>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">
                  {analyticsData.productivity.on_time_delivery}%
                </div>
                <Progress
                  value={analyticsData.productivity.on_time_delivery}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Detailed Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Attendance Detail */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Detail Attendance Meeting
              </CardTitle>
              <CardDescription>
                Rincian kehadiran meeting minggu ini
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">
                        Meeting Operasional
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Senin, 15:00
                      </div>
                    </div>
                  </div>
                  <Badge variant="default">12/15</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">Review Produksi</div>
                      <div className="text-xs text-muted-foreground">
                        Rabu, 09:00
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">8/10</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">
                        Planning Mingguan
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Jumat, 14:00
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">6/8</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">Board Meeting</div>
                      <div className="text-xs text-muted-foreground">
                        Kamis, 10:00
                      </div>
                    </div>
                  </div>
                  <Badge variant="destructive">5/12</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trend Performa Bulanan
              </CardTitle>
              <CardDescription>
                Perbandingan performa 3 bulan terakhir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Task Completion</span>
                    <span className="text-sm font-medium">89/156 (57%)</span>
                  </div>
                  <Progress value={57} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    +12% dari bulan lalu
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Meeting Attendance</span>
                    <span className="text-sm font-medium">84%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    +5% dari bulan lalu
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Notes Documentation</span>
                    <span className="text-sm font-medium">67 dokumen</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    +18% dari bulan lalu
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">On-time Delivery</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    +3% dari bulan lalu
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
