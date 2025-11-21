"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { SocialLinks } from "@/components/social-links"

export default function ProfileEditForm() {
  // In a real app, you would fetch the user's profile data from your API
  const [profile, setProfile] = useState({
    name: "DJ Rhythm",
    username: "@djrhythm",
    bio: "Hip-hop producer and music reviewer. I love discovering new artists and sharing great music with the world.",
    socialLinks: {
      youtube: "UCnQ0T9b3q-WlKtEOkpnQprg",
      twitch: "djrhythm",
      instagram: "djrhythm",
      tiktok: "djrhythm",
    },
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialChange = (e: any) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // In a real app, you would call your API to update the profile
    alert("Profile updated!")
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={profile.name} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" value={profile.username} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" name="bio" value={profile.bio} onChange={handleChange} />
          </div>

          <div>
            <Label>Social Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube Channel ID</Label>
                <Input id="youtube" name="youtube" value={profile.socialLinks.youtube} onChange={handleSocialChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitch">Twitch Username</Label>
                <Input id="twitch" name="twitch" value={profile.socialLinks.twitch} onChange={handleSocialChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Username</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={profile.socialLinks.instagram}
                  onChange={handleSocialChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok">TikTok Username</Label>
                <Input id="tiktok" name="tiktok" value={profile.socialLinks.tiktok} onChange={handleSocialChange} />
              </div>
            </div>
          </div>

          <SocialLinks
            youtube={profile.socialLinks.youtube}
            twitch={profile.socialLinks.twitch}
            instagram={profile.socialLinks.instagram}
            tiktok={profile.socialLinks.tiktok}
            isEditMode={true}
          />

          <Button type="submit" className="w-full bg-fire hover:bg-fire/80">
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
