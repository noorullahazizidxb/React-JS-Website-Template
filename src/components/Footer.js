// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 pt-16 pb-6 mt-16 border-t dark:border-gray-700">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">OurBrand</h2>
        <p className="mt-2">Helping businesses grow with modern websites, hosting, promotion & tech support.</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Our Services</h3>
        <ul className="space-y-1">
          <li>Website Development</li>
          <li>Website Hosting</li>
          <li>Facebook & Instagram Promotion</li>
          <li>Internet & Mobile Tech Support</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
        <ul className="space-y-1">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          <li><Link to="/blog" className="hover:underline">Blog</Link></li>
        </ul>
      </div>
    </div>

    {/* Newsletter Signup */}
    <div className="container mx-auto mt-12 px-4">
      <h3 className="text-xl font-semibold text-center mb-4">Subscribe to Our Newsletter</h3>
      <form className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded w-full md:w-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition"
        >
          Subscribe
        </button>
      </form>
    </div>

    <div className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
      © {new Date().getFullYear()} OurBrand. All rights reserved.
    </div>
  </footer>
);

export default Footer;
