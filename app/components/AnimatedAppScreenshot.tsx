'use client';

import { useEffect, useState } from 'react';

interface AnimatedAppScreenshotProps {
  src: string;
  alt: string;
  className?: string;
  scrollSpeed?: number; // Controls the parallax effect intensity
}

export default function AnimatedAppScreenshot({ 
  src, 
  alt, 
  className,
  scrollSpeed = 0.3 // Default value
}: AnimatedAppScreenshotProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transform based on scroll position
  // The image moves up as user scrolls down, and down as user scrolls up
  const transformY = -scrollY * scrollSpeed;

  return (
    <div className="relative w-full max-w-md z-20">
      <img 
        src={src}
        alt={alt}
        className={className}
        style={{
          transform: `translateY(${transformY}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
    </div>
  );
}