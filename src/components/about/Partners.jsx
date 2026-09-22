import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    Award,
    BadgeCheck,
    BrainCircuit,
    Building2,
    Check,
    ChevronDown,
    Cloud,
    Code2,
    Cpu,
    Database,
    Globe2,
    Handshake,
    Layers3,
    LockKeyhole,
    Network,
    PackageCheck,
    Puzzle,
    Server,
    ShieldCheck,
    Sparkles,
    Terminal,
    Workflow,
    Zap,
} from "lucide-react";

export default function PartnersTechnology() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss technology, procurement or partnership options.",
            metadata: {
                Source: "Partners & Technology",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };
    const [openFaq, setOpenFaq] = useState(null);

    const categories = [
        "All",
        "Cloud",
        "Software",
        "Infrastructure",
        "Security",
        "Data & AI",
        "Productivity",
    ];

    const technologyPartners = [
        {
            name: "Microsoft",
            category: "Productivity",
            description:
                "Business productivity, collaboration, identity, cloud and enterprise technology ecosystems.",
            icon: "M",
            tag: "Productivity & Cloud",
        },
        {
            name: "Google Cloud",
            category: "Cloud",
            description:
                "Cloud infrastructure, analytics, AI services, application platforms and modern data capabilities.",
            icon: "G",
            tag: "Cloud & AI",
        },
        {
            name: "AWS",
            category: "Cloud",
            description:
                "Scalable cloud infrastructure, application hosting, storage, databases and managed services.",
            icon: "A",
            tag: "Cloud Infrastructure",
        },
        {
            name: "Cisco",
            category: "Infrastructure",
            description:
                "Enterprise networking, connectivity, collaboration and infrastructure technologies.",
            icon: "C",
            tag: "Networking",
        },
        {
            name: "Dell",
            category: "Infrastructure",
            description:
                "Business computers, workstations, servers, storage and enterprise hardware infrastructure.",
            icon: "D",
            tag: "Hardware & Infrastructure",
        },
        {
            name: "HP",
            category: "Infrastructure",
            description:
                "Business computing devices, printing, endpoint hardware and workplace technology.",
            icon: "H",
            tag: "Computing",
        },
        {
            name: "Lenovo",
            category: "Infrastructure",
            description:
                "Enterprise laptops, desktops, workstations, servers and business computing solutions.",
            icon: "L",
            tag: "Business Computing",
        },
        {
            name: "Fortinet",
            category: "Security",
            description:
                "Network security, firewall, secure access and cybersecurity infrastructure technologies.",
            icon: "F",
            tag: "Cybersecurity",
        },
        {
            name: "VMware",
            category: "Infrastructure",
            description:
                "Virtualization, private cloud and modern infrastructure management technologies.",
            icon: "V",
            tag: "Virtualization",
        },
        {
            name: "Oracle",
            category: "Software",
            description:
                "Enterprise databases, applications, cloud infrastructure and business technology.",
            icon: "O",
            tag: "Enterprise Software",
        },
        {
            name: "Adobe",
            category: "Productivity",
            description:
                "Creative, document, digital experience and content productivity solutions.",
            icon: "A",
            tag: "Digital Productivity",
        },
        {
            name: "GitHub",
            category: "Software",
            description:
                "Software development, source control, collaboration and DevOps workflows.",
            icon: "GH",
            tag: "Developer Platform",
        },
    ];

    const technologyStack = [
        {
            title: "Cloud Infrastructure",
            description:
                "Design, deploy and manage scalable cloud environments for applications, data and business operations.",
            icon: Cloud,
            items: [
                "Cloud migration",
                "Cloud hosting",
                "Virtual machines",
                "Cloud storage",
                "Backup infrastructure",
                "Disaster recovery",
            ],
        },
        {
            title: "Enterprise Networking",
            description:
                "Connected infrastructure designed for reliable communication between people, devices, applications and locations.",
            icon: Network,
            items: [
                "LAN & WAN",
                "Wi-Fi infrastructure",
                "Network architecture",
                "Routing & switching",
                "VPN connectivity",
                "Network monitoring",
            ],
        },
        {
            title: "Cybersecurity",
            description:
                "Security technologies and operational controls that help protect systems, users, networks and information.",
            icon: ShieldCheck,
            items: [
                "Endpoint protection",
                "Firewalls",
                "Access control",
                "Identity management",
                "Security monitoring",
                "Security assessment",
            ],
        },
        {
            title: "Business Software",
            description:
                "Software platforms that support business operations, productivity, collaboration and customer engagement.",
            icon: Code2,
            items: [
                "Business applications",
                "ERP solutions",
                "CRM platforms",
                "Workflow systems",
                "Custom software",
                "Internal portals",
            ],
        },
        {
            title: "Data & Analytics",
            description:
                "Technology foundations for turning operational information into useful insights and better decisions.",
            icon: Database,
            items: [
                "Data platforms",
                "Business intelligence",
                "Reporting systems",
                "Data integration",
                "Dashboards",
                "Analytics automation",
            ],
        },
        {
            title: "AI & Automation",
            description:
                "Practical artificial intelligence and automation capabilities integrated into real business workflows.",
            icon: BrainCircuit,
            items: [
                "AI assistants",
                "Document automation",
                "Intelligent workflows",
                "Process automation",
                "AI-powered search",
                "Decision support",
            ],
        },
    ];

    const partnershipModels = [
        {
            title: "Technology Partnerships",
            description:
                "We work with technology ecosystems and vendors to source, deploy and integrate appropriate solutions.",
            icon: Handshake,
            points: [
                "Vendor-aligned procurement",
                "Technology evaluation",
                "Solution architecture",
                "Deployment support",
            ],
        },
        {
            title: "Solution Partnerships",
            description:
                "We combine technologies from different providers to create complete solutions around a customer's business requirements.",
            icon: Puzzle,
            points: [
                "Multi-vendor solutions",
                "System integration",
                "Custom implementation",
                "Ongoing support",
            ],
        },
        {
            title: "Delivery Partnerships",
            description:
                "For larger projects, we can coordinate specialist capabilities across infrastructure, software, security and implementation.",
            icon: Workflow,
            points: [
                "Project coordination",
                "Specialist delivery",
                "Implementation management",
                "Operational handover",
            ],
        },
    ];

    const standards = [
        {
            title: "Fit Before Brand",
            description:
                "We start with the customer's requirement instead of forcing a particular vendor or product into the solution.",
            icon: BadgeCheck,
        },
        {
            title: "Interoperability",
            description:
                "We consider how technologies work together, especially where multiple platforms need to exchange information.",
            icon: Layers3,
        },
        {
            title: "Security by Design",
            description:
                "Security considerations are incorporated into architecture, access, infrastructure and deployment decisions.",
            icon: LockKeyhole,
        },
        {
            title: "Lifecycle Thinking",
            description:
                "We consider procurement, deployment, maintenance, support, upgrades and eventual replacement.",
            icon: PackageCheck,
        },
        {
            title: "Business Practicality",
            description:
                "Technology should solve a real operational problem, improve efficiency or create measurable business value.",
            icon: Building2,
        },
        {
            title: "Scalable Architecture",
            description:
                "Where appropriate, we design solutions that can grow as users, locations, workloads and requirements increase.",
            icon: Zap,
        },
    ];

    const filteredPartners =
        activeCategory === "All"
            ? technologyPartners
            : technologyPartners.filter(
                (partner) => partner.category === activeCategory
            );

    const faqs = [
        {
            question: "Do you only work with the technology brands displayed on this page?",
            answer:
                "No. The technologies shown here represent examples of ecosystems and product categories that can form part of our solutions. We can evaluate other vendors and products when they are better suited to a customer's technical, operational or commercial requirements.",
        },
        {
            question: "Can AB Technologies source products from other vendors?",
            answer:
                "Yes. Our procurement and sourcing capabilities are designed to support a wide range of technology requirements. We can evaluate specifications, compare available options, coordinate sourcing and support delivery according to the agreed project requirements.",
        },
        {
            question: "Do you provide implementation after procurement?",
            answer:
                "Yes. Procurement can be combined with deployment, configuration, integration, training, documentation and ongoing support depending on the project.",
        },
        {
            question: "Can you combine technologies from different vendors?",
            answer:
                "Yes. In many business environments, the best solution is not a single-vendor environment. We can design and implement multi-vendor solutions where interoperability, security and operational requirements are properly considered.",
        },
        {
            question: "Can you help us choose the right technology?",
            answer:
                "Yes. Technology selection can begin with a requirements assessment. We can help translate business needs into technical specifications, compare alternatives and recommend an appropriate solution.",
        },
        {
            question: "Do you offer custom software alongside third-party technologies?",
            answer:
                "Yes. We can combine commercial platforms, open-source technologies, cloud services and custom-built applications where appropriate.",
        },
    ];

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.13),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.10),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.08),transparent_35%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.20),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.13),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.12),transparent_35%)]" />

                <div className="absolute left-[-8rem] top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                <div className="absolute right-[-8rem] top-40 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />

                <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">

                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

                        <div>

                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <Handshake className="h-4 w-4" />
                                Partners & Technology
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
                                Technology that{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300">
                                    works together.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:text-xl">
                                We bring together trusted technology ecosystems,
                                hardware, software, cloud platforms, security
                                technologies and specialist capabilities to
                                build practical solutions around the way your
                                organization actually operates.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#technology"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Explore our technology
                                    <ArrowRight className="h-4 w-4" />
                                </a>

                                <a
                                    href="#partnership"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                                >
                                    How we partner
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">

                                {[
                                    ["Multi-vendor", "Approach"],
                                    ["Cloud", "Ready"],
                                    ["Secure", "By design"],
                                    ["Scalable", "Architecture"],
                                ].map(([value, label]) => (
                                    <div
                                        key={value}
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <div className="text-sm font-black text-slate-950 dark:text-white">
                                            {value}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            {label}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* Technology visual */}
                        <div className="relative">

                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30 sm:p-7">

                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                            Technology ecosystem
                                        </p>
                                        <h2 className="mt-2 text-lg font-black">
                                            Connected capabilities
                                        </h2>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                        <Cpu className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">

                                    {[
                                        {
                                            icon: Cloud,
                                            name: "Cloud",
                                        },
                                        {
                                            icon: Network,
                                            name: "Network",
                                        },
                                        {
                                            icon: ShieldCheck,
                                            name: "Security",
                                        },
                                        {
                                            icon: Code2,
                                            name: "Software",
                                        },
                                        {
                                            icon: BrainCircuit,
                                            name: "AI",
                                        },
                                        {
                                            icon: Database,
                                            name: "Data",
                                        },
                                        {
                                            icon: Server,
                                            name: "Servers",
                                        },
                                        {
                                            icon: Terminal,
                                            name: "DevOps",
                                        },
                                        {
                                            icon: Workflow,
                                            name: "Automation",
                                        },
                                    ].map(({ icon: Icon, name }) => (
                                        <div
                                            key={name}
                                            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30 dark:hover:bg-blue-500/[0.07]"
                                        >
                                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white dark:bg-white/10 dark:text-slate-200 dark:group-hover:bg-blue-500">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <p className="mt-3 text-xs font-bold text-slate-700 dark:text-slate-200">
                                                {name}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-400/10 dark:bg-blue-500/[0.07]">
                                    <div className="flex gap-3">
                                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                One solution layer
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                Hardware, software, cloud,
                                                networking, security and
                                                support can be coordinated
                                                around one operational goal.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRODUCTION
            ========================================================= */}

            <section className="relative border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Our approach
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                The right technology is more than a brand.
                            </h2>
                        </div>

                        <div className="space-y-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                Organizations rarely operate on one technology
                                platform. A typical environment may contain
                                computers, networks, cloud services, business
                                applications, security systems, communication
                                tools, databases and custom software.
                            </p>

                            <p>
                                Our role is to help bring these pieces together
                                into an environment that is understandable,
                                manageable and aligned with business
                                requirements.
                            </p>

                            <p>
                                We do not believe every customer needs the most
                                expensive technology available. We believe
                                customers need technology that is appropriate
                                for their users, workloads, budget, security
                                requirements and long-term plans.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                TECHNOLOGY CATEGORIES
            ========================================================= */}

            <section
                id="technology"
                className="relative overflow-hidden bg-slate-100 py-20 dark:bg-slate-950 lg:py-28"
            >

                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Technology capabilities
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            A technology ecosystem built around your needs.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            From infrastructure and cloud to software,
                            cybersecurity, data and artificial intelligence,
                            our capabilities span the technology layers
                            organizations depend on every day.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {technologyStack.map(
                            ({ title, description, icon: Icon, items }) => (
                                <article
                                    key={title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30 dark:hover:bg-white/[0.055]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-400" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {items.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                                            >
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                    <Check className="h-3 w-3" />
                                                </span>

                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss ${title} for our organization.`,
                                                {
                                                    Intent: "Technology capability enquiry",
                                                    Capability: title,
                                                }
                                            )
                                        }
                                        className="mt-7 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Discuss this capability
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </article>
                            )
                        )}

                    </div>
                </div>
            </section>

            {/* =========================================================
                PARTNER ECOSYSTEM
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

                        <div className="max-w-3xl">
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Technology ecosystem
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Built across leading technology categories.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                We can work across different technology
                                ecosystems rather than treating one platform
                                as the answer to every problem.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/[0.04]">
                            <div className="flex flex-wrap gap-1">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() =>
                                            setActiveCategory(category)
                                        }
                                        className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${activeCategory === category
                                            ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
                                            : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredPartners.map((partner) => (
                            <article
                                key={partner.name}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/30 dark:hover:bg-white/[0.05]"
                            >
                                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

                                <div className="relative flex items-start justify-between gap-4">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-900 shadow-sm dark:bg-white/10 dark:text-white">
                                        {partner.icon}
                                    </div>

                                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                                        {partner.category}
                                    </span>

                                </div>

                                <div className="relative mt-6">
                                    <h3 className="text-xl font-black">
                                        {partner.name}
                                    </h3>

                                    <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                        {partner.tag}
                                    </p>

                                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {partner.description}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss solutions involving ${partner.name}.`,
                                            {
                                                Intent: "Technology ecosystem enquiry",
                                                Partner: partner.name,
                                                Category: partner.category,
                                            }
                                        )
                                    }
                                    className="relative mt-6 flex w-full items-center justify-between border-t border-slate-200 pt-5 text-left dark:border-white/10"
                                >
                                    <span className="text-xs font-semibold text-slate-400">
                                        Discuss this ecosystem
                                    </span>

                                    <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-blue-500" />
                                </button>
                            </article>
                        ))}

                    </div>
                </div>
            </section>

            {/* =========================================================
                WHY MULTI-VENDOR
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(37,99,235,0.22),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(6,182,212,0.14),transparent_28%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                                Why it matters
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                One organization.
                                <br />
                                Multiple technologies.
                                <br />
                                One coordinated approach.
                            </h2>

                            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                                Modern organizations need flexibility. Your
                                cloud platform, endpoint devices, networking,
                                business applications and security controls
                                should work together even when they come from
                                different technology providers.
                            </p>

                            <a
                                href="#partnership"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                            >
                                Explore partnership models
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    icon: Globe2,
                                    title: "Vendor flexibility",
                                    text: "Evaluate different options instead of being restricted to one technology ecosystem.",
                                },
                                {
                                    icon: Layers3,
                                    title: "Integration",
                                    text: "Consider how systems communicate and operate together before implementation.",
                                },
                                {
                                    icon: Award,
                                    title: "Quality focus",
                                    text: "Choose technologies according to requirements, quality and practical business value.",
                                },
                                {
                                    icon: Sparkles,
                                    title: "Future readiness",
                                    text: "Build technology environments that can adapt as business needs change.",
                                },
                            ].map(({ icon: Icon, title, text }) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur transition hover:bg-white/[0.07]"
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
                PARTNERSHIP MODELS
            ========================================================= */}

            <section
                id="partnership"
                className="bg-slate-50 py-20 dark:bg-slate-950 lg:py-28"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            How we partner
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Partnership designed around delivery.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Our partnerships are not simply about putting logos
                            on a page. They exist to help customers access,
                            evaluate, deploy and manage useful technology.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">

                        {partnershipModels.map(
                            ({ title, description, icon: Icon, points }) => (
                                <article
                                    key={title}
                                    className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-7 text-xl font-black">
                                        {title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>

                                    <div className="mt-7 space-y-3">
                                        {points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                                {point}
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            )
                        )}

                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT + TECHNOLOGY
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div className="relative">

                            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-500/5 blur-2xl dark:bg-blue-500/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035]">

                                <div className="flex items-center gap-4 border-b border-slate-200 pb-6 dark:border-white/10">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <PackageCheck className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Technology lifecycle
                                        </p>

                                        <h3 className="mt-1 font-black">
                                            From requirement to operation
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-7 space-y-4">

                                    {[
                                        "Understand the requirement",
                                        "Define technical specifications",
                                        "Evaluate technology options",
                                        "Source and procure",
                                        "Deploy and configure",
                                        "Integrate with existing systems",
                                        "Train users and administrators",
                                        "Support and maintain",
                                    ].map((step, index) => (
                                        <div
                                            key={step}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-xs font-black text-blue-600 dark:border-blue-400/20 dark:bg-slate-900 dark:text-blue-400">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </div>

                                            <div className="h-px w-5 bg-slate-200 dark:bg-white/10" />

                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {step}
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Beyond procurement
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Technology should not stop at delivery.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Buying a device, license or infrastructure
                                component is only one stage of the technology
                                lifecycle. The real value comes when the
                                solution is properly deployed, integrated,
                                secured and supported.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "Requirements and technical specification",
                                    "Vendor and product evaluation",
                                    "Competitive sourcing",
                                    "Deployment and configuration",
                                    "Integration with existing systems",
                                    "Documentation and knowledge transfer",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>

                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </p>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like help sourcing, evaluating and implementing technology for our organization.",
                                            {
                                                Intent: "Technology procurement",
                                                Category: "Technology procurement",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                                >
                                    Discuss procurement
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                PRINCIPLES
            ========================================================= */}

            <section className="bg-slate-100 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Our technology principles
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            How we think about technology.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            The technology decisions we make should support the
                            organization behind them.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {standards.map(({ title, description, icon: Icon }) => (
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
                                    {description}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* =========================================================
                USE CASES
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                What this means for you
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Technology designed around real environments.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Whether you are establishing a new office,
                                upgrading infrastructure, modernizing
                                applications or building a digital platform,
                                we can help connect the technology decisions
                                to the operational requirement.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    title: "New offices",
                                    text: "Equip and connect a new workplace with computing, networking, communications, security and software.",
                                },
                                {
                                    title: "Business expansion",
                                    text: "Extend infrastructure and technology capabilities as users, teams or locations grow.",
                                },
                                {
                                    title: "Digital modernization",
                                    text: "Replace fragmented manual processes with better software, cloud and automation.",
                                },
                                {
                                    title: "Infrastructure refresh",
                                    text: "Upgrade aging hardware, network equipment, servers and endpoint environments.",
                                },
                                {
                                    title: "Cloud adoption",
                                    text: "Move appropriate workloads and services toward flexible cloud infrastructure.",
                                },
                                {
                                    title: "Security improvement",
                                    text: "Strengthen endpoint, network, identity and operational security controls.",
                                },
                                {
                                    title: "Application development",
                                    text: "Build custom applications when existing products do not adequately solve the problem.",
                                },
                                {
                                    title: "Managed technology",
                                    text: "Continue with monitoring, maintenance and support after deployment.",
                                },
                            ].map(({ title, text }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />

                                        <h3 className="font-black">
                                            {title}
                                        </h3>
                                    </div>

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
                OPEN TECHNOLOGY PHILOSOPHY
            ========================================================= */}

            <section className="relative overflow-hidden bg-blue-600 py-20 text-white lg:py-28">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(15,23,42,0.20),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-100">
                                An open approach
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                We recommend technology for the requirement,
                                not the other way around.
                            </h2>
                        </div>

                        <div className="space-y-5 text-base leading-8 text-blue-50">

                            <p>
                                A technology environment should reflect the
                                organization's actual needs, not simply the
                                popularity of a particular product.
                            </p>

                            <p>
                                That means considering budget, performance,
                                compatibility, security, scalability,
                                availability, user experience and long-term
                                support before making important decisions.
                            </p>

                            <p>
                                Where an existing platform already works well,
                                we look for ways to improve it. Where a new
                                solution is justified, we help determine the
                                right path to implementation.
                            </p>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section className="bg-slate-50 py-20 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Questions about our technology ecosystem.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">

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
                                            setOpenFaq(
                                                isOpen ? null : index
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                    >
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
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
                CTA
            ========================================================= */}

            <section className="bg-white py-20 dark:bg-slate-900 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-12 text-white shadow-2xl dark:bg-black sm:px-10 lg:px-16 lg:py-16">

                        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

                        <div className="absolute bottom-[-10rem] left-[-5rem] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

                            <div className="max-w-3xl">

                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-200">
                                    <Handshake className="h-4 w-4" />
                                    Let's build the right ecosystem
                                </div>

                                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                                    Have a technology requirement?
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    Tell us what you are trying to achieve. We
                                    can help you think through the technology,
                                    procurement, implementation and support
                                    required to get there.
                                </p>

                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I have a technology requirement and would like help defining the right solution.",
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
                FINAL TRUST STRIP
            ========================================================= */}

            <section className="border-t border-slate-200 bg-slate-50 py-12 dark:border-white/10 dark:bg-slate-950">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left">

                        <div className="flex flex-col items-center gap-3 sm:flex-row">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    Security conscious
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Security considered throughout the lifecycle.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 sm:flex-row">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                <Layers3 className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    Multi-technology
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Solutions can span multiple platforms.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 sm:flex-row">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                <Workflow className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    End-to-end thinking
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    From planning through operation and support.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}