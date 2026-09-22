import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Boxes,
    BriefcaseBusiness,
    Building2,
    Check,
    ChevronDown,
    ChevronRight,
    Cloud,
    Code2,
    Cog,
    Cpu,
    Database,
    FileCheck2,
    Globe2,
    GraduationCap,
    Handshake,
    Headphones,
    Layers3,
    Lightbulb,
    Lock,
    Monitor,
    Network,
    PackageCheck,
    PanelsTopLeft,
    Puzzle,
    Rocket,
    Search,
    Server,
    ShieldCheck,
    Sparkles,
    Store,
    Target,
    Terminal,
    TrendingUp,
    Users,
    Workflow,
    Wrench,
    Zap,
} from "lucide-react";

/* ============================================================
   CAPABILITY DATA
============================================================ */

const capabilityGroups = [
    {
        id: "strategy",
        number: "01",
        icon: Target,
        title: "Technology Planning & Advisory",
        eyebrow: "PLAN",
        description:
            "We help organizations understand what technology they need, why they need it, how the pieces should work together, and what should happen first.",
        capabilities: [
            "Technology requirements discovery",
            "Digital strategy planning",
            "IT environment assessment",
            "Technology roadmaps",
            "Infrastructure planning",
            "Software requirements analysis",
            "Procurement planning",
            "Technology modernization planning",
            "Digital transformation planning",
            "Growth and scalability planning",
        ],
    },
    {
        id: "procurement",
        number: "02",
        icon: PackageCheck,
        title: "Hardware & Technology Procurement",
        eyebrow: "SOURCE",
        description:
            "We can help organizations source the devices, infrastructure equipment, accessories and technology products required to operate effectively.",
        capabilities: [
            "Laptop procurement",
            "Desktop computer procurement",
            "Server procurement",
            "Networking equipment",
            "Printers and peripherals",
            "Monitors and displays",
            "Storage equipment",
            "Workplace accessories",
            "Bulk procurement",
            "Institutional procurement",
            "Corporate procurement",
            "Hardware sourcing",
            "International sourcing",
            "Supplier and vendor sourcing",
            "Competitive quotations",
            "Product verification",
            "Logistics coordination",
        ],
    },
    {
        id: "software",
        number: "03",
        icon: Code2,
        title: "Software & Application Development",
        eyebrow: "BUILD",
        description:
            "We design and develop digital products that help organizations manage operations, serve customers, automate processes and create new digital capabilities.",
        capabilities: [
            "Web application development",
            "Business management systems",
            "Enterprise applications",
            "Internal business portals",
            "Customer portals",
            "Employee portals",
            "Intranet development",
            "Workflow systems",
            "Document management systems",
            "Data-driven applications",
            "API development",
            "System integrations",
            "Mobile applications",
            "Custom dashboards",
            "Administrative platforms",
        ],
    },
    {
        id: "infrastructure",
        number: "04",
        icon: Network,
        title: "Networking & IT Infrastructure",
        eyebrow: "CONNECT",
        description:
            "We help create connected technology environments that allow people, devices, applications and infrastructure to work together.",
        capabilities: [
            "LAN infrastructure",
            "WAN connectivity",
            "Wi-Fi deployment",
            "Network planning",
            "Network equipment",
            "Server environments",
            "Infrastructure configuration",
            "Network troubleshooting",
            "Office connectivity",
            "Infrastructure modernization",
            "IT equipment deployment",
            "Network documentation",
        ],
    },
    {
        id: "cloud",
        number: "05",
        icon: Cloud,
        title: "Cloud & Digital Infrastructure",
        eyebrow: "HOST",
        description:
            "We help organizations use cloud and hosted infrastructure for applications, websites, services, storage, deployments and digital operations.",
        capabilities: [
            "Cloud infrastructure",
            "Web hosting",
            "Application hosting",
            "Server deployment",
            "Cloud migration planning",
            "Deployment environments",
            "Backup infrastructure",
            "Domain and DNS configuration",
            "SSL deployment",
            "Infrastructure monitoring",
            "Digital infrastructure management",
            "Environment optimization",
        ],
    },
    {
        id: "security",
        number: "06",
        icon: ShieldCheck,
        title: "Security & Protection",
        eyebrow: "PROTECT",
        description:
            "Security considerations can be incorporated into infrastructure, applications, devices, access systems and operational workflows.",
        capabilities: [
            "Security planning",
            "Access control",
            "Identity considerations",
            "Endpoint protection",
            "Network security",
            "Secure application practices",
            "Backup planning",
            "Data protection",
            "Security awareness",
            "Infrastructure hardening",
            "Operational resilience",
        ],
    },
    {
        id: "automation",
        number: "07",
        icon: Workflow,
        title: "Automation & Integration",
        eyebrow: "AUTOMATE",
        description:
            "We identify repetitive, disconnected and manual processes that can be improved through automation and system integration.",
        capabilities: [
            "Workflow automation",
            "Business process automation",
            "API integrations",
            "System-to-system integrations",
            "Data synchronization",
            "Automated notifications",
            "Document workflows",
            "Approval workflows",
            "Scheduled processes",
            "Operational dashboards",
            "Process optimization",
        ],
    },
    {
        id: "ai",
        number: "08",
        icon: Sparkles,
        title: "AI & Intelligent Solutions",
        eyebrow: "INTELLIGENCE",
        description:
            "We explore practical ways artificial intelligence can improve workflows, customer experiences, information access and decision-making.",
        capabilities: [
            "AI-assisted applications",
            "Intelligent search",
            "AI document processing",
            "AI-powered workflows",
            "Conversational interfaces",
            "AI-assisted customer support",
            "Content automation",
            "Data analysis workflows",
            "Intelligent request systems",
            "AI-enabled internal tools",
        ],
    },
    {
        id: "support",
        number: "09",
        icon: Headphones,
        title: "Managed IT & Technical Support",
        eyebrow: "SUPPORT",
        description:
            "Technology needs attention after deployment. We can support organizations with maintenance, troubleshooting, optimization and technical assistance.",
        capabilities: [
            "Technical support",
            "IT troubleshooting",
            "System maintenance",
            "Device support",
            "Network support",
            "Server support",
            "Application support",
            "Infrastructure support",
            "Configuration assistance",
            "Technology optimization",
            "IT environment reviews",
        ],
    },
];

const capabilityPillars = [
    {
        icon: Search,
        title: "Understand",
        text:
            "We begin by understanding the requirement, environment, people and desired outcome.",
    },
    {
        icon: Target,
        title: "Plan",
        text:
            "We translate the requirement into priorities, technical considerations and an actionable direction.",
    },
    {
        icon: PackageCheck,
        title: "Source",
        text:
            "Where products or external technology are required, we can help identify and source appropriate options.",
    },
    {
        icon: Code2,
        title: "Build",
        text:
            "Where software or digital products are required, we can design, develop and integrate solutions.",
    },
    {
        icon: Network,
        title: "Connect",
        text:
            "We consider how devices, systems, networks, cloud environments and people work together.",
    },
    {
        icon: ShieldCheck,
        title: "Protect",
        text:
            "Security, access, backup and resilience can be considered as part of the wider environment.",
    },
    {
        icon: Rocket,
        title: "Deploy",
        text:
            "The objective is to move from plans and products into an operational environment.",
    },
    {
        icon: Headphones,
        title: "Support",
        text:
            "We can continue helping organizations maintain, troubleshoot and improve their technology.",
    },
];

const industries = [
    {
        icon: BriefcaseBusiness,
        title: "Businesses & Corporations",
        text:
            "Technology environments for organizations that need reliable operations, communication and growth.",
    },
    {
        icon: Activity,
        title: "Healthcare",
        text:
            "Technology infrastructure, software, connectivity, security and operational systems for healthcare environments.",
    },
    {
        icon: Building2,
        title: "Government & Public Sector",
        text:
            "Technology procurement, infrastructure and digital systems supporting public-sector operations.",
    },
    {
        icon: Store,
        title: "Retail & Hospitality",
        text:
            "Technology supporting customer-facing operations, inventory, connectivity, communication and management.",
    },
    {
        icon: GraduationCap,
        title: "Schools & Universities",
        text:
            "Digital learning, infrastructure, devices, connectivity, administration systems and institutional technology.",
    },
    {
        icon: Cog,
        title: "Manufacturing & Industrial",
        text:
            "Technology environments supporting operations, connectivity, productivity, data and industrial workflows.",
    },
    {
        icon: Globe2,
        title: "NGOs & Development Organizations",
        text:
            "Practical technology support for organizations operating programs, teams, data and distributed activities.",
    },
    {
        icon: Rocket,
        title: "Startups & Growing Businesses",
        text:
            "Scalable technology foundations for organizations moving from early stage to structured growth.",
    },
];

const technologyAreas = [
    {
        category: "Applications",
        items: [
            "Web applications",
            "Mobile applications",
            "Business systems",
            "Portals",
            "Dashboards",
            "APIs",
        ],
    },
    {
        category: "Infrastructure",
        items: [
            "Servers",
            "Networks",
            "Wi-Fi",
            "Cloud",
            "Hosting",
            "Storage",
        ],
    },
    {
        category: "Operations",
        items: [
            "Automation",
            "Integration",
            "Workflows",
            "Monitoring",
            "Support",
            "Maintenance",
        ],
    },
    {
        category: "Intelligence",
        items: [
            "Artificial intelligence",
            "Data workflows",
            "Intelligent search",
            "AI assistants",
            "Document processing",
            "Analytics",
        ],
    },
];

const deliveryStages = [
    {
        number: "01",
        icon: Search,
        title: "Requirement",
        text:
            "We start by understanding the business or institutional requirement rather than assuming the technology answer.",
    },
    {
        number: "02",
        icon: FileCheck2,
        title: "Specification",
        text:
            "Requirements are translated into a clearer scope, capability list, technical considerations and priorities.",
    },
    {
        number: "03",
        icon: Lightbulb,
        title: "Solution",
        text:
            "We determine the most appropriate combination of products, services, software, infrastructure or support.",
    },
    {
        number: "04",
        icon: Handshake,
        title: "Engagement",
        text:
            "The project is structured around the agreed scope, responsibilities, expectations and delivery requirements.",
    },
    {
        number: "05",
        icon: Wrench,
        title: "Implementation",
        text:
            "Products are configured, systems are developed, infrastructure is deployed or the required service is delivered.",
    },
    {
        number: "06",
        icon: ShieldCheck,
        title: "Validation",
        text:
            "The delivered environment is reviewed to make sure the intended requirement has been addressed.",
    },
    {
        number: "07",
        icon: Users,
        title: "Enablement",
        text:
            "Users and teams can be supported in understanding and using the resulting technology environment.",
    },
    {
        number: "08",
        icon: TrendingUp,
        title: "Evolution",
        text:
            "As the organization grows, the technology environment can be reviewed, improved and expanded.",
    },
];

const capabilityMatrix = [
    {
        capability: "Technology planning",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "Hardware procurement",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "Software development",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "Infrastructure",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "Cloud services",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "Security",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "Automation",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "AI solutions",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
    {
        capability: "Managed support",
        startup: "✓",
        growing: "✓",
        enterprise: "✓",
        institution: "✓",
    },
];

const faqs = [
    {
        question: "Do we need to know exactly what we need before contacting AB TECHNOLOGIES?",
        answer:
            "No. In fact, one of the most important capabilities we provide is helping organizations clarify what they need. You can begin with a business problem, expansion plan, operational challenge or simple idea. We can help translate that into technology requirements.",
    },
    {
        question: "Can AB TECHNOLOGIES help us from scratch?",
        answer:
            "Yes. The capability model is intentionally designed to support organizations at different stages. If you are starting a new office, launching a business, establishing an institution or building a new digital operation, the conversation can begin before the technology decisions have been made.",
    },
    {
        question: "Do you only provide software?",
        answer:
            "No. Software is one part of the broader capability. The offering also covers hardware procurement, networking, infrastructure, cloud, security, automation, AI, managed IT and technology sourcing.",
    },
    {
        question: "Can you work with our existing systems?",
        answer:
            "Yes. Existing technology does not automatically need to be replaced. Depending on the situation, the better approach may be to integrate, improve, modernize, secure or extend what is already in place.",
    },
    {
        question: "Can you handle large procurement requirements?",
        answer:
            "Yes. Corporate, institutional and bulk procurement can be structured around defined specifications, quantities, sourcing requirements, quotations, verification and delivery coordination.",
    },
    {
        question: "Can you combine procurement with implementation?",
        answer:
            "Yes. This is one of the advantages of having a broader capability. Where appropriate, hardware procurement can be connected to deployment, configuration, networking, software setup, security and ongoing support.",
    },
    {
        question: "Do you provide AI solutions for every business?",
        answer:
            "AI should not be added simply because it is fashionable. We prefer to identify situations where AI can create a practical benefit, such as reducing repetitive work, improving information access, assisting customer service or accelerating internal processes.",
    },
    {
        question: "Can you support organizations after implementation?",
        answer:
            "Yes. Support and managed IT capabilities can help organizations maintain systems, troubleshoot issues, improve environments and respond to changing requirements.",
    },
];

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function SectionLabel({ children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {children}
        </div>
    );
}

function CapabilityCard({ item, active, onClick }) {
    const Icon = item.icon;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group relative overflow-hidden rounded-[1.75rem] border p-6 text-left transition-all duration-300 ${active
                ? "border-blue-500 bg-blue-600 text-white shadow-2xl shadow-blue-600/20"
                : "border-slate-200 bg-white text-slate-900 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:border-blue-500/30"
                }`}
        >
            <div
                className={`absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl ${active ? "bg-white/10" : "bg-blue-500/10"
                    }`}
            />

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active
                            ? "bg-white/15 text-white"
                            : "bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                            }`}
                    >
                        <Icon size={22} />
                    </div>

                    <span
                        className={`text-xs font-black ${active
                            ? "text-white/50"
                            : "text-slate-300 dark:text-white/10"
                            }`}
                    >
                        {item.number}
                    </span>
                </div>

                <div
                    className={`mt-5 text-[10px] font-black uppercase tracking-[0.18em] ${active
                        ? "text-blue-100"
                        : "text-blue-600 dark:text-blue-400"
                        }`}
                >
                    {item.eyebrow}
                </div>

                <h3
                    className={`mt-2 text-xl font-black ${active
                        ? "text-white"
                        : "text-slate-950 dark:text-white"
                        }`}
                >
                    {item.title}
                </h3>

                <p
                    className={`mt-3 text-sm leading-6 ${active
                        ? "text-blue-50"
                        : "text-slate-500 dark:text-slate-400"
                        }`}
                >
                    {item.description}
                </p>

                <div
                    className={`mt-6 flex items-center gap-2 text-xs font-bold ${active
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-300"
                        }`}
                >
                    View capabilities
                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </div>
            </div>
        </button>
    );
}

function PillarCard({ item }) {
    const Icon = item.icon;

    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white">
                <Icon size={20} />
            </div>

            <h3 className="mt-5 font-black text-slate-950 dark:text-white">
                {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.text}
            </p>
        </div>
    );
}

function IndustryCard({ item }) {
    const Icon = item.icon;

    return (
        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Icon size={20} />
            </div>

            <h3 className="mt-5 font-black text-slate-950 dark:text-white">
                {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.text}
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                Industry capability
                <ChevronRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                />
            </div>
        </div>
    );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function Capabilities() {
    const navigate = useNavigate();
    const [activeCapability, setActiveCapability] = useState("strategy");

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a technology requirement with AB TECHNOLOGIES.",
            metadata: {
                Source: "Capabilities",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };
    const [openFaq, setOpenFaq] = useState(null);
    const [showAllCapabilities, setShowAllCapabilities] = useState(false);

    const activeGroup = useMemo(
        () =>
            capabilityGroups.find(
                (group) => group.id === activeCapability
            ) || capabilityGroups[0],
        [activeCapability]
    );

    const visibleGroups = showAllCapabilities
        ? capabilityGroups
        : capabilityGroups.slice(0, 6);

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">

            {/* ========================================================
                HERO
            ======================================================== */}

            <section className="relative isolate">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.13),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#eef2ff)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.12),transparent_28%),linear-gradient(to_bottom,#020617,#071126)]" />

                <div className="absolute left-1/2 top-0 -z-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

                <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32 lg:pt-24">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

                        <div>
                            <SectionLabel>Our capabilities</SectionLabel>

                            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                                Technology capabilities built around
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                                    real-world needs.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                AB TECHNOLOGIES brings together technology
                                planning, procurement, software, infrastructure,
                                cloud, security, automation, AI and support to
                                help organizations build and operate better.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not have to arrive with a complete
                                technical specification. Start with what you
                                are trying to accomplish and we can help you
                                work through the technology required.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a technology requirement for our organization.",
                                            { Intent: "Discuss requirement" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
                                >
                                    Discuss a requirement
                                    <ArrowRight size={17} />
                                </button>

                                <a
                                    href="#capability-map"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                >
                                    Explore capabilities
                                    <ChevronDown size={17} />
                                </a>
                            </div>
                        </div>

                        {/* Hero capability visualization */}

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
                                <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white sm:p-8">

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                                                Capability architecture
                                            </div>

                                            <div className="mt-2 text-xl font-black">
                                                From requirement to outcome
                                            </div>
                                        </div>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                                            <Layers3 size={20} />
                                        </div>
                                    </div>

                                    <div className="relative mt-8">
                                        <div className="absolute left-1/2 top-8 hidden h-[calc(100%-64px)] w-px -translate-x-1/2 bg-white/10 sm:block" />

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                [Search, "Understand"],
                                                [Target, "Plan"],
                                                [PackageCheck, "Source"],
                                                [Code2, "Build"],
                                                [Network, "Connect"],
                                                [ShieldCheck, "Protect"],
                                                [Rocket, "Deploy"],
                                                [Headphones, "Support"],
                                            ].map(([Icon, title]) => (
                                                <div
                                                    key={title}
                                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                                >
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                                        <Icon size={17} />
                                                    </div>

                                                    <span className="text-sm font-bold">
                                                        {title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                                        <div className="flex gap-3">
                                            <Sparkles
                                                size={18}
                                                className="mt-0.5 shrink-0 text-blue-400"
                                            />

                                            <p className="text-xs leading-6 text-slate-400">
                                                A broader capability model means
                                                the pieces can be considered
                                                together instead of in isolation.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================
                CAPABILITY STATEMENT
            ======================================================== */}

            <section className="border-y border-slate-200 bg-white/70 dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto grid max-w-7xl md:grid-cols-4">

                    {[
                        [
                            "Plan",
                            "Turn requirements into an actionable technology direction.",
                        ],
                        [
                            "Source",
                            "Find and procure the products and technology required.",
                        ],
                        [
                            "Build",
                            "Create software and digital systems around your operation.",
                        ],
                        [
                            "Operate",
                            "Support, secure and improve the environment over time.",
                        ],
                    ].map(([title, text]) => (
                        <div
                            key={title}
                            className="border-b border-slate-200 px-6 py-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 dark:border-white/10"
                        >
                            <div className="text-sm font-black text-slate-950 dark:text-white">
                                {title}
                            </div>

                            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                {text}
                            </p>
                        </div>
                    ))}

                </div>
            </section>

            {/* ========================================================
                CAPABILITY MAP
            ======================================================== */}

            <section
                id="capability-map"
                className="relative py-24 lg:py-32"
            >
                <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-50/70 to-transparent dark:from-blue-950/20 dark:to-transparent" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>Capability map</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            One organization. Multiple technology capabilities.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            Our capabilities span the technology lifecycle,
                            allowing us to participate at the planning stage,
                            delivery stage or ongoing operational stage.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {visibleGroups.map((item) => (
                            <CapabilityCard
                                key={item.id}
                                item={item}
                                active={activeCapability === item.id}
                                onClick={() =>
                                    setActiveCapability(item.id)
                                }
                            />
                        ))}
                    </div>

                    <div className="mt-7 text-center">
                        <button
                            type="button"
                            onClick={() =>
                                setShowAllCapabilities((value) => !value)
                            }
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:border-blue-500/40"
                        >
                            {showAllCapabilities
                                ? "Show fewer capabilities"
                                : "View all capabilities"}

                            <ChevronDown
                                size={16}
                                className={`transition-transform ${showAllCapabilities ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    </div>

                </div>
            </section>

            {/* ========================================================
                ACTIVE CAPABILITY DETAIL
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">

                        <div className="grid lg:grid-cols-[.8fr_1.2fr]">

                            <div className="bg-slate-950 p-8 text-white sm:p-12">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                                    {React.createElement(
                                        activeGroup.icon,
                                        { size: 25 }
                                    )}
                                </div>

                                <div className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                                    Capability {activeGroup.number}
                                </div>

                                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                                    {activeGroup.title}
                                </h2>

                                <p className="mt-5 leading-8 text-slate-400">
                                    {activeGroup.description}
                                </p>

                                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                    <div className="flex gap-3">
                                        <BadgeCheck
                                            size={19}
                                            className="shrink-0 text-blue-400"
                                        />

                                        <p className="text-xs leading-6 text-slate-400">
                                            Capabilities can be combined
                                            depending on the organization,
                                            project scope and desired outcome.
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="p-8 sm:p-12">

                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                            Included areas
                                        </div>

                                        <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                                            What we can help with
                                        </h3>
                                    </div>

                                    <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 sm:flex dark:bg-white/10 dark:text-white">
                                        <Boxes size={20} />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${activeGroup.title} for our organization.`,
                                            {
                                                Intent: "Capability enquiry",
                                                Capability: activeGroup.title,
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                                >
                                    Discuss this capability
                                    <ArrowRight size={16} />
                                </button>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    {activeGroup.capabilities.map((capability) => (
                                        <div
                                            key={capability}
                                            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
                                        >
                                            <Check
                                                size={16}
                                                className="shrink-0 text-blue-600 dark:text-blue-400"
                                            />

                                            {capability}
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                HOW CAPABILITIES WORK TOGETHER
            ======================================================== */}

            <section className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 bg-slate-100/70 dark:bg-slate-900/30" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <SectionLabel>Connected capabilities</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            The value is in how the pieces work together.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            A laptop, application, network, server and cloud
                            environment may look like separate requirements.
                            Operationally, they are connected.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {capabilityPillars.map((item) => (
                            <PillarCard key={item.title} item={item} />
                        ))}
                    </div>

                </div>
            </section>

            {/* ========================================================
                FROM SCRATCH
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-950 shadow-2xl">

                        <div className="grid lg:grid-cols-[1fr_.9fr]">

                            <div className="p-8 text-white sm:p-12 lg:p-16">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                                    <Rocket size={25} />
                                </div>

                                <div className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                                    Start from scratch
                                </div>

                                <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                                    You do not need to have the technical answer before you call us.
                                </h2>

                                <p className="mt-6 max-w-2xl leading-8 text-blue-100">
                                    Maybe you are opening an office.
                                    Maybe you are launching a business.
                                    Maybe your organization has outgrown
                                    its current systems. Maybe you simply
                                    know that something should work better.
                                </p>

                                <p className="mt-4 max-w-2xl leading-8 text-blue-100">
                                    Start with the requirement. We can help
                                    you work through the technology.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start with our requirement and work through the technology we need.",
                                            { Intent: "Start conversation" }
                                        )
                                    }
                                    className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-blue-50"
                                >
                                    Start a conversation
                                    <ArrowRight size={17} />
                                </button>

                            </div>

                            <div className="p-8 sm:p-12 lg:p-16">

                                <div className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur">

                                    <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">
                                        Example journey
                                    </div>

                                    <div className="mt-6 space-y-4">

                                        {[
                                            [
                                                Search,
                                                "You explain the requirement",
                                            ],
                                            [
                                                Target,
                                                "We clarify the objective",
                                            ],
                                            [
                                                Layers3,
                                                "We identify the technology pieces",
                                            ],
                                            [
                                                PackageCheck,
                                                "We source or build what is needed",
                                            ],
                                            [
                                                Network,
                                                "We connect the environment",
                                            ],
                                            [
                                                ShieldCheck,
                                                "We consider protection",
                                            ],
                                            [
                                                Rocket,
                                                "We deploy",
                                            ],
                                            [
                                                Headphones,
                                                "We support the environment",
                                            ],
                                        ].map(([Icon, text], index) => (
                                            <div
                                                key={text}
                                                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                                                    <Icon size={16} />
                                                </div>

                                                <div className="flex-1 text-sm font-semibold text-white">
                                                    {text}
                                                </div>

                                                <span className="text-[10px] font-black text-white/30">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* ========================================================
                DELIVERY MODEL
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">

                        <div>
                            <SectionLabel>Delivery model</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                From requirement to operational capability.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                Not every engagement needs every stage. A
                                procurement project may begin with a defined
                                specification, while a digital transformation
                                project may begin with a business problem.
                            </p>

                            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]">
                                <div className="flex gap-3">
                                    <Lightbulb
                                        size={20}
                                        className="shrink-0 text-blue-600 dark:text-blue-400"
                                    />

                                    <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        The model is flexible because the
                                        starting point should reflect the
                                        customer's actual situation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {deliveryStages.map((stage) => {
                                const Icon = stage.icon;

                                return (
                                    <div
                                        key={stage.number}
                                        className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                <Icon size={19} />
                                            </div>

                                            <span className="text-3xl font-black text-slate-200 dark:text-white/10">
                                                {stage.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 font-black text-slate-950 dark:text-white">
                                            {stage.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {stage.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================
                INDUSTRIES
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950/20 dark:via-slate-950 dark:to-cyan-950/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>Industry capability</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Technology capabilities that adapt to the organization.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            Different industries have different workflows,
                            constraints, users and priorities. Our capabilities
                            can be applied according to the environment.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {industries.map((item) => (
                            <IndustryCard key={item.title} item={item} />
                        ))}
                    </div>

                </div>
            </section>

            {/* ========================================================
                TECHNOLOGY AREAS
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>Technology landscape</SectionLabel>

                        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Broad enough to see the whole environment.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600 dark:text-slate-400">
                            Our capabilities cover the major technology layers
                            that organizations depend on.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {technologyAreas.map((area) => (
                            <div
                                key={area.category}
                                className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900"
                            >
                                <h3 className="font-black text-slate-950 dark:text-white">
                                    {area.category}
                                </h3>

                                <div className="mt-5 space-y-3">
                                    {area.items.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ========================================================
                ORGANIZATION SIZE MATRIX
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <SectionLabel>Flexible capability</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            The same capability can serve different stages of growth.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            A startup and a large institution may need the same
                            fundamental technology capability, but the scale,
                            architecture and implementation approach will differ.
                        </p>
                    </div>

                    <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
                                        <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Capability
                                        </th>

                                        {[
                                            "Startup",
                                            "Growing business",
                                            "Enterprise",
                                            "Institution",
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {capabilityMatrix.map((row) => (
                                        <tr
                                            key={row.capability}
                                            className="border-b border-slate-200 last:border-0 dark:border-white/10"
                                        >
                                            <td className="px-5 py-5 text-sm font-bold text-slate-900 dark:text-white">
                                                {row.capability}
                                            </td>

                                            {[row.startup, row.growing, row.enterprise, row.institution].map(
                                                (value, index) => (
                                                    <td
                                                        key={`${row.capability}-${index}`}
                                                        className="px-5 py-5 text-sm font-bold text-blue-600 dark:text-blue-400"
                                                    >
                                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/10">
                                                            {value}
                                                        </span>
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================
                WHY BROAD CAPABILITY MATTERS
            ======================================================== */}

            <section className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 bg-slate-950 dark:bg-black" />

                <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />

                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <SectionLabel>Why breadth matters</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                Your technology environment is interconnected.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-400">
                                Buying software without considering the
                                infrastructure it needs, deploying devices
                                without considering the network, or building
                                systems without considering security can create
                                unnecessary complexity.
                            </p>

                            <p className="mt-4 leading-8 text-slate-400">
                                A broader capability lets the conversation
                                include those dependencies.
                            </p>

                            <a
                                href="/solutions"
                                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-400"
                            >
                                Explore our solutions
                                <ArrowRight size={17} />
                            </a>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                [
                                    Monitor,
                                    "Devices",
                                    "The physical technology people use every day.",
                                ],
                                [
                                    Network,
                                    "Connectivity",
                                    "The networks that allow systems and people to communicate.",
                                ],
                                [
                                    Code2,
                                    "Applications",
                                    "The software that powers business workflows.",
                                ],
                                [
                                    Cloud,
                                    "Infrastructure",
                                    "The environments where services and data operate.",
                                ],
                                [
                                    Lock,
                                    "Security",
                                    "The controls that help protect the environment.",
                                ],
                                [
                                    Database,
                                    "Data",
                                    "The information organizations depend on.",
                                ],
                            ].map(([Icon, title, text]) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"
                                >
                                    <Icon
                                        size={21}
                                        className="text-blue-400"
                                    />

                                    <h3 className="mt-5 font-black text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {text}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================
                AI + DIGITAL MARKETPLACE CONNECTION
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">

                        <div className="grid lg:grid-cols-[.9fr_1.1fr]">

                            <div className="bg-gradient-to-br from-slate-950 to-blue-950 p-8 text-white sm:p-12">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                                    <Sparkles size={25} />
                                </div>

                                <div className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                                    Intelligent technology
                                </div>

                                <h2 className="mt-4 text-4xl font-black tracking-tight">
                                    Capabilities should evolve with the market.
                                </h2>

                                <p className="mt-5 leading-8 text-slate-400">
                                    Our wider technology model can include
                                    software products, digital tools,
                                    automation, AI-assisted solutions,
                                    downloadable utilities and technology
                                    products.
                                </p>

                                <a
                                    href="/marketplace"
                                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950"
                                >
                                    Explore the tech market
                                    <ArrowUpRight size={17} />
                                </a>

                            </div>

                            <div className="p-8 sm:p-12">

                                <div className="grid gap-4 sm:grid-cols-2">

                                    {[
                                        [
                                            PanelsTopLeft,
                                            "Software products",
                                            "Applications and digital products developed or offered as subscription solutions.",
                                        ],
                                        [
                                            Terminal,
                                            "Free utilities",
                                            "Practical software tools and converters users can access directly.",
                                        ],
                                        [
                                            Cpu,
                                            "AI solutions",
                                            "Intelligent tools designed around real workflows and information needs.",
                                        ],
                                        [
                                            PackageCheck,
                                            "Hardware",
                                            "Technology devices and equipment for individuals, teams and organizations.",
                                        ],
                                        [
                                            GraduationCap,
                                            "Training",
                                            "Courses and learning resources for people developing technology skills.",
                                        ],
                                        [
                                            Workflow,
                                            "Automation",
                                            "Tools and services that reduce repetitive work and connect systems.",
                                        ],
                                    ].map(([Icon, title, text]) => (
                                        <div
                                            key={title}
                                            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]"
                                        >
                                            <Icon
                                                size={21}
                                                className="text-blue-600 dark:text-blue-400"
                                            />

                                            <h3 className="mt-5 font-black text-slate-950 dark:text-white">
                                                {title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {text}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                FAQ
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>Capabilities FAQ</SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Questions about what we can do.
                        </h2>

                        <p className="mt-5 text-slate-500 dark:text-slate-400">
                            If you do not see exactly what you need, that does
                            not necessarily mean we cannot help.
                        </p>
                    </div>

                    <div className="mt-12 space-y-3">

                        {faqs.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(
                                                open ? null : index
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold text-slate-950 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={19}
                                            className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${open
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ========================================================
                FINAL CTA
            ======================================================== */}

            <section className="relative pb-24 lg:pb-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-16 text-center shadow-2xl sm:px-12 lg:px-20 lg:py-20">

                        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-600/30 blur-[110px]" />

                        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />

                        <div className="relative mx-auto max-w-3xl">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-400">
                                <Zap size={25} />
                            </div>

                            <div className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                                Start with your requirement
                            </div>

                            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                Tell us what you are trying to
                                <span className="text-blue-400">
                                    {" "}
                                    build, source or improve.
                                </span>
                            </h2>

                            <p className="mt-5 leading-8 text-slate-400">
                                You do not need to arrive with a perfect
                                technical specification. Give us the
                                requirement, objective or problem and let us
                                help you determine what comes next.
                            </p>

                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like help with a technology requirement and would like to request a solution.",
                                            { Intent: "Request solution" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-slate-950 transition hover:bg-blue-50"
                                >
                                    Request a quote
                                    <ArrowRight size={17} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to talk to the team about our technology requirements.",
                                            { Intent: "Talk to team" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
                                >
                                    Talk to our team
                                    <ArrowUpRight size={17} />
                                </button>

                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    Start from scratch
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    Improve existing systems
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    Source technology
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check size={14} />
                                    Build for growth
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}