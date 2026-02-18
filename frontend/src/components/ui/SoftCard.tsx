import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SoftCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    hoverGlow?: boolean;
}

const SoftCard = ({ children, className = '', hoverEffect = false, hoverGlow = false }: SoftCardProps) => {
    return (
        <motion.div
            whileHover={hoverEffect ? {
                y: -6,
                boxShadow: hoverGlow
                    ? '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(184, 50, 50, 0.08)'
                    : '0 16px 40px rgba(0, 0, 0, 0.5)',
                borderColor: hoverGlow ? 'rgba(212, 74, 74, 0.15)' : 'rgba(255, 255, 255, 0.12)',
            } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`rounded-2xl shadow-soft p-6 ${className}`}
            style={{
                backgroundColor: 'rgba(26, 18, 16, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                cursor: hoverEffect ? 'pointer' : undefined,
            }}
        >
            {children}
        </motion.div>
    );
};

export default SoftCard;
