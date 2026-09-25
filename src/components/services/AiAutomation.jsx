import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Bot,
    BrainCircuit,
    Building2,
    Check,
    ChevronDown,
    ChevronRight,
    CircuitBoard,
    CloudCog,
    Code2,
    Cog,
    Database,
    FileSearch,
    Gauge,
    Globe2,
    Headphones,
    Layers3,
    Lightbulb,
    Lock,
    Mail,
    MessageSquare,
    Network,
    Play,
    Rocket,
    ScanSearch,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingUp,
    Workflow,
    Zap,
    BarChart3,
    BriefcaseBusiness,
    Cpu,
    Users,
    Settings2,
    WandSparkles,
    ShoppingCart,
    GraduationCap,
    Factory,
    HeartPulse,
    Landmark,
    Truck,
    Store,
    CheckCircle2,
    CircleDollarSign,
    Clock3,
    RefreshCw,
    ServerCog,
    FileCode2,
    PlugZap,
    Boxes,
    ClipboardCheck,
    Presentation,
    MonitorSmartphone,
} from "lucide-react";
import SEO from "../SEO";
import { queueSupportRequest } from "../AI";
<SEO
    title="AI Automation & Business Process Automation"
    description="Automate business processes with AI-powered workflows, intelligent systems and custom automation solutions from AB Technologies."
    path="/services/ai-automation"
    schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Automation",
        "provider": {
            "@type": "Organization",
            "name": "AB Technologies"
        }
    }}
/>

const solutions = [
    {
        id: "strategy",
        title: "AI Strategy & Advisory",
        short: "Know where AI actually belongs in your organization.",
        description:
            "We help organizations identify practical AI opportunities, prioritize initiatives, define implementation roadmaps and build a realistic path from experimentation to measurable business value.",
        icon: BrainCircuit,
        points: [
            "AI readiness assessment",
            "Use-case discovery",
            "AI opportunity mapping",
            "Technology selection",
            "Implementation roadmap",
            "ROI and impact planning",
        ],
    },
    {
        id: "automation",
        title: "AI Workflow Automation",
        short: "Turn repetitive work into intelligent workflows.",
        description:
            "We connect people, software, data and AI into automated workflows that reduce manual work while keeping humans involved where judgment and approval matter.",
        icon: Workflow,
        points: [
            "Approval automation",
            "Document workflows",
            "Email automation",
            "Data synchronization",
            "Task routing",
            "Human approval workflows",
        ],
    },
    {
        id: "agents",
        title: "AI Agents & Copilots",
        short: "Give teams intelligent digital assistants.",
        description:
            "We build secure AI assistants and agents that can understand company information, interact with business systems and help employees complete real work.",
        icon: Bot,
        points: [
            "Internal AI assistants",
            "Customer-facing agents",
            "Knowledge assistants",
            "Research agents",
            "Operations agents",
            "Department-specific copilots",
        ],
    },
    {
        id: "applications",
        title: "Custom AI Applications",
        short: "AI products designed around your exact workflow.",
        description:
            "When an off-the-shelf AI tool is not enough, we design and build custom AI-powered applications around your processes, data and customers.",
        icon: Code2,
        points: [
            "AI web applications",
            "AI mobile applications",
            "Intelligent dashboards",
            "Custom portals",
            "AI APIs",
            "Enterprise applications",
        ],
    },
    {
        id: "documents",
        title: "Document Intelligence",
        short: "Extract useful information from documents automatically.",
        description:
            "Transform invoices, forms, contracts, reports and other business documents into structured information that your systems can understand and act upon.",
        icon: FileSearch,
        points: [
            "OCR workflows",
            "Invoice extraction",
            "Contract analysis",
            "Form processing",
            "Document classification",
            "Information extraction",
        ],
    },
    {
        id: "data",
        title: "AI Data & Analytics",
        short: "Turn business data into useful decisions.",
        description:
            "We help organizations make better use of operational data through intelligent dashboards, predictive analysis, natural-language querying and automated reporting.",
        icon: BarChart3,
        points: [
            "Business intelligence",
            "AI dashboards",
            "Predictive analysis",
            "Automated reports",
            "Data classification",
            "Natural-language analytics",
        ],
    },
];


const industries = [
    {
        title: "Corporate & Enterprise",
        icon: Building2,
        description:
            "Automate internal operations, employee workflows, reporting, knowledge management and customer interactions.",
        examples: [
            "Enterprise copilots",
            "Workflow automation",
            "Knowledge management",
            "Executive reporting",
        ],
    },
    {
        title: "Education",
        icon: GraduationCap,
        description:
            "Support schools, training organizations and education providers with intelligent administrative and learning tools.",
        examples: [
            "Student support",
            "Administrative automation",
            "Learning assistants",
            "Document processing",
        ],
    },
    {
        title: "Healthcare & Professional Services",
        icon: HeartPulse,
        description:
            "Improve information handling, communication and administrative processes while keeping people in control.",
        examples: [
            "Information assistants",
            "Document workflows",
            "Appointment workflows",
            "Administrative automation",
        ],
    },
    {
        title: "Finance & Operations",
        icon: Landmark,
        description:
            "Automate reporting, document processing, reconciliations, approvals and operational workflows.",
        examples: [
            "Invoice processing",
            "Reporting",
            "Approvals",
            "Financial document workflows",
        ],
    },
    {
        title: "Retail & Commerce",
        icon: Store,
        description:
            "Create smarter customer experiences, inventory workflows, sales support and operational automation.",
        examples: [
            "Customer assistants",
            "Sales automation",
            "Product discovery",
            "Inventory workflows",
        ],
    },
    {
        title: "Manufacturing & Logistics",
        icon: Factory,
        description:
            "Connect operational data, people and software to create more efficient intelligent processes.",
        examples: [
            "Operations dashboards",
            "Workflow automation",
            "Document processing",
            "Operational assistants",
        ],
    },
];


const automationAreas = [
    {
        title: "Sales",
        icon: TrendingUp,
        items: [
            "Lead qualification",
            "Proposal preparation",
            "CRM updates",
            "Follow-up workflows",
            "Sales research",
        ],
    },
    {
        title: "Customer Service",
        icon: Headphones,
        items: [
            "AI support agents",
            "Ticket classification",
            "Response assistance",
            "Knowledge retrieval",
            "Escalation workflows",
        ],
    },
    {
        title: "Finance",
        icon: CircleDollarSign,
        items: [
            "Invoice processing",
            "Expense classification",
            "Document extraction",
            "Approval workflows",
            "Reporting assistance",
        ],
    },
    {
        title: "Human Resources",
        icon: Users,
        items: [
            "Employee assistants",
            "Document workflows",
            "Onboarding",
            "Internal knowledge",
            "Recruitment assistance",
        ],
    },
    {
        title: "Operations",
        icon: Settings2,
        items: [
            "Task routing",
            "Approvals",
            "Data synchronization",
            "Operational alerts",
            "Process monitoring",
        ],
    },
    {
        title: "Marketing",
        icon: Sparkles,
        items: [
            "Content workflows",
            "Research",
            "Campaign assistance",
            "Customer segmentation",
            "Reporting",
        ],
    },
];


const transformationStages = [
    {
        number: "01",
        title: "Discover",
        icon: Search,
        description:
            "We learn how your organization works, where time is being lost and where technology can create measurable improvements.",
    },
    {
        number: "02",
        title: "Prioritize",
        icon: Target,
        description:
            "Not every AI idea deserves investment. We rank opportunities based on business value, complexity, risk and practicality.",
    },
    {
        number: "03",
        title: "Design",
        icon: Layers3,
        description:
            "We design the user experience, technical architecture, integrations, data flows, security controls and operating model.",
    },
    {
        number: "04",
        title: "Build",
        icon: Code2,
        description:
            "Our engineering process turns the approved concept into a working application, automation, integration or AI system.",
    },
    {
        number: "05",
        title: "Test",
        icon: ShieldCheck,
        description:
            "We test functionality, reliability, security, permissions, AI behavior and real-world workflows before deployment.",
    },
    {
        number: "06",
        title: "Launch",
        icon: Rocket,
        description:
            "We deploy the solution, train users and establish the operational processes required for adoption.",
    },
    {
        number: "07",
        title: "Improve",
        icon: RefreshCw,
        description:
            "AI systems should evolve. We monitor usage, gather feedback and continuously improve the solution.",
    },
];


const faqItems = [
    {
        question: "Do I need to know exactly what AI solution I need?",
        answer:
            "No. In fact, many organizations approach us because they know they want to improve their operations but are not sure where AI belongs. We can start from your business problem, workflow or objective and help identify practical opportunities.",
    },
    {
        question: "Can you build an AI system from scratch?",
        answer:
            "Yes. We can work from an idea, business problem, existing process or technical requirement and design the solution from the ground up. This can include the interface, backend, AI functionality, integrations, databases, authentication and deployment.",
    },
    {
        question: "Can you connect AI to our existing software?",
        answer:
            "Yes. Where appropriate, AI can be connected to existing websites, CRMs, databases, APIs, business applications, communication platforms and internal systems.",
    },
    {
        question: "Can you automate processes without replacing our employees?",
        answer:
            "Yes. A strong automation strategy does not necessarily mean replacing people. We can design human-in-the-loop workflows where AI handles repetitive work while employees retain control over decisions, approvals and exceptions.",
    },
    {
        question: "Can you build an AI chatbot for our company?",
        answer:
            "Yes. Depending on the objective, this could be a customer support assistant, sales assistant, internal knowledge assistant, website assistant or a more advanced agent capable of interacting with approved business systems.",
    },
    {
        question: "Can you work with our existing data?",
        answer:
            "Yes, subject to the data sources, quality, permissions and security requirements. We can help organize, process, search and use approved information within an AI workflow.",
    },
    {
        question: "Can you help us move from an old system to a modern platform?",
        answer:
            "Yes. Digital transformation can include modernizing legacy applications, replacing manual processes, connecting disconnected systems, improving infrastructure and introducing automation or AI where it provides practical value.",
    },
    {
        question: "Do you provide ongoing support?",
        answer:
            "Yes. Depending on the engagement, ongoing support can include monitoring, maintenance, improvements, infrastructure management, security updates, user support and further development.",
    },
];


function SectionLabel({ children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            {children}
        </div>
    );
}


function GlassCard({ children, className = "" }) {
    return (
        <div
            className={`rounded-3xl border border-slate-200/80 bg-white/75 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.3)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_20px_70px_-30px_rgba(0,0,0,0.8)] ${className}`}
        >
            {children}
        </div>
    );
}


function IconBox({ icon: Icon, className = "" }) {
    return (
        <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300 ${className}`}
        >
            <Icon className="h-5 w-5" />
        </div>
    );
}


function SolutionCard({ solution, onSelect }) {
    const Icon = solution.icon;

    return (
        <button
            type="button"
            onClick={() => onSelect(solution)}
            className="group h-full text-left"
        >
            <GlassCard className="h-full p-7 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-start justify-between gap-5">
                    <IconBox icon={Icon} />

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                        AI
                    </span>
                </div>

                <div className="mt-7">
                    <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                        {solution.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-6 text-blue-600 dark:text-blue-300">
                        {solution.short}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {solution.description}
                    </p>
                </div>

                <div className="mt-6 space-y-3">
                    {solution.points.map((point) => (
                        <div
                            key={point}
                            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                        >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-500" />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-7 flex items-center gap-2 text-sm font-bold text-slate-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-white">
                    Explore capability
                    <ArrowRight className="h-4 w-4" />
                </div>
            </GlassCard>
        </button>
    );
}


export default function AITransformation() {
    const navigate = useNavigate();

    const [activeSolution, setActiveSolution] = useState("strategy");
    const [openFaq, setOpenFaq] = useState(null);
    const [businessType, setBusinessType] = useState("Business");
    const [automationLevel, setAutomationLevel] = useState("Some");
    const [teamSize, setTeamSize] = useState("11–50");
    const [showEstimate, setShowEstimate] = useState(false);

    /* =========================================================
       SUPPORT HANDOFF
       ---------------------------------------------------------
       Every CTA on this page can queue a contextual request
       and continue the conversation in the support page.
    ========================================================= */

    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss AI, automation or digital transformation.",
            metadata: metadata || {
                Source: "AI & Transformation",
            },
        });

        navigate("/support/ai");
    };

    const selectedSolution = useMemo(
        () =>
            solutions.find((solution) => solution.id === activeSolution) ||
            solutions[0],
        [activeSolution]
    );

    const estimate = useMemo(() => {
        let score = 1;

        if (automationLevel === "Some") score += 1;
        if (automationLevel === "A lot") score += 2;
        if (automationLevel === "Almost everything") score += 3;

        if (teamSize === "51–250") score += 1;
        if (teamSize === "251–1000") score += 2;
        if (teamSize === "1000+") score += 3;

        if (businessType === "Enterprise") score += 2;

        if (score <= 2) {
            return {
                title: "Start with an AI Discovery",
                description:
                    "A focused discovery engagement can identify your highest-value opportunities before you invest heavily.",
            };
        }

        if (score <= 4) {
            return {
                title: "Start with a Pilot",
                description:
                    "A targeted AI or automation pilot could help you validate the idea, workflow and expected business value.",
            };
        }

        return {
            title: "Consider an AI Transformation Roadmap",
            description:
                "Your organization may benefit from a broader roadmap covering multiple workflows, systems, departments and automation opportunities.",
        };
    }, [automationLevel, teamSize, businessType]);

    return (
        <main className="relative overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050914] dark:text-white">

            {/* =========================================================
                BACKGROUND SYSTEM
            ========================================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-[-180px] top-[500px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
                <div className="absolute left-[30%] top-[1200px] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-3xl dark:bg-violet-500/10" />

                <div
                    className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(100,116,139,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.5) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>


            {/* =========================================================
                HERO
            ========================================================== */}

            <section className="relative isolate">
                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">

                        <div>
                            <SectionLabel>
                                AI • Automation • Digital Transformation
                            </SectionLabel>

                            <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Make your business
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent dark:from-blue-300 dark:via-cyan-300 dark:to-violet-300">
                                    work smarter.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                From your first idea to a fully deployed AI-powered
                                operation, we help you identify opportunities,
                                automate repetitive work, connect your systems,
                                build intelligent applications and modernize the
                                way your organization operates.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start with an AI discovery conversation for my organization.",
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Intent:
                                                    "AI discovery",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Start with an AI discovery
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <a
                                    href="#capabilities"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                                >
                                    Explore capabilities
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    ["AI Strategy", BrainCircuit],
                                    ["Automation", Workflow],
                                    ["AI Apps", Code2],
                                    ["Transformation", Rocket],
                                ].map(([label, Icon]) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${label} for our organization.`,
                                                {
                                                    Source:
                                                        "AI & Transformation",
                                                    Capability: label,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/60 px-3 py-3 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                    >
                                        <Icon className="h-4 w-4 text-blue-500" />
                                        <p className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {label}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>


                        {/* HERO AI VISUAL */}

                        <div className="relative">
                            <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl" />

                            <GlassCard className="relative overflow-hidden p-4 sm:p-5">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl dark:border-white/10">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                                                <BrainCircuit className="h-5 w-5 text-blue-300" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-white">
                                                    Intelligent Operations
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    AI orchestration layer
                                                </p>
                                            </div>
                                        </div>

                                        <span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            ACTIVE
                                        </span>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        {[
                                            ["Workflows", "24", Workflow],
                                            ["AI Agents", "08", Bot],
                                            ["Integrations", "17", PlugZap],
                                            ["Automations", "142", Zap],
                                        ].map(([label, value, Icon]) => (
                                            <div
                                                key={label}
                                                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                                            >
                                                <Icon className="h-4 w-4 text-blue-300" />

                                                <div className="mt-4 flex items-end justify-between">
                                                    <div>
                                                        <p className="text-2xl font-black text-white">
                                                            {value}
                                                        </p>
                                                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                            {label}
                                                        </p>
                                                    </div>

                                                    <TrendingUp className="h-4 w-4 text-emerald-300" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-white">
                                                    Process Automation
                                                </p>
                                                <p className="mt-1 text-[10px] text-slate-500">
                                                    Intelligent workflow activity
                                                </p>
                                            </div>

                                            <Gauge className="h-4 w-4 text-cyan-300" />
                                        </div>

                                        <div className="mt-5 space-y-3">
                                            {[72, 84, 64, 91].map((width, index) => (
                                                <div key={index}>
                                                    <div className="mb-1 flex justify-between text-[9px] text-slate-500">
                                                        <span>
                                                            {[
                                                                "Data processing",
                                                                "Customer workflows",
                                                                "Document intelligence",
                                                                "Internal automation",
                                                            ][index]}
                                                        </span>

                                                        <span>{width}%</span>
                                                    </div>

                                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                                                            style={{ width: `${width}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-blue-400/20 bg-blue-400/5 p-4">
                                        <Sparkles className="h-4 w-4 text-blue-300" />

                                        <p className="text-xs leading-5 text-slate-300">
                                            AI coordinates approved workflows while
                                            your team remains in control.
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>

                            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur sm:block dark:border-white/10 dark:bg-slate-900/90">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-300">
                                        <Check className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                                            Human oversight
                                        </p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                            Built into workflows
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================
                TRUST / POSITIONING
            ========================================================== */}

            <section className="relative border-y border-slate-200/80 bg-white/50 dark:border-white/10 dark:bg-white/[0.018]">
                <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: Lightbulb,
                                title: "Start from the problem",
                                text: "You don't need to arrive with a perfect AI specification.",
                            },
                            {
                                icon: Network,
                                title: "Connect what you already have",
                                text: "We can design around existing software, data, infrastructure and workflows.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Keep control",
                                text: "Responsible automation can include permissions, approvals, monitoring and human oversight.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss: ${item.title} — ${item.text}`,
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Topic: item.title,
                                            }
                                        )
                                    }
                                    className="flex gap-4 rounded-2xl p-3 text-left transition hover:bg-slate-100/60 dark:hover:bg-white/[0.04]"
                                >
                                    <IconBox icon={Icon} />

                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* =========================================================
                CAPABILITIES
            ========================================================== */}

            <section
                id="capabilities"
                className="relative scroll-mt-20 py-20 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>What we can build</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            AI should solve a business problem,
                            <span className="text-blue-600 dark:text-blue-300">
                                {" "}not just look impressive.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            Our AI and automation services cover the full journey:
                            strategy, discovery, design, development, integration,
                            deployment, training and continuous improvement.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {solutions.map((solution) => (
                            <SolutionCard
                                key={solution.id}
                                solution={solution}
                                onSelect={(s) =>
                                    startSupportChat(
                                        `I'd like to discuss ${s.title} — ${s.short}`,
                                        {
                                            Source:
                                                "AI & Transformation",
                                            Solution: s.title,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>


            {/* =========================================================
                INTERACTIVE SOLUTION EXPLORER
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-slate-200 bg-white/70 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10 dark:border-white/10 dark:bg-white/[0.035]">

                        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">

                            <div>
                                <SectionLabel>Solution explorer</SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                                    One partner across the AI lifecycle.
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    Explore the areas where we can help you move
                                    from an idea to a working, maintainable
                                    solution.
                                </p>

                                <div className="mt-7 space-y-2">
                                    {solutions.map((solution) => {
                                        const Icon = solution.icon;
                                        const active =
                                            activeSolution === solution.id;

                                        return (
                                            <button
                                                type="button"
                                                key={solution.id}
                                                onClick={() =>
                                                    setActiveSolution(
                                                        solution.id
                                                    )
                                                }
                                                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active
                                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
                                                    }`}
                                            >
                                                <Icon className="h-4 w-4 shrink-0" />

                                                <span className="flex-1 text-sm font-bold">
                                                    {solution.title}
                                                </span>

                                                <ChevronRight className="h-4 w-4 opacity-60" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>


                            <div>
                                <div className="relative overflow-hidden rounded-[1.7rem] bg-slate-950 p-7 sm:p-9">
                                    <div className="absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                                    <div className="absolute bottom-[-100px] left-[-100px] h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

                                    <div className="relative">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10">
                                                {React.createElement(
                                                    selectedSolution.icon,
                                                    {
                                                        className:
                                                            "h-6 w-6 text-blue-300",
                                                    }
                                                )}
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                                                    Capability
                                                </p>

                                                <h3 className="mt-1 text-2xl font-black text-white">
                                                    {selectedSolution.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-300">
                                            {selectedSolution.description}
                                        </p>

                                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                            {selectedSolution.points.map(
                                                (point) => (
                                                    <div
                                                        key={point}
                                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                                                    >
                                                        <div className="rounded-full bg-emerald-400/10 p-1.5">
                                                            <Check className="h-3.5 w-3.5 text-emerald-300" />
                                                        </div>

                                                        <span className="text-sm font-medium text-slate-200">
                                                            {point}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss ${selectedSolution.title} — ${selectedSolution.short}`,
                                                    {
                                                        Source:
                                                            "AI & Transformation",
                                                        Solution:
                                                            selectedSolution.title,
                                                    }
                                                )
                                            }
                                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100"
                                        >
                                            Discuss this capability
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================
                AUTOMATION BY DEPARTMENT
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>Automation opportunities</SectionLabel>

                        <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            Find repetitive work.
                            <span className="text-blue-600 dark:text-blue-300">
                                {" "}Then make it smarter.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                            AI automation can touch nearly every department,
                            but the right workflow depends on how your
                            organization actually operates.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {automationAreas.map((area) => {
                            const Icon = area.icon;

                            return (
                                <GlassCard
                                    key={area.title}
                                    className="p-6"
                                >
                                    <div className="flex items-center gap-4">
                                        <IconBox icon={Icon} />

                                        <h3 className="font-bold text-slate-950 dark:text-white">
                                            {area.title}
                                        </h3>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        {area.items.map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to explore automating: ${item} in ${area.title}.`,
                                                        {
                                                            Source:
                                                                "AI & Transformation",
                                                            Department:
                                                                area.title,
                                                            Workflow: item,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-left text-xs font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:bg-blue-500/[0.08] dark:hover:text-blue-300"
                                            >
                                                <Check className="h-3.5 w-3.5 text-blue-500" />
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </GlassCard>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* =========================================================
                AI AGENTS
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>
                            <SectionLabel>AI agents</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                More than a chatbot.
                                <span className="block text-blue-600 dark:text-blue-300">
                                    Build AI that helps get work done.
                                </span>
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A conversational interface is only one part of
                                modern AI. Depending on the use case, an agent
                                can retrieve approved information, reason over
                                tasks, call permitted tools, update systems and
                                escalate work to a person.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    [
                                        "Understand",
                                        "Interpret requests, documents and business context.",
                                    ],
                                    [
                                        "Reason",
                                        "Apply approved rules and workflows to determine the next step.",
                                    ],
                                    [
                                        "Act",
                                        "Use connected tools and systems where permissions allow.",
                                    ],
                                    [
                                        "Escalate",
                                        "Send exceptions and sensitive decisions to the appropriate person.",
                                    ],
                                ].map(([title, text], index) => (
                                    <div
                                        key={title}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white dark:bg-white dark:text-slate-950">
                                            {index + 1}
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">
                                                {title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss building an AI agent or copilot for our organization.",
                                        {
                                            Source:
                                                "AI & Transformation",
                                            Intent: "AI agent",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                            >
                                Discuss AI agents
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>


                        <GlassCard className="overflow-hidden p-3">
                            <div className="rounded-[1.5rem] bg-slate-950 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-blue-400/10 p-3">
                                            <Bot className="h-5 w-5 text-blue-300" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-white">
                                                Operations Agent
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Internal business assistant
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-300">
                                        ONLINE
                                    </div>
                                </div>

                                <div className="mt-7 space-y-4">
                                    <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] p-4">
                                        <p className="text-xs leading-6 text-slate-300">
                                            Show me the outstanding customer
                                            requests that require manager
                                            approval.
                                        </p>
                                    </div>

                                    <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-md bg-blue-600 p-4">
                                        <p className="text-xs leading-6 text-white">
                                            I found 7 requests. 3 are within
                                            your approval threshold and 4
                                            require manager review.
                                        </p>
                                    </div>

                                    <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-md border border-blue-400/20 bg-blue-400/5 p-4">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-300">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Workflow prepared
                                        </div>

                                        <p className="mt-2 text-xs leading-6 text-slate-300">
                                            I can prepare the approval package
                                            for your review. No action will be
                                            submitted without authorization.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-2">
                                    {[
                                        ["Knowledge", Database],
                                        ["Tools", PlugZap],
                                        ["Controls", ShieldCheck],
                                    ].map(([label, Icon]) => (
                                        <div
                                            key={label}
                                            className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
                                        >
                                            <Icon className="mx-auto h-4 w-4 text-slate-400" />
                                            <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                                {label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>

                    </div>
                </div>
            </section>


            {/* =========================================================
                DIGITAL TRANSFORMATION
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 p-6 sm:p-10 lg:p-14">
                        <div className="absolute" />

                        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

                            <div>
                                <SectionLabel>Digital transformation</SectionLabel>

                                <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                    Don't just add AI to an old process.
                                    <span className="block text-blue-300">
                                        Improve the process itself.
                                    </span>
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-slate-400">
                                    Transformation can involve much more than
                                    artificial intelligence. We can help connect
                                    applications, replace manual workflows,
                                    modernize systems, improve infrastructure,
                                    introduce automation and create better
                                    digital experiences.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss digital transformation for our organization.",
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Intent:
                                                    "Digital transformation",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100"
                                >
                                    Discuss transformation
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>


                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    [
                                        "Legacy modernization",
                                        ServerCog,
                                        "Modernize outdated applications and infrastructure.",
                                    ],
                                    [
                                        "System integration",
                                        Network,
                                        "Connect applications and data that currently operate separately.",
                                    ],
                                    [
                                        "Process redesign",
                                        Workflow,
                                        "Remove unnecessary manual steps before automating.",
                                    ],
                                    [
                                        "Data modernization",
                                        Database,
                                        "Improve how business information is stored, accessed and used.",
                                    ],
                                    [
                                        "Digital customer experience",
                                        MonitorSmartphone,
                                        "Create better portals, applications and digital journeys.",
                                    ],
                                    [
                                        "Operational intelligence",
                                        BarChart3,
                                        "Give decision makers clearer information about the business.",
                                    ],
                                ].map(([title, Icon, text]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${title} — ${text}`,
                                                {
                                                    Source:
                                                        "AI & Transformation",
                                                    "Transformation area":
                                                        title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:border-blue-400/30 hover:bg-white/[0.06]"
                                    >
                                        <Icon className="h-5 w-5 text-blue-300" />

                                        <h3 className="mt-4 text-sm font-bold text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-6 text-slate-500">
                                            {text}
                                        </p>
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================
                HOW WE WORK
            ========================================================== */}

            <section
                id="how-we-work"
                className="relative scroll-mt-20 py-20 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>How we work</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            From a simple idea to a working solution.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            You can come to us with a fully defined technical
                            specification or simply explain what is frustrating
                            your team. We can help turn the problem into a
                            practical technology roadmap.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {transformationStages.map((stage) => {
                            const Icon = stage.icon;

                            return (
                                <button
                                    type="button"
                                    key={stage.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the "${stage.title}" stage of an AI/transformation project.`,
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Stage: stage.title,
                                            }
                                        )
                                    }
                                    className="text-left"
                                >
                                    <GlassCard className="relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1">
                                        <span className="absolute right-5 top-4 text-5xl font-black text-slate-100 dark:text-white/[0.035]">
                                            {stage.number}
                                        </span>

                                        <Icon className="h-5 w-5 text-blue-500" />

                                        <h3 className="mt-6 font-bold text-slate-950 dark:text-white">
                                            {stage.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {stage.description}
                                        </p>
                                    </GlassCard>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* =========================================================
                INDUSTRIES
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>Industries & organizations</SectionLabel>

                        <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            Technology shaped around how
                            <span className="text-blue-600 dark:text-blue-300">
                                {" "}your organization works.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                            The same AI technology can produce very different
                            value depending on the industry, workflow,
                            regulations, data and people involved.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {industries.map((industry) => {
                            const Icon = industry.icon;

                            return (
                                <button
                                    type="button"
                                    key={industry.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss AI/transformation for ${industry.title}.`,
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Industry: industry.title,
                                            }
                                        )
                                    }
                                    className="text-left"
                                >
                                    <GlassCard className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                                        <IconBox icon={Icon} />

                                        <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">
                                            {industry.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {industry.description}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {industry.examples.map((example) => (
                                                <span
                                                    key={example}
                                                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-400"
                                                >
                                                    {example}
                                                </span>
                                            ))}
                                        </div>
                                    </GlassCard>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* =========================================================
                AI GOVERNANCE
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>
                            <SectionLabel>Responsible AI</SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Powerful technology needs
                                <span className="text-blue-600 dark:text-blue-300">
                                    {" "}clear boundaries.
                                </span>
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                AI should operate within clearly defined
                                permissions, data boundaries and business
                                rules. We design solutions with practical
                                controls appropriate to the use case.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    ["Access control", Lock],
                                    ["Human approval", Users],
                                    ["Auditability", ClipboardCheck],
                                    ["Data boundaries", Database],
                                    ["Monitoring", Gauge],
                                    ["Security planning", ShieldCheck],
                                ].map(([title, Icon]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${title.toLowerCase()} for AI governance.`,
                                                {
                                                    Source:
                                                        "AI & Transformation",
                                                    "Governance topic":
                                                        title,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                    >
                                        <Icon className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>


                        <GlassCard className="p-7 sm:p-9">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
                                        Control framework
                                    </p>

                                    <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                                        Designed for real organizations
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                {[
                                    [
                                        "Who can access the system?",
                                        "Permissions and role-based access can be incorporated.",
                                    ],
                                    [
                                        "What can the AI do?",
                                        "Actions can be limited to approved tools and workflows.",
                                    ],
                                    [
                                        "When should a person approve?",
                                        "Sensitive or high-impact workflows can require human confirmation.",
                                    ],
                                    [
                                        "What happened?",
                                        "Relevant workflow events can be recorded for operational review.",
                                    ],
                                ].map(([question, answer]) => (
                                    <div
                                        key={question}
                                        className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"
                                    >
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            {question}
                                        </p>

                                        <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                    </div>
                </div>
            </section>


            {/* =========================================================
                AI DISCOVERY / ESTIMATOR
            ========================================================== */}

            <section
                id="ai-discovery"
                className="relative scroll-mt-20 py-20 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 p-6 shadow-2xl shadow-blue-900/20 sm:p-10 lg:p-14">

                        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
                                    <WandSparkles className="h-3.5 w-3.5" />
                                    AI opportunity finder
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                    Not sure where to start?
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-blue-100">
                                    Give us a little context. This quick
                                    assessment can help frame the kind of
                                    engagement that may make sense for your
                                    organization.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "Start from your current problems",
                                        "Identify practical automation opportunities",
                                        "Prioritize high-value use cases",
                                        "Create a roadmap before major investment",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="rounded-full bg-white/10 p-1.5">
                                                <Check className="h-3.5 w-3.5 text-white" />
                                            </div>

                                            <span className="text-sm text-blue-50">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="rounded-[1.8rem] bg-white p-5 sm:p-7 dark:bg-slate-950">

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">
                                            Quick assessment
                                        </p>

                                        <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                                            Tell us about your organization
                                        </h3>
                                    </div>

                                    <BrainCircuit className="h-6 w-6 text-blue-500" />
                                </div>


                                <div className="mt-7 space-y-5">

                                    <div>
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            Organization type
                                        </label>

                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            {[
                                                "Business",
                                                "Enterprise",
                                            ].map((value) => (
                                                <button
                                                    type="button"
                                                    key={value}
                                                    onClick={() =>
                                                        setBusinessType(value)
                                                    }
                                                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${businessType === value
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-white/10 dark:text-slate-300"
                                                        }`}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>


                                    <div>
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            How much repetitive work do you
                                            currently have?
                                        </label>

                                        <div className="mt-2 grid gap-2 sm:grid-cols-3">
                                            {[
                                                "Very little",
                                                "Some",
                                                "A lot",
                                            ].map((value) => (
                                                <button
                                                    type="button"
                                                    key={value}
                                                    onClick={() =>
                                                        setAutomationLevel(value)
                                                    }
                                                    className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${automationLevel === value
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-white/10 dark:text-slate-300"
                                                        }`}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>


                                    <div>
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            Approximate team size
                                        </label>

                                        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                                            {[
                                                "1–10",
                                                "11–50",
                                                "51–250",
                                                "251–1000",
                                            ].map((value) => (
                                                <button
                                                    type="button"
                                                    key={value}
                                                    onClick={() =>
                                                        setTeamSize(value)
                                                    }
                                                    className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${teamSize === value
                                                        ? "border-blue-600 bg-blue-600 text-white"
                                                        : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-white/10 dark:text-slate-300"
                                                        }`}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowEstimate(true)
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                    >
                                        Find my starting point
                                        <ArrowRight className="h-4 w-4" />
                                    </button>


                                    {showEstimate && (
                                        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 dark:bg-blue-400/5">
                                            <div className="flex gap-3">
                                                <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-300">
                                                    <Sparkles className="h-4 w-4" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-black text-slate-950 dark:text-white">
                                                        {estimate.title}
                                                    </p>

                                                    <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                        {estimate.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Based on our assessment, we're considering: ${estimate.title}. ${estimate.description}`,
                                                        {
                                                            Source:
                                                                "AI & Transformation",
                                                            "Assessment result":
                                                                estimate.title,
                                                            "Organization type":
                                                                businessType,
                                                            "Repetitive work":
                                                                automationLevel,
                                                            "Team size":
                                                                teamSize,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-300"
                                            >
                                                Talk to us about it
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================
                WHAT YOU CAN BRING TO US
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Lightbulb,
                                title: "Just an idea",
                                text: "You have an idea but don't know what technology or architecture you need.",
                            },
                            {
                                icon: FileSearch,
                                title: "A business problem",
                                text: "Something is taking too much time, creating errors or slowing your team down.",
                            },
                            {
                                icon: Workflow,
                                title: "A manual process",
                                text: "Your employees repeatedly move information between people, spreadsheets and systems.",
                            },
                            {
                                icon: Code2,
                                title: "An existing system",
                                text: "You already have software but want to modernize, integrate or make it smarter.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `My starting point is: "${item.title}" — ${item.text}`,
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                "Starting point":
                                                    item.title,
                                            }
                                        )
                                    }
                                    className="text-left"
                                >
                                    <GlassCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                                        <Icon className="h-5 w-5 text-blue-500" />

                                        <h3 className="mt-5 font-bold text-slate-950 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </GlassCard>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* =========================================================
                POSSIBLE AI PRODUCTS
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>AI products we can create</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            From internal tools to customer-facing products.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            [
                                "AI Customer Portal",
                                "A branded customer experience with intelligent support and workflow capabilities.",
                                MonitorSmartphone,
                            ],
                            [
                                "Internal Company Copilot",
                                "A secure assistant that helps employees find information and complete approved tasks.",
                                Bot,
                            ],
                            [
                                "AI Document Platform",
                                "Upload, classify, extract and analyze business documents through a controlled workflow.",
                                FileSearch,
                            ],
                            [
                                "AI Sales Assistant",
                                "Help sales teams research prospects, prepare proposals and manage follow-ups.",
                                TrendingUp,
                            ],
                            [
                                "AI Operations Dashboard",
                                "Combine operational data, analytics and intelligent insights in one workspace.",
                                BarChart3,
                            ],
                            [
                                "AI Knowledge Base",
                                "Make approved company information easier for employees and customers to find.",
                                Database,
                            ],
                            [
                                "AI Request Assistant",
                                "Turn customer or employee requests into structured workflows.",
                                MessageSquare,
                            ],
                            [
                                "AI Procurement Assistant",
                                "Help organize requirements, compare options and prepare procurement workflows.",
                                ShoppingCart,
                            ],
                            [
                                "AI Training Platform",
                                "Create intelligent learning experiences, assessments and training workflows.",
                                GraduationCap,
                            ],
                        ].map(([title, text, Icon]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to explore building an ${title}. ${text}`,
                                        {
                                            Source:
                                                "AI & Transformation",
                                            "Product concept": title,
                                        }
                                    )
                                }
                                className="text-left"
                            >
                                <GlassCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                                    <IconBox icon={Icon} />

                                    <h3 className="mt-6 font-bold text-slate-950 dark:text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </GlassCard>
                            </button>
                        ))}
                    </div>
                </div>
            </section>


            {/* =========================================================
                INTEGRATIONS
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white/70 p-7 backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-white/[0.035]">

                        <div className="grid items-center gap-10 lg:grid-cols-[.7fr_1.3fr]">

                            <div>
                                <SectionLabel>Connected systems</SectionLabel>

                                <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                                    AI becomes more useful when it can work with the systems around it.
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    Where supported and appropriate, we can design
                                    integrations between AI solutions and existing
                                    business platforms.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss integrating AI with our existing business systems.",
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Intent:
                                                    "AI integrations",
                                            }
                                        )
                                    }
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Discuss integrations
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                {[
                                    ["CRM", BriefcaseBusiness],
                                    ["ERP", Boxes],
                                    ["Email", Mail],
                                    ["Databases", Database],
                                    ["Cloud", CloudCog],
                                    ["APIs", PlugZap],
                                    ["Web Apps", Globe2],
                                    ["Communication", MessageSquare],
                                ].map(([title, Icon]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to connect AI with our ${title} systems.`,
                                                {
                                                    Source:
                                                        "AI & Transformation",
                                                    "Integration target":
                                                        title,
                                                }
                                            )
                                        }
                                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:-translate-y-0.5 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/30"
                                    >
                                        <Icon className="h-5 w-5 text-blue-500" />

                                        <span className="mt-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                                            {title}
                                        </span>
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================
                BEFORE / AFTER
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>Transformation mindset</SectionLabel>

                        <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Move from fragmented work
                            <span className="text-blue-600 dark:text-blue-300">
                                {" "}to connected operations.
                            </span>
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-2">

                        <GlassCard className="p-7">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-rose-500/10 p-3 text-rose-600 dark:text-rose-300">
                                    <Clock3 className="h-5 w-5" />
                                </div>

                                <h3 className="font-black text-slate-950 dark:text-white">
                                    Before
                                </h3>
                            </div>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Employees repeatedly enter the same information.",
                                    "Important knowledge is scattered across documents.",
                                    "Approvals happen through long email chains.",
                                    "Reports require manual spreadsheet work.",
                                    "Customers wait for simple answers.",
                                    "Systems do not communicate effectively.",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600 dark:bg-white/[0.035] dark:text-slate-400"
                                    >
                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-400" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </GlassCard>


                        <GlassCard className="border-blue-500/20 p-7">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                                    <Zap className="h-5 w-5" />
                                </div>

                                <h3 className="font-black text-slate-950 dark:text-white">
                                    After
                                </h3>
                            </div>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Information flows automatically between approved systems.",
                                    "Employees can search company knowledge intelligently.",
                                    "Approvals follow structured workflows.",
                                    "Reports can be generated from connected data.",
                                    "AI assistants handle common requests.",
                                    "People focus on decisions instead of repetitive administration.",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex gap-3 rounded-xl bg-blue-500/5 p-3 text-sm text-slate-600 dark:text-slate-300"
                                    >
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                    </div>
                </div>
            </section>


            {/* =========================================================
                ENGAGEMENT MODELS
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>Ways we can work together</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Start small or build something substantial.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            Not every organization needs a massive transformation
                            project. We can structure engagements around the
                            problem, scope and stage you are actually at.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "Discovery",
                                icon: Search,
                                text: "Understand your processes and identify practical opportunities.",
                            },
                            {
                                title: "Pilot",
                                icon: Play,
                                text: "Build a focused proof of concept around one valuable workflow.",
                            },
                            {
                                title: "Implementation",
                                icon: Rocket,
                                text: "Develop and deploy a production-ready solution.",
                            },
                            {
                                title: "Managed",
                                icon: ServerCog,
                                text: "Continue improving, supporting and maintaining the solution.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss an ${item.title} engagement for AI/transformation. ${item.text}`,
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Engagement: item.title,
                                            }
                                        )
                                    }
                                    className="text-left"
                                >
                                    <GlassCard className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                                        <IconBox icon={Icon} />

                                        <h3 className="mt-6 font-bold text-slate-950 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-300">
                                            Learn more
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </div>
                                    </GlassCard>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* =========================================================
                FAQ
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>Frequently asked questions</SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Questions before you begin.
                        </h2>
                    </div>

                    <div className="mt-10 space-y-3">
                        {faqItems.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center gap-4 px-5 py-5 text-left"
                                    >
                                        <span className="flex-1 text-sm font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""
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
                                            <div className="px-5 pb-5">
                                                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                    {faq.answer}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I have a question about: "${faq.question}"`,
                                                            {
                                                                Source:
                                                                    "AI & Transformation",
                                                                FAQ: faq.question,
                                                            }
                                                        )
                                                    }
                                                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:gap-3 dark:text-blue-300"
                                                >
                                                    Discuss this with AB AI
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* =========================================================
                FINAL CTA
            ========================================================== */}

            <section
                id="contact"
                className="relative scroll-mt-20 py-20 lg:py-32"
            >
                <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-900/10 sm:p-12 lg:p-16 dark:border-white/10 dark:bg-white/[0.045]">

                        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                <BrainCircuit className="h-7 w-7" />
                            </div>

                            <h2 className="mx-auto mt-7 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                Have an idea, a problem or a process you want to improve?
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400">
                                You don't have to know exactly what AI technology
                                you need. Tell us what you are trying to achieve,
                                and we can help you explore the technology,
                                architecture and implementation path.
                            </p>

                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to request an AI consultation for our organization.",
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Intent:
                                                    "AI consultation",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-300"
                                >
                                    Request an AI consultation
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to submit an AI or transformation project idea.",
                                            {
                                                Source:
                                                    "AI & Transformation",
                                                Intent:
                                                    "Project idea",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-7 py-4 text-sm font-bold text-slate-800 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                                >
                                    Submit a project idea
                                    <MessageSquare className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    Start from scratch
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    Work with existing systems
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    Scale when ready
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================
                SERVICE FOOTER STRIP
            ========================================================== */}

            <section className="relative border-t border-slate-200 bg-white/50 dark:border-white/10 dark:bg-white/[0.018]">
                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-4">

                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                    <BrainCircuit className="h-5 w-5" />
                                </div>

                                <span className="font-black text-slate-950 dark:text-white">
                                    AI & Transformation
                                </span>
                            </div>

                            <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                Practical AI, automation and digital
                                transformation designed around real business
                                needs.
                            </p>
                        </div>


                        <div>
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                AI
                            </h3>

                            <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                                <p>AI strategy</p>
                                <p>AI agents</p>
                                <p>AI applications</p>
                                <p>Document intelligence</p>
                            </div>
                        </div>


                        <div>
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                Automation
                            </h3>

                            <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                                <p>Workflow automation</p>
                                <p>Business process automation</p>
                                <p>System integration</p>
                                <p>Operational automation</p>
                            </div>
                        </div>


                        <div>
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                Transformation
                            </h3>

                            <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                                <p>Legacy modernization</p>
                                <p>Digital products</p>
                                <p>Data modernization</p>
                                <p>Managed improvement</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}