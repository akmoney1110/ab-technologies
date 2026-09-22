import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Building2,
    Check,
    ChevronDown,
    ChevronRight,
    ClipboardCheck,
    Cloud,
    Code2,
    Cpu,
    Database,
    FileCheck2,
    FileText,
    Globe2,
    Headphones,
    Landmark,
    Layers3,
    LockKeyhole,
    Mail,
    MapPin,
    Network,
    PackageCheck,
    Phone,
    Presentation,
    Server,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Target,
    Truck,
    Users,
    Workflow,
    Wrench,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function GovernmentPublicSector() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("procurement");
    const [openFaq, setOpenFaq] = useState(null);

    /* ============================================================
       SUPPORT REQUEST HELPER
       ============================================================ */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss Government & Public Sector technology solutions for our institution.",
            metadata: metadata || {
                Source: "Government & Public Sector",
            },
        });

        navigate("/support/ai");
    };

    const services = [
        {
            icon: ShoppingCart,
            title: "Government Procurement",
            description:
                "Structured procurement support for computers, servers, networking equipment, peripherals, software, communication systems, office technology and other ICT requirements.",
            points: [
                "Bulk hardware procurement",
                "Institutional ICT supplies",
                "Equipment specification support",
                "Vendor sourcing",
                "Competitive quotations",
                "Product verification",
            ],
        },
        {
            icon: Network,
            title: "Network Infrastructure",
            description:
                "Plan, supply, deploy and support secure network environments for ministries, departments, agencies, public offices and government facilities.",
            points: [
                "LAN and WAN infrastructure",
                "Structured cabling",
                "Wireless networks",
                "Network equipment",
                "Internet infrastructure",
                "Network monitoring",
            ],
        },
        {
            icon: ShieldCheck,
            title: "Cybersecurity",
            description:
                "Practical security solutions designed to protect government systems, information, devices, networks and digital services.",
            points: [
                "Endpoint protection",
                "Access control",
                "Network security",
                "Security hardening",
                "Backup strategies",
                "Security awareness",
            ],
        },
        {
            icon: Code2,
            title: "Software Solutions",
            description:
                "Custom software and digital platforms that help public institutions improve processes, manage information and deliver services more effectively.",
            points: [
                "Web applications",
                "Internal portals",
                "Management systems",
                "Workflow platforms",
                "Data dashboards",
                "Document systems",
            ],
        },
        {
            icon: Cloud,
            title: "Cloud & Digital Infrastructure",
            description:
                "Modern cloud, hosting, storage, backup and infrastructure solutions for institutions moving from fragmented systems to connected digital environments.",
            points: [
                "Cloud hosting",
                "Application hosting",
                "Backup infrastructure",
                "Storage systems",
                "Infrastructure migration",
                "Managed cloud services",
            ],
        },
        {
            icon: Headphones,
            title: "Managed IT & Support",
            description:
                "Ongoing technical support for institutions that need reliable assistance after deployment, procurement or infrastructure implementation.",
            points: [
                "Helpdesk support",
                "Device maintenance",
                "Network support",
                "Remote assistance",
                "On-site support",
                "Preventive maintenance",
            ],
        },
    ];

    const procurementAreas = [
        {
            icon: Cpu,
            title: "Computers & End-User Devices",
            description:
                "Desktop computers, laptops, workstations, monitors, tablets and related accessories for administrative and operational teams.",
        },
        {
            icon: Server,
            title: "Servers & Data Infrastructure",
            description:
                "Servers, storage systems, backup devices, racks, UPS systems and infrastructure components for institutional environments.",
        },
        {
            icon: Network,
            title: "Networking Equipment",
            description:
                "Switches, routers, wireless access points, firewalls, structured cabling and supporting network infrastructure.",
        },
        {
            icon: Presentation,
            title: "Meeting & Presentation Technology",
            description:
                "Projectors, displays, conferencing equipment, presentation systems and meeting-room technology.",
        },
        {
            icon: LockKeyhole,
            title: "Security Technology",
            description:
                "Access-control technology, surveillance-related infrastructure, endpoint security and other approved security systems.",
        },
        {
            icon: PackageCheck,
            title: "ICT Accessories & Consumables",
            description:
                "Keyboards, mice, cables, adapters, storage devices, power accessories, printing supplies and other operational requirements.",
        },
    ];

    const projectStages = [
        {
            number: "01",
            title: "Requirement Discovery",
            description:
                "We begin by understanding the institution, department, project objectives, quantities, technical requirements, delivery expectations and operational constraints.",
            icon: Target,
        },
        {
            number: "02",
            title: "Specification Development",
            description:
                "Where required, we help translate operational requirements into clear technical specifications that can be used for sourcing, quotation and project planning.",
            icon: FileText,
        },
        {
            number: "03",
            title: "Market & Vendor Sourcing",
            description:
                "We identify appropriate suppliers and available products based on specifications, quantity, quality, availability and project requirements.",
            icon: Globe2,
        },
        {
            number: "04",
            title: "Quotation & Evaluation",
            description:
                "We organize pricing information and technical details so decision-makers can compare suitable options more clearly.",
            icon: ClipboardCheck,
        },
        {
            number: "05",
            title: "Verification",
            description:
                "Products and proposed solutions can be checked against agreed specifications before final delivery or deployment.",
            icon: FileCheck2,
        },
        {
            number: "06",
            title: "Delivery & Logistics",
            description:
                "We coordinate delivery requirements, quantities, destinations and project schedules for institutional deployments.",
            icon: Truck,
        },
        {
            number: "07",
            title: "Deployment",
            description:
                "For projects requiring implementation, our technical team can assist with installation, configuration, integration and rollout.",
            icon: Wrench,
        },
        {
            number: "08",
            title: "Support & Continuity",
            description:
                "After implementation, support and maintenance options can help keep the environment operational and useful over time.",
            icon: Headphones,
        },
    ];

    const solutions = [
        {
            title: "Digital Government Portals",
            description:
                "Public-facing and internal digital platforms that help institutions move services and workflows online.",
            icon: Globe2,
        },
        {
            title: "Internal Administration Systems",
            description:
                "Systems for managing employees, departments, documents, requests, workflows, records and operational activities.",
            icon: Building2,
        },
        {
            title: "Document & Records Management",
            description:
                "Digital tools for organizing institutional documents, records, approvals and information workflows.",
            icon: FileText,
        },
        {
            title: "Asset Management",
            description:
                "Technology solutions for tracking equipment, assignments, locations, maintenance and institutional assets.",
            icon: PackageCheck,
        },
        {
            title: "Data & Reporting Platforms",
            description:
                "Dashboards and reporting systems that help teams turn operational data into useful management information.",
            icon: Database,
        },
        {
            title: "Workflow Automation",
            description:
                "Automate repetitive administrative processes, notifications, approvals, routing and internal requests.",
            icon: Workflow,
        },
    ];

    const infrastructure = [
        "Office LAN deployment",
        "Inter-office networking",
        "Wireless infrastructure",
        "Internet connectivity infrastructure",
        "Structured cabling",
        "Server rooms",
        "Server deployment",
        "Network storage",
        "Backup infrastructure",
        "UPS and power protection",
        "Firewall deployment",
        "Endpoint security",
        "Device configuration",
        "Printer deployment",
        "Meeting-room technology",
        "Cloud infrastructure",
    ];

    const cybersecurity = [
        "Identity and access management",
        "Endpoint protection",
        "Network segmentation",
        "Firewall configuration",
        "Secure Wi-Fi deployment",
        "Device hardening",
        "Backup and recovery planning",
        "Security monitoring",
        "User security awareness",
        "Administrative access controls",
        "Password and access policies",
        "Security-focused infrastructure reviews",
    ];

    const communicationSolutions = [
        {
            icon: Mail,
            title: "Institutional Email",
            description:
                "Professional email environments for departments, teams, offices and institutional communication.",
        },
        {
            icon: Phone,
            title: "Business Communication",
            description:
                "Technology that helps government teams communicate internally and coordinate operational activities.",
        },
        {
            icon: Presentation,
            title: "Video Conferencing",
            description:
                "Meeting and collaboration infrastructure for distributed departments, agencies and stakeholders.",
        },
        {
            icon: Network,
            title: "Unified Connectivity",
            description:
                "Connected communication infrastructure designed around the institution's operational requirements.",
        },
    ];

    const industries = [
        "Federal government institutions",
        "State government institutions",
        "Local government authorities",
        "Ministries",
        "Departments",
        "Government agencies",
        "Public service organizations",
        "Regulatory bodies",
        "Public universities",
        "Public hospitals",
        "Public schools",
        "Government-funded projects",
        "Development programmes",
        "Public infrastructure programmes",
        "Administrative offices",
        "Public-sector service centres",
    ];

    const faqs = [
        {
            question: "Can AB TECHNOLOGIES support government procurement from the beginning?",
            answer:
                "Yes. Our approach can start from the requirement stage. We can help clarify technology needs, develop specifications where appropriate, source products or vendors, compare quotations, coordinate verification, arrange delivery and provide deployment or support services where required.",
        },
        {
            question: "Can you handle bulk government ICT requirements?",
            answer:
                "Yes. Bulk and institutional procurement is an important part of the model. Requirements can include computers, laptops, monitors, networking equipment, servers, accessories, software and other ICT infrastructure.",
        },
        {
            question: "Can you source products internationally?",
            answer:
                "Where appropriate, we can support international sourcing and supplier coordination. International sourcing may be considered when a product is unavailable locally, when quantities require a wider supplier network or when the project specification calls for a particular product or manufacturer.",
        },
        {
            question: "Do you only sell hardware?",
            answer:
                "No. Hardware is only one part of the service. We also provide software development, networking, infrastructure, cybersecurity, cloud services, automation, communication solutions, managed IT support, deployment and digital transformation services.",
        },
        {
            question: "Can you help with technical specifications?",
            answer:
                "Yes. If an institution knows the operational requirement but needs help translating that requirement into technical specifications, we can assist with the technology planning and specification process.",
        },
        {
            question: "Can you deploy the equipment after delivery?",
            answer:
                "Yes. Depending on the project scope, deployment services can include installation, configuration, network setup, device preparation, software installation, testing, documentation and handover.",
        },
        {
            question: "Can you provide ongoing support after a project?",
            answer:
                "Yes. We can provide managed IT, maintenance, technical support, infrastructure support and other continuity services after implementation.",
        },
        {
            question: "Can you build software specifically for a government institution?",
            answer:
                "Yes. Custom platforms can be designed around institutional workflows, including internal portals, records management, asset management, workflow systems, dashboards, reporting platforms and other approved digital services.",
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 w-[450px] h-[300px] rounded-full bg-indigo-500/10 blur-3xl" />
                </div>

                <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        <div className="lg:col-span-7">

                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300 mb-7">
                                <Landmark className="w-4 h-4" />
                                Government & Public Sector
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.04]">
                                Technology infrastructure for
                                <span className="block text-blue-600 dark:text-blue-400">
                                    public institutions.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-3xl text-lg sm:text-xl leading-8 text-slate-600 dark:text-slate-300">
                                From the first requirement to procurement, deployment,
                                digital systems, infrastructure and ongoing support,
                                AB TECHNOLOGIES helps government organizations build
                                practical technology environments that work.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                Whether you are starting with an idea, replacing outdated
                                equipment, expanding an office, digitizing a process or
                                implementing a larger ICT project, we can help structure
                                the journey from the ground up.
                            </p>

                            <div className="mt-9 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a government technology project. Here's what we need:",
                                            {
                                                Source: "Government & Public Sector",
                                                Stage: "Hero — discuss project",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400 dark:hover:text-white transition"
                                >
                                    Discuss a Government Project
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your capabilities for the public sector.",
                                            {
                                                Source: "Government & Public Sector",
                                                Stage: "Hero — explore capabilities",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300 transition"
                                >
                                    Explore Our Capabilities
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-3xl">
                                {[
                                    ["01", "Plan", "Understand the requirement"],
                                    ["02", "Deliver", "Source and implement"],
                                    ["03", "Support", "Maintain and improve"],
                                ].map(([num, title, text]) => (
                                    <button
                                        type="button"
                                        key={num}
                                        onClick={() =>
                                            startSupportChat(
                                                `Government engagement stage — ${title}: ${text}.`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    Stage: `${num} — ${title}`,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-5 text-left backdrop-blur transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                    >
                                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                            {num}
                                        </div>
                                        <div className="mt-2 font-semibold">{title}</div>
                                        <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {text}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative">
                                <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-2xl" />

                                <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">

                                    <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                                Project framework
                                            </p>
                                            <h2 className="mt-1 text-lg font-semibold">
                                                Public Sector Technology
                                            </h2>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                            <Landmark className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="py-6 space-y-3">
                                        {[
                                            ["Requirement", Target],
                                            ["Procurement", ShoppingCart],
                                            ["Infrastructure", Network],
                                            ["Digital Systems", Code2],
                                            ["Security", ShieldCheck],
                                            ["Support", Headphones],
                                        ].map(([label, Icon]) => (
                                            <button
                                                type="button"
                                                key={label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Public sector framework — I'd like to discuss: ${label}.`,
                                                        {
                                                            Source: "Government & Public Sector",
                                                            "Framework area": label,
                                                        }
                                                    )
                                                }
                                                className="group flex w-full items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-blue-300 dark:border-white/5 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400">
                                                    <Icon className="w-5 h-5" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold">
                                                        {label}
                                                    </div>
                                                    <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                        Part of the connected delivery model
                                                    </div>
                                                </div>

                                                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to start from where our institution currently is — existing infrastructure, a new project, or a complete digital transformation.",
                                                {
                                                    Source: "Government & Public Sector",
                                                    Stage: "Hero — start from where you are",
                                                }
                                            )
                                        }
                                        className="w-full rounded-xl border border-blue-100 bg-blue-50 p-4 text-left transition hover:border-blue-300 dark:border-blue-400/10 dark:bg-blue-400/[0.06] dark:hover:border-blue-400/40"
                                    >
                                        <div className="flex gap-3">
                                            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    Start from where you are
                                                </p>
                                                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                    Existing infrastructure, a new project,
                                                    an urgent requirement or a complete
                                                    digital transformation initiative.
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRODUCTION
            ========================================================= */}

            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                One technology partner
                            </div>

                            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                Government technology should work as one system.
                            </h2>
                        </div>

                        <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-8">
                            <p>
                                Public-sector technology projects often involve more than
                                buying equipment. A successful project may require
                                requirements planning, technical specifications, sourcing,
                                verification, delivery, installation, configuration,
                                software, connectivity, security and long-term support.
                            </p>

                            <p>
                                That is why we approach government technology as a complete
                                delivery lifecycle rather than treating every requirement
                                as an isolated transaction.
                            </p>

                            <p>
                                The objective is simple: help institutions obtain the
                                right technology, deploy it properly and create an
                                environment that can continue to operate and evolve.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss government technology as one coordinated system rather than isolated purchases.",
                                        {
                                            Source: "Government & Public Sector",
                                            Stage: "Intro — one system",
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-3 dark:text-blue-400"
                            >
                                Discuss a coordinated approach
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>

                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                        {[
                            {
                                icon: Target,
                                title: "Requirement-led",
                                text: "We start with what the institution actually needs to accomplish.",
                            },
                            {
                                icon: ClipboardCheck,
                                title: "Structured",
                                text: "Projects are organized into understandable stages from planning to delivery.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Security-conscious",
                                text: "Security is considered as part of infrastructure and systems planning.",
                            },
                            {
                                icon: Headphones,
                                title: "Lifecycle support",
                                text: "Technology should remain useful after the initial deployment.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Government principle — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Government & Public Sector",
                                                Principle: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="mt-5 font-semibold">
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
            </section>

            {/* =========================================================
                CAPABILITIES
            ========================================================= */}

            <section className="relative py-20 lg:py-28 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Our capabilities
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                            From procurement to digital transformation.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Bring one requirement or an entire technology programme.
                            We can help connect the different parts.
                        </p>
                    </div>

                    <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <button
                                    type="button"
                                    key={service.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Government capability — ${service.title}: ${service.description} Points: ${service.points.join(", ")}.`,
                                            {
                                                Source: "Government & Public Sector",
                                                Capability: service.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-slate-50/70 p-7 text-left hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/30 dark:hover:shadow-black/20 transition-all duration-300"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400">
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-semibold">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {service.description}
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {service.points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                                            >
                                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                                    <Check className="w-3 h-3" />
                                                </span>
                                                {point}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                        Explore capability
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT
            ========================================================= */}

            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950/20 dark:via-slate-950 dark:to-cyan-950/10" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                <ShoppingCart className="w-4 h-4" />
                                Institutional procurement
                            </div>

                            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                Procurement built around the actual requirement.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Government procurement can involve large quantities,
                                detailed specifications, multiple suppliers and strict
                                delivery requirements. We help organize the technology
                                side of that process.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Understand the technical requirement",
                                    "Assist with appropriate specifications",
                                    "Source suitable products and vendors",
                                    "Compare available options",
                                    "Coordinate verification",
                                    "Support delivery and deployment",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Government procurement — I'd like help with: ${item}.`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "Procurement step": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-start gap-3 text-left transition hover:opacity-90"
                                    >
                                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-500">
                                            <Check className="w-3 h-3" />
                                        </div>

                                        <span className="text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {procurementAreas.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Procurement area — ${item.title}: ${item.description}`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "Procurement area": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-blue-300 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <h3 className="mt-5 font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT DETAIL
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-slate-100/70 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-12 gap-10">

                        <div className="lg:col-span-4">
                            <div className="sticky top-8">
                                <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Procurement lifecycle
                                </div>

                                <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
                                    A clearer route from requirement to delivery.
                                </h2>

                                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                    Whether you already have specifications or need help
                                    organizing the technology requirement, our process
                                    can be adapted to the project.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss the government procurement lifecycle for our project.",
                                            {
                                                Source: "Government & Public Sector",
                                                Stage: "Procurement lifecycle CTA",
                                            }
                                        )
                                    }
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400 dark:hover:text-white"
                                >
                                    Discuss Procurement
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="grid sm:grid-cols-2 gap-5">
                                {projectStages.map((stage) => {
                                    const Icon = stage.icon;

                                    return (
                                        <button
                                            type="button"
                                            key={stage.number}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Procurement stage ${stage.number} — ${stage.title}: ${stage.description}`,
                                                    {
                                                        Source: "Government & Public Sector",
                                                        Step: `${stage.number} — ${stage.title}`,
                                                    }
                                                )
                                            }
                                            className="relative rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/50 dark:hover:border-blue-400/30"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                                    <Icon className="w-5 h-5" />
                                                </div>

                                                <span className="text-3xl font-bold text-slate-100 dark:text-white/5">
                                                    {stage.number}
                                                </span>
                                            </div>

                                            <h3 className="mt-6 text-lg font-semibold">
                                                {stage.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {stage.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                INFRASTRUCTURE
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                <Network className="w-6 h-6" />
                            </div>

                            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                Build the infrastructure behind the institution.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Reliable digital services depend on reliable physical
                                and network infrastructure. We can help plan, supply,
                                deploy and support the underlying environment.
                            </p>

                            <div className="mt-8 grid sm:grid-cols-2 gap-3">
                                {infrastructure.map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Government infrastructure — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "Infrastructure item": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left text-sm transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                    >
                                        <Check className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                        <span className="text-slate-600 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl dark:border-white/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                            Infrastructure map
                                        </p>
                                        <h3 className="mt-2 text-xl font-semibold">
                                            Connected public institution
                                        </h3>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                        <Server className="w-5 h-5 text-blue-300" />
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    {[
                                        ["Users", Users],
                                        ["Network", Network],
                                        ["Servers", Server],
                                        ["Applications", Code2],
                                        ["Cloud", Cloud],
                                        ["Security", ShieldCheck],
                                    ].map(([label, Icon], index) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Infrastructure layer — ${label}: connected technology layer.`,
                                                    {
                                                        Source: "Government & Public Sector",
                                                        "Infrastructure layer": label,
                                                    }
                                                )
                                            }
                                            className="relative flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-blue-400/40"
                                        >
                                            {index < 5 && (
                                                <div className="absolute left-[30px] top-[54px] h-4 w-px bg-blue-400/30" />
                                            )}

                                            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                                                <Icon className="w-5 h-5" />
                                            </div>

                                            <div>
                                                <div className="text-sm font-semibold">
                                                    {label}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    Connected technology layer
                                                </div>
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
                CYBERSECURITY
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-300">
                                <ShieldCheck className="w-4 h-4" />
                                Security by design
                            </div>

                            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                Protect the systems that keep public services moving.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                Government environments contain valuable information
                                and support critical operations. Security therefore needs
                                to be considered across devices, networks, applications,
                                access and data.
                            </p>

                            <div className="mt-8 space-y-4">
                                {cybersecurity.map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Government cybersecurity — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "Cybersecurity": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 text-left transition hover:opacity-90"
                                    >
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                                            <Check className="w-3 h-3" />
                                        </div>

                                        <span className="text-sm text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss cybersecurity for our government institution.",
                                        {
                                            Source: "Government & Public Sector",
                                            Stage: "Cybersecurity CTA",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
                            >
                                Discuss Cybersecurity
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="relative">
                            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur">

                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                                        <LockKeyhole className="w-7 h-7" />
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                            Security layers
                                        </p>

                                        <h3 className="mt-1 text-xl font-semibold">
                                            Defense across the environment
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                    {[
                                        ["Identity", "Control who gets access."],
                                        ["Devices", "Protect endpoints and workstations."],
                                        ["Network", "Control and monitor connectivity."],
                                        ["Applications", "Reduce application-level exposure."],
                                        ["Data", "Protect important information."],
                                        ["Recovery", "Prepare for disruption."],
                                    ].map(([title, text]) => (
                                        <button
                                            type="button"
                                            key={title}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Security layer — ${title}: ${text}`,
                                                    {
                                                        Source: "Government & Public Sector",
                                                        "Security layer": title,
                                                    }
                                                )
                                            }
                                            className="rounded-xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-blue-400/40"
                                        >
                                            <div className="text-sm font-semibold">
                                                {title}
                                            </div>

                                            <div className="mt-2 text-sm leading-6 text-slate-400">
                                                {text}
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
                SOFTWARE
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Digital systems
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                            Turn manual processes into connected digital workflows.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We build software around real operational requirements,
                            helping institutions replace disconnected spreadsheets,
                            paperwork and repetitive processes with structured digital
                            systems.
                        </p>
                    </div>

                    <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {solutions.map((solution) => {
                            const Icon = solution.icon;

                            return (
                                <button
                                    type="button"
                                    key={solution.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Digital system — ${solution.title}: ${solution.description}`,
                                            {
                                                Source: "Government & Public Sector",
                                                Solution: solution.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="mt-5 font-semibold">
                                        {solution.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {solution.description}
                                    </p>

                                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                        Learn more
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                COMMUNICATION
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Communication
                            </div>

                            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                                Keep departments, teams and stakeholders connected.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Communication infrastructure supports everyday
                                administration, collaboration and service delivery.
                                We can help institutions establish dependable
                                communication environments.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss institutional communication for our government organization.",
                                        {
                                            Source: "Government & Public Sector",
                                            Stage: "Communication — institutional",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                    <Mail className="w-5 h-5" />
                                </div>

                                <div>
                                    <div className="text-sm font-semibold">
                                        Institutional communication
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        Built around the organization's workflow
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {communicationSolutions.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Government communication — ${item.title}: ${item.description}`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "Communication": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <h3 className="mt-5 font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                CLOUD
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/50 p-8 sm:p-10 lg:p-14 dark:border-white/10 dark:from-slate-900 dark:via-blue-950/20 dark:to-cyan-950/10">

                        <div className="grid lg:grid-cols-12 gap-12 items-center">

                            <div className="lg:col-span-7">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                    <Cloud className="w-6 h-6" />
                                </div>

                                <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                    Modernize infrastructure without losing control.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Cloud and digital infrastructure can help institutions
                                    improve accessibility, backup, scalability and
                                    operational continuity when designed around the
                                    organization's actual requirements.
                                </p>

                                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                    {[
                                        "Cloud hosting",
                                        "Application hosting",
                                        "Cloud migration",
                                        "Backup systems",
                                        "Data storage",
                                        "Infrastructure monitoring",
                                        "Managed infrastructure",
                                        "Disaster recovery planning",
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Cloud & infrastructure — I'd like to discuss: ${item}.`,
                                                    {
                                                        Source: "Government & Public Sector",
                                                        "Cloud item": item,
                                                    }
                                                )
                                            }
                                            className="flex items-center gap-3 text-left text-sm transition hover:text-blue-700 dark:hover:text-blue-400"
                                        >
                                            <Check className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                            <span className="text-slate-600 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss cloud and digital infrastructure for our government institution.",
                                            {
                                                Source: "Government & Public Sector",
                                                Stage: "Cloud CTA",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Discuss Cloud Infrastructure
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                            Infrastructure
                                        </span>

                                        <Cloud className="w-5 h-5 text-blue-500" />
                                    </div>

                                    <div className="mt-7 space-y-3">
                                        {[
                                            ["Applications", "Connected"],
                                            ["Storage", "Protected"],
                                            ["Backup", "Scheduled"],
                                            ["Access", "Controlled"],
                                            ["Monitoring", "Active"],
                                        ].map(([name, status]) => (
                                            <button
                                                type="button"
                                                key={name}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Infrastructure status — ${name}: ${status}.`,
                                                        {
                                                            Source: "Government & Public Sector",
                                                            "Infrastructure status": name,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 text-left transition hover:bg-blue-50 dark:bg-white/[0.04] dark:hover:bg-blue-500/10"
                                            >
                                                <span className="text-sm font-medium">
                                                    {name}
                                                </span>

                                                <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                    {status}
                                                </span>
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
                AI & AUTOMATION
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-300">
                                <Sparkles className="w-4 h-4" />
                                AI & Automation
                            </div>

                            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                Make public-sector operations more intelligent.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                AI and automation can assist with repetitive workflows,
                                document processing, information discovery, reporting,
                                internal assistance and operational processes when
                                implemented responsibly.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Workflow automation",
                                    "AI assistants",
                                    "Document processing",
                                    "Information search",
                                    "Data analysis",
                                    "Reporting automation",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Government AI & automation — I'd like to explore: ${item}.`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "AI & Automation": item,
                                                }
                                            )
                                        }
                                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400/40 hover:bg-white/10"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss AI and automation for our government operations.",
                                        {
                                            Source: "Government & Public Sector",
                                            Stage: "AI & Automation CTA",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
                            >
                                Discuss AI & Automation
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                                    <Workflow className="w-6 h-6" />
                                </div>

                                <div>
                                    <div className="font-semibold">
                                        Example automation flow
                                    </div>

                                    <div className="text-sm text-slate-500">
                                        Requirement → processing → decision support
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                {[
                                    ["01", "Receive information", "Request, document or operational input"],
                                    ["02", "Process", "System organizes and analyzes information"],
                                    ["03", "Route", "Information moves to the appropriate workflow"],
                                    ["04", "Notify", "Relevant team members receive an update"],
                                    ["05", "Report", "Management receives useful visibility"],
                                ].map(([number, title, description]) => (
                                    <button
                                        type="button"
                                        key={number}
                                        onClick={() =>
                                            startSupportChat(
                                                `Automation flow — ${title}: ${description}`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "Automation step": title,
                                                }
                                            )
                                        }
                                        className="flex w-full gap-4 rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-indigo-400/40"
                                    >
                                        <div className="text-xs font-bold text-blue-300">
                                            {number}
                                        </div>

                                        <div>
                                            <div className="text-sm font-semibold">
                                                {title}
                                            </div>

                                            <div className="mt-1 text-xs leading-5 text-slate-400">
                                                {description}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                WHO WE SERVE
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-5">
                            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Public-sector environments
                            </div>

                            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                Built for institutions with different missions and operating environments.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Technology requirements differ between a ministry,
                                university, hospital, agency, regulatory body and
                                local authority. We adapt the solution around the
                                operational environment.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="grid sm:grid-cols-2 gap-3">
                                {industries.map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Public sector institution — I'd like to discuss solutions for: ${item}.`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    "Institution type": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                            <Building2 className="w-4 h-4" />
                                        </div>

                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                START FROM SCRATCH
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-slate-100 dark:from-blue-950/20 dark:via-slate-950 dark:to-slate-900">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-blue-100 bg-white/70 p-8 sm:p-10 lg:p-14 dark:border-blue-400/10 dark:bg-white/[0.035]">

                        <div className="grid lg:grid-cols-12 gap-12 items-center">

                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                    <Sparkles className="w-4 h-4" />
                                    Starting from scratch
                                </div>

                                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                                    You do not need to have everything figured out before you contact us.
                                </h2>

                                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Maybe you only know that a department needs 200
                                    computers. Maybe the network is outdated. Maybe
                                    the institution wants to digitize a process but
                                    does not know what software it needs.
                                </p>

                                <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Start with the problem. We can help translate it
                                    into a technology requirement, project structure
                                    and practical path forward.
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to tell you what our government institution needs. Here's the problem:",
                                                {
                                                    Source: "Government & Public Sector",
                                                    Stage: "From scratch — tell us what you need",
                                                }
                                            )
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                                    >
                                        Tell Us What You Need
                                        <ArrowRight className="w-4 h-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to request a consultation for our government technology project.",
                                                {
                                                    Source: "Government & Public Sector",
                                                    Stage: "From scratch — request consultation",
                                                }
                                            )
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold dark:border-white/15"
                                    >
                                        Request a Consultation
                                    </button>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="space-y-3">
                                    {[
                                        ["You have a problem", Target],
                                        ["We understand it", Users],
                                        ["We structure the requirement", FileText],
                                        ["We identify the technology", Cpu],
                                        ["We help deliver it", PackageCheck],
                                        ["We remain available", Headphones],
                                    ].map(([text, Icon], index) => (
                                        <button
                                            type="button"
                                            key={text}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Project journey — ${text}.`,
                                                    {
                                                        Source: "Government & Public Sector",
                                                        Step: String(index + 1).padStart(2, "0"),
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                                <Icon className="w-5 h-5" />
                                            </div>

                                            <div className="flex-1 text-sm font-semibold">
                                                {text}
                                            </div>

                                            <span className="text-xs text-slate-400">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                TAB SECTION
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="text-center max-w-3xl mx-auto">
                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            How we can engage
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                            Choose the starting point that fits your project.
                        </h2>
                    </div>

                    <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.025]">

                        <div className="grid sm:grid-cols-3 gap-2">
                            {[
                                ["procurement", "Procurement", ShoppingCart],
                                ["technology", "Technology", Cpu],
                                ["support", "Support", Headphones],
                            ].map(([id, label, Icon]) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => {
                                        setActiveTab(id);
                                        startSupportChat(
                                            `I'd like to explore the government engagement area: ${label}.`,
                                            {
                                                Source: "Government & Public Sector",
                                                "Engagement area": label,
                                            }
                                        );
                                    }}
                                    className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${activeTab === id
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                                        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-3 rounded-2xl bg-slate-50 p-7 dark:bg-slate-950">

                            {activeTab === "procurement" && (
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-semibold">
                                            Procurement & sourcing
                                        </h3>

                                        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                            For institutions that need technology
                                            equipment, bulk supplies or specialized
                                            ICT products, we can support the journey
                                            from specification through sourcing,
                                            verification and delivery.
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            "Bulk computers",
                                            "Networking equipment",
                                            "Servers",
                                            "Software licensing",
                                            "ICT accessories",
                                            "International sourcing",
                                        ].map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Government procurement — I'd like to discuss: ${item}.`,
                                                        {
                                                            Source: "Government & Public Sector",
                                                            "Procurement item": item,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "technology" && (
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-semibold">
                                            Technology projects
                                        </h3>

                                        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                            For organizations building or modernizing
                                            technology environments, we can combine
                                            infrastructure, software, cloud,
                                            cybersecurity, communication and
                                            automation capabilities.
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            "Network deployment",
                                            "Custom software",
                                            "Cloud infrastructure",
                                            "Cybersecurity",
                                            "Digital transformation",
                                            "AI & automation",
                                        ].map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Government technology project — I'd like to discuss: ${item}.`,
                                                        {
                                                            Source: "Government & Public Sector",
                                                            "Technology project": item,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "support" && (
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-semibold">
                                            Managed support & continuity
                                        </h3>

                                        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                                            Technology needs attention after
                                            implementation. We can provide ongoing
                                            assistance to help maintain devices,
                                            networks, applications and infrastructure.
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            "Helpdesk support",
                                            "Network maintenance",
                                            "Device support",
                                            "Cloud management",
                                            "System maintenance",
                                            "Technical assistance",
                                        ].map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Government managed support — I'd like to discuss: ${item}.`,
                                                        {
                                                            Source: "Government & Public Sector",
                                                            "Support area": item,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                DELIVERY PRINCIPLES
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-slate-100 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Our approach
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                            Professional delivery without unnecessary complexity.
                        </h2>
                    </div>

                    <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                        {[
                            {
                                number: "01",
                                title: "Understand",
                                text: "We begin with the actual operational requirement rather than jumping directly to a product.",
                            },
                            {
                                number: "02",
                                title: "Structure",
                                text: "We break complex requirements into manageable technical and delivery components.",
                            },
                            {
                                number: "03",
                                title: "Execute",
                                text: "We coordinate sourcing, implementation, deployment and other agreed project activities.",
                            },
                            {
                                number: "04",
                                title: "Sustain",
                                text: "We consider maintenance, support, continuity and future expansion from the beginning.",
                            },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.number}
                                onClick={() =>
                                    startSupportChat(
                                        `Delivery principle — ${item.title}: ${item.text}`,
                                        {
                                            Source: "Government & Public Sector",
                                            Principle: `${item.number} — ${item.title}`,
                                        }
                                    )
                                }
                                className="rounded-2xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                            >
                                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    {item.number}
                                </div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </button>
                        ))}

                    </div>
                </div>
            </section>

            {/* =========================================================
                PROJECT TYPES
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14">

                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                <Layers3 className="w-6 h-6" />
                            </div>

                            <h2 className="mt-6 text-3xl sm:text-4xl font-semibold">
                                Projects can be small, large or built in phases.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Not every institution needs a complete transformation
                                at once. We can work with a defined procurement
                                requirement, a single department or a larger phased
                                technology programme.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {[
                                {
                                    title: "Office technology refresh",
                                    text: "Replace or expand outdated computers and accessories.",
                                },
                                {
                                    title: "New office setup",
                                    text: "Plan technology infrastructure for a new facility or department.",
                                },
                                {
                                    title: "Network modernization",
                                    text: "Upgrade connectivity, wireless access and network infrastructure.",
                                },
                                {
                                    title: "Digital transformation",
                                    text: "Move selected manual processes into structured digital workflows.",
                                },
                                {
                                    title: "Bulk ICT procurement",
                                    text: "Source equipment and technology for larger institutional requirements.",
                                },
                                {
                                    title: "Managed IT programme",
                                    text: "Provide ongoing support and infrastructure maintenance.",
                                },
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Project type — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Government & Public Sector",
                                                "Project type": item.title,
                                            }
                                        )
                                    }
                                    className="flex w-full gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                >
                                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        <Check className="w-4 h-4" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                TRAINING
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-900 dark:to-blue-950/20">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        <div className="lg:col-span-7">
                            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Training & adoption
                            </div>

                            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                                Technology only creates value when people can use it.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Where required, training and knowledge transfer can be
                                included as part of a project so teams understand the
                                systems and technology they are expected to use.
                            </p>

                            <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                {[
                                    "End-user training",
                                    "System onboarding",
                                    "Basic IT awareness",
                                    "Cybersecurity awareness",
                                    "Administrator training",
                                    "Operational handover",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Government training — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Government & Public Sector",
                                                    Training: item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                                    >
                                        <Users className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
                                        <span className="text-sm font-medium">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-950">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                    <Presentation className="w-7 h-7" />
                                </div>

                                <h3 className="mt-6 text-xl font-semibold">
                                    Handover matters
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    A good deployment should leave the institution
                                    with enough understanding to operate the solution
                                    confidently.
                                </p>

                                <div className="mt-7 space-y-3">
                                    {[
                                        "Documentation",
                                        "User guidance",
                                        "Administrator orientation",
                                        "Operational procedures",
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Project handover — I'd like to discuss: ${item}.`,
                                                    {
                                                        Source: "Government & Public Sector",
                                                        Handover: item,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left text-sm transition hover:bg-blue-50 dark:bg-white/[0.04] dark:hover:bg-blue-500/10"
                                        >
                                            <Check className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPORT
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="text-center max-w-3xl mx-auto">
                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            After deployment
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                            The project does not end when the equipment arrives.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We can remain involved through support, maintenance,
                            monitoring, upgrades and future technology requirements.
                        </p>
                    </div>

                    <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                        {[
                            {
                                icon: Headphones,
                                title: "Technical support",
                                text: "Assistance when users or systems encounter problems.",
                            },
                            {
                                icon: Wrench,
                                title: "Maintenance",
                                text: "Keep infrastructure and devices operational.",
                            },
                            {
                                icon: Cloud,
                                title: "Infrastructure management",
                                text: "Support ongoing hosting, cloud and infrastructure needs.",
                            },
                            {
                                icon: ArrowUpRight,
                                title: "Future upgrades",
                                text: "Expand and improve systems as requirements change.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Post-deployment — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Government & Public Sector",
                                                "Post-deployment": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="mt-5 font-semibold">
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
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section className="py-20 lg:py-28 bg-slate-100 dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Questions
                        </div>

                        <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
                            Government technology questions, answered.
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
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                                    >
                                        <span className="font-semibold">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`w-5 h-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
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
                                                            Source: "Government & Public Sector",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                            >
                                                Discuss this with AB AI
                                                <ArrowRight className="w-3.5 h-3.5" />
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
                CONTACT CTA
            ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 bg-slate-950" />

                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -left-20 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-3xl" />
                    <div className="absolute -right-20 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                        <Landmark className="w-7 h-7" />
                    </div>

                    <h2 className="mt-7 text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-white">
                        Have a government technology requirement?
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                        Tell us what you are trying to achieve. Whether you need
                        equipment, infrastructure, software, sourcing, deployment,
                        support or a complete technology project, we can start from
                        the requirement and work forward.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a government technology project. Here's what we need:",
                                    {
                                        Source: "Government & Public Sector",
                                        Stage: "Final CTA — start project",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-slate-950 hover:bg-blue-50 transition"
                        >
                            Start a Government Project
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a quote for our government technology project.",
                                    {
                                        Source: "Government & Public Sector",
                                        Stage: "Final CTA — request quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
                        >
                            Request a Quote
                            <FileText className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">

                        {[
                            {
                                icon: Target,
                                title: "Start with the requirement",
                                text: "You do not need to know the exact solution before contacting us.",
                            },
                            {
                                icon: Layers3,
                                title: "Connect the pieces",
                                text: "Procurement, infrastructure, software and support can work together.",
                            },
                            {
                                icon: Headphones,
                                title: "Build for continuity",
                                text: "Plan beyond the initial deployment and consider ongoing support.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Government principle — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Government & Public Sector",
                                                "Final principle": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-blue-400/40"
                                >
                                    <Icon className="w-5 h-5 text-blue-300" />

                                    <h3 className="mt-4 text-sm font-semibold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* =========================================================
                FINAL SERVICE STRIP
            ========================================================= */}

            <section className="border-t border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                AB TECHNOLOGIES
                            </p>

                            <h3 className="mt-2 text-xl font-semibold">
                                Technology. Simplified.
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "Procurement",
                                "Infrastructure",
                                "Software",
                                "Security",
                                "Cloud",
                                "AI",
                                "Support",
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `Government service — I'd like to discuss: ${item}.`,
                                            {
                                                Source: "Government & Public Sector",
                                                Service: item,
                                            }
                                        )
                                    }
                                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}