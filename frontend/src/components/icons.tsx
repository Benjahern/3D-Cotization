import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...props,
  };
}

export function CubeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 4 7.2v9.6L12 21l8-4.2V7.2L12 3Z" />
      <path d="M4 7.2 12 11.4l8-4.2" />
      <path d="M12 11.4V21" />
    </svg>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <path d="M8 6.5h8" />
      <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
    </svg>
  );
}

export function ReceiptIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 3.5h14v17l-2.3-1.6-2.35 1.6L12 19l-2.35 1.5L7.3 18.9 5 20.5v-17Z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 12.2V5a1.5 1.5 0 0 1 1.5-1.5h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8l-6.3 6.3a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1-.6-1.4Z" />
      <circle cx="8" cy="8" r="1.4" />
    </svg>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 16.5 9 11l4 4 7.5-7.5" />
      <path d="M15.5 7.5h5v5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7.2 8.5h9.6l2 10a1 1 0 0 1-1 1.2H6.2a1 1 0 0 1-1-1.2l2-10Z" />
      <circle cx="12" cy="5" r="2.2" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 11a8 8 0 0 0-14.2-4.6L3.5 9" />
      <path d="M3.5 4.5V9H8" />
      <path d="M4 13a8 8 0 0 0 14.2 4.6L20.5 15" />
      <path d="M20.5 19.5V15H16" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 13 4.5 4.5L19 7" />
    </svg>
  );
}
