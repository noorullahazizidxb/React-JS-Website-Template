import { MotionConfig, motion } from "framer-motion";
import { ThemeProvider } from "./components/theme";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { Work } from "./components/sections/Work";
import { Services } from "./components/sections/Services";
import { Process } from "./components/sections/Process";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { Seo } from "./seo/Seo";

export default function App() {
  return (
    <ThemeProvider>
      <Seo />
      <MotionConfig reducedMotion="user">
        <Header />
        <motion.main id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Hero />
          <Work />
          <Services />
          <Process />
          <Testimonials />
          <Contact />
        </motion.main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  );
}
