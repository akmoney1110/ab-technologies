import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    BrainCircuit,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Cloud,
    Code2,
    Cpu,
    Download,
    FileText,
    Filter,
    Globe2,
    Headphones,
    Laptop,
    Lightbulb,
    Mail,
    Menu,
    Network,
    Newspaper,
    Search,
    Send,
    Server,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Tag,
    TrendingUp,
    Users,
    X,
    Zap,
} from "lucide-react";

const categories = [
    "All",
    "Technology",
    "Procurement",
    "Software",
    "AI & Automation",
    "Cloud & Infrastructure",
    "Cybersecurity",
    "Business",
    "Education",
];

const articles = [
    {
        id: 1,
        title: "How to Build a Smarter Technology Strategy for a Growing Business",
        excerpt:
            "A practical framework for choosing technology that supports growth without creating unnecessary complexity, recurring costs, or operational bottlenecks.",
        category: "Business",
        author: "AB Technologies",
        date: "August 28, 2026",
        readTime: "8 min read",
        featured: true,
        gradient: "from-blue-600 via-indigo-600 to-violet-700",
        icon: BriefcaseBusiness,
        tags: ["Business Growth", "IT Strategy", "Digital Transformation"],
    },
    {
        id: 2,
        title: "The Complete Guide to Buying Business Laptops in 2026",
        excerpt:
            "What organizations should evaluate before buying laptops in bulk, from processor performance and memory to warranty, deployment and long-term support.",
        category: "Procurement",
        author: "AB Procurement Team",
        date: "August 25, 2026",
        readTime: "10 min read",
        gradient: "from-sky-500 to-blue-700",
        icon: Laptop,
        tags: ["Hardware", "Procurement", "Laptops"],
    },
    {
        id: 3,
        title: "AI in Everyday Business: Where Automation Actually Makes Sense",
        excerpt:
            "AI does not need to replace your entire workflow. Discover practical areas where intelligent automation can save time and improve consistency.",
        category: "AI & Automation",
        author: "AB Digital Solutions",
        date: "August 22, 2026",
        readTime: "7 min read",
        gradient: "from-violet-500 to-fuchsia-700",
        icon: BrainCircuit,
        tags: ["AI", "Automation", "Productivity"],
    },
    {
        id: 4,
        title: "Cloud Infrastructure Explained for Non-Technical Business Owners",
        excerpt:
            "Understand servers, cloud hosting, backups, security and managed infrastructure without needing to become a systems administrator.",
        category: "Cloud & Infrastructure",
        author: "AB Infrastructure Team",
        date: "August 19, 2026",
        readTime: "9 min read",
        gradient: "from-cyan-500 to-blue-700",
        icon: Cloud,
        tags: ["Cloud", "Hosting", "Infrastructure"],
    },
    {
        id: 5,
        title: "Why Your Business Network Is Slower Than It Should Be",
        excerpt:
            "From poor Wi-Fi design to outdated switches and bandwidth bottlenecks, here are the most common causes of poor network performance.",
        category: "Technology",
        author: "AB Network Team",
        date: "August 17, 2026",
        readTime: "6 min read",
        gradient: "from-emerald-500 to-teal-700",
        icon: Network,
        tags: ["Networking", "Wi-Fi", "Infrastructure"],
    },
    {
        id: 6,
        title: "Cybersecurity Basics Every Organization Should Have in Place",
        excerpt:
            "A straightforward security checklist covering identity, devices, backups, email, access control and employee awareness.",
        category: "Cybersecurity",
        author: "AB Security Team",
        date: "August 14, 2026",
        readTime: "11 min read",
        gradient: "from-rose-500 to-red-700",
        icon: ShieldCheck,
        tags: ["Security", "Cybersecurity", "Risk"],
    },
    {
        id: 7,
        title: "Software vs Custom Software: Which One Does Your Business Need?",
        excerpt:
            "Learn when an existing application is enough and when building a custom platform can provide a better operational advantage.",
        category: "Software",
        author: "AB Software Team",
        date: "August 11, 2026",
        readTime: "8 min read",
        gradient: "from-indigo-500 to-blue-700",
        icon: Code2,
        tags: ["Software", "SaaS", "Custom Development"],
    },
    {
        id: 8,
        title: "How to Plan a Technology Procurement Project From Start to Finish",
        excerpt:
            "A step-by-step framework for requirements, vendor sourcing, quotations, verification, delivery and deployment.",
        category: "Procurement",
        author: "AB Procurement Team",
        date: "August 8, 2026",
        readTime: "12 min read",
        gradient: "from-orange-500 to-amber-700",
        icon: ShoppingCart,
        tags: ["Procurement", "Sourcing", "Projects"],
    },
    {
        id: 9,
        title: "Digital Transformation Is More Than Buying New Software",
        excerpt:
            "Successful transformation combines people, processes, data, technology and measurable business outcomes.",
        category: "Business",
        author: "AB Technologies",
        date: "August 5, 2026",
        readTime: "9 min read",
        gradient: "from-purple-500 to-indigo-700",
        icon: Zap,
        tags: ["Transformation", "Strategy", "Business"],
    },
    {
        id: 10,
        title: "Creating a Reliable Backup Strategy for Your Organization",
        excerpt:
            "A practical introduction to backup planning, redundancy, recovery objectives and protecting critical business information.",
        category: "Cloud & Infrastructure",
        author: "AB Infrastructure Team",
        date: "August 2, 2026",
        readTime: "7 min read",
        gradient: "from-teal-500 to-cyan-700",
        icon: Server,
        tags: ["Backup", "Cloud", "Business Continuity"],
    },
    {
        id: 11,
        title: "Technology for Schools: Building a Better Digital Learning Environment",
        excerpt:
            "How schools and universities can approach devices, networking, digital learning platforms, security and support.",
        category: "Education",
        author: "AB Education Solutions",
        date: "July 30, 2026",
        readTime: "10 min read",
        gradient: "from-blue-500 to-indigo-700",
        icon: BookOpen,
        tags: ["Education", "Digital Learning", "Schools"],
    },
    {
        id: 12,
        title: "The Hidden Cost of Cheap Technology",
        excerpt:
            "Low purchase prices can sometimes lead to higher maintenance, downtime, replacement and support costs.",
        category: "Procurement",
        author: "AB Procurement Team",
        date: "July 27, 2026",
        readTime: "6 min read",
        gradient: "from-amber-500 to-orange-700",
        icon: Tag,
        tags: ["Procurement", "Cost", "Hardware"],
    },
    {
        id: 13,
        title: "How Business Communication Systems Improve Team Productivity",
        excerpt:
            "Explore the role of professional email, collaboration platforms, unified communication and internal workflows.",
        category: "Business",
        author: "AB Communication Team",
        date: "July 24, 2026",
        readTime: "7 min read",
        gradient: "from-pink-500 to-rose-700",
        icon: Headphones,
        tags: ["Communication", "Productivity", "Teams"],
    },
    {
        id: 14,
        title: "A Beginner's Guide to Business APIs and Integrations",
        excerpt:
            "Understand how modern applications communicate and how integrations can remove repetitive manual work.",
        category: "Software",
        author: "AB Software Team",
        date: "July 21, 2026",
        readTime: "9 min read",
        gradient: "from-indigo-500 to-violet-700",
        icon: Code2,
        tags: ["API", "Integration", "Software"],
    },
    {
        id: 15,
        title: "What Managed IT Support Actually Means",
        excerpt:
            "Managed IT is more than fixing computers. Learn how proactive monitoring, maintenance and support can reduce technology disruption.",
        category: "Technology",
        author: "AB Managed IT Team",
        date: "July 18, 2026",
        readTime: "8 min read",
        gradient: "from-slate-600 to-slate-900",
        icon: Cpu,
        tags: ["Managed IT", "Support", "Business"],
    },
    {
        id: 16,
        title: "How to Evaluate a Technology Vendor",
        excerpt:
            "A vendor evaluation framework covering capability, reliability, pricing, support, verification and long-term value.",
        category: "Procurement",
        author: "AB Vendor Management",
        date: "July 15, 2026",
        readTime: "10 min read",
        gradient: "from-green-500 to-emerald-700",
        icon: CheckCircle2,
        tags: ["Vendors", "Sourcing", "Procurement"],
    },
];

const popularTopics = [
    {
        title: "Technology Procurement",
        count: "24 articles",
        icon: ShoppingCart,
    },
    {
        title: "Artificial Intelligence",
        count: "18 articles",
        icon: BrainCircuit,
    },
    {
        title: "Business Software",
        count: "21 articles",
        icon: Code2,
    },
    {
        title: "Cloud Infrastructure",
        count: "16 articles",
        icon: Cloud,
    },
    {
        title: "Cybersecurity",
        count: "14 articles",
        icon: ShieldCheck,
    },
    {
        title: "Digital Transformation",
        count: "19 articles",
        icon: Sparkles,
    },
];

function Blog() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(9);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a technology requirement with AB TECHNOLOGIES.",
            metadata: {
                Source: "Blog & Insights",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    const filteredArticles = useMemo(() => {
        const query = search.trim().toLowerCase();

        return articles.filter((article) => {
            const categoryMatch =
                activeCategory === "All" ||
                article.category === activeCategory;

            if (!query) {
                return categoryMatch;
            }

            const searchableText = [
                article.title,
                article.excerpt,
                article.category,
                article.author,
                ...(article.tags || []),
            ]
                .join(" ")
                .toLowerCase();

            return categoryMatch && searchableText.includes(query);
        });
    }, [activeCategory, search]);

    const visibleArticles = filteredArticles.slice(0, visibleCount);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setVisibleCount(9);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setVisibleCount(9);
    };

    const handleSubscribe = (event) => {
        event.preventDefault();

        if (!email.trim()) {
            return;
        }

        setSubscribed(true);
        setEmail("");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">

                <div className="absolute inset-0 -z-10">
                    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                    <div className="absolute right-0 top-20 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/10" />
                    <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
                </div>

                <div
                    className="
                        absolute inset-0 -z-10 opacity-[0.035]
                        [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)]
                        [background-size:48px_48px]
                        dark:opacity-[0.06]
                    "
                />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">

                    <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

                        <div>

                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                                <Newspaper className="h-4 w-4" />
                                Technology & Business Insights
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Ideas that help you
                                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                    make better decisions.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                Practical technology insights, procurement guidance,
                                software ideas, AI strategies and digital transformation
                                knowledge for organizations that want to work smarter.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                                <a
                                    href="#latest"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Explore insights
                                    <ArrowRight className="h-5 w-5" />
                                </a>

                                <a
                                    href="#newsletter"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400"
                                >
                                    Subscribe to updates
                                    <Mail className="h-5 w-5" />
                                </a>

                            </div>

                            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500 dark:text-slate-400">

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Practical guides
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Procurement insights
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    AI & software
                                </div>

                            </div>

                        </div>

                        <div className="relative">

                            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-cyan-500/20 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl dark:border-white/10">

                                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                                                AB Insights
                                            </p>

                                            <p className="mt-2 text-xl font-bold text-white">
                                                The technology market
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15">
                                            <Lightbulb className="h-6 w-6 text-blue-300" />
                                        </div>

                                    </div>

                                    <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                        {[
                                            ["AI", "Intelligent solutions"],
                                            ["IT", "Infrastructure"],
                                            ["BUY", "Procurement"],
                                            ["BUILD", "Software"],
                                        ].map(([label, text]) => (
                                            <div
                                                key={label}
                                                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                                            >
                                                <div className="text-xs font-black tracking-widest text-blue-300">
                                                    {label}
                                                </div>

                                                <div className="mt-2 text-sm font-semibold text-white">
                                                    {text}
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                    <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />

                                            <div>
                                                <p className="font-bold text-white">
                                                    Technology should solve a problem.
                                                </p>

                                                <p className="mt-1 text-sm leading-6 text-slate-300">
                                                    Not simply add another system to manage.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                FEATURED ARTICLE
            ========================================================= */}

            <section className="relative bg-slate-100 py-16 dark:bg-slate-900/60 lg:py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mb-8 flex items-end justify-between gap-5">

                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                <TrendingUp className="h-4 w-4" />
                                Editor's pick
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                Featured insight
                            </h2>
                        </div>

                        <a
                            href="#latest"
                            className="hidden items-center gap-2 font-bold text-blue-600 sm:flex dark:text-blue-400"
                        >
                            View latest
                            <ArrowRight className="h-4 w-4" />
                        </a>

                    </div>

                    {articles
                        .filter((article) => article.featured)
                        .map((article) => {
                            const Icon = article.icon;

                            return (
                                <article
                                    key={article.id}
                                    className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950"
                                >

                                    <div className="grid lg:grid-cols-[1fr_1.15fr]">

                                        <div
                                            className={`relative min-h-[340px] overflow-hidden bg-gradient-to-br ${article.gradient} p-8 sm:p-10`}
                                        >

                                            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/20" />
                                            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-white/10" />

                                            <div className="relative flex h-full flex-col justify-between">

                                                <div className="flex items-center justify-between">

                                                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                                                        Featured
                                                    </span>

                                                    <Icon className="h-10 w-10 text-white/80" />

                                                </div>

                                                <div>

                                                    <div className="mb-3 flex items-center gap-3 text-sm text-white/75">
                                                        <span>{article.category}</span>
                                                        <span>•</span>
                                                        <span>{article.readTime}</span>
                                                    </div>

                                                    <h3 className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
                                                        {article.title}
                                                    </h3>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">

                                            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                                                {article.excerpt}
                                            </p>

                                            <div className="mt-7 flex flex-wrap gap-2">

                                                {article.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}

                                            </div>

                                            <div className="mt-8 flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">

                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {article.author}
                                                    </p>

                                                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                        <CalendarDays className="h-4 w-4" />
                                                        {article.date}
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedArticle(article)}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
                                                >
                                                    Read article
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </article>
                            );
                        })}

                </div>

            </section>

            {/* =========================================================
                SEARCH + FILTER
            ========================================================= */}

            <section
                id="latest"
                className="scroll-mt-20 bg-white py-16 dark:bg-slate-950 lg:py-24"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            <BookOpen className="h-4 w-4" />
                            Explore the knowledge base
                        </div>

                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Latest technology insights
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Explore practical articles covering technology,
                            procurement, software, infrastructure, AI and business
                            transformation.
                        </p>

                    </div>

                    <div className="mt-10 flex flex-col gap-4 lg:flex-row">

                        <div className="relative flex-1">

                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                value={search}
                                onChange={handleSearch}
                                type="search"
                                placeholder="Search articles, topics, software, procurement..."
                                className="
                                    h-14 w-full rounded-2xl
                                    border border-slate-200
                                    bg-slate-50
                                    pl-12 pr-5
                                    text-slate-900
                                    outline-none
                                    transition
                                    placeholder:text-slate-400
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-500/10
                                    dark:border-white/10
                                    dark:bg-white/[0.04]
                                    dark:text-white
                                    dark:placeholder:text-slate-500
                                "
                            />

                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 font-bold text-slate-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-white lg:hidden"
                        >
                            <Filter className="h-5 w-5" />
                            Categories
                            <ChevronDown
                                className={`h-4 w-4 transition ${showFilters ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                    </div>

                    <div
                        className={`mt-5 ${showFilters ? "block" : "hidden"
                            } lg:block`}
                    >

                        <div className="flex flex-wrap gap-2">

                            {categories.map((category) => (
                                <button
                                    type="button"
                                    key={category}
                                    onClick={() =>
                                        handleCategoryChange(category)
                                    }
                                    className={`
                                        rounded-full px-4 py-2.5 text-sm font-bold transition
                                        ${activeCategory === category
                                            ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                                            : "border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-300"
                                        }
                                    `}
                                >
                                    {category}
                                </button>
                            ))}

                        </div>

                    </div>

                    <div className="mt-10 flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">

                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Showing{" "}
                            <span className="text-slate-900 dark:text-white">
                                {visibleArticles.length}
                            </span>{" "}
                            of{" "}
                            <span className="text-slate-900 dark:text-white">
                                {filteredArticles.length}
                            </span>{" "}
                            articles
                        </p>

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
                            >
                                Clear search
                                <X className="h-4 w-4" />
                            </button>
                        )}

                    </div>

                    {/* =====================================================
                        ARTICLE GRID
                    ===================================================== */}

                    {visibleArticles.length > 0 ? (
                        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {visibleArticles.map((article) => {
                                const Icon = article.icon;

                                return (
                                    <article
                                        key={article.id}
                                        className="
                                            group flex h-full flex-col overflow-hidden
                                            rounded-3xl
                                            border border-slate-200
                                            bg-white
                                            shadow-sm
                                            transition duration-300
                                            hover:-translate-y-1
                                            hover:shadow-2xl
                                            dark:border-white/10
                                            dark:bg-slate-900/70
                                        "
                                    >

                                        <div
                                            className={`relative h-52 overflow-hidden bg-gradient-to-br ${article.gradient} p-6`}
                                        >

                                            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/20" />

                                            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-white/10" />

                                            <div className="relative flex h-full flex-col justify-between">

                                                <div className="flex items-center justify-between">

                                                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                                                        {article.category}
                                                    </span>

                                                    <Icon className="h-8 w-8 text-white/80" />

                                                </div>

                                                <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                                                    <Clock3 className="h-4 w-4" />
                                                    {article.readTime}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex flex-1 flex-col p-6">

                                            <h3 className="text-xl font-black leading-snug text-slate-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                                {article.title}
                                            </h3>

                                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {article.excerpt}
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-2">

                                                {article.tags
                                                    .slice(0, 2)
                                                    .map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs font-semibold text-slate-400 dark:text-slate-500"
                                                        >
                                                            #{tag.replace(
                                                                /\s+/g,
                                                                ""
                                                            )}
                                                        </span>
                                                    ))}

                                            </div>

                                            <div className="mt-auto pt-6">

                                                <div className="mb-5 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/10">

                                                    <div>
                                                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                            {article.author}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {article.date}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedArticle(
                                                                article
                                                            )
                                                        }
                                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:text-slate-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                        aria-label={`Read ${article.title}`}
                                                    >
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>
                    ) : (
                        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-white/15 dark:bg-white/[0.03]">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400">
                                <Search className="h-7 w-7" />
                            </div>

                            <h3 className="mt-5 text-xl font-black">
                                No articles found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Try another search term or select a different
                                category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setActiveCategory("All");
                                }}
                                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                            >
                                Reset filters
                            </button>

                        </div>
                    )}

                    {visibleCount < filteredArticles.length && (
                        <div className="mt-12 flex justify-center">

                            <button
                                type="button"
                                onClick={() =>
                                    setVisibleCount((value) => value + 6)
                                }
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-3.5 font-bold text-slate-800 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-400"
                            >
                                Load more articles
                                <ChevronDown className="h-4 w-4" />
                            </button>

                        </div>
                    )}

                </div>

            </section>

            {/* =========================================================
                TOPICS
            ========================================================= */}

            <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-white/10 dark:bg-slate-900/60 lg:py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                        <div className="max-w-2xl">

                            <div className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                Browse by topic
                            </div>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                Find the knowledge you need
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                From buying technology to building software,
                                explore focused resources around the decisions
                                organizations make every day.
                            </p>

                        </div>

                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {popularTopics.map((topic) => {
                            const Icon = topic.icon;

                            return (
                                <button
                                    type="button"
                                    key={topic.title}
                                    onClick={() => {
                                        const matchingCategory =
                                            categories.find((category) =>
                                                topic.title
                                                    .toLowerCase()
                                                    .includes(
                                                        category
                                                            .toLowerCase()
                                                            .replace(
                                                                " & ",
                                                                " "
                                                            )
                                                    )
                                            );

                                        if (matchingCategory) {
                                            handleCategoryChange(
                                                matchingCategory
                                            );
                                            document
                                                .getElementById("latest")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                        }
                                    }}
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-blue-500/30"
                                >

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-blue-500" />

                                    </div>

                                    <h3 className="mt-6 font-black">
                                        {topic.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {topic.count}
                                    </p>

                                </button>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* =========================================================
                RESOURCE CTA
            ========================================================= */}

            <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-8 shadow-2xl sm:p-12 lg:p-16">

                        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">

                            <div>

                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-300">
                                    <Download className="h-4 w-4" />
                                    Free technology resources
                                </div>

                                <h2 className="mt-6 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                                    Useful resources without the sales pitch.
                                </h2>

                                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                                    Download practical checklists, buying guides,
                                    procurement templates and technology planning
                                    resources designed to help you make informed
                                    decisions.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">

                                    {[
                                        "Buying checklists",
                                        "Procurement templates",
                                        "IT planning guides",
                                        "Technology checklists",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-blue-300" />
                                            {item}
                                        </div>
                                    ))}

                                </div>

                            </div>

                            <div className="relative">

                                <div className="absolute -inset-6 rounded-full bg-blue-500/20 blur-3xl" />

                                <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15">
                                            <FileText className="h-7 w-7 text-blue-300" />
                                        </div>

                                        <div>
                                            <p className="font-black text-white">
                                                Technology Buying Guide
                                            </p>

                                            <p className="mt-1 text-sm text-slate-400">
                                                Free resource
                                            </p>
                                        </div>

                                    </div>

                                    <div className="mt-6 space-y-3">

                                        {[
                                            "Requirements checklist",
                                            "Budget planning",
                                            "Vendor evaluation",
                                            "Deployment considerations",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3"
                                            >
                                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                                                <span className="text-sm text-slate-300">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}

                                    </div>

                                    <button
                                        type="button"
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-black text-slate-950 transition hover:bg-blue-50"
                                    >
                                        <Download className="h-4 w-4" />
                                        Explore free downloads
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                NEWSLETTER
            ========================================================= */}

            <section
                id="newsletter"
                className="scroll-mt-20 border-t border-slate-200 bg-slate-100 py-16 dark:border-white/10 dark:bg-slate-900/60 lg:py-24"
            >

                <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                        <Mail className="h-7 w-7" />
                    </div>

                    <div className="mt-7">

                        <div className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Stay informed
                        </div>

                        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                            Get useful technology insights.
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Receive practical articles, new resources,
                            technology guides and occasional updates from
                            AB TECHNOLOGIES.
                        </p>

                    </div>

                    {subscribed ? (
                        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">

                            <div className="flex items-center justify-center gap-2 font-bold">
                                <CheckCircle2 className="h-5 w-5" />
                                You're on the list.
                            </div>

                            <p className="mt-1 text-sm">
                                Thanks for subscribing to AB technology insights.
                            </p>

                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubscribe}
                            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
                        >

                            <div className="relative flex-1">

                                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Your email address"
                                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-5 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                                />

                            </div>

                            <button
                                type="submit"
                                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 font-black text-white transition hover:bg-blue-700"
                            >
                                Subscribe
                                <Send className="h-4 w-4" />
                            </button>

                        </form>
                    )}

                    <p className="mt-4 text-xs text-slate-400">
                        No unnecessary noise. Just useful information.
                    </p>

                </div>

            </section>

            {/* =========================================================
                BUSINESS CTA
            ========================================================= */}

            <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-violet-50 p-8 dark:border-blue-400/20 dark:from-blue-500/10 dark:via-slate-900 dark:to-violet-500/10 sm:p-12 lg:p-16">

                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

                            <div>

                                <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    <Globe2 className="h-4 w-4" />
                                    Need help beyond the articles?
                                </div>

                                <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                                    Turn technology decisions into practical
                                    business solutions.
                                </h2>

                                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Whether you need hardware procurement,
                                    software development, infrastructure,
                                    cybersecurity, AI automation or managed IT,
                                    our team can help you move from idea to
                                    implementation.
                                </p>

                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start a technology project with AB TECHNOLOGIES.",
                                            {
                                                Intent: "Start project",
                                                Context: "Blog & Insights",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Start a project
                                    <ArrowRight className="h-5 w-5" />
                                </button>

                                <a
                                    href="/services"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400"
                                >
                                    Explore solutions
                                    <ArrowUpRight className="h-5 w-5" />
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                ARTICLE MODAL
            ========================================================= */}

            {selectedArticle && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedArticle(null);
                        }
                    }}
                >

                    <div className="relative my-8 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">

                        <div
                            className={`relative h-56 bg-gradient-to-br ${selectedArticle.gradient} p-7 sm:h-64 sm:p-10`}
                        >

                            <button
                                type="button"
                                onClick={() => setSelectedArticle(null)}
                                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-black/20 text-white backdrop-blur transition hover:bg-black/30"
                                aria-label="Close article"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex h-full flex-col justify-between">

                                <div className="flex items-center justify-between">

                                    <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                                        {selectedArticle.category}
                                    </span>

                                    {React.createElement(
                                        selectedArticle.icon,
                                        {
                                            className:
                                                "h-10 w-10 text-white/80",
                                        }
                                    )}

                                </div>

                                <h2 className="max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl">
                                    {selectedArticle.title}
                                </h2>

                            </div>

                        </div>

                        <div className="p-7 sm:p-10">

                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">

                                <span className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4" />
                                    {selectedArticle.date}
                                </span>

                                <span className="flex items-center gap-2">
                                    <Clock3 className="h-4 w-4" />
                                    {selectedArticle.readTime}
                                </span>

                                <span className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {selectedArticle.author}
                                </span>

                            </div>

                            <div className="mt-8 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">

                                <p className="text-lg font-semibold leading-8 text-slate-800 dark:text-slate-100">
                                    {selectedArticle.excerpt}
                                </p>

                                <p>
                                    Technology decisions become easier when
                                    organizations start with the problem,
                                    understand the requirements and then select
                                    the appropriate solution. The goal is not to
                                    purchase the most complicated system. The goal
                                    is to create measurable value.
                                </p>

                                <p>
                                    A strong technology strategy considers people,
                                    processes, infrastructure, security, budget,
                                    scalability and long-term support. These
                                    elements should work together instead of being
                                    treated as isolated purchases.
                                </p>

                                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-400/20 dark:bg-blue-500/10">

                                    <div className="flex items-start gap-3">

                                        <Sparkles className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <div>

                                            <p className="font-black text-slate-900 dark:text-white">
                                                Practical takeaway
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                Define the outcome first. Then
                                                choose the technology that can
                                                deliver it reliably.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <p>
                                    Organizations can also reduce risk by
                                    evaluating vendors carefully, documenting
                                    requirements, planning implementation and
                                    establishing support before deployment.
                                    Technology should remain maintainable after
                                    the initial project is complete.
                                </p>

                            </div>

                            <div className="mt-8 flex flex-wrap gap-2">

                                {selectedArticle.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300"
                                    >
                                        #{tag.replace(/\s+/g, "")}
                                    </span>
                                ))}

                            </div>

                            <div className="mt-9 flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row dark:border-white/10">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the insight "${selectedArticle.title}" and how it applies to our organization.`,
                                            {
                                                Intent: "Article discussion",
                                                Article: selectedArticle.title,
                                                Category: selectedArticle.category,
                                            }
                                        )
                                    }
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-black text-white transition hover:bg-blue-700"
                                >
                                    Discuss this with us
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedArticle(null)}
                                    className="rounded-xl border border-slate-300 px-5 py-3.5 font-bold text-slate-700 dark:border-white/10 dark:text-white"
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}

export default Blog;