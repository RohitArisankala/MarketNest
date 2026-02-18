import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import SoftCard from '../../components/ui/SoftCard';
import PageTransition from '../../components/ui/PageTransition';
import { StaggerParent, StaggerChild } from '../../components/ui/StaggerReveal';
import Button3D from '../../components/ui/Button3D';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Package, Edit2, Trash2 } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    category: string;
    createdAt: string;
}

const API_BASE = 'http://localhost:5000';

const BrandDashboard = () => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products/mine');
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(prev => prev.filter(p => p._id !== id));
            showToast(`"${name}" has been deleted`, 'info');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Delete failed', 'error');
        }
    };

    const getImageSrc = (url: string) => {
        if (url.startsWith('/uploads/')) return `${API_BASE}${url}`;
        return url;
    };

    return (
        <Layout>
            <PageTransition>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-brown-100"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>
                            Brand Dashboard
                        </h1>
                        <p className="text-brown-400 mt-1">Welcome back, {user?.name}</p>
                    </div>
                    <Link to="/brand/product/new">
                        <Button3D className="flex items-center gap-2">
                            <Plus size={18} /> Add Product
                        </Button3D>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <SoftCard className="text-center p-6">
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#d44a4a' }}>{products.length}</p>
                        <p style={{ color: '#8e6f5a', fontSize: 14 }}>Total Products</p>
                    </SoftCard>
                    <SoftCard className="text-center p-6">
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#d44a4a' }}>
                            {new Set(products.map(p => p.category).filter(Boolean)).size}
                        </p>
                        <p style={{ color: '#8e6f5a', fontSize: 14 }}>Categories</p>
                    </SoftCard>
                    <SoftCard className="text-center p-6">
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#d44a4a' }}>
                            {products.length > 0 ? `₹${Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)}` : '₹0'}
                        </p>
                        <p style={{ color: '#8e6f5a', fontSize: 14 }}>Avg Price</p>
                    </SoftCard>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full"
                        />
                    </div>
                ) : products.length === 0 ? (
                    <SoftCard className="text-center py-16">
                        <Package size={48} style={{ color: '#4a372e', margin: '0 auto 16px' }} />
                        <p className="text-brown-400 text-lg mb-2">No products yet</p>
                        <p className="text-brown-600 text-sm mb-6">Start by adding your first product to the marketplace</p>
                        <Link to="/brand/product/new">
                            <Button3D className="flex items-center gap-2 mx-auto">
                                <Plus size={18} /> Add Your First Product
                            </Button3D>
                        </Link>
                    </SoftCard>
                ) : (
                    <StaggerParent className="space-y-4">
                        {products.map((product, idx) => (
                            <StaggerChild key={product._id} index={idx}>

                                <SoftCard className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-dark-700 shrink-0"
                                        style={{ boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.3)' }}>
                                        <img
                                            src={getImageSrc(product.imageUrl)}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1a1210/d4b89e?text=?'; }}
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 style={{ fontWeight: 700, color: '#f5ebe3', marginBottom: 2 }} className="truncate">{product.name}</h3>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span style={{ color: '#d44a4a', fontWeight: 700 }}>₹{product.price}</span>
                                            {product.category && product.category !== 'Uncategorized' && (
                                                <span style={{ color: '#6b5243', fontSize: 12, backgroundColor: 'rgba(255,255,255,0.04)', padding: '2px 10px', borderRadius: 999 }}>{product.category}</span>
                                            )}
                                            <span style={{ color: '#4a372e', fontSize: 12 }}>
                                                {new Date(product.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link to={`/brand/product/${product._id}/edit`}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: 12,
                                                backgroundColor: 'rgba(212, 184, 158, 0.1)',
                                                color: '#d4b89e',
                                                fontSize: 13,
                                                fontWeight: 500,
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                transition: 'background-color 0.2s',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212, 184, 158, 0.2)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212, 184, 158, 0.1)')}
                                        >
                                            <Edit2 size={14} /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id, product.name)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: 12,
                                                backgroundColor: 'rgba(232, 107, 107, 0.1)',
                                                color: '#e86b6b',
                                                fontSize: 13,
                                                fontWeight: 500,
                                                border: 'none',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                transition: 'background-color 0.2s',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(232, 107, 107, 0.2)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(232, 107, 107, 0.1)')}
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </SoftCard>
                            </StaggerChild>
                        ))}
                    </StaggerParent>
                )}
            </PageTransition>
        </Layout>
    );
};

export default BrandDashboard;
