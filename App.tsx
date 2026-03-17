/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Play, 
  Plus, 
  Minus, 
  Linkedin, 
  Github, 
  ExternalLink,
  Search,
  Zap,
  Target,
  Users,
  TrendingUp,
  Award,
  BarChart3,
  Globe,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// --- Components ---

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 mb-6">
    <div className="w-6 h-[2px] bg-brand-navy" />
    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-brand-muted">
      {children}
    </span>
  </div>
);

const Logo = () => (
  <a 
    href="#home" 
    onClick={(e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
    className="block transition-opacity hover:opacity-80"
  >
    <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0, 2) scale(0.8)">
        <path d="M8 38V14L24 30L32 22L40 14M40 14H30M40 14V24" stroke="#1C2333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 30V38M40 24V38" stroke="#1C2333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
      </g>
      <text x="45" y="28" fill="#1C2333" style={{ font: 'bold 24px "Space Grotesk", sans-serif', letterSpacing: '-0.05em' }}>Mannu</text>
      <circle cx="122" cy="28" r="3" fill="#1C2333" />
    </svg>
  </a>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'outline'; 
  className?: string;
  onClick?: () => void;
}) => {
  const baseStyles = "px-8 py-4 rounded-[6px] font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider";
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-[#2E3A50]",
    outline: "border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
      {variant === 'primary' && <ArrowRight size={16} />}
    </button>
  );
};

const Card = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`bg-brand-card border border-[#EEEEEE] rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white border-b border-[#EEEEEE] transition-all duration-300`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left transition-colors group"
      >
        <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-navy transition-colors">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-navy"
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-brand-text leading-relaxed text-sm">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'experience', label: 'Experience' },
    { id: 'results', label: 'Results' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pricingPlans = [
    {
      name: "Starter",
      price: isYearly ? 239 : 299,
      features: [
        "Basic SEO Audit",
        "On-Page Optimisation (up to 10 pages)",
        "Monthly Reporting",
        "Email Support",
        "1 Blog Post/Month"
      ],
      variant: 'outline' as const
    },
    {
      name: "Growth",
      price: isYearly ? 399 : 499,
      features: [
        "Full Technical SEO Audit",
        "On-Page Optimisation (up to 30 pages)",
        "Bi-Weekly Reporting",
        "Priority Support",
        "4 Blog Posts/Month",
        "Link Building (5 links/month)",
        "Google Business Profile Optimisation"
      ],
      variant: 'primary' as const,
      popular: true,
      isDark: true
    },
    {
      name: "Pro",
      price: isYearly ? 799 : 999,
      features: [
        "Advanced SEO Strategy",
        "Unlimited On-Page Optimisation",
        "Weekly Reporting",
        "Dedicated Account Manager",
        "8 Blog Posts/Month",
        "Link Building (15 links/month)",
        "Competitor Analysis",
        "CRO Recommendations"
      ],
      variant: 'outline' as const
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none noise-overlay z-50" />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-navy origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white backdrop-blur-md border-b border-[#E8E8E8] z-[90]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map(section => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className={`text-sm font-medium transition-all relative ${activeSection === section.id ? 'text-brand-navy' : 'text-brand-text hover:text-brand-navy'}`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-navy"
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="primary" className="py-2 px-6" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-card border-b border-brand-accent/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {sections.map(section => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-brand-text hover:text-brand-accent transition-colors"
                  >
                    {section.label}
                  </a>
                ))}
                <Button className="w-full mt-4" onClick={() => { setIsMenuOpen(false); document.getElementById('contact')?.scrollIntoView(); }}>
                  Get In Touch
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-48 pb-[120px] px-6 overflow-hidden relative bg-brand-bg">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>Organic Search Specialist</SectionLabel>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8 text-brand-navy">
              Mannu <br /> Kumar
            </h1>
            <p className="text-xl text-brand-text max-w-lg mb-10 leading-relaxed">
              I drive organic traffic for eCommerce and modern businesses — using data-led AI, entity-based content strategy, and long-term SEO methods.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button onClick={() => document.getElementById('results')?.scrollIntoView()}>View My Work</Button>
              <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView()}>Get In Touch</Button>
            </div>
            
            <div className="flex gap-6 items-center">
              <a href="#" className="text-brand-text hover:text-brand-navy hover:underline transition-all flex items-center gap-2 text-sm font-medium">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="#" className="text-brand-text hover:text-brand-navy hover:underline transition-all flex items-center gap-2 text-sm font-medium">
                <Github size={18} /> GitHub
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-[#EEEEEE] shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-2">
                <span className="text-5xl font-display font-bold text-brand-navy">170%</span>
                <span className="text-sm uppercase tracking-widest font-bold text-brand-muted">Organic Traffic Growth</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-[#EEEEEE] shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-2">
                  <span className="text-4xl font-display font-bold text-brand-navy">7+</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-muted">Years Experience</span>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-[#EEEEEE] shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-2">
                  <span className="text-4xl font-display font-bold text-brand-navy">60%</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-muted">Repeat Clients</span>
                </div>
              </div>
            </div>

            {/* Skill Badges */}
            <div className="mt-12 flex flex-wrap gap-3">
              {["eCommerce SEO", "Technical SEO", "Content Strategy", "Local SEO", "AI SEO", "Shopify SEO"].map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-white border border-[#EEEEEE] rounded-full text-xs font-bold text-brand-navy shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section id="about" className="py-[120px] px-6 bg-brand-card-alt">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="w-6 h-[2px] bg-white" />
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#AAAAAA]">
                About Me
              </span>
            </div>
            <h2 className="text-5xl md:text-[48px] font-display font-bold max-w-3xl mx-auto leading-tight text-white">
              Driving organic growth through data and strategy.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { val: "170%", label: "Organic traffic increase" },
              { val: "7+", label: "Years experience" },
              { val: "60%", label: "Repeat clients" },
              { val: "Top 3", label: "Local page rankings" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
                <div className="text-3xl font-display font-bold text-white mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-wider font-bold text-[#AAAAAA]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp className="text-white" />, title: "Proven Track Record", desc: "Consistent results across industries" },
              { icon: <Target className="text-white" />, title: "Tailored SEO Strategy", desc: "Custom approach for every client" },
              { icon: <Users className="text-white" />, title: "Client-First Approach", desc: "Long-term partnerships built on trust" }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#AAAAAA]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section className="py-[120px] border-y border-[#E8E8E8] overflow-hidden bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-2xl font-display font-bold text-brand-navy/50 uppercase tracking-widest">Trusted by Growing Businesses</h2>
        </div>
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {["AgriGrow", "StyleShop", "TechLocal", "JewelAffiliate", "UrbanStore", "GrowthBrand", "EcoMart", "TechServe"].map((brand, j) => (
                <div key={j} className="px-8 py-4 bg-white border border-[#EEEEEE] rounded-full flex items-center gap-3 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-brand-navy" />
                  <span className="text-lg font-display font-bold text-brand-navy/80">{brand}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section id="services" className="py-[120px] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <SectionLabel>Services</SectionLabel>
              <h2 className="text-5xl md:text-[48px] font-display font-bold leading-tight text-brand-navy">What I Offer.</h2>
            </div>
            <p className="text-brand-text max-w-sm text-lg leading-relaxed">
              Comprehensive SEO solutions tailored to your business goals, driving sustainable organic growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { num: "01", title: "On-Page SEO", desc: "Optimising every page element for maximum search visibility and user experience." },
              { num: "02", title: "Technical Audit", desc: "Fixing crawl issues, speed, and site architecture problems for better indexing." },
              { num: "03", title: "Local SEO", desc: "Dominating local search and Google Business Profile rankings for area dominance." },
              { num: "04", title: "E-Commerce SEO", desc: "Scaling Shopify and WooCommerce stores with organic traffic and conversion focus." },
              { num: "05", title: "Data Analytics", desc: "Turning raw data into actionable insights to drive informed SEO decisions." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`bg-white border border-[#EEEEEE] rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 group ${i === 4 ? 'md:col-span-2 md:max-w-2xl md:mx-auto w-full' : ''}`}
              >
                <div className="text-brand-navy font-display font-bold text-4xl mb-4 opacity-20">{service.num}</div>
                <h3 className="text-2xl font-bold text-brand-navy mb-4">{service.title}</h3>
                <p className="text-brand-text leading-relaxed line-clamp-2">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section id="experience" className="py-[120px] px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Work Experience</SectionLabel>
          <h2 className="text-5xl md:text-[48px] font-display font-bold mb-20 text-brand-navy">Where I've Made an Impact.</h2>

          <Card className="relative pl-12 md:pl-16 border-l-4 border-l-brand-navy">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-brand-navy">Core for Good Solutions</h3>
                  <span className="px-3 py-1 bg-[#F0F2F5] text-brand-navy text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#E8E8E8]">Current</span>
                </div>
                <p className="text-brand-text mb-2">Jaipur, Rajasthan</p>
                <p className="text-brand-muted text-sm font-medium">Full Time</p>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <h4 className="text-3xl font-display font-bold text-brand-navy">Organic Search Specialist</h4>
                  <span className="px-4 py-1 border border-[#E8E8E8] text-brand-muted text-xs font-bold rounded-full">Full Time · Current</span>
                </div>
                <p className="text-brand-navy font-medium mb-8">Core Sartbound</p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    "Developed and led organic search strategies for DTC Shopify and WordPress eCommerce brands",
                    "Performed full technical SEO audits identifying crawl issues, Core Web Vitals gaps and site architecture issues",
                    "Built content clusters and topical authority frameworks improving rankings across competitive head terms",
                    "Achieved 170% YoY traffic increase for agriculture brand through entity-based content strategy",
                    "Delivered top 3 local rankings for multiple service area businesses using Google Business Profile optimisation",
                    "Worked with clients across India, UAE, and Europe on monthly retainer and project-based engagements"
                  ].map((point, i) => (
                    <li key={i} className="flex gap-3 text-brand-text leading-relaxed">
                      <CheckCircle2 size={18} className="text-brand-navy shrink-0 mt-1" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {["Technical SEO", "On-Page SEO", "Content Strategy", "AI SEO", "E-commerce SEO", "Link Building"].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-[#F0F2F5] text-brand-navy text-xs font-bold rounded-full border border-[#E8E8E8]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section id="results" className="py-[120px] px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>Key Results</SectionLabel>
            <h2 className="text-5xl md:text-[48px] font-display font-bold text-brand-navy">Where I've Made an Impact.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                badge: "ECOMMERCE SEO",
                num: "170%",
                title: "Agriculture Brand — Organic Growth",
                desc: "Entity-based content strategy and technical fixes.",
                stats: ["170% Organic Growth", "Top 3 Rankings"],
                tags: ["ecommerce seo", "content strategy", "technical audit"],
                gradient: "from-[#F0F2F5] to-[#D1D5DB]",
                pattern: true
              },
              {
                badge: "LOCAL SEO",
                num: "#1-3",
                title: "Service Brand — Local Pack Dominance",
                desc: "Complete local SEO overhaul with GMB optimisation.",
                stats: ["#1-3 Local Pack", "3x More Calls"],
                tags: ["local seo", "gbp optimisation", "on-page seo"],
                gradient: "from-[#E5E7EB] to-[#9CA3AF]"
              },
              {
                badge: "AFFILIATE SEO",
                num: "150%",
                title: "Jewelry Affiliate — Traffic and Click Growth",
                desc: "Content clusters and strategic link building.",
                stats: ["150% Traffic Growth", "2x Click Revenue"],
                tags: ["affiliate seo", "content strategy", "link building"],
                gradient: "from-[#D1D5DB] to-[#6B7280]"
              }
            ].map((caseStudy, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-[#EEEEEE] shadow-[0_2px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] group-hover:-translate-y-1 transition-all duration-500">
                  <div className={`h-[200px] bg-gradient-to-br ${caseStudy.gradient} relative overflow-hidden flex items-center justify-center`}>
                    {caseStudy.pattern && (
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1C2333 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                    )}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-[80px] font-display font-bold text-brand-navy drop-shadow-sm z-10">
                      {caseStudy.num}
                    </div>
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-3 py-1 bg-brand-bg text-brand-text text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#EEEEEE]">
                        {caseStudy.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-navy transition-colors">{caseStudy.title}</h3>
                    <p className="text-brand-text mb-6 text-sm leading-relaxed">{caseStudy.desc}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {caseStudy.stats.map((stat, j) => (
                        <div key={j} className="text-brand-navy font-bold text-sm">{stat}</div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] uppercase font-bold text-brand-muted">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline">View All Results</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section className="py-[120px] px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-5xl md:text-[48px] font-display font-bold text-brand-navy">What Clients Say About Me.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Mannu transformed our organic traffic completely. His strategy brought us from page 4 to page 1 in just 4 months.",
                name: "John Smith",
                title: "Founder, AgriGrow Solutions"
              },
              {
                text: "Best SEO investment we ever made. 150% traffic growth in 6 months speaks for itself.",
                name: "Emily Davis",
                title: "CEO, StyleShop Global"
              },
              {
                text: "Incredibly thorough, data-driven, and always available. Highly recommend for any eCommerce brand.",
                name: "Michael Brown",
                title: "Director, Retail Dynamics"
              }
            ].map((testimonial, i) => (
              <Card key={i} delay={i * 0.1} className="flex flex-col">
                <div className="flex gap-1 text-brand-navy mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-brand-text italic leading-relaxed mb-10 flex-grow">"{testimonial.text}"</p>
                <div>
                  <h4 className="text-brand-navy font-bold">{testimonial.name}</h4>
                  <p className="text-xs text-brand-muted mt-1 uppercase tracking-widest">{testimonial.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section id="pricing" className="py-[120px] px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="text-5xl md:text-[48px] font-display font-bold mb-12 text-brand-navy">Profitable Pricing Plans.</h2>
            
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-bold uppercase tracking-widest ${!isYearly ? 'text-brand-navy' : 'text-brand-muted'}`}>Monthly</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="w-14 h-7 bg-[#F0F2F5] border border-[#E8E8E8] rounded-full relative p-1 transition-colors"
              >
                <motion.div 
                  animate={{ x: isYearly ? 28 : 0 }}
                  className="w-5 h-5 bg-brand-navy rounded-full"
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold uppercase tracking-widest ${isYearly ? 'text-brand-navy' : 'text-brand-muted'}`}>Yearly</span>
                <span className="px-2 py-1 bg-[#E8F5EF] text-[#1D9E75] text-[10px] font-bold rounded-md border border-[#1D9E75]/20">Save 20%</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i}
                className={`relative bg-white border rounded-3xl p-10 flex flex-col transition-all duration-500 ${plan.isDark ? 'bg-brand-navy text-white border-brand-navy scale-105 z-10 shadow-2xl' : 'border-[#EEEEEE] shadow-lg hover:shadow-xl'}`}
              >
                {plan.popular && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${plan.isDark ? 'bg-white text-brand-navy' : 'bg-brand-navy text-white'}`}>
                    Best Value
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-6 uppercase tracking-widest ${plan.isDark ? 'text-white' : 'text-brand-navy'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-5xl font-display font-bold ${plan.isDark ? 'text-white' : 'text-brand-navy'}`}>${plan.price}</span>
                  <span className={plan.isDark ? 'text-white/60' : 'text-brand-text'}>/month</span>
                </div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2 size={16} className={`${plan.isDark ? 'text-white' : 'text-brand-navy'} shrink-0 mt-0.5`} />
                      <span className={plan.isDark ? 'text-white/80' : 'text-brand-text'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={plan.isDark ? 'outline' : 'primary'} className={`w-full ${plan.isDark ? 'border-white text-white hover:bg-white hover:text-brand-navy' : ''}`}>Get Started</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section id="blog" className="py-[120px] px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <SectionLabel>Blog</SectionLabel>
              <h2 className="text-5xl md:text-[48px] font-display font-bold leading-tight text-brand-navy">Latest SEO Insights & Resources.</h2>
            </div>
            <a href="#" className="text-brand-navy font-bold hover:underline flex items-center gap-2">
              Read All Articles <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "How I Took an Agriculture Brand from 0 to 170% Organic Growth",
                date: "Mar 10, 2026",
                cat: "CASE STUDY",
                desc: "A deep dive into the strategy, content architecture, and technical fixes that transformed a niche agriculture...",
                gradient: "from-[#F0F2F5] to-[#E5E7EB]"
              },
              {
                title: "The Local SEO Checklist Every Small Business Needs in 2026",
                date: "Feb 24, 2026",
                cat: "SEO TIPS",
                desc: "From Google Business Profile optimisation to citation building — the exact checklist I use to get small...",
                gradient: "from-[#E5E7EB] to-[#D1D5DB]"
              },
              {
                title: "Why Technical SEO is the Foundation of Every Winning Strategy",
                date: "Feb 10, 2026",
                cat: "STRATEGY",
                desc: "No amount of content or links can save a technically broken website. Here's why I always start with a full...",
                gradient: "from-[#D1D5DB] to-[#9CA3AF]"
              }
            ].map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-[#EEEEEE] shadow-[0_2px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] group-hover:-translate-y-1 transition-all">
                  <div className={`h-[180px] bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/5 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="px-3 py-1 bg-brand-bg text-brand-text text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#EEEEEE]">
                        {post.cat}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-brand-muted">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-4 group-hover:text-brand-navy transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-brand-text text-sm mb-6 leading-relaxed line-clamp-2">{post.desc}</p>
                    <a href="#" className="text-brand-navy text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read More <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section className="py-[120px] px-6 bg-brand-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-5xl md:text-[48px] font-display font-bold text-brand-navy">Got Questions? I've Got Answers.</h2>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[#EEEEEE] shadow-lg">
            {[
              { q: "How long does SEO take to show results?", a: "SEO typically shows meaningful results in 3 to 6 months, depending on your website's current state, competition level, and how aggressively we implement the strategy." },
              { q: "Do you work with eCommerce stores?", a: "Yes, eCommerce SEO is one of my core specialisations. I have worked with Shopify, WooCommerce, and headless eCommerce setups across multiple industries." },
              { q: "What makes your SEO approach different?", a: "I combine technical SEO, entity-based content strategy, and AI-assisted research to build long-term organic growth — not just quick wins that disappear." },
              { q: "How do you measure SEO success?", a: "I track organic traffic, keyword rankings, click-through rates, conversions, and revenue impact — not just vanity metrics." },
              { q: "Do you offer one-time audits or ongoing plans?", a: "Both. I offer standalone SEO audits as well as monthly retainer plans for ongoing strategy and implementation." },
              { q: "Will I get monthly reports?", a: "Yes, every client receives detailed monthly reports covering rankings, traffic, completed work, and next month's plan." },
              { q: "Can you guarantee first page rankings?", a: "No ethical SEO specialist can guarantee rankings — but I can guarantee a proven strategy, consistent execution, and transparent reporting that drives real results." }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="w-full h-px bg-[#E8E8E8]" />
      <section id="contact" className="py-[120px] px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-5xl md:text-[48px] font-display font-bold mb-20 leading-[0.9] text-brand-navy">
            Let's Build Something <br /> Worth Ranking For.
          </h2>

          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h3 className="text-2xl font-bold text-brand-navy mb-6">Ready to grow your organic traffic?</h3>
              <p className="text-brand-text text-lg leading-relaxed mb-10">
                Whether you need a full SEO strategy, a technical audit, or ongoing monthly support — let's talk about what will move the needle for your business.
              </p>
              
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E8F5EF] border border-[#1D9E75]/30 rounded-full mb-12">
                <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
                <span className="text-xs font-bold text-[#1D9E75] uppercase tracking-widest">Available for New Projects</span>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col gap-4">
                  <h4 className="text-brand-navy font-bold uppercase tracking-widest text-xs">Quick Links</h4>
                  {sections.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="text-brand-text hover:text-brand-navy transition-colors text-sm">{s.label}</a>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-brand-navy font-bold uppercase tracking-widest text-xs">Social</h4>
                  <a href="#" className="text-brand-text hover:text-brand-navy transition-colors text-sm flex items-center gap-2"><Linkedin size={16} /> LinkedIn</a>
                  <a href="#" className="text-brand-text hover:text-brand-navy transition-colors text-sm flex items-center gap-2"><Github size={16} /> GitHub</a>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-navy uppercase tracking-widest">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-brand-bg border border-[#CCCCCC] rounded-lg px-4 py-[14px] text-brand-navy placeholder:text-brand-muted focus:outline-none focus:border-brand-navy transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-navy uppercase tracking-widest">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-brand-bg border border-[#CCCCCC] rounded-lg px-4 py-[14px] text-brand-navy placeholder:text-brand-muted focus:outline-none focus:border-brand-navy transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy uppercase tracking-widest">Your Website URL</label>
                  <input 
                    type="url" 
                    placeholder="https://yourwebsite.com"
                    className="w-full bg-brand-bg border border-[#CCCCCC] rounded-lg px-4 py-[14px] text-brand-navy placeholder:text-brand-muted focus:outline-none focus:border-brand-navy transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy uppercase tracking-widest">Tell me about your project</label>
                  <textarea 
                    rows={4} 
                    placeholder="What are your SEO goals?"
                    className="w-full bg-brand-bg border border-[#CCCCCC] rounded-lg px-4 py-[14px] text-brand-navy placeholder:text-brand-muted focus:outline-none focus:border-brand-navy transition-all resize-none"
                    required
                  />
                </div>
                <button className="w-full bg-brand-navy text-white font-bold text-base py-4 rounded-lg hover:bg-[#2E3A50] transition-all duration-300 shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[120px] px-6 bg-brand-card-alt">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="mb-4">
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="block transition-opacity hover:opacity-80"
                >
                  <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(0, 2) scale(0.8)">
                      <path d="M8 38V14L24 30L32 22L40 14M40 14H30M40 14V24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M24 30V38M40 24V38" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
                    </g>
                    <text x="45" y="28" fill="white" style={{ font: 'bold 24px "Space Grotesk", sans-serif', letterSpacing: '-0.05em' }}>Mannu</text>
                    <circle cx="122" cy="28" r="3" fill="white" />
                  </svg>
                </a>
              </div>
              <p className="text-[#AAAAAA] text-sm max-w-xs">
                SEO Specialist — Driving organic growth for eCommerce and modern businesses through data-led strategies.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div className="flex flex-col gap-3">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Navigation</h4>
                {sections.slice(0, 4).map(s => (
                  <a key={s.id} href={`#${s.id}`} className="text-[#AAAAAA] hover:text-white transition-colors text-sm">{s.label}</a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Resources</h4>
                {sections.slice(4).map(s => (
                  <a key={s.id} href={`#${s.id}`} className="text-[#AAAAAA] hover:text-white transition-colors text-sm">{s.label}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#AAAAAA] hover:text-white hover:border-white transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#AAAAAA] hover:text-white hover:border-white transition-all">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-[#AAAAAA]">
              © 2026 Mannu Kumar. All rights reserved. Built with passion for organic growth.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-[#AAAAAA] hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-[#AAAAAA] hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Info */}
      <div className="fixed bottom-8 right-8 hidden xl:flex flex-col gap-4 z-[80]">
        {[
          { icon: <Mail size={18} />, label: "mannudhiman6@gmail.com" },
          { icon: <Phone size={18} />, label: "+91 88472 13451" },
          { icon: <MapPin size={18} />, label: "Chandigarh, India" }
        ].map((info, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-md border border-[#E8E8E8] p-3 rounded-full hover:border-brand-navy transition-all cursor-pointer shadow-lg"
          >
            <div className="w-8 h-8 rounded-full bg-[#F0F2F5] flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-all">
              {info.icon}
            </div>
            <span className="text-xs font-bold text-brand-navy pr-2 hidden group-hover:block whitespace-nowrap">{info.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Custom Styles for Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
