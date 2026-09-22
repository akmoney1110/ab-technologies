import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Brain,
    Bot,
    Sparkles,
    Cpu,
    Database,
    Workflow,
    Zap,
    ShieldCheck,
    BarChart3,
    MessageSquare,
    Search,
    FileText,
    Eye,
    Settings2,
    Network,
    Cloud,
    Code2,
    Layers3,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Play,
    Rocket,
    Target,
    Lightbulb,
    Lock,
    Users,
    Building2,
    GraduationCap,
    ShoppingCart,
    BriefcaseBusiness,
    Factory,
    HeartPulse,
    Headphones,
    Mail,
    Phone,
    Clock3,
    Globe2,
    CircleDollarSign,
    WandSparkles,
    ScanSearch,
    BotMessageSquare,
    Gauge,
    LineChart,
    Workflow as WorkflowIcon,
    ServerCog,
    FileSearch,
    Languages,
    Mic,
    Image as ImageIcon,
    RefreshCw,
    Terminal,
    CodeXml,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

const services = [
    {
        icon: Brain,
        title: "AI Strategy & Advisory",
        description:
            "Identify practical AI opportunities, prioritize use cases, estimate value, and build a realistic adoption roadmap around your organization.",
        items: [
            "AI readiness assessment",
            "Use-case discovery",
            "AI roadmap development",
            "Technology evaluation",
            "Business case development",
            "Responsible AI planning",
        ],
    },
    {
        icon: Bot,
        title: "AI Assistants & Copilots",
        description:
            "Build intelligent assistants that help employees, customers, students, teams, and management find information and complete tasks faster.",
        items: [
            "Customer AI assistants",
            "Internal knowledge assistants",
            "Employee copilots",
            "Website AI chat",
            "Document assistants",
            "Department-specific copilots",
        ],
    },
    {
        icon: Workflow,
        title: "Intelligent Automation",
        description:
            "Combine AI with workflows and business rules to reduce repetitive work and move processes from manual operations to intelligent automation.",
        items: [
            "Workflow automation",
            "Document processing",
            "Approval automation",
            "Email automation",
            "Data extraction",
            "Task orchestration",
        ],
    },
    {
        icon: Database,
        title: "AI Data Solutions",
        description:
            "Turn your organizational data into useful intelligence through structured data pipelines, search, analysis, dashboards, and AI-enabled insights.",
        items: [
            "Data preparation",
            "AI-ready databases",
            "Knowledge bases",
            "Semantic search",
            "Data analysis",
            "Intelligent reporting",
        ],
    },
    {
        icon: FileSearch,
        title: "Document Intelligence",
        description:
            "Extract, classify, search, summarize, compare, and understand information from contracts, invoices, forms, reports, and other documents.",
        items: [
            "OCR workflows",
            "Document classification",
            "Information extraction",
            "Contract analysis",
            "Invoice processing",
            "Document summarization",
        ],
    },
    {
        icon: Eye,
        title: "Computer Vision",
        description:
            "Use visual intelligence to analyze images, documents, environments, products, equipment, and operational activities.",
        items: [
            "Image analysis",
            "Visual inspection",
            "Object detection",
            "Document vision",
            "Quality control",
            "Visual monitoring",
        ],
    },
];

const useCases = [
    { icon: Headphones, title: "Customer Support", description: "AI-powered support systems that answer common questions, understand customer intent, retrieve information, and escalate complex issues." },
    { icon: FileText, title: "Document Processing", description: "Automatically read and process invoices, contracts, applications, forms, reports, purchase orders, and business documents." },
    { icon: Search, title: "Enterprise Search", description: "Create intelligent search experiences that allow employees to ask questions instead of manually searching through folders and documents." },
    { icon: BarChart3, title: "Business Intelligence", description: "Use AI to analyze operational information, identify trends, summarize performance, and support better business decisions." },
    { icon: Mail, title: "Email Intelligence", description: "Classify incoming messages, summarize conversations, identify priority requests, extract information, and trigger workflows." },
    { icon: ShoppingCart, title: "Procurement Intelligence", description: "Analyze procurement requests, compare products, organize supplier information, support quotation workflows, and improve purchasing decisions." },
    { icon: GraduationCap, title: "Education", description: "Develop learning assistants, knowledge systems, course tools, assessment support, student services, and administrative automation." },
    { icon: Building2, title: "Enterprise Operations", description: "Connect AI with internal processes to improve productivity across HR, finance, administration, sales, procurement, and operations." },
    { icon: Factory, title: "Industrial Intelligence", description: "Apply AI to operational monitoring, predictive insights, document workflows, quality processes, and industrial data." },
];

const industries = [
    { icon: Building2, title: "Corporate", text: "AI solutions for management, operations, customer service, HR, finance, sales, procurement, and internal knowledge." },
    { icon: GraduationCap, title: "Education", text: "Intelligent learning, administration, student support, knowledge systems, and digital academic workflows." },
    { icon: HeartPulse, title: "Healthcare", text: "Administrative intelligence, document workflows, information retrieval, scheduling support, and operational automation." },
    { icon: ShoppingCart, title: "Retail", text: "Customer engagement, product intelligence, demand insights, support automation, and business analytics." },
    { icon: Factory, title: "Manufacturing", text: "Process intelligence, document automation, visual inspection, analytics, and operational support." },
    { icon: BriefcaseBusiness, title: "Professional Services", text: "Research assistants, document intelligence, knowledge management, workflow automation, and client support." },
];

const process = [
    { number: "01", title: "Understand", description: "We start with your business, not the AI tool. We understand your goals, processes, data, challenges, users, and desired outcomes." },
    { number: "02", title: "Discover", description: "We identify where AI and automation can create meaningful value and separate realistic opportunities from unnecessary complexity." },
    { number: "03", title: "Design", description: "We design the architecture, workflows, user experience, integrations, security approach, and implementation plan." },
    { number: "04", title: "Build", description: "We develop and integrate the solution using appropriate AI models, APIs, software systems, databases, automation tools, and infrastructure." },
    { number: "05", title: "Test", description: "We evaluate functionality, accuracy, reliability, security, usability, performance, and operational behavior before deployment." },
    { number: "06", title: "Deploy", description: "We move the solution into the appropriate environment and help connect it to your existing technology and business processes." },
    { number: "07", title: "Train", description: "We help your team understand how to use the system effectively and establish practical operating procedures." },
    { number: "08", title: "Improve", description: "AI solutions should evolve. We monitor usage, identify improvements, refine workflows, and help your solution grow with the organization." },
];

const faqs = [
    { q: "Do we need to already have an AI system?", a: "No. We can help from the beginning. If you have no AI infrastructure, we can assess your needs, identify opportunities, recommend an approach, design the solution, build it, integrate it, and support deployment." },
    { q: "Can you integrate AI into our existing software?", a: "Yes. AI can often be integrated into existing websites, applications, databases, portals, CRMs, ERPs, internal systems, communication platforms, and business workflows." },
    { q: "Do you only build chatbots?", a: "No. Conversational AI is only one part of what we offer. We also work with intelligent automation, document intelligence, data analysis, search, AI-assisted applications, workflow systems, computer vision, and broader digital transformation." },
    { q: "Can you build custom AI software?", a: "Yes. We can design custom AI-enabled applications around your organization's particular workflow, data, users, business rules, and integration requirements." },
    { q: "Can AI work with our private company documents?", a: "Yes, depending on the architecture and requirements. Private knowledge systems can be designed so authorized users can search and interact with organizational information while access controls and security requirements are respected." },
    { q: "Can you connect AI to our database?", a: "Yes. Depending on the use case, AI can be connected to structured databases, document repositories, APIs, internal systems, or other approved data sources." },
    { q: "Can you help us decide whether AI is actually worth it?", a: "Absolutely. We do not believe every process needs AI. A major part of our approach is identifying where conventional software, automation, process improvement, or existing tools may be more appropriate." },
    { q: "Do you provide ongoing support?", a: "Yes. AI systems require monitoring, improvement, maintenance, integration support, security reviews, and operational oversight. We can provide ongoing support based on your requirements." },
];

function SectionHeading({ eyebrow, title, description, center = false }) {
    return (
        <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl`}>
            {eyebrow && (
                <div className="inline-flex items-center gap-2 mb-5">
                    <span className="h-px w-8 bg-violet-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
                        {eyebrow}
                    </span>
                </div>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
                {title}
            </h2>

            {description && (
                <p className="mt-5 text-base sm:text-lg leading-8 text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
}

function GlowOrb({ className = "" }) {
    return (
        <div
            className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
        />
    );
}

function StatCard({ icon: Icon, value, label, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50"
        >
            <Icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            <div className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
                {value}
            </div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {label}
            </div>
        </button>
    );
}

function ServiceCard({ service, onExplore }) {
    const Icon = service.icon;

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.035] p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-2xl hover:shadow-violet-500/10">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl transition-all duration-500 group-hover:bg-violet-500/20" />

            <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">
                    {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {service.description}
                </p>

                <ul className="mt-6 space-y-3">
                    {service.items.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                        >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={onExplore}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
                >
                    Explore capability
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </article>
    );
}

function UseCaseCard({ item, onClick }) {
    const Icon = item.icon;

    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.035] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40"
        >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10">
                <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>

            <h3 className="mt-5 font-bold text-slate-950 dark:text-white">
                {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {item.description}
            </p>
        </button>
    );
}

function ProcessStep({ item, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="relative w-full text-left transition hover:-translate-y-0.5"
        >
            <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-sm font-black text-violet-600 dark:text-violet-400">
                    {item.number}
                </div>

                <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                        {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {item.description}
                    </p>
                </div>
            </div>
        </button>
    );
}

export default function AIIntelligentSolutions() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);

    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss AI and intelligent solutions for my organization.",
            metadata: metadata || {
                Source: "AI & Intelligent Solutions",
            },
        });

        navigate("/support/ai");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#070711] dark:text-white">

            {/* HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200 dark:border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.12),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.10),transparent_30%),linear-gradient(180deg,#f8fafc,#eef2ff)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,#090914,#070711)]" />

                <GlowOrb className="left-[10%] top-20 h-72 w-72 bg-violet-500/10" />
                <GlowOrb className="right-[5%] top-40 h-96 w-96 bg-blue-500/10" />

                <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                                <Sparkles className="h-4 w-4" />
                                AI & Intelligent Solutions
                            </div>

                            <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Turn AI from an idea into a{" "}
                                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
                                    working business capability.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We help organizations discover, design, build,
                                integrate, deploy, and manage practical AI
                                solutions that improve how people work,
                                customers interact, information moves, and
                                decisions are made.
                            </p>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not need to know where to start. Whether
                                you have an idea, an existing application,
                                thousands of documents, manual workflows, or
                                simply a business problem, we can help you work
                                from the ground up.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss an AI project. Here's what we're trying to do:",
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                Stage: "Hero — discuss AI project",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-100"
                                >
                                    Discuss an AI Project
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to understand your approach to AI and intelligent solutions before starting a project.",
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                Stage: "Hero — explore approach",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/10"
                                >
                                    <Play className="h-4 w-4" />
                                    Explore Our Approach
                                </button>
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                                {[
                                    "Start from scratch",
                                    "Integrate existing systems",
                                    "Scale as you grow",
                                ].map((label) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore: ${label}.`,
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    Highlight: label,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-2 transition hover:text-violet-600 dark:hover:text-violet-300"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-violet-500" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* AI VISUAL PANEL */}
                        <div className="relative">
                            <div className="relative mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white/70 p-4 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.045]">

                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                                                Intelligent Operations
                                            </div>
                                            <div className="mt-1 text-lg font-bold">
                                                AI Control Layer
                                            </div>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
                                            <Brain className="h-5 w-5 text-violet-300" />
                                        </div>
                                    </div>

                                    <div className="mt-7 grid grid-cols-2 gap-3">
                                        {[
                                            [Database, "Data", "Connect & understand"],
                                            [Bot, "Intelligence", "Reason & assist"],
                                            [Workflow, "Automation", "Execute workflows"],
                                            [BarChart3, "Insights", "Improve decisions"],
                                        ].map(([Icon, title, sub]) => (
                                            <button
                                                type="button"
                                                key={title}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss the "${title}" layer of an AI control system.`,
                                                        {
                                                            Source: "AI & Intelligent Solutions",
                                                            "AI control layer": title,
                                                        }
                                                    )
                                                }
                                                className="rounded-2xl bg-white/[0.06] p-4 text-left transition hover:bg-white/[0.12]"
                                            >
                                                <Icon className="h-5 w-5 text-violet-300" />
                                                <div className="mt-4 text-sm font-semibold">
                                                    {title}
                                                </div>
                                                <div className="mt-1 text-xs text-slate-400">
                                                    {sub}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
                                        <div className="flex items-center gap-3">
                                            <WandSparkles className="h-5 w-5 text-violet-300" />
                                            <span className="text-sm font-semibold">
                                                Business request received
                                            </span>
                                        </div>

                                        <div className="mt-4 rounded-xl bg-black/20 p-4 text-sm leading-6 text-slate-300">
                                            "Analyze this month's procurement
                                            requests and identify opportunities
                                            to reduce delays."
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to see how an AI system would process a business request like analyzing procurement requests to reduce delays.",
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        Stage: "AI demo scenario",
                                                    }
                                                )
                                            }
                                            className="mt-4 flex items-center gap-2 text-xs text-violet-200 transition hover:text-white"
                                        >
                                            <RefreshCw className="h-3.5 w-3.5" />
                                            Connecting data → analyzing →
                                            generating insight
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to know how you design AI responsibly with security and governance in mind.",
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            Topic: "Responsible AI",
                                        }
                                    )
                                }
                                className="absolute -bottom-8 -left-5 hidden rounded-2xl border border-slate-200 bg-white/90 p-4 text-left shadow-xl backdrop-blur md:block dark:border-white/10 dark:bg-slate-900/90"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                                            Designed responsibly
                                        </div>
                                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                            Security & governance considered
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO / VALUE */}
            <section className="relative border-b border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#0a0a15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">

                        <SectionHeading
                            eyebrow="More than AI"
                            title="The goal is not to add AI. The goal is to make your organization better."
                            description="We approach AI as part of a wider digital environment. The best solution may combine artificial intelligence, conventional software, automation, cloud infrastructure, databases, integrations, analytics, and human workflows."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                [Target, "Business-first", "Start with the problem and desired outcome."],
                                [Layers3, "End-to-end", "Strategy, development, integration and deployment."],
                                [Network, "Connected", "Designed to work with your existing environment."],
                                [Rocket, "Scalable", "Start small and expand when the value is proven."],
                            ].map(([Icon, value, label]) => (
                                <StatCard
                                    key={value}
                                    icon={Icon}
                                    value={value}
                                    label={label}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the "${value}" principle: ${label}`,
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                Principle: value,
                                            }
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-[#080812] lg:py-28">
                <GlowOrb className="right-[-8rem] top-20 h-96 w-96 bg-violet-500/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Capabilities"
                        title="A complete AI capability, from first idea to ongoing operation."
                        description="Our services are designed to cover the full lifecycle of an intelligent solution. You can engage us for a single capability or bring us in from the beginning to design the complete system."
                    />

                    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.title}
                                service={service}
                                onExplore={() =>
                                    startSupportChat(
                                        `I'd like to explore the AI capability: ${service.title}. ${service.description} Focus: ${service.items.join(", ")}.`,
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            Capability: service.title,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* AI STACK */}
            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#0a0a15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        <div>
                            <SectionHeading
                                eyebrow="Intelligent technology stack"
                                title="AI works best when it is connected to the rest of your technology."
                                description="A useful AI system is rarely just a model. It needs data, applications, APIs, authentication, workflows, infrastructure, monitoring, security, and a clear user experience."
                            />

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    ["AI Models", Brain],
                                    ["Applications", Code2],
                                    ["APIs & Integrations", Network],
                                    ["Databases", Database],
                                    ["Cloud Infrastructure", Cloud],
                                    ["Automation", WorkflowIcon],
                                    ["Security", Lock],
                                    ["Analytics", LineChart],
                                ].map(([label, Icon]) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss "${label}" as part of an AI technology stack.`,
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "Stack component": label,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-violet-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-violet-400/30"
                                    >
                                        <Icon className="h-5 w-5 text-violet-500" />
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                            {label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-100 to-white p-6 dark:border-white/10 dark:from-white/[0.07] dark:to-white/[0.02]">

                                <div className="grid gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss the intelligence layer of an AI solution.",
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "Stack layer": "Intelligence",
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5 text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Brain className="h-5 w-5 text-violet-500" />
                                            <span className="font-bold">
                                                Intelligence
                                            </span>
                                        </div>
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to discuss connecting organization data to AI.",
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        "Stack layer": "Organization Data",
                                                    }
                                                )
                                            }
                                            className="rounded-2xl border border-slate-200 bg-white p-5 text-left dark:border-white/10 dark:bg-white/[0.04]"
                                        >
                                            <Database className="h-5 w-5 text-blue-500" />
                                            <div className="mt-3 text-sm font-bold">
                                                Organization Data
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to discuss infrastructure for AI solutions.",
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        "Stack layer": "Infrastructure",
                                                    }
                                                )
                                            }
                                            className="rounded-2xl border border-slate-200 bg-white p-5 text-left dark:border-white/10 dark:bg-white/[0.04]"
                                        >
                                            <ServerCog className="h-5 w-5 text-emerald-500" />
                                            <div className="mt-3 text-sm font-bold">
                                                Infrastructure
                                            </div>
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss connecting AI into business workflows.",
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "Stack layer": "Business workflows",
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-5 text-left dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Workflow className="h-5 w-5 text-fuchsia-500" />
                                                <span className="font-bold">
                                                    Business workflows
                                                </span>
                                            </div>

                                            <ArrowRight className="h-4 w-4 text-slate-400" />
                                        </div>

                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                                        </div>
                                    </button>

                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            [Users, "People"],
                                            [BotMessageSquare, "AI"],
                                            [Zap, "Action"],
                                        ].map(([Icon, label]) => (
                                            <button
                                                type="button"
                                                key={label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss the role of "${label}" in an AI-enabled workflow.`,
                                                        {
                                                            Source: "AI & Intelligent Solutions",
                                                            "Workflow role": label,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl bg-slate-100 p-4 text-center transition hover:bg-violet-50 dark:bg-white/5 dark:hover:bg-white/10"
                                            >
                                                <Icon className="mx-auto h-4 w-4 text-violet-500" />
                                                <div className="mt-2 text-[11px] font-bold">
                                                    {label}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* USE CASES */}
            <section className="bg-slate-50 py-20 dark:bg-[#080812] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="What we can build"
                        title="Practical intelligence across everyday operations."
                        description="From a simple assistant to a connected enterprise intelligence platform, we can design solutions around the way your organization actually operates."
                    />

                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {useCases.map((item) => (
                            <UseCaseCard
                                key={item.title}
                                item={item}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to explore an AI use case: ${item.title}. ${item.description}`,
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            "Use case": item.title,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* AI APPLICATIONS */}
            <section className="relative overflow-hidden border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#0a0a15] lg:py-28">
                <GlowOrb className="left-[-10rem] top-1/2 h-96 w-96 -translate-y-1/2 bg-blue-500/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]">

                        <SectionHeading
                            eyebrow="AI applications"
                            title="Intelligence embedded into the software your people already use."
                            description="Instead of forcing employees to adopt another complicated platform, AI capabilities can be designed into the applications, portals, dashboards, websites, and internal tools that already form part of your operation."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                { icon: MessageSquare, title: "AI Chat", text: "Conversational interfaces for customers, employees and internal teams." },
                                { icon: Search, title: "Smart Search", text: "Ask questions across approved organizational information." },
                                { icon: FileSearch, title: "Document AI", text: "Understand and process large volumes of documents." },
                                { icon: Gauge, title: "Decision Support", text: "Summarize information and surface relevant insights." },
                                { icon: Terminal, title: "Developer AI", text: "Assist technical teams with documentation, analysis and workflows." },
                                { icon: Languages, title: "Language AI", text: "Translation, classification, summarization and multilingual workflows." },
                                { icon: Mic, title: "Voice AI", text: "Voice interfaces and speech-enabled workflows where appropriate." },
                                { icon: ImageIcon, title: "Vision AI", text: "Analyze images, scanned documents and visual information." },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore this AI application: ${item.title} — ${item.text}`,
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "AI application": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 p-5 text-left transition hover:border-violet-400/40 hover:bg-violet-50/40 dark:border-white/10 dark:hover:bg-violet-500/[0.04]"
                                    >
                                        <Icon className="h-5 w-5 text-violet-500" />

                                        <h3 className="mt-4 font-bold text-slate-950 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* AUTOMATION */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28 dark:bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.18),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                            <Workflow className="h-4 w-4" />
                            Intelligent automation
                        </div>

                        <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Move beyond "AI that answers" to AI that helps work get done.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                            The real value of AI often appears when intelligence
                            is connected to actions. A request can be understood,
                            information retrieved, rules checked, a workflow
                            initiated, a document generated, and the appropriate
                            person notified.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-4 md:grid-cols-5">

                        {[
                            ["Understand", Brain],
                            ["Retrieve", Search],
                            ["Decide", Lightbulb],
                            ["Act", Zap],
                            ["Report", BarChart3],
                        ].map(([label, Icon], index) => (
                            <React.Fragment key={label}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to understand the AI automation stage: "${label}".`,
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                "Automation stage": label,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-left backdrop-blur transition hover:border-violet-400/40 hover:bg-white/[0.10]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                        <Icon className="h-5 w-5 text-violet-300" />
                                    </div>

                                    <div className="mt-5 text-sm font-bold">
                                        {label}
                                    </div>

                                    <div className="mt-2 text-xs leading-5 text-slate-400">
                                        Intelligent workflow stage
                                    </div>
                                </button>

                                {index < 4 && (
                                    <div className="hidden items-center justify-center md:flex">
                                        <ArrowRight className="h-4 w-4 text-violet-400" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* DOCUMENT INTELLIGENCE */}
            <section className="bg-white py-20 dark:bg-[#0a0a15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        <div className="order-2 lg:order-1">
                            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#10101c]">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-violet-500" />
                                        <div>
                                            <div className="text-sm font-bold">
                                                Procurement Invoice
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Uploaded document
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-white/10" />
                                        <div className="h-3 w-full rounded bg-slate-100 dark:bg-white/10" />
                                        <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-white/10" />
                                    </div>
                                </div>

                                <div className="my-4 flex justify-center">
                                    <ArrowRight className="h-5 w-5 rotate-90 text-violet-500" />
                                </div>

                                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
                                    <div className="flex items-center gap-3">
                                        <ScanSearch className="h-5 w-5 text-violet-500" />
                                        <div className="text-sm font-bold">
                                            AI extraction
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        {[
                                            ["Supplier", "Identified"],
                                            ["Amount", "Extracted"],
                                            ["Date", "Detected"],
                                            ["Items", "Structured"],
                                        ].map(([label, value]) => (
                                            <button
                                                type="button"
                                                key={label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss AI document extraction — ${label}: ${value}.`,
                                                        {
                                                            Source: "AI & Intelligent Solutions",
                                                            "Document field": label,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl bg-white/70 p-3 text-left transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/[0.15]"
                                            >
                                                <div className="text-[10px] uppercase text-slate-500">
                                                    {label}
                                                </div>
                                                <div className="mt-1 text-xs font-bold">
                                                    {value}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <SectionHeading
                                eyebrow="Document intelligence"
                                title="Turn documents into usable information."
                                description="Organizations often have valuable information trapped inside PDFs, invoices, contracts, reports, forms, spreadsheets, emails, scanned documents, and other files. We can help turn that information into searchable and actionable business data."
                            />

                            <ul className="mt-8 space-y-4">
                                {[
                                    "Extract structured information from documents",
                                    "Search across approved document collections",
                                    "Summarize lengthy reports and records",
                                    "Compare documents and identify differences",
                                    "Classify documents automatically",
                                    "Connect extracted information to business workflows",
                                ].map((item) => (
                                    <li key={item}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like document intelligence support for: ${item}.`,
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        "Document intelligence": item,
                                                    }
                                                )
                                            }
                                            className="flex w-full gap-3 text-left text-sm leading-6 text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300"
                                        >
                                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-violet-500" />
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* RESPONSIBLE AI */}
            <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-[#080812] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1fr_.9fr]">

                        <SectionHeading
                            eyebrow="Responsible implementation"
                            title="Useful AI needs more than impressive demos."
                            description="We consider security, permissions, reliability, data handling, human oversight, operational requirements, and the actual business environment when designing intelligent systems."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                { icon: ShieldCheck, title: "Security", text: "Design access and integration controls around the solution's requirements." },
                                { icon: Lock, title: "Access Control", text: "Ensure users only interact with information and functions appropriate to their role." },
                                { icon: Users, title: "Human Oversight", text: "Keep people involved where decisions require review, approval or judgment." },
                                { icon: Settings2, title: "Governance", text: "Establish practical rules for how AI systems are used and maintained." },
                                { icon: Gauge, title: "Monitoring", text: "Track system behavior, performance and operational outcomes." },
                                { icon: RefreshCw, title: "Continuous Improvement", text: "Refine prompts, workflows, integrations and experiences over time." },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss responsible AI — ${item.title}: ${item.text}`,
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "Responsible AI": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-violet-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-violet-400/30"
                                    >
                                        <Icon className="h-5 w-5 text-violet-500" />
                                        <h3 className="mt-4 text-sm font-bold text-slate-950 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </button>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="bg-white py-20 dark:bg-[#0a0a15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Industries"
                        title="AI designed around the context of your organization."
                        description="The right intelligent solution depends on the industry, process, users, information, regulations, and business objectives involved."
                    />

                    <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {industries.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore AI for the ${item.title} industry: ${item.text}`,
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                Industry: item.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 dark:border-white/10"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/10">
                                        <Icon className="h-5 w-5 text-violet-500" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">
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

            {/* FROM SCRATCH */}
            <section className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 py-20 dark:border-white/10 dark:from-violet-950/20 dark:via-[#0a0a15] dark:to-blue-950/20 lg:py-28">

                <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(100,116,139,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,.08)_1px,transparent_1px)] [background-size:42px_42px]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-4xl text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
                            <Rocket className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                        </div>

                        <div className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
                            Starting from zero?
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            You don't have to figure out AI alone.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                            You can come to us with nothing more than an idea,
                            a manual process, a problem your team keeps
                            struggling with, or a vision for a new product.
                            We'll help turn that starting point into a
                            structured technology plan.
                        </p>

                        <div className="mt-9 flex flex-wrap justify-center gap-3">
                            {[
                                "Have an idea",
                                "Have a business problem",
                                "Have existing software",
                                "Have data",
                                "Have manual workflows",
                                "Need a complete system",
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `My AI starting point is: ${item}.`,
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                "Starting point": item,
                                            }
                                        )
                                    }
                                    className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:text-violet-300"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start an AI project from scratch. Here's my starting point:",
                                    {
                                        Source: "AI & Intelligent Solutions",
                                        Stage: "From scratch",
                                    }
                                )
                            }
                            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
                        >
                            Start From Scratch
                            <ArrowRight className="h-4 w-4" />
                        </button>

                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="bg-white py-20 dark:bg-[#0a0a15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="How we work"
                        title="A structured path from business problem to intelligent solution."
                        description="Our process keeps AI grounded in real objectives. We focus on what should be improved, what needs to be built, and how the solution will operate after launch."
                    />

                    <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
                        {process.map((item) => (
                            <ProcessStep
                                key={item.number}
                                item={item}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to understand the AI process step: "${item.title}" — ${item.description}`,
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            Step: `${item.number} — ${item.title}`,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SOLUTION TYPES */}
            <section className="bg-slate-50 py-20 dark:bg-[#080812] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Solution models"
                        title="Choose the level of intelligence your organization actually needs."
                        description="Not every organization needs a massive AI platform. We can help you choose an appropriate starting point and expand the system as your requirements become clearer."
                    />

                    <div className="mt-14 grid gap-5 lg:grid-cols-3">

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Level 01
                            </div>

                            <h3 className="mt-3 text-2xl font-black">
                                AI Assistant
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                A focused intelligent interface for answering
                                questions, assisting users, retrieving
                                information, or supporting a specific process.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Website assistants",
                                    "Internal knowledge assistants",
                                    "Customer support",
                                    "Document Q&A",
                                ].map((x) => (
                                    <button
                                        type="button"
                                        key={x}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore an AI Assistant use case: ${x}.`,
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "Solution tier": "AI Assistant",
                                                    Item: x,
                                                }
                                            )
                                        }
                                        className="flex w-full gap-2 text-left text-sm transition hover:text-violet-600 dark:hover:text-violet-300"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-violet-500" />
                                        {x}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss the AI Assistant solution tier.",
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            "Solution tier": "AI Assistant",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 text-xs font-black text-violet-600 hover:gap-3 dark:text-violet-300"
                            >
                                Discuss this tier
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <div className="relative overflow-hidden rounded-3xl border border-violet-400/40 bg-gradient-to-br from-violet-600 to-blue-600 p-7 text-white shadow-2xl shadow-violet-600/20">
                            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                            <div className="relative">
                                <div className="text-xs font-bold uppercase tracking-wider text-violet-100">
                                    Level 02
                                </div>

                                <h3 className="mt-3 text-2xl font-black">
                                    Intelligent Workflow
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-violet-50">
                                    Connect AI to your business processes so
                                    intelligence can trigger useful actions,
                                    automate repetitive work, and move
                                    information between systems.
                                </p>

                                <div className="mt-7 space-y-3">
                                    {[
                                        "AI + automation",
                                        "Document processing",
                                        "Business workflows",
                                        "System integrations",
                                    ].map((x) => (
                                        <button
                                            type="button"
                                            key={x}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to explore an Intelligent Workflow capability: ${x}.`,
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        "Solution tier": "Intelligent Workflow",
                                                        Item: x,
                                                    }
                                                )
                                            }
                                            className="flex w-full gap-2 text-left text-sm transition hover:text-white"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-white" />
                                            {x}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss the Intelligent Workflow solution tier.",
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                "Solution tier": "Intelligent Workflow",
                                            }
                                        )
                                    }
                                    className="mt-7 inline-flex items-center gap-2 text-xs font-black text-white hover:gap-3"
                                >
                                    Discuss this tier
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Level 03
                            </div>

                            <h3 className="mt-3 text-2xl font-black">
                                AI Platform
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                A broader intelligent environment connecting
                                data, applications, users, workflows,
                                analytics, AI capabilities and organizational
                                processes.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Enterprise knowledge",
                                    "Multiple AI capabilities",
                                    "Data & analytics",
                                    "Cross-department intelligence",
                                ].map((x) => (
                                    <button
                                        type="button"
                                        key={x}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore an AI Platform capability: ${x}.`,
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "Solution tier": "AI Platform",
                                                    Item: x,
                                                }
                                            )
                                        }
                                        className="flex w-full gap-2 text-left text-sm transition hover:text-violet-600 dark:hover:text-violet-300"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-violet-500" />
                                        {x}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss the AI Platform solution tier.",
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            "Solution tier": "AI Platform",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 text-xs font-black text-violet-600 hover:gap-3 dark:text-violet-300"
                            >
                                Discuss this tier
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* INTEGRATION */}
            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#0a0a15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2">

                        <div>
                            <SectionHeading
                                eyebrow="Integration"
                                title="Your AI solution does not have to live in isolation."
                                description="We can design intelligent capabilities around your existing software environment rather than forcing you to replace everything."
                            />

                            <div className="mt-8 space-y-3">
                                {[
                                    "Existing websites",
                                    "Web applications",
                                    "Mobile applications",
                                    "Internal portals",
                                    "Databases",
                                    "Business APIs",
                                    "Cloud environments",
                                    "Document repositories",
                                    "Customer service systems",
                                    "Enterprise workflows",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to integrate AI with: ${item}.`,
                                                {
                                                    Source: "AI & Intelligent Solutions",
                                                    "Integration target": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-violet-300 dark:border-white/10 dark:hover:border-violet-400/30"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-violet-500" />
                                        <span className="text-sm font-medium">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative w-full max-w-xl">

                                <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />

                                <div className="relative grid grid-cols-3 gap-4">

                                    {[
                                        [CodeXml, "Apps"],
                                        [Database, "Data"],
                                        [Cloud, "Cloud"],
                                        [Users, "People"],
                                        [Brain, "AI"],
                                        [Workflow, "Workflows"],
                                        [ShieldCheck, "Security"],
                                        [BarChart3, "Insights"],
                                        [Network, "APIs"],
                                    ].map(([Icon, label]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss the "${label}" component within an AI integration ecosystem.`,
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        "Integration component": label,
                                                    }
                                                )
                                            }
                                            className={`rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04] ${label === "AI"
                                                ? "border-violet-400/50 bg-violet-500/10 shadow-xl shadow-violet-500/10"
                                                : ""
                                                }`}
                                        >
                                            <Icon className="mx-auto h-5 w-5 text-violet-500" />
                                            <div className="mt-3 text-xs font-bold">
                                                {label}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CUSTOM DEVELOPMENT */}
            <section className="bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1fr_.8fr]">

                        <div>
                            <div className="text-xs font-bold uppercase tracking-[0.22em] text-violet-300">
                                Custom development
                            </div>

                            <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Have a software idea that does not exist yet?
                            </h2>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                                We can help turn the concept into an actual
                                product. That may include AI, web applications,
                                mobile applications, APIs, databases,
                                authentication, dashboards, automation,
                                cloud infrastructure, and ongoing support.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I have a software or AI idea I'd like to discuss. Here's the concept:",
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            Stage: "Custom development — discuss idea",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-violet-100"
                            >
                                Discuss Your Idea
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                ["Idea", Lightbulb],
                                ["Product design", Layers3],
                                ["AI", Brain],
                                ["Software", Code2],
                                ["Automation", Workflow],
                                ["Infrastructure", ServerCog],
                                ["Deployment", Rocket],
                                ["Support", Headphones],
                            ].map(([label, Icon]) => (
                                <button
                                    type="button"
                                    key={label}
                                    onClick={() =>
                                        startSupportChat(
                                            `For my custom AI/software project, I'd like to discuss: ${label}.`,
                                            {
                                                Source: "AI & Intelligent Solutions",
                                                "Custom development item": label,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-violet-400/40 hover:bg-white/[0.08]"
                                >
                                    <Icon className="h-5 w-5 text-violet-300" />
                                    <span className="text-sm font-semibold">
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* AI DISCOVERY */}
            <section className="bg-white py-20 dark:bg-[#0a0a15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035] sm:p-10 lg:p-14">

                        <div className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-600 dark:text-violet-300">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    AI opportunity discovery
                                </div>

                                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                    Not sure what AI could do for your organization?
                                </h2>

                                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                                    Tell us what your organization does, where
                                    work is slow or repetitive, what your
                                    employees struggle with, and what you want
                                    to improve. We can help translate those
                                    challenges into practical technology
                                    opportunities.
                                </p>

                                <div className="mt-7 flex flex-wrap gap-2">
                                    {[
                                        "Reduce repetitive work",
                                        "Improve customer service",
                                        "Search information faster",
                                        "Automate documents",
                                        "Improve reporting",
                                        "Build a new product",
                                    ].map((x) => (
                                        <button
                                            type="button"
                                            key={x}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to explore AI for: ${x}.`,
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        "Discovery goal": x,
                                                    }
                                                )
                                            }
                                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:text-violet-300"
                                        >
                                            {x}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#10101c]">
                                    <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
                                        <BotMessageSquare className="h-5 w-5 text-violet-500" />
                                        <span className="text-sm font-bold">
                                            AI Project Assistant
                                        </span>
                                    </div>

                                    <div className="mt-5 space-y-3">
                                        <div className="rounded-xl bg-slate-100 p-4 text-xs leading-6 text-slate-600 dark:bg-white/5 dark:text-slate-300">
                                            Describe your business challenge
                                            or technology idea...
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like help discovering AI opportunities for my organization. Here's what we're trying to improve:",
                                                    {
                                                        Source: "AI & Intelligent Solutions",
                                                        Stage: "AI opportunity discovery",
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-violet-700"
                                        >
                                            <Sparkles className="h-4 w-4" />
                                            Explore AI Opportunities
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-[#080812] lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
                            Frequently asked questions
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                            Questions about working with us?
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.q}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="text-sm font-bold text-slate-950 dark:text-white">
                                            {faq.q}
                                        </span>

                                        {open ? (
                                            <ChevronUp className="h-5 w-5 shrink-0 text-violet-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                                        )}
                                    </button>

                                    {open && (
                                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10">
                                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {faq.a}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.q}"`,
                                                        {
                                                            Source: "AI & Intelligent Solutions",
                                                            FAQ: faq.q,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-violet-600 hover:gap-3 dark:text-violet-300"
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

            {/* FINAL CTA */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.30),transparent_45%)]" />

                <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                        <Brain className="h-7 w-7 text-violet-300" />
                    </div>

                    <div className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-violet-300">
                        Let's build what comes next
                    </div>

                    <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                        Your next intelligent solution can start with one conversation.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        Whether you are exploring your first AI use case,
                        modernizing an existing application, automating a
                        process, or building an entirely new intelligent
                        product, we can help you move from uncertainty to a
                        practical plan.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start an AI project. Here's what we want to achieve:",
                                    {
                                        Source: "AI & Intelligent Solutions",
                                        Stage: "Final CTA — start AI project",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-violet-100"
                        >
                            Start Your AI Project
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to talk to your team about AI and intelligent solutions.",
                                    {
                                        Source: "AI & Intelligent Solutions",
                                        Stage: "Final CTA — talk to team",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Talk to Our Team
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
                        {[
                            [Mail, "AI consultation"],
                            [Phone, "Project discussion"],
                            [Clock3, "Flexible engagement"],
                            [Globe2, "Local & international"],
                        ].map(([Icon, label]) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss: ${label}.`,
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            "Contact topic": label,
                                        }
                                    )
                                }
                                className="flex items-center gap-2 transition hover:text-white"
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {/* BOTTOM SERVICE STRIP */}
            <section className="border-t border-slate-800 bg-slate-950 py-8 text-white dark:bg-black">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            [Brain, "AI Strategy"],
                            [Bot, "Intelligent Applications"],
                            [Workflow, "Automation"],
                            [Rocket, "Digital Transformation"],
                        ].map(([Icon, label]) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to explore: ${label}.`,
                                        {
                                            Source: "AI & Intelligent Solutions",
                                            "Service strip": label,
                                        }
                                    )
                                }
                                className="transition hover:-translate-y-0.5"
                            >
                                <Icon className="mx-auto h-5 w-5 text-violet-400" />
                                <div className="mt-3 text-sm font-bold">
                                    {label}
                                </div>
                            </button>
                        ))}

                    </div>
                </div>
            </section>

        </main>
    );
}