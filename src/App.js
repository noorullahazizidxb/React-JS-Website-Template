// App.js
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Layout from './components/Layout';
import Footer from './components/Footer';
import BlogDetail from "./pages/BlogDetail";
import { Toaster } from 'react-hot-toast';

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Toaster position="top-center" />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Layout>
      <div className="pt-20 px-4"> {/* Margin for navbar height */}
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
         <Route path="/blog/:id" element={<BlogDetail />} />

        </Routes>

      </div>
      <Footer />

      </Layout>
    </>
  );
}

export default App;
