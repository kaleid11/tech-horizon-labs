import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

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

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Case Studies", href: "#results" },
    { name: "Academy", href: "#academy" },
    { name: "About", href: "#founder" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-aubergine-900/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <img src={logo} alt="Tech Horizon Labs" className="h-10 w-auto" />
            Tech Horizon Labs
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-salmon-500 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Button className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-semibold shadow-lg shadow-salmon-500/20 rounded-full px-6">
            Book Discovery
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
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href}
                    className="text-lg font-medium hover:text-salmon-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold">
                  Book Discovery
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
    <footer className="bg-aubergine-900 border-t border-gray-800 py-16 text-gray-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <img src={logo} alt="Tech Horizon Labs" className="h-8 w-auto grayscale opacity-80" />
              Tech Horizon Labs
            </div>
            <p className="text-sm leading-relaxed">
              Practical up-to-date AI systems you can deploy now.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-salmon-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Why Us</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Founder Story</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-salmon-500 transition-colors">AI Opportunity Audit</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Automation Accelerator</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Transformation Partner</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Quick Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Learning</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Tech Horizon Academy</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-salmon-500 transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>© 2026 Tech Horizon Labs • Sunshine Coast, Australia</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-salmon-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-salmon-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-salmon-500 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
