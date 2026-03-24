/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Zap, Globe, AlertTriangle, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  icon: React.ReactNode;
  imageSeed: string;
  imageCaption: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    title: "Future of Sustainable Energy",
    subtitle: "Green Innovations and Global Transition",
    content: [
      "Renewable and environmentally friendly energy sources.",
      "Meeting long-term global demand sustainably.",
      "Addressing rising needs from population and digital growth.",
      "Essential for environmental protection and economic stability."
    ],
    icon: <Zap className="w-12 h-12 text-emerald-400" />,
    imageSeed: "wind-turbines",
    imageCaption: "Sustainable energy sources are the backbone of a green future."
  },
  {
    id: 1,
    title: "Evolution of Energy Systems",
    subtitle: "From Fossil Fuels to Renewables",
    content: [
      "Historical dominance of coal, oil, and natural gas.",
      "Shift toward solar, wind, and hydropower systems.",
      "Acceleration through technological advancements.",
      "Global agreements driving massive clean energy investment."
    ],
    icon: <Globe className="w-12 h-12 text-blue-400" />,
    imageSeed: "solar-panels",
    imageCaption: "The transition from traditional to renewable energy is accelerating globally."
  },
  {
    id: 2,
    title: "Current Challenges",
    subtitle: "Obstacles in the Path to Green Energy",
    content: [
      "Geopolitical tensions affecting global supply chains.",
      "Intermittency and storage limitations of renewables.",
      "Unequal energy access between global regions.",
      "Urgent need to address remaining carbon emissions."
    ],
    icon: <AlertTriangle className="w-12 h-12 text-amber-400" />,
    imageSeed: "power-lines",
    imageCaption: "Infrastructure and storage remain key hurdles for full renewable adoption."
  },
  {
    id: 3,
    title: "Green Innovations",
    subtitle: "Technologies Shaping Tomorrow",
    content: [
      "Advanced solar technologies with higher efficiency.",
      "Offshore wind farms expanding renewable capacity.",
      "Green hydrogen emerging as a viable clean fuel.",
      "Smart grids and AI optimizing energy distribution.",
      "Carbon capture technologies reducing industrial impact."
    ],
    icon: <Lightbulb className="w-12 h-12 text-emerald-400" />,
    imageSeed: "hydrogen-fuel",
    imageCaption: "Innovation in storage and distribution is key to energy resilience."
  },
  {
    id: 4,
    title: "Future Trends",
    subtitle: "The Road Ahead",
    content: [
      "Growth of decentralized systems (rooftop solar, microgrids).",
      "Widespread electrification reducing fossil fuel dependence.",
      "Increased government investment in green infrastructure.",
      "Global cooperation defining future energy stability.",
      "Efficiency and sustainability as core system metrics."
    ],
    icon: <TrendingUp className="w-12 h-12 text-indigo-400" />,
    imageSeed: "smart-city",
    imageCaption: "Decentralized and smart systems will define the next generation of power."
  },
  {
    id: 5,
    title: "Conclusion",
    subtitle: "A Clean, Efficient, and Accessible Future",
    content: [
      "Sustainable energy is essential for planetary survival.",
      "Innovation and policy must work in tandem.",
      "Global collaboration is no longer optional.",
      "The future lies in clean and accessible energy for all."
    ],
    icon: <CheckCircle className="w-12 h-12 text-emerald-500" />,
    imageSeed: "green-earth",
    imageCaption: "The path forward is clear: clean, efficient, and sustainable energy."
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
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 md:p-8">
      <div className="presentation-container bg-[#0a0a0a] shadow-2xl border border-white/5 flex flex-col">
        
        {/* Progress Bar */}
        <div className="h-1 bg-white/5 w-full">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 p-12 md:p-20 flex flex-col md:flex-row gap-12"
            >
              {/* Left Side: Text Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    {slide.icon}
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                      Section {currentSlide + 1} / {SLIDES.length}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 text-white">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl font-light text-emerald-400/80 italic">
                      {slide.subtitle}
                    </p>
                  )}
                </div>

                <ul className="space-y-6">
                  {slide.content.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-4 text-lg md:text-xl text-white/70 leading-relaxed"
                    >
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Visual Element */}
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 group">
                  <img 
                    src={`https://picsum.photos/seed/${slide.imageSeed}/1200/900`}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-sm font-mono text-white/60 italic">
                      // {slide.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="h-20 px-8 border-t border-white/5 flex items-center justify-between bg-[#080808]">
          <div className="flex items-center gap-6">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-full hover:bg-white/5 disabled:opacity-20 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === SLIDES.length - 1}
              className="p-2 rounded-full hover:bg-white/5 disabled:opacity-20 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <span className="text-sm font-mono text-white/30">
              {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-medium">
              Future of Sustainable Energy & Green Innovations
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Live Presentation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/20 uppercase tracking-[0.2em] pointer-events-none hidden md:block">
        Use Arrow Keys or Space to Navigate
      </div>
    </div>
  );
}
