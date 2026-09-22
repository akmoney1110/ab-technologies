import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    CheckCircle2,
    ChevronDown,
    Cloud,
    CloudCog,
    CloudDownload,
    CloudDrizzle,
    CloudLightning,
    CloudOff,
    CloudUpload,
    Code2,
    Database,
    DatabaseBackup,
    Gauge,
    Globe2,
    HardDrive,
    Headphones,
    Lock,
    Mail,
    MonitorCog,
    Network,
    RefreshCw,
    Server,
    Shield,
    ShieldCheck,
    Sparkles,
    Terminal,
    UploadCloud,
    Wifi,
    Workflow,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function CloudDigitalInfrastructure() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);
    const [activeService, setActiveService] = useState("cloud");

    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss cloud and digital infrastructure for my organization.",
            metadata: metadata || {
                Source: "Cloud & Digital Infrastructure",
            },
        });
        navigate("/support/ai");
    };

    const services = [
        {
            id: "cloud",
            title: "Cloud Infrastructure",
            icon: Cloud,
            description:
                "Design, deploy and manage cloud environments built around your applications, users, data and operational requirements.",
        },
        {
            id: "hosting",
            title: "Web & Application Hosting",
            icon: Globe2,
            description:
                "Reliable hosting environments for websites, portals, APIs, SaaS products, e-commerce platforms and business applications.",
        },
        {
            id: "servers",
            title: "Servers & Virtual Infrastructure",
            icon: Server,
            description:
                "Virtual and dedicated server environments configured for performance, availability, security and scalability.",
        },
        {
            id: "devops",
            title: "DevOps & Deployment",
            icon: Workflow,
            description:
                "Automated deployment pipelines, environments, monitoring and operational workflows for modern applications.",
        },
        {
            id: "backup",
            title: "Backup & Disaster Recovery",
            icon: DatabaseBackup,
            description:
                "Structured backup and recovery strategies designed to protect critical business systems and data.",
        },
        {
            id: "managed",
            title: "Managed IT Infrastructure",
            icon: MonitorCog,
            description:
                "Ongoing infrastructure administration, monitoring, maintenance and technical support.",
        },
    ];

    const capabilities = [
        { icon: CloudCog, title: "Cloud Architecture", text: "We help organizations determine what should move to the cloud, what should remain on-premises and how different systems should work together." },
        { icon: Server, title: "Server Deployment", text: "Provision and configure Linux or Windows server environments for applications, databases, websites, APIs, internal systems and business workloads." },
        { icon: Database, title: "Database Infrastructure", text: "Deploy and maintain database environments with sensible access controls, backups, performance considerations and recovery procedures." },
        { icon: ShieldCheck, title: "Infrastructure Security", text: "Harden infrastructure through access controls, firewall policies, SSL/TLS, secure authentication, updates and operational safeguards." },
        { icon: Gauge, title: "Performance Optimization", text: "Identify infrastructure bottlenecks and improve application delivery, server resources, caching, database performance and network behavior." },
        { icon: RefreshCw, title: "Migration & Modernization", text: "Move websites, applications, databases, files, email and workloads between infrastructure environments with a structured migration approach." },
    ];

    const cloudModels = [
        {
            title: "Public Cloud",
            description: "Flexible infrastructure hosted on major cloud platforms for businesses that need scalability, elasticity and global availability.",
            icon: Cloud,
            points: ["Scalable compute resources", "Cloud storage", "Managed databases", "Application hosting", "Virtual networking", "Monitoring and backups"],
        },
        {
            title: "Private Infrastructure",
            description: "Dedicated environments for organizations requiring greater control over infrastructure, applications, data or operational policies.",
            icon: Server,
            points: ["Dedicated servers", "Virtual machines", "Private networks", "Controlled access", "Internal applications", "Custom configurations"],
        },
        {
            title: "Hybrid Infrastructure",
            description: "A coordinated combination of cloud and local infrastructure for organizations with mixed operational requirements.",
            icon: Network,
            points: ["Cloud + on-premises", "Hybrid applications", "Data synchronization", "Secure connectivity", "Gradual migration", "Centralized management"],
        },
    ];

    const hostingOptions = [
        { title: "Business Websites", icon: Globe2, description: "Hosting for corporate websites, company profiles, landing pages, informational portals and professional online platforms." },
        { title: "Web Applications", icon: Code2, description: "Infrastructure for Django, React, Node.js, PHP and other modern web applications." },
        { title: "APIs & Backend Systems", icon: Terminal, description: "Deploy APIs, backend services, authentication systems, background workers and integrations." },
        { title: "SaaS Platforms", icon: Workflow, description: "Infrastructure for subscription platforms, dashboards, marketplaces, portals and business software." },
        { title: "E-commerce", icon: Zap, description: "Infrastructure for online stores and transaction-oriented platforms with appropriate performance and availability considerations." },
        { title: "Enterprise Portals", icon: MonitorCog, description: "Hosting environments for employee portals, customer portals, institutional systems and internal applications." },
    ];

    const infrastructureStack = [
        "Linux", "Windows Server", "Docker", "Nginx", "Apache", "Gunicorn",
        "PostgreSQL", "MySQL", "Redis", "Celery", "Cloudflare", "SSL/TLS",
        "Git", "CI/CD", "Virtual Machines", "Object Storage",
    ];

    const managedServices = [
        { title: "Infrastructure Monitoring", description: "Monitor servers, applications and infrastructure signals so problems can be identified before they become major disruptions.", icon: Gauge },
        { title: "Server Maintenance", description: "Routine updates, configuration reviews, resource checks and operational maintenance.", icon: Server },
        { title: "Backup Management", description: "Configure backup routines, retention approaches and recovery procedures around business requirements.", icon: DatabaseBackup },
        { title: "SSL & Domain Management", description: "Support for domains, DNS configuration, SSL certificates and related web infrastructure.", icon: Lock },
        { title: "Email Infrastructure", description: "Business email configuration, DNS records, authentication and related infrastructure support.", icon: Mail },
        { title: "Technical Support", description: "Ongoing technical assistance for infrastructure issues, deployments, incidents and configuration changes.", icon: Headphones },
    ];

    const migrationSteps = [
        { number: "01", title: "Discovery", description: "We review your existing applications, hosting, databases, domains, DNS, storage, dependencies and business requirements." },
        { number: "02", title: "Architecture", description: "We design the target infrastructure and determine the resources, services, security controls and deployment approach required." },
        { number: "03", title: "Preparation", description: "The destination environment is provisioned and configured before production workloads are moved." },
        { number: "04", title: "Migration", description: "Applications, databases, files and supporting services are transferred according to the agreed migration plan." },
        { number: "05", title: "Validation", description: "We verify application functionality, connectivity, DNS, SSL, databases, performance and key business workflows." },
        { number: "06", title: "Handover & Support", description: "The environment is documented and handed over with ongoing support available where required." },
    ];

    const securityLayers = [
        { title: "Identity & Access", description: "Access should be limited according to roles, responsibilities and operational requirements.", icon: Lock },
        { title: "Network Controls", description: "Firewall policies, segmentation and secure connectivity help reduce unnecessary exposure.", icon: Network },
        { title: "Encryption", description: "SSL/TLS and appropriate encryption controls help protect information during transmission.", icon: Shield },
        { title: "Backups", description: "Recovery copies provide an additional layer of protection against accidental loss or infrastructure failures.", icon: DatabaseBackup },
        { title: "Monitoring", description: "Operational visibility helps identify unusual behavior, failures and resource problems.", icon: Gauge },
        { title: "Updates", description: "Keeping infrastructure components maintained reduces avoidable operational and security risks.", icon: RefreshCw },
    ];

    const faqs = [
        { question: "Can you host a website that you did not build?", answer: "Yes. We can assess an existing website or application and determine the infrastructure requirements before recommending a suitable hosting environment." },
        { question: "Can you move my existing website to a new server?", answer: "Yes. We can assist with website, application, database, domain and DNS migration. The exact approach depends on the existing hosting environment and application architecture." },
        { question: "Do you provide cloud services only?", answer: "No. Our infrastructure work can include cloud environments, dedicated servers, virtual machines, hosting platforms, hybrid environments and managed infrastructure." },
        { question: "Can you manage the server after deployment?", answer: "Yes. Managed infrastructure can include monitoring, maintenance, backups, configuration changes, troubleshooting and ongoing technical support." },
        { question: "Can you set up business email?", answer: "Yes. We can assist with domain configuration, DNS records, mailbox setup, authentication records and related email infrastructure." },
        { question: "Can you configure SSL and DNS?", answer: "Yes. DNS records, SSL certificates, redirects, domains and related web infrastructure can be part of a deployment or migration project." },
        { question: "Can you deploy applications built with Django or React?", answer: "Yes. We can deploy modern web applications and supporting backend infrastructure, including application servers, reverse proxies, databases, background workers and related services." },
        { question: "Can you design infrastructure for a growing company?", answer: "Yes. We can design an infrastructure approach that considers the organization's current needs while leaving room for future growth." },
    ];

    const stats = [
        { value: "24/7", label: "Infrastructure readiness", description: "Designed for businesses that need systems available beyond office hours." },
        { value: "360°", label: "Infrastructure view", description: "Applications, servers, networks, domains, databases and supporting services." },
        { value: "End-to-End", label: "Implementation", description: "From infrastructure planning through deployment and ongoing support." },
        { value: "Scalable", label: "Architecture", description: "Infrastructure can evolve as users, workloads and business requirements grow." },
    ];

    return (
        <main className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* BACKGROUND */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
                <div className="absolute -right-40 top-[30rem] h-[32rem] w-[32rem] rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute left-1/3 top-[90rem] h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-500/10" />
                <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]" style={{ backgroundImage: "linear-gradient(rgba(15,23,42,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.8) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
            </div>

            {/* HERO */}
            <section className="relative isolate">
                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                                <Cloud className="h-4 w-4" />
                                Cloud & Digital Infrastructure
                            </div>

                            <h1 className="max-w-5xl text-4xl font-black leading-[1.03] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Infrastructure that keeps your
                                <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                    digital business moving.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                We design, deploy, migrate, secure and manage the infrastructure
                                behind websites, applications, databases, cloud workloads,
                                business email, internal systems and digital platforms.
                            </p>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Whether you are starting from scratch, replacing unreliable
                                hosting or scaling an existing operation, we can help you
                                understand what you need, build it and keep it running.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like an infrastructure assessment. Here's what we're working with:",
                                            { Source: "Cloud & Digital Infrastructure", Stage: "Hero — assessment" }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    Assess My Infrastructure
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your cloud and infrastructure services.",
                                            { Source: "Cloud & Digital Infrastructure", Stage: "Hero — explore services" }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    Explore Infrastructure Services
                                    <ArrowDownIcon />
                                </button>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                                {stats.map((item) => (
                                    <button
                                        type="button"
                                        key={item.label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to know more about "${item.label}": ${item.description}`,
                                                { Source: "Cloud & Digital Infrastructure", Highlight: item.label }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-left backdrop-blur transition hover:border-cyan-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-cyan-400/30"
                                    >
                                        <div className="text-lg font-black text-slate-950 dark:text-white">
                                            {item.value}
                                        </div>
                                        <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
                                            {item.label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-500/20 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-4 shadow-2xl dark:border-white/10">
                                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/70 p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                                                Infrastructure Control
                                            </p>
                                            <p className="mt-1 text-sm text-slate-400">
                                                Digital environment overview
                                            </p>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                            <CloudCog className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="mt-7 grid grid-cols-2 gap-3">
                                        <DashboardCard icon={Cloud} title="Cloud" value="Operational" onClick={() => startSupportChat("I'd like to discuss cloud operational status.", { Source: "Cloud & Digital Infrastructure", "Dashboard card": "Cloud" })} />
                                        <DashboardCard icon={Server} title="Servers" value="Healthy" onClick={() => startSupportChat("I'd like to discuss server health.", { Source: "Cloud & Digital Infrastructure", "Dashboard card": "Servers" })} />
                                        <DashboardCard icon={Database} title="Database" value="Protected" onClick={() => startSupportChat("I'd like to discuss database protection.", { Source: "Cloud & Digital Infrastructure", "Dashboard card": "Database" })} />
                                        <DashboardCard icon={ShieldCheck} title="Security" value="Active" onClick={() => startSupportChat("I'd like to discuss infrastructure security.", { Source: "Cloud & Digital Infrastructure", "Dashboard card": "Security" })} />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss the overall infrastructure health of our environment.",
                                                { Source: "Cloud & Digital Infrastructure", "Dashboard card": "Infrastructure health" }
                                            )
                                        }
                                        className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-400">
                                                Infrastructure health
                                            </span>
                                            <span className="text-xs font-bold text-emerald-300">
                                                Stable
                                            </span>
                                        </div>

                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                            <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                                        </div>

                                        <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                                            <Metric label="Uptime" value="99.9%" />
                                            <Metric label="Backups" value="Active" />
                                            <Metric label="SSL" value="Valid" />
                                        </div>
                                    </button>

                                    <div className="mt-3 grid grid-cols-3 gap-3">
                                        <MiniNode icon={Globe2} text="Web" onClick={() => startSupportChat("I'd like to discuss web infrastructure.", { Source: "Cloud & Digital Infrastructure", "Mini node": "Web" })} />
                                        <MiniNode icon={Code2} text="Apps" onClick={() => startSupportChat("I'd like to discuss application hosting.", { Source: "Cloud & Digital Infrastructure", "Mini node": "Apps" })} />
                                        <MiniNode icon={Database} text="Data" onClick={() => startSupportChat("I'd like to discuss database infrastructure.", { Source: "Cloud & Digital Infrastructure", "Mini node": "Data" })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO / FROM SCRATCH */}
            <section className="relative border-y border-slate-200/70 bg-slate-50/80 dark:border-white/10 dark:bg-slate-900/30">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                Start from anywhere
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                You don't need to already have an infrastructure plan.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Many businesses know they need a website, application,
                                cloud environment or reliable IT infrastructure but don't
                                know exactly what server, hosting, database or security
                                architecture they need.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like help starting my infrastructure from scratch.",
                                        { Source: "Cloud & Digital Infrastructure", Stage: "From scratch" }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-4 text-sm font-bold text-cyan-800 transition hover:bg-cyan-100 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20"
                            >
                                <Sparkles className="h-5 w-5" />
                                We can help you start from scratch.
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <FeatureBox number="01" title="Tell us what you are building" text="Website, SaaS platform, internal system, online store, company portal, API or something else." onClick={() => startSupportChat("I'd like to tell you what we're building so you can recommend infrastructure.", { Source: "Cloud & Digital Infrastructure", "From scratch": "01 — Tell us what you are building" })} />
                            <FeatureBox number="02" title="We translate it into infrastructure" text="We determine the hosting, compute, database, storage, networking and security requirements." onClick={() => startSupportChat("I'd like you to translate our requirement into infrastructure specifications.", { Source: "Cloud & Digital Infrastructure", "From scratch": "02 — Translate to infrastructure" })} />
                            <FeatureBox number="03" title="We build the environment" text="Infrastructure is configured, secured and prepared for deployment." onClick={() => startSupportChat("I'd like you to build and secure our infrastructure environment.", { Source: "Cloud & Digital Infrastructure", "From scratch": "03 — Build the environment" })} />
                            <FeatureBox number="04" title="We can stay with you" text="Choose ongoing management, monitoring, maintenance and support where needed." onClick={() => startSupportChat("I'd like ongoing management, monitoring, maintenance and support.", { Source: "Cloud & Digital Infrastructure", "From scratch": "04 — Stay with you" })} />
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Infrastructure services
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            One infrastructure partner for the full lifecycle.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            From initial architecture to deployment, migration, optimization,
                            monitoring and support, our services are designed to work together.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 lg:grid-cols-3">
                        {services.map((service) => {
                            const Icon = service.icon;
                            const active = activeService === service.id;

                            return (
                                <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => {
                                        setActiveService(service.id);
                                        startSupportChat(
                                            `I'd like to explore the infrastructure service: ${service.title}. ${service.description}`,
                                            { Source: "Cloud & Digital Infrastructure", Service: service.title }
                                        );
                                    }}
                                    className={`group text-left rounded-3xl border p-6 transition duration-300 ${active ? "border-cyan-300 bg-cyan-50 shadow-xl shadow-cyan-500/10 dark:border-cyan-400/30 dark:bg-cyan-400/[0.07]" : "border-slate-200 bg-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-white/20"}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <ArrowUpRight className={`h-5 w-5 transition ${active ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white"}`} />
                                    </div>
                                    <h3 className="mt-6 text-lg font-black">{service.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {service.description}
                                    </p>
                                    <div className="mt-5 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                                        Explore capability
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
                <div className="absolute inset-0">
                    <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                            What we handle
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Infrastructure built around your actual business.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-400">
                            Infrastructure is more than buying a server. It is the combination
                            of compute, networking, storage, applications, databases,
                            security, deployment and operational processes.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {capabilities.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the capability: ${item.title} — ${item.text}`,
                                            { Source: "Cloud & Digital Infrastructure", Capability: item.title }
                                        )
                                    }
                                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-left backdrop-blur transition hover:border-cyan-400/30 hover:bg-white/[0.055]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 text-lg font-black">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CLOUD MODELS */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                Infrastructure models
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Choose the environment that fits the workload.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                There is no universal infrastructure setup. The right model
                                depends on your applications, users, budget, compliance
                                requirements, performance expectations and growth plans.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "New business infrastructure",
                                    "Existing application modernization",
                                    "Cloud migration",
                                    "Hybrid environments",
                                    "Dedicated workloads",
                                    "Scalable SaaS platforms",
                                ].map((text) => (
                                    <button
                                        type="button"
                                        key={text}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss infrastructure for: ${text}.`,
                                                { Source: "Cloud & Digital Infrastructure", "Model use case": text }
                                            )
                                        }
                                        className="flex items-center gap-3 text-left text-sm font-semibold text-slate-700 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-cyan-500" />
                                        {text}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {cloudModels.map((model) => {
                                const Icon = model.icon;
                                return (
                                    <button
                                        type="button"
                                        key={model.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the ${model.title} model. ${model.description}`,
                                                { Source: "Cloud & Digital Infrastructure", "Cloud model": model.title }
                                            )
                                        }
                                        className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-cyan-400/30"
                                    >
                                        <div className="flex flex-col gap-6 sm:flex-row">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 dark:bg-white/10">
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-xl font-black">{model.title}</h3>
                                                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                    {model.description}
                                                </p>

                                                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                                                    {model.points.map((point) => (
                                                        <div key={point} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                                            <Check className="h-4 w-4 text-cyan-500" />
                                                            {point}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* HOSTING */}
            <section className="relative bg-slate-50 dark:bg-slate-900/40">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                Hosting
                            </span>
                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Hosting for more than just websites.
                            </h2>
                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Your infrastructure may need to support an entire digital
                                operation—not simply a homepage. We can help plan hosting
                                around the systems that actually power your organization.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-cyan-200 bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-sm dark:border-cyan-400/20 dark:bg-white/[0.04] dark:text-slate-200">
                            Websites • APIs • SaaS • Databases • Portals
                        </div>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {hostingOptions.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like hosting for: ${item.title}. ${item.description}`,
                                            { Source: "Cloud & Digital Infrastructure", "Hosting type": item.title }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/50 dark:hover:border-cyan-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 font-black">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* TECH STACK */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                Technology environments
                            </span>
                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Infrastructure that works with modern technology.
                            </h2>
                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                We work across the infrastructure layer supporting modern
                                applications—from operating systems and reverse proxies
                                to databases, containers, caching, DNS and deployment.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-2">
                                {infrastructureStack.map((technology) => (
                                    <button
                                        type="button"
                                        key={technology}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss infrastructure around: ${technology}.`,
                                                { Source: "Cloud & Digital Infrastructure", "Tech stack": technology }
                                            )
                                        }
                                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-cyan-400/30 dark:hover:text-cyan-300"
                                    >
                                        {technology}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-500/10 blur-2xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-white/10">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 dark:bg-white/10">
                                        <Terminal className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black">Deployment architecture</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Application delivery pipeline
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 py-5">
                                    <ArchitectureRow icon={Globe2} title="Internet / DNS" text="Domain & traffic routing" onClick={() => startSupportChat("I'd like to discuss the Internet / DNS layer.", { Source: "Cloud & Digital Infrastructure", "Architecture layer": "Internet / DNS" })} />
                                    <ArchitectureRow icon={ShieldCheck} title="Security Layer" text="SSL, firewall & access" onClick={() => startSupportChat("I'd like to discuss the security layer.", { Source: "Cloud & Digital Infrastructure", "Architecture layer": "Security" })} />
                                    <ArchitectureRow icon={Server} title="Application Server" text="Web & backend workloads" onClick={() => startSupportChat("I'd like to discuss the application server layer.", { Source: "Cloud & Digital Infrastructure", "Architecture layer": "Application Server" })} />
                                    <ArchitectureRow icon={Database} title="Data Layer" text="Database & storage" onClick={() => startSupportChat("I'd like to discuss the data layer.", { Source: "Cloud & Digital Infrastructure", "Architecture layer": "Data Layer" })} />
                                    <ArchitectureRow icon={DatabaseBackup} title="Recovery Layer" text="Backup & restoration" onClick={() => startSupportChat("I'd like to discuss the recovery layer.", { Source: "Cloud & Digital Infrastructure", "Architecture layer": "Recovery" })} />
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss our deployment status and readiness.",
                                            { Source: "Cloud & Digital Infrastructure", "Architecture layer": "Deployment status" }
                                        )
                                    }
                                    className="w-full rounded-2xl bg-slate-50 p-4 text-left dark:bg-white/[0.04]"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                            Deployment status
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                            Ready
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DEVOPS */}
            <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-cyan-950/20 dark:via-slate-950 dark:to-blue-950/20">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Deployment & DevOps
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Make deployment a process—not a panic.
                        </h2>
                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            Modern applications need repeatable deployment processes,
                            controlled environments and reliable operational practices.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 lg:grid-cols-4">
                        {[
                            { icon: Code2, title: "Development", text: "Application code and configuration prepared for deployment." },
                            { icon: Workflow, title: "Automation", text: "Repeatable processes reduce unnecessary manual work." },
                            { icon: Server, title: "Infrastructure", text: "Servers and services configured for the application." },
                            { icon: Gauge, title: "Monitoring", text: "Visibility into infrastructure and application behavior." },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss DevOps stage: ${item.title} — ${item.text}`,
                                            { Source: "Cloud & Digital Infrastructure", "DevOps stage": item.title }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-cyan-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 dark:bg-white/10">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 font-black">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* BACKUP & RECOVERY */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                                <DatabaseBackup className="h-7 w-7" />
                            </div>

                            <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-5xl">
                                Your infrastructure should have a recovery plan.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Hardware failure, accidental deletion, application problems,
                                configuration mistakes and other incidents can affect digital
                                systems. A backup strategy provides a way to recover critical
                                information and services.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Database backups", "Application and file backups",
                                    "Backup retention planning", "Recovery testing",
                                    "Restoration procedures", "Disaster recovery planning",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss backup/recovery: ${item}.`,
                                                { Source: "Cloud & Digital Infrastructure", "Backup topic": item }
                                            )
                                        }
                                        className="flex items-center gap-3 text-left transition hover:opacity-90"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl dark:border-white/10">
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                                            Recovery architecture
                                        </p>
                                        <p className="mt-2 text-sm text-slate-400">
                                            Protecting critical business data
                                        </p>
                                    </div>
                                    <DatabaseBackup className="h-6 w-6 text-cyan-300" />
                                </div>

                                <div className="mt-8 space-y-4">
                                    <RecoveryItem title="Primary System" status="Operational" onClick={() => startSupportChat("I'd like to discuss the primary system in the recovery architecture.", { Source: "Cloud & Digital Infrastructure", "Recovery item": "Primary System" })} />
                                    <RecoveryItem title="Backup Copy" status="Available" onClick={() => startSupportChat("I'd like to discuss the backup copy.", { Source: "Cloud & Digital Infrastructure", "Recovery item": "Backup Copy" })} />
                                    <RecoveryItem title="Recovery Procedure" status="Documented" onClick={() => startSupportChat("I'd like to discuss the recovery procedure.", { Source: "Cloud & Digital Infrastructure", "Recovery item": "Recovery Procedure" })} />
                                    <RecoveryItem title="Restoration Check" status="Planned" onClick={() => startSupportChat("I'd like to discuss the restoration check.", { Source: "Cloud & Digital Infrastructure", "Recovery item": "Restoration Check" })} />
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to plan a recovery strategy before any incident happens.",
                                            { Source: "Cloud & Digital Infrastructure", "Recovery note": "Plan before incident" }
                                        )
                                    }
                                    className="mt-6 w-full rounded-2xl bg-cyan-400/10 p-5 text-left"
                                >
                                    <div className="flex gap-3">
                                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                                        <div>
                                            <p className="text-sm font-bold">
                                                Recovery should be planned before an incident.
                                            </p>
                                            <p className="mt-1 text-xs leading-6 text-slate-400">
                                                Backup strategy should reflect the importance
                                                of the systems and information being protected.
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECURITY */}
            <section className="relative bg-slate-950 py-20 text-white lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                                Infrastructure security
                            </span>
                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Security belongs inside the architecture.
                            </h2>
                            <p className="mt-5 leading-8 text-slate-400">
                                Infrastructure should be designed with security considerations
                                from the beginning rather than treated as an afterthought.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {securityLayers.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss infrastructure security: ${item.title} — ${item.description}`,
                                                { Source: "Cloud & Digital Infrastructure", "Security layer": item.title }
                                            )
                                        }
                                        className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-left transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-5 font-black">{item.title}</h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-400">
                                            {item.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* MIGRATION */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Migration
                        </span>
                        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                            Moving infrastructure without moving blindly.
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
                            A structured migration reduces surprises and creates a clear
                            path from your current environment to the target infrastructure.
                        </p>
                    </div>

                    <div className="relative mt-14">
                        <div className="absolute left-5 top-0 hidden h-full w-px bg-slate-200 lg:block dark:bg-white/10" />
                        <div className="grid gap-5 lg:gap-7">
                            {migrationSteps.map((step) => (
                                <button
                                    type="button"
                                    key={step.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the migration step: ${step.title} — ${step.description}`,
                                            { Source: "Cloud & Digital Infrastructure", Step: `${step.number} — ${step.title}` }
                                        )
                                    }
                                    className="relative grid gap-5 text-left lg:grid-cols-[5rem_1fr] lg:items-start"
                                >
                                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-cyan-300 dark:bg-white dark:text-slate-950">
                                        {step.number}
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-cyan-400/30">
                                        <h3 className="text-lg font-black">{step.title}</h3>
                                        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MANAGED SERVICES */}
            <section className="relative bg-slate-50 dark:bg-slate-900/40">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Managed infrastructure
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Build it once. Keep it healthy.
                        </h2>
                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            If you do not want your team spending its time maintaining servers,
                            DNS, backups and infrastructure configurations, we can provide
                            ongoing technical support.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {managedServices.map((service) => {
                            const Icon = service.icon;
                            return (
                                <button
                                    type="button"
                                    key={service.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss managed service: ${service.title} — ${service.description}`,
                                            { Source: "Cloud & Digital Infrastructure", "Managed service": service.title }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950 dark:hover:border-cyan-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 font-black">{service.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {service.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* EMAIL + DNS + DOMAIN */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid gap-5 md:grid-cols-3">
                        <InfrastructureCard icon={Globe2} title="Domains & DNS" text="Domain registration support, DNS records, routing, subdomains and infrastructure changes." onClick={() => startSupportChat("I'd like to discuss domain & DNS support.", { Source: "Cloud & Digital Infrastructure", "Infrastructure card": "Domains & DNS" })} />
                        <InfrastructureCard icon={Lock} title="SSL / HTTPS" text="SSL certificate configuration, HTTPS enforcement and secure web delivery." onClick={() => startSupportChat("I'd like to discuss SSL / HTTPS configuration.", { Source: "Cloud & Digital Infrastructure", "Infrastructure card": "SSL / HTTPS" })} />
                        <InfrastructureCard icon={Mail} title="Business Email" text="Email domain configuration, authentication records, mailbox infrastructure and delivery-related setup." onClick={() => startSupportChat("I'd like to discuss business email infrastructure.", { Source: "Cloud & Digital Infrastructure", "Infrastructure card": "Business Email" })} />
                    </div>
                </div>
            </section>

            {/* FOR DIFFERENT BUSINESSES */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/20">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Built for different environments
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Infrastructure for the way your organization operates.
                        </h2>
                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                            A small company, school, growing startup and established
                            organization can have completely different infrastructure needs.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "Startups", text: "Lean infrastructure that can grow as the product and customer base grow.", icon: Sparkles },
                            { title: "SMEs", text: "Practical infrastructure for websites, applications, email, files and business operations.", icon: Workflow },
                            { title: "Institutions", text: "Infrastructure for portals, internal systems, databases and organizational operations.", icon: MonitorCog },
                            { title: "Enterprises", text: "Structured infrastructure for complex workloads, teams and operational requirements.", icon: Network },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like infrastructure guidance for ${item.title}: ${item.text}`,
                                            { Source: "Cloud & Digital Infrastructure", "Business type": item.title }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-cyan-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 dark:bg-white/10">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 font-black">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                Why work with us
                            </span>
                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Technology decisions without unnecessary complexity.
                            </h2>
                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Infrastructure can quickly become confusing when hosting
                                providers, servers, domains, DNS, databases, SSL certificates,
                                deployment tools and applications are handled separately.
                            </p>
                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                We bring those moving pieces together into an infrastructure
                                approach that is easier to understand, operate and maintain.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Business-first infrastructure planning",
                                "Clear recommendations before implementation",
                                "Deployment and migration support",
                                "Security-conscious configurations",
                                "Backup and recovery planning",
                                "Ongoing infrastructure management",
                                "Application-aware hosting",
                                "Support when infrastructure changes",
                            ].map((item, index) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss: ${item}.`,
                                            { Source: "Cloud & Digital Infrastructure", "Why us": item }
                                        )
                                    }
                                    className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-cyan-300 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-cyan-400/30"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-sm font-black text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                        {item}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="relative bg-slate-950 py-20 text-white lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                            How we work
                        </span>
                        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                            A practical infrastructure journey.
                        </h2>
                    </div>

                    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {[
                            { number: "01", title: "Understand", text: "We learn what you are trying to achieve." },
                            { number: "02", title: "Recommend", text: "We map requirements to an infrastructure approach." },
                            { number: "03", title: "Build", text: "We configure and deploy the environment." },
                            { number: "04", title: "Validate", text: "We test key systems and configurations." },
                            { number: "05", title: "Support", text: "We remain available for ongoing infrastructure needs." },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.number}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to understand the process step: ${item.title} — ${item.text}`,
                                        { Source: "Cloud & Digital Infrastructure", Step: `${item.number} — ${item.title}` }
                                    )
                                }
                                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-left transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
                            >
                                <span className="text-sm font-black text-cyan-300">
                                    {item.number}
                                </span>
                                <h3 className="mt-5 font-black">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {item.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ASSESSMENT CTA */}
            <section id="infrastructure-assessment" className="relative">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="relative overflow-hidden rounded-[2rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-8 shadow-xl sm:p-12 dark:border-cyan-400/20 dark:from-cyan-950/40 dark:via-slate-950 dark:to-blue-950/30">
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white">
                                    <CloudCog className="h-3.5 w-3.5" />
                                    Infrastructure assessment
                                </span>

                                <h2 className="mt-6 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                                    Not sure what infrastructure you need?
                                </h2>

                                <p className="mt-5 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
                                    Tell us what you are building, what you already have,
                                    where you are experiencing problems and where you want
                                    to go. We can help turn that into a practical infrastructure
                                    plan.
                                </p>

                                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "New infrastructure", "Existing hosting problems",
                                        "Migration", "Server deployment",
                                        "Cloud setup", "Managed IT",
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I need infrastructure help with: ${item}.`,
                                                    { Source: "Cloud & Digital Infrastructure", "Assessment scope": item }
                                                )
                                            }
                                            className="flex items-center gap-2 text-left text-sm font-bold text-slate-700 transition hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to start an infrastructure request. Here's what we need:",
                                        { Source: "Cloud & Digital Infrastructure", Stage: "Assessment — start request" }
                                    )
                                }
                                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1 dark:bg-white dark:text-slate-950"
                            >
                                Start an Infrastructure Request
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative bg-slate-50 dark:bg-slate-900/40">
                <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Frequently asked questions
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Infrastructure questions, answered.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const open = openFaq === index;
                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border transition ${open ? "border-cyan-300 bg-white shadow-sm dark:border-cyan-400/20 dark:bg-slate-950" : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950/50"}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(open ? null : index)}
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="text-sm font-black sm:text-base">
                                            {faq.question}
                                        </span>
                                        <ChevronDown className={`h-5 w-5 shrink-0 transition ${open ? "rotate-180 text-cyan-500" : ""}`} />
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
                                                        { Source: "Cloud & Digital Infrastructure", FAQ: faq.question }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-cyan-600 hover:gap-3 dark:text-cyan-400"
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
            <section id="contact" className="relative overflow-hidden bg-slate-950 py-24 text-white">
                <div className="absolute inset-0">
                    <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                        <CloudCog className="h-8 w-8" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                        Let's build infrastructure your business can depend on.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
                        Whether you are starting from scratch, moving from unreliable
                        hosting, launching an application or modernizing your existing
                        infrastructure, we can help you plan the next step.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request infrastructure help. Here's what we need:",
                                    { Source: "Cloud & Digital Infrastructure", Stage: "Final CTA — request help" }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-slate-200"
                        >
                            Request Infrastructure Help
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to explore your infrastructure services.",
                                    { Source: "Cloud & Digital Infrastructure", Stage: "Final CTA — explore services" }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-black text-white transition hover:bg-white/[0.08]"
                        >
                            Explore Services
                            <ArrowUpRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
                        {["Cloud", "Hosting", "Servers", "Security", "Backup", "Managed IT"].map((label) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss: ${label}.`,
                                        { Source: "Cloud & Digital Infrastructure", "Final chip": label }
                                    )
                                }
                                className="inline-flex items-center gap-2 transition hover:text-white"
                            >
                                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

/* SUPPORTING COMPONENTS */

function DashboardCard({ icon: Icon, title, value, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
        >
            <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-4 w-4" />
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <p className="mt-4 text-xs text-slate-500">{title}</p>
            <p className="mt-1 text-sm font-black text-white">{value}</p>
        </button>
    );
}

function Metric({ label, value }) {
    return (
        <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 text-xs font-bold text-slate-200">{value}</p>
        </div>
    );
}

function MiniNode({ icon: Icon, text, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-left transition hover:border-cyan-400/30"
        >
            <Icon className="h-4 w-4 text-cyan-300" />
            <span className="text-xs font-bold text-slate-300">{text}</span>
        </button>
    );
}

function FeatureBox({ number, title, text, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-cyan-400/30"
        >
            <span className="text-xs font-black text-cyan-600 dark:text-cyan-400">{number}</span>
            <h3 className="mt-4 font-black text-slate-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{text}</p>
        </button>
    );
}

function ArchitectureRow({ icon: Icon, title, text, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-cyan-300 dark:border-white/10 dark:hover:border-cyan-400/30"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-sm font-black">{title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{text}</p>
            </div>
            <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" />
        </button>
    );
}

function RecoveryItem({ title, status, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-400/30"
        >
            <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="text-sm font-bold text-slate-200">{title}</span>
            </div>
            <span className="text-xs font-bold text-cyan-300">{status}</span>
        </button>
    );
}

function InfrastructureCard({ icon: Icon, title, text, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-cyan-400/30"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{text}</p>
        </button>
    );
}

function ArrowDownIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M10 4v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}