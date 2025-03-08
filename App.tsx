import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Mail, Linkedin, ChevronDown, Menu, X, Home, User, FolderGit, Phone } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
      setActiveSection(id);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 border-4 border-purple-500 rounded-lg"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-5xl font-bold text-white"
          >
            KL
          </motion.h1>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-screen w-72 bg-gray-800/95 backdrop-blur-sm z-40 shadow-xl border-l border-gray-700"
          >
            <div className="p-8">
              <div className="mb-12 mt-12 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
                >
                  Navigation
                </motion.h2>
              </div>
              <nav className="space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeSection"
                          className="w-1 h-full bg-purple-500 absolute right-0"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 left-0 right-0 px-8"
              >
                <div className="flex justify-center space-x-6 pt-4 border-t border-gray-700">
                  <a
                    href="https://github.com/Krish1342"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="mailto:lodhakrish11@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/krish-lodha-6b2b06343/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Welcome to My Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-300 mb-8"
          >
            Full Stack Developer | Data Analyst | Python Developer
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center space-x-6"
          >
            <a
              href="https://github.com/Krish1342"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:lodhakrish11@gmail.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Mail size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/krish-lodha-6b2b06343/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="min-h-screen py-20 px-4 bg-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="space-y-6 text-lg text-gray-300">
            <p>
              I'm a passionate Full Stack Developer and Data Analyst with expertise in Python development.
              My journey in technology has led me to create various projects ranging from AI-powered
              applications to data analysis tools.
            </p>
            <p>
              With a strong foundation in both front-end and back-end development, I enjoy building
              complete solutions that solve real-world problems. My experience includes working with
              modern web technologies, machine learning, and database management systems.
            </p>
            <p>
              I'm constantly learning and exploring new technologies to stay at the forefront of
              technological advancement.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        ref={projectsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={projectsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen py-20 px-4 bg-gray-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations.
            Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href="mailto:lodhakrish11@gmail.com"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Mail size={24} />
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/krish-lodha-6b2b06343/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Krish1342"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  demo?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "AI Chat Bot",
    description: "An intelligent chatbot powered by the Gemini API, featuring natural language processing and interactive responses.",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Krish1342/JAVASCRIPT-AI-CHAT-BOT",
    tags: ["JavaScript", "HTML", "CSS", "Gemini API"]
  },
  {
    title: "Face Recognition System",
    description: "Advanced facial recognition system using computer vision, capable of detecting and identifying faces in real-time.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Krish1342/PYTHON-FACE-RECOGNITION-SYSTEM",
    tags: ["Python", "OpenCV", "face_recognition"]
  },
  {
    title: "Weather App",
    description: "Real-time weather application providing accurate forecasts and weather data using a weather API integration.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Krish1342/WEATHER-APP",
    tags: ["HTML", "CSS", "JavaScript", "Weather API"]
  },
  {
    title: "Zomato Data Analysis",
    description: "Comprehensive EDA of Zomato data using Python libraries for insights into food delivery trends and patterns.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Krish1342/DataAnalysis-Zomato-Data",
    tags: ["Python", "Pandas", "NumPy", "Seaborn"]
  },
  {
    title: "Password Generator",
    description: "Secure password generator with customizable options for creating strong, unique passwords.",
    image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Krish1342/JAVASCRIPT-PASSWORD-GENERATOR",
    tags: ["JavaScript", "HTML", "CSS"]
  },
  {
    title: "Pharmacy Management System",
    description: "Complete DBMS solution for pharmacy operations management and inventory tracking.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/Krish1342/DBMS-Pharmacy-Management-system",
    tags: ["Python", "Database", "SQL"]
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <Github size={20} className="mr-2" />
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink size={20} className="mr-2" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default App;