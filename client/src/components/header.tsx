import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">S2S</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center font-medium space-x-8">
            <button 
              onClick={() => scrollToSection('courses')}
              className="hover:text-primary transition-colors duration-300"
            >
              Курсы
            </button>
            <button 
              onClick={() => scrollToSection('teachers')}
              className="hover:text-primary transition-colors duration-300"
            >
              Преподавателям
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-primary transition-colors duration-300"
            >
              О нас
            </button>
          </div>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t font-medium border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('courses')}
                className="text-left text-gray-700 hover:text-primary transition-colors duration-300"
              >
                Курсы
              </button>
              <button 
                onClick={() => scrollToSection('teachers')}
                className="text-left text-gray-700 hover:text-primary transition-colors duration-300"
              >
                Преподавателям
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-primary transition-colors duration-300"
              >
                О нас
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
