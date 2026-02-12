'use client';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            {children}
        </div>
    );
}
