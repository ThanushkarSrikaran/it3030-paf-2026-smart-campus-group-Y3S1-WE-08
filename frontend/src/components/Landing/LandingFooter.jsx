import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Globe, Share2, MessageCircle, Link2, ArrowRight, Network } from 'lucide-react';

const LandingFooter = () => {
    return (
        <footer className="pt-16 pb-8 text-white relative overflow-hidden" style={{ background: 'linear-gradient(180deg,#040d24 0%,#020918 100%)', borderTop: '1px solid rgba(56,189,248,0.08)' }}>
            {/* Nebula glow */}
            <div className="absolute top-0 left-1/4 w-96 h-48 rounded-full pointer-events-none opacity-10"
                style={{ background: 'radial-gradient(circle,#7c3aed,transparent)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-0 right-1/4 w-72 h-36 rounded-full pointer-events-none opacity-10"
                style={{ background: 'radial-gradient(circle,#0ea5e9,transparent)', filter: 'blur(40px)' }} />

            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-5">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/logo.svg" alt="Smart Campus Logo" className="w-10 h-10" />
                            <span className="text-xl font-black tracking-tighter text-white">Smart Campus</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The centralized intelligence platform for modern university infrastructure, asset management, and maintenance operations.
                        </p>
                        <div className="flex gap-3">
                            {[Globe, Share2, MessageCircle, Link2, Network].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all text-slate-400 hover:text-white"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Quick Links</h4>
                        <ul className="space-y-3 text-slate-400">
                            {['Catalogue', 'Bookings', 'Operational Support', 'Documentation', 'Audit Log', 'Legal'].map(link => (
                                <li key={link} className="flex items-center gap-2 hover:text-sky-400 transition-colors group">
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    <Link to={`/${link.toLowerCase().split(' ')[0]}`} className="text-sm">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Contact Ops</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-sky-400 flex-shrink-0" />
                                <span className="text-sm">University Admin Building,<br />Operational Hub, Sector 7</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                <span className="text-sm font-mono">+1 (800) SMART-OPS</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                <span className="text-sm">support@smartcampus.edu</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Newsletter</h4>
                        <p className="mb-5 text-slate-400 text-sm">Stay updated with the latest campus news.</p>
                        <div className="flex p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <input type="email" placeholder="Your Email" className="w-full px-3 py-2 text-sm bg-transparent border-none outline-none text-white placeholder:text-slate-600" />
                            <button className="px-4 py-2 text-xs font-black rounded-lg text-white transition-all"
                                style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 mt-14 text-xs text-center text-slate-600" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p>&copy; 2026 Smart Campus Operations. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
