// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { Globe, Server, Smartphone, Megaphone, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Website Development',
    desc: 'Custom websites tailored for your business or personal brand.',
  },
  {
    icon: <Server className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Website Hosting',
    desc: 'Fast and reliable hosting with full support and uptime monitoring.',
  },
  {
    icon: <Megaphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Social Media Promotion',
    desc: 'Promote your brand on Facebook and Instagram with real results.',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Internet & Mobile Tech Support',
    desc: 'We fix mobile data and internet issues quickly and professionally.',
  },
];

const testimonials = [
  {
    name: 'Alice Johnson',
    text: 'Their team built our site and promoted our Facebook page — incredible ROI and super responsive support.',
  },
  {
    name: 'Mark Edison',
    text: 'Had a mobile internet issue — they solved it the same day. Also moved our hosting. 100% recommend.',
  },
  {
    name: 'Fatima Noor',
    text: 'Great experience. Got a fast, modern website and excellent social media engagement afterwards.',
  },
];

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'Depending on complexity, most websites are built within 1–3 weeks.',
  },
  {
    q: 'Can you help promote our existing business page?',
    a: 'Absolutely. We offer targeted promotion on Facebook and Instagram.',
  },
  {
    q: 'Do you offer support for internet or mobile issues?',
    a: 'Yes. We solve mobile data, sim, and device network issues quickly.',
  },
];

const logos = ['Logo1', 'Logo2', 'Logo3', 'Logo4', 'Logo5'];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const Home = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-[80vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
        className="py-20 text-center px-4 bg-gray-50 dark:bg-gray-800"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          Empowering Your Digital Future
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          We build and host websites, promote your brand, and solve internet & mobile tech issues.
        </p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-6 py-3 rounded transition"
          >
            Get In Touch
          </Link>
        </div>
      </motion.section>

      {/* Services */}
      <section className="py-16 px-4">
        <motion.h2 className="text-3xl font-bold text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0}
        >
          What We Offer
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {services.map((srv, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="flex items-start gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
            >
              {srv.icon}
              <div>
                <h3 className="text-xl font-semibold">{srv.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{srv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <motion.h2 className="text-3xl font-bold text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0}
        >
          What Clients Say
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
            >
              <p className="italic mb-3 text-gray-700 dark:text-gray-300">"{item.text}"</p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">– {item.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Trusted By</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="w-28 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded">
              <button
                className="w-full flex justify-between items-center p-4 font-medium text-left text-gray-800 dark:text-gray-100"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Blog Posts</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Blog Post Title {id}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
              </p>
              <Link
                to="/blog"
                className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
