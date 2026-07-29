export type LandingIconName =
  | "inbox"
  | "agent"
  | "team"
  | "knowledge"
  | "automation"
  | "security"
  | "workspace"
  | "connect"
  | "activate";

export function LandingIcon({ name }: { name: LandingIconName }) {
  return (
    <svg
      className="landing-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.65"
    >
      {name === "inbox" ? (
        <>
          <path d="M4 5.5h16v13H4z" />
          <path d="M4 14h4l1.6 2h4.8l1.6-2h4" />
          <path d="M8 9h8" />
        </>
      ) : name === "agent" ? (
        <>
          <rect x="4" y="6" width="16" height="13" rx="3" />
          <path d="M9 3.5h6M12 3.5V6M8.5 11h.01M15.5 11h.01M9 15h6" />
        </>
      ) : name === "team" ? (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.8 19c.45-3.25 2.2-5 5.2-5s4.75 1.75 5.2 5" />
          <path d="M15.5 6.2a2.7 2.7 0 0 1 0 5.3M16 14c2.35.2 3.75 1.85 4.1 4.5" />
        </>
      ) : name === "knowledge" ? (
        <>
          <path d="M5 4.5h10.5L19 8v11.5H5z" />
          <path d="M15 4.5V8h4M8.5 12h7M8.5 15.5h7" />
        </>
      ) : name === "automation" ? (
        <>
          <circle cx="6" cy="6" r="2.25" />
          <circle cx="18" cy="12" r="2.25" />
          <circle cx="7" cy="18" r="2.25" />
          <path d="M8.2 6.8 15.8 11M15.8 13 9 17M5.7 8.3 6.7 15.7" />
        </>
      ) : name === "security" ? (
        <>
          <path d="M12 3.5 19 6v5.2c0 4.35-2.5 7.45-7 9.3-4.5-1.85-7-4.95-7-9.3V6z" />
          <path d="m9.1 12 1.9 1.9 4.2-4.2" />
        </>
      ) : name === "workspace" ? (
        <>
          <rect x="3.5" y="4" width="17" height="16" rx="3" />
          <path d="M3.5 9h17M8.5 9v11" />
        </>
      ) : name === "connect" ? (
        <>
          <path d="M8.5 8.5 5.7 5.7a3.1 3.1 0 0 0-4.4 4.4l3.6 3.6a3.1 3.1 0 0 0 4.4 0l1.5-1.5" />
          <path d="m15.5 15.5 2.8 2.8a3.1 3.1 0 0 0 4.4-4.4l-3.6-3.6a3.1 3.1 0 0 0-4.4 0l-1.5 1.5M8.6 15.4l6.8-6.8" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m10 8.5 5.5 3.5-5.5 3.5z" />
        </>
      )}
    </svg>
  );
}
