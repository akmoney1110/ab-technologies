import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock3,
    Cloud,
    Code2,
    Cpu,
    Database,
    FileCheck2,
    Headphones,
    Layers3,
    LifeBuoy,
    LockKeyhole,
    Monitor,
    Network,
    PackageCheck,
    PhoneCall,
    RefreshCw,
    Search,
    Server,
    Settings2,
    ShieldCheck,
    Sparkles,
    Target,
    Terminal,
    Users,
    Wrench,
    Zap,
    Building2,
    Laptop,
    Wifi,
    HardDrive,
    Router,
    Printer,
    Smartphone,
    Mail,
    Globe2,
    BarChart3,
    Workflow,
    GraduationCap,
    BriefcaseBusiness,
    ClipboardCheck,
    CalendarCheck2,
    AlertTriangle,
    Menu,
    X,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

const deploymentServices = [
    {
        icon: Monitor,
        title: "Workstation Deployment",
        description:
            "Complete preparation, configuration, application installation, security hardening, user setup, and handover for laptops, desktops, workstations, and shared computers.",
        items: [
            "Operating system installation",
            "Driver and firmware configuration",
            "Business application installation",
            "User account configuration",
            "Security baseline configuration",
            "Device naming and inventory",
        ],
    },
    {
        icon: Network,
        title: "Network Deployment",
        description:
            "Plan, install, configure, test, document, and support business networks from small offices to multi-location environments.",
        items: [
            "LAN and WAN deployment",
            "Wi-Fi configuration",
            "Router and switch setup",
            "VLAN configuration",
            "Network segmentation",
            "Connectivity testing",
        ],
    },
    {
        icon: Server,
        title: "Server Deployment",
        description:
            "Deploy physical and virtual servers with structured configuration, security controls, storage planning, backup integration, and documentation.",
        items: [
            "Windows and Linux servers",
            "Virtual machine deployment",
            "Active Directory",
            "File and application servers",
            "Storage configuration",
            "Server hardening",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud Deployment",
        description:
            "Move workloads, applications, identities, files, and business services into properly configured cloud environments.",
        items: [
            "Cloud account setup",
            "Identity configuration",
            "Cloud application deployment",
            "Migration planning",
            "Backup configuration",
            "Cloud security controls",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Security Deployment",
        description:
            "Implement practical security controls across devices, networks, accounts, applications, and infrastructure.",
        items: [
            "Endpoint security",
            "MFA configuration",
            "Access control",
            "Firewall configuration",
            "Security policies",
            "Device hardening",
        ],
    },
    {
        icon: PackageCheck,
        title: "Bulk Device Rollout",
        description:
            "Prepare and deploy large quantities of devices consistently for companies, schools, organizations, branches, and distributed teams.",
        items: [
            "Device imaging",
            "Asset tagging",
            "Bulk configuration",
            "User assignment",
            "Delivery coordination",
            "Deployment reporting",
        ],
    },
];

const supportPlans = [
    {
        name: "Essential Support",
        description: "For smaller teams that need reliable technical assistance when issues arise.",
        features: [
            "Remote troubleshooting",
            "Business-hours support",
            "Software installation assistance",
            "Basic device support",
            "Network troubleshooting",
            "Monthly service review",
        ],
    },
    {
        name: "Business Support",
        description: "For growing organizations that need proactive IT assistance and regular maintenance.",
        popular: true,
        features: [
            "Priority technical support",
            "Remote and onsite support",
            "Preventive maintenance",
            "Device monitoring",
            "Network health checks",
            "Backup verification",
            "Security reviews",
            "Monthly IT reporting",
        ],
    },
    {
        name: "Managed IT",
        description: "For organizations that want an ongoing technology partner rather than occasional support.",
        features: [
            "Proactive monitoring",
            "Priority incident response",
            "Infrastructure management",
            "Endpoint management",
            "Security management",
            "Backup oversight",
            "Cloud administration",
            "IT documentation",
            "Strategic technology reviews",
        ],
    },
];

const deploymentProcess = [
    {
        number: "01",
        title: "Discover",
        icon: Search,
        description:
            "We begin by understanding your users, devices, applications, infrastructure, business requirements, locations, deadlines, and operational constraints.",
    },
    {
        number: "02",
        title: "Assess",
        icon: ClipboardCheck,
        description:
            "We assess the current environment, identify compatibility issues, dependencies, risks, outdated systems, security gaps, and deployment requirements.",
    },
    {
        number: "03",
        title: "Plan",
        icon: Target,
        description:
            "We create a deployment plan covering equipment, configuration standards, network requirements, software, migration, testing, users, timelines, and support.",
    },
    {
        number: "04",
        title: "Prepare",
        icon: Settings2,
        description:
            "Devices, accounts, applications, network equipment, servers, cloud services, policies, and deployment packages are prepared before rollout.",
    },
    {
        number: "05",
        title: "Deploy",
        icon: Zap,
        description:
            "We install, configure, connect, migrate, secure, test, and commission the technology according to the approved deployment plan.",
    },
    {
        number: "06",
        title: "Validate",
        icon: CheckCircle2,
        description:
            "Every important component is tested against agreed requirements before users are handed the environment.",
    },
    {
        number: "07",
        title: "Train",
        icon: GraduationCap,
        description:
            "Users and designated administrators receive practical guidance so they understand how to use and manage the deployed environment.",
    },
    {
        number: "08",
        title: "Support",
        icon: Headphones,
        description:
            "After deployment, we remain available for troubleshooting, maintenance, monitoring, optimization, and future technology requirements.",
    },
];

const environments = [
    {
        icon: Laptop,
        title: "Employee Devices",
        text: "Laptops, desktops, monitors, docking stations, printers, scanners, and accessories.",
    },
    {
        icon: Server,
        title: "Servers",
        text: "Physical servers, virtual machines, file servers, application servers, and directory services.",
    },
    {
        icon: Network,
        title: "Networks",
        text: "Routers, switches, access points, firewalls, VLANs, internet connections, and structured networks.",
    },
    {
        icon: Cloud,
        title: "Cloud Services",
        text: "Cloud applications, storage, identity, backups, hosting, and infrastructure services.",
    },
    {
        icon: Smartphone,
        title: "Mobile Devices",
        text: "Business smartphones, tablets, mobile applications, user configuration, and security.",
    },
    {
        icon: Printer,
        title: "Office Equipment",
        text: "Printers, scanners, conference equipment, access systems, and connected office technology.",
    },
];

const supportCategories = [
    {
        icon: Wrench,
        title: "Hardware Support",
        items: [
            "Laptop and desktop troubleshooting",
            "Printer and scanner support",
            "Peripheral configuration",
            "Hardware diagnostics",
            "Device replacement coordination",
        ],
    },
    {
        icon: Code2,
        title: "Software Support",
        items: [
            "Application installation",
            "Software configuration",
            "Compatibility troubleshooting",
            "Updates and patches",
            "Business application support",
        ],
    },
    {
        icon: Wifi,
        title: "Network Support",
        items: [
            "Internet troubleshooting",
            "Wi-Fi issues",
            "Switch and router configuration",
            "Connectivity diagnostics",
            "Network performance reviews",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Security Support",
        items: [
            "Account security",
            "MFA assistance",
            "Endpoint security",
            "Access control",
            "Security configuration",
        ],
    },
    {
        icon: Database,
        title: "Data & Backup",
        items: [
            "Backup configuration",
            "Backup verification",
            "Data migration",
            "Storage troubleshooting",
            "Recovery planning",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud Support",
        items: [
            "Cloud account administration",
            "User access management",
            "Cloud application support",
            "Storage management",
            "Cloud configuration",
        ],
    },
];

const faqs = [
    {
        question: "Can you handle an entire IT deployment from scratch?",
        answer:
            "Yes. We can start from the planning stage and help with procurement, device preparation, networking, software configuration, security, user setup, testing, documentation, training, and ongoing support.",
    },
    {
        question: "Can you deploy computers for many employees at once?",
        answer:
            "Yes. We can structure bulk deployments so devices are configured consistently, assigned to users, documented, tested, and delivered according to an agreed rollout schedule.",
    },
    {
        question: "Do you support existing IT infrastructure?",
        answer:
            "Yes. We can work with an existing environment rather than requiring you to replace everything. We assess what you already have and recommend what should be retained, upgraded, replaced, or reconfigured.",
    },
    {
        question: "Can you provide onsite support?",
        answer:
            "Depending on location and project requirements, onsite deployment and support can be arranged alongside remote assistance.",
    },
    {
        question: "Can you migrate data from old computers to new computers?",
        answer:
            "Yes. Migration can include user files, selected application data, configurations, accounts, and other agreed information, subject to the source systems and application requirements.",
    },
    {
        question: "Can you help after the deployment is complete?",
        answer:
            "Absolutely. Deployment is only one part of the relationship. We can provide ongoing technical support, maintenance, monitoring, troubleshooting, security assistance, and IT administration.",
    },
    {
        question: "Can you support multiple office locations?",
        answer:
            "Yes. Multi-location projects can be planned centrally with standardized deployment procedures, documentation, asset tracking, remote support, and coordinated onsite activities where required.",
    },
    {
        question: "Do you provide documentation after deployment?",
        answer:
            "Yes. Depending on the project, documentation can include device inventories, network information, configuration records, user assignments, deployment reports, procedures, and support information.",
    },
];

function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
}) {
    return (
        <div
            className={`max-w-3xl ${align === "center" ? "mx-auto  text-center" : ""
                }`}
        >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {eyebrow}
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                {title}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                {description}
            </p>
        </div>
    );
}

function ServiceCard({ service, onSelect }) {
    const Icon = service.icon;

    return (
        <button
            type="button"
            onClick={() => onSelect(service)}
            className="group mt-25 relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70"
        >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition group-hover:bg-blue-500/10" />

            <div className="relative">
                <div className="flex items-start justify-between gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <Icon size={25} />
                    </div>

                    <ArrowUpRight className="text-slate-300 transition group-hover:text-blue-500 dark:text-slate-700" />
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-950 dark:text-white">
                    {service.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {service.description}
                </p>

                <div className="mt-6 space-y-3">
                    {service.items.map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                        >
                            <CheckCircle2
                                size={17}
                                className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                            />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </button>
    );
}

export default function ITDeploymentSupport() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(0);

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
                "I'd like to discuss IT deployment or support for my organization.",
            metadata: metadata || {
                Source: "IT Deployment & Support",
            },
        });

        navigate("/support/ai");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                    <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-indigo-500/10" />

                    <div
                        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(15,23,42,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.8) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:bg-white/5 dark:text-blue-400">
                                <Sparkles size={14} />
                                Complete IT Deployment & Support
                            </div>

                            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                                From an empty office to a{" "}
                                <span className="text-blue-600 dark:text-blue-400">
                                    fully working IT environment.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We help businesses plan, deploy, configure,
                                secure, migrate, test, document, and support
                                their technology environment — from a single
                                employee laptop to a complete organization-wide
                                IT rollout.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss IT deployment for my organization.",
                                            {
                                                Source:
                                                    "IT Deployment & Support",
                                                Intent: "Deployment",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    Start a Deployment Conversation
                                    <ArrowRight size={18} />
                                </button>

                                <a
                                    href="#support"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-900 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-500"
                                >
                                    Explore IT Support
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-5 sm:grid-cols-4">
                                {[
                                    ["01", "Plan"],
                                    ["02", "Deploy"],
                                    ["03", "Secure"],
                                    ["04", "Support"],
                                ].map(([number, label]) => (
                                    <button
                                        type="button"
                                        key={number}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the "${label}" phase of IT deployment.`,
                                                {
                                                    Source:
                                                        "IT Deployment & Support",
                                                    Phase: label,
                                                }
                                            )
                                        }
                                        className="text-left transition hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        <div className="text-2xl font-black text-slate-950 dark:text-white">
                                            {number}
                                        </div>
                                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            {label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-300/30 backdrop-blur dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">

                                    <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                                Deployment Console
                                            </div>
                                            <div className="mt-1 font-bold text-slate-900 dark:text-white">
                                                Acme Office Environment
                                            </div>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                                            <Check size={20} />
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        {[
                                            ["Devices", "48 / 48", "Complete"],
                                            ["Network", "Online", "Healthy"],
                                            ["Security", "Protected", "Active"],
                                            ["Backups", "Verified", "Healthy"],
                                        ].map(([name, value, status]) => (
                                            <div
                                                key={name}
                                                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                        {name}
                                                    </span>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {value}
                                                    </div>
                                                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                                                        {status}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white dark:bg-white dark:text-slate-950">
                                        <div className="flex items-center gap-3">
                                            <LifeBuoy size={19} />
                                            <span className="font-bold">
                                                Deployment support active
                                            </span>
                                        </div>

                                        <div className="mt-3 text-sm leading-6 opacity-70">
                                            Configuration, monitoring and
                                            technical assistance continue after
                                            deployment.
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

            <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-4">
                        {[
                            [ShieldCheck, "Security-minded", "Deployment with practical security controls."],
                            [ClipboardCheck, "Structured", "Documented and repeatable deployment processes."],
                            [Headphones, "Ongoing support", "We stay available after implementation."],
                            [RefreshCw, "Built to evolve", "Technology can grow with your organization."],
                        ].map(([Icon, title, text]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss: ${title} — ${text}`,
                                        {
                                            Source:
                                                "IT Deployment & Support",
                                            Topic: title,
                                        }
                                    )
                                }
                                className="flex gap-4 text-left transition hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white">
                                        {title}
                                    </div>
                                    <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRO
            ========================================================= */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <SectionHeading
                            eyebrow="Beyond installation"
                            title="Deployment is not just plugging in computers."
                            description="A successful technology deployment means the environment works together. Devices need the right software. Users need the right access. Networks need to be reliable. Security needs to be considered. Data needs protection. And your team needs to know how to use what has been deployed."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                [Cpu, "Hardware", "Devices configured and ready for work."],
                                [Code2, "Software", "Applications installed and configured."],
                                [Network, "Connectivity", "Reliable network and internet access."],
                                [ShieldCheck, "Security", "Accounts, devices and systems protected."],
                                [Database, "Data", "Migration, storage and backup considered."],
                                [Headphones, "Support", "Help remains available after rollout."],
                            ].map(([Icon, title, text]) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${title.toLowerCase()} as part of IT deployment. ${text}`,
                                            {
                                                Source:
                                                    "IT Deployment & Support",
                                                "Deployment area":
                                                    title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-500/40"
                                >
                                    <Icon className="text-blue-600 dark:text-blue-400" size={22} />
                                    <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                SERVICES
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-100 py-24 dark:bg-slate-900/60 lg:py-32">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="What we deploy"
                        title="A complete deployment capability."
                        description="Whether you need a few computers prepared or an entire technology environment deployed, we can structure the work around your organization, users, locations, applications, infrastructure and timeline."
                    />

                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {deploymentServices.map((service) => (
                            <ServiceCard
                                key={service.title}
                                service={service}
                                onSelect={(s) =>
                                    startSupportChat(
                                        `I'd like to discuss ${s.title.toLowerCase()}. ${s.description}`,
                                        {
                                            Source:
                                                "IT Deployment & Support",
                                            Service: s.title,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                ENVIRONMENTS
            ========================================================= */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Technology environment"
                        title="We can work across your entire IT environment."
                        description="Your business does not operate one technology system in isolation. We look at the relationship between people, devices, networks, applications, data, cloud services and security."
                    />

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {environments.map((environment) => {
                            const Icon = environment.icon;

                            return (
                                <button
                                    type="button"
                                    key={environment.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${environment.title.toLowerCase()}: ${environment.text}`,
                                            {
                                                Source:
                                                    "IT Deployment & Support",
                                                Environment:
                                                    environment.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-500/40"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white">
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                                        {environment.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {environment.text}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                                        Explore capability
                                        <ChevronRight size={16} className="transition group-hover:translate-x-1" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                FROM SCRATCH
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32">
                <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

                        <div>
                            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-300">
                                Starting from scratch
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                You don't need to already have an IT department.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                If you're opening a new office, launching a
                                company, expanding a branch, establishing a
                                school, setting up a professional workspace or
                                replacing an old environment, we can help you
                                build the technology foundation from the
                                beginning.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Understand your requirements",
                                    "Recommend the right technology",
                                    "Help source equipment and software",
                                    "Design the environment",
                                    "Deploy and configure everything",
                                    "Train your team",
                                    "Provide ongoing support",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                                            <Check size={14} />
                                        </div>
                                        <span className="text-slate-200">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'm starting from scratch with IT deployment. I'd like help building the technology foundation.",
                                        {
                                            Source:
                                                "IT Deployment & Support",
                                            "Starting point":
                                                "From scratch",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100"
                            >
                                Start from scratch
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    [BriefcaseBusiness, "New business setup"],
                                    [Building2, "Office deployment"],
                                    [GraduationCap, "School deployment"],
                                    [Globe2, "Branch expansion"],
                                    [Users, "Employee rollout"],
                                    [RefreshCw, "Technology refresh"],
                                ].map(([Icon, title]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${title.toLowerCase()} as part of an IT deployment.`,
                                                {
                                                    Source:
                                                        "IT Deployment & Support",
                                                    Scenario: title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-blue-400/30 hover:bg-white/[0.08]"
                                    >
                                        <Icon className="text-blue-400" size={22} />
                                        <div className="mt-4 font-bold">
                                            {title}
                                        </div>
                                        <div className="mt-2 text-sm leading-6 text-slate-400">
                                            Structured deployment designed
                                            around your operational needs.
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCESS
            ========================================================= */}

            <section
                id="deployment-process"
                className="relative scroll-mt-20 py-24 lg:py-32"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="How we work"
                        title="A deployment process designed to reduce surprises."
                        description="Good IT deployment starts before installation. We work through discovery, assessment, planning, preparation, deployment, validation, training and support so the project has a clear structure from beginning to end."
                    />

                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {deploymentProcess.map((step) => {
                            const Icon = step.icon;

                            return (
                                <button
                                    type="button"
                                    key={step.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the "${step.title}" phase of IT deployment.`,
                                            {
                                                Source:
                                                    "IT Deployment & Support",
                                                "Process step":
                                                    step.title,
                                            }
                                        )
                                    }
                                    className="relative rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-500/40"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-black tracking-widest text-blue-600 dark:text-blue-400">
                                            {step.number}
                                        </div>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                            <Icon size={21} />
                                        </div>
                                    </div>

                                    <h3 className="mt-7 text-xl font-bold text-slate-900 dark:text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {step.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPORT
            ========================================================= */}

            <section
                id="support"
                className="relative scroll-mt-20 overflow-hidden bg-slate-100 py-24 dark:bg-slate-900/60 lg:py-32"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="After deployment"
                        title="Technology support when your team needs it."
                        description="Technology problems can interrupt work. Our support services are designed to help diagnose issues, restore productivity, maintain systems, and keep your environment operating reliably."
                    />

                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {supportCategories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <div
                                    key={category.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-900"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                                        {category.title}
                                    </h3>

                                    <div className="mt-5 space-y-3">
                                        {category.items.map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like support with: ${item}`,
                                                        {
                                                            Source:
                                                                "IT Deployment & Support",
                                                            "Support topic":
                                                                item,
                                                        }
                                                    )
                                                }
                                                className="flex w-full gap-3 text-left text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
                                            >
                                                <Check
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                                                />
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPORT PLANS
            ========================================================= */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Support models"
                        title="Choose the level of support your organization needs."
                        description="Not every organization needs the same support arrangement. We can structure assistance around your environment, team size, technology complexity and operational requirements."
                        align="center"
                    />

                    <div className="mt-14 grid gap-6 lg:grid-cols-3">
                        {supportPlans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-[2rem] border p-8 ${plan.popular
                                    ? "border-blue-500 bg-blue-50 shadow-xl shadow-blue-500/10 dark:bg-blue-500/10"
                                    : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                                        Recommended
                                    </div>
                                )}

                                <div className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    Support
                                </div>

                                <h3 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
                                    {plan.name}
                                </h3>

                                <p className="mt-4 min-h-[72px] leading-7 text-slate-600 dark:text-slate-400">
                                    {plan.description}
                                </p>

                                <div className="my-7 h-px bg-slate-200 dark:bg-white/10" />

                                <div className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"
                                        >
                                            <CheckCircle2
                                                size={17}
                                                className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                                            />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the ${plan.name} support plan. ${plan.description}`,
                                            {
                                                Source:
                                                    "IT Deployment & Support",
                                                "Support plan":
                                                    plan.name,
                                            }
                                        )
                                    }
                                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${plan.popular
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "border border-slate-300 bg-white text-slate-900 hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        }`}
                                >
                                    Discuss this option
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                INCIDENT RESPONSE
            ========================================================= */}

            <section className="bg-slate-950 py-24 text-white lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-300">
                                <AlertTriangle size={14} />
                                When something goes wrong
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                Technical problems should not bring your business to a halt.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                When systems fail, users cannot connect, devices
                                stop working, applications break or network
                                problems appear, structured troubleshooting
                                helps identify the actual cause instead of
                                repeatedly treating symptoms.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "We're experiencing a technical issue and need support.",
                                        {
                                            Source:
                                                "IT Deployment & Support",
                                            Intent:
                                                "Incident response",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                            >
                                Get incident support
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                ["Identify", "Understand what is actually failing."],
                                ["Isolate", "Determine whether the problem is device, software, network, account or infrastructure related."],
                                ["Resolve", "Apply the appropriate fix or workaround."],
                                ["Validate", "Confirm the environment is functioning correctly."],
                                ["Document", "Record the issue and resolution for future reference."],
                                ["Prevent", "Where possible, identify improvements that reduce recurrence."],
                            ].map(([title, text], index) => (
                                <div
                                    key={title}
                                    className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-black text-blue-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div>
                                        <div className="font-bold">{title}</div>
                                        <div className="mt-1 text-sm leading-6 text-slate-400">
                                            {text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                BULK DEPLOYMENT
            ========================================================= */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-8 shadow-xl dark:border-white/10 dark:from-slate-900 dark:to-slate-950 sm:p-12 lg:p-16">

                        <div className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">

                            <div>
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                    <PackageCheck size={23} />
                                </div>

                                <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                    Rolling out technology to 10, 50, 100 or more users?
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Bulk deployments require consistency. We can
                                    establish configuration standards and apply
                                    them across devices so employees receive a
                                    predictable, documented technology setup.
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {[
                                        "Device preparation",
                                        "Standard configurations",
                                        "Asset tracking",
                                        "User assignment",
                                        "Software installation",
                                        "Security configuration",
                                        "Testing and QA",
                                        "Deployment reports",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            <CheckCircle2
                                                size={17}
                                                className="text-blue-600 dark:text-blue-400"
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "We're planning a bulk IT deployment to many users. I'd like to discuss it.",
                                            {
                                                Source:
                                                    "IT Deployment & Support",
                                                Intent:
                                                    "Bulk deployment",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                                >
                                    Discuss bulk deployment
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Example rollout
                                </div>

                                <div className="mt-6 space-y-4">
                                    {[
                                        ["48", "Employee devices"],
                                        ["6", "Network devices"],
                                        ["3", "Printers"],
                                        ["2", "Servers"],
                                        ["1", "Deployment plan"],
                                    ].map(([number, label]) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0 last:pb-0 dark:border-white/10"
                                        >
                                            <span className="text-slate-500 dark:text-slate-400">
                                                {label}
                                            </span>
                                            <span className="text-xl font-black text-slate-950 dark:text-white">
                                                {number}
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
                DOCUMENTATION
            ========================================================= */}

            <section className="bg-slate-100 py-24 dark:bg-slate-900/60 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <SectionHeading
                                eyebrow="Documentation"
                                title="Technology should not depend on one person's memory."
                                description="Proper documentation gives your organization a clearer understanding of what was deployed, how it is configured, who has access, what devices exist, and how important systems are supported."
                            />

                            <div className="mt-8 space-y-3">
                                {[
                                    "Device and asset inventory",
                                    "Deployment records",
                                    "Network information",
                                    "System configuration records",
                                    "User assignment records",
                                    "Support procedures",
                                    "Backup information",
                                    "Handover documentation",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <FileCheck2
                                            size={18}
                                            className="text-blue-600 dark:text-blue-400"
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-slate-950">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <FileCheck2 size={21} />
                                </div>

                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white">
                                        IT Deployment Record
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        Project documentation
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7 space-y-3">
                                {[
                                    ["Environment", "Production"],
                                    ["Devices", "48"],
                                    ["Network", "Configured"],
                                    ["Security", "Enabled"],
                                    ["Backups", "Verified"],
                                    ["Handover", "Completed"],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-white/[0.04]"
                                    >
                                        <span className="text-slate-500 dark:text-slate-400">
                                            {label}
                                        </span>

                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-400">
                                ✓ Deployment documentation available for
                                handover and future support.
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                TRAINING
            ========================================================= */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-blue-500/20 bg-blue-500/[0.04] p-8 sm:p-12 lg:p-16">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                            <div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                    <GraduationCap size={26} />
                                </div>

                                <h2 className="mt-7 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                    We don't just deploy technology. We help people use it.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    A technically successful deployment can
                                    still fail if users do not understand the
                                    systems they have been given. We can provide
                                    practical user and administrator training
                                    as part of your rollout.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss training for our IT deployment.",
                                            {
                                                Source:
                                                    "IT Deployment & Support",
                                                Intent: "Training",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                                >
                                    Discuss training
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    ["Employees", "Basic system and application usage."],
                                    ["Administrators", "Management and configuration guidance."],
                                    ["Managers", "Operational visibility and technology workflows."],
                                    ["New Users", "Onboarding assistance for new employees."],
                                ].map(([title, text]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${title.toLowerCase()} training for our IT deployment.`,
                                                {
                                                    Source:
                                                        "IT Deployment & Support",
                                                    "Training audience":
                                                        title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-500/40"
                                    >
                                        <Users
                                            size={20}
                                            className="text-blue-600 dark:text-blue-400"
                                        />

                                        <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
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
                WHY US
            ========================================================= */}

            <section className="bg-slate-950 py-24 text-white lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Why work with us"
                        title="One technology partner across the deployment lifecycle."
                        description="Instead of coordinating separate people for every part of an IT rollout, we can help connect procurement, infrastructure, software, security, deployment and support into one structured engagement."
                    />

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [PackageCheck, "Procurement", "Source the equipment and technology required for the project."],
                            [Settings2, "Implementation", "Configure and deploy the technology according to the plan."],
                            [ShieldCheck, "Protection", "Apply appropriate security and access controls."],
                            [Headphones, "Support", "Continue helping after the initial deployment."],
                        ].map(([Icon, title, text]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss ${title.toLowerCase()} as part of IT deployment. ${text}`,
                                        {
                                            Source:
                                                "IT Deployment & Support",
                                            "Lifecycle area": title,
                                        }
                                    )
                                }
                                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-left transition hover:border-blue-400/30 hover:bg-white/[0.08]"
                            >
                                <Icon size={23} className="text-blue-400" />

                                <h3 className="mt-6 text-lg font-bold">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Questions"
                        title="Frequently asked questions."
                        description="A few things organizations commonly want to know before starting an IT deployment or support engagement."
                        align="center"
                    />

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(open ? -1 : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={19}
                                            className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {open && (
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
                                                            Source:
                                                                "IT Deployment & Support",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:gap-3 dark:text-blue-400"
                                            >
                                                Discuss this with AB AI
                                                <ArrowRight size={14} />
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
            ========================================================= */}

            <section
                id="contact"
                className="relative scroll-mt-20 overflow-hidden py-24 lg:py-32"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.08] via-transparent to-cyan-500/[0.08] dark:from-blue-500/[0.08] dark:to-indigo-500/[0.08]" />

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                        <Headphones size={29} />
                    </div>

                    <h2 className="mt-7 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                        Need technology deployed, fixed or supported?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                        Tell us what you're trying to accomplish. Whether you
                        are starting from scratch, replacing an old environment,
                        expanding your organization or simply need reliable IT
                        support, we can help you determine the next step.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a deployment quote for my organization.",
                                    {
                                        Source:
                                            "IT Deployment & Support",
                                        Intent:
                                            "Deployment quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
                        >
                            Request a Deployment Quote
                            <ArrowRight size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to talk to someone about IT deployment or support.",
                                    {
                                        Source:
                                            "IT Deployment & Support",
                                        Intent: "Talk to team",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-900 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            Talk to Our Team
                            <PhoneCall size={18} />
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-blue-600" />
                            From-scratch setup
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-blue-600" />
                            Business deployment
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-blue-600" />
                            Bulk rollout
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-blue-600" />
                            Ongoing support
                        </span>
                    </div>
                </div>
            </section>

        </main>
    );
}