import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import SoftCard from '../../components/ui/SoftCard';
import PageTransition from '../../components/ui/PageTransition';
import api from '../../utils/api';
import { ArrowLeft, Calendar, Tag, Store } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    category: string;
    brand: { _id: string; name: string };
    createdAt: string;
}

const API_BASE = 'http://localhost:5000';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const getImageSrc = (url: string) => {
        if (url.startsWith('/uploads/')) return `${API_BASE}${url}`;
        return url;
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center py-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full"
                    />
                </div>
            </Layout>
        );
    }

    if (error || !product) {
        return (
            <Layout>
                <SoftCard className="text-center py-16 max-w-xl mx-auto">
                    <p className="text-red-400 text-lg mb-4">{error || 'Product not found'}</p>
                    <Link to="/marketplace" style={{ color: '#d44a4a', fontWeight: 600 }}>← Back to Marketplace</Link>
                </SoftCard>
            </Layout>
        );
    }

    return (
        <Layout>
            <PageTransition>
                <Link
                    to="/marketplace"
                    className="inline-flex items-center gap-2 mb-6 transition-colors"
                    style={{ color: '#d4b89e', textDecoration: 'none', fontSize: 14 }}
                >
                    <ArrowLeft size={16} /> Back to Marketplace
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="rounded-2xl overflow-hidden bg-dark-700"
                            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)', aspectRatio: '1/1' }}>
                            <img
                                src={getImageSrc(product.imageUrl)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1210/d4b89e?text=No+Image'; }}
                            />
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        {product.category && product.category !== 'Uncategorized' && (
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '6px 14px',
                                borderRadius: 999,
                                fontSize: 12,
                                fontWeight: 600,
                                backgroundColor: 'rgba(184, 50, 50, 0.12)',
                                color: '#d44a4a',
                                width: 'fit-content',
                                marginBottom: 16,
                            }}>
                                <Tag size={12} /> {product.category}
                            </span>
                        )}

                        <h1 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: '#f5ebe3',
                            marginBottom: 8,
                            lineHeight: 1.2,
                        }}>
                            {product.name}
                        </h1>

                        <p style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#d44a4a',
                            marginBottom: 24,
                        }}>
                            ₹{product.price}
                        </p>

                        <SoftCard className="mb-6">
                            <h3 style={{ color: '#d4b89e', fontWeight: 600, marginBottom: 8 }}>Description</h3>
                            <p style={{ color: '#8e6f5a', lineHeight: 1.7 }}>{product.description}</p>
                        </SoftCard>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3" style={{ color: '#8e6f5a', fontSize: 14 }}>
                                <Store size={16} style={{ color: '#d44a4a' }} />
                                <span>Sold by <span style={{ color: '#d4b89e', fontWeight: 600 }}>{product.brand?.name || 'Unknown Brand'}</span></span>
                            </div>
                            <div className="flex items-center gap-3" style={{ color: '#8e6f5a', fontSize: 14 }}>
                                <Calendar size={16} style={{ color: '#d44a4a' }} />
                                <span>Listed on {new Date(product.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </PageTransition>
        </Layout>
    );
};

export default ProductDetail;
