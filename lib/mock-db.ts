// Mock implementation of @vercel/postgres for local testing
import { Show, Review } from './db';

// Mock submissions database for testing
const mockSubmissions = [
  {
    id: 1,
    url: 'https://youtube.com/example1',
    platform: 'youtube',
    submitted_at: new Date(),
    status: 'pending',
    meets_criteria: true
  },
  {
    id: 2,
    url: 'https://tiktok.com/example2',
    platform: 'tiktok',
    submitted_at: new Date(),
    status: 'hold_for_review',
    meets_criteria: false
  }
];

// Mock shows database for testing
const mockShows = [
  {
    id: 1,
    url: 'https://youtube.com/example1',
    title: 'Example YouTube Show',
    platform: 'youtube',
  }
];

// Mock SQL query function
export async function sql(strings: TemplateStringsArray, ...values: any[]) {
  console.log('Mock SQL query:', strings.join('?'), values);
  
  // Simple handling for different query types
  const queryString = strings.join('?').toLowerCase();
  
  // For insert submissions queries
  if (queryString.includes('insert into submissions')) {
    const url = values[0];
    const platform = values[1];
    const date = values[2];
    const status = values[3];
    const meetsCriteria = values[4] !== undefined ? values[4] : false;
    
    // Create new ID
    const id = mockSubmissions.length + 1;
    
    // Add to mock database
    const newSubmission = {
      id,
      url,
      platform,
      submitted_at: new Date(date),
      status,
      meets_criteria: meetsCriteria
    };
    mockSubmissions.push(newSubmission);
    
    console.log('Mock insert submission:', newSubmission);
    
    return { 
      rowCount: 1,
      rows: [{ id }]
    };
  }
  
  // For select submissions queries
  if (queryString.includes('select * from submissions')) {
    // Check if filtering by URL
    if (values.length > 0 && values[0] && typeof values[0] === 'string') {
      const url = values[0];
      const matchingSubmissions = mockSubmissions.filter(sub => sub.url === url);
      
      return {
        rowCount: matchingSubmissions.length,
        rows: matchingSubmissions
      };
    }
    
    // Return all submissions
    return {
      rowCount: mockSubmissions.length,
      rows: mockSubmissions
    };
  }
  
  // For select shows queries
  if (queryString.includes('select * from shows')) {
    // Check if filtering by URL
    if (values.length > 0 && values[0] && typeof values[0] === 'string') {
      const url = values[0];
      const matchingShows = mockShows.filter(show => show.url === url);
      
      return {
        rowCount: matchingShows.length,
        rows: matchingShows
      };
    }
    
    // Return all shows
    return {
      rowCount: mockShows.length,
      rows: mockShows
    };
  }
  
  // For update submissions queries
  if (queryString.includes('update submissions')) {
    const id = values[0];
    const submission = mockSubmissions.find(sub => sub.id === parseInt(id));
    
    if (submission) {
      submission.status = 'approved';
      return {
        rowCount: 1,
        rows: [submission]
      };
    }
    
    return {
      rowCount: 0,
      rows: []
    };
  }
  
  // For delete submissions queries
  if (queryString.includes('delete from submissions')) {
    const id = values[0];
    const index = mockSubmissions.findIndex(sub => sub.id === parseInt(id));
    
    if (index !== -1) {
      mockSubmissions.splice(index, 1);
      return {
        rowCount: 1,
        rows: []
      };
    }
    
    return {
      rowCount: 0,
      rows: []
    };
  }
  
  // For table creation queries
  if (queryString.includes('create table if not exists submissions')) {
    return {
      rowCount: 0,
      rows: []
    };
  }
  
  // Default response
  return {
    rowCount: 0,
    rows: []
  };
}

// Helper function to setup mock database
export async function setupMockDatabase() {
  console.log('Setting up mock database tables');
  return { success: true };
} 