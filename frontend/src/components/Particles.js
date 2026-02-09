'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Particles = ({ 
  count = 8, 
  color = "#00FFC2", 
  size = "w-1 h-1",
  position = "top-20 right-20",
  className = "",
  minDelay = 0,
  maxDelay = 3,
  duration = 3
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particleVariants = {
    animate: (custom) => ({
      y: [-10, -100],
      opacity: [1, 0],
      scale: [1, 0.5],
      transition: {
        duration: duration,
        repeat: Infinity,
        delay: custom.delay,
        ease: "linear"
      }
    })
  };

  // Use deterministic positioning based on index
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: (minDelay + (i * (maxDelay - minDelay)) / count),
    left: `${10 + (i * 12) % 80}px`,
    top: `${5 + (i * 8) % 40}px`
  }));

  // Don't render particles on server to prevent hydration mismatch
  if (!isClient) {
    return <div className={`absolute ${position} ${className}`} />;
  }

  return (
    <div className={`absolute ${position} ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          custom={{ delay: particle.delay }}
          variants={particleVariants}
          animate="animate"
          style={{ 
            left: particle.left,
            top: particle.top
          }}
          className={`absolute ${size} bg-[${color}] rounded-full`}
        />
      ))}
    </div>
  );
};

export default Particles; 