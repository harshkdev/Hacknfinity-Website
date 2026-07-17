"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Community",
    href: "#",
    children: [
      { label: "Core Members", href: "/members" },
      { label: "Community Forum", href: "/community" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "All Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Resource Hub", href: "/resources" },
      { label: "Certificates", href: "/certificates" },
      { label: "Opportunities", href: "/opportunities" },
    ],
  },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "nav-blur shadow-lg" : "bg-transparent"
      )}
      style={{ top: "var(--banner-height, 0px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-8 w-auto flex-shrink-0 flex items-center justify-center">
              <Image src="/logo.png" alt="Hacknfinity Logo" width={60} height={60} className="w-auto h-full drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300" priority />
            </div>
            <span className="font-display font-bold text-lg tracking-widest text-gradient hidden sm:block">
              HACKNFINITY
            </span>
          </Link>

          {/* Desktop Nav - Perfectly Centered */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 gap-1 xl:gap-2">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative group/dropdown"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-all rounded-lg hover:bg-white/5 data-[state=open]:bg-white/5 data-[state=open]:text-[var(--text-primary)]">
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200 opacity-70",
                        activeDropdown === link.label && "rotate-180 opacity-100"
                      )}
                    />
                  </button>
                  
                  {/* Invisible bridge to prevent hover loss */}
                  <div className="absolute top-[100%] left-0 w-full h-4" />
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === link.label && (
                    <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[220px] glass-card py-3 shadow-2xl rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center px-5 py-2.5 text-[15px] transition-colors",
                            pathname === child.href 
                              ? "text-purple-400 font-medium bg-purple-500/10" 
                              : "text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-white/5"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2.5 text-[15px] font-medium transition-all rounded-lg",
                    pathname === link.href
                      ? "text-[var(--text-primary)] bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      : "text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="hidden sm:flex p-2 rounded-full hover:bg-white/10 transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-3 border-l border-white/10 pl-4">
              <Link href="/login" className="text-[15px] font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors px-4 py-2">
                Log In
              </Link>
              <Link href="/signup" className="btn-primary text-[15px] px-6 py-2.5">
                Join Free
              </Link>
            </div>
            


            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-[var(--text-body)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden nav-blur border-t border-[var(--border-subtle)] max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === link.label ? null : link.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="pl-4 mt-1 space-y-1 border-l border-purple-500/20 ml-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-white/5"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      pathname === link.href
                        ? "text-purple-400 bg-purple-500/10"
                        : "text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-3 flex flex-col gap-2 border-t border-[var(--border-subtle)]">
              <Link href="/sign-in" className="btn-secondary text-sm text-center">
                Log In
              </Link>
              <Link href="/sign-up" className="btn-primary text-sm text-center">
                Join Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
