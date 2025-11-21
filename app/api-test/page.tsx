"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Advertisement, AdReview } from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EzoicAd from "@/components/ezoic-ad";
import { AdPlaceholders } from "@/lib/ezoic";

export default function ApiTestPage() {
  const [adsData, setAdsData] = useState<Advertisement[] | null>(null);
  const [singleAdData, setSingleAdData] = useState<Advertisement | null>(null);
  const [adReviews, setAdReviews] = useState<AdReview[] | null>(null);
  const [adIdInput, setAdIdInput] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [apiStatus, setApiStatus] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [ezoicStatus, setEzoicStatus] = useState<any>(null);

  // Function to test the GET /api/test/ezoic-status endpoint
  const testEzoicStatus = async () => {
    setLoading({ ...loading, ezoicStatus: true });
    setApiStatus({ ...apiStatus, ezoicStatus: "Testing..." });
    
    try {
      const response = await fetch("/api/test/ezoic-status");
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      const data = await response.json();
      setEzoicStatus(data);
      setApiStatus({ ...apiStatus, ezoicStatus: "✅ Success" });
    } catch (error) {
      console.error("Error testing ezoic status:", error);
      setApiStatus({ ...apiStatus, ezoicStatus: `❌ Failed: ${error}` });
    } finally {
      setLoading({ ...loading, ezoicStatus: false });
    }
  };

  // Function to test the GET /api/ads endpoint
  const testGetAllAds = async () => {
    setLoading({ ...loading, getAllAds: true });
    setApiStatus({ ...apiStatus, getAllAds: "Testing..." });
    
    try {
      const response = await fetch("/api/ads");
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      const data = await response.json();
      setAdsData(data);
      setApiStatus({ ...apiStatus, getAllAds: "✅ Success" });
    } catch (error) {
      console.error("Error testing GET /api/ads:", error);
      setApiStatus({ ...apiStatus, getAllAds: `❌ Failed: ${error}` });
    } finally {
      setLoading({ ...loading, getAllAds: false });
    }
  };

  // Function to test the GET /api/ads/[adId] endpoint
  const testGetAdById = async () => {
    if (!adIdInput) {
      setApiStatus({ ...apiStatus, getAdById: "❌ Please enter an ad ID" });
      return;
    }
    
    setLoading({ ...loading, getAdById: true });
    setApiStatus({ ...apiStatus, getAdById: "Testing..." });
    
    try {
      const response = await fetch(`/api/ads/${adIdInput}`);
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      const data = await response.json();
      setSingleAdData(data);
      setApiStatus({ ...apiStatus, getAdById: "✅ Success" });
    } catch (error) {
      console.error(`Error testing GET /api/ads/${adIdInput}:`, error);
      setApiStatus({ ...apiStatus, getAdById: `❌ Failed: ${error}` });
    } finally {
      setLoading({ ...loading, getAdById: false });
    }
  };

  // Function to test the GET /api/ads/[adId]/reviews endpoint
  const testGetAdReviews = async () => {
    if (!adIdInput) {
      setApiStatus({ ...apiStatus, getAdReviews: "❌ Please enter an ad ID" });
      return;
    }
    
    setLoading({ ...loading, getAdReviews: true });
    setApiStatus({ ...apiStatus, getAdReviews: "Testing..." });
    
    try {
      const response = await fetch(`/api/ads/${adIdInput}/reviews`);
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      const data = await response.json();
      setAdReviews(data);
      setApiStatus({ ...apiStatus, getAdReviews: "✅ Success" });
    } catch (error) {
      console.error(`Error testing GET /api/ads/${adIdInput}/reviews:`, error);
      setApiStatus({ ...apiStatus, getAdReviews: `❌ Failed: ${error}` });
    } finally {
      setLoading({ ...loading, getAdReviews: false });
    }
  };

  // Function to test the POST /api/ads/[adId]/reviews endpoint
  const testPostAdReview = async () => {
    if (!adIdInput) {
      setApiStatus({ ...apiStatus, postAdReview: "❌ Please enter an ad ID" });
      return;
    }
    
    if (!reviewContent) {
      setApiStatus({ ...apiStatus, postAdReview: "❌ Please enter review content" });
      return;
    }
    
    setLoading({ ...loading, postAdReview: true });
    setApiStatus({ ...apiStatus, postAdReview: "Testing..." });
    
    try {
      const response = await fetch(`/api/ads/${adIdInput}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: reviewContent,
          rating: Number(reviewRating)
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      
      const data = await response.json();
      setApiStatus({ ...apiStatus, postAdReview: "✅ Success" });
      
      // Refresh reviews after posting
      testGetAdReviews();
    } catch (error) {
      console.error(`Error testing POST /api/ads/${adIdInput}/reviews:`, error);
      setApiStatus({ ...apiStatus, postAdReview: `❌ Failed: ${error}` });
    } finally {
      setLoading({ ...loading, postAdReview: false });
    }
  };

  // Function to test ad impression tracking
  const testAdImpression = async () => {
    if (!adIdInput) {
      setApiStatus({ ...apiStatus, adImpression: "❌ Please enter an ad ID" });
      return;
    }
    
    setLoading({ ...loading, adImpression: true });
    setApiStatus({ ...apiStatus, adImpression: "Testing..." });
    
    try {
      // This would typically be called by the AdCard component
      // For testing, we can make a direct fetch call to a test endpoint
      const response = await fetch(`/api/test/ad-impression?adId=${adIdInput}`, {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      setApiStatus({ ...apiStatus, adImpression: "✅ Success" });
    } catch (error) {
      console.error(`Error testing ad impression:`, error);
      setApiStatus({ 
        ...apiStatus, 
        adImpression: `❌ Failed: ${error}. Note: You may need to create a test endpoint for this.` 
      });
    } finally {
      setLoading({ ...loading, adImpression: false });
    }
  };

  // Function to test ad click tracking
  const testAdClick = async () => {
    if (!adIdInput) {
      setApiStatus({ ...apiStatus, adClick: "❌ Please enter an ad ID" });
      return;
    }
    
    setLoading({ ...loading, adClick: true });
    setApiStatus({ ...apiStatus, adClick: "Testing..." });
    
    try {
      // This would typically be called by the AdCard component
      // For testing, we can make a direct fetch call to a test endpoint
      const response = await fetch(`/api/test/ad-click?adId=${adIdInput}`, {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      setApiStatus({ ...apiStatus, adClick: "✅ Success" });
    } catch (error) {
      console.error(`Error testing ad click:`, error);
      setApiStatus({ 
        ...apiStatus, 
        adClick: `❌ Failed: ${error}. Note: You may need to create a test endpoint for this.` 
      });
    } finally {
      setLoading({ ...loading, adClick: false });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      <Tabs defaultValue="ads">
        <TabsList className="mb-6">
          <TabsTrigger value="ads">Ads API</TabsTrigger>
          <TabsTrigger value="ezoic">Ezoic Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ads">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Test GET /api/ads</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testGetAllAds}
                  disabled={loading.getAllAds}
                >
                  {loading.getAllAds ? "Testing..." : "Test Get All Ads"}
                </Button>
                <div className="mt-2">Status: {apiStatus.getAllAds || "Not tested"}</div>
                
                {adsData && (
                  <div className="mt-4">
                    <div className="font-bold">Found {adsData.length} ads</div>
                    <div className="max-h-60 overflow-y-auto mt-2">
                      <pre className="text-xs bg-gray-100 p-2 rounded">
                        {JSON.stringify(adsData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Test GET /api/ads/[adId]</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter Ad ID"
                    value={adIdInput}
                    onChange={(e) => setAdIdInput(e.target.value)}
                  />
                  <Button 
                    onClick={testGetAdById}
                    disabled={loading.getAdById}
                  >
                    {loading.getAdById ? "Testing..." : "Test"}
                  </Button>
                </div>
                <div className="mt-2">Status: {apiStatus.getAdById || "Not tested"}</div>
                
                {singleAdData && (
                  <div className="mt-4">
                    <div className="font-bold">Ad Details:</div>
                    <div className="max-h-60 overflow-y-auto mt-2">
                      <pre className="text-xs bg-gray-100 p-2 rounded">
                        {JSON.stringify(singleAdData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Test GET /api/ads/[adId]/reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter Ad ID"
                    value={adIdInput}
                    onChange={(e) => setAdIdInput(e.target.value)}
                  />
                  <Button 
                    onClick={testGetAdReviews}
                    disabled={loading.getAdReviews}
                  >
                    {loading.getAdReviews ? "Testing..." : "Test"}
                  </Button>
                </div>
                <div className="mt-2">Status: {apiStatus.getAdReviews || "Not tested"}</div>
                
                {adReviews && (
                  <div className="mt-4">
                    <div className="font-bold">Found {adReviews.length} reviews</div>
                    <div className="max-h-60 overflow-y-auto mt-2">
                      <pre className="text-xs bg-gray-100 p-2 rounded">
                        {JSON.stringify(adReviews, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Test POST /api/ads/[adId]/reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter Ad ID"
                    value={adIdInput}
                    onChange={(e) => setAdIdInput(e.target.value)}
                  />
                  <Textarea
                    placeholder="Review content"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <label>Rating (1-5):</label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <Button 
                    onClick={testPostAdReview}
                    disabled={loading.postAdReview}
                  >
                    {loading.postAdReview ? "Testing..." : "Submit Review"}
                  </Button>
                </div>
                <div className="mt-2">Status: {apiStatus.postAdReview || "Not tested"}</div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Additional Tests (Ad Tracking)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Ad Impression Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter Ad ID"
                    value={adIdInput}
                    onChange={(e) => setAdIdInput(e.target.value)}
                  />
                  <Button 
                    onClick={testAdImpression}
                    disabled={loading.adImpression}
                  >
                    {loading.adImpression ? "Testing..." : "Test"}
                  </Button>
                </div>
                <div className="mt-2">Status: {apiStatus.adImpression || "Not tested"}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Note: This would typically be handled automatically by the AdCard component.
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Test Ad Click Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter Ad ID"
                    value={adIdInput}
                    onChange={(e) => setAdIdInput(e.target.value)}
                  />
                  <Button 
                    onClick={testAdClick}
                    disabled={loading.adClick}
                  >
                    {loading.adClick ? "Testing..." : "Test"}
                  </Button>
                </div>
                <div className="mt-2">Status: {apiStatus.adClick || "Not tested"}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Note: This would typically be handled automatically by the AdCard component.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="ezoic">
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Ezoic Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testEzoicStatus}
                  disabled={loading.ezoicStatus}
                  className="mb-4"
                >
                  {loading.ezoicStatus ? "Testing..." : "Check Ezoic Status"}
                </Button>
                <div className="mt-2 mb-4">Status: {apiStatus.ezoicStatus || "Not tested"}</div>
                
                {ezoicStatus && (
                  <div className="mt-4">
                    <div className="font-bold">Ezoic Configuration:</div>
                    <div className="max-h-60 overflow-y-auto mt-2">
                      <pre className="text-xs bg-gray-100 p-2 rounded">
                        {JSON.stringify(ezoicStatus, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Test Ezoic Ad Placeholders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Below are some Ezoic ad placeholders to verify they are functioning correctly. 
                  Actual ads will appear here when the Ezoic script is properly loaded.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold">Header Ad (101)</p>
                    <EzoicAd id={AdPlaceholders.HEADER} className="h-[90px] mb-4" />
                    
                    <p className="mb-2 text-xs font-semibold">Content Top Ad (104)</p>
                    <EzoicAd id={AdPlaceholders.CONTENT_TOP} className="h-[250px] mb-4" />
                  </div>
                  
                  <div>
                    <p className="mb-2 text-xs font-semibold">Sidebar Top Ad (102)</p>
                    <EzoicAd id={AdPlaceholders.SIDEBAR_TOP} className="h-[250px] mb-4" />
                    
                    <p className="mb-2 text-xs font-semibold">Native Ad (301)</p>
                    <EzoicAd id={AdPlaceholders.NATIVE_1} className="h-[250px] mb-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
