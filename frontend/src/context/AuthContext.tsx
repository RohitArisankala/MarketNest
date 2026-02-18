import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../utils/api';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'brand';
    bio: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await api.get('/auth/me');
                setUser(data);
                localStorage.setItem('userInfo', JSON.stringify(data));
            } catch {
                setUser(null);
                localStorage.removeItem('userInfo');
            } finally {
                setLoading(false);
            }
        };

        // Quick restore from localStorage, then validate with server
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        checkAuth();
    }, []);

    const login = async (userData: any) => {
        const { data } = await api.post('/auth/login', userData);
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const register = async (userData: any) => {
        const { data } = await api.post('/auth/register', userData);
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const updateProfile = async (userData: any) => {
        const { data } = await api.put('/auth/profile', userData);
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
