import { type InputHTMLAttributes, forwardRef } from 'react';

interface SoftInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const SoftInput = forwardRef<HTMLInputElement, SoftInputProps>(({ label, error, className, ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-warm-400 font-medium ml-1">{label}</label>}
            <input
                ref={ref}
                className="w-full px-4 py-3 bg-dark-600 rounded-xl shadow-soft-inset outline-none focus:ring-2 focus:ring-accent-600/50 transition-all text-warm-100 placeholder-warm-700"
                {...props}
            />
            {error && <span className="text-red-500 text-sm ml-1">{error}</span>}
        </div>
    );
});

export default SoftInput;
