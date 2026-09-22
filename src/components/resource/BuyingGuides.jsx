import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    Check,
    ChevronDown,
    ChevronRight,
    ClipboardCheck,
    Cloud,
    Cpu,
    Database,
    Download,
    FileCheck2,
    Filter,
    Gauge,
    HardDrive,
    Headphones,
    Laptop,
    Layers3,
    Lightbulb,
    Monitor,
    Network,
    PackageCheck,
    Printer,
    Search,
    Server,
    ShieldCheck,
    ShoppingCart,
    Smartphone,
    Sparkles,
    Target,
    Users,
    Wifi,
    X,
} from "lucide-react";

const guides = [
    {
        id: 1,
        category: "Computers",
        title: "How to Choose Business Laptops",
        description:
            "A practical buying framework for selecting laptops based on employee roles, workload, durability, security, lifecycle and total cost.",
        level: "Business",
        readTime: "8 min read",
        popular: true,
        icon: Laptop,
        tags: ["Laptops", "Procurement", "Business"],
    },
    {
        id: 2,
        category: "Computers",
        title: "Desktop Computer Buying Guide",
        description:
            "Understand processors, memory, storage, displays, warranties and form factors before purchasing desktops for your organization.",
        level: "Business",
        readTime: "7 min read",
        popular: false,
        icon: Monitor,
        tags: ["Desktops", "Hardware", "Office"],
    },
    {
        id: 3,
        category: "Networking",
        title: "Business Wi-Fi Buying Guide",
        description:
            "Learn how to plan wireless coverage, access points, capacity, security and management for offices, schools and facilities.",
        level: "Technical",
        readTime: "10 min read",
        popular: true,
        icon: Wifi,
        tags: ["Wi-Fi", "Networking", "Infrastructure"],
    },
    {
        id: 4,
        category: "Networking",
        title: "Network Switch Buying Guide",
        description:
            "Compare managed and unmanaged switches, port counts, PoE, uplinks, VLAN support and network growth requirements.",
        level: "Technical",
        readTime: "9 min read",
        popular: false,
        icon: Network,
        tags: ["Switches", "LAN", "PoE"],
    },
    {
        id: 5,
        category: "Infrastructure",
        title: "Server Buying Guide",
        description:
            "A framework for choosing servers according to applications, users, workloads, storage, redundancy and future growth.",
        level: "Technical",
        readTime: "12 min read",
        popular: true,
        icon: Server,
        tags: ["Servers", "Data Center", "Infrastructure"],
    },
    {
        id: 6,
        category: "Storage",
        title: "Business Storage Buying Guide",
        description:
            "Understand SSDs, HDDs, NAS, SAN, RAID and backup considerations when selecting organizational storage.",
        level: "Technical",
        readTime: "10 min read",
        popular: false,
        icon: HardDrive,
        tags: ["Storage", "NAS", "Backup"],
    },
    {
        id: 7,
        category: "Cloud",
        title: "Cloud Services Buying Guide",
        description:
            "Evaluate cloud hosting, productivity platforms, storage, backup, security and managed cloud services.",
        level: "Business",
        readTime: "11 min read",
        popular: true,
        icon: Cloud,
        tags: ["Cloud", "Hosting", "SaaS"],
    },
    {
        id: 8,
        category: "Security",
        title: "Business Cybersecurity Buying Guide",
        description:
            "Build a sensible security stack covering endpoints, identity, email, networks, backups and monitoring.",
        level: "Security",
        readTime: "12 min read",
        popular: true,
        icon: ShieldCheck,
        tags: ["Security", "Cybersecurity", "Business"],
    },
    {
        id: 9,
        category: "Printing",
        title: "Office Printer Buying Guide",
        description:
            "Choose printers and multifunction devices based on volume, speed, running costs, connectivity and maintenance.",
        level: "Business",
        readTime: "6 min read",
        popular: false,
        icon: Printer,
        tags: ["Printers", "Office", "MFP"],
    },
    {
        id: 10,
        category: "Mobile",
        title: "Business Smartphone Buying Guide",
        description:
            "Compare business phones by security, battery life, durability, management, support and productivity.",
        level: "Business",
        readTime: "7 min read",
        popular: false,
        icon: Smartphone,
        tags: ["Mobile", "Phones", "Productivity"],
    },
    {
        id: 11,
        category: "Infrastructure",
        title: "UPS & Power Protection Guide",
        description:
            "Understand UPS capacity, runtime, surge protection and power continuity for critical technology equipment.",
        level: "Technical",
        readTime: "8 min read",
        popular: false,
        icon: Gauge,
        tags: ["UPS", "Power", "Continuity"],
    },
    {
        id: 12,
        category: "Procurement",
        title: "Technology Procurement Checklist",
        description:
            "A practical checklist for requirements, specifications, quotations, verification, delivery, acceptance and documentation.",
        level: "Procurement",
        readTime: "9 min read",
        popular: true,
        icon: ClipboardCheck,
        tags: ["Procurement", "Checklist", "Purchasing"],
    },
];

const categories = [
    "All",
    "Computers",
    "Networking",
    "Infrastructure",
    "Storage",
    "Cloud",
    "Security",
    "Printing",
    "Mobile",
    "Procurement",
];

const buyingPrinciples = [
    {
        number: "01",
        title: "Start with the requirement",
        description:
            "Define what the technology needs to accomplish before choosing a brand, model or specification.",
        icon: Target,
    },
    {
        number: "02",
        title: "Match specifications to users",
        description:
            "A developer, accountant, receptionist, designer and executive may require completely different equipment.",
        icon: Users,
    },
    {
        number: "03",
        title: "Consider the full lifecycle",
        description:
            "Purchase price is only one part of the cost. Include support, warranty, maintenance, upgrades and replacement.",
        icon: Layers3,
    },
    {
        number: "04",
        title: "Verify before you buy",
        description:
            "Validate specifications, supplier credibility, warranty coverage, availability and product authenticity.",
        icon: FileCheck2,
    },
];

const mistakes = [
    "Buying only on the lowest initial price",
    "Choosing specifications without defining the workload",
    "Ignoring warranty and after-sales support",
    "Purchasing incompatible equipment",
    "Underestimating future growth",
    "Ignoring power and environmental requirements",
    "Failing to verify supplier and product authenticity",
    "Buying equipment without a deployment plan",
];

const comparisonRows = [
    {
        requirement: "Basic office work",
        recommended: "Entry business laptop",
        processor: "Modern Core i3 / equivalent",
        memory: "8–16 GB",
        storage: "256–512 GB SSD",
        priority: "Value + reliability",
    },
    {
        requirement: "Management / productivity",
        recommended: "Business-class laptop",
        processor: "Core i5 / equivalent",
        memory: "16 GB",
        storage: "512 GB SSD",
        priority: "Reliability + security",
    },
    {
        requirement: "Software development",
        recommended: "Performance business laptop",
        processor: "Core i5/i7 or equivalent",
        memory: "16–32 GB",
        storage: "512 GB–1 TB SSD",
        priority: "Performance",
    },
    {
        requirement: "Creative workloads",
        recommended: "Workstation / performance laptop",
        processor: "High-performance CPU",
        memory: "32 GB+",
        storage: "1 TB+ SSD",
        priority: "CPU/GPU performance",
    },
];

function SectionLabel({ children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {children}
        </div>
    );
}

function GuideCard({ guide, onOpen }) {
    const Icon = guide.icon;

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-500/40">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-all group-hover:bg-blue-500/10" />

            <div className="relative">
                <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-blue-400">
                        <Icon size={22} />
                    </div>

                    {guide.popular && (
                        <span className="rounded-full bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            Popular
                        </span>
                    )}
                </div>

                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>{guide.category}</span>
                    <span>•</span>
                    <span>{guide.readTime}</span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                    {guide.title}
                </h3>

                <p className="mt-3 min-h-[78px] text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {guide.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {guide.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => onOpen(guide)}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all group-hover:gap-3 dark:text-blue-400"
                >
                    Read buying guide
                    <ArrowRight size={16} />
                </button>
            </div>
        </article>
    );
}

function GuideModal({ guide, onClose, onSupportAction }) {
    if (!guide) return null;

    const Icon = guide.icon;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-950"
            >
                <div className="relative overflow-hidden border-b border-slate-200 p-7 sm:p-10 dark:border-white/10">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        aria-label="Close guide"
                    >
                        <X size={18} />
                    </button>

                    <div className="relative flex items-start gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                            <Icon size={25} />
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                {guide.category} • {guide.readTime}
                            </p>

                            <h2 className="mt-2 pr-8 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                {guide.title}
                            </h2>

                            <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                                {guide.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10 p-7 sm:p-10">
                    <div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                            What to evaluate
                        </h3>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {[
                                "Actual workload and users",
                                "Performance requirements",
                                "Compatibility",
                                "Security requirements",
                                "Warranty and support",
                                "Total cost of ownership",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <Check size={15} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.06] p-6">
                        <div className="flex gap-4">
                            <Lightbulb className="mt-1 shrink-0 text-blue-600 dark:text-blue-400" />
                            <div>
                                <h3 className="font-bold text-slate-950 dark:text-white">
                                    Procurement principle
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    The best technology purchase is not necessarily
                                    the most powerful or the cheapest. It is the
                                    solution that meets the requirement reliably,
                                    remains supportable and makes commercial sense
                                    over its useful life.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                            Before placing an order
                        </h3>

                        <ol className="mt-5 space-y-3">
                            {[
                                "Document the exact requirement.",
                                "Confirm the technical specification.",
                                "Compare suitable alternatives.",
                                "Validate supplier and warranty.",
                                "Confirm availability and lead time.",
                                "Review the complete cost.",
                                "Plan deployment and acceptance.",
                            ].map((step, index) => (
                                <li
                                    key={step}
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 dark:border-white/10"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-300">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300">
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.05] p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="font-bold text-slate-950 dark:text-white">
                                    Need help choosing the right option?
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    Share your requirement, users and budget range and we can help you narrow down suitable options.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => onSupportAction(guide)}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                            >
                                Discuss this purchase
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TechnologyBuyingGuides() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("featured");

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like help planning a technology purchase for our organization.",
            metadata: {
                Source: "Technology Buying Guides",
                ...metadata,
            },
        });

        setSelectedGuide(null);
        navigate("/support/ai");
    };

    const filteredGuides = useMemo(() => {
        let results = [...guides];

        if (activeCategory !== "All") {
            results = results.filter(
                (guide) => guide.category === activeCategory
            );
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();

            results = results.filter((guide) =>
                [
                    guide.title,
                    guide.description,
                    guide.category,
                    ...guide.tags,
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(term)
            );
        }

        if (sortBy === "popular") {
            results.sort((a, b) => Number(b.popular) - Number(a.popular));
        }

        if (sortBy === "title") {
            results.sort((a, b) => a.title.localeCompare(b.title));
        }

        return results;
    }, [activeCategory, searchTerm, sortBy]);

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#070b14] dark:text-white">

            {/* ============================================================
                HERO
            ============================================================ */}

            <section className="relative isolate border-b border-slate-200/70 dark:border-white/10">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(14,165,233,0.10),transparent_25%),linear-gradient(to_bottom,#f8fafc,#eef4fb)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(14,165,233,0.10),transparent_25%),linear-gradient(to_bottom,#080d18,#070b14)]" />

                <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(100,116,139,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.12) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

                        <div>
                            <SectionLabel>Technology Resources</SectionLabel>

                            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Buy technology with
                                <span className="block text-blue-600 dark:text-blue-400">
                                    greater confidence.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
                                Practical buying guides for businesses,
                                institutions and organizations making technology
                                decisions. Understand what matters, what to
                                compare and where to avoid unnecessary spending.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#guides"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    Explore buying guides
                                    <ArrowRight size={17} />
                                </a>

                                <a
                                    href="#procurement"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    Plan a purchase
                                    <ClipboardCheck size={17} />
                                </a>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-slate-500 dark:text-slate-500">
                                <span className="inline-flex items-center gap-2">
                                    <Check size={14} className="text-emerald-500" />
                                    Business-focused
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Check size={14} className="text-emerald-500" />
                                    Vendor-neutral guidance
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Check size={14} className="text-emerald-500" />
                                    Practical procurement advice
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200/80 bg-white/80 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20">

                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-[#0c1320]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                                Buying intelligence
                                            </p>
                                            <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                                                Technology decision framework
                                            </h3>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <Sparkles size={18} />
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        {[
                                            ["Requirement", "Define the actual need"],
                                            ["Specification", "Match technology to workload"],
                                            ["Commercial", "Compare complete cost"],
                                            ["Verification", "Validate product & supplier"],
                                            ["Lifecycle", "Plan support and replacement"],
                                        ].map(([title, value], index) => (
                                            <div
                                                key={title}
                                                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.035]"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-600 dark:text-blue-400">
                                                    {index + 1}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                        {title}
                                                    </p>
                                                    <p className="truncate text-[11px] text-slate-500 dark:text-slate-500">
                                                        {value}
                                                    </p>
                                                </div>

                                                <Check
                                                    size={15}
                                                    className="ml-auto text-emerald-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                                        <p className="text-2xl font-black text-slate-950 dark:text-white">
                                            12+
                                        </p>
                                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                            Guides
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                                        <p className="text-2xl font-black text-slate-950 dark:text-white">
                                            9
                                        </p>
                                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                            Categories
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                                        <p className="text-2xl font-black text-slate-950 dark:text-white">
                                            360°
                                        </p>
                                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                            View
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================
                INTRODUCTION
            ============================================================ */}

            <section className="relative border-b border-slate-200/70 bg-white py-20 dark:border-white/10 dark:bg-[#080d17] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">

                        <div>
                            <SectionLabel>Why these guides matter</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Technology buying should start with the business,
                                not the product catalogue.
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-base leading-8 text-slate-600 dark:text-slate-400">
                                Technology purchases can become expensive when
                                organizations choose equipment before understanding
                                the requirement. A specification may look impressive
                                on paper while being unnecessary for the intended
                                workload.
                            </p>

                            <p className="text-base leading-8 text-slate-600 dark:text-slate-400">
                                Our buying resources are designed to help decision
                                makers move from vague requirements to structured
                                purchasing decisions. The goal is simple: select
                                technology that is appropriate, supportable,
                                secure and commercially sensible.
                            </p>

                            <div className="grid gap-4 pt-3 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Define",
                                        text: "Understand the requirement.",
                                        icon: Target,
                                    },
                                    {
                                        title: "Compare",
                                        text: "Evaluate suitable options.",
                                        icon: Layers3,
                                    },
                                    {
                                        title: "Verify",
                                        text: "Validate before purchase.",
                                        icon: ShieldCheck,
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.03]"
                                        >
                                            <Icon
                                                size={20}
                                                className="text-blue-600 dark:text-blue-400"
                                            />

                                            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">
                                                {item.text}
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
                BUYING PRINCIPLES
            ============================================================ */}

            <section className="relative overflow-hidden bg-slate-100 py-20 dark:bg-[#0a101c] lg:py-28">
                <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>Our buying philosophy</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Four principles for smarter technology purchasing.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            Whether you are buying one laptop or equipping an
                            entire organization, the same fundamentals apply.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {buyingPrinciples.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.number}
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:shadow-black/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black tracking-widest text-blue-600 dark:text-blue-400">
                                            {item.number}
                                        </span>

                                        <Icon
                                            size={21}
                                            className="text-slate-400 transition group-hover:text-blue-500"
                                        />
                                    </div>

                                    <h3 className="mt-12 text-lg font-bold text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
                GUIDE LIBRARY
            ============================================================ */}

            <section
                id="guides"
                className="relative bg-white py-20 dark:bg-[#070b14] lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <SectionLabel>Guide library</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Explore technology buying guides.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                Start with the category closest to your requirement
                                or search for a specific technology.
                            </p>
                        </div>

                        <div className="text-sm text-slate-500">
                            {filteredGuides.length} guide
                            {filteredGuides.length !== 1 ? "s" : ""} available
                        </div>
                    </div>

                    {/* SEARCH + FILTER */}
                    <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                        <div className="flex flex-col gap-4 lg:flex-row">

                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search laptops, networking, cloud, security..."
                                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                />
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                            >
                                <Filter size={17} />
                                Filters
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${showFilters ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(event.target.value)
                                    }
                                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 py-3.5 pr-10 text-sm font-bold text-slate-700 outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 lg:w-48"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="popular">Popular</option>
                                    <option value="title">A–Z</option>
                                </select>

                                <ChevronDown
                                    size={15}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>

                        {showFilters && (
                            <div className="mt-4 border-t border-slate-200 pt-4 dark:border-white/10">
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() =>
                                                setActiveCategory(category)
                                            }
                                            className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeCategory === category
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CATEGORY PILLS */}
                    <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeCategory === category
                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                                    : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* GUIDE GRID */}
                    {filteredGuides.length > 0 ? (
                        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {filteredGuides.map((guide) => (
                                <GuideCard
                                    key={guide.id}
                                    guide={guide}
                                    onOpen={setSelectedGuide}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 p-14 text-center dark:border-white/10">
                            <Search
                                size={30}
                                className="mx-auto text-slate-400"
                            />

                            <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                                No guides found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Try another search term or choose a different
                                category.
                            </p>

                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveCategory("All");
                                }}
                                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================
                FEATURED DECISION FRAMEWORK
            ============================================================ */}

            <section className="relative overflow-hidden border-y border-slate-200/70 bg-slate-100 py-20 dark:border-white/10 dark:bg-[#0b111d] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>
                            <SectionLabel>Decision framework</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Don't start with a brand.
                                <span className="block text-blue-600 dark:text-blue-400">
                                    Start with the job.
                                </span>
                            </h2>

                            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
                                Technology specifications only become useful when
                                connected to a real requirement. Define the work,
                                understand the environment, then select the
                                appropriate technology.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Who will use it?",
                                    "What applications will run on it?",
                                    "How intensively will it be used?",
                                    "What security controls are required?",
                                    "How long should it remain in service?",
                                    "Who will support it after deployment?",
                                ].map((question) => (
                                    <div
                                        key={question}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                            <Check size={15} />
                                        </div>

                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {question}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0d1420]">
                                <div className="border-b border-slate-200 p-6 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <Cpu size={19} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Example
                                            </p>
                                            <p className="font-bold text-slate-900 dark:text-white">
                                                Laptop requirement
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3">
                                        {[
                                            ["User", "Software developer"],
                                            ["Workload", "Development + containers"],
                                            ["Memory", "16–32 GB"],
                                            ["Storage", "512 GB–1 TB SSD"],
                                            ["Display", "Quality business display"],
                                            ["Support", "Business warranty"],
                                        ].map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/[0.04]"
                                            >
                                                <span className="text-xs font-semibold text-slate-500">
                                                    {key}
                                                </span>

                                                <span className="text-right text-xs font-bold text-slate-800 dark:text-slate-200">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            <Check size={15} />
                                            Requirement-first recommendation
                                        </div>

                                        <p className="mt-2 text-xs leading-5 text-slate-500">
                                            The specification is determined by
                                            workload rather than simply selecting
                                            the highest available configuration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================
                LAPTOP QUICK COMPARISON
            ============================================================ */}

            <section className="bg-white py-20 dark:bg-[#070b14] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>Quick reference</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Match computer specifications to the workload.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            Use this as a starting point, not a rigid purchasing
                            rule. Actual requirements should be assessed against
                            your applications and operating environment.
                        </p>
                    </div>

                    <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200 dark:border-white/10">
                        <table className="w-full min-w-[850px] border-collapse text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-white/[0.04]">
                                    {[
                                        "Requirement",
                                        "Recommended",
                                        "Processor",
                                        "Memory",
                                        "Storage",
                                        "Priority",
                                    ].map((heading) => (
                                        <th
                                            key={heading}
                                            className="border-b border-slate-200 px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-white/10"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {comparisonRows.map((row) => (
                                    <tr
                                        key={row.requirement}
                                        className="transition hover:bg-slate-50 dark:hover:bg-white/[0.025]"
                                    >
                                        <td className="border-b border-slate-200 px-5 py-5 text-sm font-bold text-slate-900 dark:border-white/10 dark:text-white">
                                            {row.requirement}
                                        </td>

                                        <td className="border-b border-slate-200 px-5 py-5 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
                                            {row.recommended}
                                        </td>

                                        <td className="border-b border-slate-200 px-5 py-5 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
                                            {row.processor}
                                        </td>

                                        <td className="border-b border-slate-200 px-5 py-5 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
                                            {row.memory}
                                        </td>

                                        <td className="border-b border-slate-200 px-5 py-5 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
                                            {row.storage}
                                        </td>

                                        <td className="border-b border-slate-200 px-5 py-5 text-sm font-semibold text-blue-600 dark:border-white/10 dark:text-blue-400">
                                            {row.priority}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ============================================================
                COMMON MISTAKES
            ============================================================ */}

            <section className="bg-slate-100 py-20 dark:bg-[#0a101b] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>
                            <SectionLabel>Avoid common mistakes</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                A good buying decision is also about knowing what
                                not to do.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                Many technology procurement problems happen before
                                an order is placed. A structured process helps
                                prevent avoidable costs.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {mistakes.map((mistake, index) => (
                                <div
                                    key={mistake}
                                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <span className="text-xs font-black text-slate-400">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>

                                    <div>
                                        <p className="text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">
                                            {mistake}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================
                PROCUREMENT CHECKLIST
            ============================================================ */}

            <section
                id="procurement"
                className="relative overflow-hidden bg-white py-20 dark:bg-[#070b14] lg:py-28"
            >
                <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">

                        <div>
                            <SectionLabel>Purchase checklist</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Before you approve the purchase.
                            </h2>

                            <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
                                Use this checklist when evaluating a technology
                                purchase for your business, school, institution,
                                NGO or other organization.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    <Download size={17} />
                                    Download checklist
                                </button>

                                <a
                                    href="#guides"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
                                >
                                    Browse guides
                                    <ArrowRight size={17} />
                                </a>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                            <div className="space-y-3">
                                {[
                                    "Requirement documented",
                                    "Users and workload identified",
                                    "Technical specification confirmed",
                                    "Compatibility checked",
                                    "Supplier verified",
                                    "Warranty confirmed",
                                    "Lead time confirmed",
                                    "Total cost reviewed",
                                    "Deployment plan prepared",
                                    "Acceptance criteria defined",
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                            <Check size={15} />
                                        </div>

                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>

                                        <span className="ml-auto text-[10px] font-bold text-slate-400">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================
                HOW AB CAN HELP
            ============================================================ */}

            <section className="bg-slate-100 py-20 dark:bg-[#0a101c] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>Beyond the guide</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Need help turning research into a purchase?
                        </h2>

                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            Buying guides help you understand the decision. Our
                            procurement services can help you move from requirement
                            to sourcing, verification, delivery and deployment.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                title: "Requirements",
                                text: "Translate your business need into clear technical specifications.",
                                icon: ClipboardCheck,
                            },
                            {
                                title: "Sourcing",
                                text: "Identify suitable products and procurement options.",
                                icon: ShoppingCart,
                            },
                            {
                                title: "Verification",
                                text: "Review product specifications, supplier information and documentation.",
                                icon: ShieldCheck,
                            },
                            {
                                title: "Deployment",
                                text: "Coordinate delivery, setup and technology rollout where required.",
                                icon: PackageCheck,
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon size={20} />
                                    </div>

                                    <h3 className="mt-6 font-bold text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>

                                    <div className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                                        Learn more
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            startSupportChat(
                                "I'd like help turning our technology requirements into a procurement plan.",
                                {
                                    Intent: "Procurement planning",
                                    Category: "Technology procurement",
                                }
                            )
                        }
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                        Discuss procurement
                        <ArrowRight size={17} />
                    </button>
                </div>
            </section>

            {/* ============================================================
                RESOURCE CATEGORIES
            ============================================================ */}

            <section className="bg-white py-20 dark:bg-[#070b14] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <SectionLabel>Explore by decision</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Resources for different technology needs.
                            </h2>
                        </div>

                        <a
                            href="#guides"
                            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
                        >
                            View all guides
                            <ArrowUpRight size={16} />
                        </a>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {[
                            {
                                title: "Workplace Technology",
                                description:
                                    "Laptops, desktops, monitors, printers and accessories.",
                                icon: Monitor,
                                category: "Computers",
                            },
                            {
                                title: "Network Infrastructure",
                                description:
                                    "Wi-Fi, switches, connectivity and network equipment.",
                                icon: Network,
                                category: "Networking",
                            },
                            {
                                title: "Servers & Storage",
                                description:
                                    "Servers, NAS, storage, backup and infrastructure.",
                                icon: Database,
                                category: "Infrastructure",
                            },
                            {
                                title: "Cloud & SaaS",
                                description:
                                    "Cloud platforms, hosting, software subscriptions and services.",
                                icon: Cloud,
                                category: "Cloud",
                            },
                            {
                                title: "Security",
                                description:
                                    "Cybersecurity, identity, endpoint and data protection.",
                                icon: ShieldCheck,
                                category: "Security",
                            },
                            {
                                title: "Procurement",
                                description:
                                    "Quotations, verification, sourcing and buying processes.",
                                icon: ShoppingCart,
                                category: "Procurement",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.title}
                                    onClick={() =>
                                        setActiveCategory(item.category)
                                    }
                                    className="group text-left rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-500/30 dark:hover:bg-white/[0.045]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-400">
                                            <Icon size={20} />
                                        </div>

                                        <ArrowUpRight
                                            size={18}
                                            className="text-slate-400 transition group-hover:text-blue-500"
                                        />
                                    </div>

                                    <h3 className="mt-7 font-bold text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </button>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ============================================================
                ENTERPRISE PROCUREMENT
            ============================================================ */}

            <section className="relative overflow-hidden py-20 dark:bg-[#080e19] lg:py-28">
                <div className="absolute inset-0 bg-slate-950" />

                <div className="absolute inset-0 opacity-40">
                    <div className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />
                    <div className="absolute bottom-[10%] right-[10%] h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                                <Sparkles size={13} />
                                For larger purchases
                            </div>

                            <h2 className="mt-7 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
                                Planning a bulk technology purchase?
                            </h2>

                            <p className="mt-5 max-w-2xl leading-8 text-slate-400">
                                When the purchase involves multiple users,
                                locations or equipment categories, the decision
                                becomes more than simply selecting products.
                                Requirements, compatibility, sourcing, delivery
                                and deployment all need to work together.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "We're planning a bulk technology purchase and would like help with requirements, sourcing, verification, delivery and deployment.",
                                            {
                                                Intent: "Bulk procurement",
                                                Category: "Technology procurement",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                                >
                                    Request procurement help
                                    <ArrowRight size={17} />
                                </button>

                                <a
                                    href="/services/corporate-bulk-procurement"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                                >
                                    View procurement services
                                    <ArrowUpRight size={17} />
                                </a>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                                Larger procurement
                            </p>

                            <div className="mt-6 space-y-3">
                                {[
                                    "Multi-device requirements",
                                    "Multi-location deployment",
                                    "Competitive quotations",
                                    "Supplier sourcing",
                                    "Product verification",
                                    "Delivery coordination",
                                    "Installation and deployment",
                                    "Ongoing support",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                                    >
                                        <Check
                                            size={15}
                                            className="text-emerald-400"
                                        />

                                        <span className="text-sm text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================
                FAQ
            ============================================================ */}

            <section className="bg-white py-20 dark:bg-[#070b14] lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>Frequently asked questions</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Technology buying questions.
                        </h2>
                    </div>

                    <div className="mt-10 space-y-3">
                        {[
                            {
                                q: "Should I always buy the highest specification?",
                                a: "No. Higher specifications can increase cost without creating meaningful business value. The better approach is to match the specification to the workload, users and expected lifecycle.",
                            },
                            {
                                q: "Should price be the main factor?",
                                a: "Price matters, but the lowest purchase price does not necessarily mean the lowest total cost. Warranty, reliability, support, power consumption, maintenance and replacement should also be considered.",
                            },
                            {
                                q: "How do I compare different brands?",
                                a: "Start by defining the required specification and support expectations. Then compare equivalent configurations rather than comparing brand names alone.",
                            },
                            {
                                q: "What should I check before buying from a supplier?",
                                a: "Confirm the exact product specification, supplier identity, warranty terms, availability, delivery conditions, documentation and any applicable after-sales support.",
                            },
                            {
                                q: "Can AB help with bulk procurement?",
                                a: "Yes. Technology requirements can be structured, sourced, compared and coordinated for larger organizational purchases.",
                            },
                        ].map((item) => (
                            <details
                                key={item.q}
                                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:open:bg-white/[0.04]"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold text-slate-900 dark:text-white">
                                    {item.q}

                                    <ChevronDown
                                        size={17}
                                        className="shrink-0 transition-transform group-open:rotate-180"
                                    />
                                </summary>

                                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                FINAL CTA
            ============================================================ */}

            <section className="relative overflow-hidden border-t border-slate-200 dark:border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.14),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(14,165,233,0.10),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="rounded-[2rem] border border-blue-500/20 bg-blue-500/[0.05] p-8 text-center sm:p-12 lg:p-16">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                            <BookOpen size={25} />
                        </div>

                        <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Make your next technology purchase with a clearer
                            plan.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                            Explore the guides, build your requirements and, when
                            you need additional help, work with a procurement team
                            that can take the process further.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="#guides"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                Explore guides
                                <ArrowRight size={17} />
                            </a>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to talk to AB Technologies about an upcoming technology purchase.",
                                        {
                                            Intent: "Talk to team",
                                            Category: "Technology buying",
                                        }
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                            >
                                Talk to AB Technologies
                                <Headphones size={17} />
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================
                MODAL
            ============================================================ */}

            <GuideModal
                guide={selectedGuide}
                onClose={() => setSelectedGuide(null)}
                onSupportAction={(guide) =>
                    startSupportChat(
                        `I'd like help choosing the right option for ${guide.title}.`,
                        {
                            Intent: "Buying guide enquiry",
                            Guide: guide.title,
                            Category: guide.category,
                        }
                    )
                }
            />
        </main>
    );
}