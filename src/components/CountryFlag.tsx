type Code = "in" | "us" | "ae" | "au" | "gu";

/** Simple, dependency-free inline flag marks. */
export function CountryFlag({ code, title }: { code: Code; title: string }) {
  const common = { viewBox: "0 0 60 40", role: "img", "aria-label": `${title} flag` } as const;

  if (code === "au") {
    return (
      <svg {...common}>
        <rect width="60" height="40" fill="#00247D" />
        <rect width="30" height="20" fill="#00247D" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="3" />
        <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="5" />
        <path d="M15 0v20M0 10h30" stroke="#CF142B" strokeWidth="2.5" />
        <circle cx="15" cy="30" r="3.4" fill="#fff" />
        <circle cx="45" cy="10" r="2.2" fill="#fff" />
        <circle cx="50" cy="22" r="2.2" fill="#fff" />
        <circle cx="42" cy="30" r="2" fill="#fff" />
        <circle cx="52" cy="33" r="1.6" fill="#fff" />
      </svg>
    );
  }

  if (code === "gu") {
    return (
      <svg {...common}>
        <rect width="60" height="40" fill="#00338D" />
        <ellipse cx="30" cy="20" rx="9" ry="13" fill="#8CC5E8" stroke="#C8102E" strokeWidth="1.6" />
        <path d="M21 26q9 4 18 0v-2q-9 4-18 0z" fill="#F2CE6B" />
        <path d="M30 9c2 4 3 8 2 12h-4c-1-4 0-8 2-12z" fill="#2E7D32" />
      </svg>
    );
  }



  if (code === "in") {
    return (
      <svg {...common}>
        <rect width="60" height="13.33" fill="#FF9933" />
        <rect y="13.33" width="60" height="13.34" fill="#fff" />
        <rect y="26.67" width="60" height="13.33" fill="#138808" />
        <circle cx="30" cy="20" r="5" fill="none" stroke="#000088" strokeWidth="1.1" />
        <circle cx="30" cy="20" r="1.1" fill="#000088" />
      </svg>
    );
  }

  if (code === "ae") {
    return (
      <svg {...common}>
        <rect width="60" height="40" fill="#fff" />
        <rect width="15" height="40" fill="#00732F" />
        <rect x="15" width="45" height="13.33" fill="#00732F" />
        <rect x="15" y="26.67" width="45" height="13.33" fill="#000" />
        <rect width="15" height="40" fill="#FF0000" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect width="60" height="40" fill="#fff" />
      {Array.from({ length: 13 }).map((_, i) =>
        i % 2 === 0 ? (
          <rect key={i} y={(i * 40) / 13} width="60" height={40 / 13} fill="#B22234" />
        ) : null,
      )}
      <rect width="26" height="21.5" fill="#3C3B6E" />
    </svg>
  );
}

export default CountryFlag;
