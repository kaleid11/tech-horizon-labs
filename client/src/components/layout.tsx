import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, Search, Zap, Users, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import logoWebp from "@/assets/logo-80.webp";
import logoPng from "@/assets/logo.png";
import noosaChamberLogo from "@/assets/noosa-chamber-160.webp";
import { BOOKING_URL } from "@/components/contact-form-dialog";

// Skip link component for accessibility
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-salmon-500 focus:text-aubergine-900 focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceItems = [
    { name: "Readiness Assessment", href: "/services/audit", icon: Search, desc: "Free 15-min discovery call" },
    { name: "Foundation Sprint", href: "/services/accelerator", icon: Zap, desc: "4-week implementation sprint" },
    { name: "Ongoing Evolution", href: "/services/partner", icon: Users, desc: "Continuous AI partnership" },
  ];

  const navItems = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Research", href: "/research" },
    { name: "Locations", href: "/locations/queensland" },
    { name: "Academy", href: "/academy" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-aubergine-900/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img src={logoPng} alt="Tech Horizon Labs - AI Consulting Sunshine Coast" className="h-10 w-auto" width={40} height={40} />
          </picture>
          <span className="hidden sm:inline">Tech Horizon Labs</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="text-sm font-medium text-gray-300 hover:text-salmon-500 transition-colors flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-salmon-500 focus-visible:ring-offset-2 focus-visible:ring-offset-aubergine-900 rounded"
                data-testid="nav-services-dropdown"
                aria-label="Services menu"
                aria-haspopup="menu"
              >
                Services
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 bg-white border border-gray-100 shadow-xl rounded-xl p-2">
              {serviceItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <a 
                    href={item.href}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-salmon-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-salmon-600" />
                    </div>
                    <div>
                      <div className="font-medium text-aubergine-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-salmon-500 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Button data-testid="button-nav-book-discovery" className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-semibold shadow-lg shadow-salmon-500/20 rounded-full px-6 transition-all hover:scale-105" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" />
              Book Discovery
            </a>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-salmon-500"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-aubergine-900 border-gray-800 text-white">
              <div className="flex flex-col gap-6 mt-10">
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Services</div>
                  {serviceItems.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.href}
                      className="flex items-center gap-3 py-2 text-gray-300 hover:text-salmon-500 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
                
                <div className="border-t border-gray-800 pt-6 space-y-4">
                  {navItems.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.href}
                      className="block text-lg font-medium hover:text-salmon-500 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                
                <Button data-testid="button-mobile-book-discovery" className="w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold mt-4" asChild>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Discovery
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-aubergine-900 border-t border-gray-800 py-16 text-gray-400" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <picture>
                <source srcSet={logoWebp} type="image/webp" />
                <img src={logoPng} alt="Tech Horizon Labs" className="h-8 w-auto grayscale opacity-80" width={32} height={32} />
              </picture>
              <span itemProp="name">Tech Horizon Labs</span>
            </div>
            <p className="text-sm leading-relaxed" itemProp="description">
              AI won't save your business. Fixing the right problem will. Queensland AI consulting that finds your bottleneck and fixes it — honestly.
            </p>
            <div className="text-xs space-y-1" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p><span itemProp="addressLocality">Sunshine Coast</span>, <span itemProp="addressRegion">Queensland</span></p>
              <p itemProp="addressCountry">Australia</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Locations</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/locations/sunshine-coast" className="hover:text-salmon-500 transition-colors">Sunshine Coast</a></li>
              <li><a href="/locations/brisbane" className="hover:text-salmon-500 transition-colors">Brisbane</a></li>
              <li><a href="/locations/gold-coast" className="hover:text-salmon-500 transition-colors">Gold Coast</a></li>
              <li><a href="/locations/queensland" className="hover:text-salmon-500 transition-colors">All Queensland</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/services/audit" className="hover:text-salmon-500 transition-colors focus-visible:text-salmon-500 focus-visible:underline">Readiness Assessment</a></li>
              <li><a href="/services/accelerator" className="hover:text-salmon-500 transition-colors focus-visible:text-salmon-500 focus-visible:underline">Foundation Sprint</a></li>
              <li><a href="/services/partner" className="hover:text-salmon-500 transition-colors focus-visible:text-salmon-500 focus-visible:underline">Ongoing Evolution</a></li>
              <li><a href="/portfolio" className="hover:text-salmon-500 transition-colors focus-visible:text-salmon-500 focus-visible:underline">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Industries</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/industries/construction" className="hover:text-salmon-500 transition-colors">Construction</a></li>
              <li><a href="/industries/accounting" className="hover:text-salmon-500 transition-colors">Accounting</a></li>
              <li><a href="/industries/legal" className="hover:text-salmon-500 transition-colors">Legal</a></li>
              <li><a href="/industries/healthcare" className="hover:text-salmon-500 transition-colors">Healthcare</a></li>
              <li><a href="/industries/retail" className="hover:text-salmon-500 transition-colors">Retail</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Academy</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://academy.techhorizonlabs.com" target="_blank" rel="noopener" className="hover:text-salmon-500 transition-colors">Tech Horizon Academy ↗</a></li>
              <li><a href="/resources" className="hover:text-salmon-500 transition-colors">Resources</a></li>
              <li><a href="/about" className="hover:text-salmon-500 transition-colors">About Huxley</a></li>
              <li><a href="https://tech-horizon.beehiiv.com" target="_blank" rel="noopener" className="hover:text-salmon-500 transition-colors">Newsletter ↗</a></li>
              <li><a href="/ai-ethics" className="hover:text-salmon-500 transition-colors">AI Ethics</a></li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="py-8 border-t border-gray-800 mb-8">
          <p className="text-xs text-center mb-6 text-gray-500">Technology & Community Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6" data-testid="footer-partners">
            <img src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg" alt="Canva" className="h-5 w-auto opacity-70 hover:opacity-100 transition-opacity" loading="lazy" data-testid="footer-partner-canva" />
            <img src={noosaChamberLogo} alt="Noosa Chamber of Commerce" className="h-8 w-auto invert opacity-70 hover:opacity-100 transition-opacity" loading="lazy" data-testid="footer-partner-noosa" />
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-source-media">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>
              <span className="text-xs font-medium">Source Media</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-klipy">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1A5EFF"><rect x="3" y="3" width="18" height="18" rx="4"/></svg>
              <span className="text-xs font-medium">Klipy</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-anthropic">
              <svg className="h-4 w-4" viewBox="0 0 46 32" fill="currentColor"><path d="M27.62 0h7.11L46 32h-7.11L27.62 0zM14.91 0h7.18L33.9 32h-7.18L14.91 0zM0 32h7.11l3.69-9.4h14.76l1.89 4.82h7.49L22.62 0 0 32z"/></svg>
              <span className="text-xs font-medium">Anthropic</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-openai">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"/></svg>
              <span className="text-xs font-medium">OpenAI</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-google">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/></svg>
              <span className="text-xs font-medium">Google</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-6">
            <a 
              href="https://aidirectory.industry.gov.au/organisation/tech-horizon-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              data-testid="link-footer-ai-directory"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              Listed on industry.gov.au National AI Directory
            </a>
            <a 
              href="https://www.goodfirms.co/company/tech-horizon-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              data-testid="link-footer-goodfirms"
            >
              <img 
                src="https://assets.goodfirms.co/badges/color-badge/artificial-intelligence.svg" 
                alt="Top Artificial Intelligence Company on Goodfirms" 
                title="Top Artificial Intelligence Company"
                className="h-16"
                loading="lazy"
                data-testid="img-footer-goodfirms"
              />
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-center md:text-left">
            <p>© 2026 Tech Horizon Labs • Sunshine Coast, Queensland, Australia</p>
            <p className="text-xs mt-1">ABN: 80 976 285 425</p>
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-salmon-500 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-salmon-500 transition-colors">Terms of Service</a>
            <a href="/#contact" className="hover:text-salmon-500 transition-colors focus-visible:text-salmon-500 focus-visible:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
