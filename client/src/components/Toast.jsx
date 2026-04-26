import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3
                     glass rounded-2xl px-5 py-3.5 text-sm shadow-card animate-slide-in
                     ${type === 'success' ? 'border-emerald-500/50' : 'border-red-500/50'}`}>
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span className="text-gray-200">{message}</span>
    </div>
  );
}
