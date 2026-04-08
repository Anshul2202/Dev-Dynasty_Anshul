function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
      {children}
    </span>
  );
}

export default SectionBadge;
