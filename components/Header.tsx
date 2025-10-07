import React, { useState, useEffect } from 'react';

type Page = 'home' | 'login' | 'signup';

interface HeaderProps {
    onNavigate: (page: Page) => void;
}

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </div>
    <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">Earnify</span>
  </button>
);

const NavLinks: React.FC<{ className?: string, onNavigate: (page: Page) => void, onLinkClick?: () => void }> = ({ className, onNavigate, onLinkClick }) => {
    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        onLinkClick?.();
    };

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onLinkClick?.();
    };

    return (
        <nav className={className}>
            <a href="#home" onClick={handleHomeClick} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-300">Home</a>
            <a href="#howitworks" onClick={(e) => handleScrollTo(e, 'howitworks')} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-300">How It Works</a>
            <a href="#opportunities" onClick={(e) => handleScrollTo(e, 'opportunities')} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-300">Opportunities</a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-300">Contact</a>
        </nav>
    );
};

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo onClick={handleLogoClick} />
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks className="flex items-center space-x-8" onNavigate={onNavigate} />
            <div className="flex items-center space-x-5">
                <button onClick={() => onNavigate('login')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                    Login
                </button>
                <button onClick={() => onNavigate('signup')} className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/40">
                  Start Earning
                </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-50 h-10 w-10 text-slate-800 dark:text-slate-200 focus:outline-none"
                aria-label="Toggle menu"
            >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <span aria-hidden="true" className={`block absolute h-0.5 w-5 transform bg-current transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                    <span aria-hidden="true" className={`block absolute h-0.5 w-5 transform bg-current transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span aria-hidden="true" className={`block absolute h-0.5 w-5 transform bg-current transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
                </div>
            </button>
          </div>
        </div>
      </div>
      <div className={`transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'} ${isScrolled || isMenuOpen ? 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4 pt-2 pb-6">
            <NavLinks className="flex flex-col items-center space-y-4" onNavigate={onNavigate} onLinkClick={() => setIsMenuOpen(false)}/>
            <div className="w-full max-w-xs flex flex-col space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button onClick={() => { onNavigate('login'); setIsMenuOpen(false); }} className="w-full text-center px-5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg shadow-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/80 transition-all duration-300">
                  Login
                </button>
                <button onClick={() => { onNavigate('signup'); setIsMenuOpen(false); }} className="w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                  Start Earning
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;