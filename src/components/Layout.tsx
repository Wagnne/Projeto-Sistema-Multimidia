import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/audio", label: "Áudio" },
    { path: "/video", label: "Vídeo" },
    { path: "/animation", label: "Animação" },
    { path: "/quiz", label: "Quiz" },
    { path: "/team", label: "Equipe" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-primary">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M15 20 L25 15 L25 25 Z" fill="currentColor" />
                </svg>
                <span className="ml-2 text-2xl font-bold text-gradient">aniView</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p className="mb-2">
              <span className="text-gradient font-bold">aniView</span> - Protótipo Multimídia Educacional
            </p>
            <p>Sistemas Multimídia - 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
