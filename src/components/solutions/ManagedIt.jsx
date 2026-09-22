import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock3,
    Cloud,
    Code2,
    Cpu,
    Database,
    Headphones,
    LifeBuoy,
    Lock,
    Mail,
    Monitor,
    Network,
    Phone,
    Server,
    Settings,
    Shield,
    ShieldCheck,
    Sparkles,
    Users,
    Wrench,
    Zap,
    Activity,
    AlertTriangle,
    BarChart3,
    Building2,
    Laptop,
    RefreshCw,
    Search,
    Workflow,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function ManagedITSupport() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);
    const [activeService, setActiveService] = useState("all");

    /* ============================================================
       SUPPORT REQUEST HELPER
       ============================================================ */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss Managed IT Support for my organization.",
            metadata: metadata || {
                Source: "Managed IT Support",
            },
        });

        navigate("/support/ai");
    };

    const services = [
        {
            id: "helpdesk",
            title: "IT Helpdesk & User Support",
            description:
                "Responsive technical support for employees, teams, devices, applications, accounts and everyday IT issues.",
            icon: Headphones,
            category: "support",
            features: [
                "Remote technical assistance",
                "User troubleshooting",
                "Application support",
                "Account and access assistance",
                "Email and productivity support",
                "Device troubleshooting",
            ],
        },
        {
            id: "infrastructure",
            title: "Infrastructure Management",
            description:
                "Proactive management of servers, networks, endpoints and core technology infrastructure.",
            icon: Server,
            category: "infrastructure",
            features: [
                "Server monitoring",
                "Network management",
                "Infrastructure health checks",
                "Performance monitoring",
                "Configuration management",
                "Capacity planning",
            ],
        },
        {
            id: "cloud",
            title: "Cloud Management",
            description:
                "Management and optimization of cloud environments, hosted applications, storage and digital infrastructure.",
            icon: Cloud,
            category: "cloud",
            features: [
                "Cloud environment monitoring",
                "Cloud configuration",
                "Backup management",
                "Resource optimization",
                "Access management",
                "Cloud migration support",
            ],
        },
        {
            id: "security",
            title: "IT Security Management",
            description:
                "Practical security controls designed to reduce operational risk and protect business systems.",
            icon: ShieldCheck,
            category: "security",
            features: [
                "Endpoint protection",
                "Access control",
                "Security monitoring",
                "Patch management",
                "Security reviews",
                "Incident response support",
            ],
        },
        {
            id: "backup",
            title: "Backup & Recovery",
            description:
                "Business continuity support designed to help protect important systems and data from loss.",
            icon: Database,
            category: "infrastructure",
            features: [
                "Backup configuration",
                "Backup monitoring",
                "Recovery planning",
                "Data restoration support",
                "Business continuity planning",
                "Recovery testing",
            ],
        },
        {
            id: "devices",
            title: "Device & Endpoint Management",
            description:
                "Centralized management of laptops, desktops, mobile devices and other business endpoints.",
            icon: Laptop,
            category: "support",
            features: [
                "Device setup",
                "Software installation",
                "Endpoint configuration",
                "Updates and patching",
                "Asset tracking",
                "Device troubleshooting",
            ],
        },
        {
            id: "email",
            title: "Business Email & Collaboration",
            description:
                "Support for business communication platforms, email accounts, collaboration tools and productivity systems.",
            icon: Mail,
            category: "cloud",
            features: [
                "Business email setup",
                "Mailbox troubleshooting",
                "Account administration",
                "Collaboration support",
                "Security configuration",
                "User onboarding",
            ],
        },
        {
            id: "network",
            title: "Network Operations",
            description:
                "Ongoing support for connectivity, office networks, Wi-Fi, routing, switching and network performance.",
            icon: Network,
            category: "infrastructure",
            features: [
                "Network monitoring",
                "Wi-Fi support",
                "Router configuration",
                "Switch configuration",
                "Connectivity troubleshooting",
                "Network documentation",
            ],
        },
        {
            id: "applications",
            title: "Business Application Support",
            description:
                "Support for the software applications your organization depends on every day.",
            icon: Code2,
            category: "support",
            features: [
                "Application troubleshooting",
                "Software configuration",
                "User assistance",
                "Integration support",
                "Application monitoring",
                "Issue escalation",
            ],
        },
        {
            id: "monitoring",
            title: "Proactive Monitoring",
            description:
                "Continuous visibility into important systems so potential problems can be identified before they become major disruptions.",
            icon: Activity,
            category: "infrastructure",
            features: [
                "System monitoring",
                "Performance alerts",
                "Availability monitoring",
                "Resource monitoring",
                "Incident detection",
                "Operational reporting",
            ],
        },
        {
            id: "onsite",
            title: "On-Site Technical Support",
            description:
                "Practical technical assistance for situations where remote support is not enough.",
            icon: Wrench,
            category: "support",
            features: [
                "Office visits",
                "Device installation",
                "Network troubleshooting",
                "Equipment deployment",
                "Infrastructure inspection",
                "Technical assistance",
            ],
        },
        {
            id: "consulting",
            title: "IT Advisory & Consulting",
            description:
                "Strategic guidance for organizations planning technology improvements, upgrades or digital expansion.",
            icon: Sparkles,
            category: "consulting",
            features: [
                "Technology assessments",
                "IT planning",
                "Infrastructure recommendations",
                "Technology roadmaps",
                "Budget planning",
                "Digital improvement strategies",
            ],
        },
    ];

    const filteredServices =
        activeService === "all"
            ? services
            : services.filter((service) => service.category === activeService);

    const serviceCategories = [
        { id: "all", label: "All Services" },
        { id: "support", label: "Support" },
        { id: "infrastructure", label: "Infrastructure" },
        { id: "cloud", label: "Cloud" },
        { id: "security", label: "Security" },
        { id: "consulting", label: "Consulting" },
    ];

    const supportLevels = [
        {
            title: "Essential",
            subtitle: "For small teams",
            description:
                "A practical support foundation for organizations that need dependable technical assistance without maintaining a large internal IT department.",
            icon: LifeBuoy,
            features: [
                "Remote helpdesk support",
                "Basic troubleshooting",
                "User assistance",
                "Device support",
                "Application support",
                "Routine IT guidance",
            ],
        },
        {
            title: "Managed",
            subtitle: "For growing organizations",
            description:
                "A proactive managed IT model combining support, monitoring, infrastructure management and ongoing technology maintenance.",
            icon: Settings,
            features: [
                "Everything in Essential",
                "Proactive monitoring",
                "Endpoint management",
                "Patch management",
                "Backup monitoring",
                "Regular IT reviews",
                "Infrastructure support",
            ],
            featured: true,
        },
        {
            title: "Advanced",
            subtitle: "For complex environments",
            description:
                "A broader technology management service for organizations with more complex infrastructure, security and operational requirements.",
            icon: Shield,
            features: [
                "Everything in Managed",
                "Advanced infrastructure support",
                "Security management",
                "Cloud management",
                "Strategic IT planning",
                "Priority escalation",
                "Technology optimization",
            ],
        },
    ];

    const process = [
        {
            number: "01",
            title: "Understand",
            description:
                "We start by understanding your organization, users, systems, devices, infrastructure and operational priorities.",
            icon: Search,
        },
        {
            number: "02",
            title: "Assess",
            description:
                "We review your current technology environment and identify risks, recurring problems, inefficiencies and improvement opportunities.",
            icon: Activity,
        },
        {
            number: "03",
            title: "Stabilize",
            description:
                "We address urgent issues and establish a reliable baseline for your technology environment.",
            icon: ShieldCheck,
        },
        {
            number: "04",
            title: "Manage",
            description:
                "We continuously support, monitor and maintain the agreed systems and services.",
            icon: Settings,
        },
        {
            number: "05",
            title: "Improve",
            description:
                "We use operational insights to recommend improvements, upgrades, automation and better ways of working.",
            icon: RefreshCw,
        },
    ];

    const benefits = [
        {
            title: "Less Downtime",
            description:
                "Identify and resolve technology issues quickly while reducing recurring problems.",
            icon: Clock3,
        },
        {
            title: "Predictable IT",
            description:
                "Move from reactive firefighting toward structured, monitored technology operations.",
            icon: Activity,
        },
        {
            title: "Better Security",
            description:
                "Maintain practical security controls across users, devices, applications and infrastructure.",
            icon: Lock,
        },
        {
            title: "Lower Operational Burden",
            description:
                "Give your team access to technical expertise without building every capability internally.",
            icon: Users,
        },
        {
            title: "Better Visibility",
            description:
                "Understand the health and performance of your technology environment.",
            icon: BarChart3,
        },
        {
            title: "Room to Grow",
            description:
                "Build technology operations that can scale alongside your organization.",
            icon: Zap,
        },
    ];

    const faqs = [
        {
            question: "Do you only support companies with large IT departments?",
            answer:
                "No. Managed IT support can be especially useful for small and growing organizations that need professional technical support without maintaining a large internal IT team.",
        },
        {
            question: "Can you work with our existing IT team?",
            answer:
                "Yes. We can operate as an extension of an existing IT department, taking responsibility for specific services or providing additional technical capacity when required.",
        },
        {
            question: "Can you provide both remote and on-site support?",
            answer:
                "Yes. Many issues can be handled remotely, while hardware deployments, physical infrastructure work and situations requiring hands-on intervention can be handled through on-site support.",
        },
        {
            question: "Do you support cloud systems?",
            answer:
                "Yes. Cloud management can include monitoring, configuration, access management, backup support, optimization and assistance with migrations or hosted business systems.",
        },
        {
            question: "Can you support newly established businesses?",
            answer:
                "Absolutely. We can help organizations start from the ground up, including technology planning, device procurement, networking, business applications, cloud services, security and ongoing support.",
        },
        {
            question: "Can you manage devices purchased from another supplier?",
            answer:
                "Yes. Managed support does not require that every device was originally procured through us. We can assess and manage compatible existing technology.",
        },
        {
            question: "Can you help us create an IT roadmap?",
            answer:
                "Yes. We can assess your current environment, understand your goals and develop a practical roadmap covering infrastructure, software, security, cloud, devices and future improvements.",
        },
        {
            question: "Can you provide support outside normal working hours?",
            answer:
                "Support availability can be structured according to the requirements of the engagement. Critical environments can have more comprehensive support arrangements where appropriate.",
        },
    ];

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.13),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_28%),linear-gradient(135deg,#f8fafc,#eef6ff_55%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.15),transparent_28%),linear-gradient(135deg,#020617,#07152e_55%,#020617)]" />

                <div className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.06]">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(100,116,139,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.8) 1px, transparent 1px)",
                            backgroundSize: "42px 42px",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
                                </span>
                                Managed IT • Support • Infrastructure • Security
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                                Your IT should{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                                    work for your business.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We help businesses build, manage, secure and support
                                the technology they depend on — from everyday user
                                support to networks, devices, cloud infrastructure,
                                security, applications and complete IT environments.
                            </p>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                Whether you are starting from scratch, growing an
                                existing organization or trying to bring order to a
                                complicated IT environment, we can help you establish
                                a practical technology foundation and keep it running.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss our IT needs. Here's what we're trying to solve:",
                                            {
                                                Source: "Managed IT Support",
                                                Stage: "Hero — discuss needs",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white shadow-xl shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Discuss Your IT Needs
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your managed IT services and support options.",
                                            {
                                                Source: "Managed IT Support",
                                                Stage: "Hero — explore services",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400/40 dark:hover:text-blue-300"
                                >
                                    Explore Managed Services
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    ["24/7", "Monitoring-ready"],
                                    ["Remote", "Support"],
                                    ["On-site", "Assistance"],
                                    ["Proactive", "Management"],
                                ].map(([value, label]) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${value} ${label.toLowerCase()} for our managed IT environment.`,
                                                {
                                                    Source: "Managed IT Support",
                                                    Focus: `${value} — ${label}`,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/65 p-4 text-left backdrop-blur transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                    >
                                        <div className="text-lg font-black text-slate-950 dark:text-white">
                                            {value}
                                        </div>
                                        <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                            {label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/85 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">

                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                                IT Operations
                                            </p>
                                            <h2 className="mt-1 text-lg font-black">
                                                Environment Overview
                                            </h2>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            {
                                                label: "Systems",
                                                value: "Healthy",
                                                icon: Server,
                                            },
                                            {
                                                label: "Network",
                                                value: "Operational",
                                                icon: Network,
                                            },
                                            {
                                                label: "Security",
                                                value: "Monitored",
                                                icon: ShieldCheck,
                                            },
                                            {
                                                label: "Backups",
                                                value: "Protected",
                                                icon: Database,
                                            },
                                        ].map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <button
                                                    type="button"
                                                    key={item.label}
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I'd like to discuss our ${item.label} — current status: ${item.value}.`,
                                                            {
                                                                Source: "Managed IT Support",
                                                                "Environment area": item.label,
                                                            }
                                                        )
                                                    }
                                                    className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                    </div>

                                                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                                                        {item.label}
                                                    </p>

                                                    <p className="mt-1 text-sm font-bold">
                                                        {item.value}
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to improve our operational readiness across monitored systems.",
                                                {
                                                    Source: "Managed IT Support",
                                                    Focus: "Operational readiness",
                                                }
                                            )
                                        }
                                        className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold">
                                                Operational readiness
                                            </span>
                                            <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                                                96%
                                            </span>
                                        </div>

                                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                            <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                                        </div>

                                        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 dark:text-slate-400">
                                            <span>Monitored</span>
                                            <span>Maintained</span>
                                            <span>Supported</span>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to log a technical support request or discuss how support is handled.",
                                                {
                                                    Source: "Managed IT Support",
                                                    Stage: "Hero — support available",
                                                }
                                            )
                                        }
                                        className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left transition hover:border-blue-300 dark:border-blue-400/10 dark:bg-blue-500/[0.07] dark:hover:border-blue-400/40"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <Headphones className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold">
                                                Technical support available
                                            </p>
                                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                Issues can be logged, assessed and escalated through your support arrangement.
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                TRUST STRIP
            ========================================================= */}

            <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto grid max-w-7xl gap-px px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Security-minded",
                            text: "Technology managed with security and access controls in mind.",
                        },
                        {
                            icon: Activity,
                            title: "Proactive",
                            text: "Focus on preventing recurring problems rather than only reacting to them.",
                        },
                        {
                            icon: Users,
                            title: "Business-focused",
                            text: "IT decisions aligned with how your organization actually operates.",
                        },
                        {
                            icon: Wrench,
                            title: "Practical",
                            text: "Solutions designed around reliability, usability and maintainability.",
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss your "${item.title}" approach — ${item.text}`,
                                        {
                                            Source: "Managed IT Support",
                                            "Trust pillar": item.title,
                                        }
                                    )
                                }
                                className="flex gap-4 border-slate-200 py-7 text-left transition hover:bg-slate-50 sm:border-r sm:px-6 first:sm:pl-0 last:sm:border-r-0 last:sm:pr-0 dark:border-white/10 dark:hover:bg-white/[0.03]"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-600 dark:bg-white/5 dark:text-blue-400">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* =========================================================
                INTRODUCTION
            ========================================================= */}

            <section className="relative py-20 lg:py-28">
                <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Managed technology
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                One technology partner for the things your business depends on.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Modern organizations depend on more than computers.
                                They depend on connectivity, applications, data,
                                communication systems, cloud platforms, security,
                                backups and the people who use them.
                            </p>

                            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Our managed IT approach brings those pieces together
                                into a structured support environment, helping your
                                organization keep its technology reliable while
                                continuing to grow.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to consolidate our technology management under one partner. Here's our current situation:",
                                        {
                                            Source: "Managed IT Support",
                                            Stage: "Introduction — one partner",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                            >
                                Discuss a managed approach
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;

                                return (
                                    <button
                                        type="button"
                                        key={benefit.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to achieve this managed IT outcome: ${benefit.title} — ${benefit.description}`,
                                                {
                                                    Source: "Managed IT Support",
                                                    Benefit: benefit.title,
                                                }
                                            )
                                        }
                                        className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30 dark:hover:bg-white/[0.055]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-black">
                                            {benefit.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {benefit.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                SERVICES
            ========================================================= */}

            <section
                id="services"
                className="relative overflow-hidden border-y border-slate-200 bg-slate-100/80 py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28"
            >
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl dark:bg-cyan-500/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What we manage
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Comprehensive IT support without unnecessary complexity.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            Select the areas that matter most to your organization.
                            Services can be structured individually or combined into
                            a broader managed IT arrangement.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-2">
                        {serviceCategories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => {
                                    setActiveService(category.id);
                                    startSupportChat(
                                        `I'd like to explore managed IT services in the "${category.label}" category.`,
                                        {
                                            Source: "Managed IT Support",
                                            Category: category.label,
                                        }
                                    );
                                }}
                                className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeService === category.id
                                    ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                                    : "border border-slate-300 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/40 dark:hover:text-blue-300"
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredServices.map((service) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={service.id}
                                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-blue-400/30"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the service: ${service.title} — ${service.description}`,
                                                {
                                                    Source: "Managed IT Support",
                                                    Service: service.title,
                                                }
                                            )
                                        }
                                        className="text-left"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500 dark:text-slate-700" />
                                        </div>

                                        <h3 className="mt-6 text-xl font-black">
                                            {service.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {service.description}
                                        </p>
                                    </button>

                                    <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5 dark:border-white/10">
                                        {service.features.map((feature) => (
                                            <li key={feature}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `For "${service.title}", I'd like to discuss: ${feature}.`,
                                                            {
                                                                Source: "Managed IT Support",
                                                                Service: service.title,
                                                                Feature: feature,
                                                            }
                                                        )
                                                    }
                                                    className="flex w-full items-start gap-2.5 text-left text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                                                >
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                                    <span>{feature}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto pt-7">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss the service: ${service.title}.`,
                                                    {
                                                        Source: "Managed IT Support",
                                                        Service: service.title,
                                                        Stage: "Service card CTA",
                                                    }
                                                )
                                            }
                                            className="inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                        >
                                            Discuss this service
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                FROM SCRATCH
            ========================================================= */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">

                        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                            <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-12 lg:p-14">
                                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
                                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

                                <div className="relative">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                                        <Building2 className="h-7 w-7 text-blue-300" />
                                    </div>

                                    <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
                                        Starting from scratch?
                                    </p>

                                    <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                        We can help build the IT foundation too.
                                    </h2>

                                    <p className="mt-5 leading-8 text-slate-300">
                                        You do not need to already have a sophisticated
                                        IT environment before engaging us. We can help
                                        you plan and establish the technology foundation
                                        your organization needs.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "We're starting from scratch and would like an IT assessment to plan our technology foundation.",
                                                {
                                                    Source: "Managed IT Support",
                                                    Stage: "From scratch — assessment",
                                                }
                                            )
                                        }
                                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-blue-50"
                                    >
                                        Start with an assessment
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 sm:p-12 lg:p-14">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {[
                                        {
                                            icon: Monitor,
                                            title: "Workstations",
                                            text: "Plan and deploy laptops, desktops, peripherals and user devices.",
                                        },
                                        {
                                            icon: Network,
                                            title: "Connectivity",
                                            text: "Design practical office networking, Wi-Fi and connectivity infrastructure.",
                                        },
                                        {
                                            icon: Cloud,
                                            title: "Cloud Services",
                                            text: "Set up appropriate cloud, hosting, storage and collaboration services.",
                                        },
                                        {
                                            icon: Mail,
                                            title: "Communication",
                                            text: "Establish business email and collaboration systems for your team.",
                                        },
                                        {
                                            icon: Shield,
                                            title: "Security",
                                            text: "Build foundational access, endpoint and security controls.",
                                        },
                                        {
                                            icon: Settings,
                                            title: "Management",
                                            text: "Put support, monitoring, maintenance and documentation in place.",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                type="button"
                                                key={item.title}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like help establishing ${item.title} — ${item.text}`,
                                                        {
                                                            Source: "Managed IT Support",
                                                            "Foundation area": item.title,
                                                        }
                                                    )
                                                }
                                                className="flex gap-4 rounded-2xl p-2 text-left transition hover:bg-blue-50/60 dark:hover:bg-white/[0.04]"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <h3 className="font-black">
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

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPORT LEVELS
            ========================================================= */}

            <section className="bg-slate-100/70 py-20 dark:bg-slate-900/30 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Flexible support
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Choose the level of support your organization actually needs.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            Not every organization needs the same level of IT
                            management. Your service can be structured around your
                            environment, users, systems and priorities.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {supportLevels.map((level) => {
                            const Icon = level.icon;

                            return (
                                <div
                                    key={level.title}
                                    className={`relative rounded-3xl border p-7 ${level.featured
                                        ? "border-blue-500 bg-white shadow-xl shadow-blue-900/10 dark:border-blue-400/40 dark:bg-slate-950"
                                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950/60"
                                        }`}
                                >
                                    {level.featured && (
                                        <div className="absolute -top-3 left-7 rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                                            Popular choice
                                        </div>
                                    )}

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                        {level.subtitle}
                                    </p>

                                    <h3 className="mt-2 text-2xl font-black">
                                        {level.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {level.description}
                                    </p>

                                    <ul className="mt-7 space-y-3">
                                        {level.features.map((feature) => (
                                            <li key={feature}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `In the "${level.title}" support level, I'd like to discuss: ${feature}.`,
                                                            {
                                                                Source: "Managed IT Support",
                                                                "Support level": level.title,
                                                                Feature: feature,
                                                            }
                                                        )
                                                    }
                                                    className="flex w-full gap-2.5 text-left text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                                                >
                                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                                    {feature}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the "${level.title}" support level (${level.subtitle}).`,
                                                {
                                                    Source: "Managed IT Support",
                                                    "Support level": level.title,
                                                    Stage: "Support level CTA",
                                                }
                                            )
                                        }
                                        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition ${level.featured
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "border border-slate-300 text-slate-800 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:text-white dark:hover:border-blue-400"
                                            }`}
                                    >
                                        Discuss this option
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCESS
            ========================================================= */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                How we work
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                A structured approach to managed IT.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Good IT support is not simply answering tickets.
                                We look at the environment as a whole, understand
                                what the business needs and create a management
                                approach that can improve over time.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss continuous improvement in managed IT — turning recurring problems into long-term fixes.",
                                        {
                                            Source: "Managed IT Support",
                                            Stage: "Process — continuous improvement",
                                        }
                                    )
                                }
                                className="mt-8 w-full rounded-3xl border border-blue-100 bg-blue-50 p-6 text-left transition hover:border-blue-300 dark:border-blue-400/10 dark:bg-blue-500/[0.06] dark:hover:border-blue-400/40"
                            >
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <Workflow className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-black">
                                            Continuous improvement
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            We aim to turn recurring technical
                                            problems into documented processes,
                                            improvements or long-term solutions.
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {process.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.number}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to understand the "${item.title}" stage of your managed IT process — ${item.description}`,
                                                {
                                                    Source: "Managed IT Support",
                                                    Step: `${item.number} — ${item.title}`,
                                                }
                                            )
                                        }
                                        className="relative flex w-full gap-5 rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                    >
                                        {index < process.length - 1 && (
                                            <div className="absolute left-[2.45rem] top-[4.6rem] hidden h-8 w-px bg-slate-200 sm:block dark:bg-white/10" />
                                        )}

                                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-xs font-black tracking-widest text-blue-600 dark:text-blue-400">
                                                    {item.number}
                                                </span>

                                                <h3 className="text-xl font-black">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                MONITORING
            ========================================================= */}

            <section className="border-y border-slate-200 bg-slate-950 py-20 text-white dark:border-white/10 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-blue-300">
                                <Activity className="h-4 w-4" />
                                Proactive operations
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Don't wait for your technology to fail before you pay attention to it.
                            </h2>

                            <p className="mt-6 leading-8 text-slate-300">
                                Proactive IT management focuses on visibility,
                                maintenance and early identification of issues.
                                Instead of only responding when employees cannot
                                work, we help establish monitoring and maintenance
                                practices around important systems.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Monitor important systems and infrastructure",
                                    "Identify unusual performance or availability issues",
                                    "Keep devices and software maintained",
                                    "Review recurring technical problems",
                                    "Track important operational risks",
                                    "Create escalation paths for significant incidents",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like proactive monitoring that can: ${item}.`,
                                                {
                                                    Source: "Managed IT Support",
                                                    "Proactive item": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-start gap-3 text-left transition hover:opacity-90"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                                        <span className="text-sm leading-6 text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-full bg-blue-600/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                                <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-slate-500">
                                                System monitoring
                                            </p>
                                            <p className="mt-1 font-black">
                                                Live environment snapshot
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                            Operational
                                        </div>
                                    </div>

                                    <div className="mt-5 space-y-3">
                                        {[
                                            ["Network availability", "99.9%", "Healthy"],
                                            ["Server resources", "Normal", "Healthy"],
                                            ["Endpoint status", "98%", "Monitored"],
                                            ["Backup status", "Current", "Protected"],
                                            ["Security controls", "Active", "Protected"],
                                        ].map(([label, value, status]) => (
                                            <button
                                                type="button"
                                                key={label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Monitoring detail: ${label} — currently ${value} (${status}).`,
                                                        {
                                                            Source: "Managed IT Support",
                                                            "Monitoring metric": label,
                                                        }
                                                    )
                                                }
                                                className="w-full rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-blue-400/40"
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm font-bold">
                                                            {label}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {status}
                                                        </p>
                                                    </div>

                                                    <span className="text-sm font-black text-blue-300">
                                                        {value}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
                                        <div className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                            <div>
                                                <p className="text-sm font-bold">
                                                    No critical issues detected
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                                    Monitoring and support processes help maintain operational visibility.
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
                SECURITY
            ========================================================= */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div className="order-2 lg:order-1">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        icon: Lock,
                                        title: "Access control",
                                        text: "Help ensure users have appropriate access to systems and information.",
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Endpoint protection",
                                        text: "Support security controls across business devices.",
                                    },
                                    {
                                        icon: RefreshCw,
                                        title: "Patch management",
                                        text: "Keep supported systems and software maintained.",
                                    },
                                    {
                                        icon: Database,
                                        title: "Recovery",
                                        text: "Maintain backup and recovery practices for important data.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <button
                                            type="button"
                                            key={item.title}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss ${item.title} — ${item.text}`,
                                                    {
                                                        Source: "Managed IT Support",
                                                        "Security control": item.title,
                                                    }
                                                )
                                            }
                                            className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                        >
                                            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />

                                            <h3 className="mt-5 font-black">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {item.text}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Security-aware support
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                IT management should not create another security problem.
                            </h2>

                            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
                                Security is not something that should be bolted onto
                                IT operations at the end. We consider access,
                                endpoints, updates, backups and operational practices
                                as part of the technology management conversation.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss security-aware IT management for our organization.",
                                        {
                                            Source: "Managed IT Support",
                                            Stage: "Security section CTA",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:text-white dark:hover:border-blue-400"
                            >
                                Discuss Security
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <div className="mt-7 rounded-3xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-400/10 dark:bg-amber-500/[0.06]">
                                <div className="flex gap-3">
                                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        No IT service can eliminate every security
                                        risk. The objective is to establish sensible
                                        controls, visibility, maintenance and
                                        response processes appropriate to the
                                        organization's environment.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                BUSINESS SCENARIOS
            ========================================================= */}

            <section className="bg-slate-100/70 py-20 dark:bg-slate-900/30 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Built around your organization
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Managed IT can fit different stages of business.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            Your needs change as your organization changes. Our
                            approach can adapt from initial setup through growth
                            and increasingly complex technology environments.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "New Business",
                                icon: Sparkles,
                                text: "Start with the right devices, connectivity, applications, security and support processes.",
                            },
                            {
                                title: "Growing Team",
                                icon: Users,
                                text: "Add users, devices, systems and locations without letting IT become chaotic.",
                            },
                            {
                                title: "Established Business",
                                icon: Building2,
                                text: "Improve an existing environment, address recurring problems and strengthen operations.",
                            },
                            {
                                title: "Complex Environment",
                                icon: Server,
                                text: "Coordinate infrastructure, cloud, applications, security and support across a broader environment.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss managed IT for a "${item.title}" scenario — ${item.text}`,
                                            {
                                                Source: "Managed IT Support",
                                                Scenario: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-blue-600 dark:bg-white/5 dark:text-blue-400">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT + DEPLOYMENT CONNECTION
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">

                        <div className="grid lg:grid-cols-2">

                            <div className="p-8 sm:p-12 lg:p-14">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Cpu className="h-6 w-6" />
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight">
                                    Need hardware too?
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                    Managed IT can connect naturally with your
                                    hardware procurement and deployment requirements.
                                    Instead of buying equipment without considering
                                    how it will be managed afterward, we can help
                                    think through the complete lifecycle.
                                </p>

                                <div className="mt-7 space-y-3">
                                    {[
                                        "Identify suitable devices",
                                        "Plan quantities and specifications",
                                        "Coordinate procurement",
                                        "Prepare and configure devices",
                                        "Deploy to users",
                                        "Maintain and support them",
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Regarding hardware lifecycle, I'd like to discuss: ${item}.`,
                                                    {
                                                        Source: "Managed IT Support",
                                                        "Hardware step": item,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center gap-3 text-left text-sm font-medium text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                                        >
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss hardware procurement and deployment alongside managed IT.",
                                            {
                                                Source: "Managed IT Support",
                                                Stage: "Procurement CTA",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                                >
                                    Discuss Hardware Needs
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-8 text-white sm:p-12 lg:p-14">
                                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

                                <div className="relative">
                                    <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-200">
                                        Complete lifecycle
                                    </p>

                                    <h3 className="mt-4 text-3xl font-black">
                                        Procure → Deploy → Manage → Improve
                                    </h3>

                                    <p className="mt-5 leading-8 text-blue-100">
                                        The real value of IT is not simply purchasing
                                        technology. It is making sure the technology
                                        remains useful, supported and aligned with
                                        the organization over time.
                                    </p>

                                    <div className="mt-9 grid grid-cols-2 gap-3">
                                        {[
                                            "Procurement",
                                            "Deployment",
                                            "Configuration",
                                            "Support",
                                            "Maintenance",
                                            "Security",
                                            "Monitoring",
                                            "Optimization",
                                        ].map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to include ${item} in our IT lifecycle.`,
                                                        {
                                                            Source: "Managed IT Support",
                                                            "Lifecycle stage": item,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-bold backdrop-blur transition hover:bg-white/20"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                REPORTING
            ========================================================= */}

            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Visibility & reporting
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Know what is happening with your IT environment.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                A managed relationship should give you more than
                                technical assistance. It should give decision-makers
                                enough visibility to understand issues, priorities,
                                risks and improvement opportunities.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    "Support activity",
                                    "Recurring issues",
                                    "Infrastructure health",
                                    "Device status",
                                    "Security observations",
                                    "Backup status",
                                    "Recommended improvements",
                                    "Technology priorities",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like reporting visibility on: ${item}.`,
                                                {
                                                    Source: "Managed IT Support",
                                                    "Reporting item": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-bold transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                    >
                                        <BarChart3 className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">
                            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-400">
                                            Monthly overview
                                        </p>
                                        <p className="mt-1 font-black">
                                            IT Operations
                                        </p>
                                    </div>

                                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>

                                <div className="mt-7 grid grid-cols-3 gap-3">
                                    {[
                                        ["Tickets", "48"],
                                        ["Resolved", "44"],
                                        ["Open", "4"],
                                    ].map(([label, value]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss our "${label}" metric — current value: ${value}.`,
                                                    {
                                                        Source: "Managed IT Support",
                                                        Metric: label,
                                                    }
                                                )
                                            }
                                            className="rounded-2xl bg-slate-50 p-4 text-center transition hover:bg-blue-50 dark:bg-white/[0.035] dark:hover:bg-blue-500/10"
                                        >
                                            <p className="text-xl font-black">
                                                {value}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {label}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-5 space-y-3">
                                    {[
                                        ["User support", 82],
                                        ["Infrastructure", 68],
                                        ["Security", 91],
                                        ["Backups", 96],
                                    ].map(([label, value]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to improve our "${label}" — currently at ${value}%.`,
                                                    {
                                                        Source: "Managed IT Support",
                                                        "Report area": label,
                                                    }
                                                )
                                            }
                                            className="w-full text-left"
                                        >
                                            <div className="mb-1.5 flex justify-between text-xs font-bold">
                                                <span>{label}</span>
                                                <span className="text-slate-500 dark:text-slate-400">
                                                    {value}%
                                                </span>
                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                                <div
                                                    className="h-full rounded-full bg-blue-600"
                                                    style={{ width: `${value}%` }}
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Questions about managed IT support?
                        </h2>

                        <p className="mt-4 text-slate-500 dark:text-slate-400">
                            Here are some of the questions organizations commonly ask.
                        </p>
                    </div>

                    <div className="mt-10 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="font-bold">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-white/10">
                                            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source: "Managed IT Support",
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

            {/* =========================================================
                CTA
            ========================================================= */}

            <section
                id="assessment"
                className="relative overflow-hidden py-20 lg:py-28"
            >
                <div className="absolute inset-0 -z-10 bg-slate-950 dark:bg-black" />

                <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                        <Headphones className="h-7 w-7 text-blue-300" />
                    </div>

                    <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
                        Let's talk about your IT
                    </p>

                    <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                        From one device to an entire IT environment, we can help you build a plan.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
                        Tell us what you have, what is not working, what you are
                        trying to achieve or what you are planning to build. We can
                        help you identify the right next steps and determine which
                        services make sense for your organization.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request an IT assessment. Here's our current situation:",
                                    {
                                        Source: "Managed IT Support",
                                        Stage: "Final CTA — IT assessment",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-black text-slate-950 transition hover:bg-blue-50"
                        >
                            <Mail className="h-4 w-4" />
                            Request an IT Assessment
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to talk with your team about managed IT support.",
                                    {
                                        Source: "Managed IT Support",
                                        Stage: "Final CTA — talk to team",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-black text-white transition hover:bg-white/10"
                        >
                            <Phone className="h-4 w-4" />
                            Talk to Our Team
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-400">
                        {[
                            "Practical recommendations",
                            "Business-focused approach",
                            "Scalable support",
                        ].map((label) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss: ${label}.`,
                                        {
                                            Source: "Managed IT Support",
                                            "Final bullet": label,
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 transition hover:text-white"
                            >
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}