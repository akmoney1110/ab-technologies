import { ArrowRight, ArrowUpRight } from "lucide-react";

const footerLinks = {
    services: [
        { label: "Hardware Procurement", href: "#services" },
        { label: "Bulk Procurement", href: "#services" },
        { label: "IT Infrastructure", href: "#services" },
        { label: "Software Development", href: "#services" },
        { label: "AI & Automation", href: "#services" },
    ],
    solutions: [
        { label: "Cloud & Hosting", href: "#" },
        { label: "Cybersecurity", href: "#" },
        { label: "CCTV & Access Control", href: "#" },
        { label: "Managed IT", href: "#" },
        { label: "Office Deployment", href: "#" },
    ],
    company: [
        { label: "About Us", href: "#about" },
        { label: "How We Work", href: "#process" },
        { label: "Contact", href: "#contact" },
        { label: "Request a Quote", href: "#contact" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-slate-50 dark:bg-[#020611]">
            {/* =========================================================
                BACKGROUND  —  LIGHT MODE GRID
            ========================================================= */}

            <div
                className="pointer-events-none absolute inset-0 block dark:hidden opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* =========================================================
                BACKGROUND  —  DARK MODE GRID
            ========================================================= */}

            <div
                className="pointer-events-none absolute inset-0 hidden dark:block opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Ambient glow */}
            <div className="pointer-events-none absolute bottom-0 left-[-150px] h-[400px] w-[400px] rounded-full bg-blue-400/5 blur-[120px] dark:bg-blue-500/[0.04]" />

            {/* Top gradient divider */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent dark:via-white/10" />

            <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-10">
                    {/* =================================================
                        BRAND COLUMN
                    ================================================= */}

                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-black text-white dark:bg-white dark:text-slate-950">
                                AB
                            </div>

                            <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                                AB TECHNOLOGIES
                            </div>
                        </div>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
                            Technology procurement, digital solutions and IT
                            infrastructure for modern organizations. From the first
                            device to complete enterprise deployment.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,.3)]"
                            >
                                Get in touch
                                <ArrowUpRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </a>
                        </div>
                    </div>

                    {/* =================================================
                        SERVICES
                    ================================================= */}

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                            Services
                        </h3>

                        <div className="mt-6 space-y-3">
                            {footerLinks.services.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                >
                                    <span className="h-1 w-1 rounded-full bg-blue-400 opacity-60 transition-opacity group-hover:opacity-100" />
                                    {link.label}
                                    <ArrowRight
                                        size={12}
                                        className="ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* =================================================
                        SOLUTIONS
                    ================================================= */}

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                            Solutions
                        </h3>

                        <div className="mt-6 space-y-3">
                            {footerLinks.solutions.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                >
                                    <span className="h-1 w-1 rounded-full bg-purple-400 opacity-60 transition-opacity group-hover:opacity-100" />
                                    {link.label}
                                    <ArrowRight
                                        size={12}
                                        className="ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* =================================================
                        COMPANY
                    ================================================= */}

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                            Company
                        </h3>

                        <div className="mt-6 space-y-3">
                            {footerLinks.company.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                >
                                    <span className="h-1 w-1 rounded-full bg-cyan-400 opacity-60 transition-opacity group-hover:opacity-100" />
                                    {link.label}
                                    <ArrowRight
                                        size={12}
                                        className="ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* =================================================
                    BOTTOM BAR
                ================================================= */}

                <div className="mt-16 border-t border-slate-200 pt-8 dark:border-white/10">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            © 2026 TECHNOVA. All rights reserved.
                        </p>

                        <p className="text-xs font-medium text-slate-400 dark:text-slate-600">
                            Technology that works for your business.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}