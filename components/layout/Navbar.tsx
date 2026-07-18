"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { UserButton, SignedIn, SignedOut, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "All Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    label: "Community",
    href: "#",
    children: [
      { label: "Core Members", href: "/members" },
      { label: "Community Forum", href: "/community" },
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
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between gap-4 xl:gap-12 h-16">
          {/* Logo */}
          <div className="flex items-center z-10 shrink-0">
            <Link href="/" className="flex items-center gap-2 xl:gap-3 group">
              <div className="relative h-12 w-auto flex-shrink-0 flex items-center justify-center">
                <Image src="/logo.png" alt="Hacknfinity Logo" width={100} height={100} className="w-auto h-full drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300" priority />
              </div>
              <span className="font-display font-bold text-base xl:text-lg tracking-widest text-gradient hidden sm:block">
                HACKNFINITY
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center flex-1 whitespace-nowrap">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative group/dropdown"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-1.5 xl:px-3 py-2 text-[14px] xl:text-[15px] font-medium text-[var(--text-body)] hover:text-white transition-colors active:transform-none group/btn">
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 opacity-70 group-hover/btn:opacity-100",
                        activeDropdown === link.label && "rotate-180 opacity-100 text-purple-400"
                      )}
                    />
                  </button>
                  
                  {/* Invisible bridge to prevent hover loss */}
                  <div className="absolute top-full left-0 w-full h-2" />
                  
                  {/* Dropdown Menu - Bulletproof Centering */}
                  {activeDropdown === link.label && (
                    <div className="absolute top-full mt-2 left-0 right-0 flex justify-center pointer-events-none z-50">
                      <div className="w-[220px] shrink-0 pointer-events-auto glass-card py-3 shadow-2xl rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
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
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-1.5 xl:px-3 py-2 text-[14px] xl:text-[15px] font-medium transition-colors",
                    pathname === link.href
                      ? "text-white"
                      : "text-[var(--text-body)] hover:text-white"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 xl:gap-3">
              <ClerkLoading>
                <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedOut>
                  <Link href="/sign-in" className="text-[14px] xl:text-[15px] whitespace-nowrap font-medium text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors px-2 xl:px-4 py-2">
                    Log In
                  </Link>
                  <Link href="/sign-up" className="btn-primary text-[14px] xl:text-[15px] whitespace-nowrap px-4 xl:px-6 py-2 xl:py-2.5">
                    Join Free
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10 border-2 border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all"
                      }
                    }}
                  />
                </SignedIn>
              </ClerkLoaded>
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
              <ClerkLoading>
                <div className="h-10 rounded-lg bg-white/5 animate-pulse" />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedOut>
                  <Link href="/sign-in" className="btn-secondary text-sm text-center">
                    Log In
                  </Link>
                  <Link href="/sign-up" className="btn-primary text-sm text-center">
                    Join Free
                  </Link>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center py-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-10 h-10 border-2 border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </ClerkLoaded>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
