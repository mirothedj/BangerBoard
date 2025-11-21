# BangerBoard Sitemap

## Static Version (Current Implementation)

\`\`\`mermaid
graph TD
    A[Home Page] --> B[Show Listings]
    A --> C[Artist Search]
    B --> D[Show Details]
    C --> E[Search Results]
    E --> D
    D --> F[Related Shows]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#dfd,stroke:#333,stroke-width:2px
    style E fill:#dfd,stroke:#333,stroke-width:2px
    style F fill:#dfd,stroke:#333,stroke-width:2px
\`\`\`

### Page Descriptions (Static)

#### Home Page (/)
- Navigation menu
- Featured shows
- Quick search
- Social media links

#### Show Listings (/shows)
- Grid view of all shows
- Filtering options
- Sort by date/popularity

#### Artist Search (/search)
- Search input
- Recent searches
- Popular artists

#### Show Details (/shows/[id])
- Show information
- Artist details
- Related content
- Share options

## Dynamic Version (Vercel Implementation)

\`\`\`mermaid
graph TD
    A[Home Page] --> B[Show Listings]
    A --> C[Artist Search]
    A --> H[User Dashboard]
    B --> D[Show Details]
    C --> E[Search Results]
    E --> D
    D --> F[Related Shows]
    H --> I[Favorites]
    H --> J[Submissions]
    B --> K[Submit Show]
    K --> L[Review Queue]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#dfd,stroke:#333,stroke-width:2px
    style E fill:#dfd,stroke:#333,stroke-width:2px
    style F fill:#dfd,stroke:#333,stroke-width:2px
    style H fill:#ffd,stroke:#333,stroke-width:2px
    style I fill:#ffd,stroke:#333,stroke-width:2px
    style J fill:#ffd,stroke:#333,stroke-width:2px
    style K fill:#faa,stroke:#333,stroke-width:2px
    style L fill:#faa,stroke:#333,stroke-width:2px
\`\`\`

### Additional Pages (Dynamic Version)

#### User Dashboard (/dashboard)
- User profile
- Saved shows
- Submission history
- Preferences

#### Submit Show (/submit)
- Show submission form
- Upload interface
- Preview functionality

#### Review Queue (/admin/review)
- Pending submissions
- Moderation tools
- Batch actions

## Technical Architecture

### Static Version
\`\`\`mermaid
graph LR
    A[Client] --> B[GitHub Pages]
    B --> C[Static Assets]
    C --> D[Pre-rendered Pages]
    D --> E[Client-side Search]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#dfd,stroke:#333,stroke-width:2px
    style D fill:#dfd,stroke:#333,stroke-width:2px
    style E fill:#ffd,stroke:#333,stroke-width:2px
\`\`\`

### Dynamic Version
\`\`\`mermaid
graph LR
    A[Client] --> B[Vercel Edge]
    B --> C[Next.js Server]
    C --> D[Database]
    C --> E[API Routes]
    E --> F[External Services]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#dfd,stroke:#333,stroke-width:2px
    style D fill:#ffd,stroke:#333,stroke-width:2px
    style E fill:#faa,stroke:#333,stroke-width:2px
    style F fill:#faa,stroke:#333,stroke-width:2px
\`\`\`

## Component Flow

### Static Components
\`\`\`mermaid
graph TD
    A[Layout] --> B[Header]
    A --> C[Main Content]
    A --> D[Footer]
    C --> E[Show Grid]
    C --> F[Search Box]
    E --> G[Show Card]
    F --> H[Search Results]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#dfd,stroke:#333,stroke-width:2px
    style E fill:#dfd,stroke:#333,stroke-width:2px
    style F fill:#ffd,stroke:#333,stroke-width:2px
    style G fill:#ffd,stroke:#333,stroke-width:2px
    style H fill:#faa,stroke:#333,stroke-width:2px
\`\`\`

### Dynamic Components
\`\`\`mermaid
graph TD
    A[Layout] --> B[Header]
    A --> C[Main Content]
    A --> D[Footer]
    B --> E[Auth Menu]
    C --> F[Dynamic Content]
    F --> G[Show Grid]
    F --> H[Submit Form]
    F --> I[User Profile]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#dfd,stroke:#333,stroke-width:2px
    style E fill:#dfd,stroke:#333,stroke-width:2px
    style F fill:#ffd,stroke:#333,stroke-width:2px
    style G fill:#ffd,stroke:#333,stroke-width:2px
    style H fill:#faa,stroke:#333,stroke-width:2px
    style I fill:#faa,stroke:#333,stroke-width:2px
\`\`\`

## Data Flow

### Static Data Flow
\`\`\`mermaid
graph LR
    A[Static Data] --> B[Build Process]
    B --> C[Pre-rendered Pages]
    C --> D[Client]
    D --> E[Client-side Search]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#dfd,stroke:#333,stroke-width:2px
    style D fill:#ffd,stroke:#333,stroke-width:2px
    style E fill:#faa,stroke:#333,stroke-width:2px
\`\`\`

### Dynamic Data Flow
\`\`\`mermaid
graph LR
    A[Client Request] --> B[API Route]
    B --> C[Database Query]
    C --> D[Data Processing]
    D --> E[Response]
    E --> F[Client Update]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#dfd,stroke:#333,stroke-width:2px
    style D fill:#ffd,stroke:#333,stroke-width:2px
    style E fill:#faa,stroke:#333,stroke-width:2px
    style F fill:#faa,stroke:#333,stroke-width:2px
\`\`\`

Note: This sitemap uses Mermaid.js for diagrams. View in a Markdown viewer that supports Mermaid for proper rendering.
