import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock3,
    Cloud,
    Code2,
    Cpu,
    Database,
    Globe2,
    Headphones,
    Layers3,
    LockKeyhole,
    Mail,
    MessageSquare,
    Monitor,
    Package,
    Rocket,
    Server,
    Settings2,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Target,
    Users,
    Workflow,
    Zap,
    Building2,
    BarChart3,
    Boxes,
    BriefcaseBusiness,
    CircleDollarSign,
    FileCheck2,
    Laptop,
    Network,
    RefreshCw,
    Search,
    Send,
    SlidersHorizontal,
    Smartphone,
    Terminal,
    Truck,
    UserCheck,
    WandSparkles,
    X,
} from "lucide-react";

export default function StartupsGrowingBusinesses() {
    const navigate = useNavigate();
    const [activeFaq, setActiveFaq] = useState(null);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss technology for my startup or growing business.",
            metadata: {
                Source: "Startups & Growing Businesses",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };
    const [activeStage, setActiveStage] = useState("idea");
    const [activeTab, setActiveTab] = useState("technology");

    const stages = [
        {
            id: "idea",
            number: "01",
            title: "Idea & Validation",
            short: "From concept to something people can actually use.",
            description:
                "You do not need to have everything figured out before approaching us. We can help turn an idea, business problem or opportunity into a practical technology roadmap.",
            icon: Sparkles,
            items: [
                "Business and technology discovery",
                "Product concept definition",
                "MVP planning",
                "Feature prioritization",
                "Technology stack selection",
                "Technical feasibility assessment",
                "Initial architecture planning",
                "Budget-conscious implementation planning",
            ],
        },
        {
            id: "launch",
            number: "02",
            title: "Build & Launch",
            short: "Build the systems your business needs to start operating.",
            description:
                "Whether you need a website, web application, internal system, customer portal, mobile application or business management platform, we can help take the project from plan to deployment.",
            icon: Rocket,
            items: [
                "Web application development",
                "Business websites",
                "Customer portals",
                "Admin dashboards",
                "Mobile applications",
                "API development",
                "Database systems",
                "Cloud deployment",
            ],
        },
        {
            id: "growth",
            number: "03",
            title: "Growth & Scale",
            short: "Move beyond surviving and build infrastructure for growth.",
            description:
                "As your organization grows, technology requirements change. We help improve reliability, performance, security, collaboration and operational efficiency.",
            icon: BarChart3,
            items: [
                "System optimization",
                "Cloud infrastructure",
                "Business automation",
                "Workflow integration",
                "Security improvements",
                "Employee technology",
                "Network infrastructure",
                "Technology procurement",
            ],
        },
        {
            id: "managed",
            number: "04",
            title: "Managed Technology",
            short: "Keep everything running while you focus on the business.",
            description:
                "Technology should support your business rather than become another full-time problem. We can provide ongoing support, maintenance, monitoring and technology management.",
            icon: Settings2,
            items: [
                "Managed IT support",
                "Infrastructure monitoring",
                "Application maintenance",
                "Cloud administration",
                "Security monitoring",
                "Device management",
                "Backup management",
                "Technical assistance",
            ],
        },
    ];

    const services = [
        {
            icon: Globe2,
            title: "Business Websites",
            description:
                "Professional websites designed to establish credibility, communicate your offering and convert visitors into customers.",
            points: [
                "Corporate websites",
                "Landing pages",
                "Marketing websites",
                "Service websites",
                "Content-managed websites",
                "Conversion-focused pages",
            ],
        },
        {
            icon: Code2,
            title: "Custom Software",
            description:
                "Purpose-built software for business processes that standard off-the-shelf applications cannot handle effectively.",
            points: [
                "Web applications",
                "Business platforms",
                "Customer portals",
                "Internal systems",
                "Dashboards",
                "API platforms",
            ],
        },
        {
            icon: Smartphone,
            title: "Mobile Applications",
            description:
                "Mobile experiences for customers, employees, field teams and business operations.",
            points: [
                "iOS applications",
                "Android applications",
                "Cross-platform apps",
                "Customer apps",
                "Staff applications",
                "Operational applications",
            ],
        },
        {
            icon: Workflow,
            title: "Automation",
            description:
                "Reduce repetitive work by connecting systems and automating workflows across your organization.",
            points: [
                "Workflow automation",
                "Notifications",
                "Data synchronization",
                "Document workflows",
                "Approval processes",
                "Scheduled processes",
            ],
        },
        {
            icon: Cloud,
            title: "Cloud Infrastructure",
            description:
                "Deploy and manage dependable cloud environments that can grow with your organization.",
            points: [
                "Cloud servers",
                "Application hosting",
                "Database hosting",
                "Cloud migration",
                "Backups",
                "Infrastructure management",
            ],
        },
        {
            icon: ShieldCheck,
            title: "Security",
            description:
                "Practical security measures designed to protect your systems, data, accounts and operations.",
            points: [
                "Access controls",
                "Security hardening",
                "Account protection",
                "Backups",
                "Monitoring",
                "Security reviews",
            ],
        },
        {
            icon: Package,
            title: "Technology Procurement",
            description:
                "Source the computers, networking equipment, software and technology your growing team needs.",
            points: [
                "Laptops",
                "Desktop computers",
                "Servers",
                "Networking equipment",
                "Accessories",
                "Software subscriptions",
            ],
        },
        {
            icon: Headphones,
            title: "Managed IT Support",
            description:
                "Ongoing technical assistance for businesses that need reliable technology without building a large internal IT team.",
            points: [
                "Technical support",
                "Troubleshooting",
                "Device support",
                "Application support",
                "Infrastructure support",
                "Remote assistance",
            ],
        },
    ];

    const capabilities = [
        {
            icon: Target,
            title: "Start With the Problem",
            description:
                "We begin with what your business is trying to achieve, not with a random list of technologies.",
        },
        {
            icon: Layers3,
            title: "Build in Stages",
            description:
                "You do not have to build everything at once. We can structure your technology around your current priorities.",
        },
        {
            icon: CircleDollarSign,
            title: "Respect Your Budget",
            description:
                "We help prioritize the technology that creates the most value instead of encouraging unnecessary spending.",
        },
        {
            icon: RefreshCw,
            title: "Designed to Evolve",
            description:
                "Your systems can be improved as your customers, employees, revenue and operational complexity increase.",
        },
        {
            icon: Users,
            title: "Built Around People",
            description:
                "Technology must be understandable and usable by the people who depend on it every day.",
        },
        {
            icon: ShieldCheck,
            title: "Security From the Start",
            description:
                "Security, access, backups and operational resilience should not be an afterthought.",
        },
    ];

    const technologyAreas = [
        {
            id: "technology",
            label: "Technology",
            icon: Cpu,
            title: "A technology foundation for your next stage",
            description:
                "We help startups and growing businesses establish practical technology foundations without overengineering their environment.",
            items: [
                "Websites and applications",
                "Cloud platforms",
                "Databases",
                "Business systems",
                "Mobile applications",
                "APIs and integrations",
                "Employee devices",
                "Network infrastructure",
            ],
        },
        {
            id: "operations",
            label: "Operations",
            icon: Workflow,
            title: "Turn scattered processes into organized workflows",
            description:
                "Growth creates more tasks, more people, more customers and more information. We help create systems that keep operations organized.",
            items: [
                "Approval workflows",
                "Employee onboarding",
                "Customer onboarding",
                "Internal requests",
                "Document management",
                "Notifications",
                "Reporting",
                "Task automation",
            ],
        },
        {
            id: "data",
            label: "Data",
            icon: Database,
            title: "Make business information easier to manage",
            description:
                "Bring important information into structured systems so teams can find, understand and use it effectively.",
            items: [
                "Business databases",
                "Operational dashboards",
                "Reports",
                "Data integrations",
                "Customer records",
                "Transaction records",
                "Performance information",
                "Data exports",
            ],
        },
        {
            id: "security",
            label: "Security",
            icon: LockKeyhole,
            title: "Protect the business as it becomes more valuable",
            description:
                "Growing organizations become more attractive targets and more dependent on their systems. We help introduce sensible security controls.",
            items: [
                "Account security",
                "Access management",
                "Backups",
                "Infrastructure hardening",
                "Secure deployments",
                "Monitoring",
                "Recovery planning",
                "Security reviews",
            ],
        },
    ];

    const procurementCategories = [
        {
            icon: Laptop,
            title: "Employee Devices",
            items: [
                "Business laptops",
                "Desktop computers",
                "Monitors",
                "Keyboards and mice",
                "Docking stations",
                "Headsets",
            ],
        },
        {
            icon: Network,
            title: "Networking",
            items: [
                "Routers",
                "Switches",
                "Access points",
                "Network accessories",
                "Structured networking",
                "Connectivity equipment",
            ],
        },
        {
            icon: Server,
            title: "Infrastructure",
            items: [
                "Servers",
                "Storage",
                "UPS systems",
                "Racks",
                "Backup equipment",
                "Infrastructure accessories",
            ],
        },
        {
            icon: Boxes,
            title: "Business Technology",
            items: [
                "Printers",
                "Scanners",
                "POS equipment",
                "Meeting equipment",
                "Security devices",
                "Office technology",
            ],
        },
    ];

    const process = [
        {
            number: "01",
            icon: MessageSquare,
            title: "Tell Us What You Are Trying to Achieve",
            description:
                "Start with your business problem, idea, target customer, current system or growth challenge. You do not need to know the technical terminology.",
        },
        {
            number: "02",
            icon: Search,
            title: "We Understand the Environment",
            description:
                "We look at your goals, processes, users, existing technology, constraints and priorities before recommending an approach.",
        },
        {
            number: "03",
            icon: FileCheck2,
            title: "We Recommend a Practical Path",
            description:
                "You receive a clear direction covering the recommended solution, priorities, technology requirements and implementation considerations.",
        },
        {
            number: "04",
            icon: SlidersHorizontal,
            title: "We Scope the Work",
            description:
                "The project is broken into understandable deliverables so you can see what is being built, supplied, configured or supported.",
        },
        {
            number: "05",
            icon: Code2,
            title: "We Build, Source or Configure",
            description:
                "Our team can develop software, source equipment, configure infrastructure, integrate systems or coordinate the required technology work.",
        },
        {
            number: "06",
            icon: Rocket,
            title: "We Deploy",
            description:
                "The solution moves from planning into real operation with deployment, configuration, testing and practical handover.",
        },
        {
            number: "07",
            icon: UserCheck,
            title: "We Help Your Team Adopt It",
            description:
                "Where required, we provide documentation, guidance, training and support so the technology can actually be used effectively.",
        },
        {
            number: "08",
            icon: RefreshCw,
            title: "We Continue Improving It",
            description:
                "As your business changes, we can improve, maintain, expand or modernize the technology instead of starting from zero.",
        },
    ];

    const businessProblems = [
        "Our current process is too manual.",
        "We need a professional website.",
        "We need custom software.",
        "Our employees need computers.",
        "We need better internal systems.",
        "We need a customer portal.",
        "We want to automate repetitive work.",
        "We need cloud hosting.",
        "Our systems are becoming difficult to manage.",
        "We need better backups.",
        "We need stronger security.",
        "We are opening another office.",
        "We need to equip a new team.",
        "We need to integrate several systems.",
        "We need technical support.",
        "We need help deciding what technology to buy.",
        "We are scaling faster than our systems.",
        "We need to replace an old application.",
    ];

    const faq = [
        {
            question: "Do I need to have a technical team before working with AB TECHNOLOGIES?",
            answer:
                "No. That is one of the reasons we exist. You can come to us with a business idea, operational problem, procurement requirement or technology goal without knowing exactly how it should be implemented. We can help translate the requirement into a practical technology plan.",
        },
        {
            question: "Can you work with a startup that is still at the idea stage?",
            answer:
                "Yes. We can help from the earliest stage by understanding the business idea, defining the technology requirements, planning an MVP and identifying what should be built now versus what can wait until later.",
        },
        {
            question: "Do you only build software?",
            answer:
                "No. Our approach is broader. Depending on the requirement, we can help with software, websites, mobile applications, cloud infrastructure, networking, security, employee devices, technology procurement, automation, deployment and ongoing IT support.",
        },
        {
            question: "Can you help us source computers and equipment?",
            answer:
                "Yes. We can help businesses identify, source and coordinate the technology equipment required for their teams and operations, including computers, networking equipment, infrastructure hardware, accessories and related technology requirements.",
        },
        {
            question: "Can we start small?",
            answer:
                "Absolutely. Starting small can often be the most sensible approach. We can identify the highest-priority requirement, implement it properly and create a roadmap for future improvements.",
        },
        {
            question: "Can you work with technology we already have?",
            answer:
                "Yes. We do not assume that everything has to be replaced. Where practical, we can assess your existing systems and determine what can be retained, improved, integrated, secured or gradually replaced.",
        },
        {
            question: "Can you support us after deployment?",
            answer:
                "Yes. Ongoing support can include troubleshooting, application maintenance, infrastructure management, cloud administration, device support, security improvements, monitoring and technology guidance.",
        },
        {
            question: "Can you help us as we grow?",
            answer:
                "Yes. Growth is one of the core reasons for structuring the relationship this way. Your requirements at five employees may be very different from your requirements at fifty or five hundred. We can help evolve the technology alongside the organization.",
        },
    ];

    const activeStageData =
        stages.find((stage) => stage.id === activeStage) || stages[0];

    const activeArea =
        technologyAreas.find((area) => area.id === activeTab) ||
        technologyAreas[0];

    return (
        <main className="min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* =========================================================
                HERO
            ========================================================== */}

            <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-950">

                <div className="absolute inset-0 -z-20">
                    <div className="absolute left-[-12rem] top-[-10rem] h-[35rem] w-[35rem] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                    <div className="absolute right-[-10rem] top-[10rem] h-[32rem] w-[32rem] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />
                    <div className="absolute bottom-[-12rem] left-[30%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />
                </div>

                <div
                    className="absolute inset-0 -z-10 opacity-40 dark:opacity-20"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
                        backgroundSize: "52px 52px",
                    }}
                />

                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">

                        <div>

                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <Rocket className="h-4 w-4" />
                                Startups & Growing Businesses
                            </div>

                            <h1 className="max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                                Build the business.
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
                                    We help build what supports it.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                                From your first idea to your first customer, your
                                first employees, your first office and your next
                                stage of growth, AB TECHNOLOGIES helps you build,
                                source, connect, secure and manage the technology
                                behind your business.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not need to arrive with a technical
                                specification. Bring us the problem, opportunity
                                or goal. We can help you work out what comes next.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss where my startup or growing business is right now and what technology we should prioritize next.",
                                            {
                                                Intent: "Start project",
                                                Stage: activeStageData.title,
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Start From Where You Are
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>

                                <a
                                    href="#services"
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/80 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                                >
                                    Explore What We Do
                                    <ChevronRight className="h-4 w-4" />
                                </a>

                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">

                                {[
                                    ["01", "Discover"],
                                    ["02", "Build"],
                                    ["03", "Deploy"],
                                    ["04", "Scale"],
                                ].map(([number, label]) => (
                                    <div
                                        key={number}
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="text-xs font-black tracking-widest text-blue-600 dark:text-blue-400">
                                            {number}
                                        </div>
                                        <div className="mt-1 text-sm font-bold">
                                            {label}
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* HERO VISUAL */}

                        <div className="relative">

                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">

                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-950">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                                Growth Technology Map
                                            </div>
                                            <div className="mt-1 text-lg font-black">
                                                Your business
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>

                                    </div>

                                    <div className="mt-7 space-y-3">

                                        {[
                                            {
                                                icon: Target,
                                                title: "Business Goal",
                                                text: "What are we trying to achieve?",
                                            },
                                            {
                                                icon: Code2,
                                                title: "Software",
                                                text: "What should be built?",
                                            },
                                            {
                                                icon: Cloud,
                                                title: "Infrastructure",
                                                text: "Where should everything run?",
                                            },
                                            {
                                                icon: ShieldCheck,
                                                title: "Security",
                                                text: "How should it be protected?",
                                            },
                                            {
                                                icon: Users,
                                                title: "People",
                                                text: "Who needs access and support?",
                                            },
                                            {
                                                icon: BarChart3,
                                                title: "Growth",
                                                text: "How does it evolve from here?",
                                            },
                                        ].map((item, index) => {
                                            const Icon = item.icon;

                                            return (
                                                <div
                                                    key={item.title}
                                                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/40"
                                                >
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                        <Icon className="h-5 w-5" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="text-sm font-bold">
                                                            {item.title}
                                                        </div>
                                                        <div className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                                            {item.text}
                                                        </div>
                                                    </div>

                                                    <div className="ml-auto text-xs font-black text-slate-300 dark:text-slate-700">
                                                        0{index + 1}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>

                                </div>

                            </div>

                            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block dark:border-white/10 dark:bg-slate-900">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <Zap className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-slate-400">
                                            Approach
                                        </div>
                                        <div className="text-sm font-black">
                                            Build what matters
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                INTRODUCTION
            ========================================================== */}

            <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28">

                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/5" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">

                        <div>

                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                More Than Development
                            </div>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Your technology should grow with your business.
                            </h2>

                        </div>

                        <div className="max-w-3xl">

                            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                                A growing company rarely needs just one thing.
                                Today you may need a website. Tomorrow you may
                                need employee laptops, a customer portal, cloud
                                hosting, automation, a secure network, business
                                software, integrations and ongoing technical
                                support.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Instead of treating every requirement as an
                                isolated project, we help you think about the
                                larger technology environment around the business.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {[
                                    "Start with your current reality",
                                    "Prioritize what creates value",
                                    "Avoid unnecessary complexity",
                                    "Build for future growth",
                                    "Keep systems connected",
                                    "Support your team after launch",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                BUSINESS JOURNEY
            ========================================================== */}

            <section className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50 py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            From Scratch to Scale
                        </div>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Wherever you are, there is a next step.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            You can engage us at the beginning, in the middle of
                            growth, during a technology transition or when you
                            simply need someone dependable to keep things running.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-3 lg:grid-cols-4">

                        {stages.map((stage) => {
                            const Icon = stage.icon;
                            const active = activeStage === stage.id;

                            return (
                                <button
                                    key={stage.id}
                                    type="button"
                                    onClick={() => setActiveStage(stage.id)}
                                    className={`group rounded-3xl border p-6 text-left transition ${active
                                        ? "border-blue-400 bg-white shadow-xl shadow-blue-500/10 dark:border-blue-400/40 dark:bg-slate-900"
                                        : "border-slate-200 bg-white/60 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.025]"
                                        }`}
                                >

                                    <div className="flex items-start justify-between">

                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active
                                                ? "bg-blue-600 text-white"
                                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                                            {stage.number}
                                        </span>

                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {stage.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {stage.short}
                                    </p>

                                </button>
                            );
                        })}

                    </div>

                    <div className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-slate-900 lg:p-10">

                        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">

                            <div>

                                <div className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    Stage {activeStageData.number}
                                </div>

                                <h3 className="mt-3 text-3xl font-black">
                                    {activeStageData.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                    {activeStageData.description}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the ${activeStageData.title} stage for our business.`,
                                            {
                                                Intent: "Growth stage enquiry",
                                                Stage: activeStageData.title,
                                            }
                                        )
                                    }
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                >
                                    Discuss this stage
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">

                                {activeStageData.items.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold dark:bg-white/[0.035]"
                                    >
                                        <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                SERVICES
            ========================================================== */}

            <section
                id="services"
                className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What We Can Do
                        </div>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            One technology partner for many of your needs.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Your business does not have to manage separate
                            technology providers for every requirement. We can
                            support different parts of your technology environment
                            and coordinate them into a more coherent system.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/30"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {service.description}
                                    </p>

                                    <div className="mt-5 space-y-2">

                                        {service.points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                {point}
                                            </div>
                                        ))}

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${service.title} for our startup or growing business.`,
                                                {
                                                    Intent: "Service enquiry",
                                                    Service: service.title,
                                                }
                                            )
                                        }
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                    >
                                        Discuss this service
                                        <ArrowRight className="h-4 w-4" />
                                    </button>

                                </article>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* =========================================================
                CAPABILITIES
            ========================================================== */}

            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">

                <div className="absolute inset-0 opacity-30">
                    <div className="absolute left-0 top-0 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">

                        <div>

                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                                Our Approach
                            </div>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Serious about growth.
                                <span className="block text-slate-400">
                                    Practical about technology.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                                Startups need speed. Growing businesses need
                                structure. Our job is to help you find the balance
                                between moving quickly and building responsibly.
                            </p>

                            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                        <WandSparkles className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="font-bold">
                                            You bring the ambition.
                                        </div>
                                        <div className="mt-1 text-sm leading-6 text-slate-400">
                                            We help translate it into technology,
                                            systems and practical execution.
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {capabilities.map((capability) => {
                                const Icon = capability.icon;

                                return (
                                    <div
                                        key={capability.title}
                                        className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-blue-400/30 hover:bg-white/[0.055]"
                                    >

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-blue-400">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-black">
                                            {capability.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            {capability.description}
                                        </p>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                TECHNOLOGY AREAS
            ========================================================== */}

            <section className="bg-slate-50 py-20 dark:bg-slate-900/40 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Beyond Software
                        </div>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Technology is an ecosystem.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            A successful technology environment connects
                            applications, people, infrastructure, data and
                            security rather than treating them as unrelated pieces.
                        </p>

                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-2">

                        {technologyAreas.map((area) => {
                            const Icon = area.icon;
                            const active = activeTab === area.id;

                            return (
                                <button
                                    type="button"
                                    key={area.id}
                                    onClick={() => setActiveTab(area.id)}
                                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${active
                                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                        : "bg-white text-slate-600 hover:text-blue-600 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-blue-300"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {area.label}
                                </button>
                            );
                        })}

                    </div>

                    <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950">

                        <div className="grid lg:grid-cols-[.9fr_1.1fr]">

                            <div className="border-b border-slate-200 p-8 dark:border-white/10 lg:border-b-0 lg:border-r lg:p-12">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <activeArea.icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-7 text-3xl font-black">
                                    {activeArea.title}
                                </h3>

                                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                    {activeArea.description}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${activeArea.label.toLowerCase()} requirements for our startup or growing business.`,
                                            {
                                                Intent: "Technology area enquiry",
                                                Area: activeArea.label,
                                            }
                                        )
                                    }
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                >
                                    Discuss {activeArea.label}
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="p-8 lg:p-12">

                                <div className="grid gap-3 sm:grid-cols-2">

                                    {activeArea.items.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold dark:border-white/10 dark:bg-white/[0.03]"
                                        >
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                                            {item}
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                PROCUREMENT
            ========================================================== */}

            <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
                                <ShoppingCart className="h-4 w-4" />
                                Procurement
                            </div>

                            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                                Need technology for your team?
                                <span className="block text-slate-400 dark:text-slate-600">
                                    We can help source it.
                                </span>
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Growing businesses constantly need equipment.
                                New employees need laptops. New offices need
                                networking. Operations may need servers,
                                accessories, meeting equipment and other business
                                technology.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                We can help turn a vague requirement such as
                                “we need to equip 20 employees” into a structured
                                technology procurement requirement.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like help planning and sourcing technology equipment for our startup or growing business.",
                                        {
                                            Intent: "Procurement",
                                            Category: "Business Technology",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400"
                            >
                                Discuss your procurement requirement
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {procurementCategories.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <button
                                        type="button"
                                        key={category.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like help sourcing ${category.title.toLowerCase()} for our startup or growing business.`,
                                                {
                                                    Intent: "Procurement",
                                                    Category: category.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-0.5 hover:border-amber-300 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-amber-400/30"
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <h3 className="font-black">
                                                {category.title}
                                            </h3>

                                        </div>

                                        <div className="mt-5 space-y-2">

                                            {category.items.map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                                                >
                                                    <ChevronRight className="h-3.5 w-3.5 text-amber-500" />
                                                    {item}
                                                </div>
                                            ))}

                                        </div>

                                    </button>
                                );
                            })}

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                PROBLEMS
            ========================================================== */}

            <section className="bg-slate-50 py-20 dark:bg-slate-900/40 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">

                        <div>

                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                You May Be Here
                            </div>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Tell us the problem.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                You do not need to know which technology solves
                                it. That is part of the conversation.
                            </p>

                            <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-400/10 dark:bg-blue-500/5">

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="font-black">
                                            Start with plain language.
                                        </div>

                                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            “Our staff are wasting too much time
                                            doing this manually” is enough to
                                            start a useful technology conversation.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">

                            {businessProblems.map((problem, index) => (
                                <button
                                    type="button"
                                    key={problem}
                                    onClick={() =>
                                        startSupportChat(
                                            `This describes our situation: ${problem}`,
                                            {
                                                Intent: "Business problem",
                                                Problem: problem,
                                            }
                                        )
                                    }
                                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/30"
                                >

                                    <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                        {problem}
                                    </span>

                                    <ArrowUpRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:text-blue-500" />

                                </button>
                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                PROCESS
            ========================================================== */}

            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            How We Work
                        </div>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            From conversation to implementation.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            A structured process keeps projects understandable,
                            measurable and aligned with the business outcome.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                        {process.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className="relative rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.025]"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span className="text-4xl font-black text-slate-200 dark:text-white/[0.05]">
                                            {step.number}
                                        </span>

                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {step.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* =========================================================
                MVP / START FROM SCRATCH
            ========================================================== */}

            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">

                <div className="absolute inset-0">

                    <div className="absolute left-[-10rem] top-[-10rem] h-[35rem] w-[35rem] rounded-full bg-blue-600/15 blur-3xl" />

                    <div className="absolute right-[-10rem] bottom-[-10rem] h-[35rem] w-[35rem] rounded-full bg-cyan-500/10 blur-3xl" />

                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300">
                                <Sparkles className="h-4 w-4" />
                                Starting From Scratch
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                You can come to us with just an idea.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-400">
                                Maybe you have identified a business opportunity.
                                Maybe you know exactly what you want to build.
                                Maybe you simply know that your current process
                                is not working anymore.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-400">
                                We can help you move from that starting point to a
                                practical roadmap, MVP, production system and
                                technology environment.
                            </p>

                            <div className="mt-8 space-y-3">

                                {[
                                    "Idea → technology requirements",
                                    "Requirements → MVP",
                                    "MVP → production",
                                    "Production → users",
                                    "Users → growth",
                                    "Growth → stronger infrastructure",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-bold"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">

                            <div className="rounded-3xl border border-white/10 bg-slate-900 p-7">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500">
                                            Example journey
                                        </div>

                                        <div className="mt-1 text-xl font-black">
                                            A growing company
                                        </div>
                                    </div>

                                    <Rocket className="h-6 w-6 text-blue-400" />

                                </div>

                                <div className="mt-8 space-y-4">

                                    {[
                                        ["01", "Idea", "Validate the opportunity"],
                                        ["02", "MVP", "Build the essential product"],
                                        ["03", "Launch", "Deploy and start serving customers"],
                                        ["04", "Team", "Equip employees and organize operations"],
                                        ["05", "Automate", "Reduce repetitive work"],
                                        ["06", "Scale", "Strengthen infrastructure"],
                                    ].map(([number, title, description]) => (
                                        <div
                                            key={number}
                                            className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                                        >

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-300">
                                                {number}
                                            </div>

                                            <div>
                                                <div className="font-bold">
                                                    {title}
                                                </div>

                                                <div className="mt-1 text-xs text-slate-500">
                                                    {description}
                                                </div>
                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                SCALE WITHOUT CHAOS
            ========================================================== */}

            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-3">

                        <div className="lg:col-span-1">

                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Scaling
                            </div>

                            <h2 className="mt-4 text-4xl font-black tracking-tight">
                                Growth should not turn technology into chaos.
                            </h2>

                        </div>

                        <div className="lg:col-span-2">

                            <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
                                More customers, more employees and more revenue
                                naturally create more complexity. More devices
                                need management. More accounts need security.
                                More systems need to communicate. More data needs
                                structure.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                The goal is not to make your technology complicated.
                                The goal is to make your business capable of
                                handling complexity without unnecessary friction.
                            </p>

                            <div className="mt-9 grid gap-3 sm:grid-cols-3">

                                {[
                                    {
                                        icon: Users,
                                        title: "People",
                                        text: "Employees, teams and access",
                                    },
                                    {
                                        icon: Workflow,
                                        title: "Processes",
                                        text: "Workflows and automation",
                                    },
                                    {
                                        icon: Server,
                                        title: "Systems",
                                        text: "Applications and infrastructure",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.025]"
                                        >

                                            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                            <div className="mt-4 font-black">
                                                {item.title}
                                            </div>

                                            <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                {item.text}
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                SECURITY
            ========================================================== */}

            <section className="bg-slate-50 py-20 dark:bg-slate-900/40 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-slate-950 lg:p-12">

                        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

                            <div>

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>

                                <h2 className="mt-7 text-4xl font-black tracking-tight">
                                    Security should grow with the company.
                                </h2>

                                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                    A startup can begin with a few accounts and
                                    one application. As the company grows, there
                                    are more users, devices, systems, customers
                                    and sensitive business information to protect.
                                </p>

                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">

                                {[
                                    "User access controls",
                                    "Secure authentication",
                                    "Device security",
                                    "Cloud security",
                                    "Application security",
                                    "Backup strategies",
                                    "Infrastructure hardening",
                                    "Monitoring and alerts",
                                    "Security reviews",
                                    "Recovery planning",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-bold dark:bg-white/[0.035]"
                                    >
                                        <LockKeyhole className="h-4 w-4 text-emerald-500" />
                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                SUPPORT
            ========================================================== */}

            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1fr_.9fr]">

                        <div>

                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                After Launch
                            </div>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Building it is only part of the job.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Once technology becomes important to your business,
                                keeping it healthy becomes important too.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                We can remain involved through ongoing support,
                                maintenance, infrastructure management,
                                troubleshooting, optimization and future
                                improvements.
                            </p>

                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.025]">

                            <div className="space-y-4">

                                {[
                                    {
                                        icon: Headphones,
                                        title: "Technical Support",
                                        text: "Help when systems or devices become difficult to manage.",
                                    },
                                    {
                                        icon: Settings2,
                                        title: "Maintenance",
                                        text: "Keep applications and infrastructure maintained.",
                                    },
                                    {
                                        icon: Monitor,
                                        title: "Monitoring",
                                        text: "Keep an eye on important systems and services.",
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: "Continuous Improvement",
                                        text: "Improve technology as business requirements change.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950"
                                        >

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <div className="font-black">
                                                    {item.title}
                                                </div>

                                                <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                    {item.text}
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                PARTNER MODEL
            ========================================================== */}

            <section className="relative overflow-hidden bg-blue-600 py-20 text-white lg:py-24">

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

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                        <BriefcaseBusiness className="h-7 w-7" />
                    </div>

                    <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
                        Think of us as part of your technology team.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
                        You may not need a large internal IT department. You may
                        simply need experienced people who can understand your
                        business, solve technical problems and help you make
                        better technology decisions as you grow.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a technology conversation for our startup or growing business.",
                                    {
                                        Intent: "Start project",
                                        Stage: activeStageData.title,
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                        >
                            Talk About Your Business
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <a
                            href="#faq"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                        >
                            Common Questions
                            <ChevronRight className="h-4 w-4" />
                        </a>

                    </div>

                </div>

            </section>

            {/* =========================================================
                FAQ
            ========================================================== */}

            <section
                id="faq"
                className="bg-slate-50 py-20 dark:bg-slate-900/40 lg:py-28"
            >

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            FAQ
                        </div>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Questions growing businesses ask.
                        </h2>

                    </div>

                    <div className="mt-12 space-y-3">

                        {faq.map((item, index) => {
                            const open = activeFaq === index;

                            return (
                                <div
                                    key={item.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950"
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 p-5 text-left"
                                    >

                                        <span className="text-sm font-black sm:text-base">
                                            {item.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""
                                                }`}
                                        />

                                    </button>

                                    {open && (
                                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 dark:border-white/10 dark:text-slate-400">
                                            {item.answer}
                                        </div>
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* =========================================================
                CTA
            ========================================================== */}

            <section
                id="start"
                className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28"
            >

                <div className="absolute inset-0">

                    <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                </div>

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                        <Rocket className="h-7 w-7" />
                    </div>

                    <div className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                        Your Next Stage Starts Here
                    </div>

                    <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                        You don't have to figure out the technology alone.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Tell us where the business is today, where you want it
                        to go and what is getting in the way. We can help you
                        identify the technology, systems, infrastructure,
                        procurement or support required to move forward.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                        <a
                            href="#"
                            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                        >
                            Start a Conversation
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        <a
                            href="#"
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                        >
                            Request a Quote
                            <Send className="h-4 w-4" />
                        </a>

                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">

                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            Software
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            Infrastructure
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            Procurement
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            Automation
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            Security
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            Support
                        </span>

                    </div>

                </div>

            </section>

            {/* =========================================================
                FINAL INFORMATION STRIP
            ========================================================== */}

            <section className="border-t border-slate-200 bg-slate-50 py-12 dark:border-white/10 dark:bg-slate-900/40">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-5 md:grid-cols-3">

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">

                            <div className="flex items-center gap-3">

                                <Clock3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                <div className="font-black">
                                    Built for real businesses
                                </div>

                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Solutions are considered in the context of
                                actual operations, people, budgets and growth.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">

                            <div className="flex items-center gap-3">

                                <Globe2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                <div className="font-black">
                                    Technology without the jargon
                                </div>

                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                You can explain your requirement in business
                                language and work with us to determine the
                                technical path.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">

                            <div className="flex items-center gap-3">

                                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                <div className="font-black">
                                    Designed for the next stage
                                </div>

                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Start with what you need today while keeping
                                future growth and expansion in view.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}