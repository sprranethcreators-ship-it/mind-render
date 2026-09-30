import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  layer: number; // 0 = subtle background point, 1 = mid editorial line, 2 = foreground node
}

interface OrbitalRing {
  radiusX: number;
  radiusY: number;
  rotation: number;
  speed: number;
  color: string;
  alpha: number;
  dash: number[];
}

export const NeuralConsciousnessCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isMobile = width < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Vibrant Luxury Jewel-Tone Palette: Honey Gold, Royal Indigo, Violet Amethyst, Rose Quartz, Emerald, & Sky Azure
    const nodeColors = [
      'rgba(245, 158, 11, ',  // Honey Gold #F59E0B
      'rgba(79, 70, 229, ',   // Royal Indigo #4F46E5
      'rgba(139, 92, 246, ',  // Violet Amethyst #8B5CF6
      'rgba(244, 63, 94, ',   // Rose Quartz #F43F5E
      'rgba(16, 185, 129, ',  // Emerald Mind #10B981
      'rgba(2, 132, 199, ',   // Sky Azure #0284C7
    ];

    // Build layered particles with scientific illustration density
    const particleCount = isMobile ? 36 : Math.min(76, Math.floor((width * height) / 14000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random() < 0.35 ? 0 : Math.random() < 0.7 ? 1 : 2;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = layer === 0 ? 0.25 : layer === 1 ? 0.45 : 0.75;
      const baseRadius = layer === 0 ? 1.2 : layer === 1 ? 1.8 : 2.5;

      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * (layer === 0 ? 0.18 : 0.28),
        vy: (Math.random() - 0.5) * (layer === 0 ? 0.18 : 0.28),
        radius: baseRadius,
        baseRadius,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: 0.014 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        layer
      });
    }

    // Large translucent circular orbital structures with jewel satellite nodes
    const orbitalRings: (OrbitalRing & { satelliteColor: string })[] = [
      { radiusX: Math.min(width * 0.34, 320), radiusY: Math.min(width * 0.18, 160), rotation: -0.22, speed: 0.0006, color: 'rgba(79, 70, 229, ', alpha: 0.24, dash: [4, 14], satelliteColor: '#6366F1' },
      { radiusX: Math.min(width * 0.46, 430), radiusY: Math.min(width * 0.24, 220), rotation: 0.3, speed: -0.0005, color: 'rgba(245, 158, 11, ', alpha: 0.28, dash: [3, 16], satelliteColor: '#F59E0B' },
      { radiusX: Math.min(width * 0.22, 210), radiusY: Math.min(width * 0.12, 110), rotation: 0.12, speed: 0.0009, color: 'rgba(244, 63, 94, ', alpha: 0.22, dash: [2, 10], satelliteColor: '#F43F5E' },
      { radiusX: Math.min(width * 0.56, 520), radiusY: Math.min(width * 0.28, 260), rotation: -0.45, speed: 0.0004, color: 'rgba(2, 132, 199, ', alpha: 0.2, dash: [6, 20], satelliteColor: '#0EA5E9' },
    ];

    // Smooth subtle mouse parallax
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 190 };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      orbitalRings[0].radiusX = Math.min(width * 0.34, 320);
      orbitalRings[0].radiusY = Math.min(width * 0.18, 160);
      orbitalRings[1].radiusX = Math.min(width * 0.46, 430);
      orbitalRings[1].radiusY = Math.min(width * 0.24, 220);
      orbitalRings[2].radiusX = Math.min(width * 0.22, 210);
      orbitalRings[2].radiusY = Math.min(width * 0.12, 110);
      orbitalRings[3].radiusX = Math.min(width * 0.56, 520);
      orbitalRings[3].radiusY = Math.min(width * 0.28, 260);
    };

    window.addEventListener('resize', handleResize);

    let tick = 0;

    // Render Loop
    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.targetX !== -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      const centerX = width * 0.5 + (mouse.x !== -1000 ? (mouse.x - width * 0.5) * 0.03 : 0);
      const centerY = height * 0.44 + (mouse.y !== -1000 ? (mouse.y - height * 0.44) * 0.03 : 0);

      // 1. LAYER: Multi-Prismatic Radiant Aurora Glow (Light Mode)
      const corePulse = 0.96 + 0.04 * Math.sin(tick * 0.015);
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.min(width * 0.68, 580) * corePulse
      );
      radialGlow.addColorStop(0, 'rgba(254, 243, 199, 0.45)'); // Warm Honey Gold Core
      radialGlow.addColorStop(0.3, 'rgba(238, 242, 255, 0.35)'); // Celestial Indigo Mist
      radialGlow.addColorStop(0.6, 'rgba(255, 241, 242, 0.22)'); // Rose Quartz Shimmer
      radialGlow.addColorStop(1, 'rgba(250, 248, 245, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. LAYER: Translucent Circular Orbital Structures (Jewel Satellites)
      orbitalRings.forEach((ring) => {
        ring.rotation += ring.speed;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ring.rotation);

        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}${ring.alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(ring.dash);
        ctx.stroke();

        // Orbiting jewel satellite point along each orbital ring
        const angle = tick * (ring.speed * 6);
        const px = Math.cos(angle) * ring.radiusX;
        const py = Math.sin(angle) * ring.radiusY;

        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = ring.satelliteColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = ring.satelliteColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      });

      // 3. LAYER: Fine Neural Connections (Synaptic Filaments)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isMobile ? 95 : 130;

          if (dist < maxDist) {
            const filamentAlpha = (1 - dist / maxDist) * 0.22 * ((p1.alpha + p2.alpha) / 2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${filamentAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // 4. LAYER: Particle Nodes with Soft Diffuse Halo
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move gently
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Mouse proximity: subtle deflection
        if (mouse.x !== -1000) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const force = (1 - mdist / mouse.radius) * 1.2;
            p.x -= (mdx / mdist) * force;
            p.y -= (mdy / mdist) * force;
          }
        }

        // Pulse
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha * (0.8 + 0.2 * Math.sin(p.pulsePhase));

        // Soft halo for foreground nodes
        if (p.layer === 2) {
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
          halo.addColorStop(0, `${p.color}${currentAlpha * 0.35})`);
          halo.addColorStop(1, 'rgba(250, 248, 243, 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
};
