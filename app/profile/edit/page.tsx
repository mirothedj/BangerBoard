import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProfileEditForm from "./profile-edit-form"

export const metadata: Metadata = {
  title: "Edit Profile | BangerBoard",
  description: "Edit your BangerBoard profile",
}

export default function EditProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/profile" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>

        <Suspense fallback={<div>Loading form...</div>}>
          <ProfileEditForm />
        </Suspense>
      </div>
    </div>
  )
}
