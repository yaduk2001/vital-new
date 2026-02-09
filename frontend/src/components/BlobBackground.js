'use client';

import { motion } from 'framer-motion';

const BlobBackground = ({ 
  className = "", 
  color1 = "#00FFC2", 
  color2 = "#005533", 
  size = "w-72 h-72",
  position = "top-20 left-10",
  delay = 0,
  duration = 20,
  blur = "blur-3xl"
}) => {
  const blobVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }
    }
  };

  return (
    <motion.div
      variants={blobVariants}
      animate="animate"
      className={`absolute ${position} ${size} bg-gradient-to-r from-[${color1}]/20 to-[${color2}]/20 rounded-full ${blur} ${className}`}
    />
  );
};

export default BlobBackground; 