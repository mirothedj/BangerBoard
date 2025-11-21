import { Suspense } from "react"
import type { Metadata } from "next"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | BangerBoard",
  description: "Manage shows, users, and content on BangerBoard",
}

export default async function AdminPage() {
  const user = await getCurrentUser()

  // Check if user is admin (in a real app, you'd have proper role checking)
  if (!user || user.profileType !== "host" || !user.isApproved) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Suspense fallback={<div>Loading dashboard...</div>}>
        <AdminDashboard user={user} />
      </Suspense>
    </div>
  )
}
