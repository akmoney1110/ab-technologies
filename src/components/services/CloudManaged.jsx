import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Bell,
    Boxes,
    BriefcaseBusiness,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Cloud,
    CloudCog,
    CloudDownload,
    CloudLightning,
    CloudOff,
    CloudUpload,
    Code2,
    Cog,
    Database,
    Download,
    ExternalLink,
    Eye,
    FileCheck2,
    FileText,
    Gauge,
    Globe2,
    HardDrive,
    Headphones,
    Layers3,
    LifeBuoy,
    Lock,
    LockKeyhole,
    Mail,
    Monitor,
    Network,
    PackageCheck,
    PanelTop,
    Phone,
    RefreshCcw,
    Rocket,
    Server,
    Settings2,
    Shield,
    ShieldCheck,
    SlidersHorizontal,
    Sparkles,
    Terminal,
    TicketCheck,
    Timer,
    TrendingUp,
    UploadCloud,
    Users,
    Wifi,
    Wrench,
    X,
    Zap,
} from "lucide-react";
import SEO from "../SEO";
import { queueSupportRequest } from "../AI";
<SEO
    title="Cloud Infrastructure & Managed IT Services"
    description="Cloud infrastructure, IT management, deployment, monitoring and technical support solutions for businesses and organizations."
    path="/services/cloud-managed-it"
    schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Cloud and Managed IT Services",
        "provider": {
            "@type": "Organization",
            "name": "AB Technologies"
        }
    }}
/>
const CloudManagedIT = () => {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);
    const [activeService, setActiveService] = useState("cloud");
    const [activePlan, setActivePlan] = useState("business");
    const [showQuotePanel, setShowQuotePanel] = useState(false);

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
                "I'd like to discuss cloud, hosting or managed IT services.",
            metadata: metadata || {
                Source: "Cloud & Managed IT",
            },
        });

        navigate("/support/ai");
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
        const service = formData.get("service") || "";
        const details = formData.get("details") || "";

        const lines = [
            "I'd like to discuss a cloud, hosting or managed IT requirement.",
            "",
        ];

        if (service) {
            const matchedService = services.find(
                (item) => item.id === service
            );

            lines.push(
                `Service interest: ${matchedService ? matchedService.title : service
                }`
            );
        }

        if (organization) {
            lines.push(`Organization: ${organization}`);
        }

        if (details) {
            lines.push("", "Requirement:", details);
        }

        if (name || email) {
            lines.push(
                "",
                "Contact:",
                name && `Name: ${name}`,
                email && `Email: ${email}`
            );
        }

        const metadata = {
            Source: "Cloud & Managed IT",
            Service: service || "Not specified",
            Organization: organization || "Not specified",
            Contact: name || email ? "Provided" : "Not provided",
        };

        queueSupportRequest({
            message: lines.filter(Boolean).join("\n"),
            metadata,
        });

        setShowQuotePanel(false);
        navigate("/support/ai");
    };

    const services = useMemo(
        () => [
            {
                id: "cloud",
                icon: Cloud,
                title: "Cloud Infrastructure",
                short:
                    "Design, deploy and manage reliable cloud environments built around your business.",
                description:
                    "We help businesses move workloads, applications, databases, files and business operations into carefully planned cloud environments without turning infrastructure into a daily burden.",
                features: [
                    "Cloud architecture and planning",
                    "Application deployment",
                    "Virtual servers and compute",
                    "Cloud databases",
                    "Object and file storage",
                    "Backup architecture",
                    "High availability planning",
                    "Performance optimization",
                ],
            },
            {
                id: "hosting",
                icon: Globe2,
                title: "Web & Application Hosting",
                short:
                    "Professional hosting environments for websites, APIs, dashboards and business applications.",
                description:
                    "From a simple company website to a production Django, React, Node or API platform, we can help design an environment that is secure, maintainable and appropriate for the workload.",
                features: [
                    "Website hosting",
                    "Application hosting",
                    "API hosting",
                    "Django deployment",
                    "React deployment",
                    "Node.js environments",
                    "Database hosting",
                    "SSL and domain configuration",
                ],
            },
            {
                id: "vps",
                icon: Server,
                title: "VPS & Dedicated Infrastructure",
                short:
                    "Managed virtual and dedicated servers for businesses that need greater control.",
                description:
                    "We configure and manage server environments for organizations that require dedicated resources, custom software stacks, stronger control or predictable infrastructure.",
                features: [
                    "VPS deployment",
                    "Dedicated server setup",
                    "Linux server administration",
                    "Nginx configuration",
                    "Gunicorn deployment",
                    "Docker environments",
                    "Firewall configuration",
                    "Server hardening",
                ],
            },
            {
                id: "backup",
                icon: HardDrive,
                title: "Backup & Disaster Recovery",
                short:
                    "Protect critical business data and applications against loss, failure and disruption.",
                description:
                    "Backups are only useful when they can actually be restored. We help businesses design backup schedules, retention policies, recovery procedures and tested disaster recovery strategies.",
                features: [
                    "Automated backups",
                    "Database backups",
                    "File backups",
                    "Off-site backup copies",
                    "Recovery planning",
                    "Restore testing",
                    "Retention policies",
                    "Business continuity planning",
                ],
            },
            {
                id: "security",
                icon: ShieldCheck,
                title: "Cloud Security",
                short:
                    "Secure infrastructure with practical controls across access, networks, applications and data.",
                description:
                    "We approach cloud security as an ongoing operational responsibility rather than a one-time configuration task.",
                features: [
                    "Access control",
                    "Firewall configuration",
                    "SSL/TLS",
                    "Server hardening",
                    "Secure authentication",
                    "Secrets management",
                    "Security monitoring",
                    "Configuration reviews",
                ],
            },
            {
                id: "managed",
                icon: Cog,
                title: "Managed IT Operations",
                short:
                    "Ongoing technical management so your team can focus on running the business.",
                description:
                    "Instead of waiting for infrastructure problems to interrupt operations, businesses can have a technical partner monitoring, maintaining and improving their environments.",
                features: [
                    "Infrastructure monitoring",
                    "Server maintenance",
                    "Software updates",
                    "Performance reviews",
                    "Incident response",
                    "Technical support",
                    "Configuration management",
                    "Ongoing optimization",
                ],
            },
        ],
        []
    );

    const cloudCapabilities = [
        {
            icon: Server,
            title: "Compute",
            text:
                "Virtual machines, application servers and scalable compute environments configured around your workload.",
        },
        {
            icon: Database,
            title: "Databases",
            text:
                "Production-ready database environments with access controls, backups and operational monitoring.",
        },
        {
            icon: HardDrive,
            title: "Storage",
            text:
                "Structured storage solutions for documents, media, backups, application assets and business data.",
        },
        {
            icon: Network,
            title: "Networking",
            text:
                "Private networking, DNS, routing, firewall rules and connectivity between infrastructure components.",
        },
        {
            icon: Shield,
            title: "Security",
            text:
                "Security controls designed into the infrastructure instead of added after deployment.",
        },
        {
            icon: Gauge,
            title: "Performance",
            text:
                "Resource monitoring and optimization to keep applications responsive and infrastructure efficient.",
        },
        {
            icon: RefreshCcw,
            title: "Reliability",
            text:
                "Recovery planning, redundancy considerations and operational procedures designed to reduce downtime.",
        },
        {
            icon: BarChart3,
            title: "Visibility",
            text:
                "Useful monitoring and reporting so you can understand infrastructure health and resource usage.",
        },
    ];

    const workloadTypes = [
        {
            icon: PanelTop,
            title: "Corporate Websites",
            text:
                "Fast, secure hosting for company websites, landing pages, portals and public-facing business platforms.",
        },
        {
            icon: Code2,
            title: "Web Applications",
            text:
                "Production environments for custom applications, dashboards, SaaS products and internal systems.",
        },
        {
            icon: Terminal,
            title: "APIs & Backend Systems",
            text:
                "Reliable environments for REST APIs, backend services, automation engines and integrations.",
        },
        {
            icon: Database,
            title: "Business Databases",
            text:
                "Managed environments for PostgreSQL, MySQL and other business-critical data stores.",
        },
        {
            icon: CloudUpload,
            title: "File & Document Systems",
            text:
                "Centralized environments for business files, documents, media and shared resources.",
        },
        {
            icon: Mail,
            title: "Business Communication",
            text:
                "Support for business email infrastructure, DNS records, domains and communication services.",
        },
    ];

    const managedFeatures = [
        "Infrastructure monitoring",
        "Server health checks",
        "Disk and resource monitoring",
        "Security updates",
        "Configuration management",
        "SSL certificate monitoring",
        "Domain and DNS support",
        "Backup monitoring",
        "Database maintenance",
        "Incident troubleshooting",
        "Performance optimization",
        "Deployment assistance",
    ];

    const securityLayers = [
        {
            number: "01",
            title: "Identity & Access",
            icon: LockKeyhole,
            text:
                "We help control who can access infrastructure, applications and administrative resources.",
        },
        {
            number: "02",
            title: "Network Protection",
            icon: Network,
            text:
                "Firewalls, restricted ports, secure network configuration and controlled communication paths.",
        },
        {
            number: "03",
            title: "Server Hardening",
            icon: Server,
            text:
                "Reduce unnecessary exposure and configure servers according to practical security requirements.",
        },
        {
            number: "04",
            title: "Application Security",
            icon: Code2,
            text:
                "Deployment practices that consider application configuration, secrets, certificates and permissions.",
        },
        {
            number: "05",
            title: "Data Protection",
            icon: Database,
            text:
                "Backup and recovery mechanisms designed around the importance of your business data.",
        },
        {
            number: "06",
            title: "Monitoring",
            icon: Eye,
            text:
                "Visibility into infrastructure health helps identify operational problems before they become larger incidents.",
        },
    ];

    const process = [
        {
            number: "01",
            title: "Understand",
            icon: Eye,
            description:
                "We start by understanding what you have, what you need, what is currently causing problems and where you want to go.",
            items: [
                "Business requirements",
                "Current infrastructure",
                "Applications and workloads",
                "Users and access needs",
                "Budget considerations",
            ],
        },
        {
            number: "02",
            title: "Plan",
            icon: FileCheck2,
            description:
                "We turn requirements into a practical infrastructure plan instead of recommending technology simply because it is available.",
            items: [
                "Architecture planning",
                "Hosting strategy",
                "Security requirements",
                "Backup strategy",
                "Growth considerations",
            ],
        },
        {
            number: "03",
            title: "Build",
            icon: Wrench,
            description:
                "We configure the environment, deploy the required services and establish the foundations for reliable operation.",
            items: [
                "Server provisioning",
                "Network configuration",
                "Application deployment",
                "Database configuration",
                "Security controls",
            ],
        },
        {
            number: "04",
            title: "Secure",
            icon: ShieldCheck,
            description:
                "Security is incorporated into the deployment through access controls, encryption, hardening and operational practices.",
            items: [
                "Firewall rules",
                "Access controls",
                "SSL/TLS",
                "Secrets protection",
                "Security reviews",
            ],
        },
        {
            number: "05",
            title: "Test",
            icon: CheckCircle2,
            description:
                "We test the environment before treating it as production-ready.",
            items: [
                "Application testing",
                "Connectivity checks",
                "Backup verification",
                "Performance checks",
                "Recovery checks",
            ],
        },
        {
            number: "06",
            title: "Operate",
            icon: Settings2,
            description:
                "After launch, we can continue managing the environment so infrastructure remains healthy as your business changes.",
            items: [
                "Monitoring",
                "Maintenance",
                "Support",
                "Optimization",
                "Continuous improvement",
            ],
        },
    ];

    const industries = [
        {
            icon: Building2,
            title: "Corporate & Professional Services",
            text:
                "Reliable infrastructure for offices, professional firms, consulting companies and growing organizations.",
        },
        {
            icon: BriefcaseBusiness,
            title: "SMEs & Growing Businesses",
            text:
                "Practical infrastructure without forcing smaller businesses into unnecessary complexity.",
        },
        {
            icon: Users,
            title: "Education",
            text:
                "Platforms, portals, websites, databases and digital services for schools and educational organizations.",
        },
        {
            icon: PackageCheck,
            title: "Retail & Commerce",
            text:
                "Infrastructure supporting websites, inventory platforms, internal applications and digital operations.",
        },
        {
            icon: Rocket,
            title: "Startups",
            text:
                "Flexible infrastructure that can evolve as a new product moves from idea to production.",
        },
        {
            icon: Network,
            title: "Technology Companies",
            text:
                "Deployment, server management and infrastructure support for software teams and digital businesses.",
        },
    ];

    const supportModels = [
        {
            title: "Project-Based",
            icon: Rocket,
            description:
                "Ideal when you need us to design, deploy, migrate or configure an environment and hand it over to your team.",
            points: [
                "One-time infrastructure deployment",
                "Migration projects",
                "Server configuration",
                "Application deployment",
                "Documentation and handover",
            ],
        },
        {
            title: "Managed",
            icon: Settings2,
            description:
                "Ideal when you want us to remain responsible for day-to-day technical infrastructure operations.",
            points: [
                "Continuous monitoring",
                "Routine maintenance",
                "Security updates",
                "Troubleshooting",
                "Ongoing technical support",
            ],
        },
        {
            title: "Hybrid",
            icon: Layers3,
            description:
                "A flexible model where your internal team handles some responsibilities while we manage the infrastructure areas you outsource.",
            points: [
                "Shared responsibility",
                "Escalation support",
                "Specialist infrastructure work",
                "Scheduled maintenance",
                "Technical advisory",
            ],
        },
    ];

    const plans = {
        starter: {
            name: "Foundation",
            subtitle: "For small websites and simple business workloads.",
            bestFor: "Small businesses, portfolios and basic business sites.",
            features: [
                "Managed hosting environment",
                "SSL configuration",
                "Basic monitoring",
                "Scheduled backups",
                "DNS assistance",
                "Deployment support",
            ],
        },
        business: {
            name: "Business",
            subtitle: "For growing businesses that depend on their digital systems.",
            bestFor: "Business applications, portals, APIs and production websites.",
            features: [
                "Managed server infrastructure",
                "Application deployment",
                "Database management",
                "Security configuration",
                "Backup monitoring",
                "Performance monitoring",
                "Maintenance support",
                "Technical assistance",
            ],
        },
        enterprise: {
            name: "Enterprise",
            subtitle: "For organizations with complex infrastructure and operational requirements.",
            bestFor: "Multiple applications, teams, locations and critical workloads.",
            features: [
                "Custom infrastructure architecture",
                "Multi-server environments",
                "Advanced monitoring",
                "Security hardening",
                "Disaster recovery planning",
                "Infrastructure documentation",
                "Priority technical support",
                "Ongoing optimization",
            ],
        },
    };

    const faqs = [
        {
            question: "Can you help if we are starting from scratch?",
            answer:
                "Yes. You do not need to already have servers, hosting, domains or a cloud architecture. We can begin with your business requirements, recommend an appropriate setup, procure or provision the infrastructure, configure it, secure it, deploy your applications and establish the operational processes needed to keep it running.",
        },
        {
            question: "Can you manage a server we already have?",
            answer:
                "Yes. We can work with existing VPS, dedicated servers and other infrastructure where access and the technical environment allow it. We can assess the current configuration, identify issues, improve security and performance, and establish an ongoing management arrangement if required.",
        },
        {
            question: "Do you only work with one cloud provider?",
            answer:
                "No. The right infrastructure depends on the workload, budget, availability requirements and technical requirements. We can help evaluate different hosting and cloud approaches rather than forcing every client into the same environment.",
        },
        {
            question: "Can you migrate an existing website or application?",
            answer:
                "Yes. Migration can include application files, databases, domains, DNS, SSL certificates and supporting services. The exact migration approach depends on the existing environment and application architecture.",
        },
        {
            question: "Can you host Django applications?",
            answer:
                "Yes. We can support production Django environments including application deployment, WSGI configuration, reverse proxies, databases, static and media files, SSL, background workers and related infrastructure.",
        },
        {
            question: "Can you host React applications?",
            answer:
                "Yes. React applications can be deployed to appropriate hosting environments depending on whether the application is static, server-rendered or connected to a backend API.",
        },
        {
            question: "Do you provide backups?",
            answer:
                "Backup requirements are part of infrastructure planning. Depending on the environment, we can configure automated backups, retention policies and recovery procedures and help verify that backups can actually be restored.",
        },
        {
            question: "Can you monitor our infrastructure?",
            answer:
                "Yes. Managed infrastructure can include monitoring for server health, resource utilization, availability, storage, certificates and other operational indicators. The exact monitoring scope depends on the environment and service arrangement.",
        },
        {
            question: "Can you help reduce our hosting costs?",
            answer:
                "Often, yes. Cost optimization begins with understanding what resources are actually being used. We can review infrastructure, identify waste or over-provisioning and recommend a more appropriate architecture where practical.",
        },
        {
            question: "Do you provide support after deployment?",
            answer:
                "Yes. We can provide project-based support, managed infrastructure services or a hybrid arrangement. This means you can choose whether you only need deployment assistance or want an ongoing technical partner.",
        },
    ];

    const selectedService =
        services.find((service) => service.id === activeService) || services[0];

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050914] dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate overflow-hidden border-b border-slate-200/80 dark:border-white/10">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.14),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef5ff_48%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.20),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.16),transparent_28%),linear-gradient(135deg,#050914_0%,#071226_48%,#050914_100%)]" />

                <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(100,116,139,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.12) 1px, transparent 1px)",
                            backgroundSize: "42px 42px",
                        }}
                    />
                </div>

                <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />

                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28 xl:py-32">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">

                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <Cloud className="h-4 w-4" />
                                Cloud, Hosting & Managed IT
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
                                Infrastructure that works
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500">
                                    behind your business.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                From your first server to a fully managed business
                                environment, we design, deploy, secure, host, monitor
                                and maintain the infrastructure your digital operations
                                depend on.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not have to know which server to buy, which cloud
                                service to choose, how to configure Nginx, where to put
                                your database or how to secure your application. Tell us
                                what you are trying to achieve and we can help build the
                                technical foundation around it.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like help planning cloud, hosting or managed IT infrastructure for my organization.",
                                            {
                                                Source: "Cloud & Managed IT",
                                                Intent:
                                                    "Infrastructure planning",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 dark:bg-blue-500 dark:hover:bg-blue-400"
                                >
                                    Plan My Infrastructure
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>

                                <a
                                    href="#services"
                                    className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 font-bold text-slate-800 backdrop-blur transition hover:border-blue-300 hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400/30 dark:hover:bg-white/[0.08]"
                                >
                                    Explore Services
                                    <ChevronRight className="h-5 w-5" />
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                                {[
                                    ["01", "Plan"],
                                    ["02", "Build"],
                                    ["03", "Secure"],
                                    ["04", "Manage"],
                                ].map(([number, label]) => (
                                    <div
                                        key={number}
                                        className="rounded-xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400">
                                            {number}
                                        </div>
                                        <div className="mt-1 font-bold">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero infrastructure visualization */}
                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1220]/90 dark:shadow-black/40">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-[#070d19]">

                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                                        <div>
                                            <div className="text-sm font-bold">
                                                Infrastructure Overview
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Managed business environment
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                            Operational
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        {[
                                            {
                                                icon: Server,
                                                label: "Servers",
                                                value: "Healthy",
                                            },
                                            {
                                                icon: Database,
                                                label: "Databases",
                                                value: "Protected",
                                            },
                                            {
                                                icon: ShieldCheck,
                                                label: "Security",
                                                value: "Active",
                                            },
                                            {
                                                icon: HardDrive,
                                                label: "Backups",
                                                value: "Verified",
                                            },
                                        ].map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <div
                                                    key={item.label}
                                                    className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]"
                                                >
                                                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                                    <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                                                        {item.label}
                                                    </div>

                                                    <div className="mt-1 text-sm font-bold">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold">
                                                Resource utilization
                                            </span>

                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                Balanced
                                            </span>
                                        </div>

                                        <div className="mt-4 space-y-4">
                                            {[
                                                ["CPU", "42%"],
                                                ["Memory", "58%"],
                                                ["Storage", "64%"],
                                            ].map(([name, value]) => (
                                                <div key={name}>
                                                    <div className="mb-1.5 flex justify-between text-xs">
                                                        <span className="text-slate-500 dark:text-slate-400">
                                                            {name}
                                                        </span>
                                                        <span className="font-bold">
                                                            {value}
                                                        </span>
                                                    </div>

                                                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                                                            style={{
                                                                width: value,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-500/10">
                                            <div className="text-xs text-blue-700 dark:text-blue-300">
                                                Availability
                                            </div>
                                            <div className="mt-1 text-lg font-black">
                                                Monitored
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-500/10">
                                            <div className="text-xs text-cyan-700 dark:text-cyan-300">
                                                Backups
                                            </div>
                                            <div className="mt-1 text-lg font-black">
                                                Active
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-slate-100 p-4 dark:bg-white/[0.05]">
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                Support
                                            </div>
                                            <div className="mt-1 text-lg font-black">
                                                Ready
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
                TRUST STRIP
            ========================================================= */}

            <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#080e1a]">
                <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: BadgeCheck,
                                title: "Business-focused",
                                text: "Infrastructure selected around your actual requirements.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Security-minded",
                                text: "Security and access controls considered from the start.",
                            },
                            {
                                icon: Headphones,
                                title: "Human support",
                                text: "A technical partner you can actually talk to.",
                            },
                            {
                                icon: TrendingUp,
                                title: "Built to grow",
                                text: "Architecture that can evolve as your business grows.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.025]"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold">{item.title}</h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRODUCTION
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-100 py-20 dark:bg-[#060b15] lg:py-28">
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                                More than hosting
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Your infrastructure should support the business — not become another problem.
                            </h2>

                            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                <p>
                                    A website, application or digital business does not
                                    exist by itself. Behind it are servers, databases,
                                    networks, domains, certificates, backups, security
                                    controls, deployments and countless small technical
                                    decisions.
                                </p>

                                <p>
                                    We bring those pieces together into a practical
                                    infrastructure environment that is designed to be
                                    understandable, maintainable and appropriate for the
                                    organization using it.
                                </p>

                                <p>
                                    Whether you are launching your first website, moving
                                    an existing application, setting up company systems
                                    or managing a growing digital platform, we can help
                                    from the beginning rather than asking you to arrive
                                    with everything already figured out.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Plan from scratch",
                                    "Migrate existing systems",
                                    "Deploy applications",
                                    "Secure infrastructure",
                                    "Manage ongoing operations",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I need help with: ${item}.`,
                                                {
                                                    Source:
                                                        "Cloud & Managed IT",
                                                    Requirement: item,
                                                }
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                                    >
                                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Cloud,
                                    title: "Cloud",
                                    text: "Flexible infrastructure for modern workloads.",
                                },
                                {
                                    icon: Server,
                                    title: "Servers",
                                    text: "VPS and dedicated environments under control.",
                                },
                                {
                                    icon: Shield,
                                    title: "Security",
                                    text: "Protection designed into the infrastructure.",
                                },
                                {
                                    icon: RefreshCcw,
                                    title: "Continuity",
                                    text: "Backups and recovery planning for resilience.",
                                },
                                {
                                    icon: Gauge,
                                    title: "Performance",
                                    text: "Keep infrastructure efficient and responsive.",
                                },
                                {
                                    icon: Headphones,
                                    title: "Support",
                                    text: "Technical help when your team needs it.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${item.title.toLowerCase()} for our infrastructure. ${item.text}`,
                                                {
                                                    Source:
                                                        "Cloud & Managed IT",
                                                    Capability: item.title,
                                                }
                                            )
                                        }
                                        className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#0b1220]"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-300 dark:group-hover:bg-blue-500">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold">
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
                </div>
            </section>

            {/* =========================================================
                SERVICES
            ========================================================= */}

            <section
                id="services"
                className="scroll-mt-20 bg-white py-20 dark:bg-[#080e1a] lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                            Our infrastructure services
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            One partner across the infrastructure lifecycle.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            You can engage us for a single deployment, a migration,
                            infrastructure improvement or an ongoing managed service.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 lg:grid-cols-12">

                        <div className="lg:col-span-5">
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#050a13]">
                                {services.map((service) => {
                                    const Icon = service.icon;
                                    const active = activeService === service.id;

                                    return (
                                        <button
                                            key={service.id}
                                            onClick={() =>
                                                setActiveService(service.id)
                                            }
                                            className={`flex w-full items-center gap-4 border-b border-slate-200 p-5 text-left transition last:border-b-0 dark:border-white/10 ${active
                                                ? "bg-white shadow-sm dark:bg-white/[0.06]"
                                                : "hover:bg-white/70 dark:hover:bg-white/[0.035]"
                                                }`}
                                        >
                                            <div
                                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${active
                                                    ? "bg-blue-600 text-white dark:bg-blue-500"
                                                    : "bg-white text-slate-500 dark:bg-white/[0.05] dark:text-slate-400"
                                                    }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="font-bold">
                                                    {service.title}
                                                </div>

                                                <div className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                                                    {service.short}
                                                </div>
                                            </div>

                                            <ChevronRight
                                                className={`h-5 w-5 shrink-0 transition ${active
                                                    ? "text-blue-600 dark:text-blue-400"
                                                    : "text-slate-400"
                                                    }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-7 dark:border-white/10 dark:from-[#0c1422] dark:via-[#09101d] dark:to-blue-950/20 lg:p-9">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:bg-blue-500">
                                    {React.createElement(
                                        selectedService.icon,
                                        {
                                            className: "h-7 w-7",
                                        }
                                    )}
                                </div>

                                <h3 className="mt-7 text-2xl font-black sm:text-3xl">
                                    {selectedService.title}
                                </h3>

                                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                                    {selectedService.description}
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    {selectedService.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 text-sm font-semibold dark:border-white/10 dark:bg-white/[0.035]"
                                        >
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${selectedService.title.toLowerCase()}.`,
                                            {
                                                Source:
                                                    "Cloud & Managed IT",
                                                Service:
                                                    selectedService.title,
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400"
                                >
                                    Discuss this service
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                CLOUD CAPABILITIES
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-100 py-20 dark:bg-[#050a13] lg:py-28">
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-500/[0.04] to-transparent dark:from-blue-500/[0.08]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                                Infrastructure building blocks
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Everything your environment needs to operate properly.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                A professional infrastructure environment is more than
                                choosing a server. We consider compute, storage,
                                networking, databases, security, backups, monitoring
                                and operational requirements together.
                            </p>

                            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-400/20 dark:bg-blue-500/[0.07]">
                                <div className="flex gap-4">
                                    <Sparkles className="mt-1 h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />

                                    <div>
                                        <h3 className="font-bold">
                                            Start with the business problem.
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                            You tell us what you want the system to do.
                                            We help translate that requirement into the
                                            infrastructure needed to support it.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I want to start with a business problem and work out what infrastructure is required.",
                                                    {
                                                        Source:
                                                            "Cloud & Managed IT",
                                                        Intent:
                                                            "Business-first planning",
                                                    }
                                                )
                                            }
                                            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:gap-3 dark:text-blue-300"
                                        >
                                            Discuss with AB AI
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {cloudCapabilities.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${item.title.toLowerCase()} for our infrastructure. ${item.text}`,
                                                {
                                                    Source:
                                                        "Cloud & Managed IT",
                                                    "Building block":
                                                        item.title,
                                                }
                                            )
                                        }
                                        className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-white/10 dark:bg-[#0a111e] dark:hover:border-blue-400/20"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white dark:bg-white/[0.05] dark:text-slate-300 dark:group-hover:bg-blue-500">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-bold">
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
                </div>
            </section>

            {/* =========================================================
                HOSTING / WORKLOADS
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-[#080e1a] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                                Hosting & deployment
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Host the systems your organization actually depends on.
                            </h2>
                        </div>

                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to discuss hosting for our business systems.",
                                    {
                                        Source: "Cloud & Managed IT",
                                        Intent: "Hosting discussion",
                                    }
                                )
                            }
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-bold transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:hover:border-blue-400 dark:hover:text-blue-400"
                        >
                            Discuss hosting
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {workloadTypes.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to host ${item.title.toLowerCase()}. ${item.text}`,
                                            {
                                                Source:
                                                    "Cloud & Managed IT",
                                                Workload: item.title,
                                            }
                                        )
                                    }
                                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0a111d] dark:hover:border-blue-400/30"
                                >
                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl dark:bg-blue-500/10" />

                                    <div className="relative">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.05] dark:text-blue-400">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="mt-6 text-xl font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-400">
                                            Deployment support
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                VPS / SERVER MANAGEMENT
            ========================================================= */}

            <section className="overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-blue-300">
                                <Server className="h-4 w-4" />
                                VPS & server management
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Your server should not be something you are afraid to touch.
                            </h2>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                                We can configure and manage the technical layers that
                                make a production server useful: operating system,
                                firewall, web server, application runtime, database,
                                SSL, deployment process, backups and monitoring.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Linux administration",
                                    "Nginx reverse proxy",
                                    "Gunicorn deployment",
                                    "Docker environments",
                                    "PostgreSQL & databases",
                                    "SSL / HTTPS",
                                    "DNS configuration",
                                    "Firewall management",
                                    "Server hardening",
                                    "Application deployment",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${item.toLowerCase()} as part of our infrastructure.`,
                                                {
                                                    Source:
                                                        "Cloud & Managed IT",
                                                    "Server capability":
                                                        item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left text-sm font-semibold transition hover:border-blue-400/30 hover:bg-white/[0.08]"
                                    >
                                        <Check className="h-4 w-4 shrink-0 text-blue-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 rounded-3xl bg-blue-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#080d17] shadow-2xl shadow-black/40">
                                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                            <Terminal className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold">
                                                production-server
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Managed environment
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                        Online
                                    </div>
                                </div>

                                <div className="space-y-3 p-6 font-mono text-xs sm:text-sm">
                                    <div className="text-slate-500">
                                        $ systemctl status application
                                    </div>

                                    <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4 text-emerald-300">
                                        ● application.service — active (running)
                                    </div>

                                    <div className="text-slate-500">
                                        $ nginx -t
                                    </div>

                                    <div className="rounded-xl border border-blue-400/10 bg-blue-400/5 p-4 text-blue-300">
                                        configuration file test is successful
                                    </div>

                                    <div className="text-slate-500">
                                        $ backup --verify latest
                                    </div>

                                    <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-cyan-300">
                                        latest backup verified successfully
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3 font-sans">
                                        {[
                                            ["CPU", "42%"],
                                            ["RAM", "58%"],
                                            ["Disk", "64%"],
                                            ["SSL", "Valid"],
                                        ].map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                                            >
                                                <div className="text-xs text-slate-500">
                                                    {key}
                                                </div>
                                                <div className="mt-1 font-bold">
                                                    {value}
                                                </div>
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
                BACKUP
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-[#060b14] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div className="order-2 lg:order-1">
                            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#0a111d] lg:p-9">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold">
                                            Recovery readiness
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            Example operational view
                                        </div>
                                    </div>

                                    <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        Protected
                                    </div>
                                </div>

                                <div className="mt-7 space-y-3">
                                    {[
                                        ["Application database", "Verified"],
                                        ["Uploaded documents", "Verified"],
                                        ["Application files", "Verified"],
                                        ["Configuration", "Verified"],
                                    ].map(([name, status]) => (
                                        <div
                                            key={name}
                                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.035]"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                <span className="text-sm font-semibold">
                                                    {name}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                <CheckCircle2 className="h-4 w-4" />
                                                {status}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7 rounded-2xl bg-slate-950 p-6 text-white dark:bg-black">
                                    <div className="flex items-center gap-3">
                                        <RefreshCcw className="h-5 w-5 text-blue-400" />
                                        <span className="font-bold">
                                            Recovery planning
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-slate-300">
                                        Backups should be part of a broader recovery
                                        strategy. We can help determine what needs to
                                        be backed up, how often, how long it should be
                                        retained and how restoration should be handled.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                                Backup & disaster recovery
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Prepare for the day something goes wrong.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Hardware can fail. Files can be deleted. Applications
                                can become corrupted. Servers can go offline. Human
                                mistakes happen.
                            </p>

                            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Our approach is to make recovery part of infrastructure
                                planning rather than treating backups as an afterthought.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "Identify critical business data",
                                    "Define backup frequency",
                                    "Set retention requirements",
                                    "Separate backup copies where appropriate",
                                    "Monitor backup completion",
                                    "Test restoration procedures",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-semibold"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss backup and disaster recovery for our infrastructure.",
                                        {
                                            Source: "Cloud & Managed IT",
                                            Intent: "Backup & DR",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                            >
                                Discuss backup planning
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                SECURITY
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-[#080e1a] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                            <ShieldCheck className="h-4 w-4" />
                            Security by design
                        </div>

                        <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Security is part of the infrastructure, not a separate checkbox.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We consider identity, network access, server configuration,
                            application deployment, data protection and monitoring as
                            connected parts of the environment.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {securityLayers.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${item.title.toLowerCase()}. ${item.text}`,
                                            {
                                                Source:
                                                    "Cloud & Managed IT",
                                                "Security layer":
                                                    item.title,
                                            }
                                        )
                                    }
                                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0a111d] dark:hover:border-blue-400/30"
                                >
                                    <div className="absolute right-5 top-5 text-4xl font-black text-slate-200 dark:text-white/[0.04]">
                                        {item.number}
                                    </div>

                                    <div className="relative">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white dark:bg-white/[0.05] dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="mt-6 text-xl font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
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
                MANAGED IT
            ========================================================= */}

            <section className="relative overflow-hidden bg-blue-950 py-20 text-white dark:bg-[#030713] lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.20),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.12),transparent_28%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
                                Managed IT
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Stop waiting for infrastructure problems to become emergencies.
                            </h2>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100/80">
                                With managed IT infrastructure, we can remain involved after
                                deployment to help maintain the environment, monitor
                                important systems, troubleshoot issues and keep the
                                infrastructure aligned with your business.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {managedFeatures.map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss managed IT operations, specifically: ${item}.`,
                                                {
                                                    Source:
                                                        "Cloud & Managed IT",
                                                    "Managed feature":
                                                        item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 text-left text-sm font-semibold transition hover:border-cyan-400/30 hover:bg-white/[0.1]"
                                    >
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur sm:p-8">
                            <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                <div>
                                    <div className="font-bold">
                                        Managed Operations
                                    </div>
                                    <div className="mt-1 text-xs text-blue-100/60">
                                        Example service coverage
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    Active
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {[
                                    {
                                        icon: Bell,
                                        title: "Monitoring",
                                        text: "Watch important infrastructure indicators.",
                                    },
                                    {
                                        icon: Wrench,
                                        title: "Maintenance",
                                        text: "Keep systems updated and operational.",
                                    },
                                    {
                                        icon: Shield,
                                        title: "Security",
                                        text: "Review and maintain security controls.",
                                    },
                                    {
                                        icon: TicketCheck,
                                        title: "Support",
                                        text: "Troubleshoot operational problems.",
                                    },
                                    {
                                        icon: BarChart3,
                                        title: "Optimization",
                                        text: "Identify opportunities for improvement.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="flex gap-4 rounded-2xl border border-white/10 bg-black/10 p-4"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <div className="font-bold">
                                                    {item.title}
                                                </div>
                                                <div className="mt-1 text-sm leading-6 text-blue-100/60">
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
                HOW WE WORK
            ========================================================= */}

            <section
                id="how-we-work"
                className="scroll-mt-20 bg-slate-100 py-20 dark:bg-[#060b14] lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                            How we work
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            From a conversation to a working infrastructure environment.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            You do not need to arrive with a technical blueprint. We can
                            help you move from business requirement to operational system.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {process.map((step) => {
                            const Icon = step.icon;

                            return (
                                <button
                                    type="button"
                                    key={step.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the "${step.title}" stage of our infrastructure project.`,
                                            {
                                                Source:
                                                    "Cloud & Managed IT",
                                                "Process stage":
                                                    step.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0a111d] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-black text-white dark:bg-blue-500">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span className="text-sm font-black tracking-widest text-slate-300 dark:text-white/10">
                                            {step.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {step.description}
                                    </p>

                                    <div className="mt-6 space-y-2">
                                        {step.items.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPORT MODELS
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-[#080e1a] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                            Flexible engagement
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Get as much or as little support as your organization needs.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Some clients need a deployment. Others need a technical partner
                            who stays involved. We can structure the engagement around your
                            actual requirements.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {supportModels.map((model, index) => {
                            const Icon = model.icon;

                            return (
                                <div
                                    key={model.title}
                                    className={`relative overflow-hidden rounded-3xl border p-7 ${index === 1
                                        ? "border-blue-300 bg-blue-50 dark:border-blue-400/20 dark:bg-blue-500/[0.08]"
                                        : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#0a111d]"
                                        }`}
                                >
                                    {index === 1 && (
                                        <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white dark:bg-blue-500">
                                            Popular
                                        </div>
                                    )}

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.05] dark:text-blue-400">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {model.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {model.description}
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {model.points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-center gap-3 text-sm font-semibold"
                                            >
                                                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                {point}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the ${model.title.toLowerCase()} support model. ${model.description}`,
                                                {
                                                    Source:
                                                        "Cloud & Managed IT",
                                                    "Support model":
                                                        model.title,
                                                }
                                            )
                                        }
                                        className="mt-8 inline-flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400"
                                    >
                                        Discuss this model
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SERVICE PLAN SELECTOR
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-[#050a13] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                            Service approach
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            A starting point for different business sizes.
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                            Final infrastructure and managed service requirements are
                            assessed individually. These categories simply illustrate the
                            kind of coverage we can structure.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-[#0a111d]">
                        {Object.entries(plans).map(([key, plan]) => (
                            <button
                                key={key}
                                onClick={() => setActivePlan(key)}
                                className={`rounded-xl px-5 py-3 text-sm font-bold transition ${activePlan === key
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:bg-blue-500"
                                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
                                    }`}
                            >
                                {plan.name}
                            </button>
                        ))}
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#0a111d] lg:p-10">
                        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    {plans[activePlan].name}
                                </div>

                                <h3 className="mt-3 text-3xl font-black">
                                    {plans[activePlan].subtitle}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <strong className="text-slate-800 dark:text-white">
                                        Best for:
                                    </strong>{" "}
                                    {plans[activePlan].bestFor}
                                </p>

                                <button
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like a tailored quote for the ${plans[activePlan].name} service tier.`,
                                            {
                                                Source:
                                                    "Cloud & Managed IT",
                                                "Plan tier":
                                                    plans[activePlan].name,
                                            }
                                        )
                                    }
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                                >
                                    Get a tailored quote
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-6 dark:bg-white/[0.035]">
                                <div className="text-sm font-bold">
                                    Potential coverage
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    {plans[activePlan].features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-start gap-3 text-sm"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                            <span className="font-semibold">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                TECHNOLOGY / STACK
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-[#080e1a] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                                Technology environments
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Infrastructure that works with the technologies you already use.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                We can work across the infrastructure layers required by
                                modern websites, business applications, APIs and internal
                                platforms.
                            </p>

                            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                                The goal is not to force a particular stack. The goal is to
                                create an environment that is appropriate, maintainable and
                                secure.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                ["Python", "Backend & automation"],
                                ["Django", "Web applications"],
                                ["React", "Modern interfaces"],
                                ["Node.js", "Application services"],
                                ["PostgreSQL", "Relational databases"],
                                ["Redis", "Caching & queues"],
                                ["Docker", "Containerized workloads"],
                                ["Nginx", "Reverse proxy & web"],
                                ["Linux", "Server environments"],
                                ["Git", "Version control"],
                                ["REST APIs", "System integration"],
                                ["SSL/TLS", "Encrypted connections"],
                            ].map(([name, description]) => (
                                <button
                                    type="button"
                                    key={name}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${name} (${description}) for our infrastructure.`,
                                            {
                                                Source:
                                                    "Cloud & Managed IT",
                                                Technology: name,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-[#0a111d] dark:hover:border-blue-400/30"
                                >
                                    <div className="font-black">{name}</div>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        {description}
                                    </div>
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                MIGRATION
            ========================================================= */}

            <section className="bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-400">
                                Migration & modernization
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Moving infrastructure does not have to mean starting over.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                If your current hosting environment is slow, unreliable,
                                expensive, difficult to manage or simply no longer fits
                                your organization, we can assess the existing setup and
                                plan a better environment.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Assess the existing environment",
                                    "Identify applications and dependencies",
                                    "Plan the target infrastructure",
                                    "Prepare the new environment",
                                    "Migrate data and applications",
                                    "Configure domains and DNS",
                                    "Test before final transition",
                                    "Monitor after migration",
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-black text-blue-400">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <span className="text-sm font-semibold text-slate-200">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss migrating or modernizing our existing infrastructure.",
                                        {
                                            Source: "Cloud & Managed IT",
                                            Intent: "Migration",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                            >
                                Discuss a migration
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div>
                            <div className="relative mx-auto max-w-xl">
                                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-cyan-400/0" />

                                <div className="relative space-y-5">
                                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                            Existing
                                        </div>

                                        <div className="mt-4 grid grid-cols-3 gap-3">
                                            {["Website", "Database", "Files"].map(
                                                (item) => (
                                                    <div
                                                        key={item}
                                                        className="rounded-xl bg-black/20 p-4 text-center text-sm font-bold"
                                                    >
                                                        {item}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                                            <ArrowDown className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="rounded-3xl border border-blue-400/20 bg-blue-500/[0.07] p-6">
                                        <div className="text-xs font-bold uppercase tracking-widest text-blue-400">
                                            Planned
                                        </div>

                                        <div className="mt-4 grid grid-cols-3 gap-3">
                                            {[
                                                "Secure",
                                                "Monitored",
                                                "Backed up",
                                            ].map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-xl bg-blue-500/10 p-4 text-center text-sm font-bold text-blue-200"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                INDUSTRIES
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-[#080e1a] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                            Industries & organizations
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Infrastructure for organizations at different stages.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            Your infrastructure needs are shaped by what your organization
                            does, how many people depend on it and how important your
                            digital systems are to daily operations.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {industries.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss infrastructure for ${item.title.toLowerCase()}. ${item.text}`,
                                            {
                                                Source:
                                                    "Cloud & Managed IT",
                                                Industry: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0a111d] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.05] dark:text-blue-400">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-black">
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
                WHAT WE CAN TAKE CARE OF
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-[#050a13] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                                End-to-end support
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                You can bring us the requirement — we help handle the technical journey.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                This service is designed for organizations that do not want
                                to assemble five different technical providers just to get
                                one digital system running.
                            </p>

                            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0a111d]">
                                <div className="flex gap-4">
                                    <LifeBuoy className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />

                                    <div>
                                        <h3 className="font-black">
                                            Need help deciding what you need?
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            That is part of the service. We can start with
                                            your business objective and work backward into
                                            the infrastructure.
                                        </p>

                                        <button
                                            onClick={() =>
                                                startSupportChat(
                                                    "I need help deciding what infrastructure we actually need.",
                                                    {
                                                        Source:
                                                            "Cloud & Managed IT",
                                                        Intent:
                                                            "Help deciding",
                                                    }
                                                )
                                            }
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-400"
                                        >
                                            Start a conversation
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                ["Requirement discovery", Eye],
                                ["Infrastructure architecture", Layers3],
                                ["Cloud/server selection", Cloud],
                                ["Domain & DNS", Globe2],
                                ["Application deployment", Rocket],
                                ["Database setup", Database],
                                ["SSL / HTTPS", Lock],
                                ["Security configuration", ShieldCheck],
                                ["Backup configuration", HardDrive],
                                ["Monitoring", Gauge],
                                ["Maintenance", Wrench],
                                ["Technical support", Headphones],
                            ].map(([title, Icon]) => (
                                <div
                                    key={title}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0a111d]"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon className="h-4 w-4" />
                                    </div>

                                    <span className="text-sm font-bold">
                                        {title}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                OPERATIONAL VISIBILITY
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-[#080e1a] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">

                        <div>
                            <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                                Visibility
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Know what is happening before your users start complaining.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Monitoring gives your team visibility into important
                                infrastructure conditions so problems can be identified,
                                investigated and addressed more deliberately.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Server availability",
                                    "CPU and memory utilization",
                                    "Storage capacity",
                                    "Application health",
                                    "Database health",
                                    "SSL certificate status",
                                    "Backup status",
                                    "Service availability",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss monitoring for: ${item}.`,
                                                {
                                                    Source:
                                                        "Cloud & Managed IT",
                                                    "Monitoring area": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 text-left text-sm font-semibold transition hover:text-blue-700 dark:hover:text-blue-300"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-[#0a111d]">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#070d17]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Gauge className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        <span className="font-bold">
                                            System health
                                        </span>
                                    </div>

                                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        Healthy
                                    </span>
                                </div>

                                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                    {[
                                        ["Uptime", "Monitored"],
                                        ["Backups", "Verified"],
                                        ["Security", "Active"],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]"
                                        >
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {label}
                                            </div>
                                            <div className="mt-2 text-sm font-black">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-xl bg-slate-950 p-5 dark:bg-black">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">
                                            Current load
                                        </span>
                                        <span className="font-bold text-white">
                                            42%
                                        </span>
                                    </div>

                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                                    </div>

                                    <div className="mt-5 grid grid-cols-7 items-end gap-2">
                                        {[32, 48, 42, 56, 39, 47, 42].map(
                                            (height, index) => (
                                                <div
                                                    key={index}
                                                    className="rounded-sm bg-blue-500/60"
                                                    style={{
                                                        height: `${height}px`,
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                BUSINESS BENEFITS
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-[#050a13] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                            Why it matters
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Good infrastructure creates room for the business to move.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Zap,
                                title: "Move faster",
                                text: "Deploy new applications and services without rebuilding your infrastructure every time.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Reduce exposure",
                                text: "Use practical security controls to reduce unnecessary infrastructure risk.",
                            },
                            {
                                icon: Timer,
                                title: "Save time",
                                text: "Let technical specialists handle repetitive infrastructure operations.",
                            },
                            {
                                icon: TrendingUp,
                                title: "Scale deliberately",
                                text: "Evolve resources and architecture as workloads and business requirements change.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-[#0a111d]"
                                >
                                    <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />

                                    <h3 className="mt-6 text-xl font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section
                id="faq"
                className="scroll-mt-20 bg-white py-20 dark:bg-[#080e1a] lg:py-28"
            >
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Questions businesses usually ask.
                        </h2>
                    </div>

                    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="border-b border-slate-200 last:border-b-0 dark:border-white/10"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen ? null : index
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-5 bg-white p-6 text-left transition hover:bg-slate-50 dark:bg-[#0a111d] dark:hover:bg-white/[0.025]"
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
                                        <div className="bg-slate-50 px-6 pb-6 dark:bg-[#070d17]">
                                            <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source:
                                                                "Cloud & Managed IT",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:gap-3 dark:text-blue-300"
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

            <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-blue-400">
                        <CloudCog className="h-8 w-8" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                        Not sure what infrastructure you need?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                        That is exactly where we can help. Tell us what you are trying
                        to build, host, migrate or improve. We will help you understand
                        the infrastructure required and determine the next practical step.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request an infrastructure plan for our organization.",
                                    {
                                        Source: "Cloud & Managed IT",
                                        Intent:
                                            "Infrastructure plan request",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                        >
                            Request an Infrastructure Plan
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <a
                            href="#services"
                            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 font-bold text-white transition hover:bg-white/[0.08]"
                        >
                            Review Services
                            <ChevronRight className="h-5 w-5" />
                        </a>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-slate-400">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            Start from scratch
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            Existing infrastructure
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            Migration
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            Managed support
                        </span>
                    </div>
                </div>
            </section>

            {/* =========================================================
                QUOTE / CONSULTATION MODAL
            ========================================================= */}

            {showQuotePanel && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm dark:bg-black/80">
                    <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a111d]">

                        <button
                            onClick={() => setShowQuotePanel(false)}
                            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-7 sm:p-9">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white dark:bg-blue-500">
                                <CloudLightning className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-2xl font-black sm:text-3xl">
                                Tell us what you need.
                            </h2>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Give us a high-level description of your business,
                                application or infrastructure requirement. We'll
                                continue the conversation in AB AI support with full
                                context.
                            </p>

                            <form
                                onSubmit={handleQuoteSubmit}
                                className="mt-8 space-y-5"
                            >
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            Business / organization
                                        </label>

                                        <input
                                            type="text"
                                            name="organization"
                                            placeholder="Company name"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@company.com"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            Service
                                        </label>

                                        <select
                                            name="service"
                                            defaultValue=""
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#0d1624]"
                                        >
                                            <option value="" disabled>
                                                Select a service
                                            </option>
                                            {services.map((service) => (
                                                <option
                                                    key={service.id}
                                                    value={service.id}
                                                >
                                                    {service.title}
                                                </option>
                                            ))}
                                            <option value="other">
                                                Not sure yet
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        What are you trying to accomplish?
                                    </label>

                                    <textarea
                                        name="details"
                                        rows={6}
                                        placeholder="For example: We have a Django application and need a production server, database, SSL, backups and ongoing management..."
                                        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500"
                                    />
                                </div>

                                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900 dark:border-blue-400/20 dark:bg-blue-500/[0.07] dark:text-blue-100">
                                    <div className="flex gap-3">
                                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <span>
                                            You do not need to know the technical
                                            specifications before contacting us. Tell us
                                            the outcome you want and we can help work out
                                            the technical requirements.
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 font-black text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                                >
                                    Continue in Support
                                    <ArrowRight className="h-5 w-5" />
                                </button>

                                <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    Your request will be handed off to AB AI on
                                    the support page, where the conversation
                                    continues with full context and technical
                                    review.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default CloudManagedIT;