"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  username: string
  email: string
  profileType: "fan" | "host" | "artist"
  isApproved: boolean
  avatar?: string
  bio?: string
  socialLinks?: {
    youtube?: string
    twitch?: string
    instagram?: string
    tiktok?: string
  }
  createdAt: string
}

// Mock user database - in a real app, this would be in your database
const USERS: User[] = [
  {
    id: "1",
    username: "djrhythm",
    email: "dj@example.com",
    profileType: "host",
    isApproved: true,
    avatar: "/placeholder.svg?height=150&width=150",
    bio: "Hip-hop producer and music reviewer",
    socialLinks: {
      youtube: "UCnQ0T9b3q-WlKtEOkpnQprg",
      twitch: "djrhythm",
      instagram: "djrhythm",
    },
    createdAt: new Date().toISOString(),
  },
]

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate authentication delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = USERS.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: "User not found" }
  }

  // In a real app, you would verify the password hash
  if (password !== "password123") {
    return { success: false, error: "Invalid password" }
  }

  // Set session cookie
  cookies().set("session", JSON.stringify({ userId: user.id }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return { success: true, user }
}

export async function signup(userData: {
  username: string
  email: string
  password: string
  profileType: "fan" | "host" | "artist"
}): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate signup delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = USERS.find((u) => u.email === userData.email || u.username === userData.username)

  if (existingUser) {
    return { success: false, error: "User already exists" }
  }

  // Create new user
  const newUser: User = {
    id: (USERS.length + 1).toString(),
    username: userData.username,
    email: userData.email,
    profileType: userData.profileType,
    isApproved: userData.profileType === "fan", // Auto-approve fans, hosts need approval
    createdAt: new Date().toISOString(),
  }

  USERS.push(newUser)

  // Set session cookie
  cookies().set("session", JSON.stringify({ userId: newUser.id }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return { success: true, user: newUser }
}

export async function logout(): Promise<void> {
  cookies().delete("session")
  redirect("/")
}

export async function getCurrentUser(): Promise<User | null> {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    const user = USERS.find((u) => u.id === session.userId)
    return user || null
  } catch {
    return null
  }
}

export async function updateUser(
  userId: string,
  updates: Partial<User>,
): Promise<{ success: boolean; user?: User; error?: string }> {
  const userIndex = USERS.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return { success: false, error: "User not found" }
  }

  USERS[userIndex] = { ...USERS[userIndex], ...updates }

  return { success: true, user: USERS[userIndex] }
}
