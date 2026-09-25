import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BadgeCheck,
    Bell,
    Building2,
    Camera,
    Check,
    ChevronDown,
    ChevronRight,
    Cloud,
    Database,
    Eye,
    Fingerprint,
    Globe2,
    Headphones,
    KeyRound,
    Laptop,
    Lock,
    Mail,
    MessageSquare,
    MonitorCheck,
    Network,
    Package,
    Phone,
    Radio,
    ScanFace,
    Server,
    Shield,
    ShieldCheck,
    Sparkles,
    Video,
    Wrench,
    X,
    Zap,
} from "lucide-react";
import SEO from "../SEO";
import { queueSupportRequest } from "../AI";
<SEO
    title="Security, CCTV & Communication Solutions"
    description="AB Technologies provides CCTV, surveillance, security infrastructure and business communication technology solutions."
    path="/services/security-communications"
    schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Security and Communication Solutions",
        "provider": {
            "@type": "Organization",
            "name": "AB Technologies"
        }
    }}
/>
export default function SecurityCommunication() {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState("All");
    const [openFaq, setOpenFaq] = useState(null);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [selectedService, setSelectedService] = useState("");

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
                "I'd like to discuss a security or communication solution.",
            metadata: metadata || {
                Source: "Security & Communication",
            },
        });

        navigate("/support/ai");
    };

    const categories = [
        "All",
        "Cybersecurity",
        "Physical Security",
        "Communication",
        "Monitoring",
        "Identity & Access",
        "Business Continuity",
    ];

    const services = [
        {
            category: "Cybersecurity",
            icon: ShieldCheck,
            title: "Cybersecurity & Protection",
            description:
                "Protect your systems, applications, devices, accounts and business information against unauthorized access, malware, phishing, data loss and other digital threats.",
            features: [
                "Security assessment",
                "Endpoint protection",
                "Network security",
                "Threat monitoring",
                "Email security",
                "Security hardening",
            ],
        },
        {
            category: "Physical Security",
            icon: Camera,
            title: "CCTV & Video Surveillance",
            description:
                "Design and deploy professional surveillance systems for offices, warehouses, schools, retail locations, residential properties and other facilities.",
            features: [
                "IP cameras",
                "NVR/DVR systems",
                "Remote viewing",
                "Motion detection",
                "Recording storage",
                "Camera maintenance",
            ],
        },
        {
            category: "Identity & Access",
            icon: Fingerprint,
            title: "Access Control Systems",
            description:
                "Control who can enter specific areas of your facility using modern access technologies and centralized permissions.",
            features: [
                "Biometric access",
                "Fingerprint readers",
                "Face recognition",
                "RFID/card access",
                "Door controllers",
                "Access reporting",
            ],
        },
        {
            category: "Communication",
            icon: MessageSquare,
            title: "Business Communication",
            description:
                "Build reliable communication systems that help teams, customers and departments stay connected across locations and devices.",
            features: [
                "Business email",
                "Internal communication",
                "VoIP solutions",
                "Messaging systems",
                "Video conferencing",
                "Communication workflows",
            ],
        },
        {
            category: "Communication",
            icon: Phone,
            title: "VoIP & Business Telephony",
            description:
                "Modernize business calling with structured VoIP systems, extensions, call routing and communication management.",
            features: [
                "VoIP deployment",
                "Business extensions",
                "Call routing",
                "Auto attendants",
                "Call recording",
                "Remote calling",
            ],
        },
        {
            category: "Monitoring",
            icon: MonitorCheck,
            title: "Security Monitoring",
            description:
                "Create centralized visibility over critical systems, infrastructure, devices and security events.",
            features: [
                "System monitoring",
                "Server monitoring",
                "Network monitoring",
                "Alert configuration",
                "Performance tracking",
                "Incident visibility",
            ],
        },
        {
            category: "Identity & Access",
            icon: KeyRound,
            title: "Identity & Access Management",
            description:
                "Manage users, permissions, roles and access to business resources using structured identity and access policies.",
            features: [
                "User management",
                "Role-based access",
                "Permission policies",
                "Account security",
                "Authentication",
                "Access reviews",
            ],
        },
        {
            category: "Business Continuity",
            icon: Database,
            title: "Backup & Data Protection",
            description:
                "Reduce the impact of accidental deletion, hardware failure, ransomware and other incidents with properly designed backup systems.",
            features: [
                "Cloud backups",
                "Server backups",
                "Database backups",
                "Automated schedules",
                "Backup monitoring",
                "Recovery planning",
            ],
        },
        {
            category: "Business Continuity",
            icon: Cloud,
            title: "Disaster Recovery",
            description:
                "Prepare your organization to recover critical systems and information when unexpected incidents disrupt normal operations.",
            features: [
                "Recovery planning",
                "Business continuity",
                "System restoration",
                "Backup architecture",
                "Recovery testing",
                "Emergency procedures",
            ],
        },
        {
            category: "Cybersecurity",
            icon: Lock,
            title: "Security Hardening",
            description:
                "Review and strengthen servers, computers, applications, networks and accounts to reduce unnecessary exposure.",
            features: [
                "Server hardening",
                "Application hardening",
                "Account policies",
                "Firewall configuration",
                "Patch management",
                "Security reviews",
            ],
        },
        {
            category: "Communication",
            icon: Mail,
            title: "Business Email Security",
            description:
                "Improve protection around business email accounts and domains while helping teams recognize common email-based threats.",
            features: [
                "Domain protection",
                "Mailbox security",
                "Spam controls",
                "Authentication policies",
                "Account protection",
                "Security awareness",
            ],
        },
        {
            category: "Physical Security",
            icon: ScanFace,
            title: "Biometric Systems",
            description:
                "Deploy biometric identification technologies for controlled access, attendance and facility management.",
            features: [
                "Fingerprint systems",
                "Facial recognition",
                "Biometric terminals",
                "Attendance systems",
                "Access logs",
                "User enrollment",
            ],
        },
    ];

    const filteredServices = useMemo(() => {
        if (activeCategory === "All") return services;
        return services.filter(
            (service) => service.category === activeCategory
        );
    }, [activeCategory]);

    const securityLayers = [
        {
            number: "01",
            icon: Globe2,
            title: "Perimeter Protection",
            description:
                "Protect the boundary of your digital environment with firewalls, secure gateways, network segmentation and controlled connectivity.",
        },
        {
            number: "02",
            icon: Network,
            title: "Network Security",
            description:
                "Structure your network to reduce unnecessary exposure and control how devices, users and services communicate.",
        },
        {
            number: "03",
            icon: Laptop,
            title: "Endpoint Protection",
            description:
                "Protect computers, laptops, mobile devices and other endpoints that employees use to access business resources.",
        },
        {
            number: "04",
            icon: KeyRound,
            title: "Identity Protection",
            description:
                "Make sure users have appropriate access and that sensitive systems are not unnecessarily exposed to unauthorized accounts.",
        },
        {
            number: "05",
            icon: Database,
            title: "Data Protection",
            description:
                "Protect business information through controlled access, backup, recovery planning and appropriate storage strategies.",
        },
        {
            number: "06",
            icon: Eye,
            title: "Visibility & Monitoring",
            description:
                "Give your team visibility into important events so unusual activity and operational problems can be identified quickly.",
        },
    ];

    const communicationSolutions = [
        {
            icon: Phone,
            title: "Voice",
            text: "Reliable business calling and internal extensions.",
        },
        {
            icon: Video,
            title: "Video",
            text: "Virtual meetings and distributed collaboration.",
        },
        {
            icon: MessageSquare,
            title: "Messaging",
            text: "Structured communication between teams.",
        },
        {
            icon: Mail,
            title: "Email",
            text: "Professional business email infrastructure.",
        },
        {
            icon: Bell,
            title: "Alerts",
            text: "Important notifications and operational alerts.",
        },
        {
            icon: Radio,
            title: "Intercom",
            text: "Facility communication and internal paging.",
        },
    ];

    const industries = [
        {
            icon: Building2,
            title: "Corporate Offices",
            text: "Secure employees, offices, meeting rooms, networks and business information.",
        },
        {
            icon: Server,
            title: "Data & Technology",
            text: "Protect infrastructure, servers, applications and critical digital environments.",
        },
        {
            icon: GraduationCapIcon,
            title: "Education",
            text: "Support safer schools, campuses, classrooms, staff and student systems.",
        },
        {
            icon: ShoppingBagIcon,
            title: "Retail",
            text: "Combine surveillance, access control, network protection and communication.",
        },
        {
            icon: WarehouseIcon,
            title: "Warehousing",
            text: "Protect facilities, inventory areas, loading zones and operational systems.",
        },
        {
            icon: HeartPulseIcon,
            title: "Healthcare",
            text: "Support controlled access, communication and protection of sensitive environments.",
        },
    ];

    const process = [
        {
            step: "01",
            title: "Understand",
            text: "We begin by understanding your organization, environment, risks, people, systems and operational goals.",
        },
        {
            step: "02",
            title: "Assess",
            text: "We identify gaps, vulnerabilities, dependencies, infrastructure requirements and opportunities for improvement.",
        },
        {
            step: "03",
            title: "Design",
            text: "We create a practical solution architecture that balances security, usability, scalability and budget.",
        },
        {
            step: "04",
            title: "Source",
            text: "Where hardware, software or third-party services are required, we help identify suitable products and technologies.",
        },
        {
            step: "05",
            title: "Implement",
            text: "Our team configures, deploys and integrates the solution into your existing environment.",
        },
        {
            step: "06",
            title: "Test",
            text: "We verify functionality, permissions, connectivity, alerts, backups and other important components.",
        },
        {
            step: "07",
            title: "Train",
            text: "We help your team understand how to use, manage and maintain the deployed solution.",
        },
        {
            step: "08",
            title: "Support",
            text: "We remain available for maintenance, troubleshooting, improvements and future expansion.",
        },
    ];

    const faqs = [
        {
            question: "Can you help us if we have nothing in place yet?",
            answer:
                "Yes. We can start from the beginning. We can assess your requirements, recommend the appropriate combination of hardware, software, network infrastructure and security controls, source what is required, implement the solution and help your team operate it.",
        },
        {
            question: "Do you only install security equipment?",
            answer:
                "No. Security and communication can involve several connected layers. We can work across cybersecurity, surveillance, access control, communication, networking, backup, monitoring and related IT infrastructure.",
        },
        {
            question: "Can you work with our existing systems?",
            answer:
                "Yes. Where practical, we can assess existing infrastructure and integrate new components rather than automatically replacing everything. The objective is to build a reliable solution around your actual environment.",
        },
        {
            question: "Can you supply the hardware required?",
            answer:
                "Yes. Where a project requires devices, cameras, access-control equipment, networking equipment, servers, computers or other technology, we can assist with procurement and deployment.",
        },
        {
            question: "Can you support us after implementation?",
            answer:
                "Yes. Support can include troubleshooting, maintenance, monitoring, configuration changes, system expansion, security reviews, backups and ongoing technical assistance.",
        },
        {
            question: "Can you design solutions for small businesses?",
            answer:
                "Absolutely. A good security architecture does not have to mean an unnecessarily complicated or expensive environment. We can design according to your current size, budget and growth plans.",
        },
    ];

    const stats = [
        {
            value: "360°",
            label: "Security Perspective",
            text: "Digital, physical, identity and operational protection.",
        },
        {
            value: "24/7",
            label: "Ready Infrastructure",
            text: "Solutions designed for organizations that cannot afford avoidable downtime.",
        },
        {
            value: "01",
            label: "Technology Partner",
            text: "One place to coordinate multiple technology requirements.",
        },
        {
            value: "∞",
            label: "Room to Scale",
            text: "Solutions designed to grow as your organization grows.",
        },
    ];

    function GraduationCapIcon(props) {
        return <Sparkles {...props} />;
    }

    function ShoppingBagIcon(props) {
        return <PackageIcon {...props} />;
    }

    function WarehouseIcon(props) {
        return <Building2 {...props} />;
    }

    function HeartPulseIcon(props) {
        return <Shield {...props} />;
    }

    function PackageIcon(props) {
        return <Wrench {...props} />;
    }

    const openQuote = (service = "") => {
        setSelectedService(service);
        setShowQuoteModal(true);
    };

    /* =========================================================
       MODAL SUBMIT → HANDOFF TO SUPPORT
    ========================================================= */

    const handleQuoteSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get("name") || "";
        const organization = formData.get("organization") || "";
        const email = formData.get("email") || "";
        const phone = formData.get("phone") || "";
        const service = formData.get("service") || selectedService;
        const details = formData.get("details") || "";

        const lines = [
            "I'd like to discuss a security & communication project.",
            "",
        ];

        if (service) {
            lines.push(`Service: ${service}`);
        }

        if (organization) {
            lines.push(`Organization: ${organization}`);
        }

        if (details) {
            lines.push("", "Project details:", details);
        }

        if (name || email || phone) {
            lines.push(
                "",
                "Contact:",
                name && `Name: ${name}`,
                email && `Email: ${email}`,
                phone && `Phone: ${phone}`
            );
        }

        const metadata = {
            Source: "Security & Communication",
            Service: service || "Not specified",
            Organization: organization || "Not specified",
            Contact: name || email || phone ? "Provided" : "Not provided",
        };

        queueSupportRequest({
            message: lines.filter(Boolean).join("\n"),
            metadata,
        });

        setShowQuoteModal(false);
        navigate("/support/ai");
    };

    return (
        <main className="mt-25 min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050914] dark:text-white">
            {/* =========================================================
                HERO
            ========================================================== */}
            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.15),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,#f8fafc,#eef6ff_48%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050914,#071226_48%,#050914)]" />

                <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-20">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(59,130,246,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.08) 1px, transparent 1px)",
                            backgroundSize: "52px 52px",
                        }}
                    />
                </div>

                <div className="absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -right-32 bottom-10 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <ShieldCheck className="h-4 w-4" />
                                Security & Communication
                            </div>

                            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                                Protect what matters.
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
                                    Connect everything.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We help organizations design, source, deploy and
                                maintain modern security and communication
                                environments — from the first conversation to a
                                fully operational system.
                            </p>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Cybersecurity. CCTV. Access control. Identity.
                                Business communication. VoIP. Monitoring.
                                Backup. Disaster recovery. Security
                                infrastructure. One coordinated approach.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to request a security assessment for my organization.",
                                            {
                                                Source:
                                                    "Security & Communication",
                                                Intent:
                                                    "Security assessment",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                >
                                    Request a Security Assessment
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </button>

                                <a
                                    href="#services"
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    Explore Solutions
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span className="inline-flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    Business-focused
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    Scalable architecture
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    Implementation support
                                </span>
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-indigo-500/20 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-5 shadow-2xl shadow-slate-300/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] dark:shadow-black/30 sm:p-6">
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                            Security Operations
                                        </p>
                                        <p className="mt-1 text-lg font-bold">
                                            Environment Overview
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        {
                                            icon: Shield,
                                            label: "Cybersecurity",
                                            status: "Protected",
                                        },
                                        {
                                            icon: Camera,
                                            label: "Surveillance",
                                            status: "Connected",
                                        },
                                        {
                                            icon: Fingerprint,
                                            label: "Access Control",
                                            status: "Active",
                                        },
                                        {
                                            icon: Network,
                                            label: "Network",
                                            status: "Monitored",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.label}
                                                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.035]"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(34,197,94,.8)]" />
                                                </div>

                                                <p className="mt-4 text-sm font-bold">
                                                    {item.label}
                                                </p>
                                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                                    {item.status}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                                <Database className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">
                                                    Backup Infrastructure
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    Recovery point monitoring
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            Healthy
                                        </span>
                                    </div>

                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                                        <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-3 gap-3">
                                    <div className="rounded-xl bg-blue-500/5 p-3 text-center dark:bg-blue-500/[0.06]">
                                        <p className="text-lg font-black">
                                            99.9%
                                        </p>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            Visibility
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-emerald-500/5 p-3 text-center dark:bg-emerald-500/[0.06]">
                                        <p className="text-lg font-black">
                                            24/7
                                        </p>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            Monitoring
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-indigo-500/5 p-3 text-center dark:bg-indigo-500/[0.06]">
                                        <p className="text-lg font-black">
                                            Multi
                                        </p>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            Layered
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                TRUST STRIP
            ========================================================== */}
            <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-[#070c18]">
                <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-white/5 dark:bg-white/[0.025]"
                            >
                                <div className="text-3xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                                    {stat.value}
                                </div>

                                <div>
                                    <p className="text-sm font-bold">
                                        {stat.label}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        {stat.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRODUCTION
            ========================================================== */}
            <section className="relative py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,.08),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                More than installation
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Security should be a system, not a collection of devices.
                            </h2>
                        </div>

                        <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                A camera alone does not create a secure
                                organization. Neither does a firewall, a
                                fingerprint reader or an antivirus application.
                                Real protection comes from understanding how
                                people, devices, applications, networks,
                                facilities and information interact.
                            </p>

                            <p>
                                That is why our approach combines
                                <strong className="text-slate-900 dark:text-white">
                                    {" "}
                                    digital security, physical security,
                                    identity, communication, monitoring and
                                    business continuity
                                </strong>{" "}
                                into a coordinated technology environment.
                            </p>

                            <p>
                                Whether you are opening a new office, upgrading
                                an existing facility, protecting a growing
                                business or building your infrastructure from
                                scratch, we can help you determine what you
                                actually need and how the pieces should work
                                together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                SERVICES
            ========================================================== */}
            <section
                id="services"
                className="relative overflow-hidden border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#080e1b] lg:py-28"
            >
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What we provide
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Security and communication solutions built around
                            your organization.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            Select a category to explore the areas where we can
                            help.
                        </p>
                    </div>

                    <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold transition ${activeCategory === category
                                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-blue-400/40 dark:hover:text-blue-300"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredServices.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.title}
                                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

                                    <div className="relative">
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                                                {service.category}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold">
                                            {service.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {service.description}
                                        </p>

                                        <div className="mt-5 grid grid-cols-2 gap-2">
                                            {service.features.map((feature) => (
                                                <div
                                                    key={feature}
                                                    className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"
                                                >
                                                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss ${service.title.toLowerCase()}.`,
                                                    {
                                                        Source:
                                                            "Security & Communication",
                                                        Service:
                                                            service.title,
                                                        Category:
                                                            service.category,
                                                    }
                                                )
                                            }
                                            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition group-hover:gap-3 dark:text-blue-400"
                                        >
                                            Discuss this solution
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                CYBERSECURITY
            ========================================================== */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <ShieldCheck className="h-7 w-7" />
                            </div>

                            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Digital protection
                            </p>

                            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                                Build security into your technology environment.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Modern organizations depend on connected
                                systems. Employees work from multiple devices,
                                applications live in the cloud, customers
                                communicate online and business information
                                moves constantly between systems.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                We help bring structure to that environment by
                                identifying risks and implementing practical
                                security controls around your people, systems,
                                applications and data.
                            </p>

                            <button
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to start with a cybersecurity assessment.",
                                        {
                                            Source:
                                                "Security & Communication",
                                            Intent:
                                                "Cybersecurity assessment",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                Start with an assessment
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {securityLayers.map((layer) => {
                                const Icon = layer.icon;

                                return (
                                    <button
                                        type="button"
                                        key={layer.number}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${layer.title.toLowerCase()}: ${layer.description}`,
                                                {
                                                    Source:
                                                        "Security & Communication",
                                                    Layer: layer.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                                                {layer.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 font-bold">
                                            {layer.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {layer.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                PHYSICAL SECURITY
            ========================================================== */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,.22),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,.14),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                                Physical security
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                See more. Control access. Respond faster.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                Your physical environment is part of your
                                technology environment. We design solutions
                                that help you understand what is happening
                                across important areas of your facility and
                                control access to sensitive spaces.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "CCTV and IP surveillance",
                                    "Remote camera viewing",
                                    "Biometric and card access",
                                    "Door and entry management",
                                    "Visitor management",
                                    "Recording and retention planning",
                                    "Security system maintenance",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-slate-300"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to plan a physical security solution (CCTV, access control, or both).",
                                        {
                                            Source:
                                                "Security & Communication",
                                            Intent:
                                                "Physical security",
                                        }
                                    )
                                }
                                className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
                            >
                                Plan physical security
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />

                            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-7">
                                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                                            <Camera className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="font-bold">
                                                Facility Security
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Live environment overview
                                            </p>
                                        </div>
                                    </div>

                                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                        Online
                                    </span>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
                                        <div className="absolute inset-0 opacity-30">
                                            <div
                                                className="h-full w-full"
                                                style={{
                                                    backgroundImage:
                                                        "linear-gradient(rgba(148,163,184,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.15) 1px,transparent 1px)",
                                                    backgroundSize: "24px 24px",
                                                }}
                                            />
                                        </div>

                                        <div className="absolute left-4 top-4 rounded-lg bg-black/40 px-2 py-1 text-[10px] font-bold">
                                            CAMERA 01
                                        </div>

                                        <Camera className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-slate-600" />

                                        <div className="absolute bottom-3 left-3 text-[10px] text-slate-400">
                                            Main entrance
                                        </div>
                                    </div>

                                    <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
                                        <div className="absolute inset-0 opacity-30">
                                            <div
                                                className="h-full w-full"
                                                style={{
                                                    backgroundImage:
                                                        "linear-gradient(rgba(148,163,184,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.15) 1px,transparent 1px)",
                                                    backgroundSize: "24px 24px",
                                                }}
                                            />
                                        </div>

                                        <div className="absolute left-4 top-4 rounded-lg bg-black/40 px-2 py-1 text-[10px] font-bold">
                                            CAMERA 02
                                        </div>

                                        <Eye className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-slate-600" />

                                        <div className="absolute bottom-3 left-3 text-[10px] text-slate-400">
                                            Warehouse
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                        <p className="text-2xl font-black">
                                            16
                                        </p>
                                        <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                                            Cameras
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                        <p className="text-2xl font-black">
                                            08
                                        </p>
                                        <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                                            Access points
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                        <p className="text-2xl font-black">
                                            24/7
                                        </p>
                                        <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                                            Recording
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                COMMUNICATION
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {communicationSolutions.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <button
                                            type="button"
                                            key={item.title}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss ${item.title.toLowerCase()} for our business communication.`,
                                                    {
                                                        Source:
                                                            "Security & Communication",
                                                        Channel: item.title,
                                                    }
                                                )
                                            }
                                            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-cyan-400/30"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <h3 className="mt-4 font-bold">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                {item.text}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                Connected organizations
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Communication that works wherever your team is.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Communication should not depend on everyone
                                being in the same room. We help organizations
                                connect employees, locations, customers and
                                operational teams through structured
                                communication technologies.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                From professional email and business calling to
                                VoIP, messaging, video meetings, intercoms and
                                automated alerts, we can help you build a
                                communication environment that fits the way
                                your organization actually operates.
                            </p>

                            <div className="mt-7 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-400/10 dark:bg-cyan-400/[0.04]">
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                                        <Zap className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            Communication + security
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            Communication systems should be
                                            convenient without becoming an
                                            unnecessary security risk. We
                                            consider both when designing your
                                            environment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                IDENTITY
            ========================================================== */}
            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#070b15] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                            Identity & access
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Give the right people the right access.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            Security becomes difficult when everyone has access
                            to everything. We help organizations structure
                            access around roles, responsibilities and
                            operational requirements.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: Fingerprint,
                                title: "Biometric Access",
                                text: "Use fingerprints or other biometric technologies where stronger physical identity verification is required.",
                            },
                            {
                                icon: KeyRound,
                                title: "Role-Based Access",
                                text: "Organize application and system permissions around the responsibilities of each user or team.",
                            },
                            {
                                icon: ScanFace,
                                title: "Facial Recognition",
                                text: "Deploy facial identification solutions for appropriate access-control and facility scenarios.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${item.title.toLowerCase()} for our organization.`,
                                            {
                                                Source:
                                                    "Security & Communication",
                                                "Identity solution":
                                                    item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-7 text-left transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-indigo-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                BACKUP / CONTINUITY
            ========================================================== */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Business continuity
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Security is also being prepared for what could go wrong.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Hardware fails. Files get deleted. Accounts
                                get compromised. Systems become unavailable.
                                People make mistakes. Unexpected incidents
                                happen.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A serious technology environment needs a plan
                                for recovering important systems and data. We
                                help organizations establish backup,
                                restoration and continuity strategies that
                                align with the importance of their information.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "Automated backup planning",
                                    "Database and application backups",
                                    "Server and workstation protection",
                                    "Cloud backup strategies",
                                    "Recovery procedures",
                                    "Backup verification",
                                    "Disaster recovery planning",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300"
                                    >
                                        <BadgeCheck className="h-5 w-5 text-emerald-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss backup and disaster recovery for our organization.",
                                        {
                                            Source:
                                                "Security & Communication",
                                            Intent:
                                                "Business continuity",
                                        }
                                    )
                                }
                                className="mt-9 inline-flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                Discuss business continuity
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="relative rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-xl shadow-slate-200/50 dark:border-white/10 dark:from-white/[0.055] dark:to-blue-500/[0.03] dark:shadow-black/20 sm:p-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Cloud className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            Recovery architecture
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Designed around critical data
                                        </p>
                                    </div>
                                </div>

                                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                            </div>

                            <div className="mt-8 space-y-3">
                                {[
                                    ["Primary systems", "Protected"],
                                    ["Cloud backup", "Healthy"],
                                    ["Database backup", "Healthy"],
                                    ["Recovery testing", "Scheduled"],
                                ].map(([label, status]) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <span className="text-sm font-semibold">
                                            {label}
                                        </span>

                                        <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                            {status}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white dark:bg-black">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Recovery readiness
                                    </span>
                                    <span className="text-lg font-black">
                                        92%
                                    </span>
                                </div>

                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                                </div>

                                <p className="mt-3 text-xs leading-5 text-slate-400">
                                    Readiness should be measured and tested,
                                    not assumed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FROM SCRATCH
            ========================================================== */}
            <section className="relative overflow-hidden bg-blue-600 py-20 text-white dark:bg-blue-700 lg:py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,.16),transparent_25%),radial-gradient(circle_at_90%_90%,rgba(255,255,255,.12),transparent_25%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
                                <Sparkles className="h-4 w-4" />
                                Starting from scratch?
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                You do not need to know what technology you need before contacting us.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-blue-100">
                                Tell us what you are trying to accomplish.
                                Tell us about your business, facility, team,
                                budget, challenges or plans. We can help turn
                                that information into a practical technology
                                plan.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "New office setup",
                                    "New business",
                                    "Facility security",
                                    "Existing system upgrade",
                                    "Security assessment",
                                    "Network expansion",
                                    "Communication modernization",
                                    "Technology procurement",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'm starting from scratch with: ${item}. I'd like help figuring out what we need.`,
                                                {
                                                    Source:
                                                        "Security & Communication",
                                                    "Starting point":
                                                        item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-3 text-left text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.12]"
                                    >
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like help setting up security and communication technology for a new environment.",
                                    {
                                        Source:
                                            "Security & Communication",
                                        Intent:
                                            "New technology setup",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
                        >
                            Tell us what you need
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* =========================================================
                INDUSTRIES
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Built for real organizations
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Different environments. Different requirements.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            We adapt the technology plan to the organization,
                            rather than forcing every business into the same
                            setup.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {industries.map((industry) => {
                            const Icon = industry.icon;

                            return (
                                <button
                                    type="button"
                                    key={industry.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss security & communication solutions for ${industry.title.toLowerCase()}.`,
                                            {
                                                Source:
                                                    "Security & Communication",
                                                Industry:
                                                    industry.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-white/[0.06] dark:text-blue-400 dark:group-hover:bg-blue-500">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {industry.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                HOW WE WORK
            ========================================================== */}
            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#080e1a] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            How we work
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            From first conversation to ongoing support.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            We do not believe in installing technology first
                            and figuring out the requirements later.
                        </p>
                    </div>

                    <div className="relative mt-14">
                        <div className="absolute left-[27px] top-8 hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-indigo-500 lg:block" />

                        <div className="grid gap-5 lg:grid-cols-2">
                            {process.map((item) => (
                                <div
                                    key={item.step}
                                    className="relative flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                                        {item.step}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 shadow-xl dark:border-white/10 dark:from-white/[0.05] dark:via-blue-500/[0.04] dark:to-white/[0.025]">
                        <div className="grid lg:grid-cols-2">
                            <div className="p-7 sm:p-10 lg:p-14">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                    <Wrench className="h-7 w-7" />
                                </div>

                                <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Procurement & deployment
                                </p>

                                <h2 className="mt-4 text-4xl font-black tracking-tight">
                                    Need the equipment too?
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    Security projects often require more than
                                    software. We can help identify and procure
                                    the hardware, devices and infrastructure
                                    needed to implement the solution.
                                </p>

                                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Security cameras",
                                        "NVR / DVR systems",
                                        "Biometric devices",
                                        "Access controllers",
                                        "Network equipment",
                                        "Servers",
                                        "Computers",
                                        "Communication equipment",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300"
                                        >
                                            <Check className="h-4 w-4 text-blue-500" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like help procuring security and communication equipment for our project.",
                                            {
                                                Source:
                                                    "Security & Communication",
                                                Intent:
                                                    "Security procurement",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                                >
                                    Request procurement assistance
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="relative min-h-[380px] overflow-hidden bg-slate-950 p-7 text-white dark:bg-black sm:p-10 lg:min-h-full">
                                <div className="absolute inset-0 opacity-30">
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(59,130,246,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.2) 1px,transparent 1px)",
                                            backgroundSize: "40px 40px",
                                        }}
                                    />
                                </div>

                                <div className="relative flex h-full flex-col justify-center">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                                        One project
                                    </p>

                                    <h3 className="mt-4 text-3xl font-black">
                                        Plan. Source. Deploy.
                                    </h3>

                                    <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
                                        Instead of coordinating multiple
                                        disconnected suppliers and installers,
                                        let us help you structure the
                                        technology requirement around the
                                        actual project.
                                    </p>

                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        {[
                                            ["01", "Requirements"],
                                            ["02", "Specification"],
                                            ["03", "Procurement"],
                                            ["04", "Deployment"],
                                        ].map(([number, title]) => (
                                            <div
                                                key={number}
                                                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                            >
                                                <p className="text-xs font-black text-blue-400">
                                                    {number}
                                                </p>
                                                <p className="mt-2 text-sm font-bold">
                                                    {title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHY US
            ========================================================== */}
            <section className="border-y border-slate-200 bg-slate-950 py-20 text-white dark:border-white/10 dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                                Why work with us
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Technology should solve problems, not create new ones.
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Sparkles,
                                    title: "Start from your goals",
                                    text: "We focus on what you need to accomplish rather than simply selling equipment.",
                                },
                                {
                                    icon: Network,
                                    title: "Think in systems",
                                    text: "We consider how security, networks, devices, applications and people interact.",
                                },
                                {
                                    icon: Wrench,
                                    title: "Implementation focused",
                                    text: "A recommendation is only useful when it can actually be implemented and operated.",
                                },
                                {
                                    icon: Headphones,
                                    title: "Support after delivery",
                                    text: "We can remain involved after deployment for maintenance and improvements.",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Security conscious",
                                    text: "Security considerations are included throughout the technology planning process.",
                                },
                                {
                                    icon: ArrowRight,
                                    title: "Designed to grow",
                                    text: "We can plan today's solution with tomorrow's users, locations and requirements in mind.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:bg-white/[0.055]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Questions
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Before you get started
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                            A few common questions about how we approach
                            security and communication projects.
                        </p>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border transition ${isOpen
                                        ? "border-blue-300 bg-blue-50/50 dark:border-blue-400/20 dark:bg-blue-400/[0.035]"
                                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.025]"
                                        }`}
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 p-5 text-left"
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
                                        <div className="px-5 pb-5">
                                            <p className="border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600 dark:border-white/10 dark:text-slate-400">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source:
                                                                "Security & Communication",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:gap-3 dark:text-blue-400"
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
                FINAL CTA
            ========================================================== */}
            <section className="relative overflow-hidden px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-7 py-14 text-white shadow-2xl sm:px-12 lg:px-16 lg:py-20">
                    <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                                <ShieldCheck className="h-4 w-4" />
                                Let's build it properly
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                Not sure what you need?
                                <span className="block text-blue-300">
                                    Start with the problem.
                                </span>
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-300">
                                Tell us what you are trying to protect,
                                connect, monitor, automate or improve. We can
                                help you work backwards from the objective and
                                determine the technology required.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-400" />
                                    No need to know all the technical terms
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-400" />
                                    Solutions tailored to your environment
                                </span>

                                <span className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-400" />
                                    From planning to implementation
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a security and communication conversation. Here's what we're trying to solve:",
                                    {
                                        Source:
                                            "Security & Communication",
                                        Intent:
                                            "General discussion",
                                    }
                                )
                            }
                            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
                        >
                            Start the Conversation
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>

            {/* =========================================================
                QUOTE MODAL
            ========================================================== */}
            {showQuoteModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
                    onClick={() => setShowQuoteModal(false)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0a1020] sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowQuoteModal(false)}
                            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="pr-12">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <MessageSquare className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight">
                                Tell us what you need
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Give us a little information about your
                                requirement. We can use it to understand the
                                project and determine the next step. Your
                                request will continue in AB AI support.
                            </p>
                        </div>

                        <form
                            className="mt-8 space-y-5"
                            onSubmit={handleQuoteSubmit}
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Full name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Business / organization
                                    </label>

                                    <input
                                        type="text"
                                        name="organization"
                                        placeholder="Organization name"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone number"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    What do you need?
                                </label>

                                <select
                                    name="service"
                                    defaultValue={selectedService}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-white"
                                >
                                    <option value="">
                                        Select a service
                                    </option>

                                    {services.map((service) => (
                                        <option
                                            key={service.title}
                                            value={service.title}
                                        >
                                            {service.title}
                                        </option>
                                    ))}

                                    <option value="Other">
                                        Something else
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Tell us about the project
                                </label>

                                <textarea
                                    name="details"
                                    rows={6}
                                    placeholder="Describe what you are trying to protect, connect, monitor, improve or build..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-600"
                                />
                            </div>

                            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-400/10 dark:bg-blue-400/[0.05]">
                                <div className="flex gap-3">
                                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />

                                    <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
                                        Your request will be handed off to
                                        AB AI on the support page, where the
                                        conversation continues with full
                                        context and technical review.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowQuoteModal(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.05]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                                >
                                    Continue in Support
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}