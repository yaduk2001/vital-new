'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = '', spotlight = false, spotlightColor = "rgba(255, 255, 255, 0.1)" }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);

        if (spotlight) {
            setPosition({ x: mouseX, y: mouseY });
            setOpacity(1);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        if (spotlight) {
            setOpacity(0);
        }
    };

    const handleMouseEnter = () => {
        if (spotlight) {
            setOpacity(1);
        }
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className={`relative transition-all duration-200 ease-linear ${className}`}
        >
            <div style={{ transform: "translateZ(30px)" }} className="h-full relative z-10">
                {children}
            </div>

            {spotlight && (
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                    }}
                />
            )}
        </motion.div>
    );
};

export default TiltCard;
