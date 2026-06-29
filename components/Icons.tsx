/* LeBonBureau — shared icon set (Feather-style line icons + brand glyphs).
   Faithful to the prototype's inline SVGs. Each accepts standard <svg> props
   so size/stroke can be overridden per use. */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Line({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const CartIcon = (p: IconProps) => (
  <Line {...p}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </Line>
);

export const CheckIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M5 12l5 5L20 7" />
  </Line>
);

export const CheckBigIcon = (p: IconProps) => (
  <Line strokeWidth={2.4} {...p}>
    <path d="M5 13l4 4L19 7" />
  </Line>
);

export const CheckTinyIcon = (p: IconProps) => (
  <Line strokeWidth={1.9} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </Line>
);

export const TruckIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <path d="M16 8h4l3 3v5h-7z" />
    <circle cx="5.5" cy="18.5" r="1.5" />
    <circle cx="18.5" cy="18.5" r="1.5" />
  </Line>
);

export const ShieldIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
  </Line>
);

export const ClockIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M21 12a9 9 0 1 1-9-9" />
    <path d="M12 7v5l3 2" />
  </Line>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Line>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Line>
);

export const PlusIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Line>
);

export const TrashIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  </Line>
);

export const LockIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Line>
);

export const PhoneIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Line>
);

export const MailIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </Line>
);

export const PinIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Line>
);

export const PinSmallIcon = (p: IconProps) => (
  <Line strokeWidth={1.9} {...p}>
    <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Line>
);

export const BoltIcon = (p: IconProps) => (
  <Line strokeWidth={1.9} {...p}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
  </Line>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </Line>
);

export const SearchIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Line>
);

export const LogoutIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </Line>
);

export const ExternalIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Line>
);

export const NoteIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Line>
);

export const ArchiveIcon = (p: IconProps) => (
  <Line strokeWidth={1.6} {...p}>
    <path d="M3 3h18v4H3zM4 7v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7M9 12h6" />
  </Line>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Line strokeWidth={2.2} {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Line>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Line strokeWidth={2.2} {...p}>
    <path d="M9 18l6-6-6-6" />
  </Line>
);

export const AlertIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </Line>
);

export const ClockCircleIcon = (p: IconProps) => (
  <Line strokeWidth={1.9} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4l3 2" />
  </Line>
);

export function StarIcon({ filled, size = 16, ...rest }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 18l-6.2 3.3L7 14.2l-5-4.9 6.9-1z" />
    </svg>
  );
}

export const FacebookIcon = (p: IconProps) => (
  <svg width={p.size ?? 17} height={p.size ?? 17} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg
    width={p.size ?? 17}
    height={p.size ?? 17}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
