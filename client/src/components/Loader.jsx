export default function Loader({ count = 8 }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-white/10">
          <div className="skeleton-anim h-52 w-full" />
          <div className="p-4 flex flex-col gap-3">
            <div className="skeleton-anim h-5 w-4/5 rounded-lg" />
            <div className="skeleton-anim h-3.5 w-1/2 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
