'use client';

import { useState } from 'react';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import GradientText from './GradientText';

export default function JoinWaitlist() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');

    const sanitizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(sanitizedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Use email as document ID to prevent duplicates
      const docRef = doc(db, 'waitlist', sanitizedEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setError('This email is already on the waitlist!');
        setIsSubmitting(false);
        return;
      }

      // Add to Firestore
      await setDoc(docRef, {
        email: sanitizedEmail,
        createdAt: new Date().toISOString(),
        notified: false,
      });

      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);

    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any); // Cast needed since we're calling button handler from keyboard
    }
  };

  return (
    <section className="relative z-5 py-32 px-8" style={{ background: '#07020cff' }}>
      <div className="max-w-4xl mx-auto text-center">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={10}
          showBorder={false}
          className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          Get early access
        </GradientText>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          Join the waitlist for a free week!
        </h2>
        
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Get your personalized plan, see what actually works for you, and help shape what we build next.
        </p>

        <div className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your email"
              disabled={isSubmitting || submitted}
              maxLength={254}
              autoComplete="email"
              className="flex-1 px-6 py-4 rounded-full text-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4079ff] focus:border-transparent transition-all disabled:opacity-50"
              aria-label="Email address"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'email-error' : undefined}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || submitted || !email}
              className="text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
              style={{
                background: submitted 
                  ? 'linear-gradient(to right, #00C853, #00C853)' 
                  : 'linear-gradient(to right, #340f61ff, #340f61ff)',
                transition: 'all 0.3s ease'
              }}
              aria-label="Join waitlist"
            >
              {submitted ? '✓ Joined!' : isSubmitting ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </div>
          
          {error && (
            <p id="email-error" className="mt-3 text-red-400 text-sm" role="alert">
              {error}
            </p>
          )}

          {submitted && (
            <p className="mt-3 text-green-400 text-sm" role="status">
              Successfully joined the waitlist! 🎉
            </p>
          )}
        </div>

        <p className="text-sm text-white/50 mb-12">
          (no spam, ever)
        </p>

        <div className="pt-8 border-t border-white/10">
          <p className="text-lg text-white/60">
            Built by guys who got tired of guessing.
          </p>
          <p className="text-lg text-white/60">
            Researched by experts who know better.
          </p>
        </div>
      </div>
    </section>
  );
}