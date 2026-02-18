import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import SoftCard from '../../components/ui/SoftCard';
import SoftInput from '../../components/ui/SoftInput';
import Button3D from '../../components/ui/Button3D';
import PageTransition from '../../components/ui/PageTransition';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import { Upload, Save, ArrowLeft, Image } from 'lucide-react';

const categories = ['Uncategorized', 'Men', 'Women', 'Accessories', 'Footwear'];

const API_BASE = 'http://localhost:5000';

const CreateEditProduct = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchProduct = async () => {
                try {
                    const { data } = await api.get(`/products/${id}`);
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(String(data.price));
                    setCategory(data.category || 'Uncategorized');
                    if (data.imageUrl) {
                        setImagePreview(
                            data.imageUrl.startsWith('/uploads/')
                                ? `${API_BASE}${data.imageUrl}`
                                : data.imageUrl
                        );
                    }
                } catch (err: any) {
                    showToast('Failed to load product', 'error');
                    navigate('/brand/dashboard');
                } finally {
                    setFetching(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast('Image must be under 5MB', 'error');
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description || !price) {
            showToast('Please fill all required fields', 'error');
            return;
        }
        if (!isEdit && !imageFile) {
            showToast('Please upload a product image', 'error');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (isEdit) {
                await api.put(`/products/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                showToast('Product updated successfully!', 'info');
            } else {
                await api.post('/products', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                showToast('Product created successfully!', 'info');
            }
            navigate('/brand/dashboard');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Operation failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
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

    return (
        <Layout>
            <PageTransition>
                <button
                    onClick={() => navigate('/brand/dashboard')}
                    className="inline-flex items-center gap-2 mb-6 transition-colors"
                    style={{ color: '#d4b89e', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-brown-100 mb-8"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>
                        {isEdit ? 'Edit Product' : 'New Product'}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <SoftCard className="relative">
                            <label style={{ color: '#d4b89e', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                                Product Image {!isEdit && '*'}
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer group"
                                style={{
                                    border: '2px dashed rgba(255,255,255,0.08)',
                                    borderRadius: 16,
                                    padding: imagePreview ? 0 : 40,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: 200,
                                    overflow: 'hidden',
                                    backgroundColor: 'rgba(18, 12, 10, 0.4)',
                                    transition: 'border-color 0.2s',
                                    position: 'relative',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(212, 74, 74, 0.4)')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                            >
                                {imagePreview ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-64 object-cover"
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.2s',
                                        }}
                                            className="group-hover:!opacity-100"
                                        >
                                            <span style={{ color: '#fff', fontWeight: 600 }}>Click to change</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Image size={40} style={{ color: '#4a372e', marginBottom: 12 }} />
                                        <p style={{ color: '#8e6f5a', fontSize: 14 }}>Click to upload an image</p>
                                        <p style={{ color: '#4a372e', fontSize: 12, marginTop: 4 }}>JPG, PNG, or WebP (max 5MB)</p>
                                    </>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </SoftCard>

                        <SoftInput
                            type="text"
                            label="Product Name *"
                            placeholder="e.g. Luxury Silk Blazer"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <div>
                            <label style={{ color: '#d4b89e', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                                Description *
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your product in detail..."
                                required
                                rows={5}
                                className="w-full px-5 py-4 bg-dark-600 rounded-xl shadow-soft-inset outline-none focus:ring-2 focus:ring-accent-600/50 transition-all text-warm-100 placeholder-warm-700 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <SoftInput
                                type="number"
                                label="Price (₹) *"
                                placeholder="999"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />

                            <div>
                                <label style={{ color: '#d4b89e', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-5 py-4 bg-dark-600 rounded-xl shadow-soft-inset outline-none focus:ring-2 focus:ring-accent-600/50 transition-all text-warm-100"
                                    style={{ appearance: 'none' }}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button3D className="flex items-center gap-2 flex-1 justify-center" disabled={loading}>
                                {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                                {isEdit ? <Save size={18} /> : <Upload size={18} />}
                            </Button3D>
                        </div>
                    </form>
                </div>
            </PageTransition>
        </Layout>
    );
};

export default CreateEditProduct;
