import { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setShowSearch(false);
      setShowMobileMenu(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo + Menu Mobile */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="text-netflix-red text-2xl md:text-4xl font-bold">
              NETFLIX
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 ml-8">
            <Link to="/" className="text-white hover:text-gray-300 transition">
              Início
            </Link>
            <a href="#" className="text-white hover:text-gray-300 transition">
              Séries
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition">
              Filmes
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition">
              Bombando
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition">
              Minha Lista
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Títulos, gente e gêneros"
              className="bg-black border border-white text-white px-4 py-1 pl-10 rounded focus:outline-none focus:border-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
          </form>

          {/* Mobile Search Icon */}
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden text-white"
          >
            <Search size={24} />
          </button>

          <Bell className="text-white cursor-pointer hover:text-gray-300 hidden md:block" size={24} />
          
          <div className="hidden md:flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <ChevronDown className="text-white" size={20} />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white"
          >
            {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded focus:outline-none"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link 
              to="/" 
              onClick={() => setShowMobileMenu(false)}
              className="text-white hover:text-gray-300 transition py-2"
            >
              Início
            </Link>
            <a href="#" className="text-white hover:text-gray-300 transition py-2">
              Séries
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition py-2">
              Filmes
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition py-2">
              Bombando
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition py-2">
              Minha Lista
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;