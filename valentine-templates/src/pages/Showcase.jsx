import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Showcase = () => {
  const postcards = [
    {
      id: 1,
      title: "Classic Love Letter",
      description:
        "An elegant envelope that opens to reveal a heartfelt message",
      gradient: "from-rose-400 via-pink-500 to-red-400",
      icon: "💌",
      path: "/postcard-1",
    },
    {
      id: 2,
      title: "Vintage Romance",
      description: "A nostalgic postcard with old-world charm and elegance",
      gradient: "from-amber-300 via-rose-400 to-pink-500",
      icon: "🌹",
      path: "/postcard-2",
    },
    {
      id: 3,
      title: "Sweet & Girly",
      description: "Playful, colorful, and full of sweet surprises",
      gradient: "from-pink-300 via-purple-400 to-pink-500",
      icon: "💕",
      path: "/postcard-3",
    },
    {
      id: 4,
      title: "Fairy Tale Book",
      description:
        "A magical storybook with pages that turn to reveal your love story",
      gradient: "from-purple-500 via-indigo-500 to-purple-600",
      icon: "📖",
      path: "/postcard-4",
    },
    {
      id: 5,
      title: "Message in a Bottle",
      description: "Romantic messages floating up from the ocean depths",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      icon: "🍾",
      path: "/postcard-5",
    },
    {
      id: 6,
      title: "Snow Globe",
      description:
        "A magical snow globe to shake and reveal your heartfelt message",
      gradient: "from-slate-400 via-purple-400 to-pink-400",
      icon: "❄️",
      path: "/postcard-6",
    },
  ];

  const galleries = [
    {
      id: 1,
      title: "Elegant Moments",
      description: "A sophisticated gallery showcasing your precious memories",
      gradient: "from-purple-400 via-pink-500 to-rose-400",
      icon: "✨",
      path: "/gallery-1",
    },
    {
      id: 2,
      title: "Polaroid Memories",
      description: "Scattered polaroids bringing back beautiful moments",
      gradient: "from-cyan-400 via-pink-400 to-rose-500",
      icon: "📸",
      path: "/gallery-2",
    },
    {
      id: 3,
      title: "Cinematic Story",
      description: "A scroll-through journey of your love story",
      gradient: "from-indigo-400 via-purple-500 to-pink-500",
      icon: "🎬",
      path: "/gallery-3",
    },
    {
      id: 4,
      title: "Carousel of Love",
      description: "A smooth rotating carousel showcasing your memories",
      gradient: "from-rose-500 via-pink-500 to-purple-500",
      icon: "🎠",
      path: "/gallery-4",
    },
    {
      id: 5,
      title: "Film Strip",
      description: "Your memories presented like a classic movie reel",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      icon: "🎞️",
      path: "/gallery-5",
    },
    {
      id: 6,
      title: "Star Constellation",
      description: "Photos arranged like stars forming your love constellation",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      icon: "⭐",
      path: "/gallery-6",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: (i * 5) % 100,
        delay: (i * 0.25) % 5,
        duration: 10 + (i % 10),
        size: 10 + (i % 20),
      })),
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 overflow-hidden relative">
      {/* Floating Hearts Background */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300 pointer-events-none select-none"
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size,
            bottom: -50,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤
        </motion.div>
      ))}

      {/* Header */}
      <motion.header
        className="text-center py-16 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="inline-block"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            Valentine Templates
          </h1>
        </motion.div>
        <motion.p
          className="mt-4 text-xl text-pink-700 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Choose your perfect way to say "I Love You" 💕
        </motion.p>
      </motion.header>

      {/* Postcards Section */}
      <section className="px-6 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-8 flex items-center gap-3">
            <span className="animate-heartbeat text-4xl">💌</span>
            Love Letters & Postcards
          </h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {postcards.map((card) => (
              <motion.div key={card.id} variants={cardVariants}>
                <Link to={card.path}>
                  <motion.div
                    className={`relative rounded-3xl p-8 bg-gradient-to-br ${card.gradient} cursor-pointer overflow-hidden group`}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: -5,
                      boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ minHeight: 280 }}
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      animate={{ translateX: ["100%", "-100%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />

                    {/* Card Content */}
                    <div className="relative z-10">
                      <motion.span
                        className="text-6xl block mb-4"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        {card.icon}
                      </motion.span>
                      <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {card.description}
                      </p>

                      <motion.div
                        className="mt-6 flex items-center gap-2 text-white font-medium"
                        whileHover={{ x: 10 }}
                      >
                        <span>View Template</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-8 flex items-center gap-3">
            <span className="animate-heartbeat text-4xl">📷</span>
            Photo Galleries
          </h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {galleries.map((card) => (
              <motion.div key={card.id} variants={cardVariants}>
                <Link to={card.path}>
                  <motion.div
                    className={`relative rounded-3xl p-8 bg-gradient-to-br ${card.gradient} cursor-pointer overflow-hidden group`}
                    whileHover={{
                      scale: 1.05,
                      rotateY: -5,
                      rotateX: 5,
                      boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ minHeight: 280 }}
                  >
                    {/* Sparkle Effects */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          top: `${20 + i * 15}%`,
                          left: `${10 + i * 20}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                        }}
                      />
                    ))}

                    {/* Card Content */}
                    <div className="relative z-10">
                      <motion.span
                        className="text-6xl block mb-4"
                        animate={{
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      >
                        {card.icon}
                      </motion.span>
                      <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {card.description}
                      </p>

                      <motion.div
                        className="mt-6 flex items-center gap-2 text-white font-medium"
                        whileHover={{ x: 10 }}
                      >
                        <span>View Gallery</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="text-center py-8 text-pink-600 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="flex items-center justify-center gap-2">
          Made with <span className="animate-heartbeat text-red-500">❤️</span>{" "}
          for your special someone
        </p>
      </motion.footer>
    </div>
  );
};

export default Showcase;
