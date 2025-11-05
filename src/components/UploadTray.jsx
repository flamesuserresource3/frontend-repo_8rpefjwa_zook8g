import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';

export default function UploadTray({ onFiles }) {
  const dropRef = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const [lastFileName, setLastFileName] = useState('');

  const handleFiles = useCallback(
    (files) => {
      const list = Array.from(files);
      if (list.length > 0) setLastFileName(list[0].name);
      onFiles?.(list);
    },
    [onFiles]
  );

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      ref={dropRef}
    >
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${isOver ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
          <Upload />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">Drag & drop legal documents here</p>
          <p className="text-xs text-slate-500">PDF, DOCX, TXT up to 25MB</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-br from-sky-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:brightness-110 active:brightness-95">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            accept=".pdf,.doc,.docx,.txt,.rtf"
          />
          <Upload size={16} />
          Browse files
        </label>

        {/* Paper sliding into a digital tray */}
        {lastFileName && (
          <div className="mt-2 w-full max-w-md">
            <div className="relative h-16">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="absolute left-1/2 z-10 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow"
              >
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText size={16} />
                  <span className="text-xs font-medium truncate max-w-[220px]">{lastFileName}</span>
                </div>
              </motion.div>
              <div className="absolute inset-x-6 bottom-0 h-6 rounded-b-2xl bg-slate-200/70" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
