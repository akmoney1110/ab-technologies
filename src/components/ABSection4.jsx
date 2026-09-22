import React, { useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    Boxes,
    Building2,
    CheckCircle2,
    Cloud,
    Code2,
    Cpu,
    GraduationCap,
    Laptop,
    Network,
    PackageCheck,
    Rocket,
    ShieldCheck,
    Sparkles,
    Users,
    Wrench,
    Zap,
    Bot,
    LayoutDashboard,
    Terminal,
    Award,
    TrendingUp,
    Globe,
    Layers,
    Play,
    Star,
    CircleDot,
} from "lucide-react";

export default function ABTechnologyServices() {
    const sectionRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const [visibleItems, setVisibleItems] = useState(new Set());

    // Auto-cycle deployment steps only when motion is allowed.
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return undefined;

        const interval = setInterval(() => {
            if (!document.hidden) {
                setActiveStep((prev) => (prev + 1) % 6);
            }
        }, 3200);

        return () => clearInterval(interval);
    }, []);

    // Reveal each card once, scoped to this section only.
    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return undefined;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const items = root.querySelectorAll("[data-id]");

        if (reduceMotion || !("IntersectionObserver" in window)) {
            setVisibleItems(new Set(Array.from(items, (el) => el.dataset.id)));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const id = entry.target.dataset.id;
                    setVisibleItems((prev) => {
                        if (prev.has(id)) return prev;
                        const next = new Set(prev);
                        next.add(id);
                        return next;
                    });
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.08, rootMargin: "120px 0px" }
        );

        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const procurementItems = [
        "Laptops & Desktops",
        "Servers",
        "Networking Equipment",
        "Printers & Accessories",
        "Security Equipment",
        "Business Software",
    ];

    const softwareItems = [
        { name: "Web Applications", icon: Globe },
        { name: "Mobile Applications", icon: Layers },
        { name: "SaaS Platforms", icon: Cloud },
        { name: "ERP & CRM Systems", icon: LayoutDashboard },
        { name: "Business Dashboards", icon: TrendingUp },
        { name: "APIs & Integrations", icon: Terminal },
        { name: "Business Automation", icon: Zap },
        { name: "Custom Software", icon: Code2 },
    ];

    const aiItems = [
        { name: "AI Applications", icon: Cpu },
        { name: "AI Chatbots", icon: Bot },
        { name: "Workflow Automation", icon: Zap },
        { name: "Intelligent Data Systems", icon: Layers },
        { name: "AI Integration", icon: Network },
        { name: "Process Automation", icon: Boxes },
    ];

    const trainingItems = [
        {
            icon: Laptop,
            title: "Software Training",
            description:
                "Train your employees to confidently use the software and digital tools your organization depends on.",
            accent: "blue",
        },
        {
            icon: ShieldCheck,
            title: "Cybersecurity Awareness",
            description:
                "Help employees recognize phishing, suspicious activity, unsafe practices and common security threats.",
            accent: "rose",
        },
        {
            icon: Users,
            title: "Workplace Technology",
            description:
                "Practical training covering computers, productivity tools, collaboration platforms and everyday IT workflows.",
            accent: "amber",
        },
        {
            icon: GraduationCap,
            title: "Digital Skills",
            description:
                "Build the digital confidence your team needs to work efficiently in a modern technology environment.",
            accent: "emerald",
        },
    ];

    const deploymentSteps = [
        { number: "01", title: "Plan", icon: Boxes, desc: "Scope & strategy" },
        { number: "02", title: "Procure", icon: PackageCheck, desc: "Source equipment" },
        { number: "03", title: "Deploy", icon: Wrench, desc: "Install & configure" },
        { number: "04", title: "Secure", icon: ShieldCheck, desc: "Protect systems" },
        { number: "05", title: "Train", icon: GraduationCap, desc: "Enable teams" },
        { number: "06", title: "Support", icon: Cloud, desc: "Ongoing care" },
    ];

    const accentMap = {
        blue: {
            icon: "from-blue-500 to-blue-600 shadow-blue-500/30",
            text: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        rose: {
            icon: "from-rose-500 to-rose-600 shadow-rose-500/30",
            text: "text-rose-600 dark:text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20",
        },
        amber: {
            icon: "from-amber-500 to-amber-600 shadow-amber-500/30",
            text: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
        },
        emerald: {
            icon: "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
            text: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
    };

    return (
        <section
            ref={sectionRef}
            id="technology-services"
            className="
                relative isolate overflow-hidden
                py-20 sm:py-24 lg:py-32
                [content-visibility:auto]
                [contain-intrinsic-size:1px_4200px]
                bg-gradient-to-b from-slate-50 via-white to-slate-50
                dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
                text-slate-950 dark:text-white
                transition-colors duration-500
            "
        >
            {/* ============ BACKGROUND ATMOSPHERE ============ */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Lightweight ambient glow: desktop only, no mouse-driven React updates */}
                <div className="absolute hidden lg:block left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[100px]" />

                {/* Static glows */}
                <div className="absolute hidden md:block -top-48 -right-40 h-[520px] w-[520px] rounded-full bg-blue-500/[0.08] blur-[100px] lg:animate-pulse motion-reduce:animate-none" />
                <div className="absolute hidden lg:block -bottom-56 -left-48 h-[560px] w-[560px] rounded-full bg-purple-500/[0.08] blur-[100px] lg:animate-pulse motion-reduce:animate-none" />
                <div className="absolute hidden lg:block left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/[0.06] blur-[100px]" />

                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]
                    [background-image:radial-gradient(rgba(100,116,139,0.35)_1px,transparent_1px)]
                    [background-size:32px_32px]
                    [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
                />

                {/* Diagonal lines */}
                <div
                    className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]
                    [background-image:repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(59,130,246,0.15)_40px,rgba(59,130,246,0.15)_41px)]"
                />
            </div>

            {/* ============ CONTAINER ============ */}
            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* ============ SECTION INTRO ============ */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 lg:backdrop-blur-sm dark:border-blue-400/20 dark:text-blue-400">
                        <Sparkles className="h-4 w-4 md:animate-pulse motion-reduce:animate-none" />
                        Technology Services
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />
                    </div>

                    <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        Everything your business needs to
                        <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400">
                            build, deploy and grow.
                        </span>
                    </h2>

                    <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                        From sourcing the right equipment and setting up your infrastructure
                        to building software, introducing AI and training your people, we
                        bring the technology pieces together under one partner.
                    </p>

                    {/* Stats row */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                        {[
                            { value: "6+", label: "Core Services" },
                            { value: "1000+", label: "Devices Deployed" },
                            { value: "24/7", label: "Support" },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                                    {stat.value}
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============ BENTO GRID: PROCUREMENT + DEPLOYMENT ============ */}
                <div className="mt-20 grid gap-6 lg:grid-cols-5">

                    {/* === PROCUREMENT (Bento large) === */}
                    <div
                        data-id="procurement"
                        className="
                            group relative overflow-hidden rounded-[2.5rem]
                            border border-slate-200/80 dark:border-white/10
                            bg-white dark:bg-slate-900
                            md:bg-white/90 md:dark:bg-slate-900/85
                            lg:backdrop-blur-md
                            shadow-sm lg:shadow-[0_25px_80px_-20px_rgba(15,23,42,0.15)]
                            dark:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)]
                            lg:col-span-3 lg:p-10 p-7
                            transition-all duration-700
                            opacity-0 translate-y-8
                        "
                        style={{
                            opacity: visibleItems.has("procurement") ? 1 : 0,
                            transform: visibleItems.has("procurement") ? "translateY(0)" : "translateY(32px)",
                            transition: "opacity 0.7s ease, transform 0.7s ease",
                        }}
                    >
                        {/* Background image */}
                        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
                            <img
                                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80"
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Gradient orb */}
                        <div className="pointer-events-none absolute hidden lg:block -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/12 blur-3xl transition-transform duration-500 lg:group-hover:scale-110 motion-reduce:transform-none" />
                        <div className="pointer-events-none absolute hidden lg:block -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-px w-8 bg-blue-500" />
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                            Corporate Procurement
                                        </span>
                                    </div>

                                    <h3 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                        Need 10, 50, 200 or
                                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                                            {" "}1,000+ devices?
                                        </span>
                                    </h3>
                                </div>

                                <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/30 sm:flex">
                                    <PackageCheck className="h-8 w-8" />
                                </div>
                            </div>

                            <p className="mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                                We coordinate the procurement process so your organization
                                doesn't have to deal with multiple suppliers, disconnected
                                vendors and inconsistent specifications.
                            </p>

                            {/* Feature grid */}
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    { title: "Specification Matching", text: "Identify equipment that fits your requirements and budget." },
                                    { title: "Supplier Sourcing", text: "Source through appropriate technology channels." },
                                    { title: "Verification", text: "Products, specifications and warranty details checked." },
                                    { title: "Delivery & Deployment", text: "Coordinate delivery, setup and rollout." },
                                ].map((item, i) => (
                                    <div
                                        key={item.title}
                                        className="group/item relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-slate-50 to-white dark:from-white/[0.04] dark:to-white/[0.02] p-5 transition-colors duration-300 lg:hover:-translate-y-1 lg:hover:border-blue-500/30 lg:hover:shadow-md lg:hover:shadow-blue-500/10 motion-reduce:transform-none"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{item.title}</h4>
                                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="absolute right-3 top-3 font-mono text-[10px] font-bold text-slate-300 dark:text-slate-700">
                                            0{i + 1}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Tag cloud */}
                            <div className="mt-8 flex flex-wrap gap-2">
                                {procurementItems.map((item) => (
                                    <span
                                        key={item}
                                        className="group/tag relative rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400 cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* === DEPLOYMENT (Bento dark) === */}
                    <div
                        data-id="deployment"
                        className="
                            group relative overflow-hidden rounded-[2.5rem]
                            border border-white/10
                            bg-slate-950 dark:bg-black/50
                            p-7 lg:p-9 lg:col-span-2
                            text-white
                            shadow-[0_25px_80px_-20px_rgba(15,23,42,0.5)]
                            transition-all duration-700
                            opacity-0 translate-y-8
                        "
                        style={{
                            opacity: visibleItems.has("deployment") ? 1 : 0,
                            transform: visibleItems.has("deployment") ? "translateY(0)" : "translateY(32px)",
                            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
                        }}
                    >
                        {/* Ambient glows */}
                        <div className="pointer-events-none absolute hidden md:block -bottom-32 -right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
                        <div className="pointer-events-none absolute hidden md:block -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/16 blur-3xl" />

                        {/* Grid overlay */}
                        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />

                        <div className="relative">
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75 motion-reduce:animate-none" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                                    Complete Deployment
                                </span>
                            </div>

                            <h3 className="mt-4 text-3xl font-black tracking-tight">
                                One partner from
                                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    planning to operation.
                                </span>
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-400">
                                Opening a new office, branch, school or facility? We
                                coordinate the entire technology environment.
                            </p>

                            {/* Vertical timeline */}
                            <div className="mt-8 space-y-2.5">
                                {deploymentSteps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = activeStep === index;
                                    return (
                                        <div
                                            key={step.number}
                                            className={`
                                                relative flex items-center gap-4 rounded-2xl border p-3.5
                                                transition-all duration-500 cursor-pointer
                                                ${isActive
                                                    ? "border-cyan-400/50 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 scale-[1.02]"
                                                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                                                }
                                            `}
                                            onMouseEnter={() => setActiveStep(index)}
                                        >
                                            <div
                                                className={`
                                                    flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                                                    transition-all duration-500
                                                    ${isActive
                                                        ? "bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-400/40 scale-110"
                                                        : "bg-white/10 text-cyan-400"
                                                    }
                                                `}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[10px] font-bold text-slate-500">
                                                        {step.number}
                                                    </span>
                                                    <span className={`font-bold transition-colors ${isActive ? "text-white" : "text-slate-300"}`}>
                                                        {step.title}
                                                    </span>
                                                </div>
                                                <div className={`text-xs transition-colors ${isActive ? "text-cyan-300" : "text-slate-500"}`}>
                                                    {step.desc}
                                                </div>
                                            </div>

                                            {/* Progress indicator */}
                                            {isActive && (
                                                <span className="flex h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============ SOFTWARE + AI ============ */}
                <div className="mt-6 grid gap-6 lg:grid-cols-2">

                    {/* === SOFTWARE === */}
                    <div
                        data-id="software"
                        className="
                            group relative overflow-hidden rounded-[2.5rem]
                            border border-blue-200/60 dark:border-blue-400/10
                            bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80
                            dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30
                            p-7 sm:p-8 lg:p-10
                            lg:backdrop-blur-md
                            transition-all duration-500
                            opacity-0 translate-y-8
                            lg:hover:shadow-[0_24px_60px_-20px_rgba(59,130,246,0.20)]
                        "
                        style={{
                            opacity: visibleItems.has("software") ? 1 : 0,
                            transform: visibleItems.has("software") ? "translateY(0)" : "translateY(32px)",
                            transition: "opacity 0.7s ease, transform 0.7s ease",
                        }}
                    >
                        <div className="pointer-events-none absolute hidden lg:block -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/12 blur-3xl transition-transform duration-500 lg:group-hover:scale-110 motion-reduce:transform-none" />
                        <div className="pointer-events-none absolute hidden lg:block -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/30">
                                        <Code2 className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                            Software
                                        </div>
                                        <div className="font-black text-slate-950 dark:text-white">
                                            Custom Development
                                        </div>
                                    </div>
                                </div>

                                <span className="hidden items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 sm:flex">
                                    <Star className="h-3 w-3 fill-current" />
                                    Popular
                                </span>
                            </div>

                            <h3 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                Technology built around
                                <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                                    your business.
                                </span>
                            </h3>

                            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                When off-the-shelf software isn't enough, we design and
                                build digital systems around the way your organization
                                actually works.
                            </p>

                            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                                {softwareItems.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.name}
                                            className="group/soft flex items-center gap-3 rounded-xl border border-blue-100/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 hover:border-blue-500/40 hover:bg-white lg:hover:shadow-md lg:hover:shadow-blue-500/10 lg:hover:-translate-y-0.5 motion-reduce:transform-none"
                                            style={{
                                                animation: visibleItems.has("software")
                                                    ? `slideIn 0.5s ease ${i * 0.06}s both`
                                                    : "none",
                                            }}
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover/soft:bg-blue-500 group-hover/soft:text-white">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs sm:text-sm">{item.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* === AI === */}
                    <div
                        data-id="ai"
                        className="
                            group relative overflow-hidden rounded-[2.5rem]
                            border border-purple-200/60 dark:border-purple-400/10
                            bg-gradient-to-br from-purple-50/80 via-white to-cyan-50/80
                            dark:from-purple-950/40 dark:via-slate-900 dark:to-cyan-950/30
                            p-7 sm:p-8 lg:p-10
                            lg:backdrop-blur-md
                            transition-all duration-500
                            opacity-0 translate-y-8
                            lg:hover:shadow-[0_24px_60px_-20px_rgba(168,85,247,0.20)]
                        "
                        style={{
                            opacity: visibleItems.has("ai") ? 1 : 0,
                            transform: visibleItems.has("ai") ? "translateY(0)" : "translateY(32px)",
                            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
                        }}
                    >
                        <div className="pointer-events-none absolute hidden lg:block -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-500/12 blur-3xl transition-transform duration-500 lg:group-hover:scale-110 motion-reduce:transform-none" />
                        <div className="pointer-events-none absolute hidden lg:block -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl shadow-purple-500/30">
                                        <Cpu className="h-7 w-7" />
                                        <span className="absolute -right-1 -top-1 flex h-3 w-3">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75 motion-reduce:animate-none" />
                                            <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400" />
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                                            AI & Automation
                                        </div>
                                        <div className="font-black text-slate-950 dark:text-white">
                                            Next-Gen Intelligence
                                        </div>
                                    </div>
                                </div>

                                <span className="hidden items-center gap-1 rounded-full bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 sm:flex">
                                    <Zap className="h-3 w-3 fill-current" />
                                    New
                                </span>
                            </div>

                            <h3 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                Make your business
                                <span className="block bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400">
                                    work smarter.
                                </span>
                            </h3>

                            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                Identify repetitive processes, reduce manual work and
                                introduce AI and automation where they can create
                                measurable value.
                            </p>

                            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                                {aiItems.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.name}
                                            className="group/ai flex items-center gap-3 rounded-xl border border-purple-100/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 hover:border-purple-500/40 hover:bg-white lg:hover:shadow-md lg:hover:shadow-purple-500/10 lg:hover:-translate-y-0.5 motion-reduce:transform-none"
                                            style={{
                                                animation: visibleItems.has("ai")
                                                    ? `slideIn 0.5s ease ${i * 0.06}s both`
                                                    : "none",
                                            }}
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover/ai:bg-purple-500 group-hover/ai:text-white">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs sm:text-sm">{item.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============ TRAINING SECTION ============ */}
                <div
                    data-id="training"
                    className="
                        group relative mt-6 overflow-hidden rounded-[2.5rem]
                        border border-emerald-200/60 dark:border-emerald-400/10
                        bg-gradient-to-br from-emerald-50/70 via-white to-cyan-50/70
                        dark:from-emerald-950/30 dark:via-slate-900 dark:to-cyan-950/30
                        p-7 sm:p-8 lg:p-12
                        lg:backdrop-blur-md
                        transition-all duration-500
                        opacity-0 translate-y-8
                    "
                    style={{
                        opacity: visibleItems.has("training") ? 1 : 0,
                        transform: visibleItems.has("training") ? "translateY(0)" : "translateY(32px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    <div className="pointer-events-none absolute hidden lg:block -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/12 blur-3xl" />
                    <div className="pointer-events-none absolute hidden lg:block -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/12 blur-3xl" />

                    <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

                        {/* Training intro */}
                        <div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30">
                                    <GraduationCap className="h-7 w-7" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                        Training & Enablement
                                    </div>
                                    <div className="font-black text-slate-950 dark:text-white">
                                        People First
                                    </div>
                                </div>
                            </div>

                            <h3 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                Don't just install
                                <span className="block bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-cyan-400">
                                    the technology.
                                </span>
                                <span className="block text-slate-500 dark:text-slate-400">
                                    Teach your people to use it.
                                </span>
                            </h3>

                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                Technology only creates value when your people know how to
                                use it. We provide practical training that helps employees
                                become confident, productive and safer with the technology
                                your organization provides.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-2.5">
                                {[
                                    { label: "On-site training", color: "emerald" },
                                    { label: "Team training", color: "blue" },
                                    { label: "Practical workshops", color: "purple" },
                                ].map((tag) => (
                                    <span
                                        key={tag.label}
                                        className="rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 lg:backdrop-blur-sm transition-colors lg:hover:scale-105 motion-reduce:transform-none"
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>

                            {/* Rating card */}
                            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-br from-emerald-400 to-cyan-500 text-[10px] font-bold text-white"
                                        >
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-slate-900 dark:bg-white text-[10px] font-bold text-white dark:text-slate-900">
                                        +
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                                        Trusted by teams across industries
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Training cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {trainingItems.map((item, i) => {
                                const Icon = item.icon;
                                const accent = accentMap[item.accent];
                                return (
                                    <div
                                        key={item.title}
                                        className="group/card relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] p-6 lg:backdrop-blur-sm transition-shadow duration-300 lg:hover:-translate-y-1 lg:hover:shadow-xl lg:hover:shadow-slate-950/10 dark:lg:hover:shadow-black/40 motion-reduce:transform-none"
                                        style={{
                                            animation: visibleItems.has("training")
                                                ? `slideIn 0.6s ease ${i * 0.1}s both`
                                                : "none",
                                        }}
                                    >
                                        {/* Hover glow */}
                                        <div className={`pointer-events-none absolute hidden lg:block -right-12 -top-12 h-32 w-32 rounded-full ${accent.bg} blur-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100`} />

                                        <div className="relative">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.icon} text-white shadow-lg transition-all duration-500 lg:group-hover/card:scale-110 lg:group-hover/card:rotate-3 motion-reduce:transform-none`}>
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <h4 className="mt-5 font-black text-slate-950 dark:text-white">
                                                {item.title}
                                            </h4>

                                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {item.description}
                                            </p>

                                            <div className="mt-5 flex items-center gap-2 text-xs font-bold">
                                                <span className={accent.text}>Learn more</span>
                                                <ArrowRight className={`h-3 w-3 ${accent.text} transition-transform duration-300 group-hover/card:translate-x-1`} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ============ FINAL CTA ============ */}
                <div
                    data-id="cta"
                    className="
                        group relative mt-10 overflow-hidden rounded-[2.5rem]
                        bg-slate-950 dark:bg-black
                        px-8 py-10 sm:px-12 sm:py-14
                        text-white
                        transition-all duration-700
                        opacity-0 translate-y-8
                    "
                    style={{
                        opacity: visibleItems.has("cta") ? 1 : 0,
                        transform: visibleItems.has("cta") ? "translateY(0)" : "translateY(32px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    {/* Glows */}
                    <div className="pointer-events-none absolute hidden md:block -right-24 -top-40 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl lg:animate-pulse motion-reduce:animate-none" />
                    <div className="pointer-events-none absolute hidden lg:block -bottom-40 left-1/3 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl lg:animate-pulse motion-reduce:animate-none" />
                    <div className="pointer-events-none absolute hidden lg:block top-1/2 right-1/4 h-64 w-64 rounded-full bg-cyan-500/16 blur-3xl" />

                    {/* Grid */}
                    <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px]" />

                    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-400 backdrop-blur-sm">
                                <Rocket className="h-3.5 w-3.5" />
                                Ready when you are
                            </div>

                            <h3 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                                Tell us what your
                                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    organization needs.
                                </span>
                            </h3>

                            <p className="mt-4 leading-7 text-slate-400">
                                We'll help you determine the right technology, deployment
                                approach, software and training required to move forward.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-400">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                    Free consultation
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                    Tailored proposal
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                    No obligation
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                            <a
                                href="/support"
                                className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-2xl shadow-white/10 transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-white/20 motion-reduce:transform-none"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                                <span className="relative flex items-center gap-3 transition-colors duration-300 group-hover/btn:text-white">
                                    Discuss Your Requirements
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                </span>
                            </a>

                            <a
                                href="/services"
                                className="group/btn2 inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white lg:backdrop-blur-sm transition-all duration-300 lg:hover:-translate-y-1 motion-reduce:transform-none hover:border-white/40 hover:bg-white/10"
                            >
                                <Play className="h-4 w-4" />
                                Explore All Services
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Custom keyframes */}
            <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                    * {
                        scroll-behavior: auto !important;
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}