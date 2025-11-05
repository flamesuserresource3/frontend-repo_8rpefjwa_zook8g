import React from 'react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 shadow-sm">
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-slate-700"
        animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-slate-700"
        animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
      />
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-slate-700"
        animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
    </div>
  );
}
