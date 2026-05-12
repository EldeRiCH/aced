// Custom line-style icons for Aced onboarding. Stroke = currentColor.
const Icon = {
  GCSE: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M7 9.5v4c0 1.7 2.2 3 5 3s5-1.3 5-3v-4" />
      <path d="M21 7v6" />
    </svg>
  ),
  ALevel: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 19V5a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
      <path d="M16 3v4h4" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  ),
  University: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 10v8" />
      <path d="M20 10v8" />
      <path d="M2 10l10-5 10 5" />
      <path d="M6 12v5c0 1 2.5 2 6 2s6-1 6-2v-5" />
    </svg>
  ),
  Other: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  ),
  Morning: (p) => (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 6v3" />
      <path d="M6 14H3" />
      <path d="M22 14h3" />
      <path d="M7.5 7.5l2 2" />
      <path d="M18.5 7.5l-2 2" />
      <circle cx="14" cy="14" r="4" />
      <path d="M3 19h22" />
      <path d="M5 22h18" />
    </svg>
  ),
  NightOwl: (p) => (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 17.5A9 9 0 0110.5 6c0-.7.1-1.4.2-2A9 9 0 1022 17.5z" />
      <circle cx="19.5" cy="6.5" r="0.6" fill="currentColor" />
      <circle cx="16" cy="10" r="0.5" fill="currentColor" />
      <circle cx="21" cy="11" r="0.5" fill="currentColor" />
    </svg>
  ),
  Flexible: (p) => (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 3l-9 14h7l-2 8 9-14h-7l2-8z" />
    </svg>
  ),
  Plus: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  ),
  Cal: (p) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="3.5" width="12" height="11" rx="2" />
      <path d="M2 7h12M5.5 2v3M10.5 2v3" />
    </svg>
  ),
  ChevL: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 4l-4 4 4 4" /></svg>
  ),
  ChevR: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 4l4 4-4 4" /></svg>
  ),
  Arrow: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 9h10M10 5l4 4-4 4" />
    </svg>
  ),
  Share: (p) => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 2v9" />
      <path d="M5 5l3-3 3 3" />
      <path d="M3 9v3a2 2 0 002 2h6a2 2 0 002-2V9" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" {...p}>
      <path d="M7 0l1.5 4.5L13 6 8.5 7.5 7 12 5.5 7.5 1 6l4.5-1.5L7 0z" />
    </svg>
  ),
  Close: (p) => (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M3 3l6 6M9 3l-6 6" />
    </svg>
  ),
};

window.Icon = Icon;
