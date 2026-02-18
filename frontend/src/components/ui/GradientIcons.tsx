import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
    color?: string;
}

const GradientDefs = () => (
    <defs>
        <linearGradient id="icon-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d44a4a" />
            <stop offset="100%" stopColor="#b83232" />
        </linearGradient>
        <linearGradient id="icon-gradient-warm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4b89e" />
            <stop offset="100%" stopColor="#8e6f5a" />
        </linearGradient>
    </defs>
);

export const IconHome = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <path d="M2.5 11.5L12 3L21.5 11.5" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 11V19C5.5 20.1 6.4 21 7.5 21H16.5C17.6 21 18.5 20.1 18.5 19V11" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 21V15H14V21" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconStore = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <path d="M3 8.7L4.5 3H19.5L21 8.7V19.5C21 20.3 20.3 21 19.5 21H4.5C3.7 21 3 20.3 3 19.5V8.7Z" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9L21 9" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 14C10 15.1 10.9 16 12 16C13.1 16 14 15.1 14 14" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconDashboard = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <rect x="3" y="3" width="7" height="7" rx="2" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" />
        <rect x="14" y="3" width="7" height="7" rx="2" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" />
        <rect x="14" y="14" width="7" height="7" rx="2" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" />
        <rect x="3" y="14" width="7" height="7" rx="2" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" />
    </svg>
);

export const IconUser = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <circle cx="12" cy="7" r="4" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" />
        <path d="M4 21V19C4 16.8 5.8 15 8 15H16C18.2 15 20 16.8 20 19V21" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

export const IconSparkles = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 16L19 18L21 19L19 20L18 22L17 20L15 19L17 18L18 16Z" fill={color || "url(#icon-gradient-primary)"} />
    </svg>
);

export const IconShield = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconTruck = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <path d="M1 3H16V16H1V3Z" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 8H20L23 11V16H16" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="5.5" cy="18.5" r="2.5" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" />
    </svg>
);

export const IconHeart = ({ size = 24, className, color, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <GradientDefs />
        <path d="M20.8 4.6C20.3 4.1 19.6 3.7 18.9 3.4C18.2 3.1 17.5 3 16.8 3C16 3 15.3 3.1 14.6 3.4C13.9 3.7 13.3 4.1 12.8 4.6L12 5.4L11.2 4.6C10.2 3.6 8.9 3 7.5 3C6 3 4.7 3.6 3.7 4.6C1.7 6.6 1.7 9.9 3.7 11.9L12 20.2L20.3 11.9C21.3 10.9 21.8 9.6 21.8 8.2C21.8 6.9 21.3 5.6 20.8 4.6Z" stroke={color || "url(#icon-gradient-primary)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
