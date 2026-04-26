import { Link } from 'react-router-dom';

export default function EmptyState({ icon = '🍽️', title, message, action }) {
  return (
    <div className="flex flex-col items-center text-center py-20 gap-4 animate-fade-up">
      <div className="text-6xl">{icon}</div>
      <h3 className="font-display text-2xl text-gray-100">{title}</h3>
      <p className="text-gray-400 max-w-sm">{message}</p>
      {action && (
        <Link
          to={action.to}
          className="mt-2 inline-flex items-center gap-2 bg-accent-gradient text-white
                     px-7 py-3 rounded-full text-sm font-semibold hover:shadow-glow
                     hover:-translate-y-0.5 transition-all duration-200"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
