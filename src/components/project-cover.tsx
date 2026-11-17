import type { Project } from "@/lib/types";

// Abstract placeholder cover. Replace with the project image from Cloudinary / S3.
export function ProjectCover({ cover, variant = 0 }: { cover: Project["cover"]; variant?: number }) {
  const paths = [
    "M20 120 Q60 60 100 110 T180 100 T260 70 T340 90 T390 60",
    "M10 140 L80 120 L130 130 L190 90 L250 100 L310 60 L390 70",
    "M30 150 L30 110 M90 150 L90 90 M150 150 L150 100 M210 150 L210 70 M270 150 L270 80 M330 150 L330 50",
  ];
  const cx = [300, 80, 200][variant % 3];
  const cx2 = [90, 320, 360][variant % 3];
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 400 176"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ background: cover.bg }}
    >
      <circle cx={cx} cy="88" r="120" fill={cover.c1} />
      <circle cx={cx2} cy="150" r="70" fill={cover.c2} />
      <path
        d={paths[variant % 3]}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}
