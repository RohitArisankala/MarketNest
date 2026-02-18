import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import FloatingNavbar from './FloatingNavbar';

interface LayoutProps {
    children: ReactNode;
    showNavbar?: boolean;
}

const Layout = ({ children, showNavbar = true }: LayoutProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-screen relative overflow-x-hidden font-sans text-warm-200"
        >
            {showNavbar && <FloatingNavbar />}

            <main className="container mx-auto px-4 py-8 relative z-10 pt-32">
                {children}
            </main>
        </motion.div>
    );
};

export default Layout;
