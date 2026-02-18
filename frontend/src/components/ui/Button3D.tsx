import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Button3DProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
}

const Button3D = ({ children, variant = 'primary', className, ...props }: Button3DProps) => {
    const baseStyles = "relative px-6 py-3 rounded-xl font-bold transition-all duration-100 ease-out active:scale-95 text-white shadow-lg";

    const variants = {
        primary: "bg-accent-600 hover:bg-accent-500 shadow-accent-900/50 border-b-4 border-accent-800 active:border-b-0 active:translate-y-1 hover:shadow-[0_0_20px_rgba(184,50,50,0.3)]",
        secondary: "bg-warm-700 hover:bg-warm-600 shadow-warm-900/50 border-b-4 border-warm-800 active:border-b-0 active:translate-y-1 hover:shadow-[0_0_20px_rgba(107,82,67,0.4)]",
        danger: "bg-red-500 hover:bg-red-400 shadow-red-700/50 border-b-4 border-red-700 active:border-b-0 active:translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button3D;
