import { Link } from "@tanstack/react-router"
import { Music, Github, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/30 bg-background neo-subtle mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="neo-raised rounded-2xl p-3 bg-background transition-transform group-hover:scale-105">
                <Music className="h-7 w-7 text-primary" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BangerBoard
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Discover, rate, and share the hottest live music shows. Connect with artists, hosts, and music lovers
              worldwide.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-raised rounded-xl p-3 bg-background hover:neo-inset transition-all"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-raised rounded-xl p-3 bg-background hover:neo-inset transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-raised rounded-xl p-3 bg-background hover:neo-inset transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="mailto:hello@bangerboard.com"
                className="neo-raised rounded-xl p-3 bg-background hover:neo-inset transition-all"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Live Shows
                </Link>
              </li>
              <li>
                <Link to="/playlists" className="text-muted-foreground hover:text-primary transition-colors">
                  Playlists
                </Link>
              </li>
              <li>
                <Link to="/hosts" className="text-muted-foreground hover:text-primary transition-colors">
                  Hosts
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-muted-foreground hover:text-primary transition-colors">
                  Creators
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} BangerBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
