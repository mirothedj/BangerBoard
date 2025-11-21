"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, RefreshCw } from "lucide-react"
import { scrapeAllShows, scrapeShow } from "@/app/actions/shows"

export default function ScrapePage() {
  const [isScrapingAll, setIsScrapingAll] = useState(false)
  const [isScrapingOne, setIsScrapingOne] = useState(false)
  const [showId, setShowId] = useState("")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScrapeAll = async () => {
    setIsScrapingAll(true)
    setError(null)
    setResult(null)

    try {
      const response = await scrapeAllShows()
      setResult(response)
      if (!response.success) {
        setError(response.error || "Failed to scrape shows")
      }
    } catch (err) {
      console.error("Error scraping shows:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsScrapingAll(false)
    }
  }

  const handleScrapeOne = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsScrapingOne(true)
    setError(null)
    setResult(null)

    try {
      const id = Number.parseInt(showId, 10)
      if (isNaN(id)) {
        setError("Please enter a valid show ID")
        setIsScrapingOne(false)
        return
      }

      const response = await scrapeShow(id)
      setResult(response)
      if (!response.success) {
        setError(response.error || `Failed to scrape show ${id}`)
      }
    } catch (err) {
      console.error("Error scraping show:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsScrapingOne(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Scrape Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scrape All Shows</CardTitle>
            <CardDescription>
              Scrape content from all shows across YouTube, Twitch, Instagram, and TikTok
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleScrapeAll} disabled={isScrapingAll} className="w-full">
              {isScrapingAll ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Scraping...
                </>
              ) : (
                "Scrape All Shows"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scrape Single Show</CardTitle>
            <CardDescription>Scrape content from a specific show by ID</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScrapeOne} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="showId">Show ID</Label>
                <Input
                  id="showId"
                  value={showId}
                  onChange={(e) => setShowId(e.target.value)}
                  placeholder="Enter show ID"
                  type="number"
                  required
                />
              </div>
              <Button type="submit" disabled={isScrapingOne} className="w-full">
                {isScrapingOne ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  "Scrape Show"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && result.success && (
        <Alert className="mt-6 bg-green-500/20 border-green-500 text-green-500">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Scrape Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
