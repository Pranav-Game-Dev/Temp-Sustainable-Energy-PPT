/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { Maximize2, Zap, Globe, AlertTriangle, Lightbulb, TrendingUp, CheckCircle, ArrowRight, User, BookOpen, Hash, Fingerprint, Heart, Sparkles, ShieldCheck, Cpu } from 'lucide-react';

interface SlideData {
  id: number;
  type: 'intro' | 'timeline' | 'grid' | 'split' | 'future' | 'conclusion' | 'thankyou';
  title: string;
  subtitle?: string;
  content: any;
  image: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    type: 'intro',
    title: "Future of Sustainable Energy",
    subtitle: "Building a Reliable, Low-Carbon World",
    image: "https://picsum.photos/seed/energy-intro/1920/1080",
    content: {
      tagline: "Transitioning from fossil dependency to resilient and sustainable energy systems",
      points: [
        "Clean energy helps in improving environmental sustainability and long-term economic stability",
        "It contributes to reducing dependence on finite and volatile fossil fuel resources",
        "It plays an important role in supporting global energy security within complex geopolitical landscapes"
      ],
      personal: {
        name: "Pranav Dabhi",
        course: "B-Tech CSE",
        roll: "1036",
        enroll: "2401442032"
      }
    }
  },
  {
    id: 1,
    type: 'timeline',
    title: "Evolution of Energy Systems",
    subtitle: "A Century of Transformation",
    image: "https://picsum.photos/seed/energy-timeline/1920/1080",
    content: [
      { year: "1900s", label: "Fossil Fuel Era", desc: "Coal and oil were primary drivers for industrial growth and global infrastructure expansion" },
      { year: "1970s", label: "Energy Diversification", desc: "Global oil crises prompted research into nuclear power and alternative energy sources" },
      { year: "2000s", label: "Renewable Acceleration", desc: "Technological advancements allowed solar and wind energy to become economically viable and scalable" },
      { year: "2025+", label: "Intelligent Energy Systems", desc: "Integration of smart grids and advanced storage systems helps to modernize global energy distribution" }
    ]
  },
  {
    id: 2,
    type: 'grid',
    title: "Critical Challenges",
    subtitle: "Navigating the Transition",
    image: "https://picsum.photos/seed/energy-challenges/1920/1080",
    content: [
      { icon: <Globe className="w-6 h-6" />, title: "Supply Disruptions", desc: "Geopolitical factors and trade dependencies can lead to instability in global energy supplies" },
      { icon: <Zap className="w-6 h-6" />, title: "Intermittent Generation", desc: "The variable nature of solar and wind energy highlights the importance of efficient storage for reliability" },
      { icon: <AlertTriangle className="w-6 h-6" />, title: "Energy Inequality", desc: "Many developing regions continue to face challenges in accessing affordable and clean energy sources" },
      { icon: <TrendingUp className="w-6 h-6" />, title: "High Emissions", desc: "Large-scale industrial sectors contribute significantly to global carbon emissions, requiring targeted solutions" }
    ]
  },
  {
    id: 3,
    type: 'split',
    title: "Green Innovations",
    subtitle: "Technological Breakthroughs",
    image: "https://picsum.photos/seed/energy-innovations/1920/1080",
    content: [
      "Next-generation solar cells are being developed to improve energy conversion efficiency and reduce costs",
      "Large-scale offshore wind farms contribute to expanding the overall capacity of renewable energy",
      "Green hydrogen can be used as a clean fuel alternative for heavy industrial processes",
      "AI-powered smart grids help to optimize the distribution and management of energy",
      "Carbon capture and storage technologies can contribute to reducing atmospheric carbon emissions"
    ]
  },
  {
    id: 4,
    type: 'future',
    title: "Future Trends",
    subtitle: "Defining the Next Decade",
    image: "https://picsum.photos/seed/energy-future/1920/1080",
    content: [
      { title: "Decentralized Energy", desc: "Decentralized systems allow for local energy generation through rooftop solar and microgrids" },
      { title: "Electrification", desc: "The shift toward electrification supports the transition of transport and industrial systems" },
      { title: "Intelligent Infrastructure", desc: "Integrating AI with storage and vehicle-to-grid ecosystems can help in managing energy demand" }
    ]
  },
  {
    id: 5,
    type: 'conclusion',
    title: "The Path Forward",
    subtitle: "Clean. Efficient. Accessible.",
    image: "https://picsum.photos/seed/energy-conclusion/1920/1080",
    content: "This highlights the importance of transitioning to sustainable energy for long-term global stability. Technological advancements, combined with effective policy and international cooperation, show how clean energy can contribute to a more resilient future. A clean, efficient, and accessible energy system remains a primary objective for global development."
  },
  {
    id: 6,
    type: 'thankyou',
    title: "Thank You",
    subtitle: "For Your Time and Attention",
    image: "https://picsum.photos/seed/energy-thanks/1920/1080",
    content: "Let's build a greener future together."
  }
];

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    } else {
      toast.success("End of presentation reached.");
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    } else {
      toast.info("This is the first slide.");
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Backspace') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isStarted]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const startPresentation = () => {
    setIsStarted(true);
  };

  const slide = SLIDES[currentSlide];

  if (!isStarted) {
    return (
      <div className="presentation-container">
        <Toaster position="top-center" theme="dark" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bg-glow animate-float bg-emerald-500/20 top-[-10%] left-[-10%]" />
          <div className="bg-glow animate-float-delayed bg-blue-500/20 bottom-[-10%] right-[-10%]" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="slide-wrapper flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-16 text-center space-y-12 max-w-4xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-7xl font-black tracking-tighter leading-none">
                  Sustainable <span className="text-emerald-500">Energy</span>
                </h1>
              </motion.div>
              <p className="text-xl text-white/40 font-light tracking-[0.3em] uppercase">Future & Green Innovations</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={toggleFullscreen}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-sm uppercase tracking-widest"
              >
                <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" /> Enable Fullscreen
              </button>
              <button 
                onClick={startPresentation}
                className="group flex items-center justify-center gap-3 px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded-full transition-all text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                Start Presentation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-8 border-t border-white/10 flex justify-center gap-12 text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-emerald-500" /> 7 Immersive Slides
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-blue-500" /> Professional Deck
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-amber-500" /> Interactive UI
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="presentation-container">
      <Toaster position="top-center" theme="dark" />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow animate-float bg-emerald-500/20 top-[-10%] left-[-10%]" />
        <div className="bg-glow animate-float-delayed bg-blue-500/20 bottom-[-10%] right-[-10%]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="slide-wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex flex-col"
          >
            {renderSlideContent(slide)}
          </motion.div>
        </AnimatePresence>

        {/* Minimal Progress Indicator */}
        <div className="absolute bottom-8 right-8 flex items-center gap-4 px-6 py-3 glass-panel !rounded-full">
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Slide {currentSlide + 1} / {SLIDES.length}</span>
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-6 bg-emerald-500' : 'w-1.5 bg-white/10'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderSlideContent(slide: SlideData) {
  switch (slide.type) {
    case 'intro':
      return (
        <div className="w-full h-full flex flex-col md:flex-row items-stretch p-16 gap-16 relative">
          <div className="flex-1 flex flex-col justify-between z-10">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-emerald-500" />
                  <h2 className="text-emerald-400 font-mono tracking-[0.4em] uppercase text-xs">Sustainable Energy</h2>
                </div>
                <h1 className="text-7xl font-black leading-[0.9] tracking-tighter">{slide.title}</h1>
                <p className="text-2xl text-white/60 font-light italic">{slide.subtitle}</p>
              </motion.div>
              
              <div className="glass-panel p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <p className="text-xl text-emerald-50/90 font-medium leading-relaxed">{slide.content.tagline}</p>
                <div className="grid grid-cols-1 gap-3">
                  {slide.content.points.map((p: string, i: number) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-3 text-white/70"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                      <span className="text-lg leading-relaxed">{p}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Details - Positioned at the bottom in a single line */}
            <div className="flex flex-row flex-nowrap gap-2 mt-8">
              <div className="glass-card !py-2 !px-3 flex items-center gap-2 border-emerald-500/20 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] truncate">Presenter</p>
                  <p className="text-xs font-bold text-white/90 truncate">{slide.content.personal.name}</p>
                </div>
              </div>
              <div className="glass-card !py-2 !px-3 flex items-center gap-2 border-blue-500/20 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] truncate">Course</p>
                  <p className="text-xs font-bold text-white/90 truncate">{slide.content.personal.course}</p>
                </div>
              </div>
              <div className="glass-card !py-2 !px-3 flex items-center gap-2 border-amber-500/20 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Hash className="w-4 h-4 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] truncate">Roll No</p>
                  <p className="text-xs font-bold text-white/90 truncate">{slide.content.personal.roll}</p>
                </div>
              </div>
              <div className="glass-card !py-2 !px-3 flex items-center gap-2 border-indigo-500/20 flex-[1.2] min-w-0">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Fingerprint className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] truncate">Enrollment</p>
                  <p className="text-xs font-bold text-white/90 whitespace-nowrap">{slide.content.personal.enroll}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-full py-12 relative">
            <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-30 animate-pulse" />
            <div className="w-full h-full rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative">
              <img src={slide.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="w-full h-full flex flex-col p-16 gap-4">
          <div className="mb-2">
            <h1 className="text-6xl font-bold mb-1">{slide.title}</h1>
            <p className="text-2xl text-white/60">{slide.subtitle}</p>
          </div>
          <div className="h-[38%] grid grid-cols-4 gap-6 items-stretch">
            {slide.content.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex flex-col justify-between !p-5"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-bold text-emerald-500/50">{item.year}</span>
                  <h3 className="text-xl font-bold">{item.label}</h3>
                  <p className="text-white/70 text-base leading-relaxed">{item.desc}</p>
                </div>
                <div className="h-1 w-full bg-emerald-500/20 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: i * 0.2, duration: 1 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex-1 mt-4 rounded-2xl overflow-hidden border border-white/5 relative">
            <img src={slide.image} alt="" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="w-full h-full flex p-16 gap-16">
          <div className="w-1/3 flex flex-col justify-center space-y-6">
            <h1 className="text-6xl font-bold leading-tight">{slide.title}</h1>
            <p className="text-2xl text-white/60">{slide.subtitle}</p>
            <div className="rounded-2xl overflow-hidden border border-white/5 aspect-square">
              <img src={slide.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 content-center">
            {slide.content.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex flex-col gap-3 p-10 !min-h-[180px]"
              >
                <div className="p-2.5 bg-emerald-500/10 rounded-xl w-fit text-emerald-400">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'split':
      return (
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full relative">
            <img src={slide.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center p-20 space-y-8">
            <div>
              <h1 className="text-6xl font-bold mb-3">{slide.title}</h1>
              <p className="text-2xl text-emerald-400/80 italic">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {slide.content.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group glass-card !p-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <span className="text-xl font-medium text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'future':
      return (
        <div className="w-full h-full flex flex-col p-16 gap-10">
          <div className="text-center space-y-3">
            <h1 className="text-6xl font-bold">{slide.title}</h1>
            <p className="text-2xl text-white/60">{slide.subtitle}</p>
          </div>
          <div className="flex-1 flex gap-10">
            <div className="flex-1 grid grid-rows-3 gap-6">
              {slide.content.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card flex items-center gap-6 px-8"
                >
                  <span className="text-4xl font-black text-emerald-500/40">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/70 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="w-1/2 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <img src={slide.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      );

    case 'conclusion':
      return (
        <div className="w-full h-full relative flex items-center justify-center p-20 overflow-hidden">
          <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110 blur-sm" referrerPolicy="no-referrer" />
          <div className="relative z-10 max-w-4xl text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <h1 className="text-8xl font-bold tracking-tighter">{slide.title}</h1>
              <p className="text-3xl text-emerald-400 font-light tracking-widest uppercase">{slide.subtitle}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-10"
            >
              <p className="text-2xl leading-relaxed text-white/80 font-light italic">
                "{slide.content}"
              </p>
            </motion.div>
          </div>
        </div>
      );

    case 'thankyou':
      return (
        <div className="w-full h-full relative flex items-center justify-center p-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="bg-glow animate-float bg-emerald-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
          </div>
          
          <div className="relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-20 h-20 text-emerald-500 mx-auto mb-2 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              </motion.div>
              <h1 className="text-8xl font-black tracking-tighter leading-none bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-4xl text-emerald-400 font-light tracking-[0.6em] uppercase">
                {slide.subtitle}
              </p>
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-panel px-12 py-6 inline-block relative"
              >
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-500" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-emerald-500" />
                <p className="text-2xl text-white/80 font-mono tracking-widest uppercase">
                  {slide.content}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center gap-12"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
                    <User className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Presenter</p>
                    <p className="text-sm font-bold text-white/90">Pranav Dabhi</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
                    <Hash className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Roll Number</p>
                    <p className="text-sm font-bold text-white/90">1036</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
                    <Fingerprint className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Enrollment</p>
                    <p className="text-sm font-bold text-white/90">2401442032</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      );
  }
}
