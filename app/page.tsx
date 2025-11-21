import Header from "@/components/header"
import EnhancedLoginModal from "@/components/enhanced-login-modal"
import QuickSubmitForm from "@/components/quick-submit-form"
import { ModeToggle } from "@/components/mode-toggle"
import { getShows } from "@/lib/db"
import LiveShowsBar from "@/components/live-shows-bar"
import HomeContent from "@/components/home-content"

export default async function Home() {
  const shows = await getShows()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="w-full border-b border-border/30 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight text-balance text-center mb-4">
            Discover the Best Live Music Shows
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A community-driven platform to find, rate, and review music shows from creators, artists, DJs, and hosts
            across all platforms
          </p>
        </div>
      </div>

      <LiveShowsBar shows={shows} />

      <div className="container mx-auto px-4 lg:px-8 py-8 flex-1 relative">
        <HomeContent shows={shows} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 border-t border-border/30">
        <QuickSubmitForm />
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <ModeToggle />
      </div>

      <EnhancedLoginModal />
    </main>
  )
}
