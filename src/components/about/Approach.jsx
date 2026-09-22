import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    BrainCircuit,
    Building2,
    Check,
    ChevronDown,
    ClipboardCheck,
    Cloud,
    Code2,
    Compass,
    Cpu,
    Database,
    FileCheck2,
    Gauge,
    Handshake,
    Layers3,
    Lightbulb,
    LockKeyhole,
    Network,
    PackageCheck,
    Puzzle,
    Search,
    Settings2,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
    Workflow,
    Wrench,
    Zap,
} from "lucide-react";

export default function OurApproach() {
    const navigate = useNavigate();
    const [activePhase, setActivePhase] = useState("01");

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss the right technology approach for our organization.",
            metadata: {
                Source: "Our Approach",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };
    const [openFaq, setOpenFaq] = useState(null);

    const phases = [
        {
            id: "01",
            number: "01",
            title: "Understand",
            subtitle: "Start with the business",
            description:
                "Before recommending technology, we work to understand the organization, its objectives, current environment, users, constraints and the outcomes it needs to achieve.",
            icon: Search,
            color: "blue",
            activities: [
                "Business requirements discovery",
                "Stakeholder conversations",
                "Current-state assessment",
                "Technology environment review",
                "Operational workflow analysis",
                "Requirements documentation",
            ],
            outputs: [
                "Requirements brief",
                "Current-state understanding",
                "Priority areas",
                "Initial opportunity map",
            ],
        },
        {
            id: "02",
            number: "02",
            title: "Plan",
            subtitle: "Turn needs into a clear direction",
            description:
                "We translate business requirements into a practical technology direction, balancing functionality, security, scalability, budget, usability and long-term sustainability.",
            icon: Compass,
            color: "indigo",
            activities: [
                "Solution planning",
                "Architecture definition",
                "Technology evaluation",
                "Budget considerations",
                "Implementation planning",
                "Risk identification",
            ],
            outputs: [
                "Solution direction",
                "Technology recommendations",
                "Implementation roadmap",
                "Priority sequence",
            ],
        },
        {
            id: "03",
            number: "03",
            title: "Design",
            subtitle: "Build the solution blueprint",
            description:
                "We develop a detailed solution structure that explains how the selected technologies, systems, users, infrastructure and processes should work together.",
            icon: Layers3,
            color: "violet",
            activities: [
                "Solution architecture",
                "Infrastructure design",
                "Application design",
                "Network design",
                "Security architecture",
                "Integration planning",
            ],
            outputs: [
                "Technical architecture",
                "Solution specifications",
                "Integration plan",
                "Deployment design",
            ],
        },
        {
            id: "04",
            number: "04",
            title: "Source",
            subtitle: "Acquire the right technology",
            description:
                "Where products, hardware, licenses or third-party services are required, we support sourcing and procurement around the agreed technical and commercial requirements.",
            icon: PackageCheck,
            color: "cyan",
            activities: [
                "Product specification",
                "Vendor evaluation",
                "Competitive quotations",
                "Hardware sourcing",
                "Software licensing",
                "Procurement coordination",
            ],
            outputs: [
                "Approved specifications",
                "Vendor options",
                "Commercial comparison",
                "Procurement plan",
            ],
        },
        {
            id: "05",
            number: "05",
            title: "Build",
            subtitle: "Configure and implement",
            description:
                "We move from planning to execution by configuring infrastructure, deploying applications, integrating systems and putting the technology into operational use.",
            icon: Settings2,
            color: "emerald",
            activities: [
                "Infrastructure deployment",
                "Software implementation",
                "Configuration",
                "System integration",
                "Data migration",
                "Environment setup",
            ],
            outputs: [
                "Configured environment",
                "Integrated systems",
                "Operational technology",
                "Implementation documentation",
            ],
        },
        {
            id: "06",
            number: "06",
            title: "Secure",
            subtitle: "Protect the environment",
            description:
                "Security is considered throughout implementation rather than treated as an afterthought. We incorporate appropriate controls into systems, infrastructure and access.",
            icon: ShieldCheck,
            color: "rose",
            activities: [
                "Access control",
                "Identity configuration",
                "Endpoint security",
                "Network protection",
                "Backup considerations",
                "Security review",
            ],
            outputs: [
                "Security controls",
                "Access structure",
                "Protection measures",
                "Security recommendations",
            ],
        },
        {
            id: "07",
            number: "07",
            title: "Enable",
            subtitle: "Prepare people for adoption",
            description:
                "Technology only creates value when people can use it effectively. We support user onboarding, documentation, knowledge transfer and practical adoption.",
            icon: Users,
            color: "amber",
            activities: [
                "User onboarding",
                "Administrator training",
                "Knowledge transfer",
                "Documentation",
                "Process guidance",
                "Adoption support",
            ],
            outputs: [
                "Trained users",
                "Operational documentation",
                "Knowledge transfer",
                "Adoption readiness",
            ],
        },
        {
            id: "08",
            number: "08",
            title: "Operate",
            subtitle: "Keep technology working",
            description:
                "After deployment, we can provide ongoing support, maintenance, monitoring and operational assistance to help keep the environment dependable.",
            icon: Wrench,
            color: "orange",
            activities: [
                "Technical support",
                "Maintenance",
                "Monitoring",
                "Troubleshooting",
                "Performance reviews",
                "Operational assistance",
            ],
            outputs: [
                "Supported environment",
                "Issue resolution",
                "Maintenance activity",
                "Operational visibility",
            ],
        },
        {
            id: "09",
            number: "09",
            title: "Improve",
            subtitle: "Keep moving forward",
            description:
                "Technology environments should evolve. We review performance, changing requirements and opportunities to improve efficiency, security, automation and user experience.",
            icon: Sparkles,
            color: "sky",
            activities: [
                "Performance assessment",
                "Technology reviews",
                "Process improvement",
                "Automation opportunities",
                "Technology refresh",
                "Future planning",
            ],
            outputs: [
                "Improvement priorities",
                "Optimization opportunities",
                "Technology roadmap updates",
                "Future recommendations",
            ],
        },
    ];

    const principles = [
        {
            title: "Business first",
            description:
                "Technology decisions should support a real business objective, operational requirement or measurable improvement.",
            icon: Building2,
        },
        {
            title: "Clarity before complexity",
            description:
                "We aim to make technology easier to understand, operate and manage rather than adding unnecessary complexity.",
            icon: Lightbulb,
        },
        {
            title: "Fit over hype",
            description:
                "New technology can be valuable, but we evaluate whether it is actually appropriate for the organization before recommending it.",
            icon: BadgeCheck,
        },
        {
            title: "Security throughout",
            description:
                "Security considerations are incorporated into architecture, access, infrastructure, applications and operational processes.",
            icon: LockKeyhole,
        },
        {
            title: "Designed to evolve",
            description:
                "Where practical, solutions are designed so organizations can expand, integrate and adapt without unnecessary disruption.",
            icon: Workflow,
        },
        {
            title: "People matter",
            description:
                "Users, administrators and decision-makers are part of the solution. Adoption and usability matter as much as technical capability.",
            icon: Users,
        },
    ];

    const capabilities = [
        {
            title: "IT infrastructure",
            description:
                "Networks, endpoints, servers, connectivity, infrastructure architecture and technology environments.",
            icon: Network,
        },
        {
            title: "Cloud & digital infrastructure",
            description:
                "Cloud hosting, migration, infrastructure modernization, backup and digital platforms.",
            icon: Cloud,
        },
        {
            title: "Software & applications",
            description:
                "Business applications, custom software, portals, internal systems and application modernization.",
            icon: Code2,
        },
        {
            title: "Data & analytics",
            description:
                "Data platforms, reporting, dashboards, information flows and analytics capabilities.",
            icon: Database,
        },
        {
            title: "AI & automation",
            description:
                "Practical AI assistants, intelligent workflows, automation and process optimization.",
            icon: BrainCircuit,
        },
        {
            title: "Security",
            description:
                "Security architecture, access controls, endpoint protection and technology risk considerations.",
            icon: ShieldCheck,
        },
        {
            title: "Procurement",
            description:
                "Hardware sourcing, software licensing, competitive quotations and technology acquisition.",
            icon: PackageCheck,
        },
        {
            title: "Managed support",
            description:
                "Technical assistance, maintenance, monitoring and ongoing technology operations.",
            icon: Wrench,
        },
    ];

    const engagementModels = [
        {
            title: "Project delivery",
            description:
                "A defined technology project with a clear scope, timeline, deliverables and implementation plan.",
            icon: Target,
            points: [
                "Defined project scope",
                "Implementation milestones",
                "Technical deliverables",
                "Project handover",
            ],
        },
        {
            title: "Technology advisory",
            description:
                "Independent guidance for organizations evaluating technology options, modernization plans or investment decisions.",
            icon: Compass,
            points: [
                "Requirements analysis",
                "Technology assessment",
                "Roadmap planning",
                "Decision support",
            ],
        },
        {
            title: "Procurement & sourcing",
            description:
                "Support when an organization needs to identify, compare, source and acquire technology products or services.",
            icon: PackageCheck,
            points: [
                "Specification development",
                "Supplier evaluation",
                "Quotation comparison",
                "Procurement coordination",
            ],
        },
        {
            title: "Managed technology",
            description:
                "Ongoing assistance for organizations that need continued operational support after implementation.",
            icon: Wrench,
            points: [
                "Technical support",
                "Maintenance",
                "Monitoring",
                "Continuous improvement",
            ],
        },
    ];

    const decisionFactors = [
        {
            title: "Requirement",
            description:
                "What problem are we actually trying to solve?",
            icon: ClipboardCheck,
        },
        {
            title: "Users",
            description:
                "Who will use, manage and depend on the solution?",
            icon: Users,
        },
        {
            title: "Environment",
            description:
                "What systems, infrastructure and constraints already exist?",
            icon: Network,
        },
        {
            title: "Security",
            description:
                "What protection, access and operational controls are required?",
            icon: ShieldCheck,
        },
        {
            title: "Scalability",
            description:
                "How might the organization and workload change over time?",
            icon: Gauge,
        },
        {
            title: "Economics",
            description:
                "What investment, operating cost and value should be considered?",
            icon: BarChart3,
        },
    ];

    const outcomes = [
        "Clearer technology decisions",
        "Better alignment between IT and business objectives",
        "More structured procurement",
        "Reduced implementation surprises",
        "Improved user adoption",
        "Stronger operational visibility",
        "Better technology lifecycle planning",
        "A foundation for future growth",
    ];

    const faqs = [
        {
            question: "Do you always start with a formal assessment?",
            answer:
                "Not necessarily. The depth of discovery depends on the size and complexity of the requirement. A small procurement request may require a focused specification review, while a major transformation may require a much deeper assessment.",
        },
        {
            question: "Do you recommend specific brands?",
            answer:
                "We can recommend products and technology ecosystems where appropriate, but recommendations should be based on the requirement, compatibility, security, lifecycle, availability, budget and other relevant factors.",
        },
        {
            question: "Can AB Technologies work with our existing systems?",
            answer:
                "Yes. Existing systems are often an important part of the starting point. We can assess what should be retained, improved, integrated, replaced or gradually modernized.",
        },
        {
            question: "Can you handle both software and hardware?",
            answer:
                "Yes. Our approach is designed to connect software, hardware, networking, cloud, security, procurement and support when the project requires multiple technology layers.",
        },
        {
            question: "What happens after implementation?",
            answer:
                "Depending on the engagement, we can provide documentation, training, technical support, maintenance, monitoring and improvement planning after the initial implementation.",
        },
        {
            question: "Can you work with our internal IT team?",
            answer:
                "Yes. We can work alongside internal teams, complement existing capabilities, provide specialist support or take responsibility for agreed parts of a project.",
        },
    ];

    const activePhaseData =
        phases.find((phase) => phase.id === activePhase) || phases[0];

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.13),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.10),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.08),transparent_35%)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.20),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.10),transparent_35%)]" />

                <div className="absolute left-[-12rem] top-32 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="absolute right-[-10rem] top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">

                    <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">

                        <div>

                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <Compass className="h-4 w-4" />
                                Our Approach
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
                                Technology decisions with{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300">
                                    purpose.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:text-xl">
                                Our approach connects business objectives,
                                people, technology and execution. We focus on
                                understanding the problem first, then building
                                practical solutions that can be deployed,
                                adopted, supported and improved.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                                <a
                                    href="#process"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Explore our process
                                    <ArrowRight className="h-4 w-4" />
                                </a>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss the right technology approach for our organization.",
                                            { Intent: "Start conversation" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                                >
                                    Start a conversation
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">

                                {[
                                    "Business-led",
                                    "Security-conscious",
                                    "Vendor-aware",
                                    "Scalable",
                                    "Outcome-focused",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-bold text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                                    >
                                        {item}
                                    </span>
                                ))}

                            </div>
                        </div>

                        {/* HERO PROCESS CARD */}

                        <div className="relative">

                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30 sm:p-7">

                                <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">

                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            Delivery framework
                                        </p>

                                        <h2 className="mt-2 text-lg font-black">
                                            From idea to operation
                                        </h2>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                        <Workflow className="h-5 w-5" />
                                    </div>

                                </div>

                                <div className="relative mt-7">

                                    <div className="absolute bottom-5 left-[17px] top-5 w-px bg-slate-200 dark:bg-white/10" />

                                    <div className="space-y-4">

                                        {[
                                            ["Understand", "Business & requirements"],
                                            ["Plan", "Architecture & direction"],
                                            ["Build", "Technology & implementation"],
                                            ["Enable", "People & adoption"],
                                            ["Operate", "Support & improvement"],
                                        ].map(([title, subtitle], index) => (
                                            <div
                                                key={title}
                                                className="relative flex items-center gap-4"
                                            >
                                                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-xs font-black text-blue-600 dark:border-blue-400/20 dark:bg-slate-900 dark:text-blue-400">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>

                                                <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.035]">
                                                    <div className="text-sm font-black">
                                                        {title}
                                                    </div>

                                                    <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                        {subtitle}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-400/10 dark:bg-blue-500/[0.07]">
                                    <div className="flex gap-3">
                                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                            The goal is not simply to deploy
                                            technology. The goal is to make it
                                            useful, usable and sustainable.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRO
            ========================================================= */}

            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                The AB Technologies approach
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Start with the outcome, not the product.
                            </h2>
                        </div>

                        <div className="space-y-6 text-base leading-8 text-slate-600 dark:text-slate-300">

                            <p>
                                Technology projects can become complicated
                                quickly when organizations begin with products
                                instead of problems. Our approach starts by
                                understanding what the organization is trying
                                to accomplish.
                            </p>

                            <p>
                                We then consider the people involved, the
                                existing environment, technical requirements,
                                security, budget, implementation realities and
                                the organization's longer-term direction.
                            </p>

                            <p>
                                The result should be a technology decision that
                                makes sense not only on paper, but also when
                                people begin using it in the real world.
                            </p>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                PRINCIPLES
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-100 py-20 dark:bg-slate-950 lg:py-28">

                <div className="absolute right-[-8rem] top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            What guides us
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Principles behind every engagement.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Our methodology is flexible, but the principles
                            behind it remain consistent.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {principles.map(
                            ({ title, description, icon: Icon }) => (
                                <article
                                    key={title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>
                                </article>
                            )
                        )}

                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCESS
            ========================================================= */}

            <section
                id="process"
                className="bg-white py-20 dark:bg-slate-900 lg:py-28"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Our delivery process
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            A structured path from requirement to result.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Not every engagement requires every step at the
                            same depth. We scale the process according to the
                            complexity, risk and objectives of the work.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">

                        {/* Phase selector */}

                        <div className="space-y-2">

                            {phases.map((phase) => {
                                const Icon = phase.icon;
                                const active = phase.id === activePhase;

                                return (
                                    <button
                                        key={phase.id}
                                        type="button"
                                        onClick={() =>
                                            setActivePhase(phase.id)
                                        }
                                        className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${active
                                            ? "border-blue-300 bg-blue-50 shadow-sm dark:border-blue-400/30 dark:bg-blue-500/[0.08]"
                                            : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/20 dark:hover:bg-white/[0.045]"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${active
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-slate-500 dark:bg-white/10 dark:text-slate-300"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black tracking-wider text-slate-400">
                                                    {phase.number}
                                                </span>

                                                <span className="text-sm font-black">
                                                    {phase.title}
                                                </span>
                                            </div>

                                            <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                                                {phase.subtitle}
                                            </p>
                                        </div>

                                        <ArrowRight
                                            className={`h-4 w-4 shrink-0 transition ${active
                                                ? "translate-x-0 text-blue-600 dark:text-blue-400"
                                                : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-600"
                                                }`}
                                        />
                                    </button>
                                );
                            })}

                        </div>

                        {/* Active phase */}

                        <div className="relative">

                            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-500/5 blur-2xl dark:bg-blue-500/10" />

                            <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035] sm:p-9">

                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                            <activePhaseData.icon className="h-7 w-7" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                                Phase{" "}
                                                {activePhaseData.number}
                                            </p>

                                            <h3 className="mt-1 text-2xl font-black">
                                                {activePhaseData.title}
                                            </h3>
                                        </div>

                                    </div>

                                    <span className="self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                                        {activePhaseData.subtitle}
                                    </span>

                                </div>

                                <p className="mt-7 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    {activePhaseData.description}
                                </p>

                                <div className="mt-8 grid gap-8 sm:grid-cols-2">

                                    <div>
                                        <h4 className="text-sm font-black">
                                            What we do
                                        </h4>

                                        <div className="mt-4 space-y-3">
                                            {activePhaseData.activities.map(
                                                (item) => (
                                                    <div
                                                        key={item}
                                                        className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                                                    >
                                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                                        {item}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-black">
                                            Typical outputs
                                        </h4>

                                        <div className="mt-4 space-y-3">
                                            {activePhaseData.outputs.map(
                                                (item) => (
                                                    <div
                                                        key={item}
                                                        className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                                                    >
                                                        <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                                        {item}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-400/10 dark:bg-slate-900">
                                    <div className="flex gap-3">
                                        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <div>
                                            <p className="text-sm font-black">
                                                Why this phase matters
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                Good execution depends on
                                                good decisions earlier in the
                                                process. This stage helps
                                                create the clarity needed for
                                                the next step.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </article>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                DISCOVERY
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                01 — Discovery
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                We ask what needs to change.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A strong solution starts with a clear
                                understanding of the current situation. We
                                look beyond the requested product to understand
                                the underlying operational requirement.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "What is the organization trying to achieve?",
                                    "What is currently slowing people or processes down?",
                                    "What systems already exist?",
                                    "What needs to integrate?",
                                    "What constraints should be considered?",
                                    "What would success look like?",
                                ].map((question) => (
                                    <div
                                        key={question}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>

                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {question}
                                        </p>
                                    </div>
                                ))}

                            </div>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    title: "People",
                                    text: "Users, administrators, decision-makers and stakeholders.",
                                    icon: Users,
                                },
                                {
                                    title: "Process",
                                    text: "How work currently flows through the organization.",
                                    icon: Workflow,
                                },
                                {
                                    title: "Technology",
                                    text: "Existing applications, infrastructure and platforms.",
                                    icon: Cpu,
                                },
                                {
                                    title: "Constraints",
                                    text: "Budget, timing, compatibility, skills and operational limitations.",
                                    icon: ClipboardCheck,
                                },
                            ].map(({ title, text, icon: Icon }) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                DECISION FRAMEWORK
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Decision framework
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Before choosing technology, we consider the context.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Technology selection becomes more reliable when
                            decisions are evaluated from multiple angles.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {decisionFactors.map(
                            ({ title, description, icon: Icon }) => (
                                <div
                                    key={title}
                                    className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/30 dark:hover:bg-white/[0.05]"
                                >
                                    <div className="flex items-start justify-between">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm dark:bg-white/10 dark:text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-blue-500 dark:text-slate-600" />

                                    </div>

                                    <h3 className="mt-6 font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>

                                </div>
                            )
                        )}

                    </div>
                </div>
            </section>

            {/* =========================================================
                SOLUTION DESIGN
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(6,182,212,0.14),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                                02 — Solution design
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Connect the pieces before deploying them.
                            </h2>

                            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                                Applications, infrastructure, data, security,
                                users and processes should be considered as
                                parts of one environment. Our solution design
                                work focuses on how those components interact.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-2">
                                {[
                                    "Architecture",
                                    "Integration",
                                    "Security",
                                    "Scalability",
                                    "Performance",
                                    "Usability",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                        </div>

                        <div className="relative">

                            <div className="grid grid-cols-2 gap-4">

                                {[
                                    {
                                        icon: Code2,
                                        title: "Applications",
                                    },
                                    {
                                        icon: Network,
                                        title: "Infrastructure",
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Security",
                                    },
                                    {
                                        icon: Database,
                                        title: "Data",
                                    },
                                ].map(({ icon: Icon, title }) => (
                                    <div
                                        key={title}
                                        className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <p className="mt-5 text-sm font-black">
                                            {title}
                                        </p>
                                    </div>
                                ))}

                            </div>

                            <div className="mx-auto my-[-1px] flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15 text-blue-300 backdrop-blur">
                                <Puzzle className="h-7 w-7" />
                            </div>

                            <div className="rounded-3xl border border-blue-400/20 bg-blue-500/[0.08] p-6 text-center">
                                <p className="text-sm font-black">
                                    Integrated solution
                                </p>

                                <p className="mt-2 text-xs leading-6 text-slate-400">
                                    The technology layers work together around
                                    one business requirement.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

                        <div className="relative">

                            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-500/5 blur-2xl dark:bg-blue-500/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">

                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            Sourcing logic
                                        </p>

                                        <h3 className="mt-1 font-black">
                                            Requirement → Specification
                                        </h3>
                                    </div>

                                    <PackageCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />

                                </div>

                                <div className="mt-6 space-y-4">

                                    {[
                                        "Understand requirement",
                                        "Define specification",
                                        "Identify suitable options",
                                        "Compare commercial terms",
                                        "Validate compatibility",
                                        "Coordinate procurement",
                                    ].map((item, index) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                {index + 1}
                                            </div>

                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {item}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                                <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.035]">
                                    <p className="text-xs font-bold leading-6 text-slate-500 dark:text-slate-400">
                                        Procurement is treated as part of the
                                        solution lifecycle, not as an isolated
                                        transaction.
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                03 — Source & procure
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Procurement starts with the specification.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Whether you need laptops for a growing team,
                                networking infrastructure, servers, software
                                subscriptions or a larger technology
                                deployment, we work from the agreed
                                requirements.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                This helps keep procurement connected to
                                compatibility, intended use, deployment,
                                support and the wider technology environment.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {[
                                    "Technical specifications",
                                    "Vendor comparison",
                                    "Competitive quotations",
                                    "Product verification",
                                    "Sourcing coordination",
                                    "Delivery planning",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />

                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                IMPLEMENTATION
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            04 — Implementation
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Move from plans to working systems.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Implementation is where architecture, technology
                            and people meet. We focus on controlled execution,
                            validation and operational readiness.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-4">

                        {[
                            {
                                title: "Prepare",
                                icon: ClipboardCheck,
                                text: "Confirm prerequisites, environments, dependencies and implementation requirements.",
                            },
                            {
                                title: "Deploy",
                                icon: Cpu,
                                text: "Install, configure and establish the required technology components.",
                            },
                            {
                                title: "Integrate",
                                icon: Puzzle,
                                text: "Connect systems, applications, data and workflows where required.",
                            },
                            {
                                title: "Validate",
                                icon: BadgeCheck,
                                text: "Test functionality, access, performance and operational readiness.",
                            },
                        ].map(({ title, icon: Icon, text }, index) => (
                            <article
                                key={title}
                                className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035]"
                            >
                                <div className="absolute right-6 top-6 text-xs font-black text-slate-300 dark:text-slate-700">
                                    0{index + 1}
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-6 font-black">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {text}
                                </p>
                            </article>
                        ))}

                    </div>
                </div>
            </section>

            {/* =========================================================
                SECURITY
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">

                <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                                05 — Security
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Security belongs inside the approach.
                            </h2>

                            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                                Security should not be something added after
                                the environment has already been designed.
                                Appropriate security considerations should
                                influence architecture, identity, access,
                                devices, networks, applications and operations.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "Identity and access",
                                    "Endpoint protection",
                                    "Network security",
                                    "Data protection",
                                    "Backup and recovery",
                                    "Operational security",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                                            <ShieldCheck className="h-4 w-4" />
                                        </div>

                                        <span className="text-sm font-semibold text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    title: "Identity",
                                    icon: LockKeyhole,
                                    text: "Control who can access systems and resources.",
                                },
                                {
                                    title: "Infrastructure",
                                    icon: Network,
                                    text: "Protect networks, devices and infrastructure.",
                                },
                                {
                                    title: "Data",
                                    icon: Database,
                                    text: "Consider how sensitive information is stored and handled.",
                                },
                                {
                                    title: "Continuity",
                                    icon: ShieldCheck,
                                    text: "Plan for recovery and continued operation.",
                                },
                            ].map(({ title, icon: Icon, text }) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-white/10 bg-white/[0.045] p-7"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                PEOPLE AND ADOPTION
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                06 — Enable people
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Technology is only useful when people can use it.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Successful technology adoption depends on more
                                than installation. People need to understand
                                what is changing, why it matters and how to use
                                the new environment effectively.
                            </p>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    title: "User onboarding",
                                    text: "Help users understand new tools, workflows and systems.",
                                    icon: Users,
                                },
                                {
                                    title: "Documentation",
                                    text: "Create practical references for users and administrators.",
                                    icon: FileCheck2,
                                },
                                {
                                    title: "Training",
                                    text: "Provide knowledge transfer appropriate to the environment.",
                                    icon: Lightbulb,
                                },
                                {
                                    title: "Change support",
                                    text: "Help teams move from the old way of working to the new environment.",
                                    icon: Workflow,
                                },
                            ].map(({ title, text, icon: Icon }) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPORT AND OPERATIONS
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div className="order-2 lg:order-1">

                            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            Operational lifecycle
                                        </p>

                                        <h3 className="mt-2 font-black">
                                            Monitor → Maintain → Improve
                                        </h3>
                                    </div>

                                    <Gauge className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-3">

                                    {[
                                        {
                                            title: "Monitor",
                                            icon: Gauge,
                                        },
                                        {
                                            title: "Maintain",
                                            icon: Wrench,
                                        },
                                        {
                                            title: "Improve",
                                            icon: Sparkles,
                                        },
                                    ].map(({ title, icon: Icon }) => (
                                        <div
                                            key={title}
                                            className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-white/10 dark:bg-slate-900"
                                        >
                                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <p className="mt-3 text-sm font-black">
                                                {title}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                                    <div className="h-full w-[78%] rounded-full bg-blue-600" />
                                </div>

                                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                    Technology should be managed as an
                                    ongoing lifecycle.
                                </p>

                            </div>

                        </div>

                        <div className="order-1 lg:order-2">

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                07 — Operate & improve
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Delivery is not the finish line.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Once technology is deployed, the organization
                                begins using it in the real world. Requirements
                                change. Users change. Systems grow. New risks
                                emerge. Our approach allows technology to be
                                supported and improved over time.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "Technical support and troubleshooting",
                                    "Maintenance and operational assistance",
                                    "Performance and environment reviews",
                                    "Technology refresh planning",
                                    "Automation opportunities",
                                    "Future roadmap discussions",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                CAPABILITIES
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Across the technology lifecycle
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            One approach across multiple capabilities.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Your requirement may involve one technology layer or
                            several. Our approach is designed to connect the
                            pieces when they need to work together.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {capabilities.map(
                            ({ title, description, icon: Icon }) => (
                                <article
                                    key={title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 text-base font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${title} for our organization.`,
                                                {
                                                    Intent: "Capability enquiry",
                                                    Capability: title,
                                                }
                                            )
                                        }
                                        className="mt-5 inline-flex items-center gap-2 text-xs font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                    >
                                        Discuss this capability
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                </article>
                            )
                        )}

                    </div>
                </div>
            </section>

            {/* =========================================================
                ENGAGEMENT MODELS
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Flexible engagement
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Different requirements. Same disciplined thinking.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            We can adapt the depth of our approach to the
                            nature of the work.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-4">

                        {engagementModels.map(
                            ({ title, description, icon: Icon, points }) => (
                                <article
                                    key={title}
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm dark:bg-white/10 dark:text-blue-300">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
                                            >
                                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                                                {point}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the ${title} engagement model.`,
                                                {
                                                    Intent: "Engagement enquiry",
                                                    Engagement: title,
                                                }
                                            )
                                        }
                                        className="mt-6 inline-flex items-center gap-2 text-xs font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                    >
                                        Discuss this option
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                </article>
                            )
                        )}

                    </div>
                </div>
            </section>

            {/* =========================================================
                OUTCOMES
            ========================================================= */}

            <section className="relative overflow-hidden bg-blue-600 py-20 text-white lg:py-28">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(15,23,42,0.20),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
                                The result
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Better technology decisions should create better
                                business conditions.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-blue-50">
                                We measure the quality of our approach by how
                                useful the resulting technology is to the
                                organization, not simply by whether something
                                was installed.
                            </p>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">

                            {outcomes.map((outcome) => (
                                <div
                                    key={outcome}
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur"
                                >
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>

                                    <span className="text-sm font-semibold text-blue-50">
                                        {outcome}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                RESPONSIBLE TECHNOLOGY
            ========================================================= */}

            <section className="bg-slate-50 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-3">

                        <div className="lg:col-span-1">

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                A mature approach
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Technology should make operations clearer,
                                not harder.
                            </h2>

                        </div>

                        <div className="space-y-6 lg:col-span-2">

                            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Zap className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-black">
                                            Avoid unnecessary complexity
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            More software, more infrastructure
                                            and more integrations do not
                                            automatically mean a better
                                            solution. We consider whether each
                                            component adds useful value.
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <BarChart3 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-black">
                                            Think about lifecycle cost
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            Purchase price is only one part of
                                            technology cost. Implementation,
                                            licensing, support, training,
                                            maintenance and eventual
                                            replacement can also matter.
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="flex gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Handshake className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-black">
                                            Work with the people involved
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            Good technology decisions require
                                            communication between business
                                            leaders, users, technical teams,
                                            suppliers and implementation
                                            stakeholders.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Questions about how we work.
                        </h2>

                    </div>

                    <div className="mt-12 space-y-3">

                        {faqs.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.035]"
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                    >

                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""
                                                }`}
                                        />

                                    </button>

                                    {open && (
                                        <div className="border-t border-slate-200 px-6 pb-6 pt-5 dark:border-white/10">
                                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
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

            {/* =========================================================
                FINAL CTA
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-12 text-white shadow-2xl dark:bg-black sm:px-10 lg:px-16 lg:py-16">

                        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

                        <div className="absolute bottom-[-12rem] left-[-5rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

                            <div className="max-w-3xl">

                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-200">
                                    <Compass className="h-4 w-4" />
                                    Start with the requirement
                                </div>

                                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                                    Let's work out the right path forward.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    Whether you need technology advice, a
                                    complete implementation, hardware and
                                    software procurement, custom development
                                    or ongoing support, start by telling us
                                    what you are trying to achieve.
                                </p>

                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like help defining the right technology solution for our requirement.",
                                            { Intent: "Request solution" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                                >
                                    Request a solution
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to talk to the team about our technology requirements.",
                                            { Intent: "Talk to team" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                                >
                                    Talk to our team
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                TRUST STRIP
            ========================================================= */}

            <section className="border-t border-slate-200 bg-white py-12 dark:border-white/10 dark:bg-slate-900">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left">

                        <div className="flex flex-col items-center gap-3 sm:flex-row">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                <Target className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    Outcome focused
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Technology connected to real objectives.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col items-center gap-3 sm:flex-row">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    Security conscious
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Protection considered throughout delivery.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col items-center gap-3 sm:flex-row">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                <Workflow className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    Lifecycle minded
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    From planning through ongoing operation.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}