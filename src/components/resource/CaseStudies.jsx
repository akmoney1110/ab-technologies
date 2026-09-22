import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    BarChart3,
    Building2,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Cloud,
    Cpu,
    Database,
    ExternalLink,
    FileText,
    Filter,
    Globe2,
    GraduationCap,
    Headphones,
    Layers3,
    LineChart,
    LockKeyhole,
    Mail,
    Menu,
    Network,
    PackageCheck,
    PlayCircle,
    Search,
    Server,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Target,
    TrendingUp,
    Users,
    Workflow,
    X,
    Zap,
} from "lucide-react";

/**
 * AB TECHNOLOGIES
 * Case Studies / Success Stories
 *
 * NOTE:
 * - This page intentionally does NOT include a global header/navbar.
 * - It is designed to work inside the existing application shell.
 * - Uses Tailwind CSS.
 * - Supports dark mode through Tailwind's `dark:` classes.
 * - No external image dependencies are required.
 * - Replace the illustrative case-study content with verified client stories
 *   before publishing them as factual customer claims.
 */

const CASE_STUDIES = [
    {
        id: 1,
        category: "Procurement",
        industry: "Education",
        title: "Modernising technology procurement for a growing education network",
        short:
            "A structured procurement programme helped standardise devices, improve visibility and create a more repeatable technology buying process.",
        description:
            "The organisation needed a practical way to plan device requirements across multiple locations while keeping purchasing decisions aligned with budgets, technical requirements and deployment realities.",
        challenge:
            "Technology requests were being handled independently. Different teams had different device requirements, purchasing information was fragmented, and there was limited standardisation across locations.",
        approach:
            "We organised requirements into a procurement framework covering device categories, quantities, technical specifications, supplier evaluation, delivery planning and deployment readiness.",
        outcome:
            "The result was a more controlled procurement workflow with clearer specifications, improved coordination and a stronger foundation for future technology refresh cycles.",
        icon: GraduationCap,
        color: "blue",
        metrics: [
            ["Procurement", "Standardised"],
            ["Planning", "Centralised"],
            ["Deployment", "Coordinated"],
        ],
        services: [
            "Hardware sourcing",
            "Specification development",
            "Supplier coordination",
            "Delivery planning",
            "Deployment support",
        ],
        tags: ["education", "hardware", "procurement", "deployment"],
        featured: true,
    },
    {
        id: 2,
        category: "Digital Solutions",
        industry: "Professional Services",
        title: "Replacing fragmented business workflows with a connected digital platform",
        short:
            "A unified software workflow brought information, approvals and operational activities into one structured environment.",
        description:
            "The business had grown around spreadsheets, email conversations and disconnected tools. The objective was to create a more reliable operating environment without overwhelming users with unnecessary complexity.",
        challenge:
            "Teams were spending too much time moving information between systems, following up on approvals and manually preparing operational reports.",
        approach:
            "We mapped the existing workflow, identified repetitive activities and designed a modular software solution around the organisation's actual processes.",
        outcome:
            "The organisation gained a clearer operational workflow, better information visibility and a scalable foundation for additional digital capabilities.",
        icon: Workflow,
        color: "violet",
        metrics: [
            ["Workflow", "Unified"],
            ["Reporting", "Improved"],
            ["Processes", "Digitised"],
        ],
        services: [
            "Business software",
            "Workflow automation",
            "Dashboard development",
            "Data modelling",
            "Systems integration",
        ],
        tags: ["software", "automation", "workflow", "digital"],
        featured: true,
    },
    {
        id: 3,
        category: "Infrastructure",
        industry: "SME",
        title: "Creating a more dependable IT foundation for a growing business",
        short:
            "Network, endpoint and infrastructure improvements created a stronger foundation for everyday business operations.",
        description:
            "The company was expanding but its IT environment had evolved incrementally. Connectivity, endpoint management, backups and support needed to become more structured.",
        challenge:
            "Users experienced inconsistent connectivity, different device configurations and limited visibility into infrastructure issues.",
        approach:
            "We assessed the environment, documented infrastructure requirements, improved network organisation and established a more systematic support model.",
        outcome:
            "The business moved toward a more predictable technology environment with clearer infrastructure ownership and easier support.",
        icon: Network,
        color: "cyan",
        metrics: [
            ["Infrastructure", "Organised"],
            ["Support", "Structured"],
            ["Visibility", "Improved"],
        ],
        services: [
            "Network assessment",
            "Infrastructure planning",
            "Endpoint setup",
            "Backup planning",
            "Managed support",
        ],
        tags: ["networking", "infrastructure", "support", "business"],
        featured: true,
    },
    {
        id: 4,
        category: "Cloud",
        industry: "Business Services",
        title: "Moving critical workloads toward a more flexible cloud environment",
        short:
            "A phased cloud strategy helped the organisation improve accessibility, resilience and operational flexibility.",
        description:
            "The organisation wanted to reduce dependence on a fragmented local infrastructure environment while maintaining control over access, data and operational continuity.",
        challenge:
            "Applications and files were spread across local devices and systems, making remote access, continuity and administration unnecessarily difficult.",
        approach:
            "We assessed workloads, identified suitable cloud candidates and developed a phased migration and management plan.",
        outcome:
            "The organisation gained a clearer cloud operating model and a practical roadmap for continued infrastructure modernisation.",
        icon: Cloud,
        color: "sky",
        metrics: [
            ["Cloud", "Phased"],
            ["Access", "Modernised"],
            ["Continuity", "Improved"],
        ],
        services: [
            "Cloud planning",
            "Migration strategy",
            "Hosting",
            "Access management",
            "Ongoing support",
        ],
        tags: ["cloud", "hosting", "migration", "infrastructure"],
        featured: false,
    },
    {
        id: 5,
        category: "Security",
        industry: "Corporate",
        title: "Strengthening everyday security across users and devices",
        short:
            "A practical security programme improved endpoint hygiene, access controls and user awareness.",
        description:
            "The organisation wanted security to become part of everyday operations rather than a separate technical exercise.",
        challenge:
            "Security controls varied between devices and users, while staff needed clearer guidance around access, passwords, suspicious messages and data handling.",
        approach:
            "We structured security improvements around identity, endpoints, access policies, backup considerations, user practices and ongoing monitoring.",
        outcome:
            "The business established a more consistent security baseline and a clearer process for maintaining it over time.",
        icon: ShieldCheck,
        color: "emerald",
        metrics: [
            ["Security", "Standardised"],
            ["Access", "Controlled"],
            ["Awareness", "Improved"],
        ],
        services: [
            "Security assessment",
            "Endpoint security",
            "Access controls",
            "Backup planning",
            "Security guidance",
        ],
        tags: ["security", "endpoint", "access", "compliance"],
        featured: false,
    },
    {
        id: 6,
        category: "Automation",
        industry: "Operations",
        title: "Automating repetitive operational processes",
        short:
            "Automation reduced repetitive administrative work and created a more consistent flow of operational information.",
        description:
            "The organisation relied on repetitive manual activities that consumed staff time and introduced avoidable inconsistencies.",
        challenge:
            "Teams repeatedly copied information, checked records manually and sent routine notifications across multiple channels.",
        approach:
            "We mapped the process, separated human decisions from repetitive tasks and introduced automation around data movement, notifications and routine actions.",
        outcome:
            "Staff gained more time for higher-value activities while the organisation moved toward more consistent process execution.",
        icon: Zap,
        color: "amber",
        metrics: [
            ["Tasks", "Automated"],
            ["Processes", "Consistent"],
            ["Operations", "Streamlined"],
        ],
        services: [
            "Process mapping",
            "Automation design",
            "API integration",
            "Notifications",
            "Monitoring",
        ],
        tags: ["automation", "integration", "operations", "api"],
        featured: false,
    },
    {
        id: 7,
        category: "Managed IT",
        industry: "Growing Business",
        title: "Building a dependable technology support model",
        short:
            "A structured support approach helped a growing company move from reactive troubleshooting toward planned IT operations.",
        description:
            "As the company grew, technology issues were increasingly affecting productivity. The business needed a clearer way to request support, prioritise issues and maintain its technology environment.",
        challenge:
            "Support was mostly reactive. Issues were reported through different channels and there was little central visibility into recurring problems.",
        approach:
            "We introduced structured support workflows, documentation, asset visibility and proactive maintenance practices.",
        outcome:
            "Technology support became more organised and easier to manage, giving users a clearer path when they needed assistance.",
        icon: Headphones,
        color: "indigo",
        metrics: [
            ["Support", "Structured"],
            ["Assets", "Tracked"],
            ["Issues", "Prioritised"],
        ],
        services: [
            "IT support",
            "Asset management",
            "Maintenance",
            "Documentation",
            "User assistance",
        ],
        tags: ["support", "managed-it", "assets", "maintenance"],
        featured: false,
    },
    {
        id: 8,
        category: "Business Systems",
        industry: "Trading & Distribution",
        title: "Connecting business records into a more useful management system",
        short:
            "A central business management environment improved visibility across customers, transactions, operations and reporting.",
        description:
            "The organisation needed stronger control over operational information while maintaining a workflow that staff could actually use every day.",
        challenge:
            "Information existed across spreadsheets, paper records and separate tools, making it difficult to get a consistent view of operations.",
        approach:
            "We designed a centralised management workflow with structured records, role-based access and reporting capabilities.",
        outcome:
            "Management gained a more coherent view of business activities and teams gained a more consistent way to maintain operational records.",
        icon: BarChart3,
        color: "rose",
        metrics: [
            ["Records", "Centralised"],
            ["Reporting", "Structured"],
            ["Visibility", "Improved"],
        ],
        services: [
            "Business systems",
            "Database design",
            "Role management",
            "Reporting",
            "Workflow design",
        ],
        tags: ["business", "management", "database", "reporting"],
        featured: false,
    },
    {
        id: 9,
        category: "Procurement",
        industry: "Corporate",
        title: "Managing a multi-category technology requirement",
        short:
            "A coordinated procurement programme brought hardware, networking, software and deployment requirements together.",
        description:
            "The organisation was not simply buying computers. It needed a complete technology package that included infrastructure, user devices, accessories, software and support.",
        challenge:
            "Multiple categories were being purchased separately, creating compatibility, timing and deployment risks.",
        approach:
            "We treated the requirement as one technology programme rather than a collection of individual purchases.",
        outcome:
            "Procurement decisions became more coordinated, helping align equipment, infrastructure and deployment requirements.",
        icon: PackageCheck,
        color: "orange",
        metrics: [
            ["Categories", "Integrated"],
            ["Planning", "Coordinated"],
            ["Delivery", "Structured"],
        ],
        services: [
            "Bulk procurement",
            "Hardware sourcing",
            "Infrastructure",
            "Accessories",
            "Deployment coordination",
        ],
        tags: ["procurement", "bulk", "hardware", "deployment"],
        featured: false,
    },
    {
        id: 10,
        category: "AI & Intelligent Solutions",
        industry: "Professional Services",
        title: "Introducing practical AI into everyday business workflows",
        short:
            "AI capabilities were introduced where they could support real business tasks rather than simply adding technology for its own sake.",
        description:
            "The organisation wanted to explore AI but needed a practical starting point tied to measurable operational value.",
        challenge:
            "Teams were interested in AI but lacked a clear framework for identifying useful applications and managing risks.",
        approach:
            "We identified high-value use cases such as information discovery, document assistance, workflow support and structured decision preparation.",
        outcome:
            "The organisation gained a practical AI adoption roadmap focused on useful applications, responsible implementation and future scalability.",
        icon: Sparkles,
        color: "fuchsia",
        metrics: [
            ["Use Cases", "Prioritised"],
            ["AI", "Practical"],
            ["Adoption", "Roadmapped"],
        ],
        services: [
            "AI strategy",
            "AI workflow design",
            "Automation",
            "Knowledge systems",
            "Integration",
        ],
        tags: ["ai", "automation", "intelligence", "digital"],
        featured: false,
    },
];

const CATEGORY_DATA = [
    {
        name: "All Stories",
        description: "Explore the complete collection.",
        icon: Layers3,
    },
    {
        name: "Procurement",
        description: "Technology sourcing and deployment.",
        icon: ShoppingBag,
    },
    {
        name: "Digital Solutions",
        description: "Software and business systems.",
        icon: Workflow,
    },
    {
        name: "Infrastructure",
        description: "Networks, systems and foundations.",
        icon: Server,
    },
    {
        name: "Cloud",
        description: "Hosting and digital infrastructure.",
        icon: Cloud,
    },
    {
        name: "Security",
        description: "Practical technology protection.",
        icon: ShieldCheck,
    },
    {
        name: "Automation",
        description: "Connected and efficient operations.",
        icon: Zap,
    },
    {
        name: "Managed IT",
        description: "Ongoing technology support.",
        icon: Headphones,
    },
    {
        name: "Business Systems",
        description: "Operational management platforms.",
        icon: BarChart3,
    },
    {
        name: "AI & Intelligent Solutions",
        description: "Practical AI adoption.",
        icon: Sparkles,
    },
];

const PROCESS = [
    {
        number: "01",
        title: "Understand",
        text: "We start with the organisation, its objectives, users, constraints and operating environment.",
        icon: Target,
    },
    {
        number: "02",
        title: "Structure",
        text: "We translate the requirement into a practical technology, procurement or transformation plan.",
        icon: Layers3,
    },
    {
        number: "03",
        title: "Implement",
        text: "We coordinate the right combination of software, hardware, infrastructure and services.",
        icon: Workflow,
    },
    {
        number: "04",
        title: "Improve",
        text: "We look beyond delivery and help establish a foundation that can evolve with the organisation.",
        icon: TrendingUp,
    },
];

const FAQS = [
    {
        question: "Are these case studies real customer projects?",
        answer:
            "The page is structured as a professional case-study framework. Replace illustrative stories, metrics and descriptions with verified customer projects, approved names and substantiated outcomes before presenting them as factual client results.",
    },
    {
        question: "Can case studies be anonymous?",
        answer:
            "Yes. Many organisations prefer confidentiality. You can describe the sector, challenge, scope, approach and verified outcomes without revealing the organisation's name.",
    },
    {
        question: "Can I add measurable results?",
        answer:
            "Absolutely. Strong case studies become more credible when they include verified metrics such as deployment volume, processing time, uptime improvements, cost reductions, adoption levels or cycle-time changes.",
    },
    {
        question: "Can customers request a similar solution?",
        answer:
            "Yes. Each story can lead naturally into a consultation or AI-powered request process so visitors can explain their own requirements and receive a suitable next step.",
    },
    {
        question: "Can this page include downloadable case studies?",
        answer:
            "Yes. You can attach approved PDF case studies, implementation briefs, procurement summaries or executive one-pagers to individual stories.",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function colorClasses(color) {
    const map = {
        blue: {
            soft: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
            border: "border-blue-500/20",
            gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
            dot: "bg-blue-500",
        },
        violet: {
            soft: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
            border: "border-violet-500/20",
            gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
            dot: "bg-violet-500",
        },
        cyan: {
            soft: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
            border: "border-cyan-500/20",
            gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
            dot: "bg-cyan-500",
        },
        sky: {
            soft: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
            border: "border-sky-500/20",
            gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
            dot: "bg-sky-500",
        },
        emerald: {
            soft: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            border: "border-emerald-500/20",
            gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
            dot: "bg-emerald-500",
        },
        amber: {
            soft: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            border: "border-amber-500/20",
            gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
            dot: "bg-amber-500",
        },
        indigo: {
            soft: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
            border: "border-indigo-500/20",
            gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
            dot: "bg-indigo-500",
        },
        rose: {
            soft: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
            border: "border-rose-500/20",
            gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
            dot: "bg-rose-500",
        },
        orange: {
            soft: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
            border: "border-orange-500/20",
            gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
            dot: "bg-orange-500",
        },
        fuchsia: {
            soft: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
            border: "border-fuchsia-500/20",
            gradient: "from-fuchsia-500/20 via-violet-500/10 to-transparent",
            dot: "bg-fuchsia-500",
        },
    };

    return map[color] || map.blue;
}

function SectionLabel({ children, icon: Icon = Sparkles }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
            <Icon className="h-3.5 w-3.5" />
            {children}
        </div>
    );
}

function CaseStudyCard({ item, onOpen }) {
    const Icon = item.icon;
    const colors = colorClasses(item.color);

    return (
        <article
            className={classNames(
                "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border",
                "border-slate-200/80 bg-white/80 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.35)]",
                "backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)]",
                "dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_25px_80px_-45px_rgba(0,0,0,0.9)]",
            )}
        >
            <div
                className={classNames(
                    "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-br opacity-80",
                    colors.gradient,
                )}
            />

            <div className="relative p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                    <div
                        className={classNames(
                            "flex h-12 w-12 items-center justify-center rounded-2xl border",
                            colors.soft,
                            colors.border,
                        )}
                    >
                        <Icon className="h-6 w-6" />
                    </div>

                    {item.featured && (
                        <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300">
                            Featured
                        </span>
                    )}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className={classNames("rounded-full px-2.5 py-1", colors.soft)}>
                        {item.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400">
                        {item.industry}
                    </span>
                </div>

                <h3 className="mt-4 text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-white">
                    {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.short}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2">
                    {item.metrics.map(([label, value]) => (
                        <div
                            key={label}
                            className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-slate-950/30"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {label}
                            </div>
                            <div className="mt-1 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                                {value}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => onOpen(item)}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-black text-slate-950 transition group-hover:gap-3 dark:text-white"
                >
                    Read case study
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </article>
    );
}

function CaseStudyModal({ item, onClose, onDiscuss }) {
    if (!item) return null;

    const Icon = item.icon;
    const colors = colorClasses(item.color);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-white shadow-2xl dark:bg-slate-950">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-lg transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:bg-slate-800"
                    aria-label="Close case study"
                >
                    <X className="h-5 w-5" />
                </button>

                <div
                    className={classNames(
                        "relative overflow-hidden border-b border-slate-200/80 p-7 sm:p-10 dark:border-white/10",
                        "bg-gradient-to-br",
                        colors.gradient,
                    )}
                >
                    <div className="relative max-w-3xl pr-10">
                        <div
                            className={classNames(
                                "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border",
                                colors.soft,
                                colors.border,
                            )}
                        >
                            <Icon className="h-7 w-7" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className={classNames("rounded-full px-3 py-1 text-xs font-bold", colors.soft)}>
                                {item.category}
                            </span>
                            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                                {item.industry}
                            </span>
                        </div>

                        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            {item.title}
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            {item.description}
                        </p>
                    </div>
                </div>

                <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.5fr_0.8fr]">
                    <div className="space-y-8">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
                                <Target className="h-4 w-4" />
                                The challenge
                            </div>
                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                                {item.challenge}
                            </p>
                        </div>

                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
                                <Workflow className="h-4 w-4" />
                                Our approach
                            </div>
                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                                {item.approach}
                            </p>
                        </div>

                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
                                <TrendingUp className="h-4 w-4" />
                                The outcome
                            </div>
                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                                {item.outcome}
                            </p>
                        </div>
                    </div>

                    <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                        <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                            Scope
                        </div>

                        <div className="mt-5 space-y-3">
                            {item.services.map((service) => (
                                <div
                                    key={service}
                                    className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200"
                                >
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                    <span>{service}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 border-t border-slate-200 pt-6 dark:border-white/10">
                            <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                Key indicators
                            </div>

                            <div className="mt-4 space-y-3">
                                {item.metrics.map(([label, value]) => (
                                    <div key={label} className="flex items-center justify-between gap-3">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {label}
                                        </span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <div className="text-sm font-black text-slate-950 dark:text-white">
                                Working on a similar challenge?
                            </div>
                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Turn the lessons from this story into a plan for your organisation.
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onDiscuss(item)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                        >
                            Start a conversation
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MiniStat({ icon: Icon, value, label }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]">
                <Icon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
                <div className="text-lg font-black text-slate-950 dark:text-white">
                    {value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                </div>
            </div>
        </div>
    );
}

export default function CaseStudy() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All Stories");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [sortMode, setSortMode] = useState("featured");
    const [openFaq, setOpenFaq] = useState(null);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a technology requirement with AB Technologies.",
            metadata: {
                Source: "Case Studies",
                ...metadata,
            },
        });

        setSelectedStudy(null);
        navigate("/support/ai");
    };

    const filteredStudies = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        let result = CASE_STUDIES.filter((study) => {
            const categoryMatch =
                activeCategory === "All Stories" || study.category === activeCategory;

            if (!categoryMatch) return false;

            if (!query) return true;

            const searchable = [
                study.title,
                study.short,
                study.description,
                study.challenge,
                study.approach,
                study.outcome,
                study.category,
                study.industry,
                ...study.services,
                ...study.tags,
            ]
                .join(" ")
                .toLowerCase();

            return searchable.includes(query);
        });

        if (sortMode === "alphabetical") {
            result = [...result].sort((a, b) =>
                a.title.localeCompare(b.title),
            );
        }

        if (sortMode === "category") {
            result = [...result].sort((a, b) =>
                a.category.localeCompare(b.category),
            );
        }

        if (sortMode === "featured") {
            result = [...result].sort(
                (a, b) => Number(b.featured) - Number(a.featured),
            );
        }

        return result;
    }, [activeCategory, searchTerm, sortMode]);

    const visibleCategories = showAllCategories
        ? CATEGORY_DATA
        : CATEGORY_DATA.slice(0, 6);

    return (
        <main className="min-h-screen overflow-hidden bg-[#f7f8fb] text-slate-950 selection:bg-slate-900 selection:text-white dark:bg-[#070a0f] dark:text-white dark:selection:bg-white dark:selection:text-slate-950">
            {/* ============================================================
          BACKGROUND SYSTEM
      ============================================================ */}

            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-12rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/[0.08]" />
                <div className="absolute right-[-10rem] top-[15rem] h-[30rem] w-[30rem] rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/[0.07]" />
                <div className="absolute bottom-[-12rem] left-[25%] h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/[0.05]" />

                <div
                    className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(100,116,139,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.08) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            {/* ============================================================
          HERO
      ============================================================ */}

            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <SectionLabel icon={FileText}>Case studies & insights</SectionLabel>

                            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                                Technology decisions,
                                <span className="block bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-500">
                                    put into practice.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                Explore how organisations can approach procurement, software,
                                infrastructure, cloud, security, automation and digital
                                transformation with greater structure, clarity and confidence.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#case-studies"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    Explore case studies
                                    <ArrowRight className="h-4 w-4" />
                                </a>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a technology requirement for our organization.",
                                            { Intent: "Discuss requirement" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-black text-slate-800 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    Discuss your requirement
                                    <Sparkles className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-7 sm:grid-cols-4 dark:border-white/10">
                                <MiniStat icon={Layers3} value="10+" label="Stories" />
                                <MiniStat icon={Building2} value="8+" label="Industries" />
                                <MiniStat icon={Cpu} value="9" label="Capability areas" />
                                <MiniStat icon={Globe2} value="Multi" label="Market focus" />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-cyan-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/75 p-6 shadow-[0_35px_100px_-45px_rgba(15,23,42,.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_35px_100px_-45px_rgba(0,0,0,.9)] sm:p-8">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Technology journey
                                        </div>
                                        <div className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                                            From requirement to outcome
                                        </div>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                        <LineChart className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="relative mt-8 space-y-6">
                                    <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-blue-500 via-violet-500 to-transparent opacity-30" />

                                    {[
                                        {
                                            title: "Business requirement",
                                            text: "Understand the real problem before selecting technology.",
                                            icon: Target,
                                        },
                                        {
                                            title: "Technology strategy",
                                            text: "Define an appropriate mix of products, platforms and services.",
                                            icon: Layers3,
                                        },
                                        {
                                            title: "Implementation",
                                            text: "Coordinate deployment, configuration, integration and adoption.",
                                            icon: Workflow,
                                        },
                                        {
                                            title: "Measured improvement",
                                            text: "Track outcomes and create a foundation for the next stage.",
                                            icon: TrendingUp,
                                        },
                                    ].map((step, index) => {
                                        const Icon = step.icon;

                                        return (
                                            <div key={step.title} className="relative flex gap-4">
                                                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
                                                    <Icon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                                                </div>

                                                <div className="pt-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black text-slate-400">
                                                            0{index + 1}
                                                        </span>
                                                        <h3 className="text-sm font-black text-slate-950 dark:text-white">
                                                            {step.title}
                                                        </h3>
                                                    </div>
                                                    <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                        {step.text}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/50">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                        <p className="text-xs font-semibold leading-6 text-slate-600 dark:text-slate-300">
                                            Good technology work is not only about what gets
                                            delivered. It is about whether the solution fits the
                                            organisation and remains useful after delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          INTRODUCTION / TRUST
      ============================================================ */}

            <section className="border-y border-slate-200/70 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <SectionLabel icon={ShieldCheck}>How to read these stories</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Practical examples, not technology theatre.
                            </h2>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-3">
                            {[
                                {
                                    icon: Target,
                                    title: "Problem first",
                                    text: "The starting point is the business requirement, not a product list.",
                                },
                                {
                                    icon: Layers3,
                                    title: "Fit matters",
                                    text: "Solutions are evaluated around users, budgets, infrastructure and growth.",
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Outcomes matter",
                                    text: "The goal is useful, maintainable improvement rather than technology for its own sake.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                                        <h3 className="mt-5 text-sm font-black text-slate-950 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          FEATURED STORIES
      ============================================================ */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <SectionLabel icon={Sparkles}>Featured stories</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                See the thinking behind the work.
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                Explore selected examples across procurement, digital
                                solutions and infrastructure. Each story is structured around
                                the challenge, approach and outcome.
                            </p>
                        </div>

                        <a
                            href="#case-studies"
                            className="inline-flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white"
                        >
                            View all stories
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {CASE_STUDIES.filter((study) => study.featured).map((study) => (
                            <CaseStudyCard
                                key={study.id}
                                item={study}
                                onOpen={setSelectedStudy}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
          CASE STUDY EXPLORER
      ============================================================ */}

            <section
                id="case-studies"
                className="relative scroll-mt-24 border-y border-slate-200/70 bg-slate-50/80 py-20 dark:border-white/10 dark:bg-[#0b0f16]"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel icon={Search}>Case study library</SectionLabel>

                        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Find a story relevant to your organisation.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            Search by capability, industry, technology challenge or
                            implementation area.
                        </p>
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-xl shadow-slate-950/[0.03] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <div className="relative flex-1">
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search case studies..."
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:focus:border-white/20 dark:focus:ring-white/5"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowFilters((value) => !value)}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                            </button>

                            <div className="relative">
                                <select
                                    value={sortMode}
                                    onChange={(event) => setSortMode(event.target.value)}
                                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-5 pr-10 text-sm font-black text-slate-700 outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 sm:w-52"
                                >
                                    <option value="featured">Featured first</option>
                                    <option value="alphabetical">A–Z</option>
                                    <option value="category">By category</option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>

                        {showFilters && (
                            <div className="mt-4 border-t border-slate-200 pt-4 dark:border-white/10">
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORY_DATA.map((category) => {
                                        const Icon = category.icon;
                                        const active = activeCategory === category.name;

                                        return (
                                            <button
                                                type="button"
                                                key={category.name}
                                                onClick={() => setActiveCategory(category.name)}
                                                className={classNames(
                                                    "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black transition",
                                                    active
                                                        ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300",
                                                )}
                                            >
                                                <Icon className="h-3.5 w-3.5" />
                                                {category.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-2">
                        {visibleCategories.map((category) => {
                            const Icon = category.icon;
                            const active = activeCategory === category.name;

                            return (
                                <button
                                    type="button"
                                    key={category.name}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={classNames(
                                        "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-black transition",
                                        active
                                            ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:border-white dark:bg-white dark:text-slate-950"
                                            : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.07]",
                                    )}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {category.name}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setShowAllCategories((value) => !value)}
                            className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-xs font-black text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            {showAllCategories ? "Show less" : "More"}
                            <ChevronDown
                                className={classNames(
                                    "h-3.5 w-3.5 transition",
                                    showAllCategories && "rotate-180",
                                )}
                            />
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Showing{" "}
                            <span className="font-black text-slate-900 dark:text-white">
                                {filteredStudies.length}
                            </span>{" "}
                            {filteredStudies.length === 1 ? "story" : "stories"}
                        </p>

                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className="text-xs font-black text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                            >
                                Clear search
                            </button>
                        )}
                    </div>

                    {filteredStudies.length > 0 ? (
                        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredStudies.map((study) => (
                                <CaseStudyCard
                                    key={study.id}
                                    item={study}
                                    onOpen={setSelectedStudy}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center dark:border-white/15 dark:bg-white/[0.03]">
                            <Search className="mx-auto h-8 w-8 text-slate-400" />

                            <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                No matching case studies
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Try another keyword or select a different capability area.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveCategory("All Stories");
                                }}
                                className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"
                            >
                                Reset filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================
          CASE STUDY FRAMEWORK
      ============================================================ */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <SectionLabel icon={Layers3}>Our case-study framework</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                A simple structure for understanding complex technology work.
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                Every strong case study should answer the questions a decision
                                maker actually cares about: What was wrong? What needed to
                                change? Why was the approach chosen? What happened afterwards?
                            </p>

                            <div className="mt-8 rounded-3xl border border-slate-200 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                                    <div>
                                        <div className="text-sm font-black text-slate-950 dark:text-white">
                                            Trust is built through evidence.
                                        </div>
                                        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            When publishing client results, use only metrics,
                                            testimonials, logos and claims that have been verified
                                            and approved for publication.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    number: "01",
                                    title: "Context",
                                    icon: Building2,
                                    text: "What kind of organisation was involved and what environment were they operating in?",
                                },
                                {
                                    number: "02",
                                    title: "Challenge",
                                    icon: Target,
                                    text: "What business or technology problem needed to be solved?",
                                },
                                {
                                    number: "03",
                                    title: "Approach",
                                    icon: Workflow,
                                    text: "How were requirements analysed and translated into an actionable solution?",
                                },
                                {
                                    number: "04",
                                    title: "Solution",
                                    icon: Cpu,
                                    text: "What technology, services or operating model was implemented?",
                                },
                                {
                                    number: "05",
                                    title: "Outcome",
                                    icon: TrendingUp,
                                    text: "What changed for the organisation after implementation?",
                                },
                                {
                                    number: "06",
                                    title: "Next stage",
                                    icon: ArrowRight,
                                    text: "How can the organisation continue improving from the new foundation?",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.number}
                                        className="group rounded-3xl border border-slate-200/80 bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                                <Icon className="h-4 w-4" />
                                            </div>

                                            <span className="text-xs font-black text-slate-300 dark:text-slate-600">
                                                {item.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-base font-black text-slate-950 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          INDUSTRY VIEW
      ============================================================ */}

            <section className="border-y border-slate-200/70 bg-white/50 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <SectionLabel icon={Building2}>Across industries</SectionLabel>

                        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Technology has different requirements in every environment.
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                            Our case-study library can grow around the industries and
                            operating environments that matter most to your customers.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "Education",
                                icon: GraduationCap,
                                text: "Devices, connectivity, learning systems and administration.",
                            },
                            {
                                title: "Healthcare",
                                icon: ShieldCheck,
                                text: "Reliable infrastructure, secure information and operational systems.",
                            },
                            {
                                title: "Government",
                                icon: Building2,
                                text: "Procurement, infrastructure, digital services and controlled access.",
                            },
                            {
                                title: "Retail & Hospitality",
                                icon: ShoppingBag,
                                text: "Customer operations, devices, connectivity and business systems.",
                            },
                            {
                                title: "Manufacturing",
                                icon: Cpu,
                                text: "Industrial systems, infrastructure, devices and operational visibility.",
                            },
                            {
                                title: "NGOs",
                                icon: Globe2,
                                text: "Cost-conscious technology, procurement and digital operations.",
                            },
                            {
                                title: "Startups",
                                icon: Zap,
                                text: "Lean infrastructure, software platforms and scalable technology.",
                            },
                            {
                                title: "Corporate",
                                icon: Users,
                                text: "Enterprise procurement, systems, security and managed support.",
                            },
                        ].map((industry) => {
                            const Icon = industry.icon;

                            return (
                                <div
                                    key={industry.title}
                                    className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.07]">
                                        <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                                    </div>

                                    <h3 className="mt-5 text-sm font-black text-slate-950 dark:text-white">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        {industry.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
          WHAT MAKES A GOOD CASE STUDY
      ============================================================ */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 p-7 text-white shadow-2xl dark:border-white/10 sm:p-10">
                            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

                            <div className="relative">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                                        <BarChart3 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                            Evidence
                                        </div>
                                        <div className="mt-1 text-lg font-black">
                                            What decision makers want to know
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-9 space-y-4">
                                    {[
                                        ["Business impact", "What improved?"],
                                        ["Operational impact", "What became easier?"],
                                        ["Technology impact", "What became more reliable?"],
                                        ["Financial impact", "What measurable value was created?"],
                                        ["People impact", "How did users benefit?"],
                                    ].map(([label, question], index) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-slate-500">
                                                    0{index + 1}
                                                </span>
                                                <span className="text-sm font-bold">{label}</span>
                                            </div>

                                            <span className="text-xs text-slate-400">{question}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <SectionLabel icon={BarChart3}>Results that matter</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Move beyond “we delivered it.”
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                A mature technology case study should explain why the work
                                mattered. That means connecting technology activity to business
                                outcomes wherever the evidence exists.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    {
                                        icon: Clock3,
                                        title: "Time",
                                        text: "Cycle time, response time, deployment time or administrative effort.",
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Performance",
                                        text: "Operational improvements, reliability or capacity.",
                                    },
                                    {
                                        icon: BarChart3,
                                        title: "Cost",
                                        text: "Verified savings, cost avoidance or better resource utilisation.",
                                    },
                                    {
                                        icon: Users,
                                        title: "Adoption",
                                        text: "User adoption, usage or process participation.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.title} className="flex gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.06]">
                                                <Icon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-black text-slate-950 dark:text-white">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          PROCESS
      ============================================================ */}

            <section className="border-y border-slate-200/70 bg-slate-50/70 py-20 dark:border-white/10 dark:bg-[#0b0f16] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel icon={Workflow}>Our working model</SectionLabel>

                        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            From business need to a technology foundation that can grow.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            The exact implementation changes from project to project, but
                            the discipline behind the work remains consistent.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {PROCESS.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.number}
                                    className="relative rounded-[2rem] border border-slate-200/80 bg-white/80 p-7 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span className="text-xs font-black text-slate-300 dark:text-slate-600">
                                            {item.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 text-lg font-black text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
          SERVICES CONNECTION
      ============================================================ */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/80 p-7 shadow-xl shadow-slate-950/[0.03] dark:border-white/10 dark:bg-white/[0.035] sm:p-10 lg:p-12">
                        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                            <div>
                                <SectionLabel icon={Layers3}>From story to service</SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                    See something familiar?
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    A case study should not be the end of the conversation. It
                                    should help you recognise a challenge and understand what a
                                    sensible next step could look like.
                                </p>

                                <a
                                    href="/services"
                                    className="mt-7 inline-flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white"
                                >
                                    Explore our services
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    {
                                        icon: ShoppingBag,
                                        title: "Procurement",
                                        text: "Source and deploy the technology your organisation needs.",
                                    },
                                    {
                                        icon: CodeIcon,
                                        title: "Software",
                                        text: "Build applications and business systems around real workflows.",
                                    },
                                    {
                                        icon: Network,
                                        title: "Infrastructure",
                                        text: "Create dependable network and technology foundations.",
                                    },
                                    {
                                        icon: Cloud,
                                        title: "Cloud",
                                        text: "Plan hosting, migration and digital infrastructure.",
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Security",
                                        text: "Strengthen everyday technology protection and controls.",
                                    },
                                    {
                                        icon: Sparkles,
                                        title: "AI",
                                        text: "Identify practical opportunities for intelligent automation.",
                                    },
                                ].map((service) => {
                                    const Icon = service.icon;

                                    return (
                                        <div
                                            key={service.title}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/40"
                                        >
                                            <Icon className="h-4 w-4 text-slate-600 dark:text-slate-300" />

                                            <h3 className="mt-4 text-sm font-black text-slate-950 dark:text-white">
                                                {service.title}
                                            </h3>

                                            <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                {service.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          DOWNLOADABLE RESOURCES
      ============================================================ */}

            <section className="border-y border-slate-200/70 bg-white/50 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <SectionLabel icon={FileText}>Related resources</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Turn case studies into useful buying knowledge.
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                Complement your stories with guides that help customers make
                                better technology decisions before they contact you.
                            </p>
                        </div>

                        <a
                            href="/resources"
                            className="inline-flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white"
                        >
                            View resources
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: ShoppingBag,
                                type: "Buying guide",
                                title: "How to plan a business laptop refresh",
                                text: "A practical framework for specifications, quantities, warranties and deployment.",
                            },
                            {
                                icon: Network,
                                type: "Procurement guide",
                                title: "Planning a reliable office network",
                                text: "Questions to answer before buying switches, access points and connectivity.",
                            },
                            {
                                icon: ShieldCheck,
                                type: "Security guide",
                                title: "Building a practical security baseline",
                                text: "A starting framework for identity, endpoints, backups and user practices.",
                            },
                        ].map((resource) => {
                            const Icon = resource.icon;

                            return (
                                <a
                                    key={resource.title}
                                    href="/resources"
                                    className="group rounded-3xl border border-slate-200/80 bg-white/75 p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.07]">
                                            <Icon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                                        </div>

                                        <ExternalLink className="h-4 w-4 text-slate-400 transition group-hover:text-slate-900 dark:group-hover:text-white" />
                                    </div>

                                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                                        {resource.type}
                                    </div>

                                    <h3 className="mt-2 text-base font-black text-slate-950 dark:text-white">
                                        {resource.title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        {resource.text}
                                    </p>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
          FAQ
      ============================================================ */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <SectionLabel icon={FileText}>Frequently asked questions</SectionLabel>

                        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Questions about our case studies.
                        </h2>
                    </div>

                    <div className="mt-10 space-y-3">
                        {FAQS.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(open ? null : index)}
                                        className="flex w-full items-center justify-between gap-5 p-5 text-left"
                                        aria-expanded={open}
                                    >
                                        <span className="text-sm font-black text-slate-950 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={classNames(
                                                "h-4 w-4 shrink-0 text-slate-400 transition",
                                                open && "rotate-180",
                                            )}
                                        />
                                    </button>

                                    {open && (
                                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10">
                                            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
          CTA
      ============================================================ */}

            <section className="relative pb-20 lg:pb-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2.75rem] bg-slate-950 px-7 py-14 text-white shadow-2xl sm:px-10 lg:px-16 lg:py-20 dark:border dark:border-white/10">
                        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
                        <div className="absolute -bottom-28 left-[20%] h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
                        <div className="absolute right-[25%] top-[40%] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                            <div className="max-w-3xl">
                                <SectionLabel icon={Sparkles}>
                                    Build your own success story
                                </SectionLabel>

                                <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                    Have a technology challenge worth solving?
                                </h2>

                                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                                    Tell us what you are trying to achieve. We can help you
                                    structure the requirement, explore the available options and
                                    identify a practical path forward.
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like a quote for a technology requirement.",
                                                { Intent: "Request quote" }
                                            )
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                                    >
                                        Request a quote
                                        <ArrowRight className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to talk to AB Technologies about our technology needs.",
                                                { Intent: "Talk to team" }
                                            )
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/[0.1]"
                                    >
                                        Contact AB Technologies
                                        <Mail className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                                {[
                                    [Cpu, "Hardware"],
                                    [CodeIcon, "Software"],
                                    [Network, "Infrastructure"],
                                    [Sparkles, "AI"],
                                ].map(([Icon, label]) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3"
                                    >
                                        <Icon className="h-4 w-4 text-slate-300" />
                                        <span className="text-xs font-bold text-slate-200">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          SMALL FOOTER-LIKE RESOURCE BAR
          Global footer remains outside this page.
      ============================================================ */}

            <section className="border-t border-slate-200/70 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 sm:px-6 md:flex-row md:items-center lg:px-8">
                    <div>
                        <div className="text-sm font-black text-slate-950 dark:text-white">
                            AB TECHNOLOGIES
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Technology. Simplified.
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-5 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <a className="transition hover:text-slate-950 dark:hover:text-white" href="/services">
                            Services
                        </a>
                        <a className="transition hover:text-slate-950 dark:hover:text-white" href="/industries">
                            Industries
                        </a>
                        <a className="transition hover:text-slate-950 dark:hover:text-white" href="/resources">
                            Resources
                        </a>
                        <a className="transition hover:text-slate-950 dark:hover:text-white" href="/contact">
                            Contact
                        </a>
                    </div>
                </div>
            </section>

            {/* ============================================================
          MODAL
      ============================================================ */}

            <CaseStudyModal
                item={selectedStudy}
                onClose={() => setSelectedStudy(null)}
                onDiscuss={(study) =>
                    startSupportChat(
                        `I'm working on a challenge similar to "${study.title}" and would like to discuss a suitable approach.`,
                        {
                            Intent: "Case study enquiry",
                            CaseStudy: study.title,
                            Category: study.category,
                            Industry: study.industry,
                        }
                    )
                }
            />
        </main>
    );
}

/**
 * Small local icon component.
 * Keeping it here avoids adding another dependency.
 */
function CodeIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="m8 9-4 3 4 3" />
            <path d="m16 9 4 3-4 3" />
            <path d="m14 5-4 14" />
        </svg>
    );
}