"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function DialogAddTeam({
  open,
  mode = "add",
  user,
  onClose,
  onSave,
  departments,
  roles,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "Employee",
    location: "",
  });

  // Sync form value for edit mode
  useEffect(() => {
    if (open && user && mode === "edit") {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        position: user.position || "",
        department: user.department || "",
        role: user.role || "Employee",
        location: user.location || "",
      });
    } else if (open && mode === "add") {
      setForm({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        role: "Employee",
        location: "",
      });
    }
  }, [user, open, mode]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSelectChange(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    // for edit, pass id
    let payload = { ...form };
    if (mode === "edit" && user?.id) {
      payload.id = user.id;
      payload.avatar = user.avatar;
      payload.status = user.status;
      payload.joinDate = user.joinDate;
      payload.lastActive = user.lastActive;
      payload.tasksCompleted = user.tasksCompleted;
      payload.tasksInProgress = user.tasksInProgress;
      payload.meetingsAttended = user.meetingsAttended;
      payload.skills = user.skills;
    }
    onSave(payload, mode);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Edit Anggota Team" : "Tambah Anggota Team"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  name="name"
                  placeholder="Abedul bedul"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="abdul@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="notelepon">No. Telepon</Label>
                <Input
                  id="notelepon"
                  name="phone"
                  placeholder="0812283902"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  name="location"
                  placeholder="Cikampek"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="posisi">Posisi</Label>
              <Input
                id="posisi"
                name="position"
                placeholder="Front End Developer"
                value={form.position}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="departemen">Departemen</Label>
                <Select
                  value={form.department}
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departemen</SelectLabel>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      {roles.map((role) => (
                        <SelectItem key={role.name} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {mode === "edit" ? "Simpan Perubahan" : "Tambah Anggota"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
