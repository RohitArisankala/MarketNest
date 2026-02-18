import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { IconHome, IconStore, IconDashboard, IconUser } from '../ui/GradientIcons';
import Logo from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useState, useEffect } from 'react';

const FloatingNavbar = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const { showToast } = useToast();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        showToast('You have been logged out. See you soon!', 'info');
        setTimeout(() => logout(), 500);
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <IconHome size={18} /> },
        { name: 'Marketplace', path: '/marketplace', icon: <IconStore size={18} /> },
    ];

    if (user?.role === 'brand') {
        navLinks.push({ name: 'Dashboard', path: '/brand/dashboard', icon: <IconDashboard size={18} /> });
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="z-50"
            style={{
                position: 'fixed',
                zIndex: 50,
                top: 14,
                left: 0,
                right: 0,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '90%',
                maxWidth: '900px',
                borderRadius: '999px',
                background: scrolled
                    ? 'linear-gradient(135deg, rgba(38, 28, 24, 0.97) 0%, rgba(28, 20, 18, 0.98) 50%, rgba(36, 24, 22, 0.97) 100%)'
                    : 'linear-gradient(135deg, rgba(42, 30, 26, 0.88) 0%, rgba(30, 22, 18, 0.9) 50%, rgba(40, 28, 24, 0.88) 100%)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                boxShadow: scrolled
                    ? '0 8px 32px -4px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)'
                    : '0 8px 32px -4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.09)',
                padding: '8px 10px 8px 24px',
                transition: 'all 0.3s ease',
            }}
        >
            <div className="flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
                    <Logo size={34} style={{ filter: 'drop-shadow(0 4px 6px rgba(184, 50, 50, 0.2))' }} />
                    <span style={{
                        color: '#f5ebe3',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        fontFamily: 'Inter, sans-serif',
                    }}>Market<span style={{ color: '#d44a4a' }}>Nest</span></span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 group"
                            style={{
                                color: location.pathname === link.path ? '#110c0a' : '#d4b89e',
                                fontWeight: location.pathname === link.path ? 600 : 500,
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                backgroundColor: location.pathname === link.path ? '#e8d5c4' : 'transparent',
                            }}
                        >
                            <span className={location.pathname === link.path ? 'opacity-100' : 'opacity-70 group-hover:opacity-100 transition-opacity'}>
                                {link.icon}
                            </span>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="hidden md:flex items-center gap-3 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                            <Link to="/profile" className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-colors" style={{ textDecoration: 'none' }}>
                                <div className="flex flex-col items-end leading-none">
                                    <span style={{ color: '#f5ebe3', fontSize: 13, fontWeight: 600 }}>{user.name}</span>
                                    <span style={{ color: '#8e6f5a', fontSize: 11 }}>{user.role === 'brand' ? 'Brand' : 'Shopper'}</span>
                                </div>
                                <IconUser size={22} className="opacity-90" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2.5 rounded-full transition-colors"
                                style={{ color: '#e86b6b' }}
                                title="Logout"
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(232,107,107,0.1)')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/login"
                                style={{
                                    color: '#d4b89e',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    textDecoration: 'none',
                                    transition: 'opacity 0.2s',
                                }}
                                className="hover:opacity-80"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                style={{
                                    color: '#fff',
                                    padding: '8px 20px',
                                    borderRadius: 999,
                                    backgroundColor: '#b83232',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 14px rgba(184, 50, 50, 0.3)',
                                    transition: 'transform 0.2s, background-color 0.2s',
                                }}
                                className="hover:scale-105 active:scale-95"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg"
                        style={{ color: '#d4b89e' }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            left: 0, right: 0,
                            backgroundColor: 'rgba(18, 12, 10, 0.97)',
                            backdropFilter: 'blur(24px)',
                            borderRadius: '20px',
                            padding: '16px',
                            boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        className="md:hidden overflow-hidden flex flex-col gap-2"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    color: location.pathname === link.path ? '#110c0a' : '#f5ebe3',
                                    backgroundColor: location.pathname === link.path ? '#e8d5c4' : 'transparent',
                                    padding: '10px 16px',
                                    borderRadius: '12px',
                                    fontSize: 15,
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                }}
                            >
                                <span style={{ opacity: location.pathname === link.path ? 1 : 0.8 }}>
                                    {link.icon}
                                </span>
                                {link.name}
                            </Link>
                        ))}
                        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setMobileOpen(false)} style={{ color: '#d4b89e', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', textDecoration: 'none' }}>
                                    <IconUser size={20} /> {user.name}
                                </Link>
                                <button
                                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                                    style={{ color: '#e86b6b', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, width: '100%', textAlign: 'left' }}
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 mt-2">
                                <Link to="/login" onClick={() => setMobileOpen(false)}
                                    style={{ textAlign: 'center', color: '#f5ebe3', padding: '10px', textDecoration: 'none', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setMobileOpen(false)}
                                    style={{ textAlign: 'center', color: '#fff', backgroundColor: '#b83232', padding: '10px', textDecoration: 'none', borderRadius: '12px', fontWeight: 600 }}>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default FloatingNavbar;
