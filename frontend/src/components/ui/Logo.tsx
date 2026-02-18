import type { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
}

const Logo = ({ size = 32, className, ...props }: LogoProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <defs>
                <linearGradient id="logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#b83232" />
                    <stop offset="100%" stopColor="#d44a4a" />
                </linearGradient>
            </defs>
            <rect width="64" height="64" rx="16" fill="url(#logo-bg)" />
            <text
                x="32"
                y="45"
                fontFamily="'Playfair Display', Georgia, serif"
                fontWeight="bold"
                fontSize="38"
                fill="white"
                textAnchor="middle"
                fontStyle="italic"
            >
                M
            </text>
        </svg>
    );
};

export default Logo;
