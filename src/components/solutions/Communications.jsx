import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Cloud,
    CloudCog,
    Code2,
    Database,
    Globe2,
    Headphones,
    Lock,
    Mail,
    MessageSquare,
    Monitor,
    Network,
    Phone,
    Play,
    Radio,
    Send,
    Server,
    Settings,
    Shield,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Target,
    Users,
    Video,
    Wifi,
    Workflow,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function BusinessCommunication() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);
    const [activeSolution, setActiveSolution] = useState("business-email");

    /* ============================================================
       SUPPORT REQUEST HELPER
       ============================================================ */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss business communication and collaboration for my organization.",
            metadata: metadata || {
                Source: "Business Communication",
            },
        });

        navigate("/support/ai");
    };

    const communicationSolutions = [
        {
            id: "business-email",
            title: "Business Email",
            description:
                "Professional email environments designed around your company, people, domains, policies, and communication requirements.",
            icon: Mail,
            features: [
                "Custom business domains",
                "Professional mailboxes",
                "Shared mailboxes",
                "Distribution lists",
                "Email signatures",
                "Mailbox migration",
                "Spam and phishing protection",
                "Mobile email configuration",
            ],
        },
        {
            id: "collaboration",
            title: "Team Collaboration",
            description:
                "Give teams the tools they need to communicate, collaborate, share information, and work together from anywhere.",
            icon: Users,
            features: [
                "Team workspaces",
                "File collaboration",
                "Shared calendars",
                "Internal messaging",
                "Document collaboration",
                "Task coordination",
                "Department channels",
                "Remote collaboration",
            ],
        },
        {
            id: "voice",
            title: "Business Voice",
            description:
                "Modern business calling environments that help organizations communicate professionally with customers, suppliers, and teams.",
            icon: Phone,
            features: [
                "Business phone systems",
                "VoIP deployment",
                "Extensions",
                "Call routing",
                "Auto attendants",
                "Call queues",
                "Voicemail",
                "Call management",
            ],
        },
        {
            id: "video",
            title: "Video Conferencing",
            description:
                "Reliable meeting and conferencing environments for distributed teams, management meetings, training, sales, and customer engagement.",
            icon: Video,
            features: [
                "Online meetings",
                "Virtual presentations",
                "Training sessions",
                "Management meetings",
                "Screen sharing",
                "Meeting rooms",
                "Remote collaboration",
                "Conference support",
            ],
        },
    ];

    const services = [
        {
            icon: Mail,
            title: "Business Email Systems",
            description:
                "We help organizations establish professional email infrastructure using their own domain and appropriate security, mailbox, storage, and administration policies.",
        },
        {
            icon: MessageSquare,
            title: "Internal Messaging",
            description:
                "Create structured communication channels for departments, teams, projects, management, operations, and support functions.",
        },
        {
            icon: Phone,
            title: "Business Telephony",
            description:
                "Deploy modern calling systems with extensions, routing, queues, voicemail, departments, and controlled access.",
        },
        {
            icon: Video,
            title: "Video Meetings",
            description:
                "Build dependable video meeting environments for remote teams, clients, suppliers, training, interviews, and management.",
        },
        {
            icon: Cloud,
            title: "Cloud Collaboration",
            description:
                "Connect communication with cloud productivity, document collaboration, calendars, file sharing, and remote work.",
        },
        {
            icon: ShieldCheck,
            title: "Communication Security",
            description:
                "Protect business communications through identity controls, authentication, policies, filtering, access management, and security awareness.",
        },
        {
            icon: Smartphone,
            title: "Mobile Communication",
            description:
                "Configure communication platforms across smartphones, tablets, laptops, desktops, and other approved business devices.",
        },
        {
            icon: Workflow,
            title: "Communication Automation",
            description:
                "Automate alerts, notifications, reminders, approvals, customer messages, internal updates, and repetitive communication workflows.",
        },
        {
            icon: Headphones,
            title: "Communication Support",
            description:
                "Provide ongoing support for communication environments, users, configurations, access problems, migrations, and operational issues.",
        },
    ];

    const industries = [
        {
            title: "Corporate Organizations",
            description:
                "Structured communication systems for management, departments, branches, executives, and employees.",
            icon: BuildingIcon,
        },
        {
            title: "Schools & Education",
            description:
                "Communication environments for administrators, teachers, students, parents, departments, and management.",
            icon: GraduationIcon,
        },
        {
            title: "Healthcare",
            description:
                "Communication infrastructure supporting administrative teams, facilities, staff, scheduling, and approved workflows.",
            icon: HeartIcon,
        },
        {
            title: "Retail & Distribution",
            description:
                "Connect stores, warehouses, managers, suppliers, field teams, and head offices.",
            icon: StoreIcon,
        },
        {
            title: "Professional Services",
            description:
                "Professional communication systems for consultants, agencies, legal teams, accountants, and service businesses.",
            icon: BriefcaseIcon,
        },
        {
            title: "Government & Institutions",
            description:
                "Structured communication environments for departments, institutions, offices, and administrative teams.",
            icon: LandmarkIcon,
        },
    ];

    const workflow = [
        {
            number: "01",
            title: "Understand",
            description:
                "We first understand how your organization communicates today, what is failing, what needs to improve, and where communication gaps exist.",
        },
        {
            number: "02",
            title: "Design",
            description:
                "We design a communication environment around your users, departments, devices, locations, workflows, security requirements, and budget.",
        },
        {
            number: "03",
            title: "Configure",
            description:
                "We configure the selected platforms, domains, accounts, policies, devices, permissions, routing, security controls, and communication workflows.",
        },
        {
            number: "04",
            title: "Migrate",
            description:
                "Where required, we carefully migrate existing mailboxes, contacts, calendars, files, communication records, and configurations.",
        },
        {
            number: "05",
            title: "Deploy",
            description:
                "We deploy the communication environment across approved users, devices, locations, departments, and business functions.",
        },
        {
            number: "06",
            title: "Train",
            description:
                "We help your people understand how to use the new communication environment correctly and securely.",
        },
        {
            number: "07",
            title: "Support",
            description:
                "After deployment, we remain available for troubleshooting, administration, optimization, onboarding, and ongoing technical support.",
        },
    ];

    const benefits = [
        "Professional company communication",
        "Improved employee collaboration",
        "Better customer communication",
        "Centralized communication management",
        "Secure access from approved devices",
        "Reduced communication friction",
        "Better remote-work capabilities",
        "Improved response times",
        "Structured departmental communication",
        "Scalable communication infrastructure",
        "Centralized administration",
        "Better business continuity",
    ];

    const faqs = [
        {
            question: "Can you set up professional company email?",
            answer:
                "Yes. We can help with domain-based business email, mailbox creation, user provisioning, signatures, security configuration, migration, mobile setup, administration, and ongoing support.",
        },
        {
            question: "Can you migrate our existing business email?",
            answer:
                "Yes. We can assess your existing environment and plan a controlled migration to a new communication platform while minimizing disruption to users.",
        },
        {
            question: "Can you set up communication for a new company from scratch?",
            answer:
                "Absolutely. We can start from the domain and organizational structure and help establish email, collaboration, voice, conferencing, security, devices, policies, and support processes.",
        },
        {
            question: "Can you support employees working remotely?",
            answer:
                "Yes. We can design communication systems that allow authorized employees to communicate and collaborate securely across offices, homes, branches, and approved mobile devices.",
        },
        {
            question: "Can you integrate communication with our existing software?",
            answer:
                "Where technically appropriate, communication platforms can be integrated with business applications, websites, CRM systems, internal systems, notification engines, automation workflows, and APIs.",
        },
        {
            question: "Do you only provide software?",
            answer:
                "No. Our approach can combine software, cloud services, networking, hardware, security, deployment, configuration, training, and ongoing support where required.",
        },
        {
            question: "Can you help with business phone systems?",
            answer:
                "Yes. We can help plan and deploy appropriate business voice environments, including extensions, call routing, queues, voicemail, departments, and related infrastructure.",
        },
        {
            question: "Can you handle communication security?",
            answer:
                "Yes. Security can include authentication, access policies, account controls, filtering, identity management, device considerations, user awareness, and other appropriate controls.",
        },
    ];

    return (
        <main className="relative overflow-hidden bg-white text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">

            {/* ========================================================= */}
            {/* BACKGROUND SYSTEM */}
            {/* ========================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-0 top-[600px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
                <div className="absolute left-1/3 top-[1400px] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />

                <div
                    className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(59,130,246,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.8) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* ========================================================= */}
            {/* HERO */}
            {/* ========================================================= */}

            <section className="relative isolate min-h-[760px] border-b border-slate-200/80 dark:border-white/10">

                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/70 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/30" />

                <div className="absolute right-[-15%] top-[-20%] h-[700px] w-[700px] rounded-full border border-blue-500/10 dark:border-blue-400/10" />
                <div className="absolute right-[-10%] top-[-15%] h-[580px] w-[580px] rounded-full border border-cyan-500/10 dark:border-cyan-400/10" />
                <div className="absolute right-[-5%] top-[-10%] h-[460px] w-[460px] rounded-full border border-indigo-500/10 dark:border-indigo-400/10" />

                <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-16 px-5 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/5 dark:text-blue-300">
                            <Radio className="h-4 w-4" />
                            Business Communication & Collaboration
                        </div>

                        <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                            Connect your
                            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                                entire business.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                            We design, deploy, secure, and support the communication
                            systems businesses depend on — from professional email and
                            team collaboration to business voice, video meetings,
                            notifications, remote work, and intelligent communication
                            workflows.
                        </p>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                            Whether you are starting from scratch, replacing an outdated
                            setup, moving to the cloud, expanding to new locations, or
                            supporting a growing workforce, we can help you build the
                            communication environment around the way your organization
                            actually works.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                            <a
                                href="#communication-services"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                            >
                                Explore Communication
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss our business communication and collaboration needs. Here's what we're trying to solve:",
                                        {
                                            Source: "Business Communication",
                                            Stage: "Hero — discuss needs",
                                        }
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                            >
                                Discuss Your Needs
                            </button>

                        </div>

                        <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">

                            {[
                                ["Email", Mail],
                                ["Voice", Phone],
                                ["Video", Video],
                                ["Collaboration", Users],
                            ].map(([label, Icon]) => (
                                <button
                                    type="button"
                                    key={label}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore ${label} for our business communication environment.`,
                                            {
                                                Source: "Business Communication",
                                                Focus: label,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-3 text-left text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                                >
                                    <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    {label}
                                </button>
                            ))}

                        </div>

                    </div>

                    {/* HERO VISUAL */}

                    <div className="relative mx-auto w-full max-w-xl">

                        <div className="relative rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/30">

                            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900/80">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                            Communication Hub
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                                            Connected Workspace
                                        </h3>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>

                                </div>

                                <div className="mt-8 space-y-3">

                                    {[
                                        {
                                            icon: Mail,
                                            title: "Business Email",
                                            value: "48 users connected",
                                        },
                                        {
                                            icon: Users,
                                            title: "Team Collaboration",
                                            value: "12 active teams",
                                        },
                                        {
                                            icon: Phone,
                                            title: "Business Voice",
                                            value: "24 extensions",
                                        },
                                        {
                                            icon: Video,
                                            title: "Video Meetings",
                                            value: "8 scheduled today",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                type="button"
                                                key={item.title}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss ${item.title} — current status: ${item.value}.`,
                                                        {
                                                            Source: "Business Communication",
                                                            "Hub tile": item.title,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="font-bold text-slate-800 dark:text-white">
                                                        {item.title}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                        {item.value}
                                                    </p>
                                                </div>

                                                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />
                                            </button>
                                        );
                                    })}

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to unify our communication tools into one connected environment.",
                                            {
                                                Source: "Business Communication",
                                                Stage: "Hub — unify environment",
                                            }
                                        )
                                    }
                                    className="mt-5 w-full rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-100/70 dark:border-blue-400/20 dark:bg-blue-500/10 dark:hover:bg-blue-500/20"
                                >

                                    <div className="flex gap-3">

                                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <div>
                                            <p className="font-bold text-blue-900 dark:text-blue-200">
                                                One communication environment
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-blue-700/80 dark:text-blue-300/70">
                                                Bring people, communication tools,
                                                workflows, and business operations
                                                together.
                                            </p>
                                        </div>

                                    </div>

                                </button>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to discuss security-first communication for our business.",
                                    {
                                        Source: "Business Communication",
                                        Focus: "Security",
                                    }
                                )
                            }
                            className="absolute -bottom-7 -left-7 hidden w-52 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xl transition hover:border-emerald-300 dark:border-white/10 dark:bg-slate-900 sm:block"
                        >

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Protection
                                    </p>

                                    <p className="font-bold text-slate-900 dark:text-white">
                                        Security-first
                                    </p>
                                </div>
                            </div>

                        </button>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* INTRODUCTION */}
            {/* ========================================================= */}

            <section className="relative border-b border-slate-200 bg-white py-24 dark:border-white/10 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                <span className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
                                More than email
                            </div>

                            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Communication is infrastructure.
                            </h2>

                        </div>

                        <div className="space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-300">

                            <p>
                                Your organization communicates constantly — with
                                employees, customers, suppliers, partners,
                                management, contractors, and the public.
                            </p>

                            <p>
                                When communication is fragmented, unreliable, or
                                difficult to manage, the impact spreads throughout
                                the business.
                            </p>

                            <p>
                                AB TECHNOLOGIES helps you bring those communication
                                requirements into a structured, secure, manageable,
                                and scalable environment.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to talk about treating communication as business infrastructure rather than scattered tools.",
                                        {
                                            Source: "Business Communication",
                                            Stage: "Introduction — infrastructure",
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3 dark:text-blue-400"
                            >
                                Discuss your communication infrastructure
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* SERVICE GRID */}
            {/* ========================================================= */}

            <section
                id="communication-services"
                className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/40"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Communication services
                        </div>

                        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Everything your teams need to communicate better.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We can help with individual communication services or
                            design an integrated environment that connects multiple
                            communication systems together.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <button
                                    type="button"
                                    key={service.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore the service: ${service.title} — ${service.description}`,
                                            {
                                                Source: "Business Communication",
                                                Service: service.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-blue-400/30"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {service.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                                        Explore capability
                                        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>

                                </button>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* SOLUTIONS TABS */}
            {/* ========================================================= */}

            <section className="relative bg-white py-24 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Communication architecture
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                                Build the environment around your organization.
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Select a communication area to see what can be
                                included.
                            </p>

                            <div className="mt-8 space-y-2">

                                {communicationSolutions.map((solution) => {
                                    const Icon = solution.icon;

                                    return (
                                        <button
                                            key={solution.id}
                                            onClick={() => {
                                                setActiveSolution(solution.id);
                                                startSupportChat(
                                                    `I'd like to explore the communication solution: ${solution.title}. ${solution.description}`,
                                                    {
                                                        Source: "Business Communication",
                                                        Solution: solution.title,
                                                    }
                                                );
                                            }}
                                            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${activeSolution === solution.id
                                                ? "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-white"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" />

                                            <span className="flex-1 text-sm font-bold">
                                                {solution.title}
                                            </span>

                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    );
                                })}

                            </div>

                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-10 dark:border-white/10 dark:bg-slate-900/60">

                            {communicationSolutions
                                .filter(
                                    (solution) =>
                                        solution.id === activeSolution
                                )
                                .map((solution) => {
                                    const Icon = solution.icon;

                                    return (
                                        <div key={solution.id}>

                                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                                                    <Icon className="h-7 w-7" />
                                                </div>

                                                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                                                    Configurable
                                                </span>

                                            </div>

                                            <h3 className="mt-7 text-3xl font-black text-slate-950 dark:text-white">
                                                {solution.title}
                                            </h3>

                                            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                                {solution.description}
                                            </p>

                                            <div className="mt-9 grid gap-3 sm:grid-cols-2">

                                                {solution.features.map((feature) => (
                                                    <button
                                                        type="button"
                                                        key={feature}
                                                        onClick={() =>
                                                            startSupportChat(
                                                                `For "${solution.title}", I'd like to discuss: ${feature}.`,
                                                                {
                                                                    Source: "Business Communication",
                                                                    Solution: solution.title,
                                                                    Feature: feature,
                                                                }
                                                            )
                                                        }
                                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                                    >
                                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

                                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                            {feature}
                                                        </span>
                                                    </button>
                                                ))}

                                            </div>

                                        </div>
                                    );
                                })}

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* FROM SCRATCH */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden border-y border-slate-200 bg-slate-950 py-24 text-white dark:border-white/10">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-indigo-950" />

                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-blue-300 backdrop-blur">
                                <Sparkles className="h-4 w-4" />
                                Starting from scratch?
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                You don't have to figure it all out yourself.
                            </h2>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                                If your business is new, expanding, relocating,
                                restructuring, or replacing an old communication
                                environment, we can help you work through the
                                requirements from the beginning.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                                We can help determine what your people need, how
                                departments should communicate, what platforms make
                                sense, what devices are required, how security should
                                work, and how everything should fit together.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "We're starting our communication setup from scratch. I'd like help working through the requirements.",
                                        {
                                            Source: "Business Communication",
                                            Stage: "From scratch",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                            >
                                Start From the Beginning
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                ["Business setup", "Define your communication foundation."],
                                ["People & teams", "Map users, departments, roles, and access."],
                                ["Platforms", "Select appropriate communication tools."],
                                ["Devices", "Prepare approved devices and endpoints."],
                                ["Security", "Protect identities and communication."],
                                ["Support", "Keep everything operating reliably."],
                            ].map(([title, description], index) => (

                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Regarding communication setup, I'd like to discuss "${title}" — ${description}`,
                                            {
                                                Source: "Business Communication",
                                                "Setup area": title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-left backdrop-blur transition hover:bg-white/[0.08]"
                                >

                                    <div className="text-xs font-black tracking-widest text-blue-300">
                                        0{index + 1}
                                    </div>

                                    <h3 className="mt-4 font-bold">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {description}
                                    </p>

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* ========================================================= */}
            {/* BUSINESS EMAIL */}
            {/* ========================================================= */}

            <section className="relative bg-white py-24 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

                        <div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <Mail className="h-7 w-7" />
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                Professional email that represents your business.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Your company email is more than a mailbox. It is
                                part of your identity, customer experience,
                                security posture, and daily operations.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {[
                                    "Custom domain email",
                                    "Mailbox provisioning",
                                    "Shared inboxes",
                                    "Distribution groups",
                                    "Email signatures",
                                    "Spam protection",
                                    "Phishing protection",
                                    "Mailbox migration",
                                    "Mobile configuration",
                                    "Administration",
                                ].map((item) => (

                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss business email: ${item}.`,
                                                {
                                                    Source: "Business Communication",
                                                    "Email feature": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 text-left text-sm font-semibold text-slate-700 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                                    >
                                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                                        {item}
                                    </button>

                                ))}

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to set up professional business email for our organization.",
                                        {
                                            Source: "Business Communication",
                                            Stage: "Business email CTA",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                            >
                                Set Up Business Email
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-slate-900">

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950">

                                <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-white/10">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <Mail className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            Your Company
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Professional mailbox
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5 py-6">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            From
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                            sales@yourcompany.com
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Subject
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                            Welcome to our business
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">
                                        A professional communication experience
                                        from the moment your customer receives
                                        your first message.
                                    </div>

                                </div>

                                <div className="flex justify-end border-t border-slate-100 pt-5 dark:border-white/10">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to see a professional business email preview and discuss setting one up.",
                                                {
                                                    Source: "Business Communication",
                                                    Stage: "Email preview send",
                                                }
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
                                    >
                                        <Send className="h-4 w-4" />
                                        Send
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* UNIFIED COMMUNICATION */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/50">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Unified communication
                        </p>

                        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Stop treating every communication channel as a separate system.
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We can help bring the right combination of email,
                            messaging, voice, video, files, calendars,
                            notifications, and workflows into a more coherent
                            business environment.
                        </p>

                    </div>

                    <div className="relative mx-auto mt-16 max-w-5xl">

                        <div className="absolute left-1/2 top-1/2 hidden h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-500/30 lg:block" />

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {[
                                [Mail, "Email", "Professional business correspondence"],
                                [MessageSquare, "Messaging", "Fast internal collaboration"],
                                [Phone, "Voice", "Business calling and routing"],
                                [Video, "Video", "Meetings and virtual collaboration"],
                                [Cloud, "Cloud", "Shared documents and workspaces"],
                                [Workflow, "Automation", "Alerts, approvals, and notifications"],
                            ].map(([Icon, title, description]) => (

                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to include ${title} in our unified communication environment — ${description}`,
                                            {
                                                Source: "Business Communication",
                                                "Unified channel": title,
                                            }
                                        )
                                    }
                                    className="relative z-10 rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                                >

                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {description}
                                    </p>

                                </button>

                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* SECURITY */}
            {/* ========================================================= */}

            <section className="relative bg-white py-24 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Communication security
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                Communication should be convenient without becoming a security weakness.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Business communication environments contain valuable
                                information. We help organizations establish
                                sensible security controls around users, identities,
                                devices, access, and communication platforms.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss communication security for our organization.",
                                        {
                                            Source: "Business Communication",
                                            Stage: "Security section",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:text-white dark:hover:border-blue-400"
                            >
                                Discuss Security
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                [Shield, "Identity Protection"],
                                [Lock, "Access Controls"],
                                [ShieldCheck, "Authentication"],
                                [Mail, "Email Security"],
                                [Monitor, "Device Awareness"],
                                [Users, "User Policies"],
                            ].map(([Icon, title]) => (

                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${title} for our communication environment.`,
                                            {
                                                Source: "Business Communication",
                                                "Security area": title,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-emerald-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/30"
                                >

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {title}
                                    </span>

                                </button>

                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* AUTOMATION */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/40">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center">

                        <div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                <Zap className="h-7 w-7" />
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                Make communication work automatically.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Not every message needs to be written and sent
                                manually. We can help connect communication with
                                business processes so routine information reaches
                                the right people at the right time.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "Automated customer notifications",
                                    "Internal operational alerts",
                                    "Approval notifications",
                                    "Appointment reminders",
                                    "System-generated reports",
                                    "Order and status updates",
                                    "Employee onboarding messages",
                                    "Security notifications",
                                ].map((item) => (

                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to automate this communication: ${item}.`,
                                                {
                                                    Source: "Business Communication",
                                                    "Automation": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 text-left transition hover:opacity-80"
                                    >
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>

                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>

                                ))}

                            </div>

                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-slate-950">

                            <div className="space-y-4">

                                {[
                                    ["Business Event", "New customer registered"],
                                    ["Workflow", "Communication automation"],
                                    ["Action", "Prepare notification"],
                                    ["Channel", "Email / SMS / App"],
                                    ["Result", "Customer receives update"],
                                ].map(([label, value], index) => (

                                    <React.Fragment key={label}>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    `In an automated communication workflow, I'd like to discuss: ${label} → ${value}.`,
                                                    {
                                                        Source: "Business Communication",
                                                        "Workflow stage": label,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                        >

                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                {label}
                                            </span>

                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                                {value}
                                            </span>

                                        </button>

                                        {index < 4 && (
                                            <div className="flex justify-center">
                                                <ChevronDown className="h-4 w-4 text-blue-500" />
                                            </div>
                                        )}

                                    </React.Fragment>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* REMOTE WORK */}
            {/* ========================================================= */}

            <section className="relative bg-white py-24 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-8 sm:p-12 lg:p-16 dark:border-white/10 dark:from-slate-900 dark:to-blue-950/30">

                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                            <div>

                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Work from anywhere
                                </p>

                                <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                    Keep your teams connected beyond the office.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Modern organizations may have employees in
                                    offices, homes, branches, customer locations,
                                    warehouses, and on the road. Your communication
                                    infrastructure needs to account for that reality.
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                    {[
                                        "Remote employees",
                                        "Multiple branches",
                                        "Mobile teams",
                                        "Field workers",
                                        "Distributed management",
                                        "Virtual meetings",
                                        "Cloud collaboration",
                                        "Secure remote access",
                                    ].map((item) => (

                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to support remote work with: ${item}.`,
                                                    {
                                                        Source: "Business Communication",
                                                        "Remote work": item,
                                                    }
                                                )
                                            }
                                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                        >
                                            <Wifi className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />

                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </button>

                                    ))}

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to enable secure remote work for our team through better communication tools.",
                                            {
                                                Source: "Business Communication",
                                                Stage: "Remote work CTA",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                                >
                                    Enable Remote Work
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>

                            <div className="relative">

                                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">

                                    <div className="grid grid-cols-3 gap-4">

                                        {[
                                            [Monitor, "Office"],
                                            [Smartphone, "Mobile"],
                                            [Globe2, "Remote"],
                                            [Users, "Teams"],
                                            [Cloud, "Cloud"],
                                            [Video, "Meetings"],
                                        ].map(([Icon, label]) => (

                                            <button
                                                type="button"
                                                key={label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to connect our ${label} environment into our communication system.`,
                                                        {
                                                            Source: "Business Communication",
                                                            Environment: label,
                                                        }
                                                    )
                                                }
                                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                            >
                                                <Icon className="mx-auto h-6 w-6 text-blue-600 dark:text-blue-400" />

                                                <p className="mt-3 text-xs font-bold text-slate-600 dark:text-slate-400">
                                                    {label}
                                                </p>
                                            </button>

                                        ))}

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to build a fully connected business communication environment.",
                                                {
                                                    Source: "Business Communication",
                                                    Stage: "Connected environment",
                                                }
                                            )
                                        }
                                        className="mt-5 w-full rounded-2xl bg-slate-950 p-5 text-left text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                                    >

                                        <div className="flex items-center gap-3">
                                            <Network className="h-5 w-5" />

                                            <span className="text-sm font-bold">
                                                Connected business environment
                                            </span>
                                        </div>

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* IMPLEMENTATION PROCESS */}
            {/* ========================================================= */}

            <section className="relative bg-slate-50 py-24 dark:bg-slate-900/50">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            How we work
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            From requirements to reliable communication.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We do not simply give you a platform and leave you to
                            figure everything out. We can work through the entire
                            implementation lifecycle.
                        </p>

                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {workflow.map((item) => (

                            <button
                                type="button"
                                key={item.number}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss the communication implementation step: "${item.title}" — ${item.description}`,
                                        {
                                            Source: "Business Communication",
                                            Step: `${item.number} — ${item.title}`,
                                        }
                                    )
                                }
                                className="relative rounded-3xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                            >

                                <span className="text-sm font-black tracking-widest text-blue-600 dark:text-blue-400">
                                    {item.number}
                                </span>

                                <h3 className="mt-5 text-xl font-black text-slate-900 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.description}
                                </p>

                            </button>

                        ))}

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* BENEFITS */}
            {/* ========================================================= */}

            <section className="relative bg-white py-24 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Business outcomes
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                Better communication creates better operations.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                The goal is not to collect communication tools.
                                The goal is to make your organization easier to
                                operate, easier to reach, and easier to collaborate
                                within.
                            </p>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">

                            {benefits.map((benefit) => (

                                <button
                                    type="button"
                                    key={benefit}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to achieve this outcome: ${benefit}.`,
                                            {
                                                Source: "Business Communication",
                                                Benefit: benefit,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-emerald-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/30"
                                >

                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {benefit}
                                    </span>

                                </button>

                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* INDUSTRIES */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/40">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Built for different environments
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                            Communication for the way your industry works.
                        </h2>

                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {industries.map((industry) => {

                            const Icon = industry.icon;

                            return (
                                <button
                                    type="button"
                                    key={industry.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss communication solutions for ${industry.title}: ${industry.description}`,
                                            {
                                                Source: "Business Communication",
                                                Industry: industry.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {industry.description}
                                    </p>

                                </button>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* TECHNOLOGY ECOSYSTEM */}
            {/* ========================================================= */}

            <section className="relative bg-white py-24 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 sm:p-12 dark:border-white/10 dark:bg-slate-900">

                        <div className="grid gap-12 lg:grid-cols-2">

                            <div>

                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Technology-neutral approach
                                </p>

                                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                    The right tools depend on your requirements.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    We can evaluate communication platforms and
                                    infrastructure based on your organization,
                                    existing environment, users, security needs,
                                    budget, and future plans.
                                </p>

                                <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
                                    The objective is not to force every business
                                    into the same stack. It is to build something
                                    appropriate, maintainable, secure, and scalable.
                                </p>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {[
                                    [Cloud, "Cloud Platforms"],
                                    [Server, "Business Infrastructure"],
                                    [Database, "Business Applications"],
                                    [Code2, "Custom Integrations"],
                                    [Network, "Network Environment"],
                                    [Shield, "Security Layer"],
                                ].map(([Icon, title]) => (

                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss our ${title} as part of the communication technology stack.`,
                                                {
                                                    Source: "Business Communication",
                                                    "Tech layer": title,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                                    >

                                        <Icon className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                            {title}
                                        </span>

                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* SUPPORT */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden bg-slate-950 py-24 text-white">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                                Ongoing support
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Communication systems need ongoing attention.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                People join. People leave. Departments change.
                                Devices are replaced. Policies evolve. Businesses
                                expand.
                            </p>

                            <p className="mt-5 text-base leading-7 text-slate-400">
                                We can continue supporting your communication
                                environment after implementation through
                                administration, troubleshooting, configuration,
                                user support, optimization, and technology planning.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss ongoing communication support for our organization.",
                                        {
                                            Source: "Business Communication",
                                            Stage: "Support section",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                            >
                                Discuss Ongoing Support
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                "User onboarding",
                                "User offboarding",
                                "Mailbox administration",
                                "Configuration changes",
                                "Troubleshooting",
                                "Migration support",
                                "Security assistance",
                                "Platform optimization",
                            ].map((item) => (

                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like ongoing communication support with: ${item}.`,
                                            {
                                                Source: "Business Communication",
                                                "Support task": item,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-left transition hover:bg-white/[0.10]"
                                >
                                    <Headphones className="h-5 w-5 shrink-0 text-blue-300" />

                                    <span className="text-sm font-semibold text-slate-200">
                                        {item}
                                    </span>
                                </button>

                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* ASSESSMENT CTA */}
            {/* ========================================================= */}

            <section
                id="communication-assessment"
                className="relative bg-white py-24 dark:bg-slate-950"
            >

                <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 text-center sm:p-12 lg:p-16 dark:border-blue-400/20 dark:from-blue-950/40 dark:via-slate-900 dark:to-cyan-950/30">

                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                                <MessageSquare className="h-7 w-7" />
                            </div>

                            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Let's assess your environment
                            </p>

                            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                                Tell us what you need to communicate better.
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Whether you need one business email address or a
                                complete communication environment for hundreds of
                                employees and multiple locations, we can help you
                                determine the right path.
                            </p>

                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to request a quote for business communication services. Here's what we need:",
                                            {
                                                Source: "Business Communication",
                                                Stage: "Assessment — request quote",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                                >
                                    Request a Quote
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to talk with your team about our business communication environment.",
                                            {
                                                Source: "Business Communication",
                                                Stage: "Assessment — talk to team",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400"
                                >
                                    Talk to Our Team
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* FAQ */}
            {/* ========================================================= */}

            <section className="relative bg-slate-50 py-24 dark:bg-slate-900/40">

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                            Questions businesses usually ask.
                        </h2>

                    </div>

                    <div className="mt-12 space-y-3">

                        {faqs.map((faq, index) => {

                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950"
                                >

                                    <button
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen ? null : index
                                            )
                                        }
                                        className="flex w-full items-center gap-4 p-5 text-left"
                                    >

                                        <span className="flex-1 font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />

                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-white/10">

                                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source: "Business Communication",
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

            {/* ========================================================= */}
            {/* FINAL CTA */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-14 text-white sm:px-12 lg:px-16">

                        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-950 to-indigo-950" />

                        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

                        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

                            <div className="max-w-3xl">

                                <div className="flex items-center gap-2 text-sm font-bold text-blue-300">
                                    <Sparkles className="h-4 w-4" />
                                    AB TECHNOLOGIES
                                </div>

                                <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                                    Communication, simplified.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-300">
                                    From your first business mailbox to a complete,
                                    secure communication environment — we can help
                                    you plan, source, deploy, integrate, and support
                                    what your organization needs.
                                </p>

                            </div>

                            <div className="shrink-0">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start a conversation about our business communication environment.",
                                            {
                                                Source: "Business Communication",
                                                Stage: "Final CTA",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
                                >
                                    Start a Conversation

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

        </main>
    );
}


/* ===================================================================== */
/* LOCAL ICON COMPONENTS                                                 */
/* ===================================================================== */

function BuildingIcon({ className = "h-6 w-6" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
        >
            <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
            <path d="M2 21h20" />
            <path d="M8 7h2M8 11h2M8 15h2M12 7h2M12 11h2M12 15h2" />
            <path d="M16 10h2a2 2 0 0 1 2 2v9" />
        </svg>
    );
}

function GraduationIcon({ className = "h-6 w-6" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
        >
            <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
            <path d="M7 12v4c2.5 2 7.5 2 10 0v-4" />
            <path d="M21 10v5" />
        </svg>
    );
}

function HeartIcon({ className = "h-6 w-6" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
        >
            <path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.8 2.4Z" />
        </svg>
    );
}

function StoreIcon({ className = "h-6 w-6" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
        >
            <path d="M4 10v10h16V10" />
            <path d="M3 10 5 4h14l2 6" />
            <path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
            <path d="M9 20v-5h6v5" />
        </svg>
    );
}

function BriefcaseIcon({ className = "h-6 w-6" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
        >
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18M10 12v2h4v-2" />
        </svg>
    );
}

function LandmarkIcon({ className = "h-6 w-6" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
        >
            <path d="m3 9 9-5 9 5" />
            <path d="M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8" />
            <path d="M3 20h18" />
        </svg>
    );
}