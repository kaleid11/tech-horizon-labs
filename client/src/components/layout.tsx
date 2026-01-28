import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Case Studies", href: "#results" },
    { name: "Academy", href: "#academy" },
    { name: "About", href: "#founder" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-bold">TH</div>
            Tech Horizon Labs
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Button className="bg-primary hover:bg-navy-800 text-white rounded-none">
            Book Discovery
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="w-full bg-primary text-white rounded-none">
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
    <footer className="bg-gray-50 border-t border-gray-200 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-xl font-bold text-primary">Tech Horizon Labs</div>
            <p className="text-gray-600 text-sm">
              We build the infrastructure before the automation. The anti-hype AI consulting firm.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Why Us</a></li>
              <li><a href="#" className="hover:text-primary">Founder Story</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">AI Opportunity Audit</a></li>
              <li><a href="#" className="hover:text-primary">Automation Accelerator</a></li>
              <li><a href="#" className="hover:text-primary">Transformation Partner</a></li>
              <li><a href="#" className="hover:text-primary">Quick Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Learning</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Tech Horizon Academy</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>© 2026 Tech Horizon Labs • Brisbane, Queensland, Australia</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
