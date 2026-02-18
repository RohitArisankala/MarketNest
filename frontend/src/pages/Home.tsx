import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button3D from '../components/ui/Button3D';
import SoftCard from '../components/ui/SoftCard';
import PageTransition from '../components/ui/PageTransition';
import { StaggerParent, StaggerChild } from '../components/ui/StaggerReveal';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { IconSparkles, IconShield, IconTruck, IconHeart } from '../components/ui/GradientIcons';
import { useAuth } from '../context/AuthContext';

const featureCards = [
    {
        icon: <IconSparkles size={24} />,
        title: "Curated Fashion",
        desc: "Discover handpicked collections from top brands, all in one place.",
        color: '#d44a4a',
    },
    {
        icon: <IconShield size={24} />,
        title: "Trusted Brands",
        desc: "Every seller is verified. Shop with confidence knowing quality is guaranteed.",
        color: '#d44a4a',
    },
    {
        icon: <IconTruck size={24} />,
        title: "Seamless Experience",
        desc: "Browse, discover, and connect with brands effortlessly.",
        color: '#d44a4a',
    },
    {
        icon: <IconHeart size={24} />,
        title: "Made for You",
        desc: "A personalized marketplace experience tailored to your unique style.",
        color: '#d44a4a',
    },
];

const Home = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <PageTransition>
                <section className="min-h-[85vh] flex flex-col items-start justify-center gap-8">
                    <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

                        {/* Left: Hero text */}
                        <motion.div
                            className="flex-1 max-w-xl"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
                                style={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontStyle: 'italic',
                                    fontWeight: 700,
                                    color: '#f5ebe3',
                                }}
                            >
                                Fashion finds{' '}
                                <br className="hidden sm:block" />
                                its home,{' '}
                                <br className="hidden sm:block" />
                                <span style={{ color: '#d44a4a' }}>discover your</span>{' '}
                                <br className="hidden sm:block" />
                                <span style={{ color: '#d44a4a' }}>next look.</span>
                            </h1>

                            <motion.p
                                className="text-base md:text-lg max-w-md mb-8 leading-relaxed"
                                style={{ color: '#8e6f5a' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <span style={{ fontWeight: 600, color: '#d4b89e' }}>MarketNest</span> brings together
                                the best fashion brands and style-conscious shoppers in one{' '}
                                <span style={{ fontWeight: 600, color: '#d4b89e', textDecoration: 'underline', textDecorationColor: 'rgba(212,186,158,0.3)' }}>curated marketplace</span>.
                            </motion.p>

                            {/* Accent bar */}
                            <motion.div
                                className="flex items-start gap-4 mb-10"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <div style={{ width: 3, minHeight: 48, backgroundColor: '#d44a4a', borderRadius: 2, marginTop: 2 }} />
                                <p style={{ color: '#8e6f5a', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    <span style={{ fontStyle: 'italic', color: '#d4b89e' }}>Are you a brand?</span> Create your storefront,{' '}
                                    upload products, and reach thousands of shoppers.{' '}
                                    <span style={{ color: '#d44a4a', fontWeight: 600 }}>Join as a Brand today.</span>
                                </p>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Link to="/marketplace">
                                    <Button3D className="flex items-center gap-2 text-lg px-8 py-4">
                                        Explore <ArrowRight size={20} />
                                    </Button3D>
                                </Link>

                                {user ? (
                                    <>
                                        {user.role === 'brand' ? (
                                            <Link to="/brand/dashboard">
                                                <Button3D variant="secondary" className="flex items-center gap-2 text-lg px-8 py-4">
                                                    Dashboard <LayoutDashboard size={20} />
                                                </Button3D>
                                            </Link>
                                        ) : (
                                            <Link to="/profile">
                                                <Button3D variant="secondary" className="flex items-center gap-2 text-lg px-8 py-4">
                                                    My Profile <ArrowRight size={20} />
                                                </Button3D>
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex gap-4">
                                        <Link to="/register">
                                            <Button3D variant="secondary" className="flex items-center gap-2 text-lg px-8 py-4">
                                                Get Started <ArrowRight size={20} />
                                            </Button3D>
                                        </Link>
                                        <Link to="/login">
                                            <Button3D className="flex items-center gap-2 text-lg px-8 py-4 bg-transparent border border-warm-200/20 hover:bg-warm-200/10">
                                                Login
                                            </Button3D>
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Right: Feature Cards */}
                        <StaggerParent className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {featureCards.map((card, idx) => (
                                <StaggerChild key={idx} index={idx}>
                                    <SoftCard hoverEffect hoverGlow className="flex flex-col gap-3 p-6 h-full">
                                        <div
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: '12px',
                                                backgroundColor: 'rgba(184, 50, 50, 0.12)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: card.color,
                                                marginBottom: 4,
                                            }}
                                        >
                                            {card.icon}
                                        </div>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            color: '#f5ebe3',
                                            marginBottom: 2,
                                        }}>
                                            {card.title}
                                        </h3>
                                        <p style={{
                                            color: '#8e6f5a',
                                            fontSize: '0.88rem',
                                            lineHeight: 1.5,
                                        }}>
                                            {card.desc}
                                        </p>
                                    </SoftCard>
                                </StaggerChild>
                            ))}
                        </StaggerParent>
                    </div>
                </section>
            </PageTransition>
        </Layout>
    );
};

export default Home;
