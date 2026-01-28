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
import logo from "@/assets/logo.png";
import { BOOKING_URL } from "@/components/contact-form-dialog";

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
    { name: "AI Opportunity Audit", href: "/services/audit", icon: Search, desc: "Free 15-min discovery call" },
    { name: "Automation Accelerator", href: "/services/accelerator", icon: Zap, desc: "4-week implementation sprint" },
    { name: "Transformation Partner", href: "/services/partner", icon: Users, desc: "Ongoing AI partnership" },
  ];

  const navItems = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Locations", href: "/locations/queensland" },
    { name: "Academy", href: "/academy" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-aubergine-900/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img src={logo} alt="Tech Horizon Labs - AI Consulting Sunshine Coast" className="h-10 w-auto" />
          <span className="hidden sm:inline">Tech Horizon Labs</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="text-sm font-medium text-gray-300 hover:text-salmon-500 transition-colors flex items-center gap-1 outline-none"
                data-testid="nav-services-dropdown"
              >
                Services
                <ChevronDown className="h-4 w-4" />
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
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <img src={logo} alt="Tech Horizon Labs" className="h-8 w-auto grayscale opacity-80" />
              <span itemProp="name">Tech Horizon Labs</span>
            </div>
            <p className="text-sm leading-relaxed" itemProp="description">
              Queensland's anti-hype AI consulting firm. Practical, production-ready AI systems you can deploy now.
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
              <li><a href="/services/audit" className="hover:text-salmon-500 transition-colors">AI Opportunity Audit</a></li>
              <li><a href="/services/accelerator" className="hover:text-salmon-500 transition-colors">Automation Accelerator</a></li>
              <li><a href="/services/partner" className="hover:text-salmon-500 transition-colors">Transformation Partner</a></li>
              <li><a href="/portfolio" className="hover:text-salmon-500 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Academy</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://academy.techhorizonlabs.com" target="_blank" rel="noopener" className="hover:text-salmon-500 transition-colors">Tech Horizon Academy ↗</a></li>
              <li><a href="/resources" className="hover:text-salmon-500 transition-colors">Resources</a></li>
              <li><a href="/about" className="hover:text-salmon-500 transition-colors">About Huxley</a></li>
              <li><a href="https://tech-horizon.beehiiv.com" target="_blank" rel="noopener" className="hover:text-salmon-500 transition-colors">Newsletter ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="py-8 border-t border-gray-800 mb-8">
          <p className="text-xs text-center mb-6 text-gray-500">Technology & Community Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10" data-testid="footer-partners">
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-google">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="text-sm font-medium">Google</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-anthropic">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <span className="text-sm font-medium">Anthropic</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-openai">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/></svg>
              <span className="text-sm font-medium">OpenAI</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-aws">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>
              <span className="text-sm font-medium">AWS</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-n8n">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              <span className="text-sm font-medium">n8n</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-docker">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>
              <span className="text-sm font-medium">Docker</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors" data-testid="footer-partner-falai">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span className="text-sm font-medium">fal.ai</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="https://www.industry.gov.au/science-technology-and-innovation/technology/national-ai-centre/national-ai-directory" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              data-testid="link-footer-ai-directory"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              Listed on industry.gov.au National AI Directory
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
            <a href="#contact" className="hover:text-salmon-500 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
