// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  HomeIcon,
  BookOpen,
  Phone,
  Info,
  Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
  { name: 'Blog', path: '/blog', icon: <BookOpen className="w-5 h-5 mr-2" /> },
  { name: 'Contact', path: '/contact', icon: <Phone className="w-5 h-5 mr-2" /> },
  { name: 'About Us', path: '/about', icon: <Info className="w-5 h-5 mr-2" /> },
];

function Navbar({ toggleTheme, theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkBase =
    'flex items-center px-3 py-2 rounded-lg transition-colors';
  const linkColors =
    'text-gray-800 dark:text-gray-100 hover:text-white dark:hover:text-white hover:bg-blue-500 dark:hover:bg-blue-600';

  return (
    <header
    className={`fixed top-0 w-full z-50 transition-all border-b dark:border-gray-700 ${
      scrolled
        ? 'shadow-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-md ring-1 ring-gray-300/10'
        : 'bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700'
    }`}
  >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">Brand</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${linkBase} ${linkColors} ${
                isActive(item.path)
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : ''
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-censter space-x-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu with framer-motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`${linkBase} ${linkColors} ${
                  isActive(item.path)
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : ''
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
