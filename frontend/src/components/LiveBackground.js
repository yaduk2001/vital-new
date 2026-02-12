'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const LiveBackground = ({ src, videoSrc, opacity = 0.4, blur = "blur-sm", className = "" }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{
                    scale: [1.1, 1.2, 1.1],
                    opacity: opacity,
                }}
                transition={{
                    scale: {
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    },
                    opacity: { duration: 1.5 }
                }}
                className="relative w-full h-full"
            >
                {videoSrc ? (
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full h-full object-cover ${blur}`}
                    />
                ) : (
                    <Image
                        src={src}
                        alt="Live Background"
                        fill
                        priority
                        className={`object-cover ${blur}`}
                        quality={90}
                    />
                )}

                {/* Overlay gradient to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/50 to-[#0A0A0A]/90" />
            </motion.div>

            {/* Optional: Subtle particles or noise could go here */}
        </div>
    );
};

export default LiveBackground;
