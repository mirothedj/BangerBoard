'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SubmissionActionResultPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    const processAction = async () => {
      try {
        // Get action parameters from URL
        const action = searchParams.get('action')
        const id = searchParams.get('id')
        const token = searchParams.get('token')
        
        if (!action || !id || !token) {
          setStatus('error')
          setMessage('Missing required parameters')
          return
        }
        
        // Call the API to process the action
        const response = await fetch(`/api/submission-action?action=${action}&id=${id}&token=${token}`)
        const data = await response.json()
        
        if (data.success) {
          setStatus('success')
          setMessage(data.message)
        } else {
          setStatus('error')
          setMessage(data.error || 'An error occurred')
        }
      } catch (error) {
        setStatus('error')
        setMessage('Failed to process action')
        console.error('Error processing action:', error)
      }
    }
    
    processAction()
  }, [searchParams])
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {status === 'loading' && 'Processing...'}
            {status === 'success' && 'Action Completed'}
            {status === 'error' && 'Action Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {status === 'loading' ? 'Please wait while we process your request' : 'Submission action result'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {status === 'success' && (
            <Alert variant="default" className="bg-green-50 text-green-900 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          
          {status === 'error' && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" passHref>
            <Button variant="outline">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
