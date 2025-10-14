'use client';
import React, { useRef } from 'react';
import Aurora from './components/Aurora';
import CardNav from './components/CardNav';
import GradualBlur from './components/GradualBlur';
import AnimatedAppScreenshot from './components/AnimatedAppScreenshot';
import FeatureCards from './components/FeatureCard';
import GradientText from './components/GradientText';
import GlassCardNav from './components/GlassCardNav';
import JoinWaitlist from './components/JoinWaitlist';

export default function Home() {
  const joinRef = useRef<HTMLDivElement | null>(null);

  const scrollToJoin = () => {
    if (joinRef.current) {
      joinRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Nav */}
      <CardNav
        logo="/logo.png"
        logoAlt="Glow Logo"
        baseColor="transparent"
        buttonBgColor="rgba(255, 255, 255, 0.2)"
        buttonTextColor="#fff"
      />
      
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#4A148C", "#00C853", "#1976D2"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4">
        <div id="text-div" className="max-w-full w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 text-center lg:text-left lg:pl-48">
            <div>
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={10}
                showBorder={false}
                className="text-6xl  font-bold leading-tight"
              >
                Glow U
              </GradientText>

              <h1 className="text-9xl lg:text-7xl font-bold text-white leading-tight" style={{ fontSize: '8rem', lineHeight: '1' }}>
                Look your best.
              </h1>

              <p className="pt-6 text-xl lg:text-2xl text-white/70 max-w-lg">
                Simple questions. Smart answers.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToJoin}
              className="text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                background: 'linear-gradient(to right, #340f61ff, #340f61ff)',
                transition: 'all 0.3s ease'
              }}
              aria-label="Join the waitlist"
            >
              Join the wait list
            </button>
          </div>

          {/* Right side - App screenshots */}
          <div className="flex justify-center lg:justify-end relative lg:pr-8">
            <div className="relative">
              <AnimatedAppScreenshot
                src="/mockup-be.png"
                alt="Glow U App Screenshot 2"
                className="w-11/12 h-auto object-contain drop-shadow-xl absolute top-12 right-92 -ml-8"
                scrollSpeed={0.6}
              />
              <AnimatedAppScreenshot
                src="/mockup-plan.png"
                alt="Glow U App Screenshot"
                className="w-full h-auto object-contain drop-shadow-2xl"
                scrollSpeed={0.4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Science-backed Section */}
      <section className="relative z-5 py-20 px-8 -mt-40 border-t border-slate-900" style={{ background: '#07020cff' }}>
        <div className="max-w-7xl w-full mx-auto text-center pt-6">
          <div className="flex flex-wrap items-baseline justify-center gap-6">
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">Science-backed.</h2>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">Personalized.</h2>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#4A148C", "#4079ff", "#40ffaa", "#4A148C"]}
              animationSpeed={10}
              showBorder={false}
              className="text-4xl lg:text-6xl font-bold leading-tight"
            >
              Gamified.
            </GradientText>
          </div>
          <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">
            Our approach is rooted in scientific research, ensuring that every feature is designed to enhance learning outcomes.
          </p>
          <FeatureCards />
        </div>
      </section>

      {/* Target section: wrap JoinWaitlist with a ref.
          scroll-mt-* ensures correct final position if you have a sticky nav. */}
      <div ref={joinRef} id="join-waitlist" className="scroll-mt-28">
        <JoinWaitlist />
      </div>

      {/* Gradual Blur Effect */}
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </main>
  );
}
