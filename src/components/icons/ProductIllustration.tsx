import type { CategoryKey } from "@/lib/products";

const illustrations: Record<string, React.FC<{ className?: string }>> = {
  "canyon-grail-cf": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Road bike silhouette */}
      <circle cx="52" cy="95" r="30" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <circle cx="148" cy="95" r="30" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <circle cx="52" cy="95" r="22" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      <circle cx="148" cy="95" r="22" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      {/* Frame */}
      <path d="M52 95 L95 50 L148 95" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M95 50 L130 50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M52 95 L95 95 L130 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Handlebars */}
      <path d="M130 50 C140 42, 142 38, 138 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Seat */}
      <path d="M88 48 L102 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Pedal */}
      <circle cx="95" cy="95" r="5" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  ),

  "garmin-edge-1050": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Device body */}
      <rect x="62" y="20" width="76" height="100" rx="12" stroke="currentColor" strokeWidth="3" />
      {/* Screen */}
      <rect x="72" y="32" width="56" height="68" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {/* Screen content — heart rate */}
      <path d="M88 62 L94 55 L100 68 L106 50 L112 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* BPM text line */}
      <line x1="85" y1="78" x2="115" y2="78" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="90" y1="84" x2="110" y2="84" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      {/* Buttons */}
      <circle cx="100" cy="112" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>
  ),

  "ag1-athletic-greens": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pouch body */}
      <path d="M72 30 L128 30 L135 120 C135 125, 130 130, 125 130 L75 130 C70 130, 65 125, 65 120 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Cap/seal */}
      <path d="M72 30 L128 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M82 30 L82 22 L118 22 L118 30" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Label area */}
      <rect x="78" y="55" width="44" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      {/* Leaf icon */}
      <path d="M96 68 C96 62, 104 58, 110 62 C110 68, 104 74, 96 68Z" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="96" y1="68" x2="106" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Text lines */}
      <line x1="88" y1="80" x2="112" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="92" y1="86" x2="108" y2="86" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
    </svg>
  ),

  "theragun-pro": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body */}
      <path d="M60 50 C60 42, 66 36, 74 36 L126 36 C134 36, 140 42, 140 50 L140 58 C140 62, 138 65, 135 67 L115 80 L115 110 C115 116, 110 120, 105 120 L95 120 C90 120, 85 116, 85 110 L85 80 L65 67 C62 65, 60 62, 60 58 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Attachment head */}
      <ellipse cx="100" cy="30" rx="14" ry="8" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      {/* Grip texture */}
      <line x1="92" y1="88" x2="108" y2="88" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="92" y1="94" x2="108" y2="94" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="92" y1="100" x2="108" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="92" y1="106" x2="108" y2="106" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      {/* Power indicator */}
      <circle cx="100" cy="55" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Vibration waves */}
      <path d="M68 26 C65 22, 65 18, 68 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M132 26 C135 22, 135 18, 132 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    </svg>
  ),
};

export function ProductIllustration({
  slug,
  className = "h-32 w-32",
}: {
  slug: string;
  className?: string;
}) {
  const Illustration = illustrations[slug];
  if (!Illustration) {
    return (
      <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="30" width="100" height="80" rx="12" stroke="currentColor" strokeWidth="3" opacity="0.3" />
        <circle cx="100" cy="65" r="15" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      </svg>
    );
  }
  return <Illustration className={className} />;
}
