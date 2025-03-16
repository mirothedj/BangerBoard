import Header from "@/components/header"
import LoginModal from "@/components/login-modal"
import QuickSubmitForm from "@/components/quick-submit-form"
import { ModeToggle } from "@/components/mode-toggle"
import { getShows } from "@/lib/db"
import HomeContent from "@/components/home-content"

export default async function Home() {
  const shows = await getShows()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Tagline */}
      <div className="w-full text-center pt-4">
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Find, Rank, Feedback &amp; Review - a network list your fav sources of music creators, artists, DJs, hosts,
          shows, brands and most of all Fans!
        </p>
      </div>

      {/* Glass panel with neon LED effect */}
      <div className="w-full relative overflow-hidden" style={{ height: "30px", marginBottom: "-5px", zIndex: 1 }}>
        <div
          className="absolute bottom-0 w-full"
          style={{
            height: "30px",
            background: "rgba(10, 10, 20, 0.3)",
            backdropFilter: "blur(5px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 -5px 15px rgba(255, 60, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Neon LED rope effect with fallback to logo */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              background: "linear-gradient(0deg, #ff3c00 0%, transparent 70%)",
              opacity: 0.7,
              boxShadow: "0 0 10px 2px #ff3c00, 0 0 20px 5px rgba(255, 60, 0, 0.5)",
              animation: "waveRadiate 3s ease-in-out infinite",
              transform: "translateY(50%)",
              transformOrigin: "bottom",
            }}
          />
          {/* Additional wave layers for depth */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              background: "linear-gradient(0deg, #ff7e00 0%, transparent 70%)",
              opacity: 0.5,
              boxShadow: "0 0 8px 1px #ff7e00",
              animation: "waveRadiate 3s ease-in-out infinite 0.5s",
              transform: "translateY(50%)",
              transformOrigin: "bottom",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              background: "linear-gradient(0deg, #ff5500 0%, transparent 70%)",
              opacity: 0.3,
              boxShadow: "0 0 5px 1px #ff5500",
              animation: "waveRadiate 3s ease-in-out infinite 1s",
              transform: "translateY(50%)",
              transformOrigin: "bottom",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 relative" style={{ zIndex: -2 }}>
        <HomeContent shows={shows} />
      </div>

      <div className="container mx-auto px-4 py-6 border-t border-border/30">
        <QuickSubmitForm />
      </div>

      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>

      <LoginModal />
    </main>
  )
}

