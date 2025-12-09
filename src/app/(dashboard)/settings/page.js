// "use client";

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function SettingsPage() {
//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div className="space-y-2">
//         <h1 className="text-foreground relative inline-block text-3xl font-bold">
//           Settings
//           <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full opacity-50" />
//         </h1>
//         <p className="text-muted-foreground mt-1 text-base">
//           Manage your account settings and preferences
//         </p>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="profile" className="space-y-6">
//         <TabsList
//           className="rounded-xl p-1.5 flex gap-2"
//           style={{
//             background: "rgba(255, 255, 255, 0.6)",
//             backdropFilter: "blur(20px)",
//             WebkitBackdropFilter: "blur(20px)",
//             border: "1px solid rgba(148, 163, 184, 0.15)",
//           }}
//         >
//           {["profile", "account", "appearance", "notifications"].map((tab) => (
//             <TabsTrigger
//               key={tab}
//               value={tab}
//               className="capitalize rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
//             >
//               {tab}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {/* ========== PROFILE TAB ========== */}
//         <TabsContent value="profile" className="space-y-6">
//           <Card
//             className="border-0"
//             style={{
//               background: "rgba(255, 255, 255, 0.6)",
//               backdropFilter: "blur(20px)",
//               WebkitBackdropFilter: "blur(20px)",
//               boxShadow: "0 8px 32px rgba(15, 23, 42, 0.04)",
//             }}
//           >
//             <CardHeader>
//               <CardTitle className="text-foreground text-lg font-semibold">
//                 Profile Information
//               </CardTitle>
//               <CardDescription>
//                 Update your personal details
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               {/* Avatar */}
//               <div className="flex items-center gap-6">
//                 <Avatar className="w-20 h-20 ring-4 ring-white shadow-xl">
//                   <AvatarImage src="" />
//                   <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
//                     JD
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="space-y-2">
//                   <Button
//                     variant="outline"
//                     className="rounded-xl border-border/50 hover:bg-white/70"
//                     style={{
//                       background: "rgba(255, 255, 255, 0.5)",
//                     }}
//                   >
//                     Change Avatar
//                   </Button>
//                   <p className="text-muted-foreground text-sm">
//                     JPG, PNG or GIF. Max size 2MB.
//                   </p>
//                 </div>
//               </div>

//               <Separator className="bg-border/50" />

//               {/* Form fields */}
//               <div className="grid gap-6 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName">First name</Label>
//                   <Input
//                     id="firstName"
//                     defaultValue="John"
//                     className="h-11 rounded-xl border-0"
//                     style={{
//                       background: "rgba(255, 255, 255, 0.6)",
//                       backdropFilter: "blur(10px)",
//                     }}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName">Last name</Label>
//                   <Input
//                     id="lastName"
//                     defaultValue="Doe"
//                     className="h-11 rounded-xl border-0"
//                     style={{
//                       background: "rgba(255, 255, 255, 0.6)",
//                       backdropFilter: "blur(10px)",
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   defaultValue="john@teamfinance.app"
//                   className="h-11 rounded-xl border-0"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.6)",
//                     backdropFilter: "blur(10px)",
//                   }}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="bio">Bio</Label>
//                 <Textarea
//                   id="bio"
//                   rows={4}
//                   defaultValue="Product manager passionate about building great teams and products."
//                   className="rounded-xl border-0 resize-none"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.6)",
//                     backdropFilter: "blur(10px)",
//                   }}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="role">Role</Label>
//                 <Input
//                   id="role"
//                   defaultValue="Product Manager"
//                   className="h-11 rounded-xl border-0"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.6)",
//                     backdropFilter: "blur(10px)",
//                   }}
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <Button
//                   variant="outline"
//                   className="rounded-xl border-border/50 hover:bg-white/70"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.5)",
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-500/30">
//                   Save Changes
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* ========== ACCOUNT TAB ========== */}
//         <TabsContent value="account" className="space-y-6">
//           <Card
//             className="border-0"
//             style={{
//               background: "rgba(255, 255, 255, 0.6)",
//               backdropFilter: "blur(20px)",
//               WebkitBackdropFilter: "blur(20px)",
//               boxShadow: "0 8px 32px rgba(15, 23, 42, 0.04)",
//             }}
//           >
//             <CardHeader>
//               <CardTitle className="text-foreground">Account Settings</CardTitle>
//               <CardDescription>Manage your account security</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {["Current password", "New password", "Confirm new password"].map(
//                 (label, i) => (
//                   <div key={label} className="space-y-2">
//                     <Label htmlFor={label.toLowerCase().replace(/ /g, "-")}>
//                       {label}
//                     </Label>
//                     <Input
//                       id={label.toLowerCase().replace(/ /g, "-")}
//                       type="password"
//                       className="h-11 rounded-xl border-0"
//                       style={{
//                         background: "rgba(255, 255, 255, 0.6)",
//                         backdropFilter: "blur(10px)",
//                       }}
//                     />
//                   </div>
//                 )
//               )}

//               <div className="flex justify-end gap-3 pt-4">
//                 <Button
//                   variant="outline"
//                   className="rounded-xl border-border/50 hover:bg-white/70"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.5)",
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-500/30">
//                   Update Password
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Two-Factor Auth */}
//           <Card
//             className="border-0"
//             style={{
//               background: "rgba(255, 255, 255, 0.6)",
//               backdropFilter: "blur(20px)",
//               WebkitBackdropFilter: "blur(20px)",
//               boxShadow: "0 8px 32px rgba(15, 23, 42, 0.04)",
//             }}
//           >
//             <CardHeader>
//               <CardTitle>Two-Factor Authentication</CardTitle>
//               <CardDescription>
//                 Add an extra layer of security to your account
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium">Enable two-factor authentication</p>
//                   <p className="text-muted-foreground text-sm">
//                     Receive a code via SMS or authenticator app
//                   </p>
//                 </div>
//                 <Switch />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Danger Zone */}
//           <Card
//             className="border-0"
//             style={{
//               background: "rgba(254, 243, 199, 0.3)",
//               backdropFilter: "blur(20px)",
//               border: "1px solid rgba(245, 158, 11, 0.3)",
//               boxShadow: "0 8px 32px rgba(245, 158, 11, 0.08)",
//             }}
//           >
//             <CardHeader>
//               <CardTitle className="text-red-600">Danger Zone</CardTitle>
//               <CardDescription className="text-amber-800">
//                 Irreversible actions for your account
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium">Delete account</p>
//                   <p className="text-muted-foreground text-sm">
//                     Permanently delete your account and all data
//                   </p>
//                 </div>
//                 <Button
//                   className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2"
//                 >
//                   Delete Account
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* ========== APPEARANCE TAB ========== */}
//         <TabsContent value="appearance" className="space-y-6">
//           <Card
//             className="border-0"
//             style={{
//               background: "rgba(255, 255, 255, 0.6)",
//               backdropFilter: "blur(20px)",
//             }}
//           >
//             <CardHeader>
//               <CardTitle>Appearance</CardTitle>
//               <CardDescription>
//                 Customize how TeamFinance looks
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Language */}
//               <div className="space-y-2">
//                 <Label>Language</Label>
//                 <Select defaultValue="en">
//                   <SelectTrigger className="rounded-xl border-0 h-11 bg-white/60">
//                     <SelectValue placeholder="English" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="en">English</SelectItem>
//                     <SelectItem value="es">Spanish</SelectItem>
//                     <SelectItem value="fr">French</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Timezone */}
//               <div className="space-y-2">
//                 <Label>Timezone</Label>
//                 <Select defaultValue="utc-5">
//                   <SelectTrigger className="rounded-xl border-0 h-11 bg-white/60">
//                     <SelectValue placeholder="Select timezone" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="utc-5">
//                       Eastern Time (UTC-5)
//                     </SelectItem>
//                     <SelectItem value="utc-6">
//                       Central Time (UTC-6)
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <Button
//                   variant="outline"
//                   className="rounded-xl border-border/50 hover:bg-white/70"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.5)",
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-500/30">
//                   Save Preferences
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* ========== NOTIFICATIONS TAB ========== */}
//         <TabsContent value="notifications" className="space-y-6">
//           <Card
//             className="border-0"
//             style={{
//               background: "rgba(255, 255, 255, 0.6)",
//               backdropFilter: "blur(20px)",
//             }}
//           >
//             <CardHeader>
//               <CardTitle>Email Notifications</CardTitle>
//               <CardDescription>
//                 Manage your email notification preferences
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {[
//                 {
//                   title: "Project updates",
//                   desc: "Get notified when a project is updated",
//                 },
//                 {
//                   title: "Team activity",
//                   desc: "Get notified about team member actions",
//                 },
//                 {
//                   title: "Financial reports",
//                   desc: "Weekly summary of financial activity",
//                 },
//               ].map((n) => (
//                 <React.Fragment key={n.title}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium">{n.title}</p>
//                       <p className="text-muted-foreground text-sm">{n.desc}</p>
//                     </div>
//                     <Switch defaultChecked />
//                   </div>
//                   <Separator />
//                 </React.Fragment>
//               ))}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// src/app/(dashboard)/settings/page.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, Loader2, Upload, X } from "lucide-react";

const getInitials = (nameOrEmail) => {
  if (!nameOrEmail) return "U";
  const s = String(nameOrEmail).trim();
  if (!s) return "U";
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  const letters = s.replace(/[^A-Za-z]/g, "");
  if (letters.length >= 2) return letters.slice(0, 2).toUpperCase();
  return s.slice(0, 2).toUpperCase();
};

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toast, setToast] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Profile data
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    role: "",
    avatar: "",
  });

  // Password data
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC-5",
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    email: {
      projectUpdates: true,
      teamActivity: true,
      financialReports: false,
      marketing: false,
    },
    push: {
      enabled: true,
      taskReminders: true,
    },
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  async function loadUserData() {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      
      if (data.success && data.user) {
        const user = data.user;
        setProfile({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          bio: user.bio || "",
          role: user.role || "",
          avatar: user.avatar || "",
        });
        setTwoFactorEnabled(user.twoFactorEnabled || false);
        setPreferences(user.preferences || { language: "en", timezone: "UTC-5" });
        setNotifications(user.notifications || {
          email: { projectUpdates: true, teamActivity: true, financialReports: false, marketing: false },
          push: { enabled: true, taskReminders: true },
        });
      }
    } catch (error) {
      showToast("Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleProfileSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          bio: profile.bio,
          role: profile.role,
          // Don't send avatar here - it's uploaded separately
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        showToast("Profile updated successfully!");
        setHasUnsavedChanges(false);

        if (data.user) {
          setProfile({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            email: data.user.email || "",
            bio: data.user.bio || "",
            role: data.user.role || "",
            avatar: data.user.avatar || profile.avatar,
          });
        }

        // Update session with trigger to refresh token
        await updateSession();
      } else {
        showToast(data.error || "Failed to update profile", "error");
      }
    } catch (error) {
      showToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange() {
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (passwords.newPassword.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        showToast("Password changed successfully!");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        showToast(data.error || "Failed to change password", "error");
      }
    } catch (error) {
      showToast("Failed to change password", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handlePreferencesSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/user/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      const data = await res.json();
      
      if (data.success) {
        showToast("Preferences saved!");
        setHasUnsavedChanges(false);
      } else {
        showToast(data.error || "Failed to save preferences", "error");
      }
    } catch (error) {
      showToast("Failed to save preferences", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleNotificationToggle(type, category, value) {
    try {
      const res = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, category, value }),
      });

      const data = await res.json();
      
      if (data.success) {
        setNotifications(data.notifications);
        showToast("Notification preference updated!");
      } else {
        showToast(data.error || "Failed to update notification", "error");
      }
    } catch (error) {
      showToast("Failed to update notification", "error");
    }
  }

  async function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be less than 2MB", "error");
      return;
    }

    setUploading(true);

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((p) => ({ ...p, avatar: reader.result }));
    };
    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append("file", file);

    try {
      // Upload to Cloudinary
      const uploadRes = await fetch("/api/user/avatar", {
        method: "POST",
        body: fd,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.success || !uploadData.url) {
        showToast(uploadData.error || "Upload failed", "error");
        await loadUserData(); // Revert to original avatar
        return;
      }

      // Update profile with Cloudinary URL
      const saveRes = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...profile,
          avatar: uploadData.url 
        }),
      });
      
      const saveData = await saveRes.json();

      if (!saveData.success) {
        showToast(saveData.error || "Failed to save avatar", "error");
        await loadUserData();
        return;
      }

      // Update local state
      if (saveData.user) {
        setProfile((p) => ({
          ...p,
          avatar: saveData.user.avatar || uploadData.url
        }));
      } else {
        setProfile((p) => ({ ...p, avatar: uploadData.url }));
      }

      // Update NextAuth session
      await updateSession();

      showToast("Avatar uploaded successfully!");
    } catch (err) {
      console.error("Avatar upload error:", err);
      showToast("Upload failed", "error");
      await loadUserData(); // Revert to original
    } finally {
      setUploading(false);
    }
  }

  function getPasswordStrength(password) {
    if (!password) return { strength: 0, label: "" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return { strength, label: labels[strength] };
  }

  const passwordStrength = getPasswordStrength(passwords.newPassword);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg animate-slide-in ${
          toast.type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}>
          {toast.type === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Account?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast("Account deletion not implemented yet", "error");
                  setShowDeleteModal(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
          <TabsTrigger value="profile" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            Account
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.avatar || ""} />
                    <AvatarFallback>
                      {getInitials(
                        `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
                        (session?.user?.name || session?.user?.email || "")
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label 
                    htmlFor="avatar-upload" 
                    className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium text-sm ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Upload className="w-4 h-4" />
                    {uploading ? "Uploading..." : "Change Avatar"}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                  <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <Separator />

              {/* Name Fields */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => {
                      setProfile({ ...profile, firstName: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => {
                      setProfile({ ...profile, lastName: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a little about yourself"
                  value={profile.bio}
                  onChange={(e) => {
                    setProfile({ ...profile, bio: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 text-right">{profile.bio.length}/500</p>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={profile.role}
                  onChange={(e) => {
                    setProfile({ ...profile, role: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  placeholder="Product Manager"
                />
              </div>

              {/* Save Buttons */}
              <div className="flex justify-between items-center pt-4">
                {hasUnsavedChanges && (
                  <p className="text-sm text-amber-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    You have unsaved changes
                  </p>
                )}
                <div className="flex gap-3 ml-auto">
                  <button
                    onClick={() => {
                      loadUserData();
                      setHasUnsavedChanges(false);
                    }}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileSave}
                    disabled={saving || !hasUnsavedChanges}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ACCOUNT TAB */}
        <TabsContent value="account" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordChange();
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password *</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  />
                  {passwords.newPassword && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${
                              i < passwordStrength.strength ? 'bg-teal-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">{passwordStrength.label}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  />
                  {passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && (
                    <p className="text-xs text-red-600">Passwords do not match</p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || !passwords.currentPassword || !passwords.newPassword || passwords.newPassword !== passwords.confirmPassword}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Update Password
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 2FA */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable two-factor authentication</p>
                  <p className="text-sm text-gray-600">Receive a code via SMS or authenticator app</p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onChange={(checked) => {
                    setTwoFactorEnabled(checked);
                    showToast("2FA setup not fully implemented yet", "error");
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Delete account</p>
                  <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Delete Account
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* APPEARANCE TAB */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Appearance</CardTitle>
              <CardDescription>Customize how TeamFinance looks and feels</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={preferences.language}
                  onChange={(e) => {
                    setPreferences({ ...preferences, language: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-[15px] focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  value={preferences.timezone}
                  onChange={(e) => {
                    setPreferences({ ...preferences, timezone: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-[15px] focus:outline-none"
                >
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC+0">London (UTC+0)</option>
                  <option value="UTC+1">Paris (UTC+1)</option>
                  <option value="UTC+5:30">India (UTC+5:30)</option>
                  <option value="UTC+8">Singapore (UTC+8)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    loadUserData();
                    setHasUnsavedChanges(false);
                  }}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePreferencesSave}
                  disabled={saving || !hasUnsavedChanges}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Preferences
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-6">
          {/* Email Notifications */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Email Notifications</CardTitle>
              <CardDescription>Manage your email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "projectUpdates", title: "Project updates", desc: "Get notified when a project is updated" },
                { key: "teamActivity", title: "Team activity", desc: "Get notified about team member actions" },
                { key: "financialReports", title: "Financial reports", desc: "Weekly summary of financial activity" },
                { key: "marketing", title: "Marketing emails", desc: "Receive promotional content and offers" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications.email[item.key]}
                    onChange={(checked) => {
                      const newNotifications = {
                        ...notifications,
                        email: { ...notifications.email, [item.key]: checked },
                      };
                      setNotifications(newNotifications);
                      handleNotificationToggle("email", item.key, checked);
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Push Notifications */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Push Notifications</CardTitle>
          <CardDescription>Manage your push notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Enable push notifications</p>
              <p className="text-sm text-gray-600">Receive notifications on your device</p>
            </div>
            <Switch
              checked={notifications.push.enabled}
              onChange={(checked) => {
                const newNotifications = {
                  ...notifications,
                  push: { ...notifications.push, enabled: checked },
                };
                setNotifications(newNotifications);
                handleNotificationToggle("push", "enabled", checked);
              }}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Task reminders</p>
              <p className="text-sm text-gray-600">Get reminded about upcoming deadlines</p>
            </div>
            <Switch
              checked={notifications.push.taskReminders}
              onChange={(checked) => {
                const newNotifications = {
                  ...notifications,
                  push: { ...notifications.push, taskReminders: checked },
                };
                setNotifications(newNotifications);
                handleNotificationToggle("push", "taskReminders", checked);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>
  );
}