"use client";
import React, { useState, useEffect, useRef ,useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  FaWhatsapp, FaCode, FaBolt, FaDatabase, FaShieldAlt, FaChartBar, 
  FaHospital, FaWater, FaUserTie, FaChevronLeft, FaChevronRight, 
  FaRobot, FaTimes, FaBrain, FaGraduationCap, FaBriefcase, FaLaptopCode 
} from "react-icons/fa";

// --- Deterministic random helper (same on server & client) ---
const deterministicRandom = (index: number, max: number = 1) => {
  // Simple linear congruential generator with a fixed seed and index offset
  const seed = (index * 9301 + 49297) % 233280;
  const r = seed / 233280;
  return r * max;
};

// --- 1. PRELOADER "CYBER-SCAN" EVOLUTION (deterministic lines) ---
const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Generate deterministic line durations
  const lines = Array.from({ length: 10 }).map((_, i) => ({
    duration: deterministicRandom(i, 2) + 1, // between 1 and 3 seconds
    left: `${i * 10}%`,
  }));

  return (
    <motion.div 
      exit={{ opacity: 0, y: -100 }} 
      transition={{ duration: 0.8, ease: "easeInOut" }} 
      className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fondo de Partículas de Datos (Líneas verticales sutiles) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: line.duration, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1px] h-20 bg-blue-500"
            style={{ left: line.left }}
          />
        ))}
      </div>

      {/* Rest of the preloader content (unchanged) */}
      <div className="relative flex flex-col items-center">
        <div className="relative mb-12">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-t-2 border-b-2 border-blue-600 rounded-full shadow-[0_0_30px_#2563eb]"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-l-2 border-r-2 border-white/20 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-white text-xl font-bold">
            {progress}%
          </div>
        </div>

        <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 text-center"
        >
          <p className="text-blue-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-2 animate-pulse">
            Bienvenidos al portafolio de...
          </p>
          <h1 className="text-white font-black italic text-2xl md:text-3xl tracking-tighter uppercase leading-none">
            JESÚS <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-white text-5xl">
              VILLALBA
            </span>
          </h1>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: ["-100%", "1000%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-blue-500/20 to-transparent z-10"
      />
    </motion.div>
  );
};

// --- 2. FONDO DINÁMICO (PARA TODAS LAS SECCIONES) - DETERMINISTIC VERSION ---
const SectionBg = ({ color = "blue" }) => {
  // Generate 15 dots with deterministic positions and animations
  const dots = Array.from({ length: 15 }).map((_, i) => {
    const left = deterministicRandom(i, 100);
    const top = deterministicRandom(i + 100, 100);
    const xShift = deterministicRandom(i + 200, 100) - 50; // -50 to 50
    const scaleFactor = 1 + deterministicRandom(i + 300, 50) / 100; // 1 to 1.5
    const duration = deterministicRandom(i + 400, 15) + 5; // 5 to 20

    return {
      left: `${left}%`,
      top: `${top}%`,
      x: [0, xShift, 0],
      scale: [1, scaleFactor, 1],
      duration,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -200, 0],
            x: dot.x,
            scale: dot.scale,
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: dot.duration, repeat: Infinity }}
          className={`absolute w-1 h-1 bg-${color}-500 rounded-full blur-[1px]`}
          style={{ left: dot.left, top: dot.top }}
        />
      ))}
    </div>
  );
};

// --- 3. SOBRE MÍ "PORTAL" (CON IMAGEN PERSONAL) ---
const AboutMe = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-32 relative overflow-hidden">
      <SectionBg color="indigo" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-6">
        
        {/* PORTAL VISUAL */}
        <div className="relative group flex items-center justify-center">
          <motion.div 
            animate={{ 
              rotate: 360, 
              borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 20% 80% / 25% 80% 20% 75%"] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full aspect-square bg-gradient-to-tr from-blue-600/40 via-cyan-500/10 to-transparent backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.3)] scale-110 opacity-70"
          />

          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {!imageError ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center"
              >
                <img 
                  src="yo.jpeg" 
                  alt="Jesús Villalba"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 shadow-[0_0_50px_rgba(59,130,246,0.5)] border-2 border-white/20"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />
              </motion.div>
            ) : (
              <FaUserTie style={{ fontSize: "12rem", color: "rgba(255,255,255,0.1)" }} />
            )}

            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4 }} 
              className="absolute bottom-10 text-white text-center z-20 pointer-events-none"
            >
              <h3 className="font-black italic text-2xl md:text-3xl uppercase tracking-tighter drop-shadow-lg">
                Innovación <br/> 
                <span className="text-blue-400">Total</span>
              </h3>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h2 className="text-6xl md:text-7xl font-black italic text-white mb-8 tracking-tighter leading-[0.9]">
            Visión Sin <br/> Límites
          </h2>
          <p className="text-slate-300 text-xl md:text-2xl font-light leading-relaxed italic">
            No solo construyo software, diseño <span className="text-blue-500 font-bold">ecosistemas inteligentes</span>. Mi mente opera en la intersección exacta entre la ingeniería electrónica y el desarrollo full-stack, transformando problemas complejos en soluciones que respiran tecnología.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- 4. HABILIDADES "NEÓN" CON ENERGÍA INFERIOR ---
const Skills = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skills = [
    { name: "Frontend", icon: <FaCode />, color: "#3b82f6", glow: "rgba(59,130,246,0.6)", border: "hover:border-blue-500" },
    { name: "Backend", icon: <FaDatabase />, color: "#10b981", glow: "rgba(16,185,129,0.6)", border: "hover:border-emerald-500" },
    { name: "Sistemas", icon: <FaBolt />, color: "#f59e0b", glow: "rgba(245,158,11,0.6)", border: "hover:border-yellow-500" },
    { name: "Seguridad", icon: <FaShieldAlt />, color: "#ef4444", glow: "rgba(239,68,68,0.6)", border: "hover:border-red-500" },
  ];

  return (
    <section className="py-24 relative px-6">
      <SectionBg color="cyan" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {skills.map((s, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -15 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`p-10 bg-slate-900/40 border border-white/5 ${s.border} rounded-[2.5rem] backdrop-blur-3xl transition-all duration-500 cursor-default group relative overflow-hidden`}
            style={{ 
              boxShadow: hoveredIndex === i ? `0 0 40px ${s.glow}` : "none" 
            }}
          >
            <div className="relative z-10">
              <div className="text-5xl text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </div>
              <h3 className="text-2xl font-black text-white italic mb-4 uppercase tracking-tighter">
                {s.name}
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed">
                Dominio avanzado de arquitecturas escalables y protocolos de integración industrial.
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-2 bg-white/5 overflow-hidden">
              <motion.div
                animate={hoveredIndex === i ? { x: "0%" } : { x: ["-100%", "100%"] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "linear" 
                }}
                className="w-full h-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                }}
              />
            </div>

            <div 
              className="absolute -bottom-10 -left-10 w-32 h-32 blur-[80px] rounded-full opacity-20 transition-opacity duration-500 group-hover:opacity-50"
              style={{ backgroundColor: s.color }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- 5. CARRUSEL 2.5s (AUTO/MANUAL) + MODALES ---
const Projects = () => {
  type Project = {
    title: string;
    desc: string;
    icon: React.ReactNode;
    text: string;
  };
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const projs: Project[] = [
    { title: "Nómina HLO", desc: "Hospital Luis Ortega", icon: <FaHospital />, text: "Sistema de gestión de nómina para más de 1000 empleados, con integración de bonos y deducciones legales automatizadas bajo entorno seguro PHP/SQL." },
    { title: "CENBNE Info", desc: "Contraloría de N.E.", icon: <FaShieldAlt />, text: "Plataforma centralizada para el manejo de expedientes y fiscalización estatal, optimizando los tiempos de respuesta administrativa en un 60%." },
    { title: "Eco-Desalinizadora", desc: "Monitoreo H2O", icon: <FaWater />, text: "Control telemático de variables fisicoquímicas del agua mediante sensores PIC18F, con visualización de datos en tiempo real para mantenimiento preventivo." },
    { title: "Asistencia Bio", desc: "Gestión CENBNE", icon: <FaChartBar />, text: "Módulo de control de asistencia y reposos médicos con generación de reportes automáticos en PDF y Excel para auditorías de RRHH." }
  ];

  const next = () => setIndex((prev) => (prev + 1) % projs.length);
  const prev = () => setIndex((prev) => (prev - 1 + projs.length) % projs.length);

  useEffect(() => {
    if (isPaused || selected) return;
    const timer = setInterval(next, 2500);
    return () => clearInterval(timer);
  }, [projs.length, isPaused, selected]);

  return (
    <section className="py-24 relative overflow-hidden px-6">
      <SectionBg color="blue" />
      <h2 className="text-6xl font-black italic text-white text-center mb-16 uppercase tracking-tighter">
        Galería de Proyectos
      </h2>

      <div 
        className="relative max-w-7xl mx-auto flex gap-8 justify-center items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button 
          onClick={prev} 
          className="absolute left-0 z-20 p-4 text-white/20 hover:text-blue-500 transition-colors hidden lg:block"
        >
          <FaChevronLeft size={48} />
        </button>

        {[-1, 0, 1].map((offset) => {
          const itemIndex = (index + offset + projs.length) % projs.length;
          const item = projs[itemIndex];
          const isCenter = offset === 0;

          return (
            <motion.div
              key={`${item.title}-${offset}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ 
                scale: isCenter ? 1.1 : 0.85, 
                opacity: isCenter ? 1 : 0.3,
                filter: isCenter ? "blur(0px)" : "blur(4px)" 
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={() => isCenter && setSelected(item)}
              className={`p-12 bg-slate-900/60 border border-white/10 rounded-[3rem] min-w-[320px] flex-1 cursor-pointer transition-all relative group ${
                isCenter ? 'border-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.3)]' : 'hidden md:block'
              }`}
            >
              <div className="text-5xl text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-3xl font-black italic text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 font-mono uppercase text-xs">{item.desc}</p>
              
              {isCenter && (
                <motion.div 
                  layoutId="active-glow" 
                  className="absolute inset-0 bg-blue-500/5 rounded-[3rem] -z-10"
                />
              )}
            </motion.div>
          );
        })}

        <button 
          onClick={next} 
          className="absolute right-0 z-20 p-4 text-white/20 hover:text-blue-500 transition-colors hidden lg:block"
        >
          <FaChevronRight size={48} />
        </button>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6" 
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ y: 100, scale: 0.9, opacity: 0 }} 
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 100, scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 p-12 rounded-[4rem] max-w-2xl border border-blue-500/30 text-center shadow-2xl relative"
            >
              <button 
                onClick={() => setSelected(null)} 
                className="absolute top-8 right-8 text-white/50 hover:text-white hover:rotate-90 transition-all"
              >
                <FaTimes size={24} />
              </button>
              <div className="text-8xl text-blue-600 mb-8 flex justify-center drop-shadow-glow">
                {selected.icon}
              </div>
              <h3 className="text-5xl font-black italic text-white mb-6 uppercase tracking-tighter leading-none">
                {selected.title}
              </h3>
              <p className="text-slate-300 text-xl leading-relaxed mb-10 italic">
                {selected.text}
              </p>
              <a 
                href="https://wa.me/584120864388" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white font-black px-12 py-4 rounded-full uppercase italic hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
              >
                Solicitar Demo
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- 6. TIMELINE CENTRADA + MODALES ---
// 1. Definimos la estructura de los datos
interface TimelineItem {
  year: string;
  title: string;
  place: string;
  icon: React.ReactNode; // Para los iconos de FontAwesome
  info: string;
}

const Timeline = () => {
  // 2. Aplicamos el tipo al estado. Puede ser un TimelineItem o null.
  const [active, setActive] = useState<TimelineItem | null>(null);

  // 3. Tipamos el array de datos (esto es opcional pero recomendado)
  const data: TimelineItem[] = [
    { year: "Actual", title: "Ingeniería en Sistemas", place: "UNEFA", icon: <FaLaptopCode />, info: "Enfoque en computación de alto rendimiento, redes avanzadas y arquitectura de software distribuida." },
    { year: "2025", title: "Ingeniería Electrónica", place: "IUPSM", icon: <FaBolt />, info: "Especialización en microcontroladores, sistemas de control industrial y diseño de PCBs complejos." },
    { year: "2024", title: "TSU Mant. Sistemas Informáticos", place: "UNA", icon: <FaBriefcase />, info: "Gestión proactiva de infraestructura IT, servidores y mantenimiento crítico de hardware corporativo." },
    { year: "Formación", title: "Técnico Especialista INCES", place: "Sector Industrial", icon: <FaShieldAlt />, info: "Capacitación rigurosa en electricidad de potencia y normativas de seguridad industrial vigentes." },
    { year: "Finanzas", title: "Oficinista Integral Financiero", place: "Hotel Tibisay", icon: <FaChartBar />, info: "Control de flujo de caja, auditoría interna y optimización de procesos contables bajo presión." }
  ];

  // ... resto de tu código (se mantiene igual)
  return (
    <section className="py-32 relative px-6">
      <SectionBg color="indigo" />
      <h2 className="text-6xl font-black italic text-white text-center mb-24 uppercase">Ruta de Formación</h2>
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-blue-900/50 blur-[1px]" />
        {data.map((item, i) => (
          <motion.div 
            key={i} whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }}
            className={`mb-20 flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-[42%] ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
              <motion.div 
                whileHover={{ scale: 1.05 }} onClick={() => setActive(item)}
                className="p-8 bg-slate-900/50 border border-white/5 rounded-[2rem] backdrop-blur-md cursor-pointer hover:border-blue-500 transition-all shadow-xl"
              >
                <div className="text-3xl text-blue-500 mb-4 flex justify-end">{item.icon}</div>
                <h3 className="text-2xl font-black text-white italic leading-none mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs font-mono uppercase">[{item.year}] // {item.place}</p>
              </motion.div>
            </div>
            <div className="z-10 w-6 h-6 rounded-full bg-blue-600 shadow-[0_0_20px_#2563eb] border-4 border-[#020617]" />
            <div className="w-[42%]" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-6" onClick={() => setActive(null)}>
            <motion.div className="bg-slate-900 p-12 rounded-[3rem] max-w-lg border border-indigo-500/20 text-center" onClick={e => e.stopPropagation()}>
              <h3 className="text-3xl font-black italic text-indigo-400 mb-4">{active.title}</h3>
              <p className="text-slate-300 italic text-lg leading-relaxed">{active.info}</p>
              <button onClick={() => setActive(null)} className="mt-8 text-white font-mono text-[10px] uppercase border border-white/10 px-6 py-2 rounded-full">Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- 7. DESAFÍO DE MEMORIA (MEJORADO & FUNCIONAL) ---

// 1. Constantes fuera para evitar re-creaciones en memoria
const ICONS_GAME = ['💻', '⚡', '🛠️', '📊', '🌐', '🛡️'];

// 2. Función pura de mezcla (Sustituye la lógica repetitiva)
const generateDeck = () => 
  [...ICONS_GAME, ...ICONS_GAME].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  // 3. Lazy initialization: El estado nace con las cartas mezcladas.
  // Esto elimina el error de "setState synchronously within an effect".
  const [cards, setCards] = useState<string[]>(() => generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  // 4. resetGame solo se dispara por interacción del usuario (botón)
  const resetGame = useCallback(() => {
    setCards(generateDeck());
    setSolved([]);
    setFlipped([]);
  }, []);

  const handleClick = (idx: number) => {
    // Evitar clicks si ya hay 2 cartas, o si la carta ya está resuelta/volteada
    if (flipped.length >= 2 || solved.includes(idx) || flipped.includes(idx)) return;
    
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved(prev => [...prev, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="mt-24 p-8 md:p-12 bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border border-blue-500/20 max-w-lg mx-auto shadow-2xl">
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-black italic bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">
          Reto de Memoria <br/>
          <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500/80 mt-2 block">Sincronización de Nodos</span>
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {cards.map((icon, i) => {
          const isFlipped = flipped.includes(i) || solved.includes(i);
          const isSolved = solved.includes(i);

          return (
            <div 
              key={`${i}-${icon}`} // Key única mejorada
              onClick={() => handleClick(i)}
              className="relative h-16 md:h-20 w-full cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
                className="relative w-full h-full"
              >
                {/* TRASERA */}
                <div 
                  className="absolute inset-0 bg-slate-800 border border-white/10 rounded-2xl flex items-center justify-center text-blue-500/50 text-xl font-black"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  ?
                </div>

                {/* FRONTAL */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-2xl text-2xl md:text-3xl shadow-lg border-2 ${
                    isSolved ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-blue-600 border-white/20 text-white'
                  }`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {icon}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {solved.length === cards.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8 space-y-4">
            <p className="text-emerald-400 font-mono text-[10px] uppercase animate-pulse">¡Sistemas Optimizados!</p>
            <button 
              onClick={resetGame}
              className="text-[10px] font-black uppercase italic text-white/60 hover:text-blue-400 border border-white/10 px-6 py-2 rounded-full bg-white/5 transition-all"
            >
              Reiniciar Protocolo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 8. CHATBOT FAQ (SEPARACIÓN 25° + TAMAÑO IGUALADO) ---



// 1. Definimos la estructura de una FAQ para que TS no adivine
interface FAQItem {
  q: string;
  a: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  // 2. Tipamos el estado: puede ser un objeto FAQItem o null
  const [activeFaq, setActiveFaq] = useState<FAQItem | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // 3. Tipamos el array de preguntas
  const faqs: FAQItem[] = [
    { q: '¿En qué te especializas?', a: 'En la fusión de software robusto (Next.js/PHP) con electrónica industrial y sistemas de control.' },
    { q: '¿Qué tecnologías dominas?', a: 'Full-stack (React, Next.js, Supabase, Tailwind, PHP) y Hardware (PIC18F, ESP32, Proteus, PCB Design).' },
    { q: '¿Experiencia en automatización?', a: 'He diseñado sistemas autónomos de desalinización solar y registros biométricos integrados a bases de datos SQL.' },
    { q: '¿Cómo manejas proyectos?', a: 'Aplico metodologías ágiles, priorizando la escalabilidad del código y la eficiencia energética en hardware.' },
    { q: '¿Haces trabajos freelance?', a: 'Sí, desarrollo soluciones personalizadas desde landing pages de alto impacto hasta sistemas internos de gestión.' },
    { q: '¿Formación académica?', a: 'Estudiante de Ingeniería en Electrónica y Sistemas en el IUP Santiago Mariño, Nueva Esparta.' },
    { q: '¿Dominas el inglés?', a: 'Cuento con capacidad para documentación técnica y comunicación efectiva en entornos de desarrollo internacionales.' },
    { q: '¿Tu enfoque de diseño?', a: "Busco interfaces 'Cyberpunk' y modernas que sean rápidas, intuitivas y totalmente responsivas." },
    { q: '¿Ubicación y disponibilidad?', a: 'Nueva Esparta, Venezuela. Disponible para trabajo remoto o híbrido con disponibilidad inmediata.' },
    { q: '¿Cómo te contacto?', a: 'Puedes usar el botón de WhatsApp abajo o escribirme directamente para agendar una demo técnica.' }
  ];

  // 4. Especificamos que 'faq' que recibe la función es de tipo FAQItem
  const handleQuestionClick = (faq: FAQItem) => {
    setIsTyping(true);
    setActiveFaq(null);
    setTimeout(() => {
      setActiveFaq(faq);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-28 right-24 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, x: 40, y: 40 }} 
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} 
            exit={{ opacity: 0, scale: 0.5, x: 40, y: 40 }} 
            className="bg-slate-900/95 border border-blue-500/20 p-7 rounded-[2.5rem] mb-5 w-80 max-h-[480px] shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl relative flex flex-col"
          >
            <h4 className="text-blue-500 font-black italic mb-4 uppercase text-[10px] tracking-[0.25em] flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              JV Assistant Core
            </h4>

            <div className="overflow-y-auto pr-1 mb-5 space-y-2 custom-scrollbar max-h-[220px]">
              {faqs.map((f, i) => (
                <button 
                  key={i} 
                  onClick={() => handleQuestionClick(f)}
                  className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
                >
                  <p className="text-white text-[11px] font-bold group-hover:text-blue-400 leading-tight transition-colors">
                    {f.q}
                  </p>
                </button>
              ))}
            </div>

            <div className="min-h-[90px] bg-black/50 border border-white/5 p-5 rounded-2xl flex items-center shadow-inner relative overflow-hidden">
               <div className="absolute top-2 right-3 text-[8px] text-white/10 font-mono tracking-widest uppercase">Protocol_Active</div>
              
              {isTyping && (
                <div className="flex gap-2 items-center">
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.span key={d} animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d }} className="w-2 h-2 bg-blue-600 rounded-full" />
                  ))}
                </div>
              )}
              
              <AnimatePresence mode="wait">
                {/* 5. Al estar tipado, activeFaq.a ya no dará error */}
                {activeFaq && !isTyping && (
                  <motion.p 
                    key={activeFaq.q} // Importante para que AnimatePresence detecte el cambio
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }}
                    className="text-slate-200 text-[12px] leading-relaxed italic font-medium"
                  >
                    {activeFaq.a}
                  </motion.p>
                )}
                {!activeFaq && !isTyping && <p className="text-slate-500 text-[11px] italic">Esperando consulta de usuario...</p>}
              </AnimatePresence>
            </div>
            
            <div className="absolute -bottom-2 right-12 w-5 h-5 bg-slate-900 rotate-45 border-r border-b border-blue-500/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => { setOpen(!open); setActiveFaq(null); }} 
        className={`p-5 rounded-full text-white text-3xl shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all duration-500 flex items-center justify-center relative group ${
          open ? 'bg-slate-800 rotate-90 scale-100' : 'bg-blue-600 hover:scale-110 active:scale-95'
        }`}
      >
        {!open && (
          <motion.div 
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            className="absolute inset-0 bg-blue-500 rounded-full -z-10" 
          />
        )}
        {open ? <FaTimes size={28} /> : <FaRobot size={28} />}
      </button>
    </div>
  );
};

/// --- 9. MAIN (HERO & FOOTER ACTUALIZADO) ---
export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 3500); }, []);

  // Función para procesar el envío a WhatsApp
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;
    const proyecto = formData.get("proyecto") as string;

    if (!nombre || !proyecto) return;

    const mensaje = `Hola Jesús, mi nombre es *${nombre.trim()}*.%0A%0AQuiero comentarte mi proyecto:%0A_${proyecto.trim()}_`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=584123504829&text=${mensaje}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-[#020617] min-h-screen selection:bg-blue-500 overflow-x-hidden">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      
      <main className="relative z-10 max-w-7xl mx-auto">
        
        {/* HERO - PROTOCOLO DE INICIO */}
        <section className="h-screen flex flex-col justify-center items-center text-center relative px-6 overflow-hidden">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <SectionBg color="blue" />
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 2.8], opacity: [0.3, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 1.3,
                  ease: "easeOut" 
                }}
                className="absolute w-[350px] md:w-[600px] aspect-square border border-blue-500/20 rounded-full"
              />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 8 }}>
              <h1 className="text-[14vw] md:text-[11rem] font-black leading-[0.85] tracking-tighter uppercase italic text-white drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                JESÚS <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-700">
                  VILLALBA
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-blue-400 font-mono text-sm md:text-lg tracking-[0.4em] uppercase italic"
            >
              Full-Stack Ingeniero // Automatización y Software
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <a 
                href="https://wa.me/584123504829" 
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center px-12 py-5 font-black italic text-white uppercase tracking-widest transition-all duration-500 overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-blue-600 transition-all duration-500 group-hover:bg-white" />
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                
                <span className="relative z-10 flex items-center gap-3 group-hover:text-blue-600 transition-colors text-lg font-black uppercase italic tracking-tighter">
                  Empecemos
                  <FaWhatsapp className="text-xl group-hover:rotate-[15deg] group-hover:scale-110 transition-transform duration-300" />
                </span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-40"
          />
        </section>

        <AboutMe />
        <Skills />
        <Projects />
        <Timeline />
        
        {/* FOOTER & CONTACTO */}
        <footer className="py-32 border-t border-white/5 relative px-6 overflow-hidden">
          <SectionBg color="blue" />
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="text-6xl md:text-7xl font-black italic text-white uppercase leading-[0.85] tracking-tighter mb-6">
                Llevemos tu idea al <br/> 
                <span className="text-blue-600">Próximo Nivel</span>
              </h2>
              <p className="text-slate-400 text-lg font-light italic max-w-md mx-auto lg:mx-0">
                Sincroniza conmigo para agendar una consultoría técnica o discutir vacantes de ingeniería de alto impacto.
              </p>
            </motion.div>

            <motion.form 
              onSubmit={handleFormSubmit}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 w-full bg-slate-900/20 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-md"
            >
              <div className="mb-12 flex flex-col items-center text-center group relative z-10">
                <div className="flex gap-1.5 items-center mb-4">
                  {[0.1, 0.3, 0.5, 0.7].map((delay) => (
                    <motion.div
                      key={delay}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2, delay: delay }}
                      className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
                    />
                  ))}
                </div>

                <h3 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-[0.9] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-700 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]">
                  Escribeme<br/>
                  <span className="text-white text-5xl md:text-6xl not-italic tracking-[0.1em] font-extrabold">
                    TU IDEA
                  </span>
                </h3>
                
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mt-6 shadow-[0_0_10px_white]"
                />
              </div>
              <input 
                name="nombre"
                required 
                placeholder="IDENTIFICACIÓN (NOMBRE)" 
                className="bg-white/5 p-5 rounded-2xl border border-white/5 text-white outline-none focus:border-blue-500/50 transition-all font-mono text-xs placeholder:text-slate-600" 
              />
              <textarea 
                name="proyecto"
                required 
                placeholder="DESCRIBE EL PROYECTO..." 
                rows={3} 
                className="bg-white/5 p-5 rounded-2xl border border-white/5 text-white outline-none focus:border-blue-500/50 transition-all font-mono text-xs placeholder:text-slate-600"
              ></textarea>
              <button 
                type="submit"
                className="group relative bg-white text-black font-black uppercase py-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 overflow-hidden shadow-xl"
              >
                <span className="relative z-10 tracking-widest">Enviar Mensaje</span>
                <div className="absolute inset-0 bg-blue-700 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.form>
          </div>
          
          <div className="relative z-10">
            <MemoryGame />
          </div>

          <div className="mt-60 pb-10 relative flex flex-col items-center">
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "200px", opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-12"
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center font-mono text-[10px] text-slate-500 tracking-[0.6em] uppercase">
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                  Optimizando procesos desde 2024
                </span>
                <span className="hidden md:block text-slate-800">|</span>
                <span className="hover:text-white transition-colors duration-500">© 2026 JESÚS VILLALBA</span>
                <span className="hidden md:block text-slate-800">|</span>
                <span className="text-blue-500/60 font-black">Disponible 24h </span>
              </div>

              <p className="font-mono text-[9px] text-slate-700 tracking-widest hover:text-blue-400 transition-colors cursor-pointer">
                jesusvillalbalzolar@gmail.com
              </p>
            </motion.div>
            
            <div className="absolute -bottom-5 text-[18vw] font-black text-white/[0.01] italic select-none pointer-events-none uppercase tracking-tighter">
              Villalba
            </div>
          </div>
        </footer>
      </main>

      <Chatbot />
      
      <motion.a 
        href="https://wa.me/584123504829" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-10 right-10 z-[100] bg-[#25d366] p-5 rounded-full text-white text-3xl shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center"
      >
        <FaWhatsapp />
      </motion.a>
    </div>
  );

}