import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Cloud,
    Code2,
    Database,
    Download,
    ExternalLink,
    FileArchive,
    FileImage,
    FileText,
    Globe2,
    Layers3,
    Laptop,
    Lock,
    Monitor,
    Package,
    Search,
    Server,
    Settings2,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Terminal,
    Workflow,
    Wrench,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function SoftwareApplications() {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [showQuotePanel, setShowQuotePanel] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);

    /* ============================================================
       SUPPORT REQUEST HELPER
       ============================================================ */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss software and applications for my organization.",
            metadata: metadata || {
                Source: "Software & Applications",
            },
        });

        navigate("/support/ai");
    };

    const categories = [
        "All",
        "Business Software",
        "Productivity",
        "Security",
        "Development",
        "Education",
        "Utilities",
        "Cloud",
        "Custom Applications",
    ];

    const products = [
        {
            id: 1,
            name: "AB Document Converter",
            category: "Utilities",
            type: "AB Software",
            description:
                "A practical document conversion utility for transforming files between commonly used business formats.",
            status: "Available",
            icon: FileText,
            badge: "Popular",
            features: [
                "Document conversion",
                "Batch processing",
                "Simple workflow",
                "Business-friendly interface",
            ],
        },
        {
            id: 2,
            name: "AB PDF Tools",
            category: "Utilities",
            type: "AB Software",
            description:
                "A collection of practical PDF utilities for everyday document management, organization and conversion.",
            status: "Available",
            icon: FileText,
            badge: "Utility",
            features: [
                "PDF conversion",
                "PDF organization",
                "Document workflows",
                "Business productivity",
            ],
        },
        {
            id: 3,
            name: "AB Image Converter",
            category: "Utilities",
            type: "AB Software",
            description:
                "Convert and prepare images for websites, documents, digital campaigns and internal business workflows.",
            status: "Available",
            icon: FileImage,
            badge: "Utility",
            features: [
                "Image conversion",
                "Format management",
                "Batch workflows",
                "Web-ready assets",
            ],
        },
        {
            id: 4,
            name: "AB Archive Manager",
            category: "Utilities",
            type: "AB Software",
            description:
                "A lightweight utility concept for working with compressed archives and common file packaging workflows.",
            status: "Planned",
            icon: FileArchive,
            badge: "Coming Soon",
            features: [
                "Archive management",
                "File packaging",
                "Extraction workflows",
                "Business file organization",
            ],
        },
        {
            id: 5,
            name: "Business Management Suite",
            category: "Business Software",
            type: "SaaS / Custom",
            description:
                "Business-focused software systems for managing operations, customers, inventory, staff, records and reporting.",
            status: "Custom",
            icon: Layers3,
            badge: "Enterprise",
            features: [
                "Business operations",
                "User management",
                "Reports",
                "Workflow automation",
            ],
        },
        {
            id: 6,
            name: "Inventory & Procurement System",
            category: "Business Software",
            type: "Custom Application",
            description:
                "Track inventory, suppliers, procurement requests, purchase orders, stock movements and approvals.",
            status: "Custom",
            icon: Package,
            badge: "Custom",
            features: [
                "Inventory tracking",
                "Supplier management",
                "Purchase orders",
                "Approval workflows",
            ],
        },
        {
            id: 7,
            name: "Learning Management Platform",
            category: "Education",
            type: "Custom Application",
            description:
                "A flexible learning platform for schools, training providers, organizations and professional education.",
            status: "Custom",
            icon: Laptop,
            badge: "Education",
            features: [
                "Courses",
                "Student management",
                "Assessments",
                "Progress tracking",
            ],
        },
        {
            id: 8,
            name: "Customer Portal",
            category: "Business Software",
            type: "Custom Application",
            description:
                "Secure customer-facing portals for documents, requests, support, invoices, projects and communication.",
            status: "Custom",
            icon: Globe2,
            badge: "Portal",
            features: [
                "Customer accounts",
                "Secure documents",
                "Request management",
                "Notifications",
            ],
        },
        {
            id: 9,
            name: "Workflow Automation Platform",
            category: "Cloud",
            type: "Automation",
            description:
                "Connect business processes and automate repetitive tasks across systems, teams and applications.",
            status: "Custom",
            icon: Workflow,
            badge: "Automation",
            features: [
                "Process automation",
                "API integrations",
                "Notifications",
                "Scheduled tasks",
            ],
        },
        {
            id: 10,
            name: "Security Management Tools",
            category: "Security",
            type: "Business Security",
            description:
                "Software solutions supporting access management, monitoring, security workflows and organizational controls.",
            status: "Custom",
            icon: ShieldCheck,
            badge: "Security",
            features: [
                "Access control",
                "Monitoring",
                "Security workflows",
                "Audit support",
            ],
        },
        {
            id: 11,
            name: "Developer Tools & APIs",
            category: "Development",
            type: "Development Services",
            description:
                "Developer-focused applications, APIs and internal tools designed around specific technical workflows.",
            status: "Custom",
            icon: Terminal,
            badge: "Developers",
            features: [
                "REST APIs",
                "Backend systems",
                "Developer utilities",
                "Integrations",
            ],
        },
        {
            id: 12,
            name: "Cloud Business Applications",
            category: "Cloud",
            type: "Cloud Software",
            description:
                "Cloud-hosted applications that allow teams to access business systems securely from supported devices.",
            status: "Custom",
            icon: Cloud,
            badge: "Cloud",
            features: [
                "Cloud deployment",
                "Remote access",
                "Backups",
                "Scalable infrastructure",
            ],
        },
    ];

    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();

        return products.filter((product) => {
            const categoryMatch =
                activeCategory === "All" ||
                product.category === activeCategory;

            const searchMatch =
                !term ||
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term) ||
                product.type.toLowerCase().includes(term);

            return categoryMatch && searchMatch;
        });
    }, [activeCategory, searchTerm]);

    const displayedProducts = showAllProducts
        ? filteredProducts
        : filteredProducts.slice(0, 8);

    const services = [
        {
            icon: ShoppingCart,
            title: "Software Procurement",
            text:
                "We help organizations identify, source and procure the software products and subscriptions they actually need.",
        },
        {
            icon: Code2,
            title: "Custom Applications",
            text:
                "When an off-the-shelf product does not fit, we design and develop software around your actual business process.",
        },
        {
            icon: Cloud,
            title: "SaaS & Cloud",
            text:
                "Deploy cloud-based applications and subscription platforms with the infrastructure and operational support around them.",
        },
        {
            icon: Settings2,
            title: "Implementation",
            text:
                "Software procurement is only part of the job. We can help configure, deploy and integrate the solution.",
        },
        {
            icon: Wrench,
            title: "Support & Maintenance",
            text:
                "Keep business applications reliable with maintenance, troubleshooting, updates and ongoing technical support.",
        },
        {
            icon: Workflow,
            title: "Integration & Automation",
            text:
                "Connect applications and automate repetitive processes so your team can spend less time moving information manually.",
        },
    ];

    const capabilities = [
        "Software discovery",
        "Requirements analysis",
        "License planning",
        "Subscription procurement",
        "SaaS implementation",
        "Custom web applications",
        "Internal business systems",
        "Customer portals",
        "Admin dashboards",
        "API development",
        "Third-party integrations",
        "Database systems",
        "Cloud deployment",
        "Application hosting",
        "Software migration",
        "Data migration",
        "System configuration",
        "User onboarding",
        "Technical documentation",
        "Application support",
        "Security hardening",
        "Backup planning",
        "Monitoring",
        "Performance optimization",
    ];

    const faqs = [
        {
            question: "Can you provide software that you did not develop?",
            answer:
                "Yes. We can help identify and procure suitable third-party software where it makes sense. Our role is not limited to software we build ourselves.",
        },
        {
            question: "Can you build software from scratch?",
            answer:
                "Yes. We can take a project from an initial idea or business problem through requirements, UX, development, testing, deployment and ongoing support.",
        },
        {
            question: "Can you work with an existing application?",
            answer:
                "Yes. We can help with deployment, configuration, integration, troubleshooting, migration, optimization and ongoing maintenance of existing systems.",
        },
        {
            question: "Do you offer subscription software?",
            answer:
                "Yes. Our software marketplace can include subscription-based applications, business tools, utilities and platforms. Availability depends on the specific product.",
        },
        {
            question: "Can you develop a private internal application?",
            answer:
                "Absolutely. Internal applications can be designed for staff, departments, branches, administrators or management without needing to be public-facing.",
        },
        {
            question: "Can you integrate software with other systems?",
            answer:
                "Yes. Where APIs or other supported integration methods are available, we can connect systems and automate information exchange between them.",
        },
        {
            question: "Can you deploy software on our server?",
            answer:
                "Yes. Depending on the application and infrastructure, we can assist with deployment on cloud infrastructure, VPS environments, dedicated servers or other supported hosting environments.",
        },
        {
            question: "Can small businesses use your software services?",
            answer:
                "Yes. We support projects at different stages. A small business can start with a focused solution and expand as its operational requirements grow.",
        },
    ];

    return (
        <main className="relative overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#050816] dark:text-white">

            {/* ============================================================
                GLOBAL BACKGROUND
            ============================================================ */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-[-12rem] top-[30rem] h-[32rem] w-[32rem] rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/10" />
                <div className="absolute left-[30%] top-[100rem] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />

                <div
                    className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                    }}
                />
            </div>

            {/* ============================================================
                HERO
            ============================================================ */}

            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">

                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">

                        <div>

                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                                <Sparkles className="h-4 w-4" />
                                Software & Applications
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
                                Software that
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-violet-400">
                                    works for your business.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                                From ready-made business software and subscriptions
                                to custom applications built from scratch, we help
                                you find, acquire, deploy, integrate and support the
                                software your organization needs.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not need to know exactly what software you
                                need before contacting us. Tell us what you are
                                trying to accomplish, and we can help translate the
                                requirement into a practical technology solution.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to tell you what software we need. Here's the problem or requirement:",
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Hero — tell us what you need",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Tell Us What You Need
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </button>

                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your software and application offerings.",
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Hero — explore software",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:-translate-y-1 hover:border-blue-400 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                                >
                                    Explore Software
                                    <ChevronRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">

                                {[
                                    ["01", "Discover"],
                                    ["02", "Source"],
                                    ["03", "Deploy"],
                                    ["04", "Support"],
                                ].map(([number, label]) => (
                                    <button
                                        type="button"
                                        key={number}
                                        onClick={() =>
                                            startSupportChat(
                                                `Software lifecycle — I'd like to discuss the "${label}" stage.`,
                                                {
                                                    Source: "Software & Applications",
                                                    Stage: `${number} — ${label}`,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-left backdrop-blur transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                    >
                                        <div className="text-xs font-black text-blue-600 dark:text-blue-400">
                                            {number}
                                        </div>
                                        <div className="mt-1 text-sm font-bold">
                                            {label}
                                        </div>
                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* HERO VISUAL */}

                        <div className="relative">

                            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-violet-500/20 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/30 sm:p-7">

                                <div className="mb-6 flex items-center justify-between">

                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                            Software Market
                                        </div>
                                        <div className="mt-1 text-xl font-black">
                                            Find your next solution
                                        </div>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                        <Code2 className="h-5 w-5" />
                                    </div>

                                </div>

                                <div className="space-y-3">

                                    {[
                                        {
                                            icon: Package,
                                            title: "Business Applications",
                                            text: "Operations, inventory, CRM & workflow",
                                        },
                                        {
                                            icon: Cloud,
                                            title: "Cloud Software",
                                            text: "SaaS, hosting & remote business tools",
                                        },
                                        {
                                            icon: ShieldCheck,
                                            title: "Security Solutions",
                                            text: "Protect accounts, systems & data",
                                        },
                                        {
                                            icon: Code2,
                                            title: "Custom Applications",
                                            text: "Software built around your process",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                type="button"
                                                key={item.title}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to explore: ${item.title} — ${item.text}`,
                                                        {
                                                            Source: "Software & Applications",
                                                            Category: item.title,
                                                        }
                                                    )
                                                }
                                                className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30 dark:hover:bg-blue-500/5"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-300">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="font-bold">
                                                        {item.title}
                                                    </div>

                                                    <div className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                                                        {item.text}
                                                    </div>
                                                </div>

                                                <ChevronRight className="ml-auto h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-500" />
                                            </button>
                                        );
                                    })}

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'm not sure what software we need. I'd like help identifying the right solution.",
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Hero — not sure what you need",
                                            }
                                        )
                                    }
                                    className="mt-5 w-full rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-5 text-left transition hover:border-blue-400/40"
                                >
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                                        <div>
                                            <div className="font-bold">
                                                Not sure what you need?
                                            </div>

                                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                Describe the problem in plain
                                                language and let our team help
                                                identify the right software path.
                                            </p>
                                        </div>
                                    </div>
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================
                TRUST STRIP
            ============================================================ */}

            <section className="relative border-y border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.025]">

                <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">

                    {[
                        ["Software", "Procurement & sourcing"],
                        ["Custom", "Applications"],
                        ["Cloud", "Deployment & hosting"],
                        ["Ongoing", "Support & maintenance"],
                    ].map(([big, small]) => (
                        <button
                            type="button"
                            key={big}
                            onClick={() =>
                                startSupportChat(
                                    `Software services — I'd like to discuss: ${big} (${small}).`,
                                    {
                                        Source: "Software & Applications",
                                        Pillar: big,
                                    }
                                )
                            }
                            className="border-slate-200 px-4 py-3 text-left transition hover:text-blue-700 first:border-0 sm:border-l dark:border-white/10 dark:hover:text-blue-400"
                        >
                            <div className="text-lg font-black sm:text-xl">
                                {big}
                            </div>

                            <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                                {small}
                            </div>
                        </button>
                    ))}

                </div>

            </section>

            {/* ============================================================
                INTRO
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">

                        <div>

                            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                More than software sales
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                We help you move from
                                <span className="text-blue-600 dark:text-blue-400">
                                    {" "}problem to working solution.
                                </span>
                            </h2>

                        </div>

                        <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">

                            <p>
                                Buying software is easy when you already know
                                exactly what you want. The difficult part is
                                knowing what you should buy in the first place.
                            </p>

                            <p>
                                Different businesses have different workflows,
                                budgets, staff structures, security requirements
                                and technical environments. A product that works
                                perfectly for one organization may be completely
                                unsuitable for another.
                            </p>

                            <p>
                                That is why our software service starts with the
                                requirement rather than the product. We understand
                                what you are trying to accomplish, identify
                                possible approaches, compare suitable options and
                                help you move toward implementation.
                            </p>

                            <p>
                                And when the right product does not exist, we can
                                build it.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to move from a problem to a working software solution.",
                                        {
                                            Source: "Software & Applications",
                                            Stage: "Introduction — problem to solution",
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3 dark:text-blue-400"
                            >
                                Discuss your software problem
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                SERVICE CARDS
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What we do
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            A complete software service,
                            <span className="text-slate-500 dark:text-slate-400">
                                {" "}not just a download link.
                            </span>
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            Whether you need one application for a small team or
                            a connected software environment for a larger
                            organization, we can help across the lifecycle.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <button
                                    type="button"
                                    key={service.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the service: ${service.title} — ${service.text}`,
                                            {
                                                Source: "Software & Applications",
                                                Service: service.title,
                                            }
                                        )
                                    }
                                    className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/20"
                                >
                                    <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/15" />

                                    <div className="relative">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="mt-6 text-xl font-black">
                                            {service.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {service.text}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                                            Learn more
                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                        </div>

                                    </div>
                                </button>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* ============================================================
                SOFTWARE MARKET
            ============================================================ */}

            <section
                id="software-market"
                className="relative border-y border-slate-200 bg-white/70 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                        <div className="max-w-3xl">

                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                <ShoppingCart className="h-3.5 w-3.5" />
                                Software Market
                            </div>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Explore software,
                                <span className="text-blue-600 dark:text-blue-400">
                                    {" "}tools & applications.
                                </span>
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Browse examples of the kinds of software,
                                applications and utilities we can provide,
                                develop or help you source.
                            </p>

                        </div>

                        <div className="flex max-w-md items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/5">

                            <Search className="ml-3 h-5 w-5 text-slate-400" />

                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search software..."
                                className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
                            />

                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mr-1 rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}

                        </div>

                    </div>

                    {/* CATEGORY FILTERS */}

                    <div className="mt-10 flex gap-2 overflow-x-auto pb-2">

                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setShowAllProducts(false);
                                    startSupportChat(
                                        `I'd like to browse software in the "${category}" category.`,
                                        {
                                            Source: "Software & Applications",
                                            Category: category,
                                        }
                                    );
                                }}
                                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${activeCategory === category
                                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}

                    </div>

                    {/* PRODUCT GRID */}

                    {displayedProducts.length > 0 ? (
                        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                            {displayedProducts.map((product) => {
                                const Icon = product.icon;

                                return (
                                    <article
                                        key={product.id}
                                        className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-[#0b1020] dark:hover:border-blue-400/20 dark:hover:shadow-black/20"
                                    >

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss the software: ${product.name} — ${product.description}`,
                                                    {
                                                        Source: "Software & Applications",
                                                        Product: product.name,
                                                        Category: product.category,
                                                    }
                                                )
                                            }
                                            className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-violet-50 text-left dark:from-white/[0.04] dark:via-blue-500/[0.06] dark:to-violet-500/[0.07]"
                                        >

                                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />

                                            <div className="absolute left-6 top-6 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
                                                {product.badge}
                                            </div>

                                            <div className="absolute bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-blue-600 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-blue-300">
                                                <Icon className="h-7 w-7" />
                                            </div>

                                        </button>

                                        <div className="flex flex-1 flex-col p-6">

                                            <div className="flex items-center justify-between gap-3">

                                                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                                    {product.category}
                                                </span>

                                                <span className="text-[11px] font-semibold text-slate-400">
                                                    {product.status}
                                                </span>

                                            </div>

                                            <h3 className="mt-3 text-lg font-black">
                                                {product.name}
                                            </h3>

                                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                {product.description}
                                            </p>

                                            <div className="mt-5 space-y-2">

                                                {product.features.slice(0, 3).map((feature) => (
                                                    <button
                                                        type="button"
                                                        key={feature}
                                                        onClick={() =>
                                                            startSupportChat(
                                                                `For "${product.name}", I'd like to discuss: ${feature}.`,
                                                                {
                                                                    Source: "Software & Applications",
                                                                    Product: product.name,
                                                                    Feature: feature,
                                                                }
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 text-left text-xs font-medium text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                                                    >
                                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                                                        {feature}
                                                    </button>
                                                ))}

                                            </div>

                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                                            >
                                                View Details
                                                <ArrowRight className="h-4 w-4" />
                                            </button>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>
                    ) : (
                        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-white/10">

                            <Search className="mx-auto h-8 w-8 text-slate-400" />

                            <h3 className="mt-4 text-xl font-black">
                                No software found
                            </h3>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Try another search or describe the software you
                                need to us directly.
                            </p>

                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveCategory("All");
                                }}
                                className="mt-5 text-sm font-bold text-blue-600 dark:text-blue-400"
                            >
                                Clear filters
                            </button>

                            <div className="mt-5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I couldn't find the software I need in the marketplace. Here's what I'm looking for:`,
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Empty search — describe need",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Describe What You Need
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                        </div>
                    )}

                    {filteredProducts.length > 8 && (
                        <div className="mt-10 text-center">

                            <button
                                onClick={() => setShowAllProducts((value) => !value)}
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                            >
                                {showAllProducts
                                    ? "Show Less"
                                    : `View All ${filteredProducts.length} Solutions`}
                                <ChevronDown
                                    className={`h-4 w-4 transition ${showAllProducts ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                        </div>
                    )}

                </div>

            </section>

            {/* ============================================================
                CUSTOM DEVELOPMENT
            ============================================================ */}

            <section className="relative py-20 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 text-white shadow-2xl dark:border-white/10">

                        <div className="grid lg:grid-cols-2">

                            <div className="p-8 sm:p-12 lg:p-16">

                                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-200">
                                    <Code2 className="h-4 w-4" />
                                    Built from scratch
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                    If the software does not exist,
                                    <span className="block text-blue-300">
                                        we can build it.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-xl leading-8 text-slate-300">
                                    Sometimes the best solution is not another
                                    subscription. It is an application designed
                                    specifically around the way your organization
                                    operates.
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                    {[
                                        "Business portals",
                                        "Admin dashboards",
                                        "Mobile applications",
                                        "Customer platforms",
                                        "Internal systems",
                                        "Workflow applications",
                                        "Inventory systems",
                                        "Education platforms",
                                        "Booking systems",
                                        "Document management",
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Custom development — I'd like to discuss building: ${item}.`,
                                                    {
                                                        Source: "Software & Applications",
                                                        "Custom application": item,
                                                    }
                                                )
                                            }
                                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10"
                                        >
                                            <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                                            {item}
                                        </button>
                                    ))}

                                </div>

                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a custom application built from scratch.",
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Custom dev — discuss application",
                                            }
                                        )
                                    }
                                    className="mt-9 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:bg-blue-100"
                                >
                                    Discuss Your Application
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="relative hidden min-h-[500px] overflow-hidden lg:block">

                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/20" />

                                <div className="absolute left-1/2 top-1/2 w-[430px] -translate-x-1/2 -translate-y-1/2">

                                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">

                                        <div className="flex items-center justify-between border-b border-white/10 pb-4">

                                            <div className="flex items-center gap-2">
                                                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                                            </div>

                                            <div className="text-[10px] font-bold text-white/40">
                                                APPLICATION DASHBOARD
                                            </div>

                                        </div>

                                        <div className="grid grid-cols-3 gap-3 py-5">

                                            {[
                                                ["Users", "2,481"],
                                                ["Requests", "684"],
                                                ["Completed", "92%"],
                                            ].map(([label, value]) => (
                                                <div
                                                    key={label}
                                                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                                                >
                                                    <div className="text-[10px] text-white/40">
                                                        {label}
                                                    </div>
                                                    <div className="mt-2 text-lg font-black">
                                                        {value}
                                                    </div>
                                                </div>
                                            ))}

                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-black/10 p-4">

                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="text-xs font-bold">
                                                    Workflow
                                                </span>

                                                <span className="text-[10px] text-cyan-300">
                                                    ACTIVE
                                                </span>
                                            </div>

                                            <div className="space-y-3">

                                                {[
                                                    "Request submitted",
                                                    "Manager approval",
                                                    "Processing",
                                                    "Completed",
                                                ].map((item, index) => (
                                                    <div
                                                        key={item}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-400/10 text-xs font-black text-blue-300">
                                                            {index + 1}
                                                        </div>

                                                        <div className="h-px flex-1 bg-white/10" />

                                                        <span className="w-36 text-right text-[11px] text-white/60">
                                                            {item}
                                                        </span>
                                                    </div>
                                                ))}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                PROCESS
            ============================================================ */}

            <section className="relative border-y border-slate-200 bg-white/70 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            How we work
                        </div>

                        <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                            From a simple idea to a
                            <span className="text-blue-600 dark:text-blue-400">
                                {" "}working system.
                            </span>
                        </h2>

                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                number: "01",
                                title: "Understand",
                                text: "We learn what you need, who will use it and what outcome you want.",
                            },
                            {
                                number: "02",
                                title: "Recommend",
                                text: "We identify whether procurement, configuration, integration or custom development makes the most sense.",
                            },
                            {
                                number: "03",
                                title: "Implement",
                                text: "We help acquire, configure, build, deploy and connect the required software.",
                            },
                            {
                                number: "04",
                                title: "Support",
                                text: "We remain available for maintenance, troubleshooting, improvements and future expansion.",
                            },
                        ].map((step) => (
                            <button
                                type="button"
                                key={step.number}
                                onClick={() =>
                                    startSupportChat(
                                        `Software process — I'd like to discuss "${step.title}" — ${step.text}`,
                                        {
                                            Source: "Software & Applications",
                                            Step: `${step.number} — ${step.title}`,
                                        }
                                    )
                                }
                                className="relative rounded-[1.5rem] border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <div className="text-5xl font-black text-blue-500/15 dark:text-blue-400/20">
                                    {step.number}
                                </div>

                                <h3 className="mt-5 text-xl font-black">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {step.text}
                                </p>
                            </button>
                        ))}

                    </div>

                </div>

            </section>

            {/* ============================================================
                CAPABILITIES
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">

                        <div>

                            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Capabilities
                            </div>

                            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                                The software lifecycle,
                                <span className="text-slate-500 dark:text-slate-400">
                                    {" "}covered.
                                </span>
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Our role can begin before a product is selected
                                and continue long after deployment.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss the software lifecycle and how you can support it end-to-end.",
                                        {
                                            Source: "Software & Applications",
                                            Stage: "Capabilities — lifecycle",
                                        }
                                    )
                                }
                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3 dark:text-blue-400"
                            >
                                Discuss the software lifecycle
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {capabilities.map((capability) => (
                                <button
                                    type="button"
                                    key={capability}
                                    onClick={() =>
                                        startSupportChat(
                                            `Software capability — I'd like to discuss: ${capability}.`,
                                            {
                                                Source: "Software & Applications",
                                                Capability: capability,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-200 dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                                    {capability}
                                </button>
                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                SOFTWARE TYPES
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Software categories
                        </div>

                        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black sm:text-4xl lg:text-5xl">
                            One technology partner for
                            <span className="text-blue-600 dark:text-blue-400">
                                {" "}different software needs.
                            </span>
                        </h2>

                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {[
                            {
                                icon: Monitor,
                                title: "Business Software",
                                text: "CRM, accounting, HR, inventory, operations, project management and business administration.",
                            },
                            {
                                icon: FileText,
                                title: "Productivity",
                                text: "Office productivity, document tools, collaboration platforms and everyday business utilities.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Security",
                                text: "Endpoint protection, identity, access control, monitoring and security-focused software.",
                            },
                            {
                                icon: Code2,
                                title: "Development",
                                text: "Developer platforms, APIs, internal tools, testing environments and engineering utilities.",
                            },
                            {
                                icon: GraduationCapIcon,
                                title: "Education",
                                text: "Learning management, student systems, training platforms, assessments and digital classrooms.",
                            },
                            {
                                icon: Cloud,
                                title: "Cloud Applications",
                                text: "SaaS platforms, cloud business applications, hosted systems and remote-access solutions.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Software category — I'd like to discuss ${item.title}: ${item.text}`,
                                            {
                                                Source: "Software & Applications",
                                                "Software category": item.title,
                                            }
                                        )
                                    }
                                    className="group rounded-[1.5rem] border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-blue-600 dark:bg-white/10 dark:text-blue-300">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>

                                </button>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* ============================================================
                PROCUREMENT VS CUSTOM
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10">

                        <div className="grid lg:grid-cols-2">

                            <div className="bg-white p-8 dark:bg-white/[0.035] sm:p-12">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                    <ShoppingCart className="h-6 w-6" />
                                </div>

                                <h2 className="mt-6 text-2xl font-black">
                                    Buy the right software
                                </h2>

                                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                    If an established product already solves the
                                    problem effectively, we help you identify,
                                    source and implement it rather than rebuilding
                                    something unnecessarily.
                                </p>

                                <ul className="mt-7 space-y-3">

                                    {[
                                        "Existing proven solutions",
                                        "Subscription platforms",
                                        "Business productivity tools",
                                        "Industry applications",
                                        "Specialized software",
                                    ].map((item) => (
                                        <li key={item}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Software procurement — I'd like to discuss: ${item}.`,
                                                        {
                                                            Source: "Software & Applications",
                                                            "Procurement": item,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center gap-3 text-left text-sm font-semibold transition hover:text-blue-700 dark:hover:text-blue-400"
                                            >
                                                <Check className="h-4 w-4 shrink-0 text-blue-500" />
                                                {item}
                                            </button>
                                        </li>
                                    ))}

                                </ul>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like help buying the right software for our organization.",
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Buy software",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Discuss Procurement
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="bg-slate-950 p-8 text-white dark:bg-blue-950/30 sm:p-12">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                                    <Code2 className="h-6 w-6" />
                                </div>

                                <h2 className="mt-6 text-2xl font-black">
                                    Build what is unique
                                </h2>

                                <p className="mt-4 leading-7 text-slate-300">
                                    If your workflow is specific, complex or
                                    strategically important, custom software can
                                    provide a better long-term fit.
                                </p>

                                <ul className="mt-7 space-y-3">

                                    {[
                                        "Unique business processes",
                                        "Internal enterprise systems",
                                        "Custom portals",
                                        "Specialized workflows",
                                        "Proprietary business platforms",
                                    ].map((item) => (
                                        <li key={item}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Custom software — I'd like to discuss: ${item}.`,
                                                        {
                                                            Source: "Software & Applications",
                                                            "Custom software": item,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center gap-3 text-left text-sm font-semibold text-slate-200 transition hover:text-cyan-300"
                                            >
                                                <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                                                {item}
                                            </button>
                                        </li>
                                    ))}

                                </ul>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss building a custom software system for our organization.",
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Build custom software",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100"
                                >
                                    Discuss Custom Development
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                FREE SOFTWARE
            ============================================================ */}

            <section className="relative border-y border-slate-200 bg-white/70 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                                <Download className="h-3.5 w-3.5" />
                                Free Downloads
                            </div>

                            <h2 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">
                                Useful software should be
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    {" "}easy to discover.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-xl leading-8 text-slate-600 dark:text-slate-300">
                                We can maintain a growing library of useful free
                                utilities, resources and software tools alongside
                                our commercial products and custom solutions.
                            </p>

                            <div className="mt-8 space-y-3">

                                {[
                                    "PDF and document utilities",
                                    "Image conversion tools",
                                    "File utilities",
                                    "Business calculators",
                                    "Productivity tools",
                                    "Developer utilities",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Free software — I'd like to explore: ${item}.`,
                                                {
                                                    Source: "Software & Applications",
                                                    "Free software": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 text-left text-sm font-semibold transition hover:text-emerald-700 dark:hover:text-emerald-400"
                                    >
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                                        {item}
                                    </button>
                                ))}

                            </div>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    icon: FileText,
                                    title: "PDF Tools",
                                    text: "Practical document utilities.",
                                },
                                {
                                    icon: FileImage,
                                    title: "Image Tools",
                                    text: "Convert and prepare images.",
                                },
                                {
                                    icon: FileArchive,
                                    title: "File Tools",
                                    text: "Work with common file formats.",
                                },
                                {
                                    icon: Terminal,
                                    title: "Developer Tools",
                                    text: "Utilities for technical workflows.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Free software category — I'd like to explore ${item.title}: ${item.text}`,
                                                {
                                                    Source: "Software & Applications",
                                                    "Free software category": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-emerald-400/30"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>

                                        <div className="mt-5 inline-flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400">
                                            Explore
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </div>
                                    </button>
                                );
                            })}

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                INTEGRATIONS
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2">

                        <div>

                            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Connected systems
                            </div>

                            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                                Your applications should
                                <span className="text-blue-600 dark:text-blue-400">
                                    {" "}work together.
                                </span>
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Businesses often use several applications at the
                                same time. We can help create the connections
                                between them so information can move where it
                                needs to go.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "API integrations",
                                    "Database connections",
                                    "Automated notifications",
                                    "Data synchronization",
                                    "Third-party services",
                                    "Internal application connections",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Software integration — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Software & Applications",
                                                    Integration: item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 text-left transition hover:opacity-80"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                            <Check className="h-4 w-4" />
                                        </div>

                                        <span className="text-sm font-bold">
                                            {item}
                                        </span>
                                    </button>
                                ))}

                            </div>

                        </div>

                        <div className="relative">

                            <div className="absolute inset-0 rounded-[2rem] bg-blue-500/5 blur-2xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Integration map
                                        </div>
                                        <div className="mt-1 font-black">
                                            Connected workflow
                                        </div>
                                    </div>

                                    <Zap className="h-5 w-5 text-blue-500" />

                                </div>

                                <div className="relative mt-8 space-y-5">

                                    {[
                                        {
                                            icon: Laptop,
                                            name: "Customer Portal",
                                        },
                                        {
                                            icon: Database,
                                            name: "Business Database",
                                        },
                                        {
                                            icon: Cloud,
                                            name: "Cloud Platform",
                                        },
                                        {
                                            icon: Workflow,
                                            name: "Automation Layer",
                                        },
                                    ].map((item, index) => {
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                type="button"
                                                key={item.name}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Integration map — I'd like to discuss the ${item.name} node.`,
                                                        {
                                                            Source: "Software & Applications",
                                                            "Integration node": item.name,
                                                        }
                                                    )
                                                }
                                                className="relative flex w-full items-center gap-4 text-left transition hover:opacity-90"
                                            >

                                                {index < 3 && (
                                                    <div className="absolute left-6 top-12 h-8 w-px bg-gradient-to-b from-blue-400 to-transparent" />
                                                )}

                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <div className="font-bold">
                                                        {item.name}
                                                    </div>

                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        Connected workflow node
                                                    </div>
                                                </div>

                                                {index < 3 && (
                                                    <div className="ml-auto text-[10px] font-black uppercase tracking-wider text-emerald-500">
                                                        Connected
                                                    </div>
                                                )}

                                            </button>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                ENTERPRISE
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-blue-50 p-8 dark:border-white/10 dark:from-white/[0.04] dark:via-white/[0.02] dark:to-blue-500/[0.06] sm:p-12 lg:p-16">

                        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">

                            <div>

                                <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    For organizations
                                </div>

                                <h2 className="mt-4 max-w-3xl text-3xl font-black sm:text-4xl">
                                    Software for teams,
                                    departments and entire
                                    <span className="text-blue-600 dark:text-blue-400">
                                        {" "}organizations.
                                    </span>
                                </h2>

                                <p className="mt-5 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
                                    We can support organizations that need more
                                    than individual software licenses — including
                                    multi-user applications, role-based access,
                                    internal systems, branch operations,
                                    dashboards and connected workflows.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss enterprise software for teams, departments and branches.",
                                            {
                                                Source: "Software & Applications",
                                                Stage: "Enterprise CTA",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Discuss Enterprise Software
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">

                                {[
                                    ["Teams", "Multi-user"],
                                    ["Roles", "Access control"],
                                    ["Branches", "Centralized"],
                                    ["Growth", "Scalable"],
                                ].map(([title, text]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Enterprise software — ${title}: ${text}.`,
                                                {
                                                    Source: "Software & Applications",
                                                    "Enterprise area": title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-400/30"
                                    >
                                        <div className="text-lg font-black">
                                            {title}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            {text}
                                        </div>
                                    </button>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                SECURITY
            ============================================================ */}

            <section className="relative border-y border-slate-200 bg-white/70 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-2">

                        <div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                                <Lock className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                                Software should fit into your
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    {" "}security environment.
                                </span>
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                We consider access, accounts, data, deployment,
                                backups and operational requirements when helping
                                organizations implement software.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss software security — access, accounts, deployment and data protection.",
                                        {
                                            Source: "Software & Applications",
                                            Stage: "Security CTA",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-white/15 dark:text-white dark:hover:border-emerald-400"
                            >
                                Discuss Software Security
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                "User access",
                                "Role permissions",
                                "Authentication",
                                "Secure deployment",
                                "Data protection",
                                "Backup strategy",
                                "System updates",
                                "Monitoring",
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `Software security — I'd like to discuss: ${item}.`,
                                            {
                                                Source: "Software & Applications",
                                                "Security area": item,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-bold transition hover:border-emerald-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-emerald-400/30"
                                >
                                    <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
                                    {item}
                                </button>
                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* ============================================================
                WHY AB
            ============================================================ */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Why AB Technologies
                        </div>

                        <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
                            One place to move from
                            <span className="text-blue-600 dark:text-blue-400">
                                {" "}idea to implementation.
                            </span>
                        </h2>

                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {[
                            {
                                title: "Start from the beginning",
                                text: "You can come to us with an idea, a problem or simply a requirement. You do not need to arrive with a technical specification.",
                            },
                            {
                                title: "Practical recommendations",
                                text: "We focus on what your organization actually needs instead of forcing every requirement into the same product.",
                            },
                            {
                                title: "Procurement + development",
                                text: "We can source an existing product when appropriate and develop a custom system when that makes more sense.",
                            },
                            {
                                title: "Technology continuity",
                                text: "Your software can be considered alongside your hardware, networking, cloud and IT environment.",
                            },
                            {
                                title: "Built for growth",
                                text: "Solutions can be designed with future users, features, integrations and operational growth in mind.",
                            },
                            {
                                title: "Ongoing relationship",
                                text: "Our involvement does not have to end when software is delivered. We can remain available for support and improvements.",
                            },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `Why AB Technologies — I'd like to discuss: ${item.title} — ${item.text}`,
                                        {
                                            Source: "Software & Applications",
                                            "Why AB": item.title,
                                        }
                                    )
                                }
                                className="rounded-[1.5rem] border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                    <Check className="h-5 w-5" />
                                </div>

                                <h3 className="mt-5 text-lg font-black">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.text}
                                </p>

                            </button>
                        ))}

                    </div>

                </div>

            </section>

            {/* ============================================================
                FAQ
            ============================================================ */}

            <section className="relative border-y border-slate-200 bg-white/70 py-20 dark:border-white/10 dark:bg-white/[0.02] lg:py-28">

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </div>

                        <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                            Software questions,
                            <span className="text-blue-600 dark:text-blue-400">
                                {" "}answered.
                            </span>
                        </h2>

                    </div>

                    <div className="mt-12 space-y-3">

                        {faqs.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]"
                                >

                                    <button
                                        onClick={() =>
                                            setOpenFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {open && (
                                        <div className="border-t border-slate-200 px-6 py-5 dark:border-white/10">
                                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source: "Software & Applications",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                            >
                                                Discuss this with AB AI
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
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

            <section className="relative overflow-hidden py-20 lg:py-32">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800" />

                <div className="absolute inset-0 opacity-20">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    />
                </div>

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur">
                        <Sparkles className="h-8 w-8" />
                    </div>

                    <h2 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Tell us what you need.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                        Whether you need one software subscription, a complete
                        business platform, a free utility, or a custom
                        application built from scratch, start with the
                        requirement. We will help you figure out the next step.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a software solution. Here's what we need:",
                                    {
                                        Source: "Software & Applications",
                                        Stage: "Final CTA — request solution",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:bg-blue-50"
                        >
                            Request a Software Solution
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to browse your software offerings before requesting a solution.",
                                    {
                                        Source: "Software & Applications",
                                        Stage: "Final CTA — browse software",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                        >
                            Browse Software
                            <ChevronRight className="h-4 w-4" />
                        </button>

                    </div>

                </div>

            </section>

            {/* ============================================================
                PRODUCT MODAL
            ============================================================ */}

            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-md">

                    <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0b1020]">

                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-violet-500/10 p-8">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg dark:bg-white/10 dark:text-blue-300">
                                <selectedProduct.icon className="h-7 w-7" />
                            </div>

                            <div className="mt-6 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                {selectedProduct.category}
                            </div>

                            <h2 className="mt-2 pr-12 text-3xl font-black">
                                {selectedProduct.name}
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                                {selectedProduct.description}
                            </p>

                        </div>

                        <div className="p-8">

                            <h3 className="text-lg font-black">
                                Key capabilities
                            </h3>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">

                                {selectedProduct.features.map((feature) => (
                                    <button
                                        type="button"
                                        key={feature}
                                        onClick={() =>
                                            startSupportChat(
                                                `For "${selectedProduct.name}", I'd like to discuss: ${feature}.`,
                                                {
                                                    Source: "Software & Applications",
                                                    Product: selectedProduct.name,
                                                    Feature: feature,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left text-sm font-semibold transition hover:border-blue-300 dark:border-white/10 dark:hover:border-blue-400/30"
                                    >
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-500" />
                                        {feature}
                                    </button>
                                ))}

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss adapting "${selectedProduct.name}" or a similar solution.`,
                                        {
                                            Source: "Software & Applications",
                                            Product: selectedProduct.name,
                                            Stage: "Product modal — need similar",
                                        }
                                    )
                                }
                                className="mt-8 w-full rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-left transition hover:border-blue-400/40 dark:bg-blue-500/[0.07]"
                            >

                                <div className="flex items-start gap-3">

                                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                                    <div>
                                        <div className="font-bold">
                                            Need something similar?
                                        </div>

                                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            We can discuss adapting an existing
                                            solution or creating a custom
                                            application around your requirements.
                                        </p>
                                    </div>

                                </div>

                            </button>

                            <button
                                onClick={() => {
                                    setSelectedProduct(null);
                                    startSupportChat(
                                        `I'd like to request this solution: "${selectedProduct.name}" (${selectedProduct.category}).`,
                                        {
                                            Source: "Software & Applications",
                                            Product: selectedProduct.name,
                                            Stage: "Product modal — request solution",
                                        }
                                    );
                                }}
                                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                            >
                                Request This Solution
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* ============================================================
                QUOTE PANEL
            ============================================================ */}

            {showQuotePanel && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-md">

                    <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0b1020]">

                        <button
                            onClick={() => setShowQuotePanel(false)}
                            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-7 sm:p-9">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                <Sparkles className="h-6 w-6" />
                            </div>

                            <h2 className="mt-5 text-3xl font-black">
                                Tell us what you need
                            </h2>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                You do not need to know the exact product.
                                Describe the problem, requirement or outcome
                                you want and our team can help determine the
                                appropriate software path.
                            </p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const formData = new FormData(e.target);
                                    const need = formData.get("need");
                                    const organization = formData.get("organization");
                                    const email = formData.get("email");
                                    const preferred = formData.get("preferred");

                                    setShowQuotePanel(false);

                                    startSupportChat(
                                        `Software requirement — ${need}`,
                                        {
                                            Source: "Software & Applications",
                                            Organization: organization,
                                            Email: email,
                                            "Preferred solution": preferred,
                                            Stage: "Quote panel — submit requirement",
                                        }
                                    );
                                }}
                                className="mt-8 space-y-5"
                            >

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        What do you need?
                                    </label>

                                    <textarea
                                        required
                                        name="need"
                                        rows={5}
                                        placeholder="Example: We need software to manage our employees, inventory and customer records..."
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5"
                                    />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">

                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            Organization
                                        </label>

                                        <input
                                            required
                                            name="organization"
                                            type="text"
                                            placeholder="Company / organization"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            Email
                                        </label>

                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5"
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        Preferred solution
                                    </label>

                                    <select
                                        name="preferred"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5"
                                    >
                                        <option>Not sure — help me decide</option>
                                        <option>Existing software</option>
                                        <option>Custom application</option>
                                        <option>SaaS / subscription</option>
                                        <option>Free software / utility</option>
                                        <option>Software integration</option>
                                        <option>Software deployment</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Submit Requirement
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </form>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}

/*
|--------------------------------------------------------------------------
| Small local icon component
|--------------------------------------------------------------------------
|
| Kept here so this page remains self-contained.
|
*/

function GraduationCapIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 10 12 5 2 10l10 5 10-5Z" />
            <path d="M6 12v5c3 2 9 2 12 0v-5" />
            <path d="M22 10v6" />
        </svg>
    );
}