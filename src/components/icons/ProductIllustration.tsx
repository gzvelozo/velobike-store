import type { CategoryKey } from "@/lib/products";

const illustrations: Record<string, React.FC<{ className?: string }>> = {
  "ag1-athletic-greens": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Foil supplement pouch */}
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

  "magnesium-glycinate": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Supplement bottle — cylindrical amber-glass style */}
      <path d="M78 40 L78 30 C78 26, 82 22, 86 22 L114 22 C118 22, 122 26, 122 30 L122 40" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Neck ring */}
      <path d="M78 40 L122 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M76 40 L124 40 L124 45 L76 45 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Bottle body */}
      <path d="M76 45 L76 120 C76 126, 80 130, 86 130 L114 130 C120 130, 124 126, 124 120 L124 45" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Label area */}
      <rect x="82" y="60" width="36" height="55" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      {/* Mg symbol */}
      <text x="100" y="80" fontSize="14" fontWeight="bold" fill="currentColor" opacity="0.6" textAnchor="middle">Mg</text>
      <line x1="88" y1="92" x2="112" y2="92" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="92" y1="98" x2="108" y2="98" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <line x1="86" y1="105" x2="114" y2="105" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
    </svg>
  ),

  "ashwagandha-ksm66": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Compact supplement bottle */}
      <path d="M80 42 L80 32 C80 28, 84 24, 88 24 L112 24 C116 24, 120 28, 120 32 L120 42" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Neck */}
      <path d="M78 42 L122 42 L122 48 L78 48 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Body — shorter than magnesium */}
      <path d="M78 48 L78 118 C78 124, 82 128, 88 128 L112 128 C118 128, 122 124, 122 118 L122 48" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Label area */}
      <rect x="83" y="60" width="34" height="52" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      {/* Root/plant motif */}
      <path d="M100 74 C96 78, 92 80, 90 84" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M100 74 C104 78, 108 80, 110 84" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M100 74 L100 88" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* KSM label */}
      <text x="100" y="102" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.6" textAnchor="middle">KSM-66</text>
    </svg>
  ),

  "omega3-triple-strength": ({ className }) => (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Softgel bottle — wider and shorter */}
      <path d="M72 40 L72 30 C72 26, 76 22, 80 22 L120 22 C124 22, 128 26, 128 30 L128 40" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Neck ring */}
      <path d="M70 40 L130 40 L130 46 L70 46 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Body */}
      <path d="M70 46 L70 120 C70 126, 74 130, 80 130 L120 130 C126 130, 130 126, 130 120 L130 46" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Label */}
      <rect x="76" y="58" width="48" height="56" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      {/* Omega symbol Ω */}
      <text x="100" y="80" fontSize="18" fontWeight="bold" fill="currentColor" opacity="0.6" textAnchor="middle">Ω</text>
      {/* EPA+DHA text */}
      <text x="100" y="98" fontSize="8" fontWeight="600" fill="currentColor" opacity="0.5" textAnchor="middle">EPA+DHA</text>
      {/* Softgels visible */}
      <ellipse cx="90" cy="108" rx="4" ry="3" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <ellipse cx="100" cy="108" rx="4" ry="3" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <ellipse cx="110" cy="108" rx="4" ry="3" stroke="currentColor" strokeWidth="1" opacity="0.3" />
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
