import React from "react";
import {
    Monitor,
    Package,
    Network,
    Cloud,
    Code2,
    Cpu,
    ShieldCheck,
    Settings,
    GraduationCap,
    ArrowRight,
    Check,
    Sparkles,
    Server,
    Database,
    Workflow,
    Globe2,
    LockKeyhole,
    Layers3,
    Zap,
    ChevronRight,
} from "lucide-react";

const services = [
    {
        number: "01",
        icon: Monitor,
        title: "Hardware & Device Procurement",
        shortTitle: "Hardware",
        href: "/services/hardware-procurement",
        description:
            "Genuine business technology sourced around your requirements, budget and deployment needs.",
        tags: [
            "Laptops",
            "Desktops",
            "Servers",
            "Workstations",
            "Monitors",
            "Printers",
            "Accessories",
        ],
        accent: "blue",
    },
    {
        number: "02",
        icon: Package,
        title: "Corporate & Bulk Procurement",
        shortTitle: "Procurement",
        href: "/services/corporate-procurement",
        description:
            "Large-scale technology sourcing for businesses, institutions, schools, NGOs and growing organizations.",
        tags: [
            "Bulk Devices",
            "Institutional Supply",
            "Vendor Sourcing",
            "Negotiation",
            "Logistics",
            "Deployment",
        ],
        accent: "violet",
    },
    {
        number: "03",
        icon: Network,
        title: "Networking & IT Infrastructure",
        shortTitle: "Infrastructure",
        href: "/services/networking",
        description:
            "Reliable infrastructure that connects your people, systems, devices and locations securely.",
        tags: [
            "Wi-Fi",
            "Routers",
            "Switches",
            "Servers",
            "Cabling",
            "VPN",
            "Firewalls",
        ],
        accent: "cyan",
    },
    {
        number: "04",
        icon: Cloud,
        title: "Cloud, Hosting & Managed IT",
        shortTitle: "Cloud",
        href: "/services/cloud-managed-it",
        description:
            "Keep your digital systems online, secure, monitored and supported without the technical headache.",
        tags: [
            "VPS",
            "Cloud",
            "Hosting",
            "Domains",
            "Business Email",
            "Backups",
            "IT Support",
        ],
        accent: "emerald",
    },
    {
        number: "05",
        icon: Code2,
        title: "Software & Digital Solutions",
        shortTitle: "Software",
        href: "/solutions/software",
        description:
            "Custom websites, applications and business systems designed around how your organization actually works.",
        tags: [
            "Websites",
            "Web Apps",
            "Mobile Apps",
            "SaaS",
            "ERP",
            "CRM",
            "APIs",
            "Dashboards",
        ],
        accent: "orange",
        featured: true,
    },
    {
        number: "06",
        icon: Cpu,
        title: "AI, Automation & Digital Transformation",
        shortTitle: "AI & Automation",
        href: "/services/ai-automation",
        description:
            "Reduce repetitive work, connect your systems and modernize business processes with intelligent technology.",
        tags: [
            "AI Applications",
            "Automation",
            "RPA",
            "Chatbots",
            "AI Integration",
            "Data Systems",
        ],
        accent: "pink",
    },
    {
        number: "07",
        icon: ShieldCheck,
        title: "Security & Business Communications",
        shortTitle: "Security",
        href: "/services/security-communications",
        description:
            "Protect your premises, systems, people and information while keeping your organization connected.",
        tags: [
            "CCTV",
            "Access Control",
            "Biometrics",
            "Cybersecurity",
            "VoIP",
            "Video Conferencing",
        ],
        accent: "red",
    },
    {
        number: "08",
        icon: Settings,
        title: "IT Deployment & Managed Support",
        shortTitle: "IT Support",
        href: "/services/it-deployment-support",
        description:
            "From planning and installation to configuration, maintenance and ongoing technical support.",
        tags: [
            "Consulting",
            "Installation",
            "Configuration",
            "Maintenance",
            "Managed IT",
            "Support",
        ],
        accent: "indigo",
    },
    {
        number: "09",
        icon: GraduationCap,
        title: "IT Training & Capacity Building",
        shortTitle: "Training",
        href: "/resources/learning",
        description:
            "Practical technology training that helps individuals and teams confidently use the tools they depend on.",
        tags: [
            "Staff Training",
            "Digital Skills",
            "Software Training",
            "Cyber Awareness",
            "IT Workshops",
            "Technical Training",
        ],
        accent: "amber",
    },
];

const accentStyles = {
    blue: {
        icon: "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
        glow: "bg-blue-500/20 dark:bg-blue-500/15",
        tag: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/[0.08] dark:text-blue-300 dark:border-blue-500/10",
        border: "hover:border-blue-300 dark:hover:border-blue-500/30",
        dot: "bg-blue-500",
    },
    violet: {
        icon: "bg-violet-500/10 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
        glow: "bg-violet-500/20 dark:bg-violet-500/15",
        tag: "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-500/[0.08] dark:text-violet-300 dark:border-violet-500/10",
        border: "hover:border-violet-300 dark:hover:border-violet-500/30",
        dot: "bg-violet-500",
    },
    cyan: {
        icon: "bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20",
        glow: "bg-cyan-500/20 dark:bg-cyan-500/15",
        tag: "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-500/[0.08] dark:text-cyan-300 dark:border-cyan-500/10",
        border: "hover:border-cyan-300 dark:hover:border-cyan-500/30",
        dot: "bg-cyan-500",
    },
    emerald: {
        icon: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        glow: "bg-emerald-500/20 dark:bg-emerald-500/15",
        tag: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/[0.08] dark:text-emerald-300 dark:border-emerald-500/10",
        border: "hover:border-emerald-300 dark:hover:border-emerald-500/30",
        dot: "bg-emerald-500",
    },
    orange: {
        icon: "bg-orange-500/10 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
        glow: "bg-orange-500/20 dark:bg-orange-500/15",
        tag: "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-500/[0.08] dark:text-orange-300 dark:border-orange-500/10",
        border: "hover:border-orange-300 dark:hover:border-orange-500/30",
        dot: "bg-orange-500",
    },
    pink: {
        icon: "bg-pink-500/10 text-pink-600 border-pink-200 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20",
        glow: "bg-pink-500/20 dark:bg-pink-500/15",
        tag: "bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-500/[0.08] dark:text-pink-300 dark:border-pink-500/10",
        border: "hover:border-pink-300 dark:hover:border-pink-500/30",
        dot: "bg-pink-500",
    },
    red: {
        icon: "bg-red-500/10 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
        glow: "bg-red-500/20 dark:bg-red-500/15",
        tag: "bg-red-50 text-red-700 border-red-100 dark:bg-red-500/[0.08] dark:text-red-300 dark:border-red-500/10",
        border: "hover:border-red-300 dark:hover:border-red-500/30",
        dot: "bg-red-500",
    },
    indigo: {
        icon: "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
        glow: "bg-indigo-500/20 dark:bg-indigo-500/15",
        tag: "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-500/[0.08] dark:text-indigo-300 dark:border-indigo-500/10",
        border: "hover:border-indigo-300 dark:hover:border-indigo-500/30",
        dot: "bg-indigo-500",
    },
    amber: {
        icon: "bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
        glow: "bg-amber-500/20 dark:bg-amber-500/15",
        tag: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/[0.08] dark:text-amber-300 dark:border-amber-500/10",
        border: "hover:border-amber-300 dark:hover:border-amber-500/30",
        dot: "bg-amber-500",
    },
};

function ServiceIcon({ service, large = false }) {
    const Icon = service.icon;
    const style = accentStyles[service.accent];

    return (
        <div
            className={`
                flex
                ${large ? "h-16 w-16 rounded-2xl" : "h-12 w-12 rounded-xl"}
                shrink-0
                items-center
                justify-center
                border
                ${style.icon}
                transition-all
                duration-500
                lg:group-hover:scale-110
                lg:group-hover:rotate-2
                motion-reduce:transform-none
            `}
        >
            <Icon
                size={large ? 27 : 21}
                strokeWidth={1.7}
            />
        </div>
    );
}

function MiniPill({ children }) {
    return (
        <span
            className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-slate-200
                bg-white/70
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-slate-600
                shadow-sm
                dark:border-white/[0.08]
                dark:bg-white/[0.04]
                dark:text-slate-400
            "
        >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {children}
        </span>
    );
}

export default function ServicesSection() {
    const featured = services.find((item) => item.featured);
    const otherServices = services.filter((item) => !item.featured);

    return (
        <section
            id="services"
            className="
                relative
                overflow-hidden
                border-y
                border-slate-200/70
                bg-slate-50
                py-20
                [content-visibility:auto]
                [contain-intrinsic-size:1px_3200px]
                dark:border-white/[0.06]
                dark:bg-[#020611]
                sm:py-28
                lg:py-36
            "
        >
            {/* =========================================================
                BACKGROUND ATMOSPHERE
            ========================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute
                        hidden
                        md:block
                        -left-40
                        -top-40
                        h-[560px]
                        w-[560px]
                        rounded-full
                        bg-blue-400/10
                        blur-[140px]
                        dark:bg-blue-600/[0.10]
                    "
                />

                <div
                    className="
                        absolute
                        hidden
                        md:block
                        right-[-220px]
                        top-[20%]
                        h-[650px]
                        w-[650px]
                        rounded-full
                        bg-indigo-400/10
                        blur-[150px]
                        dark:bg-indigo-600/[0.08]
                    "
                />

                <div
                    className="
                        absolute
                        hidden
                        lg:block
                        bottom-[-260px]
                        left-[25%]
                        h-[600px]
                        w-[600px]
                        rounded-full
                        bg-cyan-300/10
                        blur-[150px]
                        dark:bg-cyan-500/[0.05]
                    "
                />

                {/* Technical grid */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-50
                        dark:opacity-20
                    "
                    style={{
                        backgroundImage: `
                            linear-gradient(
                                rgba(15,23,42,0.045) 1px,
                                transparent 1px
                            ),
                            linear-gradient(
                                90deg,
                                rgba(15,23,42,0.045) 1px,
                                transparent 1px
                            )
                        `,
                        backgroundSize: "72px 72px",
                    }}
                />

                <div
                    className="
                        absolute
                        inset-0
                        hidden
                        dark:block
                    "
                    style={{
                        backgroundImage: `
                            linear-gradient(
                                rgba(255,255,255,0.035) 1px,
                                transparent 1px
                            ),
                            linear-gradient(
                                90deg,
                                rgba(255,255,255,0.035) 1px,
                                transparent 1px
                            )
                        `,
                        backgroundSize: "72px 72px",
                    }}
                />
            </div>

            {/* Top edge */}
            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-blue-500/50
                    to-transparent
                "
            />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div
                    className="
                        grid
                        gap-12
                        lg:grid-cols-[1.15fr_0.85fr]
                        lg:items-end
                    "
                >
                    <div>
                        <div
                            className="
                                mb-7
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    h-px
                                    w-10
                                    bg-blue-500
                                    dark:bg-blue-400
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.3em]
                                    text-blue-600
                                    dark:text-blue-400
                                "
                            >
                                Technology Services
                            </span>

                            <Sparkles
                                size={14}
                                className="
                                    text-blue-500
                                    dark:text-blue-400
                                "
                            />
                        </div>

                        <h2
                            className="
                                max-w-4xl
                                text-4xl
                                font-black
                                leading-[1.02]
                                tracking-[-0.05em]
                                text-slate-950
                                sm:text-5xl
                                lg:text-6xl
                                xl:text-7xl
                                dark:text-white
                            "
                        >
                            Technology that works
                            <span
                                className="
                                    block
                                    bg-gradient-to-r
                                    from-blue-600
                                    via-indigo-600
                                    to-cyan-500
                                    bg-clip-text
                                    text-transparent
                                    dark:from-blue-400
                                    dark:via-indigo-400
                                    dark:to-cyan-400
                                "
                            >
                                together.
                            </span>
                        </h2>
                    </div>

                    <div className="lg:pb-2">
                        <p
                            className="
                                max-w-xl
                                text-base
                                leading-8
                                text-slate-600
                                sm:text-lg
                                dark:text-slate-400
                            "
                        >
                            We connect hardware, infrastructure, software,
                            cloud, security, automation and people into
                            practical technology systems built around your
                            organization.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <MiniPill>Procurement</MiniPill>
                            <MiniPill>Software</MiniPill>
                            <MiniPill>Infrastructure</MiniPill>
                            <MiniPill>AI & Automation</MiniPill>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    TECHNOLOGY CONTROL CENTER / VISUAL
                ===================================================== */}

                <div
                    className="
                        relative
                        mt-16
                        overflow-hidden
                        rounded-[36px]
                        border
                        border-slate-200/80
                        bg-white
                        p-4
                        shadow-sm
                        md:bg-white/85
                        md:shadow-[0_20px_60px_rgba(15,23,42,0.07)]
                        lg:backdrop-blur-xl
                        dark:border-white/[0.08]
                        dark:bg-[#07101f]
                        dark:shadow-none
                        md:dark:bg-white/[0.025]
                        md:dark:shadow-[0_20px_60px_rgba(0,0,0,0.20)]
                        sm:p-6
                        lg:p-8
                    "
                >
                    <div
                        className="
                            pointer-events-none
                            absolute
                            hidden
                            md:block
                            -right-32
                            -top-32
                            h-[400px]
                            w-[400px]
                            rounded-full
                            bg-blue-500/10
                            blur-[100px]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            hidden
                            md:block
                            bottom-[-150px]
                            left-[30%]
                            h-[350px]
                            w-[350px]
                            rounded-full
                            bg-violet-500/[0.08]
                            blur-[100px]
                        "
                    />

                    <div
                        className="
                            relative
                            grid
                            overflow-hidden
                            rounded-[28px]
                            border
                            border-slate-200/80
                            bg-slate-950
                            lg:grid-cols-[0.9fr_1.1fr]
                            dark:border-white/[0.08]
                        "
                    >
                        {/* LEFT */}
                        <div
                            className="
                                relative
                                min-h-[430px]
                                overflow-hidden
                                border-b
                                border-white/[0.08]
                                p-7
                                sm:p-10
                                lg:border-b-0
                                lg:border-r
                            "
                        >
                            {/* grid */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    opacity-40
                                "
                                style={{
                                    backgroundImage: `
                                        linear-gradient(
                                            rgba(255,255,255,0.05) 1px,
                                            transparent 1px
                                        ),
                                        linear-gradient(
                                            90deg,
                                            rgba(255,255,255,0.05) 1px,
                                            transparent 1px
                                        )
                                    `,
                                    backgroundSize: "42px 42px",
                                }}
                            />

                            <div className="relative">
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-[0.25em]
                                                text-blue-400
                                            "
                                        >
                                            AB Technology
                                        </p>

                                        <h3
                                            className="
                                                mt-2
                                                text-xl
                                                font-bold
                                                tracking-tight
                                                text-white
                                            "
                                        >
                                            Technology ecosystem
                                        </h3>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-white/[0.05]
                                        "
                                    >
                                        <Zap
                                            size={16}
                                            className="text-blue-400"
                                        />
                                    </div>
                                </div>

                                {/* Main visual */}
                                <div
                                    className="
                                        relative
                                        mt-10
                                        flex
                                        min-h-[280px]
                                        items-center
                                        justify-center
                                    "
                                >
                                    {/* orbital rings */}
                                    <div
                                        className="
                                            absolute
                                            h-64
                                            w-64
                                            rounded-full
                                            border
                                            border-blue-400/10
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            h-48
                                            w-48
                                            rounded-full
                                            border
                                            border-cyan-400/10
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            h-32
                                            w-32
                                            rounded-full
                                            border
                                            border-violet-400/10
                                        "
                                    />

                                    {/* connection lines */}
                                    <div
                                        className="
                                            absolute
                                            h-px
                                            w-48
                                            bg-gradient-to-r
                                            from-transparent
                                            via-blue-400/40
                                            to-transparent
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            h-48
                                            w-px
                                            bg-gradient-to-b
                                            from-transparent
                                            via-blue-400/30
                                            to-transparent
                                        "
                                    />

                                    {/* center */}
                                    <div
                                        className="
                                            relative
                                            z-10
                                            flex
                                            h-24
                                            w-24
                                            items-center
                                            justify-center
                                            rounded-[28px]
                                            border
                                            border-blue-400/30
                                            bg-gradient-to-br
                                            from-blue-500/20
                                            to-indigo-500/10
                                            shadow-[0_0_28px_rgba(59,130,246,0.16)]
                            md:shadow-[0_0_70px_rgba(59,130,246,0.25)]
                                        "
                                    >
                                        <Cpu
                                            size={38}
                                            strokeWidth={1.3}
                                            className="text-blue-300"
                                        />

                                        <div
                                            className="
                                                absolute
                                                -inset-2
                                                rounded-[32px]
                                                border
                                                border-blue-400/10
                                            "
                                        />
                                    </div>

                                    {/* orbit nodes */}

                                    <div
                                        className="
                                            absolute
                                            left-[5%]
                                            top-[30%]
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-cyan-400/20
                                            bg-cyan-400/[0.08]
                                        "
                                    >
                                        <Network
                                            size={19}
                                            className="text-cyan-300"
                                        />
                                    </div>

                                    <div
                                        className="
                                            absolute
                                            right-[5%]
                                            top-[27%]
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-violet-400/20
                                            bg-violet-400/[0.08]
                                        "
                                    >
                                        <Code2
                                            size={19}
                                            className="text-violet-300"
                                        />
                                    </div>

                                    <div
                                        className="
                                            absolute
                                            bottom-[9%]
                                            left-[16%]
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-emerald-400/20
                                            bg-emerald-400/[0.08]
                                        "
                                    >
                                        <Cloud
                                            size={19}
                                            className="text-emerald-300"
                                        />
                                    </div>

                                    <div
                                        className="
                                            absolute
                                            bottom-[8%]
                                            right-[15%]
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-orange-400/20
                                            bg-orange-400/[0.08]
                                        "
                                    >
                                        <ShieldCheck
                                            size={19}
                                            className="text-orange-300"
                                        />
                                    </div>

                                    {/* floating label */}
                                    <div
                                        className="
                                            absolute
                                            left-1/2
                                            top-3
                                            -translate-x-1/2
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-white/[0.05]
                                            px-3
                                            py-1.5
                                            text-[8px]
                                            font-bold
                                            uppercase
                                            tracking-[0.2em]
                                            text-slate-400
                                        "
                                    >
                                        Connected technology
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div
                            className="
                                relative
                                flex
                                flex-col
                                justify-between
                                p-7
                                sm:p-10
                            "
                        >
                            <div>
                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-blue-400/20
                                        bg-blue-400/[0.08]
                                        px-3
                                        py-1.5
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-blue-300
                                    "
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                    One technology partner
                                </div>

                                <h3
                                    className="
                                        mt-6
                                        max-w-xl
                                        text-3xl
                                        font-bold
                                        leading-tight
                                        tracking-[-0.03em]
                                        text-white
                                        sm:text-4xl
                                    "
                                >
                                    From the first device
                                    <span className="text-blue-400">
                                        {" "}
                                        to the entire digital ecosystem.
                                    </span>
                                </h3>

                                <p
                                    className="
                                        mt-5
                                        max-w-xl
                                        text-sm
                                        leading-7
                                        text-slate-400
                                    "
                                >
                                    Instead of treating procurement,
                                    infrastructure, software and support as
                                    separate problems, we help bring them
                                    together into one technology environment.
                                </p>
                            </div>

                            {/* capabilities */}
                            <div className="mt-10 grid grid-cols-2 gap-3">
                                {[
                                    {
                                        icon: Server,
                                        label: "Infrastructure",
                                    },
                                    {
                                        icon: Database,
                                        label: "Data Systems",
                                    },
                                    {
                                        icon: Workflow,
                                        label: "Automation",
                                    },
                                    {
                                        icon: LockKeyhole,
                                        label: "Security",
                                    },
                                    {
                                        icon: Globe2,
                                        label: "Digital Products",
                                    },
                                    {
                                        icon: Layers3,
                                        label: "IT Operations",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.label}
                                            className="
                                                group
                                                flex
                                                items-center
                                                gap-3
                                                rounded-2xl
                                                border
                                                border-white/[0.07]
                                                bg-white/[0.035]
                                                p-3.5
                                                transition-all
                                                duration-300
                                                hover:border-blue-400/20
                                                hover:bg-white/[0.06]
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    h-9
                                                    w-9
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-white/[0.05]
                                                    text-slate-400
                                                    transition-colors
                                                    group-hover:text-blue-300
                                                "
                                            >
                                                <Icon size={17} />
                                            </div>

                                            <span
                                                className="
                                                    text-[11px]
                                                    font-semibold
                                                    text-slate-300
                                                "
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div
                                className="
                                    mt-8
                                    flex
                                    items-center
                                    justify-between
                                    border-t
                                    border-white/[0.07]
                                    pt-6
                                "
                            >
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
                                        Built around
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-white">
                                        Your requirements
                                    </p>
                                </div>

                                <ArrowRight
                                    size={19}
                                    className="text-blue-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    SECTION LABEL
                ===================================================== */}

                <div
                    className="
                        mt-24
                        flex
                        flex-col
                        justify-between
                        gap-5
                        sm:flex-row
                        sm:items-end
                    "
                >
                    <div>
                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.28em]
                                text-blue-600
                                dark:text-blue-400
                            "
                        >
                            Explore our capabilities
                        </p>

                        <h3
                            className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-950
                                dark:text-white
                            "
                        >
                            Everything your technology needs.
                        </h3>
                    </div>

                    <p
                        className="
                            max-w-md
                            text-sm
                            leading-7
                            text-slate-500
                            dark:text-slate-500
                        "
                    >
                        Choose a single service or combine multiple capabilities
                        into one complete technology solution.
                    </p>
                </div>

                {/* =====================================================
                    BENTO SERVICES
                ===================================================== */}

                <div className="mt-10 space-y-5">

                    {/* =================================================
                        FEATURED SOFTWARE CARD
                    ================================================= */}

                    <article
                        className="
                            group
                            relative
                            overflow-hidden
                            rounded-[32px]
                            border
                            border-orange-200/70
                            bg-white
                            shadow-sm
                            transition-shadow
                            duration-300
                            md:bg-white/85
                            lg:backdrop-blur-lg
                            lg:hover:-translate-y-1
                            lg:hover:shadow-xl
                            motion-reduce:transform-none
                            motion-reduce:transition-none
                            dark:border-orange-500/10
                            dark:bg-white/[0.035]
                        "
                    >
                        <div
                            className="
                                absolute
                                hidden
                                md:block
                                -right-20
                                -top-20
                                h-72
                                w-72
                                rounded-full
                                bg-orange-500/10
                                blur-[100px]
                                transition-all
                                duration-500
                                group-hover:bg-orange-500/20
                            "
                        />

                        <div
                            className="
                                relative
                                grid
                                lg:grid-cols-[1.1fr_0.9fr]
                            "
                        >
                            <div className="p-7 sm:p-10 lg:p-12">
                                <div className="flex items-start justify-between">
                                    <ServiceIcon
                                        service={featured}
                                        large
                                    />

                                    <span
                                        className="
                                            rounded-full
                                            border
                                            border-orange-200
                                            bg-orange-50
                                            px-3
                                            py-1.5
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.18em]
                                            text-orange-600
                                            dark:border-orange-500/20
                                            dark:bg-orange-500/10
                                            dark:text-orange-400
                                        "
                                    >
                                        Core service
                                    </span>
                                </div>

                                <div className="mt-8 max-w-2xl">
                                    <p
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.25em]
                                            text-orange-500
                                        "
                                    >
                                        05 / Digital products
                                    </p>

                                    <h3
                                        className="
                                            mt-3
                                            text-3xl
                                            font-black
                                            tracking-[-0.04em]
                                            text-slate-950
                                            sm:text-4xl
                                            lg:text-5xl
                                            dark:text-white
                                        "
                                    >
                                        Software & Digital
                                        <span className="text-orange-500">
                                            {" "}
                                            Solutions.
                                        </span>
                                    </h3>

                                    <p
                                        className="
                                            mt-5
                                            max-w-xl
                                            text-sm
                                            leading-7
                                            text-slate-600
                                            sm:text-base
                                            dark:text-slate-400
                                        "
                                    >
                                        {featured.description}
                                    </p>
                                </div>

                                <div className="mt-7 flex flex-wrap gap-2">
                                    {featured.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`
                                                rounded-lg
                                                border
                                                px-3
                                                py-1.5
                                                text-[10px]
                                                font-semibold
                                                ${accentStyles.orange.tag}
                                            `}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={featured.href}
                                    className="
                                        mt-8
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-slate-950
                                        px-5
                                        py-3
                                        text-xs
                                        font-bold
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:gap-3
                                        hover:bg-orange-500
                                        dark:bg-white
                                        dark:text-slate-950
                                        dark:hover:bg-orange-400
                                    "
                                >
                                    Explore software solutions
                                    <ArrowRight size={15} />
                                </a>
                            </div>

                            {/* Software visual */}
                            <div
                                className="
                                    relative
                                    min-h-[350px]
                                    overflow-hidden
                                    bg-slate-950
                                    p-7
                                    lg:min-h-full
                                "
                            >
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        opacity-30
                                    "
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(
                                                rgba(255,255,255,0.04) 1px,
                                                transparent 1px
                                            ),
                                            linear-gradient(
                                                90deg,
                                                rgba(255,255,255,0.04) 1px,
                                                transparent 1px
                                            )
                                        `,
                                        backgroundSize: "38px 38px",
                                    }}
                                />

                                <div
                                    className="
                                        absolute
                                        hidden
                                        md:block
                                        right-[-80px]
                                        top-[-80px]
                                        h-72
                                        w-72
                                        rounded-full
                                        bg-orange-500/10
                                        blur-[90px]
                                    "
                                />

                                <div className="relative flex h-full min-h-[330px] items-center justify-center">
                                    {/* browser */}
                                    <div
                                        className="
                                            w-full
                                            max-w-md
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-white/[0.05]
                                            shadow-2xl
                                            transition-transform
                                            duration-500
                                            lg:group-hover:scale-[1.02]
                                            lg:group-hover:-rotate-1
                                            motion-reduce:transform-none
                                            motion-reduce:transition-none
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                border-b
                                                border-white/[0.08]
                                                px-4
                                                py-3
                                            "
                                        >
                                            <span className="h-2 w-2 rounded-full bg-red-400/70" />
                                            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                                            <span className="h-2 w-2 rounded-full bg-green-400/70" />

                                            <div
                                                className="
                                                    ml-3
                                                    h-5
                                                    flex-1
                                                    rounded-md
                                                    bg-white/[0.05]
                                                "
                                            />
                                        </div>

                                        <div className="grid grid-cols-[70px_1fr] p-4">
                                            <div className="space-y-2">
                                                {[1, 2, 3, 4, 5].map((x) => (
                                                    <div
                                                        key={x}
                                                        className={`
                                                            h-7
                                                            rounded-lg
                                                            ${x === 1
                                                                ? "bg-orange-400/20"
                                                                : "bg-white/[0.04]"
                                                            }
                                                        `}
                                                    />
                                                ))}
                                            </div>

                                            <div className="ml-4">
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className="h-20 rounded-xl bg-blue-400/10" />
                                                    <div className="h-20 rounded-xl bg-violet-400/10" />
                                                    <div className="h-20 rounded-xl bg-orange-400/10" />
                                                </div>

                                                <div className="mt-3 h-28 rounded-xl border border-white/[0.06] bg-white/[0.03]" />

                                                <div className="mt-3 grid grid-cols-2 gap-2">
                                                    <div className="h-16 rounded-xl bg-white/[0.04]" />
                                                    <div className="h-16 rounded-xl bg-white/[0.04]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="
                                            absolute
                                            bottom-6
                                            left-6
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-slate-900/90
                                            px-4
                                            py-3
                                            shadow-lg
                                            md:backdrop-blur-md
                                        "
                                    >
                                        <p className="text-[8px] uppercase tracking-[0.2em] text-slate-500">
                                            Build
                                        </p>

                                        <p className="mt-1 text-xs font-bold text-white">
                                            Custom digital systems
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* =================================================
                        OTHER SERVICE CARDS
                    ================================================= */}

                    <div
                        className="
                            grid
                            gap-5
                            md:grid-cols-2
                            xl:grid-cols-4
                        "
                    >
                        {otherServices.map((service) => {
                            const style = accentStyles[service.accent];

                            return (
                                <article
                                    key={service.number}
                                    className={`
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-[28px]
                                        border
                                        border-slate-200/80
                                        bg-white
                                        p-6
                                        shadow-sm
                                        transition-shadow
                                        duration-300
                                        md:bg-white/80
                                        lg:backdrop-blur-md
                                        lg:hover:-translate-y-1
                                        lg:hover:shadow-lg
                                        motion-reduce:transform-none
                                        motion-reduce:transition-none
                                        dark:border-white/[0.07]
                                        dark:bg-white/[0.03]
                                        ${style.border}
                                    `}
                                >
                                    <div
                                        className={`
                                            pointer-events-none
                                            absolute
                                            hidden
                                            lg:block
                                            -right-20
                                            -top-20
                                            h-44
                                            w-44
                                            rounded-full
                                            blur-[70px]
                                            opacity-0
                                            transition-opacity
                                            duration-500
                                            group-hover:opacity-100
                                            ${style.glow}
                                        `}
                                    />

                                    <div className="relative">
                                        <div className="flex items-start justify-between">
                                            <ServiceIcon service={service} />

                                            <span
                                                className="
                                                    text-[9px]
                                                    font-black
                                                    tracking-[0.2em]
                                                    text-slate-300
                                                    dark:text-white/[0.14]
                                                "
                                            >
                                                {service.number}
                                            </span>
                                        </div>

                                        <h3
                                            className="
                                                mt-6
                                                text-lg
                                                font-bold
                                                leading-tight
                                                tracking-tight
                                                text-slate-950
                                                dark:text-white
                                            "
                                        >
                                            {service.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-3
                                                line-clamp-3
                                                text-xs
                                                leading-6
                                                text-slate-600
                                                dark:text-slate-400
                                            "
                                        >
                                            {service.description}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {service.tags.slice(0, 4).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`
                                                        rounded-md
                                                        border
                                                        px-2
                                                        py-1
                                                        text-[9px]
                                                        font-semibold
                                                        ${style.tag}
                                                    `}
                                                >
                                                    {tag}
                                                </span>
                                            ))}

                                            {service.tags.length > 4 && (
                                                <span
                                                    className="
                                                        rounded-md
                                                        border
                                                        border-slate-200
                                                        px-2
                                                        py-1
                                                        text-[9px]
                                                        font-semibold
                                                        text-slate-400
                                                        dark:border-white/[0.08]
                                                        dark:text-slate-500
                                                    "
                                                >
                                                    +{service.tags.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        <a
                                            href={service.href}
                                            className="
                                                mt-6
                                                flex
                                                items-center
                                                justify-between
                                                border-t
                                                border-slate-200/70
                                                pt-5
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-[0.16em]
                                                text-slate-400
                                                transition-colors
                                                group-hover:text-slate-950
                                                dark:border-white/[0.07]
                                                dark:text-slate-500
                                                dark:group-hover:text-white
                                            "
                                        >
                                            <span>Explore {service.shortTitle}</span>

                                            <span
                                                className="
                                                    flex
                                                    h-7
                                                    w-7
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-slate-200
                                                    transition-all
                                                    duration-300
                                                    group-hover:border-current
                                                    group-hover:bg-slate-950
                                                    group-hover:text-white
                                                    dark:border-white/[0.08]
                                                    dark:group-hover:bg-white
                                                    dark:group-hover:text-slate-950
                                                "
                                            >
                                                <ChevronRight size={13} />
                                            </span>
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* =====================================================
                    HOW WE CONNECT EVERYTHING
                ===================================================== */}

                <div className="mt-24">
                    <div className="text-center">
                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.3em]
                                text-blue-600
                                dark:text-blue-400
                            "
                        >
                            One connected process
                        </p>

                        <h3
                            className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-950
                                sm:text-4xl
                                dark:text-white
                            "
                        >
                            From requirement to reality.
                        </h3>

                        <p
                            className="
                                mx-auto
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Technology shouldn't feel like a collection of
                            disconnected vendors. We can help you move from
                            planning through implementation and ongoing support.
                        </p>
                    </div>

                    <div
                        className="
                            relative
                            mt-12
                            grid
                            gap-3
                            sm:grid-cols-2
                            lg:grid-cols-5
                        "
                    >
                        {[
                            {
                                number: "01",
                                title: "Understand",
                                text: "Requirements",
                            },
                            {
                                number: "02",
                                title: "Plan",
                                text: "Solution",
                            },
                            {
                                number: "03",
                                title: "Build",
                                text: "Technology",
                            },
                            {
                                number: "04",
                                title: "Deploy",
                                text: "Systems",
                            },
                            {
                                number: "05",
                                title: "Support",
                                text: "Growth",
                            },
                        ].map((step, index) => (
                            <div
                                key={step.number}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200/80
                                    bg-white
                                    p-5
                                    transition-colors
                                    duration-300
                                    md:bg-white/80
                                    lg:backdrop-blur-md
                                    lg:hover:-translate-y-1
                                    motion-reduce:transform-none
                                    motion-reduce:transition-none
                                    hover:border-blue-300
                                    dark:border-white/[0.07]
                                    dark:bg-white/[0.025]
                                    dark:hover:border-blue-500/30
                                "
                            >
                                <div className="flex items-center justify-between">
                                    <span
                                        className="
                                            text-[9px]
                                            font-black
                                            tracking-[0.2em]
                                            text-blue-500
                                        "
                                    >
                                        {step.number}
                                    </span>

                                    {index < 4 && (
                                        <ArrowRight
                                            size={13}
                                            className="
                                                hidden
                                                text-slate-300
                                                sm:block
                                                dark:text-slate-700
                                            "
                                        />
                                    )}
                                </div>

                                <h4
                                    className="
                                        mt-7
                                        text-base
                                        font-bold
                                        text-slate-950
                                        dark:text-white
                                    "
                                >
                                    {step.title}
                                </h4>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-500
                                        dark:text-slate-500
                                    "
                                >
                                    {step.text}
                                </p>

                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        h-0.5
                                        w-0
                                        bg-blue-500
                                        transition-all
                                        duration-500
                                        group-hover:w-full
                                    "
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* =====================================================
                    FINAL CTA
                ===================================================== */}

                <div
                    className="
                        relative
                        mt-24
                        overflow-hidden
                        rounded-[36px]
                        border
                        border-blue-500/20
                        bg-slate-950
                        px-7
                        py-12
                        shadow-[0_30px_100px_rgba(15,23,42,0.18)]
                        sm:px-10
                        sm:py-14
                        lg:px-16
                        lg:py-16
                    "
                >
                    {/* background glow */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            hidden
                            md:block
                            -right-32
                            -top-40
                            h-[450px]
                            w-[450px]
                            rounded-full
                            bg-blue-600/20
                            blur-[120px]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            hidden
                            lg:block
                            -bottom-40
                            left-[20%]
                            h-[350px]
                            w-[350px]
                            rounded-full
                            bg-violet-600/10
                            blur-[110px]
                        "
                    />

                    {/* decorative lines */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-0
                            top-0
                            h-full
                            w-1/2
                            opacity-30
                        "
                        style={{
                            backgroundImage: `
                                linear-gradient(
                                    rgba(255,255,255,0.06) 1px,
                                    transparent 1px
                                ),
                                linear-gradient(
                                    90deg,
                                    rgba(255,255,255,0.06) 1px,
                                    transparent 1px
                                )
                            `,
                            backgroundSize: "42px 42px",
                        }}
                    />

                    <div
                        className="
                            relative
                            flex
                            flex-col
                            gap-10
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        <div className="max-w-3xl">
                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-blue-400/20
                                    bg-blue-400/[0.08]
                                    px-3
                                    py-1.5
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-blue-300
                                "
                            >
                                <Check size={12} />
                                Technology. Simplified.
                            </div>

                            <h3
                                className="
                                    mt-6
                                    text-3xl
                                    font-black
                                    leading-tight
                                    tracking-[-0.04em]
                                    text-white
                                    sm:text-4xl
                                    lg:text-5xl
                                "
                            >
                                Have a technology requirement?
                            </h3>

                            <p
                                className="
                                    mt-5
                                    max-w-2xl
                                    text-sm
                                    leading-7
                                    text-slate-400
                                    sm:text-base
                                "
                            >
                                Tell us what you're trying to achieve. From a
                                single laptop to a complete business platform,
                                infrastructure deployment or automation
                                project, we'll help turn the requirement into
                                a practical technology solution.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <a
                                href="/support"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-2xl
                                    bg-white
                                    px-7
                                    py-4
                                    text-sm
                                    font-bold
                                    text-slate-950
                                    shadow-2xl
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-blue-50
                                    hover:gap-4
                                "
                            >
                                Discuss Your Requirements

                                <span
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-slate-950
                                        text-white
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                >
                                    <ArrowRight size={13} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}