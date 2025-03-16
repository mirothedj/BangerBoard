// Authentication utilities for Bangerboard
import { createHash, randomBytes } from 'crypto';

// Store tokens in memory (in a real app, these would be in a database)
// Format: { submissionId: { token: string, expiresAt: Date } }
const actionTokens: Record<string, { token: string, expiresAt: Date }> = {};

/**
 * Generates a secure action token for a submission
 * @param submissionId The ID of the submission
 * @returns The generated token and full action URLs
 */
export async function generateActionToken(submissionId: string): Promise<{
  token: string;
  approveUrl: string;
  disapproveUrl: string;
  expiresAt: Date;
}> {
  // Generate a random token
  const token = randomBytes(32).toString('hex');
  
  // Set expiration to 7 days from now
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  // Store the token
  actionTokens[submissionId] = {
    token,
    expiresAt
  };
  
  // Generate action URLs
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const approveUrl = `${baseUrl}/api/submission-action?action=approve&id=${submissionId}&token=${token}`;
  const disapproveUrl = `${baseUrl}/api/submission-action?action=disapprove&id=${submissionId}&token=${token}`;
  
  return {
    token,
    approveUrl,
    disapproveUrl,
    expiresAt
  };
}

/**
 * Verifies an action token for a submission
 * @param submissionId The ID of the submission
 * @param token The token to verify
 * @returns Whether the token is valid
 */
export async function verifyActionToken(submissionId: string, token: string): Promise<boolean> {
  // Get the stored token
  const storedToken = actionTokens[submissionId];
  
  // If no token exists or it's expired, return false
  if (!storedToken || storedToken.token !== token || storedToken.expiresAt < new Date()) {
    return false;
  }
  
  // If we're in development mode, always return true for testing
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // Token is valid
  return true;
}

/**
 * Creates a hash of a URL for duplicate checking
 * @param url The URL to hash
 * @returns The hashed URL
 */
export function hashUrl(url: string): string {
  return createHash('sha256').update(url.toLowerCase().trim()).digest('hex');
} 