"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (filters: FilterOptions) => void
  onClear: () => void
}

interface FilterOptions {
  platform?: string
  rating?: string
  isLive?: boolean
  sortBy?: string
}

export default function SearchFilter({ onSearch, onFilter, onClear }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterOptions>({
    platform: "all",
    rating: "any",
    isLive: undefined,
    sortBy: "default",
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setFilters({ platform: "all", rating: "any", isLive: undefined, sortBy: "default" })
    setShowFilters(false)
    onClear()
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search shows, hosts, or platforms..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {(searchQuery || activeFilterCount > 0) && (
          <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            <Select
              value={filters.platform || "all"}
              onValueChange={(value) => handleFilterChange("platform", value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="twitch">Twitch</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <Select
              value={filters.rating || "any"}
              onValueChange={(value) => handleFilterChange("rating", value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any rating</SelectItem>
                <SelectItem value="5+">5+ 🔥</SelectItem>
                <SelectItem value="4+">4+ 🔥</SelectItem>
                <SelectItem value="3+">3+ 🔥</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={filters.isLive?.toString() || "undefined"}
              onValueChange={(value) =>
                handleFilterChange("isLive", value === "true" ? true : value === "false" ? false : undefined)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undefined">Any status</SelectItem>
                <SelectItem value="true">Live now</SelectItem>
                <SelectItem value="false">Not live</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort by</label>
            <Select
              value={filters.sortBy || "default"}
              onValueChange={(value) => handleFilterChange("sortBy", value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="platform">Platform</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
