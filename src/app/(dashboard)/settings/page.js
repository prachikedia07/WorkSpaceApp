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

"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {

  return (
    <div className="p-8 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-[var(--foreground)]">
          Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* TABS */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="tabs-list">
          <TabsTrigger value="profile" className="tabs-trigger">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="tabs-trigger">
            Account
          </TabsTrigger>
          <TabsTrigger value="appearance" className="tabs-trigger">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="tabs-trigger">
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-card card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <button className="btn-outline">Change Avatar</button>
                  <p className="text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@teamfinance.app"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a little about yourself"
                  defaultValue="Product manager passionate about building great teams and products."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Product Manager" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button className="btn-outline">Cancel</button>
                <button className="btn-primary">Save Changes</button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ACCOUNT TAB */}
        <TabsContent value="account" className="space-y-6">
          <Card className="glass-card card">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Current password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div>
                <Label htmlFor="newPassword">New password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button className="btn-outline">Cancel</button>
                <button className="btn-primary">Update Password</button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card card">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground">
                    Enable two-factor authentication
                  </p>
                  <p className="text-muted-foreground">
                    Receive a code via SMS or authenticator app
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* DANGER ZONE */}
          <div className="danger-zone">
            <h3>Danger Zone</h3>
            <p>Irreversible actions for your account</p>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-foreground font-medium">Delete account</p>
                <p className="text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <button className="btn-danger">Delete Account</button>
            </div>
          </div>
        </TabsContent>

        {/* APPEARANCE TAB */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-card card">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how TeamFinance looks</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button className="btn-outline">Cancel</button>
                <button className="btn-primary">Save Preferences</button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card card">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Project updates",
                  desc: "Get notified when a project is updated",
                  checked: true,
                },
                {
                  title: "Team activity",
                  desc: "Get notified about team member actions",
                  checked: true,
                },
                {
                  title: "Financial reports",
                  desc: "Weekly summary of financial activity",
                  checked: false,
                },
                {
                  title: "Marketing emails",
                  desc: "Receive news and updates from TeamFinance",
                  checked: false,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-slate-200/50 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card card">
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Manage your push notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable push notifications</p>
                  <p className="text-muted-foreground text-sm">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Task reminders</p>
                  <p className="text-muted-foreground text-sm">
                    Get reminded about upcoming deadlines
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
