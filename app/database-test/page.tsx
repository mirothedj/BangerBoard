import DatabaseTest from "@/components/database-test"

export const metadata = {
  title: "Database Test | Bangerboard",
  description: "Test database connectivity for www.bangerboard.com",
}

export default function DatabaseTestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-8">
        Database Connection Test
      </h1>
      <DatabaseTest />
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          This page is for testing the database connectivity for www.bangerboard.com
        </p>
      </div>
    </div>
  )
} 