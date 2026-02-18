import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import SoftCard from '../../components/ui/SoftCard';
import SoftInput from '../../components/ui/SoftInput';
import Button3D from '../../components/ui/Button3D';
import PageTransition from '../../components/ui/PageTransition';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Save, UserCircle, Store, User } from 'lucide-react';

const UserProfile = () => {
    const { user, updateProfile } = useAuth();
    const { showToast } = useToast();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        if (password && password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }
        setLoading(true);
        try {
            const updateData: any = { name, email, bio };
            if (password) updateData.password = password;
            await updateProfile(updateData);
            setPassword('');
            setConfirmPassword('');
            showToast('Profile updated successfully!', 'info');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Update failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <PageTransition>
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold text-brown-100 mb-8"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>
                        My Profile
                    </h1>

                    {/* User Info Card */}
                    <SoftCard className="mb-6 flex items-center gap-5">
                        <div style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #b83232 0%, #d44a4a 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <UserCircle size={32} color="white" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f5ebe3', marginBottom: 4 }}>{user?.name}</h2>
                            <div className="flex items-center gap-2">
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    padding: '3px 10px',
                                    borderRadius: 999,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    backgroundColor: user?.role === 'brand' ? 'rgba(184, 50, 50, 0.12)' : 'rgba(212, 184, 158, 0.1)',
                                    color: user?.role === 'brand' ? '#d44a4a' : '#d4b89e',
                                }}>
                                    {user?.role === 'brand' ? <Store size={10} /> : <User size={10} />}
                                    {user?.role === 'brand' ? 'Brand' : 'Shopper'}
                                </span>
                                <span style={{ color: '#6b5243', fontSize: 12 }}>{user?.email}</span>
                            </div>
                        </div>
                    </SoftCard>

                    {/* Edit Form */}
                    <SoftCard>
                        <h3 style={{ color: '#d4b89e', fontWeight: 600, marginBottom: 20, fontSize: '1.1rem' }}>Edit Profile</h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <SoftInput
                                type="text"
                                label="Name"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <SoftInput
                                type="email"
                                label="Email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div>
                                <label style={{ color: '#d4b89e', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                                    Bio
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself..."
                                    rows={4}
                                    className="w-full px-5 py-4 bg-dark-600 rounded-xl shadow-soft-inset outline-none focus:ring-2 focus:ring-accent-600/50 transition-all text-warm-100 placeholder-warm-700 resize-none"
                                />
                            </div>

                            <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />

                            <p style={{ color: '#6b5243', fontSize: 13 }}>Leave empty to keep your current password</p>

                            <SoftInput
                                type="password"
                                label="New Password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <SoftInput
                                type="password"
                                label="Confirm New Password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <Button3D className="w-full flex justify-center items-center gap-2 mt-4" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'} <Save size={18} />
                            </Button3D>
                        </form>
                    </SoftCard>
                </div>
            </PageTransition>
        </Layout>
    );
};

export default UserProfile;
