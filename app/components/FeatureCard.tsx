'use client';
import React, { useState } from 'react';

export default function FeatureCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: "Discover what works for you",
      subtitle: "Simple questions. Smart answers.",
      description: "We analyze your skin, hair, and style to unlock your best look. \n No trends. No fluff. Just guidance grounded in data, design, and dermatology."
    },
    {
      title: "Get the right products",
      subtitle: "We don't sell products, we explain them",
      description: "We recommend what will actually work for you— and break down why."
    },
    {
      title: "Build a routine and level up",
      subtitle: "Play the game, see the results in the mirror",
      description: "Earn streaks, track progress, and turn grooming into a game you'll actually play."   
    },
  ];

  return (
    <div id="feature-cards-container" className="mt-16 flex gap-8 justify-center flex-wrap lg:flex-nowrap">
      {features.map((feature, index) => (
        <div
          key={index}
          id={`card-wrapper-${index}`}
          className="flex-1 max-w-sm bg-black border border-white rounded-3xl z-0"
          style={{ position: 'relative' }}
        >
          <div
            id={`card-interactive-${index}`}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ zIndex: 1 }}
          >
            {/* Container rectangle for screenshot */}
            <div 
              id={`screenshot-container-${index}`}
              className="relative rounded-t-3xl h-96 flex items-center justify-center" 
              style={{ zIndex: 1, backgroundColor: '#250b46ff' }}
            >
              {/* Screenshot that moves up on hover - phone aspect ratio */}
              <div 
                id={`screenshot-phone-${index}`}
                className="absolute w-[90%] h-auto rounded-2xl overflow-hidden"
                style={{
                  transform: hoveredIndex === index ? 'translateY(-80px) scale(1.1)' : 'translateY(60px) scale(1)',
                  zIndex: 5,
                  transition: 'transform 500ms ease-out'
                }}
              >
                <img 
                  src={`/screenshot${index + 1}.png`}
                  alt={`${feature.title} screenshot`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text content */}
            <div id={`text-background-${index}`} className="bg-black rounded-3xl" style={{ zIndex: 10, position: 'relative' }}>
            <div id={`text-content-${index}`} className="space-y-2 p-6 text-left" style={{ position: 'relative', zIndex: 10 }}>
              <h3 
                id={`title-${index}`}
                className="text-2xl font-bold text-white"
                style={{
                  color: hoveredIndex === index ? '#3b82f6' : '#ffffff',
                  transition: 'color 300ms ease-out'
                }}
              >
                {feature.title}
              </h3>
              <p id={`subtitle-${index}`} className="text-gray-300 italic font-semibold leading-relaxed">
                {feature.subtitle}
              </p>
              <p id={`description-${index}`} className="text-gray-400 whitespace-pre-line leading-relaxed">
                {feature.description}
              </p>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}