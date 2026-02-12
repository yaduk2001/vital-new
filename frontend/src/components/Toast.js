import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    className="fixed top-24 right-4 md:right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 min-w-[300px]"
                    style={{
                        background: type === 'success'
                            ? 'linear-gradient(to right, rgba(6, 182, 212, 0.9), rgba(59, 130, 246, 0.9))'
                            : 'linear-gradient(to right, rgba(239, 68, 68, 0.9), rgba(185, 28, 28, 0.9))'
                    }}
                >
                    <div className="text-white text-xl">
                        {type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                    </div>

                    <div className="flex-1">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                            {type === 'success' ? 'Success' : 'Error'}
                        </h4>
                        <p className="text-white/90 text-sm font-medium">{message}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
