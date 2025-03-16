// Email notification system for Bangerboard
import { generateActionToken } from './auth';

interface ApprovalEmailData {
  id?: string;
  url: string;
  platform: string;
  submittedAt: Date;
  reason: string;
  contentSnippet?: string;
}

/**
 * Sends an approval request email for submissions that need review
 */
export async function sendApprovalEmail(data: ApprovalEmailData): Promise<boolean> {
  try {
    // Generate a dummy ID for development mode or use the provided ID
    const submissionId = data.id || `dev-${Date.now()}`;
    
    // Generate action tokens for approval/disapproval
    const { approveUrl, disapproveUrl } = await generateActionToken(submissionId);
    
    // In a production environment, you would integrate with a real email service
    // such as SendGrid, AWS SES, Mailchimp, etc.
    
    // For now, we'll just log the email that would be sent
    console.log('---------- EMAIL NOTIFICATION -----------');
    console.log(`TO: mirothedj@gmail.com`);
    console.log(`SUBJECT: APPROVAL REQUEST - New ${data.platform} submission`);
    console.log(`BODY:`);
    console.log(`A new submission requires your approval:`);
    console.log(`- URL: ${data.url}`);
    console.log(`- Platform: ${data.platform}`);
    console.log(`- Submitted: ${data.submittedAt.toLocaleString()}`);
    console.log(`- Reason for review: ${data.reason}`);
    console.log(`\nContent snippet:`);
    console.log(data.contentSnippet || 'No content available');
    console.log(`\nAction Links:`);
    console.log(`- APPROVE: ${approveUrl}`);
    console.log(`- DISAPPROVE: ${disapproveUrl}`);
    console.log('--------------------------------------');
    
    // In development mode, consider this a successful email
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    // For production, here's where you'd integrate with a real email service
    // Example with a hypothetical email service:
    /*
    const result = await emailService.send({
      to: 'mirothedj@gmail.com',
      subject: `APPROVAL REQUEST - New ${data.platform} submission`,
      text: `
        A new submission requires your approval:
        - URL: ${data.url}
        - Platform: ${data.platform}
        - Submitted: ${data.submittedAt.toLocaleString()}
        - Reason for review: ${data.reason}
        
        Content snippet:
        ${data.contentSnippet || 'No content available'}
        
        To approve this submission, click here: ${approveUrl}
        To disapprove this submission, click here: ${disapproveUrl}
      `,
      html: `
        <h2>A new submission requires your approval</h2>
        <ul>
          <li><strong>URL:</strong> ${data.url}</li>
          <li><strong>Platform:</strong> ${data.platform}</li>
          <li><strong>Submitted:</strong> ${data.submittedAt.toLocaleString()}</li>
          <li><strong>Reason for review:</strong> ${data.reason}</li>
        </ul>
        <h3>Content snippet:</h3>
        <p>${data.contentSnippet || 'No content available'}</p>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="${approveUrl}" style="display: inline-block; margin: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
            Approve Submission
          </a>
          <a href="${disapproveUrl}" style="display: inline-block; margin: 10px; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 4px;">
            Disapprove Submission
          </a>
        </div>
      `
    });
    return result.success;
    */
    
    return true;
  } catch (error) {
    console.error('Error sending approval email:', error);
    return false;
  }
} 