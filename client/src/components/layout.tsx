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
          <p className="text-xs text-center mb-4 text-gray-500">Technology & Community Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-sm font-medium">AWS</span>
            <span className="text-sm font-medium">OpenAI</span>
            <span className="text-sm font-medium">Noosa Chamber of Commerce</span>
            <span className="text-sm font-medium">Source Media</span>
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
