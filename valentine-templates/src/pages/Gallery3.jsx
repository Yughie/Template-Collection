import { useRef, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templateConfig } from '../config/templateConfig';

const Gallery3 = () => {
  const config = templateConfig.gallery3;
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Floating particles
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: (i * 3.33) % 100,
    delay: (i * 0.17) % 5,
    duration: 15 + (i % 10),
    size: 5 + (i % 15),
    opacity: 0.2 + (i % 5) * 0.1
  })), []);

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 relative">
      {/* Back Button */}
      <Link to="/" className="fixed top-6 left-6 z-50">
        <motion.button
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium shadow-lg hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      </Link>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full pointer-events-none bg-white"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity
          }}
          animate={{
            y: [window.innerHeight, -100],
            x: [0, Math.sin(particle.id) * 50, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Animated Background Rings */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: 200 + i * 150,
              height: 200 + i * 150
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180]
            }}
            transition={{
              duration: 10 + i * 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        <motion.div
          className="text-center z-10 px-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200%' }}
          >
            {config.title}
          </motion.h1>
          
          <motion.div
            className="text-6xl mb-8"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💕
          </motion.div>

          <motion.p
            className="text-white/60 text-xl"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Scroll down to read our story ↓
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Chapter Sections */}
      {config.chapters.map((chapter, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <section
            key={index}
            className="min-h-screen flex items-center relative overflow-hidden"
          >
            <div className={`max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
              {/* Image Side */}
              <motion.div
                className={`relative ${isEven ? '' : 'md:order-2'}`}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)"
                  }}
                >
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
                  
                  {/* Animated Frame */}
                  <motion.div
                    className="absolute inset-4 border-2 border-white/20 rounded-xl"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Floating Elements Around Image */}
                <motion.div
                  className="absolute -top-4 -left-4 text-3xl"
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 20, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -right-4 text-3xl"
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [0, -20, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  💫
                </motion.div>
              </motion.div>

              {/* Text Side */}
              <motion.div
                className={`text-center md:text-left ${isEven ? '' : 'md:order-1'}`}
                initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.span
                  className="text-pink-400 text-sm font-medium tracking-widest uppercase mb-4 block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {chapter.title}
                </motion.span>
                
                <motion.div
                  className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mb-6 mx-auto md:mx-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                />
                
                <motion.p
                  className="text-white/80 text-xl md:text-2xl leading-relaxed font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {chapter.text}
                </motion.p>

                {/* Decorative Hearts */}
                <motion.div
                  className="mt-8 flex gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {['💕', '💗', '💖'].map((heart, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.2,
                        repeat: Infinity 
                      }}
                    >
                      {heart}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Ending Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="text-center z-10 px-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Animated Heart Burst */}
          <div className="relative mb-8">
            <motion.div
              className="text-8xl"
              animate={{ 
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💕
            </motion.div>
            
            {/* Orbiting Hearts */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  top: '50%',
                  left: '50%'
                }}
                animate={{
                  x: Math.cos((i * 45 * Math.PI) / 180) * 80,
                  y: Math.sin((i * 45 * Math.PI) / 180) * 80,
                  rotate: 360
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2
                }}
              >
                {['❤️', '💖', '💗', '💕'][i % 4]}
              </motion.div>
            ))}
          </div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            {config.ending}
          </motion.h2>

          <motion.p
            className="text-white/60 text-xl italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            — {config.signature}
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-12 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium shadow-lg"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            viewport={{ once: true }}
          >
            Read Again ↑
          </motion.button>
        </motion.div>

        {/* Final Background Animation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl pointer-events-none"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 5) % 100}%`
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-30, 30, -30],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 5 + (i % 5),
              delay: i * 0.3,
              repeat: Infinity
            }}
          >
            {['💕', '✨', '💖', '⭐', '💗'][i % 5]}
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Gallery3;
