export function ArrowIcon({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <svg className={`arrow-icon arrow-${direction}`} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg className="check-icon" viewBox="0 0 18 18" aria-hidden="true">
      <path d="m4 9.2 3.1 3L14 5.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
