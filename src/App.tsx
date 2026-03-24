/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Zap, Globe, AlertTriangle, Lightbulb, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface SlideData {
  id: number;
  type: 'intro' | 'timeline' | 'grid' | 'split' | 'future' | 'conclusion';
  title: string;
  subtitle?: string;
  content: any;
  image: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    type: 'intro',
    title: "The Future of Sustainable Energy",
    subtitle: "Pioneering the Green Revolution",
    image: "slide1_intro.png",
    content: {
      tagline: "Transitioning to a resilient, carbon-neutral global economy.",
      points: [
        "Renewable systems for long-term demand",
        "Environmental protection & climate stability",
        "Energy security through diversification"
      ]
    }
  },
  {
    id: 1,
    type: 'timeline',
    title: "Evolution of Energy Systems",
    subtitle: "A Century of Transformation",
    image: "slide2_evolution.png",
    content: [
      { year: "1900s", label: "Fossil Fuel Dominance", desc: "Coal & Oil drive industrial growth" },
      { year: "1970s", label: "Nuclear & Hydro", desc: "First major shift toward diversification" },
      { year: "2000s", label: "Renewable Surge", desc: "Solar & Wind become cost-competitive" },
      { year: "2025+", label: "The Green Era", desc: "Decentralized, smart, and zero-emission" }
    ]
  },
  {
    id: 2,
    type: 'grid',
    title: "Critical Challenges",
    subtitle: "Navigating the Transition",
    image: "slide3_challenges.png",
    content: [
      { icon: <Globe className="w-6 h-6" />, title: "Supply Chains", desc: "Geopolitical tensions affecting resource flow" },
      { icon: <Zap className="w-6 h-6" />, title: "Intermittency", desc: "Storage limitations of wind and solar" },
      { icon: <AlertTriangle className="w-6 h-6" />, title: "Equity Gap", desc: "Unequal access between global regions" },
      { icon: <TrendingUp className="w-6 h-6" />, title: "Emissions", desc: "Urgent need for industrial decarbonization" }
    ]
  },
  {
    id: 3,
    type: 'split',
    title: "Green Innovations",
    subtitle: "Technological Breakthroughs",
    image: "slide4_innovations.png",
    content: [
      "High-efficiency advanced solar cells",
      "Massive-scale offshore wind arrays",
      "Green hydrogen as clean industrial fuel",
      "AI-driven smart grid optimization",
      "Direct air carbon capture systems"
    ]
  },
  {
    id: 4,
    type: 'future',
    title: "Future Trends",
    subtitle: "Defining the Next Decade",
    image: "slide5_future.png",
    content: [
      { title: "Decentralization", desc: "Rooftop solar and local microgrids" },
      { title: "Electrification", desc: "Phasing out fossil fuels in transport" },
      { title: "Smart Infrastructure", desc: "V2G (Vehicle-to-Grid) integration" }
    ]
  },
  {
    id: 5,
    type: 'conclusion',
    title: "The Path Forward",
    subtitle: "Clean. Efficient. Accessible.",
    image: "slide6_conclusion.png",
    content: "The global energy transition is no longer a choice—it is a necessity. Through innovation, policy, and collaboration, we can build a sustainable legacy for generations to come."
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Backspace') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="presentation-container">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow animate-float bg-emerald-500/20 top-[-10%] left-[-10%]" />
        <div className="bg-glow animate-float-delayed bg-blue-500/20 bottom-[-10%] right-[-10%]" />
      </div>

      <div className="slide-wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex flex-col"
          >
            {renderSlideContent(slide, currentSlide === 0, toggleFullscreen)}
          </motion.div>
        </AnimatePresence>

        {/* Minimal Progress Indicator */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {SLIDES.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function renderSlideContent(slide: SlideData, isFirst: boolean, onFullscreen: () => void) {
  switch (slide.type) {
    case 'intro':
      return (
        <div className="w-full h-full flex flex-col md:flex-row items-center p-16 gap-16">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-emerald-400 font-mono tracking-[0.4em] uppercase text-sm">Sustainable Energy</h2>
              <h1 className="text-7xl font-bold leading-tight tracking-tight">{slide.title}</h1>
              <p className="text-2xl text-white/60 font-light italic">{slide.subtitle}</p>
            </motion.div>
            
            <div className="glass-panel p-8 space-y-6">
              <p className="text-xl text-emerald-100/90 font-medium">{slide.content.tagline}</p>
              <div className="grid grid-cols-1 gap-4">
                {slide.content.points.map((p: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-white/60">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {isFirst && (
              <button 
                onClick={onFullscreen}
                className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-sm uppercase tracking-widest"
              >
                <Maximize2 className="w-4 h-4" /> Start Presentation
              </button>
            )}
          </div>
          <div className="flex-1 h-full py-12">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img src={slide.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="w-full h-full flex flex-col p-16">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-2">{slide.title}</h1>
            <p className="text-xl text-white/40">{slide.subtitle}</p>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-8 items-center">
            {slide.content.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-4xl font-bold text-emerald-500/50">{item.year}</span>
                  <h3 className="text-xl font-bold">{item.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="h-1 w-full bg-emerald-500/20 rounded-full mt-8 overflow-hidden">
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
          <div className="h-1/3 mt-12 rounded-2xl overflow-hidden border border-white/5">
            <img src={slide.image} alt="" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="w-full h-full flex p-16 gap-16">
          <div className="w-1/3 flex flex-col justify-center space-y-8">
            <h1 className="text-5xl font-bold leading-tight">{slide.title}</h1>
            <p className="text-xl text-white/40">{slide.subtitle}</p>
            <div className="rounded-2xl overflow-hidden border border-white/5 aspect-square">
              <img src={slide.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-8 content-center">
            {slide.content.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex flex-col gap-4 p-10"
              >
                <div className="p-3 bg-emerald-500/10 rounded-xl w-fit text-emerald-400">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
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
          <div className="w-1/2 h-full flex flex-col justify-center p-20 space-y-12">
            <div>
              <h1 className="text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-2xl text-emerald-400/80 italic">{slide.subtitle}</p>
            </div>
            <div className="space-y-6">
              {slide.content.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    <ArrowRight className="w-5 h-5" />
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
        <div className="w-full h-full flex flex-col p-16 gap-12">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold">{slide.title}</h1>
            <p className="text-xl text-white/40">{slide.subtitle}</p>
          </div>
          <div className="flex-1 flex gap-8">
            <div className="flex-1 grid grid-rows-3 gap-6">
              {slide.content.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card flex items-center gap-8 px-10"
                >
                  <span className="text-4xl font-bold text-emerald-500/20">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
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
          <div className="relative z-10 max-w-4xl text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <h1 className="text-8xl font-bold tracking-tighter">{slide.title}</h1>
              <p className="text-3xl text-emerald-400 font-light tracking-widest uppercase">{slide.subtitle}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-12"
            >
              <p className="text-2xl leading-relaxed text-white/80 font-light italic">
                "{slide.content}"
              </p>
            </motion.div>
          </div>
        </div>
      );
  }
}
