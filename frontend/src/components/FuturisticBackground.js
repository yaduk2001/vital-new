'use client';

import { useEffect, useRef } from 'react';

const FuturisticBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 100; // Increased for richer effect

    // Mouse tracking
    const mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
        // Random initial position
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5; // Slightly larger variety
        this.color = `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.2})`;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      update() {
        // Mouse interaction
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;

          const maxDistance = 200;
          let force = (maxDistance - distance) / maxDistance;

          // Repel from mouse
          if (distance < maxDistance) {
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            this.vx -= directionX * 0.05;
            this.vy -= directionY * 0.05;
          }
        }

        // Basic movement
        this.x += this.vx;
        this.y += this.vy;

        // Friction to return to normal speed
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Add small random movement to keep them alive
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;

        // Boundary checks
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Create trail effect
      ctx.fillStyle = 'rgba(5, 10, 20, 0.2)'; // Darker trail for depth
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connecting lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        // Connect to mouse
        if (mouse.x != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(20, 110, 233, ${1 - dist / 150})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) { // Shorter connection distance for cleaner look
            ctx.strokeStyle = `rgba(20, 110, 233, ${0.2 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep Space Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0B1121] to-[#020617] z-0" />

      {/* Animated Canvas Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Aurora Effects - Moving */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen animate-float opacity-30" />

      {/* Grid Overlay for Tech feel */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      />
    </div>
  );
};

export default FuturisticBackground;