import React from 'react';

const PageHeader = ({ title, description, actions }) => {
    return (
        <header className="mb-10 rounded-3xl p-8 border border-white/5 shadow-xl overflow-hidden relative group min-h-[160px] flex flex-col justify-center">
            {/* Space gradient background */}
            <div className="absolute inset-0 z-0"
                style={{ background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1b4b 45%, #1a0533 100%)' }} />

            {/* Nebula glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
                <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }} />
            </div>

            {/* Star dots */}
            {[...Array(18)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white pointer-events-none"
                    style={{
                        width: Math.random() * 2 + 1,
                        height: Math.random() * 2 + 1,
                        top: `${10 + i * 5}%`,
                        left: `${(i * 37 + 7) % 90 + 5}%`,
                        opacity: 0.3 + (i % 3) * 0.2,
                    }} />
            ))}

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-[10px] font-bold text-sky-300">SC</div>
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Operations Center</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-3 italic text-white drop-shadow-lg">{title}</h1>
                    <p className="text-blue-200/80 text-lg leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
                {actions && (
                    <div className="flex-shrink-0 relative z-20">
                        {actions}
                    </div>
                )}
            </div>
        </header>
    );
};

export default PageHeader;
