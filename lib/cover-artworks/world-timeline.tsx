/** A world map with a time scrubber: geography above, one selected year below. */
export function WorldTimeline() {
  return (
    <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="675" fill="#143844" />
      <g stroke="#2a6270" strokeWidth="2">
        <path d="M0 118H1200M0 236H1200M0 354H1200M0 472H1200" />
        <path d="M180 40V500M380 40V500M580 40V500M780 40V500M980 40V500" />
      </g>
      <g fill="#f3e2c4">
        <path d="M168 118c38-34 92-28 112 8 18 32 8 62-16 86-8 28-36 42-28 74 8 34-18 58-52 64-40 8-78-18-86-56-6-28 10-36 6-64-8-42 4-78 64-112z" />
        <path d="M214 292c28-6 48 16 52 42 6 38-4 78-28 104-22 24-52 28-64 8-14-22 2-48 8-76 4-22 8-70 32-78z" />
        <path d="M470 132c34-22 86-10 104 16 16 24 8 42-8 58-22 8-58 4-78-12-24-18-42-42-18-62z" />
        <path d="M612 118c86-28 210-6 248 42 28 36 18 62-16 88-46 18-92 8-132-4-28-28-18-48-36-70-16-20-48-42-64-56z" />
        <path d="M500 214c42-8 78 18 86 52 8 36-6 78-34 108-26 28-62 36-86 18-28-20-22-58-14-90 6-28 16-80 48-88z" />
        <path d="M868 332c28-10 58 2 66 24 8 20-4 36-22 44-24 10-52 2-60-16-8-16-4-42 16-52z" />
      </g>
      <circle cx="760" cy="186" r="46" fill="none" stroke="#e4573d" strokeWidth="8" />
      <circle cx="760" cy="186" r="12" fill="#e4573d" />
      <path d="M760 232V548" stroke="#e4573d" strokeWidth="4" strokeDasharray="10 12" />
      <rect x="96" y="548" width="1008" height="18" rx="9" fill="#f3e2c4" />
      <g fill="#143844">
        <rect x="148" y="542" width="4" height="30" />
        <rect x="252" y="542" width="4" height="30" />
        <rect x="356" y="542" width="4" height="30" />
        <rect x="460" y="542" width="4" height="30" />
        <rect x="564" y="542" width="4" height="30" />
        <rect x="668" y="542" width="4" height="30" />
        <rect x="876" y="542" width="4" height="30" />
        <rect x="980" y="542" width="4" height="30" />
      </g>
      <circle cx="760" cy="557" r="28" fill="#e4573d" />
      <circle cx="760" cy="557" r="10" fill="#f3e2c4" />
      <rect x="96" y="612" width="168" height="12" fill="#e4573d" />
      <rect x="96" y="636" width="72" height="12" fill="#f3e2c4" />
    </svg>
  );
}
