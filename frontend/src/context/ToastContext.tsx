import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, LogIn } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'auth';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

const iconMap: Record<ToastType, ReactNode> = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    auth: <LogIn size={20} />,
};

const colorMap: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
    success: { bg: 'rgba(16, 185, 129, 0.12)', border: '#10b981', text: '#a7f3d0', icon: '#34d399' },
    error: { bg: 'rgba(239, 68, 68, 0.12)', border: '#ef4444', text: '#fca5a5', icon: '#f87171' },
    info: { bg: 'rgba(212, 184, 158, 0.12)', border: '#d4b89e', text: '#e8d5c4', icon: '#d4b89e' },
    auth: { bg: 'rgba(212, 74, 74, 0.12)', border: '#d44a4a', text: '#f5a0a0', icon: '#d44a4a' },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div
                style={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    maxWidth: 380,
                    width: '100%',
                    pointerEvents: 'none',
                }}
            >
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const colors = colorMap[toast.type];
                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                style={{
                                    pointerEvents: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '14px 18px',
                                    backgroundColor: colors.bg,
                                    borderLeft: `4px solid ${colors.border}`,
                                    borderRadius: 12,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <div style={{ color: colors.icon, flexShrink: 0 }}>
                                    {iconMap[toast.type]}
                                </div>
                                <p style={{ color: colors.text, fontSize: 14, fontWeight: 500, flex: 1, margin: 0 }}>
                                    {toast.message}
                                </p>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: colors.text,
                                        opacity: 0.5,
                                        padding: 2,
                                        flexShrink: 0,
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
