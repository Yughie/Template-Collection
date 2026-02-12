import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { templateConfig } from "../config/templateConfig";

const Gallery5 = () => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const containerRef = useRef(null);
  const config = templateConfig.gallery5;

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
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

      {/* Film Grain Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-40">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] animate-pulse" />
      </div>

      {/* Header */}
      <motion.header
        className="text-center pt-20 pb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-block"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-5xl">🎬</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-wider">
          {config.title}
        </h1>
        <p className="text-gray-400 mt-2 font-mono">{config.subtitle}</p>

        {/* Film Reel Animation */}
        <div className="flex justify-center gap-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-8 border-2 border-amber-500/50 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            >
              <div className="w-full h-full relative">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-1 h-1 bg-amber-500/50 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${j * 90}deg) translateY(-10px)`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.header>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-red-500"
          style={{ scaleX: smoothProgress, transformOrigin: "left" }}
        />
      </div>

      {/* Horizontal Film Strip Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-8"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex items-center min-h-[60vh] px-8 md:px-16">
          {/* Film Strip */}
          <div className="flex gap-0 relative py-8">
            {/* Top Sprocket Holes */}
            <div className="absolute top-0 left-0 right-0 flex">
              {config.frames.map((_, i) => (
                <div
                  key={`top-${i}`}
                  className="flex-shrink-0 w-[300px] md:w-[400px] flex justify-around px-8"
                >
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-gray-700 rounded-sm" />
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom Sprocket Holes */}
            <div className="absolute bottom-0 left-0 right-0 flex">
              {config.frames.map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="flex-shrink-0 w-[300px] md:w-[400px] flex justify-around px-8"
                >
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-gray-700 rounded-sm" />
                  ))}
                </div>
              ))}
            </div>

            {/* Film Background */}
            <div className="absolute inset-0 -top-6 -bottom-6 bg-gray-800 -z-10" />

            {/* Frames */}
            {config.frames.map((frame, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[400px] px-4 py-8 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedFrame(frame)}
              >
                <motion.div
                  className="relative bg-black rounded overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Frame Border */}
                  <div className="absolute inset-0 border-4 border-gray-600 rounded z-10 pointer-events-none" />

                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={frame.url}
                      alt={frame.caption}
                      className="w-full h-full object-cover filter sepia-[0.2] contrast-[1.1]"
                    />
                  </div>

                  {/* Caption Overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white font-mono text-sm">
                      {frame.caption}
                    </p>
                    <p className="text-amber-400 text-xs mt-1">
                      {frame.timestamp}
                    </p>
                  </motion.div>

                  {/* Film Frame Number */}
                  <div className="absolute top-2 right-2 text-amber-500/50 font-mono text-xs">
                    #{String(index + 1).padStart(3, "0")}
                  </div>

                  {/* Play Icon on Hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-3xl">▶</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            {/* End Card */}
            <div className="flex-shrink-0 w-[300px] md:w-[400px] px-4 py-8 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💖
                </motion.div>
                <p className="text-white font-serif text-xl italic">
                  "{config.endMessage}"
                </p>
                <p className="text-amber-400 mt-2">— {config.signature}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-gray-400 flex items-center gap-2"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Scroll to view</span>
        <span>→</span>
      </motion.div>

      {/* Lightbox Modal */}
      {selectedFrame && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedFrame(null)}
        >
          <motion.div
            className="max-w-4xl w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Film Frame Effect */}
            <div className="bg-gray-800 p-4 rounded">
              <div className="flex justify-around mb-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-600 rounded-sm" />
                ))}
              </div>

              <img
                src={selectedFrame.url}
                alt={selectedFrame.caption}
                className="w-full rounded filter sepia-[0.1]"
              />

              <div className="flex justify-around mt-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-600 rounded-sm" />
                ))}
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-mono">
                {selectedFrame.caption}
              </h3>
              <p className="text-amber-400 mt-1">{selectedFrame.timestamp}</p>
            </div>

            <motion.button
              className="absolute -top-4 -right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedFrame(null)}
            >
              ×
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Hide Scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Gallery5;
