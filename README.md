# Bangerboard V1

Bangerboard is a platform to find, rank, and provide feedback on music creators, artists, DJs, hosts, shows, brands, and fans!

## Features

- Discover music review shows across various platforms (YouTube, Twitch, Instagram, TikTok)
- Submit new shows for inclusion in the database
- Automated show profile creation based on content criteria
- Email notifications for review submissions
- Interactive approval/disapproval system

## Technology Stack

- Next.js 15
- Vercel Postgres
- Tailwind CSS
- TypeScript
- Server Actions

## Development

To run this project locally:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
NEXT_PUBLIC_APP_URL=
```

## Deployment

This project is deployed on Vercel and connected to GitHub for continuous deployment. 