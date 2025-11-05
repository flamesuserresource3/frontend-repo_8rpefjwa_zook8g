import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Lock } from 'lucide-react';

const FloatingIcon = ({ Icon, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: [12, -6, 12] }}
    transition={{ duration: 4.8, repeat: Infinity, delay, ease: 'easeInOut' }}
    className={`pointer-events-none absolute ${className}`}
  >
    <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-lg">
      <Icon className="h-5 w-5 text-white/90" />
    </div>
  </motion.div>
);

export default function Hero3D() {
  return (
    <section className="relative h-[48vh] md:h-[60vh] w-full overflow-hidden bg-[#0B1020]">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient glow overlays - non-blocking */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-10 h-64 w-64 bg-gradient-to-br from-indigo-500/30 via-fuchsia-400/20 to-cyan-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-10 h-72 w-72 bg-gradient-to-tr from-sky-500/20 via-purple-400/20 to-pink-400/20 blur-3xl rounded-full" />
      </div>

      {/* Headline copy */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm"
          >
            Legal Document Summarizer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 md:mt-4 text-sm md:text-lg text-slate-200 max-w-2xl"
          >
            Chat with your contracts, NDAs, and filings. Upload documents and get clear, cite-ready summaries in seconds.
          </motion.p>
        </div>
      </div>

      {/* Floating icons for trust & magic */}
      <FloatingIcon Icon={Shield} delay={0.2} className="top-10 left-6" />
      <FloatingIcon Icon={Lock} delay={0.6} className="bottom-10 right-8" />
      <FloatingIcon Icon={Sparkles} delay={0.4} className="top-20 right-16" />
    </section>
  );
}
