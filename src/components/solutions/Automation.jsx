import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Bell,
    Bot,
    BrainCircuit,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Cloud,
    Code2,
    Cog,
    Database,
    FileCheck,
    FileText,
    Globe,
    Headphones,
    Layers,
    Link2,
    Lock,
    Mail,
    MessageSquare,
    Monitor,
    Network,
    Play,
    RefreshCw,
    Rocket,
    Server,
    Settings,
    ShieldCheck,
    Sparkles,
    Terminal,
    Timer,
    Users,
    Workflow,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

/* ============================================================
   DATA
   ============================================================ */

const capabilities = [
    {
        icon: Workflow,
        title: "Business Workflow Automation",
        description:
            "Transform repetitive business procedures into structured digital workflows that move tasks, approvals, information and notifications automatically.",
        features: [
            "Approval workflows",
            "Internal requests",
            "Task routing",
            "Escalations",
            "Notifications",
            "Status tracking",
        ],
    },
    {
        icon: Link2,
        title: "Application Integration",
        description:
            "Connect the software your organization already uses so information can move between systems without unnecessary manual entry.",
        features: [
            "API integrations",
            "Webhooks",
            "CRM connections",
            "ERP connections",
            "Accounting systems",
            "Custom integrations",
        ],
    },
    {
        icon: Bot,
        title: "AI-Powered Automation",
        description:
            "Introduce practical artificial intelligence into workflows where documents, language, classification or intelligent assistance can improve operations.",
        features: [
            "AI assistants",
            "Document understanding",
            "Data extraction",
            "Classification",
            "Summarization",
            "Intelligent routing",
        ],
    },
    {
        icon: Database,
        title: "Data Automation",
        description:
            "Automate repetitive data movement, validation, transformation and synchronization between business applications and databases.",
        features: [
            "Data synchronization",
            "Data imports",
            "Data exports",
            "Data validation",
            "Transformation",
            "Scheduled processing",
        ],
    },
    {
        icon: Mail,
        title: "Communication Automation",
        description:
            "Automate operational communication so customers, employees, suppliers and stakeholders receive the right information at the right time.",
        features: [
            "Email automation",
            "Alerts",
            "Reminders",
            "Notifications",
            "Transactional messages",
            "Internal communication",
        ],
    },
    {
        icon: Cog,
        title: "Custom Automation Systems",
        description:
            "When existing automation tools are not enough, we can design and build custom applications, services and workflow engines.",
        features: [
            "Custom applications",
            "Backend services",
            "Workflow engines",
            "Custom APIs",
            "Admin dashboards",
            "Business portals",
        ],
    },
];

const processSteps = [
    { number: "01", icon: MessageSquare, title: "Tell Us the Problem", description: "Start with the business problem. You do not need to know the technology, architecture or automation method." },
    { number: "02", icon: SearchIcon, title: "Understand the Process", description: "We study how the work currently happens, who is involved, what systems are used and where delays or errors occur." },
    { number: "03", icon: Workflow, title: "Design the Workflow", description: "We map the triggers, decisions, actions, approvals, data movement, exceptions and expected outcomes." },
    { number: "04", icon: Code2, title: "Build the Solution", description: "We develop or configure the required automation, integrations, APIs, dashboards and supporting services." },
    { number: "05", icon: ShieldCheck, title: "Test & Secure", description: "We test normal and exceptional scenarios while considering authentication, permissions, validation and reliability." },
    { number: "06", icon: Rocket, title: "Deploy & Improve", description: "After deployment, we can monitor, maintain and continuously improve the solution as your organization grows." },
];

const useCases = [
    { icon: Building2, title: "Business Operations", description: "Connect departments and automate repetitive operational processes across the organization." },
    { icon: Users, title: "Human Resources", description: "Automate employee onboarding, requests, approvals, notifications and document workflows." },
    { icon: BarChart3, title: "Finance", description: "Automate reports, approvals, notifications, financial workflows and data movement." },
    { icon: Layers, title: "Procurement", description: "Digitize purchase requests, approvals, supplier communication and procurement tracking." },
    { icon: Database, title: "Inventory", description: "Automate stock alerts, synchronization, reorder processes and inventory reporting." },
    { icon: Headphones, title: "Customer Service", description: "Route customer requests, automate responses and connect service workflows." },
    { icon: FileText, title: "Documents", description: "Automate document intake, processing, classification, approval and storage." },
    { icon: Globe, title: "Digital Platforms", description: "Connect websites, portals, applications, APIs and external platforms into coordinated workflows." },
];

const integrationAreas = [
    { icon: Cloud, title: "Cloud Applications", description: "Connect cloud-based business platforms and services through available integration methods." },
    { icon: Server, title: "Servers & Infrastructure", description: "Integrate automation with hosted and internal infrastructure where technically appropriate." },
    { icon: Database, title: "Databases", description: "Move and synchronize structured information while maintaining appropriate validation and controls." },
    { icon: Terminal, title: "APIs", description: "Create secure connections between applications using APIs and other supported interfaces." },
    { icon: Network, title: "Webhooks", description: "Allow systems to respond to events and trigger downstream processes automatically." },
    { icon: Monitor, title: "Web & Mobile", description: "Connect websites, portals and mobile applications to backend business workflows." },
];

const benefits = [
    { icon: Timer, title: "Reduce Repetitive Work", description: "Let systems handle repetitive rule-based activities so your team can focus on higher-value work." },
    { icon: Zap, title: "Move Faster", description: "Reduce unnecessary waiting between people, departments and software systems." },
    { icon: CheckCircle2, title: "Improve Consistency", description: "Create repeatable workflows that follow defined rules instead of relying entirely on manual execution." },
    { icon: ShieldCheck, title: "Increase Control", description: "Build permissions, approvals, validation and auditability into important processes." },
    { icon: BarChart3, title: "Improve Visibility", description: "Track workflow status, activity, failures and operational performance more effectively." },
    { icon: RefreshCw, title: "Scale Operations", description: "Build processes that can support increasing workloads without simply increasing manual effort." },
];

const faqs = [
    { question: "What can AB TECHNOLOGIES automate?", answer: "We can automate repetitive and structured business processes such as approvals, notifications, document processing, data synchronization, reporting, customer workflows, procurement processes, employee workflows and communication." },
    { question: "Do I need to know what technology I need?", answer: "No. You can start with the problem instead. Explain what your team currently does manually, what takes too much time or what systems do not communicate properly. We can help determine the appropriate technical approach." },
    { question: "Can you integrate software we already use?", answer: "Yes. Where the existing application provides suitable APIs, webhooks, integrations or other supported access methods, we can explore connecting it to other systems and workflows." },
    { question: "Can automation include AI?", answer: "Yes. AI can be incorporated where it provides genuine value, including document understanding, classification, information extraction, summarization, intelligent assistance and natural-language interaction." },
    { question: "Will automation replace our employees?", answer: "The objective is generally to reduce repetitive administrative work and allow people to concentrate on work requiring judgment, creativity, relationships and decision-making. Automation should support people rather than simply add complexity." },
    { question: "Can you build automation from scratch?", answer: "Yes. We can start from an idea, manual process, business requirement or operational problem and work through discovery, architecture, development, integration, testing and deployment." },
    { question: "Can you work with existing systems instead of replacing them?", answer: "Often, yes. Integration can sometimes extend the value of existing systems without requiring an organization to replace everything. We first assess the current environment." },
    { question: "Do you provide support after deployment?", answer: "Yes. Depending on the engagement, we can provide maintenance, troubleshooting, monitoring, improvements, updates and ongoing technical support." },
];

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function SectionHeading({ eyebrow, title, description, centered = false }) {
    return (
        <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            {eyebrow && (
                <div
                    className={
                        "mb-5 inline-flex items-center gap-2 rounded-full " +
                        "border border-blue-500/20 bg-blue-500/10 px-4 py-2 " +
                        "text-xs font-bold uppercase tracking-[0.18em] " +
                        "text-blue-600 dark:text-blue-400"
                    }
                >
                    <Sparkles size={14} />
                    {eyebrow}
                </div>
            )}

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                {title}
            </h2>

            {description && (
                <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                    {description}
                </p>
            )}
        </div>
    );
}

function GlassCard({ children, className = "" }) {
    return (
        <div
            className={
                "rounded-3xl border border-slate-200/80 bg-white/80 " +
                "shadow-sm backdrop-blur-xl transition duration-300 " +
                "hover:-translate-y-1 hover:shadow-xl " +
                "dark:border-white/10 dark:bg-white/[0.045] " +
                className
            }
        >
            {children}
        </div>
    );
}

function CheckItem({ children, onClick }) {
    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-start gap-3 text-left transition hover:opacity-90"
            >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {children}
                </span>
            </button>
        );
    }

    return (
        <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
            <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {children}
            </span>
        </div>
    );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function AutomationIntegration() {
    const navigate = useNavigate();

    const [activeCapability, setActiveCapability] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    const selectedCapability = capabilities[activeCapability];

    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss automation and integration for my organization.",
            metadata: metadata || {
                Source: "Automation & Integration",
            },
        });

        navigate("/support/ai");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#070b14] dark:text-white">

            {/* HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200 dark:border-white/10">

                <div className="absolute inset-0 -z-20 bg-slate-50 dark:bg-[#070b14]" />

                <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-[-150px] top-[-100px] -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/10" />
                <div className="absolute bottom-[-180px] left-1/2 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.06]">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">

                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                <Workflow size={15} />
                                Automation & Integration
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Connect your systems.
                                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                                    Automate what matters.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We help organizations turn repetitive work,
                                disconnected systems and manual processes
                                into connected, efficient digital workflows.
                            </p>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                You do not need to arrive with a technical
                                specification. Bring us a problem, process,
                                idea or bottleneck. We can help you understand
                                it, design the right solution and build from
                                the ground up when necessary.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start a conversation about automation and integration. Here's the problem we're trying to solve:",
                                            {
                                                Source: "Automation & Integration",
                                                Stage: "Hero — start with problem",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                >
                                    Start With Your Problem
                                    <ArrowRight size={17} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your automation and integration capabilities before starting a project.",
                                            {
                                                Source: "Automation & Integration",
                                                Stage: "Hero — explore automation",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                                >
                                    Explore Automation
                                    <ChevronRight size={17} />
                                </button>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-2">
                                {[
                                    "Workflow Automation",
                                    "API Integration",
                                    "AI Automation",
                                    "Data Automation",
                                    "Custom Systems",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore: ${item}.`,
                                                {
                                                    Source: "Automation & Integration",
                                                    Topic: item,
                                                }
                                            )
                                        }
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* HERO VISUAL */}
                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#0c1320]/90">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                            Automation engine
                                        </div>
                                        <div className="mt-1 text-sm font-black">
                                            Connected Business Workflow
                                        </div>
                                    </div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                                        <CheckCircle2 size={19} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss an automation trigger such as an employee request.",
                                                {
                                                    Source: "Automation & Integration",
                                                    "Workflow stage": "Trigger",
                                                }
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <Users size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    Trigger
                                                </div>
                                                <div className="mt-1 text-sm font-bold">
                                                    Employee Request
                                                </div>
                                            </div>
                                            <Check size={17} className="text-emerald-500" />
                                        </div>
                                    </button>

                                    <div className="flex justify-center">
                                        <ArrowDown size={17} className="text-slate-400" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss the automation logic layer — rules + automation.",
                                                {
                                                    Source: "Automation & Integration",
                                                    "Workflow stage": "Logic",
                                                }
                                            )
                                        }
                                        className="w-full rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-left dark:bg-indigo-500/[0.07]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                                <BrainCircuit size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                                                    Logic
                                                </div>
                                                <div className="mt-1 text-sm font-bold">
                                                    Rules + Automation
                                                </div>
                                            </div>
                                            <Zap size={18} className="text-indigo-500" />
                                        </div>
                                    </button>

                                    <div className="flex justify-center">
                                        <ArrowDown size={17} className="text-slate-400" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to connect automation with a cloud platform.",
                                                    {
                                                        Source: "Automation & Integration",
                                                        "Workflow target": "Cloud Platform",
                                                    }
                                                )
                                            }
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left dark:border-white/10 dark:bg-white/[0.035]"
                                        >
                                            <Cloud size={19} className="text-sky-500" />
                                            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                System
                                            </div>
                                            <div className="mt-1 text-sm font-black">
                                                Cloud Platform
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to connect automation with a business database.",
                                                    {
                                                        Source: "Automation & Integration",
                                                        "Workflow target": "Business Database",
                                                    }
                                                )
                                            }
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left dark:border-white/10 dark:bg-white/[0.035]"
                                        >
                                            <Database size={19} className="text-purple-500" />
                                            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Data
                                            </div>
                                            <div className="mt-1 text-sm font-black">
                                                Business Database
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-3 gap-3">
                                    {[
                                        ["Process", "Automated"],
                                        ["Systems", "Connected"],
                                        ["Status", "Active"],
                                    ].map(([label, value]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss the "${label}" aspect of an automation system — ${value}.`,
                                                    {
                                                        Source: "Automation & Integration",
                                                        "System aspect": label,
                                                    }
                                                )
                                            }
                                            className="rounded-xl bg-slate-50 p-3 text-left transition hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                                        >
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                {label}
                                            </div>
                                            <div
                                                className={
                                                    "mt-1 text-sm font-black " +
                                                    (value === "Active"
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : "")
                                                }
                                            >
                                                {value}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE */}
            <section className="relative bg-white py-20 dark:bg-[#080d17] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="The opportunity"
                        title="Your people should not have to manually move information between systems all day."
                        description="When software does not communicate, employees often become the integration layer. We help replace unnecessary manual steps with connected processes."
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <button
                                    type="button"
                                    key={benefit.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss this automation benefit: ${benefit.title} — ${benefit.description}`,
                                            {
                                                Source: "Automation & Integration",
                                                Benefit: benefit.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="mt-6 text-xl font-black">
                                        {benefit.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {benefit.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section
                id="capabilities"
                className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Our capabilities"
                        title="From one repetitive task to an organization-wide automation strategy."
                        description="We can work at the level that makes sense for your organization — from a focused workflow to custom applications and connected digital infrastructure."
                    />

                    <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

                        {/* LEFT: capability list */}
                        <div className="space-y-3">
                            {capabilities.map((item, index) => {
                                const Icon = item.icon;
                                const active = activeCapability === index;

                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => {
                                            setActiveCapability(index);
                                            startSupportChat(
                                                `I'd like to explore the automation capability: ${item.title}. ${item.description} Features: ${item.features.join(", ")}.`,
                                                {
                                                    Source: "Automation & Integration",
                                                    Capability: item.title,
                                                }
                                            );
                                        }}
                                        className={
                                            "w-full rounded-2xl border p-5 text-left transition " +
                                            (active
                                                ? "border-blue-500/30 bg-white shadow-lg dark:border-blue-400/20 dark:bg-white/[0.07]"
                                                : "border-slate-200 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.05]")
                                        }
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={
                                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl " +
                                                    (active
                                                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                                        : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400")
                                                }
                                            >
                                                <Icon size={21} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-black">
                                                    {item.title}
                                                </div>
                                                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                    {item.features
                                                        .slice(0, 3)
                                                        .join(" • ")}
                                                </div>
                                            </div>
                                            <ChevronRight
                                                size={18}
                                                className={
                                                    active
                                                        ? "text-blue-500"
                                                        : "text-slate-400"
                                                }
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* RIGHT: selected capability detail */}
                        <GlassCard className="p-7 sm:p-9">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {React.createElement(selectedCapability.icon, {
                                    size: 26,
                                })}
                            </div>

                            <h3 className="mt-7 text-2xl font-black sm:text-3xl">
                                {selectedCapability.title}
                            </h3>

                            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                                {selectedCapability.description}
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {selectedCapability.features.map((feature) => (
                                    <CheckItem
                                        key={feature}
                                        onClick={() =>
                                            startSupportChat(
                                                `For "${selectedCapability.title}", I'd like to discuss: ${feature}.`,
                                                {
                                                    Source: "Automation & Integration",
                                                    Capability: selectedCapability.title,
                                                    Feature: feature,
                                                }
                                            )
                                        }
                                    >
                                        {feature}
                                    </CheckItem>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to explore "${selectedCapability.title}" in more detail.`,
                                        {
                                            Source: "Automation & Integration",
                                            Capability: selectedCapability.title,
                                            Stage: "Capability panel CTA",
                                        }
                                    )
                                }
                                className="mt-9 w-full rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-left transition hover:border-blue-400/40 hover:bg-blue-500/10 dark:bg-blue-500/[0.06]"
                            >
                                <div className="flex gap-3">
                                    <Sparkles size={20} className="mt-0.5 shrink-0 text-blue-500" />
                                    <div>
                                        <div className="font-black">
                                            Built around your operation
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            We do not force every business into
                                            the same workflow. We first
                                            understand your process and then
                                            determine what should be automated,
                                            integrated or redesigned.
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* START FROM SCRATCH */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute left-0 top-20 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="grid lg:grid-cols-2">

                            <div className="p-8 sm:p-10 lg:p-14">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <Rocket size={23} />
                                </div>

                                <div className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Start from scratch
                                </div>

                                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                    You don't need to know what to build.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    One of the most important things we do is
                                    help organizations translate operational
                                    problems into technology solutions.
                                </p>

                                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    If your current process involves emails,
                                    spreadsheets, paper forms, WhatsApp
                                    messages, repeated data entry, manual
                                    approvals or disconnected software, tell
                                    us how it works.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "We have a repetitive process.",
                                        "Our employees enter the same information repeatedly.",
                                        "Our software systems do not communicate.",
                                        "Approvals take too long.",
                                        "We want to introduce AI.",
                                        "We need a custom internal system.",
                                    ].map((item) => (
                                        <CheckItem
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `My automation starting point is: ${item}`,
                                                    {
                                                        Source: "Automation & Integration",
                                                        "Starting point": item,
                                                    }
                                                )
                                            }
                                        >
                                            {item}
                                        </CheckItem>
                                    ))}
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-10 lg:p-14">
                                <div className="absolute inset-0 opacity-20">
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                                            backgroundSize: "36px 36px",
                                        }}
                                    />
                                </div>

                                <div className="relative">
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                                        From problem to solution
                                    </div>

                                    <div className="mt-7 space-y-3">
                                        {[
                                            ["PROBLEM", "Manual approval process"],
                                            ["DISCOVERY", "Map people, systems & rules"],
                                            ["DESIGN", "Create digital workflow"],
                                            ["INTEGRATION", "Connect required systems"],
                                            ["RESULT", "Trackable automated process"],
                                        ].map(([label, value], index) => (
                                            <React.Fragment key={label}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I'd like to discuss the "${label}" stage of an automation journey — ${value}.`,
                                                            {
                                                                Source: "Automation & Integration",
                                                                "Journey stage": label,
                                                            }
                                                        )
                                                    }
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-blue-400/40 hover:bg-white/10"
                                                >
                                                    <div className="text-[10px] font-bold tracking-[0.18em] text-slate-400">
                                                        {label}
                                                    </div>
                                                    <div className="mt-1 font-bold">
                                                        {value}
                                                    </div>
                                                </button>

                                                {index < 4 && (
                                                    <div className="flex justify-center">
                                                        <ArrowDown size={15} className="text-blue-400" />
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#080d17] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="How we work"
                        title="A disciplined approach to automation."
                        description="Good automation starts with understanding. We avoid building technology around poorly understood processes."
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {processSteps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <button
                                    type="button"
                                    key={step.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to understand the automation process step: "${step.title}" — ${step.description}`,
                                            {
                                                Source: "Automation & Integration",
                                                Step: `${step.number} — ${step.title}`,
                                            }
                                        )
                                    }
                                    className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-7 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                            <Icon size={21} />
                                        </div>
                                        <div className="text-4xl font-black text-slate-100 dark:text-white/5">
                                            {step.number}
                                        </div>
                                    </div>
                                    <h3 className="mt-7 text-xl font-black">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {step.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* INTEGRATIONS */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">

                        <div>
                            <SectionHeading
                                eyebrow="Connected systems"
                                title="Your applications should work together."
                                description="We can help connect the systems that hold your business information and coordinate the workflows that depend on them."
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss integration beyond simply connecting buttons — authentication, validation, business rules, error handling, permissions and monitoring.",
                                        {
                                            Source: "Automation & Integration",
                                            Topic: "Integration depth",
                                        }
                                    )
                                }
                                className="mt-8 w-full rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 text-left transition hover:border-blue-400/40 dark:bg-blue-500/[0.06]"
                            >
                                <div className="flex items-start gap-4">
                                    <Network size={23} className="mt-0.5 shrink-0 text-blue-500" />
                                    <div>
                                        <h3 className="font-black">
                                            Integration is more than connecting buttons
                                        </h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            Reliable integrations need
                                            authentication, data validation,
                                            business rules, error handling,
                                            permissions and monitoring. We
                                            consider the complete workflow
                                            rather than simply connecting two
                                            applications.
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {integrationAreas.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss integration with ${item.title}: ${item.description}`,
                                                {
                                                    Source: "Automation & Integration",
                                                    "Integration area": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                    >
                                        <Icon size={22} className="text-blue-600 dark:text-blue-400" />
                                        <h3 className="mt-5 text-lg font-black">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* USE CASES */}
            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Across your organization"
                        title="Automation is not limited to the IT department."
                        description="Almost every department contains repetitive processes, information flows and opportunities to improve efficiency."
                    />

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {useCases.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore automation for ${item.title}: ${item.description}`,
                                            {
                                                Source: "Automation & Integration",
                                                "Use case": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-400">
                                        <Icon size={21} />
                                    </div>
                                    <h3 className="mt-5 font-black">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* AI AUTOMATION */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-white/[0.035] sm:p-10 lg:p-14">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                            <div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                    <BrainCircuit size={25} />
                                </div>
                                <div className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                                    Intelligent automation
                                </div>
                                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                    Combine automation with intelligence.
                                </h2>
                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Traditional automation is excellent when
                                    the rules are predictable. AI can help
                                    when workflows involve language, documents,
                                    classification, interpretation or
                                    information that is difficult to handle
                                    using fixed rules alone.
                                </p>
                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Document understanding",
                                        "Information extraction",
                                        "AI assistants",
                                        "Classification",
                                        "Summarization",
                                        "Intelligent routing",
                                    ].map((item) => (
                                        <CheckItem
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to explore AI-powered automation for: ${item}.`,
                                                    {
                                                        Source: "Automation & Integration",
                                                        "AI automation": item,
                                                    }
                                                )
                                            }
                                        >
                                            {item}
                                        </CheckItem>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6 dark:bg-purple-500/[0.06]">
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500">
                                            Example workflow
                                        </div>
                                        <div className="mt-1 font-black">
                                            Intelligent Document Processing
                                        </div>
                                    </div>
                                    <Sparkles size={20} className="text-purple-500" />
                                </div>

                                <div className="space-y-3">
                                    {[
                                        ["01", "Document received", "INPUT"],
                                        ["02", "AI understands content", "AI"],
                                        ["03", "Information extracted", "PROCESS"],
                                        ["04", "Business rules validated", "RULES"],
                                        ["05", "Workflow continues", "ACTION"],
                                    ].map(([number, title, type]) => (
                                        <button
                                            type="button"
                                            key={number}
                                            onClick={() =>
                                                startSupportChat(
                                                    `In an intelligent document workflow, I'd like to discuss: ${title} (${type}).`,
                                                    {
                                                        Source: "Automation & Integration",
                                                        "AI workflow step": title,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-purple-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-purple-400/30"
                                        >
                                            <span className="text-xs font-black text-slate-400">
                                                {number}
                                            </span>
                                            <div className="flex-1 text-sm font-bold">
                                                {title}
                                            </div>
                                            <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-[9px] font-black tracking-wider text-purple-600 dark:text-purple-400">
                                                {type}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL FOUNDATION */}
            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#080d17] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">

                        <SectionHeading
                            eyebrow="Engineering foundation"
                            title="Built as a real system, not a fragile collection of shortcuts."
                            description="Business automation becomes important infrastructure. We consider reliability, security, data integrity and maintainability when designing solutions."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { icon: Lock, title: "Authentication", text: "Control access between users and connected systems." },
                                { icon: ShieldCheck, title: "Security", text: "Consider permissions and security throughout the workflow." },
                                { icon: Database, title: "Data Validation", text: "Validate information before it reaches downstream systems." },
                                { icon: RefreshCw, title: "Failure Recovery", text: "Handle temporary failures and appropriate retry scenarios." },
                                { icon: Monitor, title: "Monitoring", text: "Track important workflow events and operational health." },
                                { icon: Settings, title: "Configuration", text: "Keep important business rules manageable and adaptable." },
                                { icon: FileCheck, title: "Auditability", text: "Maintain useful records of important workflow activities." },
                                { icon: Code2, title: "Maintainability", text: "Build solutions that can be understood and improved over time." },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the automation foundation: ${item.title} — ${item.text}`,
                                                {
                                                    Source: "Automation & Integration",
                                                    "Foundation": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                    >
                                        <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                                        <h3 className="mt-4 text-sm font-black">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* AUTOMATION MATURITY */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Grow gradually"
                        title="You don't have to automate everything on day one."
                        description="A practical automation strategy can begin with one process and expand as your organization gains confidence."
                    />

                    <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="grid md:grid-cols-4">
                            {[
                                { number: "01", title: "Discover", text: "Find repetitive work and identify worthwhile automation opportunities." },
                                { number: "02", title: "Automate", text: "Digitize selected processes and remove unnecessary manual steps." },
                                { number: "03", title: "Connect", text: "Integrate applications and data across departments." },
                                { number: "04", title: "Optimize", text: "Monitor results and continuously improve the operating environment." },
                            ].map((item, index) => (
                                <button
                                    type="button"
                                    key={item.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the automation maturity stage: ${item.title} — ${item.text}`,
                                            {
                                                Source: "Automation & Integration",
                                                "Maturity stage": item.title,
                                            }
                                        )
                                    }
                                    className={
                                        "p-7 text-left transition hover:bg-blue-50/40 dark:hover:bg-white/[0.05] " +
                                        (index !== 3
                                            ? "border-b border-slate-200 md:border-b-0 md:border-r dark:border-white/10"
                                            : "")
                                    }
                                >
                                    <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                                        {item.number}
                                    </div>
                                    <h3 className="mt-5 text-xl font-black">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT CAN BE AUTOMATED */}
            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">

                        <SectionHeading
                            eyebrow="Opportunity map"
                            title="If a process happens repeatedly, it may be worth examining."
                            description="The best automation opportunities are often repetitive, rule-based, time-consuming or dependent on moving information between people and systems."
                        />

                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                "Employee onboarding",
                                "Customer onboarding",
                                "Approvals",
                                "Purchase requests",
                                "Invoice workflows",
                                "Inventory alerts",
                                "Report generation",
                                "Email notifications",
                                "Document routing",
                                "Data imports",
                                "Data exports",
                                "Customer follow-ups",
                                "Support ticket routing",
                                "Appointment reminders",
                                "Supplier workflows",
                                "Internal requests",
                                "Compliance checklists",
                                "System synchronization",
                                "Lead processing",
                                "Operational dashboards",
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore automating: ${item}.`,
                                            {
                                                Source: "Automation & Integration",
                                                "Opportunity": item,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold transition hover:border-blue-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-400/30"
                                >
                                    <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DELIVERABLES */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="What we can deliver"
                        title="From workflow design to a complete automation platform."
                        description="Depending on your requirements, the engagement can include process mapping, integrations, custom software, automation logic, dashboards and ongoing support."
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: Workflow, title: "Workflow Design", text: "Map the business process and determine what should happen automatically." },
                            { icon: Code2, title: "Custom Development", text: "Build custom services, applications and backend logic where needed." },
                            { icon: Link2, title: "System Integration", text: "Connect applications, databases, APIs and business platforms." },
                            { icon: Bot, title: "AI Features", text: "Introduce useful AI capabilities into appropriate workflows." },
                            { icon: Monitor, title: "Dashboards", text: "Provide visibility into processes, statuses and operational activity." },
                            { icon: ShieldCheck, title: "Security Controls", text: "Implement appropriate authentication, access and workflow controls." },
                            { icon: FileText, title: "Documentation", text: "Document the solution so it can be operated and maintained." },
                            { icon: Headphones, title: "Support", text: "Provide technical assistance, maintenance and improvements." },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss a deliverable: ${item.title} — ${item.text}`,
                                            {
                                                Source: "Automation & Integration",
                                                Deliverable: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >
                                    <Icon size={22} className="text-blue-600 dark:text-blue-400" />
                                    <h3 className="mt-5 font-black">
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

            {/* FAQ */}
            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#080d17] lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        centered
                        eyebrow="Frequently asked questions"
                        title="Automation without the technical confusion."
                        description="Here are some of the questions organizations commonly have before beginning."
                    />

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
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="text-sm font-black sm:text-base">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            size={19}
                                            className={
                                                "shrink-0 text-slate-400 transition-transform " +
                                                (open ? "rotate-180" : "")
                                            }
                                        />
                                    </button>

                                    {open && (
                                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10">
                                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source: "Automation & Integration",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:gap-3 dark:text-blue-400"
                                            >
                                                Discuss this with AB AI
                                                <ArrowRight size={13} />
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
            <section
                id="start"
                className="relative overflow-hidden bg-slate-950 py-20 lg:py-28"
            >
                <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-300 ring-1 ring-white/10">
                        <Workflow size={27} />
                    </div>

                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                        <Sparkles size={14} />
                        Start with the problem
                    </div>

                    <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Tell us what is slowing your business down.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        You do not need to know the technology. Tell us what
                        your team does manually, what systems you use, what is
                        taking too much time or what you wish your business
                        could do automatically.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a conversation about automation and integration. Here's what is slowing us down:",
                                    {
                                        Source: "Automation & Integration",
                                        Stage: "Final CTA — start conversation",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50"
                        >
                            Start a Conversation
                            <ArrowRight size={17} />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request an automation solution. Here's what we need:",
                                    {
                                        Source: "Automation & Integration",
                                        Stage: "Final CTA — request solution",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10"
                        >
                            Request a Solution
                            <ArrowUpRight size={17} />
                        </button>
                    </div>

                    <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-400">
                        {[
                            "Start from scratch",
                            "Connect existing systems",
                            "Build custom solutions",
                            "Support and improve",
                        ].map((label) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss: ${label}.`,
                                        {
                                            Source: "Automation & Integration",
                                            "Final bullet": label,
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 transition hover:text-white"
                            >
                                <CheckCircle2 size={14} className="text-emerald-400" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}