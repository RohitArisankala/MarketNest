import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StaggerChildProps {
    children: ReactNode;
    index: number;
    className?: string;
}

export const StaggerParent = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerChild = ({ children, index, className = '' }: StaggerChildProps) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.06,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.div>
);
