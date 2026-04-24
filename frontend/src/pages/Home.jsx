import React, { useEffect, useRef } from 'react';
import { ArrowRight, Laptop, UserCheck, Zap, Users, Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpaceCanvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);
        const stars = Array.from({ length: 220 }, () => ({
            x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.2,
            base: Math.random(), ts: Math.random() * 0.015 + 0.004, to: Math.random() * Math.PI * 2,
        }));
        const shoots = [];
        const spawnShoot = () => shoots.push({
            x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.4,
            len: Math.random() * 90 + 50, speed: Math.random() * 6 + 4,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3, life: 0, max: 55,
        });
        let frame = 0;
        const draw = () => {
            const w = canvas.width, h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            const bg = ctx.createLinearGradient(0, 0, w, h);
            bg.addColorStop(0, '#00040f'); bg.addColorStop(0.5, '#020a1a'); bg.addColorStop(1, '#010208');
            ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
            const neb1 = ctx.createRadialGradient(w * 0.78, h * 0.25, 0, w * 0.78, h * 0.25, w * 0.38);
            neb1.addColorStop(0, 'rgba(88,28,220,0.18)'); neb1.addColorStop(0.5, 'rgba(59,90,246,0.09)'); neb1.addColorStop(1, 'transparent');
            ctx.fillStyle = neb1; ctx.fillRect(0, 0, w, h);
            const neb2 = ctx.createRadialGradient(w * 0.15, h * 0.7, 0, w * 0.15, h * 0.7, w * 0.3);
            neb2.addColorStop(0, 'rgba(6,182,212,0.1)'); neb2.addColorStop(1, 'transparent');
            ctx.fillStyle = neb2; ctx.fillRect(0, 0, w, h);
            stars.forEach(s => {
                const tw = Math.sin(frame * s.ts + s.to) * 0.35 + 0.65;
                ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.base * tw})`; ctx.fill();
            });
            if (frame % 110 === 0 && shoots.length < 4) spawnShoot();
            for (let i = shoots.length - 1; i >= 0; i--) {
                const s = shoots[i];
                const nx = s.x * w + Math.cos(s.angle) * s.speed, ny = s.y * h + Math.sin(s.angle) * s.speed;
                s.x = nx / w; s.y = ny / h; s.life++;
                const t = s.life / s.max, op = t < 0.2 ? t / 0.2 : t > 0.65 ? (1 - t) / 0.35 : 1;
                const g = ctx.createLinearGradient(nx, ny, nx - Math.cos(s.angle) * s.len, ny - Math.sin(s.angle) * s.len);
                g.addColorStop(0, `rgba(255,255,255,${op})`); g.addColorStop(0.4, `rgba(180,210,255,${op * 0.5})`); g.addColorStop(1, 'transparent');
                ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nx - Math.cos(s.angle) * s.len, ny - Math.sin(s.angle) * s.len);
                ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
                if (s.life >= s.max) shoots.splice(i, 1);
            }
            frame++; animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const Home = () => {
    return (
        <div className="flex flex-col" style={{ background: '#000814' }}>

            {/* ── Hero ── */}
            <section className="relative h-[680px] w-full flex items-center overflow-hidden bg-black">
                <SpaceCanvas />
                {/* Planet decoration */}
                <div className="absolute right-[6%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block select-none">
                    <div className="relative w-72 h-72">
                        <div className="absolute inset-0 rounded-full opacity-10 blur-3xl scale-150" style={{ background: 'radial-gradient(circle,#2563eb,transparent)' }} />
                        <div className="absolute inset-14 rounded-full shadow-2xl" style={{ background: 'radial-gradient(circle at 35% 35%,#60a5fa,#1d4ed8 50%,#1e1b4b)', boxShadow: '0 0 60px rgba(96,165,250,0.4)' }}>
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%,rgba(255,255,255,0.12) 0%,transparent 60%)' }} />
                        </div>
                        <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(56,189,248,0.25)', animation: 'spin 14s linear infinite' }}>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-sky-300" style={{ boxShadow: '0 0 10px #7dd3fc' }} />
                        </div>
                        <div className="absolute inset-5 rounded-full" style={{ border: '1px solid rgba(167,139,250,0.2)', animation: 'spin 22s linear infinite reverse', transform: 'rotateX(68deg)' }}>
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-300" style={{ boxShadow: '0 0 8px #c4b5fd' }} />
                        </div>
                        <div className="absolute inset-2 rounded-full" style={{ border: '1px solid transparent', animation: 'spin 9s linear infinite' }}>
                            <div className="absolute bottom-0 right-4 w-4 h-4 rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%,#e2e8f0,#94a3b8)' }} />
                        </div>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                    <div className="max-w-2xl text-white">
                        <span className="inline-flex items-center gap-2 text-sky-400 font-bold uppercase tracking-widest text-xs mb-5">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                            UNIVERSITY MODERNIZATION PORTAL
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
                            Smart<br />
                            <span style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Campus</span>
                        </h1>
                        <p className="text-base text-slate-300 mb-10 leading-relaxed max-w-md">
                            A unified platform to manage facilities, asset bookings, and real-time maintenance handling with full auditability and role-based control.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/catalogue" className="flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white transition-all group" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)', boxShadow: '0 0 30px rgba(37,99,235,0.35)' }}>
                                Manage Assets <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="border border-white/20 hover:border-sky-400/60 hover:text-sky-300 text-white px-8 py-3.5 rounded-lg font-bold transition-all" style={{ backdropFilter: 'blur(8px)' }}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(to bottom,transparent,#000814)' }} />
            </section>

            {/* ── Feature Cards ── */}
            <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-2 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Facility Catalogue', desc: 'Full visibility into lecture halls, labs, and equipment with capacity and status tracking.', icon: Laptop, color: 'from-sky-500/20 to-blue-600/10', border: 'rgba(56,189,248,0.2)' },
                        { title: 'Operational Bookings', desc: 'Seamless reservation workflow for campus assets with conflict resolution and role-based access.', icon: UserCheck, color: 'from-violet-500/20 to-purple-600/10', border: 'rgba(167,139,250,0.2)' },
                        { title: 'Maintenance Hub', desc: 'Incident reporting, fault management, and technician updates with clear resolution tracking.', icon: Zap, color: 'from-cyan-500/20 to-teal-600/10', border: 'rgba(6,182,212,0.2)' },
                    ].map((f, i) => (
                        <div key={i} className={`p-8 rounded-2xl group hover:-translate-y-1 transition-all duration-300`}
                            style={{ background: `linear-gradient(135deg,rgba(10,20,50,0.9),rgba(5,10,30,0.95))`, border: `1px solid ${f.border}`, backdropFilter: 'blur(12px)' }}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform bg-gradient-to-br ${f.color}`}
                                style={{ border: `1px solid ${f.border}` }}>
                                <f.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-5">{f.desc}</p>
                            <Link to="/catalogue" className="text-sm font-bold text-sky-400 flex items-center gap-1 hover:text-sky-300 transition-colors">
                                Open Module <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── About / Mission ── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                {/* Space image 1 — nebula */}
                                <div className="rounded-2xl overflow-hidden w-full h-64 relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80&auto=format&fit=crop"
                                        alt="Space nebula"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,8,20,0.5),transparent)' }} />
                                </div>
                                {/* Stat card */}
                                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg,#0a1628,#060f24)', border: '1px solid rgba(56,189,248,0.15)' }}>
                                    <Star className="w-10 h-10 mb-3 text-sky-400" />
                                    <h4 className="text-3xl font-black text-white">100%</h4>
                                    <p className="text-sm font-medium text-slate-400 mt-1">Auditable Tracking</p>
                                </div>
                            </div>
                            <div className="pt-12">
                                {/* Space image 2 — galaxy */}
                                <div className="rounded-2xl overflow-hidden w-full h-[400px] relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80&auto=format&fit=crop"
                                        alt="Galaxy"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,8,20,0.5),transparent)' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-sky-400 font-bold uppercase tracking-widest text-sm">Our Mission</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 leading-tight">
                                Streamlining Campus<br />
                                Infrastructure <span style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Operations</span>
                            </h2>
                            <p className="text-slate-400 mt-6 leading-relaxed">
                                Our platform provides a comprehensive backbone for university operations, ensuring that every facility and asset is utilized efficiently and maintained properly.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {['Clear role-based access control', 'Automated booking workflows', 'End-to-end maintenance tracking'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
                                        <svg className="w-3 h-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-slate-200">{item}</span>
                                </div>
                            ))}
                        </div>
                        <Link to="/login" className="inline-block px-8 py-4 rounded-xl font-bold text-white transition-all" style={{ background: 'linear-gradient(135deg,#1d4ed8,#6d28d9)', boxShadow: '0 0 30px rgba(109,40,217,0.3)' }}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#020918,#040d24)' }}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 w-96 h-32 opacity-10 -translate-x-1/2" style={{ background: 'radial-gradient(ellipse,#7c3aed,transparent)', filter: 'blur(30px)' }} />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Facilities Tracked', value: '250+', icon: Laptop, glow: '#38bdf8' },
                            { label: 'Monthly Bookings', value: '1,200+', icon: UserCheck, glow: '#818cf8' },
                            { label: 'Active Technicians', value: '15+', icon: Users, glow: '#a78bfa' },
                            { label: 'Issue Resolution', value: '98%', icon: Trophy, glow: '#34d399' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-6 rounded-2xl transition-all hover:-translate-y-1 duration-300"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                                    style={{ background: `rgba(${stat.glow === '#38bdf8' ? '56,189,248' : stat.glow === '#818cf8' ? '129,140,248' : stat.glow === '#a78bfa' ? '167,139,250' : '52,211,153'},0.1)`, border: `1px solid ${stat.glow}30` }}>
                                    <stat.icon className="w-5 h-5" style={{ color: stat.glow }} />
                                </div>
                                <h4 className="text-4xl font-black text-white mb-2" style={{ textShadow: `0 0 20px ${stat.glow}50` }}>{stat.value}</h4>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
