import React, { useState } from 'react';
import { Book } from '../../types';

interface Book3DCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Book3DCover: React.FC<Book3DCoverProps> = ({
  book,
  size = 'md',
  interactive = true
}) => {
  const [rotation, setRotation] = useState({ x: 3, y: -16 });

  // Dimensions based on size
  const dimensions = {
    sm: { width: 170, height: 245, spine: 24, fontSize: '1rem', authorSize: '0.68rem' },
    md: { width: 235, height: 345, spine: 32, fontSize: '1.25rem', authorSize: '0.78rem' },
    lg: { width: 290, height: 420, spine: 40, fontSize: '1.5rem', authorSize: '0.85rem' }
  }[size];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 16;
    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotation({ x: 3, y: -16 });
  };

  const { primary, secondary, accent, pattern } = book.coverGradient;

  return (
    <div
      className="book-3d-wrapper"
      style={{
        perspective: '1200px',
        display: 'inline-block',
        padding: 'clamp(8px, 2vw, 16px)',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="book-3d-stage"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
          maxWidth: '100%'
        }}
      >
        {/* Book Spine (3D depth on left) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${dimensions.spine}px`,
            height: '100%',
            transformOrigin: 'left',
            transform: 'rotateY(-90deg)',
            background: `linear-gradient(to bottom, ${primary}, ${secondary})`,
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <span
            style={{
              transform: 'rotate(-90deg)',
              whiteSpace: 'nowrap',
              color: '#CBD5E1',
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.85
            }}
          >
            {book.title} • {book.author}
          </span>
        </div>

        {/* Book Pages Block (3D depth on right side) */}
        <div
          style={{
            position: 'absolute',
            top: '3px',
            right: 0,
            width: `${dimensions.spine - 6}px`,
            height: `${dimensions.height - 6}px`,
            transformOrigin: 'right',
            transform: `rotateY(90deg) translateZ(0px)`,
            background: 'repeating-linear-gradient(to right, #F1F5F9 0px, #E2E8F0 1px, #CBD5E1 2px, #E2E8F0 3px)',
            boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.3)',
            borderRadius: '0 2px 2px 0'
          }}
        />

        {/* Book Front Cover Face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '2px 8px 8px 2px',
            background: `radial-gradient(circle at 75% 25%, ${primary} 0%, ${secondary} 85%)`,
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: `
              inset 4px 0 10px rgba(255, 255, 255, 0.08),
              inset -4px 0 14px rgba(0, 0, 0, 0.8),
              0 24px 50px -10px rgba(0, 0, 0, 0.85),
              0 0 40px -5px ${accent}25
            `,
            padding: size === 'sm' ? '18px 14px' : '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            zIndex: 2
          }}
        >
          {/* Subtle Crease along the spine */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '18px',
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(255,255,255,0.15) 50%, rgba(0,0,0,0.6))',
              zIndex: 10
            }}
          />

          {/* Foil Specular Sheen */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(115deg, rgba(255,255,255,0.16) 0%, transparent 40%, rgba(212,175,55,0.06) 70%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 8
            }}
          />

          {/* Top Brand Tag */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3 }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.62rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: 600
              }}
            >
              MIND RENDER CLASSIC
            </span>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: accent,
                boxShadow: `0 0 8px ${accent}`
              }}
            />
          </div>

          {/* Central Emblem Pattern */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto 0',
              position: 'relative',
              zIndex: 3
            }}
          >
            <div
              style={{
                width: size === 'sm' ? '70px' : '96px',
                height: size === 'sm' ? '70px' : '96px',
                borderRadius: '50%',
                border: `1.5px solid ${accent}60`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: `0 0 25px ${accent}25`
              }}
            >
              {/* Concentric Geometric Rings */}
              <div
                style={{
                  width: '74%',
                  height: '74%',
                  borderRadius: '50%',
                  border: `1px dashed ${accent}80`,
                  animation: 'spin 30s linear infinite'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: accent,
                  boxShadow: `0 0 12px ${accent}`
                }}
              />
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: dimensions.fontSize,
                fontWeight: 700,
                color: '#F8FAFC',
                textAlign: 'center',
                letterSpacing: '0.06em',
                lineHeight: 1.25,
                marginTop: '1.2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
              }}
            >
              {book.title}
            </h3>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: size === 'sm' ? '0.75rem' : '0.86rem',
                fontStyle: 'italic',
                color: '#CBD5E1',
                textAlign: 'center',
                lineHeight: 1.35,
                marginTop: '0.45rem',
                maxWidth: '90%',
                opacity: 0.9
              }}
            >
              {book.subtitle}
            </p>
          </div>

          {/* Bottom Author Stamp */}
          <div
            style={{
              borderTop: `1px solid rgba(255,255,255,0.12)`,
              paddingTop: '0.65rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 3
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: dimensions.authorSize,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#E2E8F0',
                fontWeight: 600
              }}
            >
              {book.author}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                color: accent,
                letterSpacing: '0.08em'
              }}
            >
              {book.category}
            </span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .book-3d-stage {
            transform: scale(0.85) !important;
            transform-origin: center center !important;
            margin: -20px 0 !important;
          }
        }
        @media (max-width: 360px) {
          .book-3d-stage {
            transform: scale(0.72) !important;
            transform-origin: center center !important;
            margin: -35px 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
