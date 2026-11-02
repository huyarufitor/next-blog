/** Spec sheets moving through propose, design, verify, and archive. */
export function SpecLifecycle() {
  return (
    <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="675" fill="#f3ecdf" />
      <g stroke="#d9cbb6" strokeWidth="2">
        <path d="M0 168H1200M0 336H1200M0 504H1200" />
        <path d="M240 0V675M480 0V675M720 0V675M960 0V675" />
      </g>
      <g fill="#e7d7bc" stroke="#211e1a" strokeWidth="4">
        <rect x="118" y="168" width="250" height="318" rx="8" />
        <rect x="168" y="128" width="250" height="318" rx="8" fill="#f7f1e6" />
      </g>
      <g stroke="#211e1a" strokeWidth="8" strokeLinecap="round">
        <path d="M214 196H430M214 236H390M214 276H418" />
        <path d="M214 340H360" stroke="#e34d2f" />
      </g>
      <circle cx="760" cy="188" r="28" fill="#211e1a" />
      <circle cx="760" cy="318" r="28" fill="#e34d2f" />
      <circle cx="760" cy="448" r="28" fill="none" stroke="#211e1a" strokeWidth="8" />
      <path d="M760 216V290M760 346V420" stroke="#211e1a" strokeWidth="6" />
      <path d="M918 286H1088" stroke="#211e1a" strokeWidth="10" strokeLinecap="round" />
      <path d="M948 246L1002 312L1104 188" fill="none" stroke="#e34d2f" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="96" y="560" width="168" height="14" fill="#e34d2f" />
      <rect x="96" y="588" width="72" height="14" fill="#211e1a" />
    </svg>
  );
}
