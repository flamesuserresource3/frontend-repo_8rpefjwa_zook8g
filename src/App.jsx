import React, { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

import Hero3D from './components/Hero3D';
import UploadTray from './components/UploadTray';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';

export default function App() {
  const [messages, setMessages] = useState([
    { id: 'm1', role: 'assistant', content: 'Welcome! Upload a document or ask anything about your legal text.' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleFiles = useCallback((files) => {
    if (!files?.length) return;
    const file = files[0];
    // Simulate extraction & summary
    const intro = {
      id: crypto.randomUUID(),
      role: 'user',
      content: `Uploaded: ${file.name}`,
    };
    setMessages((prev) => [...prev, intro]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Here is a concise, plain‑English summary highlighting parties, obligations, key dates, and termination clauses. Ask for deeper analysis or specific clause breakdowns.',
        },
      ]);
      setIsTyping(false);
    }, 1100);
  }, []);

  const onSend = useCallback((text) => {
    const user = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages((prev) => [...prev, user]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Summary insight: The agreement grants non‑exclusive rights, includes a 30‑day notice termination, and requires quarterly reporting. Liability is capped to fees paid. Need a clause‑by‑clause view?',
        },
      ]);
      setIsTyping(false);
    }, 900);
  }, []);

  const footerPeople = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero3D />

      <main className="mx-auto -mt-12 w-full max-w-5xl space-y-5 px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-5"
        >
          <div className="md:col-span-2">
            <UploadTray onFiles={handleFiles} />
          </div>

          <div className="md:col-span-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 shadow-lg backdrop-blur">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-800/60 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
                <Rocket size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">Assistant</p>
                <p className="text-xs text-slate-400">Summaries are informational, not legal advice</p>
              </div>
            </div>

            <div className="max-h-[42vh] overflow-y-auto pr-1">
              <ChatMessages messages={messages} isTyping={isTyping} />
            </div>

            <div className="mt-4">
              <ChatInput onSend={onSend} disabled={isTyping} />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Roaming village footer */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl items-center">
          {footerPeople.map((i) => (
            <motion.div
              key={i}
              initial={{ x: -40 * i }}
              animate={{ x: [ -40 * i, 1200 ] }}
              transition={{ duration: 18 + i, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
              className="mr-6 h-2 w-8 rounded-full bg-slate-600/50 shadow-[0_0_20px_rgba(99,102,241,0.35)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
