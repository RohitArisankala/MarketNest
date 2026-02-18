import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import SoftCard from '../../components/ui/SoftCard';
import PageTransition from '../../components/ui/PageTransition';
import { StaggerParent, StaggerChild } from '../../components/ui/StaggerReveal';
import api from '../../utils/api';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    category: string;
    brand?: { name: string };
}

const categories = ['All', 'Men', 'Women', 'Accessories', 'Footwear'];

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Marketplace = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    // Read state from URL
    const page = parseInt(searchParams.get('page') || '1', 10);
    const activeCategory = searchParams.get('category') || 'All';
    const searchQuery = searchParams.get('q') || '';

    // Local input state for debounce
    const [inputValue, setInputValue] = useState(searchQuery);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Update URL params helper
    const updateParams = useCallback((updates: Record<string, string>) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            Object.entries(updates).forEach(([k, v]) => {
                if (!v || v === 'All' || v === '1') next.delete(k);
                else next.set(k, v);
            });
            return next;
        });
    }, [setSearchParams]);

    // Debounced search
    const handleSearchChange = (value: string) => {
        setInputValue(value);
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            updateParams({ q: value, page: '1' });
        }, 400);
    };

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params: any = { page, limit: 12 };
                if (activeCategory !== 'All') params.category = activeCategory;
                if (searchQuery) params.search = searchQuery;
                const { data } = await api.get('/products', { params });
                setProducts(data.products);
                setTotalPages(data.pages);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, activeCategory, searchQuery]);

    // Sync input value when URL changes externally
    useEffect(() => { setInputValue(searchQuery); }, [searchQuery]);

    const getImageSrc = (url: string) => url?.startsWith('/uploads/') ? `${API_BASE}${url}` : url;

    return (
        <Layout>
            <PageTransition>
                {/* Header */}
                <div className="mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold mb-2"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#f5ebe3' }}
                    >
                        Marketplace
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        style={{ color: '#8e6f5a', fontSize: 15 }}
                    >
                        Discover curated fashion from independent brands
                    </motion.p>
                </div>

                {/* Search + Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-grow">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#6b5243' }} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={inputValue}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-dark-600 rounded-xl shadow-soft-inset outline-none focus:ring-2 focus:ring-accent-600/50 transition-all text-warm-100 placeholder-warm-700"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <SlidersHorizontal size={16} style={{ color: '#6b5243' }} />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => updateParams({ category: cat, page: '1' })}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 999,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    backgroundColor: activeCategory === cat ? '#d44a4a' : 'rgba(255,255,255,0.05)',
                                    color: activeCategory === cat ? '#fff' : '#8e6f5a',
                                    boxShadow: activeCategory === cat ? '0 4px 12px rgba(184, 50, 50, 0.3)' : 'none',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Product Grid */}
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
                        <p style={{ color: '#8e6f5a', fontSize: 18 }}>No products found</p>
                        <p style={{ color: '#4a372e', fontSize: 14, marginTop: 4 }}>Try adjusting your filters or search</p>
                    </SoftCard>
                ) : (
                    <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {products.map((product, idx) => (
                            <StaggerChild key={product._id} index={idx}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                    <SoftCard hoverEffect hoverGlow className="p-0 overflow-hidden group">
                                        {/* Image */}
                                        <div className="relative overflow-hidden" style={{ height: 220, backgroundColor: '#120c0a' }}>
                                            <motion.img
                                                src={getImageSrc(product.imageUrl)}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                whileHover={{ scale: 1.08 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/1a1210/d4b89e?text=No+Image'; }}
                                            />
                                            {/* Category badge */}
                                            {product.category && product.category !== 'Uncategorized' && (
                                                <span style={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    padding: '4px 10px',
                                                    borderRadius: 999,
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                                    color: '#d4b89e',
                                                    backdropFilter: 'blur(8px)',
                                                    letterSpacing: '0.03em',
                                                }}>
                                                    {product.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="p-4">
                                            <h3 className="font-bold truncate" style={{ color: '#f5ebe3', fontSize: 15, marginBottom: 4 }}>
                                                {product.name}
                                            </h3>
                                            <p className="line-clamp-2" style={{ color: '#6b5243', fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span style={{ color: '#d44a4a', fontWeight: 800, fontSize: 16 }}>₹{product.price}</span>
                                                {product.brand && (
                                                    <span style={{ color: '#8e6f5a', fontSize: 11, fontWeight: 500 }}>
                                                        by {product.brand.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </SoftCard>
                                </Link>
                            </StaggerChild>
                        ))}
                    </StaggerParent>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center items-center gap-3 mt-10"
                    >
                        <button
                            onClick={() => updateParams({ page: String(Math.max(1, page - 1)) })}
                            disabled={page <= 1}
                            style={{
                                padding: '10px 14px',
                                borderRadius: 12,
                                border: 'none',
                                cursor: page <= 1 ? 'not-allowed' : 'pointer',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                color: page <= 1 ? '#4a372e' : '#d4b89e',
                                opacity: page <= 1 ? 0.5 : 1,
                                transition: 'all 0.2s',
                            }}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => updateParams({ page: String(p) })}
                                style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: 10,
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: 14,
                                    transition: 'all 0.2s',
                                    backgroundColor: p === page ? '#d44a4a' : 'rgba(255,255,255,0.05)',
                                    color: p === page ? '#fff' : '#8e6f5a',
                                    boxShadow: p === page ? '0 4px 12px rgba(184, 50, 50, 0.3)' : 'none',
                                }}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => updateParams({ page: String(Math.min(totalPages, page + 1)) })}
                            disabled={page >= totalPages}
                            style={{
                                padding: '10px 14px',
                                borderRadius: 12,
                                border: 'none',
                                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                color: page >= totalPages ? '#4a372e' : '#d4b89e',
                                opacity: page >= totalPages ? 0.5 : 1,
                                transition: 'all 0.2s',
                            }}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </motion.div>
                )}
            </PageTransition>
        </Layout>
    );
};

export default Marketplace;
