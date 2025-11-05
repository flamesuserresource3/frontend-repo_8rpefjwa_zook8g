import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import TypingIndicator from './TypingIndicator';

const bubbleVariants = {
  initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
};

export default function ChatMessages({ messages, isTyping }) {
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {messages.map((m) => (
          <motion.div
            key={m.id}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
                <Bot size={16} />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-sky-600 to-indigo-600 text-white'
                  : 'bg-white text-slate-900 border border-slate-200'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>

            {m.role === 'user' && (
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 shadow">
                <User size={16} />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {isTyping && (
        <div className="flex items-start gap-2">
          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
            <Bot size={16} />
          </div>
          <TypingIndicator />
        </div>
      )}
    </div>
  );
}
