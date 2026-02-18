import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Button3D from '../../components/ui/Button3D';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { IconUser, IconStore } from '../../components/ui/GradientIcons';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [role, setRole] = useState<'user' | 'brand'>('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            showToast('Passwords do not match', 'error');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            showToast('Password must be at least 6 characters', 'error');
            return;
        }
        setLoading(true);
        try {
            await register({ name, email, password, role });
            showToast(`Welcome to MarketNest as a ${role === 'brand' ? 'Brand' : 'Shopper'}!`, 'auth');
            navigate(role === 'brand' ? '/brand/dashboard' : '/marketplace');
        } catch (err: any) {
            console.error("Registration Error:", err);

            const errorMsg = err.response?.data?.message
                ? (typeof err.response.data.message === 'object' ? JSON.stringify(err.response.data.message) : err.response.data.message)
                : err.message || 'Registration failed';

            const debugInfo = {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                apiUrl: import.meta.env.VITE_API_URL,
                finalErrorMsg: errorMsg
            };
            alert("DEBUG: " + JSON.stringify(debugInfo, null, 2));

            setError(String(errorMsg));
            showToast(String(errorMsg), 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '9px 14px',
        backgroundColor: 'rgba(26, 18, 16, 0.6)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        color: '#f5ebe3',
        fontSize: 13,
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    const labelStyle: React.CSSProperties = {
        color: '#d4b89e', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4,
    };

    return (
        <div className="fixed inset-0 flex" style={{ background: '#0a0705' }}>
            {/* Left — Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16"
                style={{ background: 'linear-gradient(180deg, #0d0907 0%, #110c0a 100%)' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-sm w-full mx-auto"
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-5">
                        <Logo size={30} style={{ filter: 'drop-shadow(0 4px 6px rgba(184, 50, 50, 0.2))' }} />
                        <span style={{ color: '#f5ebe3', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                            Market<span style={{ color: '#d44a4a' }}>Nest</span>
                        </span>
                    </div>

                    <h1 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.6rem', fontWeight: 700, color: '#f5ebe3', marginBottom: 4,
                    }}>
                        Create your account
                    </h1>
                    <p style={{ color: '#8e6f5a', fontSize: 13, marginBottom: 16 }}>
                        Join MarketNest as a shopper or a brand.
                    </p>

                    {/* Role Selection - Compact Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                        <button
                            type="button"
                            onClick={() => setRole('user')}
                            className="group"
                            style={{
                                padding: '12px 10px',
                                borderRadius: 12,
                                border: role === 'user' ? '2px solid #d44a4a' : '2px solid rgba(255,255,255,0.08)',
                                backgroundColor: role === 'user' ? 'rgba(184, 50, 50, 0.12)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                                transition: 'all 0.2s',
                            }}
                        >
                            <div style={{
                                width: 32, height: 32, borderRadius: 8,
                                backgroundColor: role === 'user' ? '#d44a4a' : 'rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                            }}>
                                <IconUser size={16} color={role === 'user' ? 'white' : '#8e6f5a'} style={role === 'user' ? { stroke: 'white' } : {}} />
                            </div>
                            <span style={{ color: role === 'user' ? '#f5ebe3' : '#8e6f5a', fontWeight: 600, fontSize: 13 }}>Shopper</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole('brand')}
                            className="group"
                            style={{
                                padding: '12px 10px',
                                borderRadius: 12,
                                border: role === 'brand' ? '2px solid #d44a4a' : '2px solid rgba(255,255,255,0.08)',
                                backgroundColor: role === 'brand' ? 'rgba(184, 50, 50, 0.12)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                                transition: 'all 0.2s',
                            }}
                        >
                            <div style={{
                                width: 32, height: 32, borderRadius: 8,
                                backgroundColor: role === 'brand' ? '#d44a4a' : 'rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                            }}>
                                <IconStore size={16} color={role === 'brand' ? 'white' : '#8e6f5a'} style={role === 'brand' ? { stroke: 'white' } : {}} />
                            </div>
                            <span style={{ color: role === 'brand' ? '#f5ebe3' : '#8e6f5a', fontWeight: 600, fontSize: 13 }}>Brand</span>
                        </button>
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444',
                            color: '#fca5a5', padding: '8px 12px', borderRadius: 8, fontSize: 12, marginBottom: 12,
                        }}>
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Name + Email side by side */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                            <div>
                                <label style={labelStyle}>
                                    {role === 'brand' ? 'Brand Name' : 'Full Name'} <span style={{ color: '#d44a4a' }}>*</span>
                                </label>
                                <input type="text" placeholder={role === 'brand' ? 'Brand name' : 'Your name'} value={name}
                                    onChange={(e) => setName(e.target.value)} required style={inputStyle}
                                    onFocus={(e) => e.target.style.borderColor = 'rgba(212, 74, 74, 0.5)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                            <div>
                                <label style={labelStyle}>Email <span style={{ color: '#d44a4a' }}>*</span></label>
                                <input type="email" placeholder="you@email.com" value={email}
                                    onChange={(e) => setEmail(e.target.value)} required style={inputStyle}
                                    onFocus={(e) => e.target.style.borderColor = 'rgba(212, 74, 74, 0.5)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                        </div>

                        {/* Password Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
                            <div>
                                <label style={labelStyle}>Password <span style={{ color: '#d44a4a' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <input type={showPw ? 'text' : 'password'} placeholder="••••••" value={password}
                                        onChange={(e) => setPassword(e.target.value)} required
                                        style={{ ...inputStyle, paddingRight: 36 }}
                                        onFocus={(e) => e.target.style.borderColor = 'rgba(212, 74, 74, 0.5)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                    <button type="button" onClick={() => setShowPw(!showPw)} style={{
                                        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: '#6b5243', padding: 0,
                                    }}>
                                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Confirm <span style={{ color: '#d44a4a' }}>*</span></label>
                                <input type={showPw ? 'text' : 'password'} placeholder="••••••" value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} required style={inputStyle}
                                    onFocus={(e) => e.target.style.borderColor = 'rgba(212, 74, 74, 0.5)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                        </div>

                        <Button3D className="w-full flex justify-center items-center gap-2 text-sm py-3" disabled={loading}>
                            {loading ? 'Creating...' : `Sign Up as ${role === 'brand' ? 'Brand' : 'Shopper'}`} <UserPlus size={16} />
                        </Button3D>
                    </form>

                    <div className="flex items-center gap-4 my-5">
                        <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
                        <span className="text-[#6b5243] text-xs font-medium">OR</span>
                        <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] text-[#d4b89e] text-sm font-medium transition-all duration-200 mb-4"
                        onClick={() => {
                            const apiUrl = import.meta.env.VITE_API_URL;
                            if (!apiUrl) {
                                alert('VITE_API_URL is missing! Please configure it in Vercel Settings.');
                                return;
                            }
                            window.location.href = `${apiUrl}/auth/google?role=${role}`;
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.52 12.29C23.52 11.43 23.44 10.61 23.3 9.82H12V14.46H18.46C18.18 15.93 17.33 17.18 16.06 18.03V20.98H19.95C22.23 18.88 23.52 15.82 23.52 12.29Z" fill="#4285F4" />
                            <path d="M12 24C15.24 24 17.96 22.92 19.95 21.09L16.06 18.14C14.98 18.86 13.61 19.3 12 19.3C8.87 19.3 6.22 17.18 5.27 14.33H1.26V17.44C3.26 21.41 7.37 24 12 24Z" fill="#34A853" />
                            <path d="M5.27 14.29C5.02 13.53 4.89 12.73 4.89 11.91C4.89 11.09 5.03 10.29 5.27 9.53V6.42H1.26C0.46 8.02 0 9.89 0 11.91C0 13.93 0.45 15.8 1.25 17.39L5.27 14.29Z" fill="#FBBC05" />
                            <path d="M12 4.75C13.76 4.75 15.35 5.36 16.59 6.55L20.03 3.11C17.95 1.17 15.23 0 12 0C7.37 0 3.26 2.59 1.26 6.56L5.27 9.67C6.22 6.82 8.87 4.75 12 4.75Z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <p style={{ color: '#8e6f5a', textAlign: 'center', fontSize: 13 }}>
                        Already have an account ?{' '}
                        <Link to="/login" style={{ color: '#d44a4a', fontWeight: 600, textDecoration: 'none' }}>Sign in here</Link>
                    </p>
                </motion.div>
            </div>

            {/* Right — Decorative Panel */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a0e0c 0%, #2a1614 30%, #1a0e0c 70%, #120a08 100%)' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%', border: '1px solid rgba(212, 74, 74, 0.08)', top: '-8%', left: '-8%' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(212, 184, 158, 0.06)', bottom: '5%', right: '-5%' }} />
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: 'absolute', top: '15%', left: '18%', width: 50, height: 50, background: 'linear-gradient(135deg, #d44a4a 0%, #b83232 100%)', borderRadius: 12, transform: 'rotate(20deg)', opacity: 0.6 }} />
                <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    style={{ position: 'absolute', bottom: '20%', right: '15%', width: 70, height: 70, background: 'linear-gradient(135deg, rgba(212, 184, 158, 0.12) 0%, rgba(212, 184, 158, 0.04) 100%)', borderRadius: 16, transform: 'rotate(-15deg)', border: '1px solid rgba(212, 184, 158, 0.08)' }} />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: 'absolute', top: '55%', right: '25%', width: 18, height: 18, background: '#d44a4a', borderRadius: '50%', opacity: 0.4 }} />
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-center z-10 px-12">
                    <div style={{ width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg, #b83232 0%, #d44a4a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 12px 40px rgba(184, 50, 50, 0.3)' }}>
                        <UserPlus size={32} color="white" />
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.7rem', color: '#f5ebe3', marginBottom: 10, fontWeight: 700 }}>
                        Start your<br />journey today.
                    </h2>
                    <p style={{ color: '#6b5243', fontSize: 13, maxWidth: 250, margin: '0 auto', lineHeight: 1.6 }}>
                        Whether you're here to shop or sell, MarketNest has a place for you.
                    </p>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
                        {[0.9, 0.6, 0.4, 0.2].map((op, i) => (
                            <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#d44a4a', opacity: op }} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
