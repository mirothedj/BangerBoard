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
