// src/pages/About.jsx
import { motion } from 'framer-motion';
import { Users, Lightbulb, Globe, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Customer-Centric',
    desc: 'We prioritize our clients above all else and tailor our services to your exact needs.',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Innovation',
    desc: 'We use the latest web technologies to keep your business ahead of the curve.',
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Digital Reach',
    desc: 'From websites to social media, we make your brand visible to the world.',
  },
  {
    icon: <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: 'Reliable Support',
    desc: 'Need help with mobile or internet issues? We’ve got you covered with fast, expert support.',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const About = () => (
  <div className="min-h-[80vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
    {/* Hero */}
    <motion.section
      className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-800"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      custom={0}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
        Who We Are
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
        We are a full-service digital agency dedicated to helping you thrive online. From websites to hosting, social media promotion to tech support — we do it all with professionalism and passion.
      </p>
    </motion.section>

    {/* Our Values */}
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {values.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={i + 1}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow flex gap-4"
          >
            {item.icon}
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* What We Do */}
    <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
      <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-800 dark:text-gray-200">
        <p>
          🚀 We build fast, beautiful websites for individuals and businesses.
        </p>
        <p>
          ☁️ We host your site securely with top-tier support.
        </p>
        <p>
          📣 We promote your brand through Facebook & Instagram marketing.
        </p>
        <p>
          📱 We fix mobile and internet issues with fast turnaround.
        </p>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">We’d love to help you build something great. Let’s connect!</p>
      <Link
        to="/contact"
        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded transition"
      >
        Contact Us
      </Link>
    </section>
  </div>
);

export default About;
