# BangerBoard - Dynamic Version (Vercel Deployment)

This directory contains the dynamic version of BangerBoard, optimized for deployment on Vercel. Unlike the static GitHub Pages version, this implementation includes full server-side functionality.

## Key Features (Additional to Static Version)
- Dynamic API routes for real-time data fetching
- Server-side actions for form submissions
- Database integration capabilities
- Real-time show scraping and updates
- Dynamic thumbnail refresh functionality

## Deployment Instructions

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Copy the contents of this directory to a new repository

4. Deploy to Vercel:
   ```bash
   vercel login
   vercel
   ```

## Key Differences from Static Version
- Maintains full database functionality
- Server-side API routes are preserved
- Form submissions work in real-time
- Show data can be dynamically updated
- No need for static data files

## Environment Variables Required
```
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=your_api_url
```

## Directory Structure
- `/app/actions` - Server actions for database operations
- `/app/api` - API routes for dynamic functionality
- `/lib/db-setup.ts` - Database configuration and setup

## Additional Setup Required
1. Set up a database (PostgreSQL recommended)
2. Configure environment variables in Vercel dashboard
3. Set up automatic deployments from your repository

## Why Choose This Version?
Choose this version if you need:
- Real-time data updates
- User submissions
- Database integration
- Server-side processing
- Full dynamic functionality

Note: This version requires a Vercel deployment and may incur hosting costs depending on usage levels. 