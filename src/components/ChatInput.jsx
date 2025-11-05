import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSend?.(v);
    setValue('');
  };

  return (
    <div className="relative">
      {/* Glow ring */}
      <motion.div
        animate={{ opacity: focused ? 1 : 0 }}
        className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/40 via-fuchsia-500/30 to-cyan-400/40 blur"
      />

      <div className="relative rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
        <textarea
          rows={3}
          className="w-full resize-none rounded-lg bg-transparent p-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="Ask about clauses, terms, obligations, or request a summary..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles size={16} className="text-indigo-600" />
            AI Assistant ready
          </div>
          <button
            onClick={submit}
            disabled={disabled}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-sky-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 active:brightness-95 disabled:opacity-60"
          >
            <Send size={14} />
            {disabled ? 'Working...' : 'Summarize'}
          </button>
        </div>
      </div>
    </div>
  );
}
