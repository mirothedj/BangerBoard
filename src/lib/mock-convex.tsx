import { createContext, type ReactNode } from "react"
import { mockShows, mockPlaylists, mockHosts, mockCreators } from "./mock-data"

// Mock Convex provider for preview environment
const MockConvexContext = createContext<any>(null)

export function MockConvexProvider({ children }: { children: ReactNode }) {
  const mockClient = {
    query: (queryRef: any) => {
      // Return mock data based on query name
      const queryName = queryRef._name || ""

      if (queryName.includes("shows:list")) {
        return Promise.resolve(mockShows)
      }
      if (queryName.includes("shows:getLiveShows")) {
        return Promise.resolve(mockShows.filter((s) => s.isLive))
      }
      if (queryName.includes("playlists:list")) {
        return Promise.resolve(mockPlaylists)
      }
      if (queryName.includes("hosts:list")) {
        return Promise.resolve(mockHosts)
      }
      if (queryName.includes("creators:list")) {
        return Promise.resolve(mockCreators)
      }
      if (queryName.includes("creators:getFeatured")) {
        return Promise.resolve(mockCreators.filter((c) => c.featured))
      }

      return Promise.resolve([])
    },
  }

  return <MockConvexContext.Provider value={mockClient}>{children}</MockConvexContext.Provider>
}

export function useQuery(queryRef: any, args?: any) {
  const queryName = queryRef._name || ""

  if (queryName.includes("shows:list")) {
    return mockShows
  }
  if (queryName.includes("shows:getLiveShows")) {
    return mockShows.filter((s) => s.isLive)
  }
  if (queryName.includes("playlists:list")) {
    return mockPlaylists
  }
  if (queryName.includes("hosts:list")) {
    return mockHosts
  }
  if (queryName.includes("creators:list")) {
    return mockCreators
  }
  if (queryName.includes("creators:getFeatured")) {
    return mockCreators.filter((c) => c.featured)
  }

  return []
}

export function useMutation() {
  return () => Promise.resolve()
}
