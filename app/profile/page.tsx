import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit } from "lucide-react"
import { LikeButton } from "@/components/like-button"

export const metadata: Metadata = {
  title: "Your Profile | BangerBoard",
  description: "Manage your BangerBoard profile and connections",
}

export default function ProfilePage() {
  // In a real app, you would fetch the user's profile data from your API
  const profile = {
    id: "user123",
    name: "DJ Rhythm",
    username: "@djrhythm",
    bio: "Hip-hop producer and music reviewer. I love discovering new artists and sharing great music with the world.",
    profileType: "host",
    isApproved: true,
    banner: "/placeholder.svg?height=300&width=1200",
    avatar: "/placeholder.svg?height=200&width=200",
    socialLinks: {
      youtube: "UCnQ0T9b3q-WlKtEOkpnQprg",
      twitch: "djrhythm",
      instagram: "djrhythm",
      tiktok: "djrhythm",
    },
    stats: {
      followers: 1243,
      following: 352,
      likes: 4567,
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="relative mb-8">
        {/* Banner */}
        <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
          <Image
            src={profile.banner || "/placeholder.svg"}
            alt="Profile banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Profile picture */}
        <div className="absolute -bottom-16 left-8 border-4 border-background rounded-full overflow-hidden shadow-lg">
          <Image
            src={profile.avatar || "/placeholder.svg"}
            alt={profile.name}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>

        {/* Like button */}
        <div className="absolute top-4 right-4">
          <LikeButton profileId={profile.id} profileType={profile.profileType as any} size="lg" />
        </div>

        {/* Edit profile button */}
        <div className="absolute bottom-4 right-4">
          <Link href="/profile/edit">
            <Button variant="secondary" size="sm" className="bg-black/50 hover:bg-black/70">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile info */}
      <div className="mt-20 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.username}</p>
            {profile.profileType === "host" && (
              <div className="mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${profile.isApproved ? "bg-green-500/20 text-green-500" : "bg-amber-500/20 text-amber-500"}`}
                >
                  {profile.isApproved ? "Approved Host" : "Pending Approval"}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-bold">{profile.stats.followers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{profile.stats.following.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{profile.stats.likes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-muted-foreground">{profile.bio}</p>

        {/* Social links */}
        <div className="mt-4">
          <Suspense fallback={<div>Loading social links...</div>}>
            <SocialLinks
              youtube={profile.socialLinks.youtube}
              twitch={profile.socialLinks.twitch}
              instagram={profile.socialLinks.instagram}
              tiktok={profile.socialLinks.tiktok}
            />
          </Suspense>
          <p className="mt-1 text-xs text-muted-foreground">
            <span className="italic">Note:</span> Links are for follow requests, not direct profile access
          </p>
        </div>
      </div>

      {/* Profile content tabs */}
      <Tabs defaultValue="content" className="mt-8">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Your Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your reviews and content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="likes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Liked Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Shows and profiles you've liked will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>About {profile.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{profile.bio}</p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Profile Type</h3>
                <p className="text-muted-foreground capitalize">{profile.profileType}</p>

                {profile.profileType === "host" && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Host Status</h3>
                    <p className="text-muted-foreground">
                      {profile.isApproved
                        ? "Your host profile has been approved."
                        : "Your host profile is pending approval. You can continue using the platform while we review your profile."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Import at runtime to avoid SSR issues
function SocialLinks(props: any) {
  const SocialLinksComponent = require("@/components/social-links").SocialLinks
  return <SocialLinksComponent {...props} />
}

