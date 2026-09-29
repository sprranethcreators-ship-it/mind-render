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
  layer: number; // 0 = distant dust, 1 = mid orbital, 2 = foreground neural
}

interface OrbitalRing {
  radiusX: number;
  radiusY: number;
  rotation: number;
  speed: number;
  color: string;
  alpha: number;
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

    // Palette: Atmospheric Violet/Indigo & Warm Gold points
    const nodeColors = [
      'rgba(129, 140, 248, ', // Indigo luminous
      'rgba(167, 139, 250, ', // Violet
      'rgba(212, 175, 55, ',  // Warm Gold energy
      'rgba(243, 229, 171, ', // Soft Amber
    ];

    // Build layered particles
    const particleCount = isMobile ? 38 : Math.min(80, Math.floor((width * height) / 14000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random() < 0.35 ? 0 : Math.random() < 0.7 ? 1 : 2;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = layer === 0 ? 0.25 : layer === 1 ? 0.5 : 0.8;
      const baseRadius = layer === 0 ? 1 : layer === 1 ? 1.8 : 2.6;

      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * (layer === 0 ? 0.2 : 0.35),
        vy: (Math.random() - 0.5) * (layer === 0 ? 0.2 : 0.35),
        radius: baseRadius,
        baseRadius,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulsePhase: Math.random() * Math.PI * 2,
        layer
      });
    }

    // Subtle orbital paths around the central mind field
    const orbitalRings: OrbitalRing[] = [
      { radiusX: Math.min(width * 0.32, 280), radiusY: Math.min(width * 0.16, 140), rotation: -0.25, speed: 0.0008, color: 'rgba(99, 102, 241, ', alpha: 0.14 },
      { radiusX: Math.min(width * 0.42, 390), radiusY: Math.min(width * 0.22, 190), rotation: 0.35, speed: -0.0006, color: 'rgba(212, 175, 55, ', alpha: 0.1 },
      { radiusX: Math.min(width * 0.22, 190), radiusY: Math.min(width * 0.12, 100), rotation: 0.1, speed: 0.0012, color: 'rgba(167, 139, 250, ', alpha: 0.12 },
    ];

    // Mouse coordinates with smooth lerp physics
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180 };

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
      orbitalRings[0].radiusX = Math.min(width * 0.32, 280);
      orbitalRings[0].radiusY = Math.min(width * 0.16, 140);
      orbitalRings[1].radiusX = Math.min(width * 0.42, 390);
      orbitalRings[1].radiusY = Math.min(width * 0.22, 190);
    };

    window.addEventListener('resize', handleResize);

    let tick = 0;

    // Render Loop
    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.targetX !== -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      const centerX = width * 0.5 + (mouse.x !== -1000 ? (mouse.x - width * 0.5) * 0.04 : 0);
      const centerY = height * 0.44 + (mouse.y !== -1000 ? (mouse.y - height * 0.44) * 0.04 : 0);

      // 1. LAYER: Atmospheric Deep Glow & Soft Radial Vignette
      const corePulse = 0.95 + 0.05 * Math.sin(tick * 0.02);

      // Deep cosmic center glow
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.min(width * 0.55, 480) * corePulse
      );
      radialGlow.addColorStop(0, 'rgba(99, 102, 241, 0.18)'); // Soft indigo core
      radialGlow.addColorStop(0.35, 'rgba(139, 92, 246, 0.08)'); // Violet aura
      radialGlow.addColorStop(0.65, 'rgba(212, 175, 55, 0.03)'); // Warm gold shimmer
      radialGlow.addColorStop(1, 'rgba(6, 7, 9, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. LAYER: Subtle Orbital Paths (Geometry of Thought)
      orbitalRings.forEach((ring) => {
        ring.rotation += ring.speed;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ring.rotation);

        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}${ring.alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.stroke();

        // Single orbiting energy point along the path
        const angle = tick * (ring.speed * 8);
        const px = Math.cos(angle) * ring.radiusX;
        const py = Math.sin(angle) * ring.radiusY;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#D4AF37';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      });

      // 3. LAYER: Neural Connections (Synaptic Filaments)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isMobile ? 95 : 135;

          if (dist < maxDist) {
            const filamentAlpha = (1 - dist / maxDist) * 0.15 * ((p1.alpha + p2.alpha) / 2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${filamentAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // 4. LAYER: Particle Nodes with Halo & Pulse
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap gently
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Mouse proximity reaction: gentle float deflection
        if (mouse.x !== -1000) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const force = (1 - mdist / mouse.radius) * 1.8;
            p.x -= (mdx / mdist) * force;
            p.y -= (mdy / mdist) * force;
          }
        }

        // Pulse
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(p.pulsePhase));

        // Draw soft glow aura for foreground particles
        if (p.layer === 2) {
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
          halo.addColorStop(0, `${p.color}${currentAlpha * 0.6})`);
          halo.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
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
