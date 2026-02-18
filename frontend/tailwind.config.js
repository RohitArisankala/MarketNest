/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Deep dark backgrounds
                dark: {
                    50: '#f5f0ed',
                    100: '#3d3330',
                    200: '#2e2523',
                    300: '#251d1b',
                    400: '#1c1513',
                    500: '#16100e',
                    600: '#110c0a',
                    700: '#0d0907',
                    800: '#0a0705',
                    900: '#070503',
                    950: '#030201',
                },
                // Warm cream/beige for text and accents
                warm: {
                    50: '#fdf8f4',
                    100: '#f5ebe3',
                    200: '#e8d5c4',
                    300: '#d4b89e',
                    400: '#c9a88e',
                    500: '#b08d73',
                    600: '#8e6f5a',
                    700: '#6b5243',
                    800: '#4a372e',
                    900: '#2e221b',
                },
                // Muted crimson/red accent
                accent: {
                    50: '#fef2f2',
                    100: '#fde3e3',
                    200: '#fbc8c8',
                    300: '#f5a0a0',
                    400: '#e86b6b',
                    500: '#d44a4a',
                    600: '#b83232',
                    700: '#9a2626',
                    800: '#7f2222',
                    900: '#6a2121',
                },
                // Keep brown for backward compatibility
                brown: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e0cec7',
                    400: '#d2bab0',
                    500: '#9f857b',
                    600: '#7d625b',
                    700: '#604850',
                    800: '#48353d',
                    900: '#34262d',
                },
                // Keep emerald for backward compatibility on inner pages
                emerald: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                soft: {
                    bg: '#16100e',
                    light: '#f5ebe3',
                    dark: '#070503',
                },
            },
            boxShadow: {
                'soft': '0 4px 14px rgba(0, 0, 0, 0.4)',
                'soft-hover': '0 8px 28px rgba(0, 0, 0, 0.5)',
                'soft-inset': 'inset 0 2px 8px rgba(0, 0, 0, 0.4)',
                'soft-xxl': '0 14px 44px rgba(0, 0, 0, 0.6)',
                '3d': '0 6px 18px rgba(0, 0, 0, 0.5)',
                '3d-active': 'inset 0 3px 8px rgba(0, 0, 0, 0.6)',
                'card-glow': '0 0 30px rgba(184, 50, 50, 0.08)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
