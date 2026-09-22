import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    Search,
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    BrainCircuit,
    Cloud,
    ShieldCheck,
    Network,
    Server,
    Code2,
    Cpu,
    Database,
    BarChart3,
    Building2,
    GraduationCap,
    Factory,
    ShoppingBag,
    HeartPulse,
    Landmark,
    Lightbulb,
    TrendingUp,
    Zap,
    Globe2,
    LockKeyhole,
    Boxes,
    Settings2,
    Layers3,
    MonitorSmartphone,
    Sparkles,
    Clock3,
    CalendarDays,
    UserRound,
    ChevronRight,
    Filter,
    X,
    CheckCircle2,
    CircleDollarSign,
    FileText,
    BriefcaseBusiness,
    MessageSquareText,
    Rocket,
    Target,
    Workflow,
    RefreshCw,
    Eye,
    Bookmark,
    Share2,
    Mail,
    Send,
    ExternalLink,
    Menu,
    SlidersHorizontal,
} from "lucide-react";

export default function TechnologyInsights() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeIndustry, setActiveIndustry] = useState("All");
    const [activeType, setActiveType] = useState("All");
    const [sortBy, setSortBy] = useState("Featured");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
    const [bookmarked, setBookmarked] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a technology decision with AB Technologies.",
            metadata: {
                Source: "Technology Insights",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    const categories = [
        {
            name: "AI & Automation",
            icon: BrainCircuit,
            description:
                "Artificial intelligence, intelligent automation, agents and practical business applications.",
        },
        {
            name: "Cloud & Infrastructure",
            icon: Cloud,
            description:
                "Cloud platforms, hosting, servers, networking, infrastructure and operational resilience.",
        },
        {
            name: "Cybersecurity",
            icon: ShieldCheck,
            description:
                "Security strategy, identity, endpoint protection, risk management and cyber resilience.",
        },
        {
            name: "Software",
            icon: Code2,
            description:
                "Business applications, software engineering, SaaS, integrations and digital platforms.",
        },
        {
            name: "Procurement",
            icon: Boxes,
            description:
                "Technology purchasing, vendor management, sourcing, lifecycle planning and cost control.",
        },
        {
            name: "Digital Transformation",
            icon: Sparkles,
            description:
                "Modernizing operations, workflows, customer experiences and organizational systems.",
        },
        {
            name: "Networking",
            icon: Network,
            description:
                "Connectivity, enterprise networks, Wi-Fi, infrastructure architecture and communications.",
        },
        {
            name: "Business Technology",
            icon: BriefcaseBusiness,
            description:
                "Technology decisions that improve productivity, visibility, growth and operational efficiency.",
        },
    ];

    const industries = [
        "All",
        "Business",
        "Healthcare",
        "Education",
        "Government",
        "Retail",
        "Manufacturing",
        "NGOs",
        "Startups",
    ];

    const articleTypes = [
        "All",
        "Technology Insight",
        "Buying Guide",
        "Procurement",
        "Strategy",
        "How-To",
        "Industry",
        "Analysis",
    ];

    const insights = [
        {
            id: 1,
            title: "How AI Is Changing the Way Businesses Operate",
            excerpt:
                "AI is moving beyond experimentation. Organizations are beginning to use intelligent systems to automate repetitive work, improve decisions and create entirely new digital workflows.",
            category: "AI & Automation",
            industry: "Business",
            type: "Technology Insight",
            author: "AB Technologies Research",
            date: "August 28, 2026",
            readTime: "8 min read",
            featured: true,
            trending: true,
            icon: BrainCircuit,
            gradient:
                "from-violet-500/20 via-fuchsia-500/10 to-transparent",
            tags: ["Artificial Intelligence", "Automation", "Business"],
        },
        {
            id: 2,
            title: "The Modern Technology Stack for Growing Businesses",
            excerpt:
                "A practical look at the systems growing companies need to operate efficiently without building an unnecessarily complicated technology environment.",
            category: "Business Technology",
            industry: "Business",
            type: "Strategy",
            author: "AB Technologies Research",
            date: "August 24, 2026",
            readTime: "10 min read",
            featured: true,
            trending: true,
            icon: Layers3,
            gradient:
                "from-blue-500/20 via-cyan-500/10 to-transparent",
            tags: ["Business", "Software", "Infrastructure"],
        },
        {
            id: 3,
            title: "Cloud vs On-Premises Infrastructure: What Should Your Business Choose?",
            excerpt:
                "Cloud is not automatically the right answer for every workload. Understand the trade-offs between cloud, on-premises and hybrid infrastructure.",
            category: "Cloud & Infrastructure",
            industry: "Business",
            type: "Analysis",
            author: "AB Infrastructure Team",
            date: "August 20, 2026",
            readTime: "12 min read",
            featured: true,
            trending: false,
            icon: Cloud,
            gradient:
                "from-cyan-500/20 via-blue-500/10 to-transparent",
            tags: ["Cloud", "Servers", "Infrastructure"],
        },
        {
            id: 4,
            title: "A Practical Technology Procurement Framework",
            excerpt:
                "Technology procurement should be more than finding the cheapest quotation. Build a repeatable process for specifications, vendors, verification, pricing and lifecycle management.",
            category: "Procurement",
            industry: "Business",
            type: "Procurement",
            author: "AB Procurement Team",
            date: "August 18, 2026",
            readTime: "9 min read",
            featured: false,
            trending: true,
            icon: Boxes,
            gradient:
                "from-amber-500/20 via-orange-500/10 to-transparent",
            tags: ["Procurement", "Sourcing", "Vendors"],
        },
        {
            id: 5,
            title: "Cybersecurity Basics Every Growing Organization Should Have",
            excerpt:
                "A security program does not have to begin with expensive tools. Start with identity, access, backups, endpoint security, monitoring and employee awareness.",
            category: "Cybersecurity",
            industry: "Business",
            type: "How-To",
            author: "AB Security Team",
            date: "August 15, 2026",
            readTime: "11 min read",
            featured: false,
            trending: true,
            icon: ShieldCheck,
            gradient:
                "from-emerald-500/20 via-teal-500/10 to-transparent",
            tags: ["Security", "Identity", "Backup"],
        },
        {
            id: 6,
            title: "Building Reliable Business Networks in 2026",
            excerpt:
                "Connectivity has become foundational infrastructure. Learn how modern organizations should approach wired networks, Wi-Fi, segmentation and resilience.",
            category: "Networking",
            industry: "Business",
            type: "Technology Insight",
            author: "AB Infrastructure Team",
            date: "August 12, 2026",
            readTime: "8 min read",
            featured: false,
            trending: false,
            icon: Network,
            gradient:
                "from-indigo-500/20 via-blue-500/10 to-transparent",
            tags: ["Networking", "Wi-Fi", "Infrastructure"],
        },
        {
            id: 7,
            title: "Digital Transformation Without the Hype",
            excerpt:
                "Transformation is not about buying every new technology. It is about redesigning processes around measurable business outcomes.",
            category: "Digital Transformation",
            industry: "Business",
            type: "Strategy",
            author: "AB Strategy Team",
            date: "August 9, 2026",
            readTime: "7 min read",
            featured: false,
            trending: false,
            icon: RefreshCw,
            gradient:
                "from-pink-500/20 via-rose-500/10 to-transparent",
            tags: ["Transformation", "Strategy", "Operations"],
        },
        {
            id: 8,
            title: "Technology Planning for Schools and Universities",
            excerpt:
                "A modern education technology environment requires more than computers. Explore connectivity, devices, digital learning, security and support.",
            category: "Business Technology",
            industry: "Education",
            type: "Industry",
            author: "AB Education Technology Team",
            date: "August 6, 2026",
            readTime: "10 min read",
            featured: false,
            trending: false,
            icon: GraduationCap,
            gradient:
                "from-sky-500/20 via-indigo-500/10 to-transparent",
            tags: ["Education", "Devices", "Digital Learning"],
        },
        {
            id: 9,
            title: "Technology Infrastructure for Healthcare Organizations",
            excerpt:
                "Healthcare environments need technology that balances availability, security, operational efficiency and the needs of staff and patients.",
            category: "Digital Transformation",
            industry: "Healthcare",
            type: "Industry",
            author: "AB Industry Research",
            date: "August 3, 2026",
            readTime: "11 min read",
            featured: false,
            trending: false,
            icon: HeartPulse,
            gradient:
                "from-red-500/20 via-rose-500/10 to-transparent",
            tags: ["Healthcare", "Security", "Infrastructure"],
        },
        {
            id: 10,
            title: "How to Evaluate Business Software Before You Buy",
            excerpt:
                "Avoid choosing software based purely on feature lists. Learn how to evaluate fit, integration, usability, security, support and total cost.",
            category: "Software",
            industry: "Business",
            type: "Buying Guide",
            author: "AB Software Team",
            date: "July 30, 2026",
            readTime: "9 min read",
            featured: false,
            trending: true,
            icon: Code2,
            gradient:
                "from-purple-500/20 via-violet-500/10 to-transparent",
            tags: ["Software", "SaaS", "Buying Guide"],
        },
        {
            id: 11,
            title: "Why Technology Lifecycle Management Matters",
            excerpt:
                "Buying technology is only the beginning. Organizations need a lifecycle strategy covering deployment, maintenance, upgrades, replacement and disposal.",
            category: "Procurement",
            industry: "Business",
            type: "Procurement",
            author: "AB Procurement Team",
            date: "July 27, 2026",
            readTime: "8 min read",
            featured: false,
            trending: false,
            icon: RefreshCw,
            gradient:
                "from-orange-500/20 via-amber-500/10 to-transparent",
            tags: ["Lifecycle", "Procurement", "Assets"],
        },
        {
            id: 12,
            title: "AI Agents vs Traditional Automation",
            excerpt:
                "Understand where rule-based automation ends and intelligent agents begin, and how organizations can decide which approach makes sense.",
            category: "AI & Automation",
            industry: "Business",
            type: "Analysis",
            author: "AB AI Research",
            date: "July 23, 2026",
            readTime: "10 min read",
            featured: false,
            trending: true,
            icon: Workflow,
            gradient:
                "from-violet-500/20 via-purple-500/10 to-transparent",
            tags: ["AI Agents", "Automation", "Workflows"],
        },
        {
            id: 13,
            title: "Building a Technology Budget That Actually Works",
            excerpt:
                "A useful technology budget connects spending to business priorities instead of simply listing hardware and software expenses.",
            category: "Business Technology",
            industry: "Business",
            type: "Strategy",
            author: "AB Strategy Team",
            date: "July 19, 2026",
            readTime: "7 min read",
            featured: false,
            trending: false,
            icon: CircleDollarSign,
            gradient:
                "from-green-500/20 via-emerald-500/10 to-transparent",
            tags: ["Budget", "Planning", "Business"],
        },
        {
            id: 14,
            title: "Technology for Modern Retail Operations",
            excerpt:
                "Retail technology now connects point-of-sale, inventory, customer engagement, security, analytics and operations.",
            category: "Business Technology",
            industry: "Retail",
            type: "Industry",
            author: "AB Industry Research",
            date: "July 16, 2026",
            readTime: "9 min read",
            featured: false,
            trending: false,
            icon: ShoppingBag,
            gradient:
                "from-pink-500/20 via-orange-500/10 to-transparent",
            tags: ["Retail", "POS", "Inventory"],
        },
        {
            id: 15,
            title: "What Manufacturing Businesses Need From Modern IT",
            excerpt:
                "Manufacturing environments require reliable connectivity, operational systems, cybersecurity, monitoring and technology support.",
            category: "Business Technology",
            industry: "Manufacturing",
            type: "Industry",
            author: "AB Industry Research",
            date: "July 12, 2026",
            readTime: "10 min read",
            featured: false,
            trending: false,
            icon: Factory,
            gradient:
                "from-slate-500/20 via-zinc-500/10 to-transparent",
            tags: ["Manufacturing", "IT", "Operations"],
        },
        {
            id: 16,
            title: "The Hidden Cost of Cheap Technology",
            excerpt:
                "A low purchase price can become expensive when reliability, support, compatibility, security and replacement costs are ignored.",
            category: "Procurement",
            industry: "Business",
            type: "Analysis",
            author: "AB Procurement Team",
            date: "July 8, 2026",
            readTime: "8 min read",
            featured: false,
            trending: true,
            icon: Target,
            gradient:
                "from-red-500/20 via-orange-500/10 to-transparent",
            tags: ["Cost", "Procurement", "Quality"],
        },
        {
            id: 17,
            title: "How SMEs Can Build Enterprise-Grade IT Without Enterprise Budgets",
            excerpt:
                "Smaller organizations can adopt mature technology practices by prioritizing architecture, security, automation and managed services.",
            category: "Business Technology",
            industry: "Startups",
            type: "Strategy",
            author: "AB Strategy Team",
            date: "July 4, 2026",
            readTime: "10 min read",
            featured: false,
            trending: true,
            icon: Rocket,
            gradient:
                "from-blue-500/20 via-violet-500/10 to-transparent",
            tags: ["SME", "Startups", "IT"],
        },
        {
            id: 18,
            title: "Data Is Becoming Infrastructure",
            excerpt:
                "Organizations increasingly depend on reliable data pipelines, storage, analytics and governance to operate intelligently.",
            category: "Software",
            industry: "Business",
            type: "Technology Insight",
            author: "AB Data Team",
            date: "June 30, 2026",
            readTime: "9 min read",
            featured: false,
            trending: false,
            icon: Database,
            gradient:
                "from-cyan-500/20 via-blue-500/10 to-transparent",
            tags: ["Data", "Analytics", "Infrastructure"],
        },
    ];

    const featuredInsights = insights.filter((item) => item.featured);

    const filteredInsights = useMemo(() => {
        let result = [...insights];

        if (activeCategory !== "All") {
            result = result.filter(
                (item) => item.category === activeCategory
            );
        }

        if (activeIndustry !== "All") {
            result = result.filter(
                (item) => item.industry === activeIndustry
            );
        }

        if (activeType !== "All") {
            result = result.filter(
                (item) => item.type === activeType
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();

            result = result.filter((item) => {
                return (
                    item.title.toLowerCase().includes(query) ||
                    item.excerpt.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query) ||
                    item.industry.toLowerCase().includes(query) ||
                    item.tags.some((tag) =>
                        tag.toLowerCase().includes(query)
                    )
                );
            });
        }

        if (sortBy === "Latest") {
            result.sort((a, b) => b.id - a.id);
        }

        if (sortBy === "Trending") {
            result.sort(
                (a, b) =>
                    Number(b.trending) - Number(a.trending)
            );
        }

        return result;
    }, [
        activeCategory,
        activeIndustry,
        activeType,
        searchQuery,
        sortBy,
    ]);

    const visibleInsights = filteredInsights.slice(0, visibleCount);

    const toggleBookmark = (id) => {
        setBookmarked((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const handleNewsletter = (e) => {
        e.preventDefault();

        if (!newsletterEmail.trim()) {
            return;
        }

        setNewsletterSubmitted(true);
    };

    const clearFilters = () => {
        setActiveCategory("All");
        setActiveIndustry("All");
        setActiveType("All");
        setSearchQuery("");
        setSortBy("Featured");
        setVisibleCount(9);
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-white">

            {/* ========================================================= */}
            {/* HERO */}
            {/* ========================================================= */}

            <section className="relative isolate overflow-hidden">

                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(139,92,246,0.16),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(139,92,246,0.15),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.10),transparent_35%)]" />

                <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
                    <div className="absolute left-[8%] top-[18%] h-32 w-32 rounded-full border border-blue-500/30" />
                    <div className="absolute right-[12%] top-[12%] h-48 w-48 rounded-full border border-violet-500/20" />
                    <div className="absolute bottom-[5%] left-[45%] h-56 w-56 rounded-full border border-cyan-500/20" />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">

                    <div className="max-w-4xl">

                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm backdrop-blur-xl dark:border-blue-400/20 dark:bg-white/[0.05] dark:text-blue-300">
                            <Sparkles className="h-4 w-4" />
                            Technology Intelligence
                            <span className="h-1 w-1 rounded-full bg-blue-500" />
                            AB Technologies
                        </div>

                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
                            Technology
                            <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-cyan-300">
                                Insights
                            </span>
                        </h1>

                        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                            Practical intelligence for making better technology
                            decisions. Explore ideas, trends, buying guidance,
                            industry perspectives and real-world strategies for
                            building stronger digital operations.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <a
                                href="#latest"
                                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                            >
                                Explore insights
                                <ArrowRight className="h-4 w-4" />
                            </a>

                            <a
                                href="#topics"
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur-xl transition hover:border-blue-400 dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                            >
                                Browse topics
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </div>

                    </div>

                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            ["18+", "Published insights", BookOpen],
                            ["8", "Technology disciplines", Layers3],
                            ["9", "Industry perspectives", Building2],
                            ["100%", "Business-focused", Target],
                        ].map(([number, label, Icon]) => (
                            <div
                                key={label}
                                className="rounded-3xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-2xl font-black">
                                            {number}
                                        </div>
                                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                            {label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* FEATURED INSIGHTS */}
            {/* ========================================================= */}

            <section className="relative py-20 lg:py-28">

                <div className="absolute inset-0 -z-10 bg-white dark:bg-[#070b1a]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

                        <div className="max-w-2xl">
                            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Featured intelligence
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                Ideas worth paying attention to.
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                Our featured perspectives focus on the
                                technology decisions that can materially affect
                                how organizations operate, compete and grow.
                            </p>
                        </div>

                        <div className="hidden items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 lg:flex">
                            <TrendingUp className="h-4 w-4" />
                            Current technology conversations
                        </div>

                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">

                        {featuredInsights.map((article, index) => {
                            const Icon = article.icon;

                            return (
                                <article
                                    key={article.id}
                                    className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br ${article.gradient} bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950`}
                                >

                                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

                                    <div className="relative">

                                        <div className="flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-blue-600 shadow-sm dark:bg-white/[0.08] dark:text-blue-300">
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            {article.trending && (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                                                    <TrendingUp className="h-3.5 w-3.5" />
                                                    Trending
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-8">
                                            <div className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                                {article.category}
                                            </div>

                                            <h3 className="mt-3 text-2xl font-black leading-tight">
                                                {article.title}
                                            </h3>

                                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {article.excerpt}
                                            </p>
                                        </div>

                                        <div className="mt-7 flex flex-wrap gap-2">
                                            {article.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-slate-950/[0.05] px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-8 flex items-center justify-between border-t border-slate-200/70 pt-5 dark:border-white/10">

                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                <Clock3 className="h-3.5 w-3.5" />
                                                {article.readTime}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss the insight "${article.title}" and how it applies to our organization.`,
                                                        {
                                                            Intent: "Insight enquiry",
                                                            Insight: article.title,
                                                            Category: article.category,
                                                            Industry: article.industry,
                                                        }
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 text-sm font-black text-blue-600 transition group-hover:gap-3 dark:text-blue-400"
                                            >
                                                Discuss insight
                                                <ArrowRight className="h-4 w-4" />
                                            </button>

                                        </div>

                                    </div>
                                </article>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* TOPICS */}
            {/* ========================================================= */}

            <section
                id="topics"
                className="relative overflow-hidden py-20 lg:py-28"
            >

                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#050816]" />

                <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Explore by topic
                        </div>

                        <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                            Technology knowledge organized around real decisions.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            Go deeper into the areas that matter most to your
                            organization, from AI and cybersecurity to
                            infrastructure and procurement.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {categories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <button
                                    key={category.name}
                                    onClick={() => {
                                        setActiveCategory(category.name);
                                        document
                                            .getElementById("latest")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
                                >

                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition group-hover:scale-110 dark:text-blue-300">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-blue-500" />
                                    </div>

                                    <h3 className="mt-6 font-black">
                                        {category.name}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {category.description}
                                    </p>

                                </button>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* LATEST INSIGHTS */}
            {/* ========================================================= */}

            <section
                id="latest"
                className="relative py-20 lg:py-28"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mb-10">

                        <div className="max-w-3xl">
                            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Technology library
                            </div>

                            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                                Latest insights and analysis
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                Research, practical guidance and perspectives
                                designed to help organizations make informed
                                technology decisions.
                            </p>
                        </div>

                    </div>

                    {/* SEARCH BAR */}

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">

                        <div className="flex flex-col gap-4 lg:flex-row">

                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setVisibleCount(9);
                                    }}
                                    placeholder="Search technology insights..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
                                />
                            </div>

                            <button
                                onClick={() =>
                                    setMobileFiltersOpen(
                                        !mobileFiltersOpen
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold dark:border-white/10 lg:hidden"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters
                            </button>

                            <div className="hidden items-center gap-2 lg:flex">
                                <select
                                    value={sortBy}
                                    onChange={(e) =>
                                        setSortBy(e.target.value)
                                    }
                                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
                                >
                                    <option>Featured</option>
                                    <option>Latest</option>
                                    <option>Trending</option>
                                </select>
                            </div>

                        </div>

                        <div
                            className={`mt-4 ${mobileFiltersOpen
                                ? "block"
                                : "hidden"
                                } lg:block`}
                        >

                            <div className="grid gap-3 md:grid-cols-3">

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Topic
                                    </label>

                                    <select
                                        value={activeCategory}
                                        onChange={(e) => {
                                            setActiveCategory(
                                                e.target.value
                                            );
                                            setVisibleCount(9);
                                        }}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
                                    >
                                        <option value="All">
                                            All topics
                                        </option>

                                        {categories.map((item) => (
                                            <option
                                                key={item.name}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Industry
                                    </label>

                                    <select
                                        value={activeIndustry}
                                        onChange={(e) => {
                                            setActiveIndustry(
                                                e.target.value
                                            );
                                            setVisibleCount(9);
                                        }}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
                                    >
                                        {industries.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item === "All"
                                                    ? "All industries"
                                                    : item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Content type
                                    </label>

                                    <select
                                        value={activeType}
                                        onChange={(e) => {
                                            setActiveType(
                                                e.target.value
                                            );
                                            setVisibleCount(9);
                                        }}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
                                    >
                                        {articleTypes.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item === "All"
                                                    ? "All content types"
                                                    : item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            {(activeCategory !== "All" ||
                                activeIndustry !== "All" ||
                                activeType !== "All" ||
                                searchQuery) && (
                                    <div className="mt-4 flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-500">
                                            Active filters:
                                        </span>

                                        {activeCategory !== "All" && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-300">
                                                {activeCategory}
                                            </span>
                                        )}

                                        {activeIndustry !== "All" && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-600 dark:text-violet-300">
                                                {activeIndustry}
                                            </span>
                                        )}

                                        {activeType !== "All" && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                                                {activeType}
                                            </span>
                                        )}

                                        <button
                                            onClick={clearFilters}
                                            className="inline-flex items-center gap-1 text-xs font-bold text-red-500"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                            Clear
                                        </button>
                                    </div>
                                )}

                        </div>

                    </div>

                    {/* RESULT COUNT */}

                    <div className="mt-7 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Filter className="h-4 w-4" />
                            Showing{" "}
                            <strong className="text-slate-900 dark:text-white">
                                {visibleInsights.length}
                            </strong>{" "}
                            of {filteredInsights.length} insights
                        </div>

                        <div className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                            Updated regularly by AB Technologies
                        </div>
                    </div>

                    {/* INSIGHTS GRID */}

                    {visibleInsights.length > 0 ? (
                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {visibleInsights.map((article) => {
                                const Icon = article.icon;
                                const isBookmarked =
                                    bookmarked.includes(article.id);

                                return (
                                    <article
                                        key={article.id}
                                        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.04]"
                                    >

                                        {/* VISUAL HEADER */}

                                        <div
                                            className={`relative h-48 overflow-hidden bg-gradient-to-br ${article.gradient}`}
                                        >

                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_25%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_25%)]" />

                                            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
                                            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-white/10" />

                                            <div className="relative flex h-full items-center justify-center">
                                                <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/30 bg-white/40 text-slate-900 shadow-xl backdrop-blur-xl dark:bg-white/[0.08] dark:text-white">
                                                    <Icon className="h-9 w-9" />
                                                </div>
                                            </div>

                                            <div className="absolute left-5 top-5">
                                                <span className="rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-black text-slate-800 shadow-sm backdrop-blur-xl dark:bg-black/30 dark:text-white">
                                                    {article.type}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    toggleBookmark(
                                                        article.id
                                                    )
                                                }
                                                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-slate-700 shadow-sm backdrop-blur-xl transition hover:scale-105 dark:bg-black/30 dark:text-white"
                                                aria-label="Bookmark insight"
                                            >
                                                <Bookmark
                                                    className="h-4 w-4"
                                                    fill={
                                                        isBookmarked
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                />
                                            </button>

                                        </div>

                                        {/* CONTENT */}

                                        <div className="flex flex-1 flex-col p-6">

                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                                {article.category}
                                                <span className="h-1 w-1 rounded-full bg-slate-400" />
                                                {article.industry}
                                            </div>

                                            <h3 className="mt-3 text-xl font-black leading-tight transition group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                {article.title}
                                            </h3>

                                            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {article.excerpt}
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {article.tags
                                                    .slice(0, 3)
                                                    .map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-white/[0.05] dark:text-slate-400"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                            </div>

                                            <div className="mt-auto pt-6">

                                                <div className="mb-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">

                                                    <div className="flex items-center gap-2">
                                                        <UserRound className="h-3.5 w-3.5" />
                                                        {article.author}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Clock3 className="h-3.5 w-3.5" />
                                                        {article.readTime}
                                                    </div>

                                                </div>

                                                <div className="flex items-center justify-between border-t border-slate-200 pt-5 dark:border-white/10">

                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                        <CalendarDays className="h-3.5 w-3.5" />
                                                        {article.date}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startSupportChat(
                                                                `I'd like to discuss the insight "${article.title}" and how it applies to our organization.`,
                                                                {
                                                                    Intent: "Insight enquiry",
                                                                    Insight: article.title,
                                                                    Category: article.category,
                                                                    Industry: article.industry,
                                                                    Type: article.type,
                                                                }
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 text-sm font-black text-blue-600 transition group-hover:gap-3 dark:text-blue-400"
                                                    >
                                                        Discuss
                                                        <ArrowRight className="h-4 w-4" />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>
                    ) : (
                        <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-white/[0.03]">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/[0.06]">
                                <Search className="h-7 w-7" />
                            </div>

                            <h3 className="mt-5 text-xl font-black">
                                No insights found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Try a different keyword or remove one or more
                                filters to discover more technology insights.
                            </p>

                            <button
                                onClick={clearFilters}
                                className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
                            >
                                Reset search
                            </button>

                        </div>
                    )}

                    {visibleCount < filteredInsights.length && (
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={() =>
                                    setVisibleCount(
                                        (current) => current + 6
                                    )
                                }
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-black shadow-sm transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:hover:text-blue-400"
                            >
                                Load more insights
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                </div>
            </section>

            {/* ========================================================= */}
            {/* TECHNOLOGY SIGNALS */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">

                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#070b1a]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-300">
                                <TrendingUp className="h-4 w-4" />
                                Technology signals
                            </div>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                                What we are watching.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                Technology changes quickly. We track the
                                developments that have practical implications
                                for businesses, institutions and organizations.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss current technology trends and which ones matter for our organization.",
                                        {
                                            Intent: "Technology signals enquiry",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400"
                            >
                                Discuss technology signals
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    icon: BrainCircuit,
                                    title: "AI adoption",
                                    text: "Organizations are moving from AI experimentation toward practical workflows.",
                                },
                                {
                                    icon: Cloud,
                                    title: "Hybrid infrastructure",
                                    text: "Cloud and on-premises environments increasingly work together.",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Security by design",
                                    text: "Security is becoming part of architecture rather than an afterthought.",
                                },
                                {
                                    icon: Workflow,
                                    title: "Connected operations",
                                    text: "Automation and integrations are connecting previously isolated systems.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* BUYING INTELLIGENCE */}
            {/* ========================================================= */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-white/[0.04]">

                        <div className="grid lg:grid-cols-2">

                            <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-12 lg:p-16">

                                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                                <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

                                <div className="relative">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                                        <Boxes className="h-7 w-7 text-blue-300" />
                                    </div>

                                    <h2 className="mt-7 text-3xl font-black sm:text-4xl">
                                        Technology buying intelligence
                                    </h2>

                                    <p className="mt-5 leading-8 text-slate-300">
                                        Before you spend money on hardware,
                                        software, infrastructure or services,
                                        understand what you are actually
                                        buying.
                                    </p>

                                    <div className="mt-8 space-y-4">

                                        {[
                                            "Specification checklists",
                                            "Vendor evaluation frameworks",
                                            "Total cost considerations",
                                            "Lifecycle planning",
                                            "Procurement risk assessment",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3"
                                            >
                                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                                                <span className="text-sm font-semibold text-slate-200">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}

                                    </div>

                                </div>

                            </div>

                            <div className="p-8 sm:p-12 lg:p-16">

                                <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Make better decisions
                                </div>

                                <h3 className="mt-4 text-2xl font-black sm:text-3xl">
                                    Don't just buy technology.
                                    <span className="block text-slate-500 dark:text-slate-400">
                                        Buy the right technology.
                                    </span>
                                </h3>

                                <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                    Our insights are designed to help teams
                                    understand requirements before they
                                    approach vendors, request quotations or
                                    approve technology purchases.
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                    {[
                                        [FileText, "Buying guides"],
                                        [Target, "Decision frameworks"],
                                        [BarChart3, "Cost analysis"],
                                        [ShieldCheck, "Risk awareness"],
                                    ].map(([Icon, label]) => (
                                        <div
                                            key={label}
                                            className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"
                                        >
                                            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            <div className="mt-3 text-sm font-black">
                                                {label}
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like guidance before buying technology for our organization.",
                                            {
                                                Intent: "Technology buying guidance",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white dark:bg-white dark:text-slate-950"
                                >
                                    Get buying guidance
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* INDUSTRY INTELLIGENCE */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">

                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#050816]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Industry intelligence
                        </div>

                        <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                            Technology looks different in every industry.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                            Explore technology considerations based on the
                            operational realities of different sectors.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            [Building2, "Businesses", "Productivity, growth and operational systems."],
                            [HeartPulse, "Healthcare", "Secure and reliable technology environments."],
                            [GraduationCap, "Education", "Connected learning and institutional IT."],
                            [Landmark, "Government", "Public-sector technology and digital services."],
                            [ShoppingBag, "Retail", "Commerce, inventory and customer technology."],
                            [Factory, "Manufacturing", "Industrial systems, connectivity and operations."],
                            [Globe2, "NGOs", "Technology for development and impact."],
                            [Rocket, "Startups", "Lean infrastructure for rapid growth."],
                        ].map(([Icon, title, description]) => (
                            <button
                                key={title}
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss technology considerations for ${title}.`,
                                        {
                                            Intent: "Industry technology enquiry",
                                            Industry: title,
                                        }
                                    )
                                }
                                className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
                            >
                                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />

                                <h3 className="mt-5 font-black">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {description}
                                </p>

                                <div className="mt-5 flex items-center gap-1 text-xs font-black text-blue-600 dark:text-blue-400">
                                    Discuss industry
                                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                                </div>
                            </button>
                        ))}

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* INSIGHT PRINCIPLES */}
            {/* ========================================================= */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-violet-600 dark:text-violet-300">
                                <Lightbulb className="h-4 w-4" />
                                Our perspective
                            </div>

                            <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                                Technology should solve problems, not create new ones.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                Every technology decision should connect to a
                                real business, institutional or operational
                                outcome. That principle shapes the insights we
                                publish.
                            </p>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                [
                                    Target,
                                    "Outcome first",
                                    "Start with the problem and desired result before selecting technology.",
                                ],
                                [
                                    ShieldCheck,
                                    "Security matters",
                                    "Security, privacy and resilience should be considered from the beginning.",
                                ],
                                [
                                    Settings2,
                                    "Practical architecture",
                                    "Choose solutions that teams can actually deploy, maintain and operate.",
                                ],
                                [
                                    CircleDollarSign,
                                    "Value over hype",
                                    "Technology should justify its cost through measurable value.",
                                ],
                            ].map(([Icon, title, text]) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                                >
                                    <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />

                                    <h3 className="mt-5 font-black">
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
            </section>

            {/* ========================================================= */}
            {/* FREE RESOURCES */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">

                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />

                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">

                        <div className="text-white">

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider">
                                <BookOpen className="h-4 w-4" />
                                Free resources
                            </div>

                            <h2 className="mt-6 text-3xl font-black sm:text-4xl lg:text-5xl">
                                Learn before you buy.
                            </h2>

                            <p className="mt-5 max-w-2xl leading-8 text-blue-100">
                                We are building a growing collection of free
                                technology resources, buying guides,
                                checklists and practical tools to help
                                organizations make better decisions.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Buying checklists",
                                    "Procurement guides",
                                    "Technology calculators",
                                    "Planning templates",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                        </div>

                        <div className="rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-xl">

                            <div className="grid gap-4">

                                {[
                                    [FileText, "Technology buying guides"],
                                    [Boxes, "Procurement resources"],
                                    [BarChart3, "Technology planning tools"],
                                    [Lightbulb, "Practical explainers"],
                                ].map(([Icon, title]) => (
                                    <div
                                        key={title}
                                        className="flex items-center justify-between rounded-2xl bg-white/10 p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <span className="text-sm font-bold">
                                                {title}
                                            </span>
                                        </div>

                                        <ArrowUpRight className="h-4 w-4 text-blue-100" />
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* NEWSLETTER */}
            {/* ========================================================= */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-12 lg:p-16">

                        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                <Mail className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                                Stay ahead of what is changing.
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                                Get practical technology insights, buying
                                guidance and important industry developments
                                delivered to your inbox.
                            </p>

                            {!newsletterSubmitted ? (
                                <form
                                    onSubmit={handleNewsletter}
                                    className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
                                >
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type="email"
                                            value={newsletterEmail}
                                            onChange={(e) =>
                                                setNewsletterEmail(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Your email address"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white dark:bg-white dark:text-slate-950"
                                    >
                                        Subscribe
                                        <Send className="h-4 w-4" />
                                    </button>
                                </form>
                            ) : (
                                <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 px-5 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-300">
                                    <CheckCircle2 className="h-5 w-5" />
                                    You're on the list. Watch your inbox for
                                    new insights.
                                </div>
                            )}

                            <p className="mt-4 text-xs text-slate-400">
                                No unnecessary noise. Just useful technology
                                intelligence.
                            </p>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* FINAL CTA */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">

                <div className="absolute inset-0 -z-10 bg-slate-950 dark:bg-black" />

                <div className="absolute left-[15%] top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute right-[10%] bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-300">
                        <Cpu className="h-7 w-7" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                        Have a technology decision to make?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                        Move from research to action. Talk to AB Technologies
                        about your technology requirements, procurement,
                        software, infrastructure or digital transformation
                        needs.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to discuss a technology decision or requirement for our organization.",
                                    {
                                        Intent: "Start conversation",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
                        >
                            Start a conversation
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a quote for our technology requirement.",
                                    {
                                        Intent: "Request technology quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10"
                        >
                            Request a technology quote
                            <MessageSquareText className="h-4 w-4" />
                        </button>

                    </div>

                </div>
            </section>

        </main>
    );
}