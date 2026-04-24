import React from 'react';
import Navbar from '../components/Navbar';
import { Search } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex overflow-hidden font-sans" style={{ background: '#000814' }}>
            <Navbar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="h-20 flex items-center px-4 md:px-8 justify-between sticky top-0 z-30 border-b border-white/5"
                    style={{ background: 'rgba(0, 8, 20, 0.85)', backdropFilter: 'blur(12px)' }}>
                    <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-sky-400 mr-2 animate-pulse" />
                        Operations Center Active
                    </div>
                    <div className="relative w-full max-w-xs ml-auto">
                        <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search system..."
                            className="w-full pl-11 pr-4 py-3 rounded-full text-xs font-bold text-slate-300 outline-none transition-all"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                            onFocus={e => e.target.style.borderColor = 'rgba(56,189,248,0.4)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto w-full">
                    <div className="pb-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
