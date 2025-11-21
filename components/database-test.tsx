'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Database, CheckIcon, XIcon } from 'lucide-react'

export default function DatabaseTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [submissions, setSubmissions] = useState<any[]>([])

  const setupDatabase = async () => {
    setIsLoading(true)
    setStatus('idle')
    setMessage('')
    
    try {
      const response = await fetch('/api/setup-db')
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setMessage('Database setup completed successfully')
      } else {
        setStatus('error')
        setMessage(data.error || 'Unknown error')
      }
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to setup database')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/submissions')
      const data = await response.json()
      
      if (data.success) {
        setSubmissions(data.submissions || [])
        setStatus('success')
      } else {
        setStatus('error')
        setMessage(data.error || 'Unknown error')
      }
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to fetch submissions')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Connectivity Test
        </CardTitle>
        <CardDescription>
          Test the database connection for www.bangerboard.com
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'success' && (
          <Alert variant="default" className="bg-green-50 text-green-900 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        
        {status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {submissions.length > 0 && (
          <div className="mt-4 space-y-3">
            <h3 className="text-sm font-medium">Submissions</h3>
            <div className="grid gap-2">
              {submissions.map((sub) => (
                <div key={sub.id} className="p-3 border rounded-md flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{sub.url}</p>
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(sub.submitted_at).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">Meets criteria:</span>
                      {sub.meets_criteria ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <XIcon className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant={
                      sub.status === 'approved' 
                        ? 'default' 
                        : sub.status === 'hold_for_review' 
                          ? 'destructive' 
                          : 'outline'
                    }
                  >
                    {sub.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={setupDatabase} 
          disabled={isLoading}
        >
          {isLoading ? 'Setting up...' : 'Setup Database'}
        </Button>
        <Button 
          onClick={fetchSubmissions} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Test Connection'}
        </Button>
      </CardFooter>
    </Card>
  )
}
