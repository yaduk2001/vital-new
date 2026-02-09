'use client';

import { motion } from 'framer-motion';

const TechIconsFloating = ({ 
  icons = [
    { icon: "🤖", delay: 0, duration: 4 },
    { icon: "⚡", delay: 1, duration: 5 },
    { icon: "🔮", delay: 2, duration: 6 },
    { icon: "🌐", delay: 0.5, duration: 4.5 },
    { icon: "💡", delay: 1.5, duration: 5.5 },
    { icon: "🚀", delay: 2.5, duration: 6.5 }
  ],
  className = "",
  opacity = "opacity-30",
  size = "text-2xl",
  containerClass = "absolute inset-0 pointer-events-none"
}) => {
  const floatingVariants = {
    animate: (custom) => ({
      y: [-5, 5, -5],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        delay: custom.delay,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className={`${containerClass} ${className}`}>
      {icons.map((iconData, index) => (
        <motion.div
          key={index}
          custom={iconData}
          variants={floatingVariants}
          animate="animate"
          style={{
            left: `${20 + (index * 15) % 60}%`,
            top: `${30 + (index * 20) % 40}%`
          }}
          className={`absolute ${size} ${opacity}`}
        >
          {iconData.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default TechIconsFloating; 