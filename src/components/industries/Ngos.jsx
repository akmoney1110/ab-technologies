import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Globe2,
    HeartHandshake,
    ShieldCheck,
    Building2,
    Users,
    Laptop,
    Network,
    Cloud,
    Package,
    Truck,
    FileCheck2,
    ClipboardCheck,
    BarChart3,
    Database,
    Settings2,
    Workflow,
    Bot,
    LockKeyhole,
    Headphones,
    GraduationCap,
    MapPin,
    Target,
    BriefcaseBusiness,
    Layers3,
    Boxes,
    MonitorSmartphone,
    Server,
    Mail,
    Phone,
    CalendarDays,
    Search,
    Sparkles,
    Landmark,
    HandCoins,
    Scale,
    BadgeCheck,
    Activity,
    PieChart,
    LineChart,
    Megaphone,
    BookOpen,
    FileText,
    ShoppingCart,
    CircleDollarSign,
    RefreshCcw,
    Wrench,
    HardDrive,
    Wifi,
    Cpu,
    KeyRound,
    Eye,
    FileSpreadsheet,
    Send,
    MessageSquare,
    HelpCircle,
    Plus,
    Minus,
    Check,
    X,
} from "lucide-react";

export default function NGOsDevelopmentOrganizations() {
    const navigate = useNavigate();
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeService, setActiveService] = useState("procurement");
    const [showQuotePanel, setShowQuotePanel] = useState(false);

    /* =========================================================
       SUPPORT HANDOFF
       ---------------------------------------------------------
       Queue the NGO/development-project context and continue
       the conversation on the AI support page.
    ========================================================= */
    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss technology, procurement or digital support for our organization.",
            metadata: {
                Source: "NGOs & Development Organizations",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    const services = [
        {
            id: "procurement",
            title: "Project & Program Procurement",
            icon: ShoppingCart,
            description:
                "Structured procurement support for NGO programs, grants, field projects, offices, training centers, humanitarian operations, and development initiatives.",
        },
        {
            id: "technology",
            title: "Technology & Digital Infrastructure",
            icon: Laptop,
            description:
                "Technology infrastructure designed around program teams, headquarters, regional offices, field locations, and distributed teams.",
        },
        {
            id: "software",
            title: "Software & Business Systems",
            icon: Layers3,
            description:
                "Custom software, internal platforms, dashboards, portals, databases, workflow systems, and operational applications.",
        },
        {
            id: "cloud",
            title: "Cloud & Digital Operations",
            icon: Cloud,
            description:
                "Cloud hosting, backups, collaboration environments, digital infrastructure, monitoring, and managed IT services.",
        },
        {
            id: "security",
            title: "Security & Data Protection",
            icon: ShieldCheck,
            description:
                "Security-conscious infrastructure and access controls designed to protect organizational systems and sensitive information.",
        },
        {
            id: "deployment",
            title: "Deployment & Field Support",
            icon: Wrench,
            description:
                "End-to-end implementation, installation, configuration, deployment, training, maintenance, and support.",
        },
    ];

    const procurementCategories = [
        {
            icon: Laptop,
            title: "Computers & Endpoints",
            items: [
                "Business laptops",
                "Desktop computers",
                "Workstations",
                "Monitors",
                "Docking stations",
                "Keyboards and mice",
                "Webcams",
                "Headsets",
                "Printers",
                "Scanners",
            ],
        },
        {
            icon: Network,
            title: "Networking",
            items: [
                "Routers",
                "Switches",
                "Wireless access points",
                "Network cabinets",
                "Structured cabling",
                "Firewalls",
                "Network accessories",
                "Internet connectivity equipment",
                "Network testing equipment",
                "Connectivity expansion",
            ],
        },
        {
            icon: Server,
            title: "Servers & Infrastructure",
            items: [
                "Rack servers",
                "Tower servers",
                "NAS systems",
                "Storage",
                "UPS systems",
                "Power protection",
                "Server racks",
                "Backup systems",
                "Virtualization infrastructure",
                "Infrastructure accessories",
            ],
        },
        {
            icon: MonitorSmartphone,
            title: "Program & Field Devices",
            items: [
                "Tablets",
                "Mobile devices",
                "GPS devices",
                "Field data collection devices",
                "Portable printers",
                "Power banks",
                "Projectors",
                "Digital cameras",
                "Scanning devices",
                "Communication devices",
            ],
        },
        {
            icon: Package,
            title: "Office & Program Equipment",
            items: [
                "Office electronics",
                "Conference equipment",
                "Training equipment",
                "Presentation equipment",
                "Printing supplies",
                "Digital signage",
                "Meeting-room technology",
                "Power accessories",
                "Storage equipment",
                "General technology supplies",
            ],
        },
        {
            icon: ShieldCheck,
            title: "Security Equipment",
            items: [
                "CCTV systems",
                "Access control",
                "Biometric systems",
                "Security networking",
                "Alarm systems",
                "Monitoring equipment",
                "Secure storage",
                "Device protection",
                "Physical security technology",
                "Security accessories",
            ],
        },
    ];

    const programSolutions = [
        {
            icon: Users,
            title: "Program Management",
            description:
                "Technology and systems that help teams coordinate beneficiaries, activities, projects, staff, locations, deliverables, and operational workflows.",
        },
        {
            icon: Database,
            title: "Beneficiary & Case Data",
            description:
                "Structured databases and digital systems for managing program information, records, forms, activities, and controlled access.",
        },
        {
            icon: BarChart3,
            title: "Monitoring & Evaluation",
            description:
                "Dashboards, reporting tools, data workflows, and visualization systems that help teams monitor program performance.",
        },
        {
            icon: FileSpreadsheet,
            title: "Reporting Systems",
            description:
                "Digital reporting workflows that can reduce repetitive manual work and make operational information easier to consolidate.",
        },
        {
            icon: MapPin,
            title: "Field Operations",
            description:
                "Technology planning for teams operating across multiple locations, remote communities, regional offices, and field environments.",
        },
        {
            icon: Globe2,
            title: "Multi-Location Operations",
            description:
                "Technology infrastructure designed for organizations with headquarters, branches, field offices, partner offices, and distributed teams.",
        },
        {
            icon: GraduationCap,
            title: "Training Programs",
            description:
                "Training-room technology, learning platforms, devices, connectivity, presentation equipment, and digital learning infrastructure.",
        },
        {
            icon: HeartHandshake,
            title: "Community Programs",
            description:
                "Technology and digital tools supporting community engagement, outreach, registration, information collection, and program delivery.",
        },
        {
            icon: Megaphone,
            title: "Communications",
            description:
                "Business communication systems that help teams coordinate internally and communicate effectively with partners and stakeholders.",
        },
    ];

    const workflow = [
        {
            number: "01",
            title: "Understand the Program",
            description:
                "We begin by understanding your organization, project objectives, funding structure, locations, beneficiaries, timelines, and operational requirements.",
        },
        {
            number: "02",
            title: "Define Requirements",
            description:
                "We turn broad requirements into a structured procurement, technology, software, infrastructure, or implementation specification.",
        },
        {
            number: "03",
            title: "Source & Compare",
            description:
                "We identify suitable products, vendors, technology options, and implementation approaches and compare them against your requirements.",
        },
        {
            number: "04",
            title: "Quote & Review",
            description:
                "You receive clear options, specifications, pricing information, quantities, and relevant considerations for internal review and approval.",
        },
        {
            number: "05",
            title: "Procure & Coordinate",
            description:
                "Once approved, we coordinate procurement and the necessary logistics while keeping the project requirements in focus.",
        },
        {
            number: "06",
            title: "Deploy",
            description:
                "Where required, we install, configure, deploy, test, and prepare the technology for operational use.",
        },
        {
            number: "07",
            title: "Train",
            description:
                "Users and responsible teams can receive practical orientation and training for the systems and equipment deployed.",
        },
        {
            number: "08",
            title: "Support",
            description:
                "We remain available for troubleshooting, maintenance, improvements, technology expansion, and ongoing support.",
        },
    ];

    const organizationTypes = [
        "Non-governmental organizations",
        "International NGOs",
        "Local NGOs",
        "Community-based organizations",
        "Development organizations",
        "Humanitarian organizations",
        "Foundations",
        "Charities",
        "Social enterprises",
        "Research organizations",
        "Advocacy organizations",
        "Faith-based organizations",
        "Grant-funded programs",
        "Donor-funded projects",
        "Public-private development initiatives",
    ];

    const projectTypes = [
        {
            icon: HeartHandshake,
            title: "Humanitarian Response",
            description:
                "Technology, equipment, connectivity, communications, and operational support for humanitarian and emergency-response programs.",
        },
        {
            icon: GraduationCap,
            title: "Education Programs",
            description:
                "Devices, networks, digital learning systems, training infrastructure, software, and technology deployment for education initiatives.",
        },
        {
            icon: Activity,
            title: "Health Programs",
            description:
                "Technology infrastructure, data systems, devices, connectivity, and digital workflows supporting health-focused programs.",
        },
        {
            icon: Globe2,
            title: "Community Development",
            description:
                "Digital tools and technology infrastructure supporting community outreach, registration, field activities, and development initiatives.",
        },
        {
            icon: Scale,
            title: "Governance & Advocacy",
            description:
                "Digital systems, communications infrastructure, data platforms, and technology support for governance and advocacy organizations.",
        },
        {
            icon: BookOpen,
            title: "Research & Knowledge",
            description:
                "Technology and software solutions for research teams, knowledge management, data collection, reporting, and collaboration.",
        },
    ];

    const differentiators = [
        {
            icon: Target,
            title: "Requirement-First",
            description:
                "We start with what your program actually needs rather than pushing a product simply because it is available.",
        },
        {
            icon: FileCheck2,
            title: "Clear Documentation",
            description:
                "Specifications, quantities, options, implementation requirements, and project information can be organized clearly for review.",
        },
        {
            icon: Search,
            title: "Vendor & Product Research",
            description:
                "We can help research appropriate vendors, products, configurations, and alternatives based on your project requirements.",
        },
        {
            icon: Boxes,
            title: "End-to-End Thinking",
            description:
                "We consider procurement, delivery, installation, configuration, training, support, and future expansion together.",
        },
        {
            icon: RefreshCcw,
            title: "Scalable Approach",
            description:
                "Solutions can be designed to start small and expand as projects, teams, funding, locations, and operational requirements grow.",
        },
        {
            icon: Headphones,
            title: "After-Delivery Support",
            description:
                "Our relationship does not have to end when the equipment arrives. We can support implementation and ongoing operations.",
        },
    ];

    const faqs = [
        {
            question: "Can you help an NGO from the beginning if we only have a project idea?",
            answer:
                "Yes. We can help translate an early project requirement into a practical technology, procurement, software, infrastructure, or implementation plan. You do not need to have every technical detail figured out before approaching us.",
        },
        {
            question: "Do you only sell hardware?",
            answer:
                "No. Hardware is only one part of what we can provide. Our capabilities span procurement, vendor sourcing, software development, cloud infrastructure, networking, security, deployment, automation, digital transformation, managed IT, and technical support.",
        },
        {
            question: "Can you support donor-funded procurement projects?",
            answer:
                "We can structure procurement information around clear specifications, quantities, comparisons, quotations, documentation, and delivery requirements. Your organization's own procurement, donor, compliance, and approval policies should remain the governing requirements.",
        },
        {
            question: "Can you supply equipment for multiple locations?",
            answer:
                "Yes. Multi-location projects can be planned as a coordinated deployment, including quantities, device standards, networking requirements, delivery coordination, installation, and support considerations.",
        },
        {
            question: "Can you build custom software for an NGO?",
            answer:
                "Yes. Custom systems can be designed for program management, beneficiary records, reporting, inventory, procurement, staff operations, dashboards, workflows, communication, document management, and other organization-specific requirements.",
        },
        {
            question: "Can you help with existing systems instead of replacing everything?",
            answer:
                "Yes. We can assess an existing environment and identify what should be retained, improved, integrated, replaced, or managed differently. Modernization does not always require starting over.",
        },
        {
            question: "Do you provide field deployment support?",
            answer:
                "Where the project scope and location are suitable, deployment can include installation, configuration, testing, user setup, training, documentation, and post-deployment support.",
        },
        {
            question: "Can you work with small NGOs?",
            answer:
                "Yes. The approach can be scaled to the size and maturity of the organization. A smaller organization may need a focused package while a larger NGO may require multi-location infrastructure, procurement, software, and managed support.",
        },
        {
            question: "Can you help us choose between different products?",
            answer:
                "Yes. We can compare options based on specifications, intended use, compatibility, lifecycle considerations, deployment requirements, and budget rather than focusing only on the initial purchase price.",
        },
        {
            question: "Can you provide ongoing IT support after implementation?",
            answer:
                "Yes. Depending on the engagement, support can cover troubleshooting, maintenance, monitoring, updates, infrastructure assistance, user support, system improvements, and technology planning.",
        },
    ];

    const stats = [
        {
            value: "01",
            label: "Technology Partner",
            text: "One point of coordination across multiple technology requirements.",
        },
        {
            value: "360°",
            label: "Project Coverage",
            text: "From planning and sourcing through deployment and support.",
        },
        {
            value: "A–Z",
            label: "Capabilities",
            text: "Hardware, software, infrastructure, cloud, security and support.",
        },
        {
            value: "∞",
            label: "Scalability",
            text: "Solutions can evolve as programs and organizations grow.",
        },
    ];

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.12),transparent_28%),linear-gradient(135deg,#f8fafc,#eef6f7_45%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.12),transparent_28%),linear-gradient(135deg,#020617,#071827_45%,#020617)]" />

                <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-20">
                    <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full border border-sky-500/20" />
                    <div className="absolute left-[-4rem] top-40 h-56 w-56 rounded-full border border-emerald-500/20" />
                    <div className="absolute right-[-8rem] top-20 h-96 w-96 rounded-full border border-cyan-500/20" />
                    <div className="absolute right-12 bottom-0 h-64 w-64 rounded-full border border-blue-500/10" />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">

                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.05] dark:text-sky-300">
                                <HeartHandshake className="h-4 w-4" />
                                NGOs & Development Organizations
                            </div>

                            <h1 className="max-w-5xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Technology that helps
                                <span className="block bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                                    development work move.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                From a project idea to procurement, technology infrastructure,
                                custom software, field deployment and ongoing support, AB
                                Technologies helps NGOs and development organizations build
                                the systems they need to deliver their work effectively.
                            </p>

                            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
                                {[
                                    "Start from the requirement, not the product.",
                                    "Support projects from planning to deployment.",
                                    "Procure hardware and technology at scale.",
                                    "Build software around your actual workflow.",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                                        <span className="text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a technology or procurement project for our NGO or development organization.",
                                            {
                                                Intent: "Discuss project",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-300"
                                >
                                    Discuss Your Project
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </button>

                                <a
                                    href="#capabilities"
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-sky-400 dark:hover:text-sky-300"
                                >
                                    Explore Capabilities
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span className="inline-flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    Requirement-focused
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <FileCheck2 className="h-4 w-4 text-sky-500" />
                                    Structured delivery
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Headphones className="h-4 w-4 text-violet-500" />
                                    Ongoing support
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30">

                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                            Development Technology Desk
                                        </p>
                                        <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">
                                            One partner. Multiple requirements.
                                        </p>
                                    </div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                                        <HeartHandshake className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        [ShoppingCart, "Procurement"],
                                        [Laptop, "Technology"],
                                        [Cloud, "Cloud"],
                                        [Database, "Data"],
                                        [Bot, "Automation"],
                                        [ShieldCheck, "Security"],
                                        [Wrench, "Deployment"],
                                        [Headphones, "Support"],
                                    ].map(([Icon, title]) => (
                                        <div
                                            key={title}
                                            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30 dark:hover:bg-sky-400/[0.05]"
                                        >
                                            <Icon className="h-5 w-5 text-sky-600 transition group-hover:scale-110 dark:text-sky-400" />
                                            <p className="mt-3 text-sm font-bold text-slate-800 dark:text-slate-100">
                                                {title}
                                            </p>
                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                                                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.05] p-4">
                                    <div className="flex gap-3">
                                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                Starting from scratch is okay.
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                                                Tell us what the program needs to accomplish.
                                                We can help translate the requirement into
                                                technology, procurement and implementation steps.
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
                TRUST STRIP
            ========================================================= */}

            <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/60">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4 dark:divide-white/10">
                    {stats.map((stat) => (
                        <div key={stat.value} className="px-5 py-7 sm:px-7">
                            <p className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-sm font-bold text-sky-600 dark:text-sky-400">
                                {stat.label}
                            </p>
                            <p className="mt-2 hidden text-xs leading-5 text-slate-500 sm:block dark:text-slate-400">
                                {stat.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* =========================================================
                INTRO
            ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_30%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_90%_30%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(14,165,233,0.08),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                Built around your mission
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                Your program should not have to become a technology project.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Development organizations often operate across different
                                locations, teams, budgets, funding cycles and reporting
                                requirements. Technology should simplify that complexity,
                                not create more of it.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                We bring procurement, infrastructure, software, cloud,
                                security, deployment and support together so your teams can
                                focus more of their energy on the work that matters.
                            </p>

                            <div className="mt-7 flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-white">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                                    <Target className="h-5 w-5" />
                                </div>
                                Technology should serve the mission.
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: ClipboardCheck,
                                    title: "Plan",
                                    text: "Define exactly what the project requires before purchasing or building.",
                                },
                                {
                                    icon: Search,
                                    title: "Research",
                                    text: "Explore suitable products, vendors, technologies and implementation approaches.",
                                },
                                {
                                    icon: Boxes,
                                    title: "Build",
                                    text: "Develop software, systems and infrastructure around actual operational needs.",
                                },
                                {
                                    icon: Truck,
                                    title: "Deliver",
                                    text: "Coordinate procurement, logistics, deployment and implementation.",
                                },
                                {
                                    icon: Users,
                                    title: "Enable",
                                    text: "Prepare staff and teams to confidently use the technology provided.",
                                },
                                {
                                    icon: Headphones,
                                    title: "Support",
                                    text: "Provide ongoing technical assistance as the organization evolves.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:shadow-black/20"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/10 to-emerald-500/10 text-sky-600 dark:text-sky-400">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-5 text-lg font-black text-slate-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
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
                CAPABILITIES
            ========================================================= */}

            <section id="capabilities" className="relative bg-slate-100 py-20 lg:py-28 dark:bg-slate-900/40">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                            What we can do
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            A complete technology partner for development organizations.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            Whether you need ten laptops, a complete field-office setup,
                            a custom reporting system, a secure cloud environment or
                            ongoing IT support, we can structure the engagement around
                            the actual requirement.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {services.map((service) => {
                            const Icon = service.icon;
                            const active = activeService === service.id;

                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveService(service.id)}
                                    className={`group text-left rounded-3xl border p-6 transition ${active
                                        ? "border-sky-400 bg-white shadow-xl shadow-sky-900/5 dark:border-sky-400/40 dark:bg-slate-900"
                                        : "border-slate-200 bg-white/60 hover:border-sky-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-sky-400/30 dark:hover:bg-white/[0.045]"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active
                                            ? "bg-sky-500 text-white"
                                            : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                                            }`}>
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <ChevronRight className={`h-5 w-5 transition ${active
                                            ? "text-sky-500 translate-x-1"
                                            : "text-slate-300 group-hover:translate-x-1 group-hover:text-sky-500 dark:text-slate-600"
                                            }`} />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black text-slate-900 dark:text-white">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {service.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950">
                        <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

                            <div className="bg-gradient-to-br from-sky-600 to-cyan-700 p-8 text-white lg:p-10">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-100">
                                    Selected capability
                                </p>

                                {services
                                    .filter((service) => service.id === activeService)
                                    .map((service) => {
                                        const Icon = service.icon;

                                        return (
                                            <React.Fragment key={service.id}>
                                                <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                                                    <Icon className="h-7 w-7" />
                                                </div>

                                                <h3 className="mt-7 text-2xl font-black">
                                                    {service.title}
                                                </h3>

                                                <p className="mt-4 text-sm leading-7 text-sky-50">
                                                    {service.description}
                                                </p>
                                            </React.Fragment>
                                        );
                                    })}

                                <button
                                    type="button"
                                    onClick={() => {
                                        const selectedService = services.find(
                                            (service) => service.id === activeService
                                        );

                                        startSupportChat(
                                            `I'd like to discuss ${selectedService?.title || "our technology requirement"} for our organization.`,
                                            {
                                                Intent: "Capability enquiry",
                                                Capability: selectedService?.title || activeService,
                                            }
                                        );
                                    }}
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-sky-700 transition hover:bg-sky-50"
                                >
                                    Start with a requirement
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="p-8 lg:p-10">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    {[
                                        "Requirements discovery",
                                        "Product research",
                                        "Vendor sourcing",
                                        "Technical specifications",
                                        "Competitive quotations",
                                        "Procurement coordination",
                                        "Infrastructure design",
                                        "Software development",
                                        "Cloud deployment",
                                        "Security planning",
                                        "User training",
                                        "Ongoing support",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
                                        >
                                            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {item}
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
                PROCUREMENT
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                Procurement
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                From one device to a complete program deployment.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Procurement requirements can range from a few laptops for
                                a small project to hundreds of devices, networking systems,
                                field equipment, servers, power systems and accessories
                                across multiple locations.
                            </p>

                            <div className="mt-7 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6">
                                <div className="flex gap-4">
                                    <BadgeCheck className="h-6 w-6 shrink-0 text-emerald-500" />
                                    <div>
                                        <h3 className="font-black text-slate-900 dark:text-white">
                                            Procurement without the guesswork
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            Give us the requirement, quantity, location,
                                            intended use and timeline. We can help turn it
                                            into a structured procurement requirement.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {procurementCategories.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <div
                                        key={category.title}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-black text-slate-900 dark:text-white">
                                            {category.title}
                                        </h3>

                                        <div className="mt-4 grid gap-2">
                                            {category.items.map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like help sourcing or planning ${category.title} for our NGO or development program.`,
                                                    {
                                                        Intent: "Procurement",
                                                        Category: category.title,
                                                    }
                                                )
                                            }
                                            className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-sky-600 transition hover:gap-3 dark:text-sky-400"
                                        >
                                            Discuss procurement
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROGRAM SOLUTIONS
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-100 py-20 lg:py-28 dark:bg-slate-900/50">
                <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-emerald-500/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                            Digital program enablement
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            Build the digital systems behind the mission.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            When spreadsheets, disconnected tools and manual processes
                            begin slowing down a program, we can help design a more
                            connected digital environment.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {programSolutions.map((solution) => {
                            const Icon = solution.icon;

                            return (
                                <article
                                    key={solution.title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-sky-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/10 to-emerald-500/10 text-sky-600 dark:text-sky-400">
                                        <Icon className="h-5 w-5 transition group-hover:scale-110" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black text-slate-900 dark:text-white">
                                        {solution.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {solution.description}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore ${solution.title} for our NGO or development program.`,
                                                {
                                                    Intent: "Program solution",
                                                    Solution: solution.title,
                                                }
                                            )
                                        }
                                        className="mt-5 flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400"
                                    >
                                        Explore capability
                                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROJECT TYPES
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                Program environments
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Technology that adapts to the kind of work you do.
                            </h2>
                        </div>

                        <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                            Different development programs have different technology
                            requirements. We can shape the engagement around the
                            operational environment instead of forcing every organization
                            into the same package.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {projectTypes.map((project) => {
                            const Icon = project.icon;

                            return (
                                <div
                                    key={project.title}
                                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <div className="absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full bg-sky-500/5" />

                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sky-600 dark:bg-white/5 dark:text-sky-400">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="relative mt-6 text-lg font-black text-slate-900 dark:text-white">
                                        {project.title}
                                    </h3>

                                    <p className="relative mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {project.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                HOW WE WORK
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
                            How we work
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            Start with the problem. Build toward the outcome.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-300">
                            You do not need to arrive with a perfect technical specification.
                            We can work from a simple project requirement and progressively
                            define what is needed.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {workflow.map((step) => (
                            <div
                                key={step.number}
                                className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.07]"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-black text-sky-400/80">
                                        {step.number}
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-sky-300" />
                                </div>

                                <h3 className="mt-7 text-lg font-black">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-sky-500/10 to-emerald-500/10 p-7">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-lg font-black">
                                    Have a requirement but do not know where to start?
                                </p>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                                    That is exactly where the conversation can begin.
                                    Bring the objective; we can help structure the technology side.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "We have a project requirement but are not yet sure what technology, procurement or implementation approach we need.",
                                        {
                                            Intent: "Requirements discovery",
                                        }
                                    )
                                }
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-100"
                            >
                                Start a Conversation
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                DIFFERENTIATORS
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                            Why AB Technologies
                        </span>

                        <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            More than supplying technology.
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                            We think about the entire technology lifecycle around your
                            organization and your programs.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {differentiators.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sky-600 dark:bg-white/5 dark:text-sky-400">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black text-slate-900 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                ORGANIZATION TYPES
            ========================================================= */}

            <section className="bg-slate-100 py-20 lg:py-28 dark:bg-slate-900/50">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                Who we support
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Built for organizations doing work that matters.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Our services can be adapted to organizations at different
                                stages, from small local initiatives to larger distributed
                                development operations.
                            </p>

                            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">
                                        One technology partner
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        Instead of coordinating every technology requirement
                                        separately.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {organizationTypes.map((type) => (
                                <div
                                    key={type}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-slate-950"
                                >
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {type}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                FIELD OPERATIONS
            ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(14,165,233,0.08),transparent_35%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                                Field & distributed operations
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Technology that can travel with the program.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Field teams have different realities from headquarters.
                                Connectivity, power, device durability, mobility, security,
                                support and logistics all become part of the technology plan.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Multi-location device planning",
                                    "Connectivity and network planning",
                                    "Portable and field-ready equipment",
                                    "Device configuration and deployment",
                                    "User onboarding and training",
                                    "Remote support considerations",
                                    "Backup and data protection",
                                    "Replacement and expansion planning",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900">
                                <div className="rounded-3xl bg-slate-950 p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                                Field deployment map
                                            </p>
                                            <p className="mt-2 text-xl font-black">
                                                Connected operations
                                            </p>
                                        </div>

                                        <Globe2 className="h-7 w-7 text-sky-400" />
                                    </div>

                                    <div className="relative mt-7 h-64 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800">
                                        <div className="absolute left-[20%] top-[25%] h-3 w-3 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50" />
                                        <div className="absolute left-[42%] top-[48%] h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                                        <div className="absolute right-[23%] top-[30%] h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                                        <div className="absolute right-[35%] bottom-[22%] h-3 w-3 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />

                                        <div className="absolute left-[21%] top-[26%] h-px w-[23%] rotate-[22deg] bg-gradient-to-r from-sky-400/80 to-emerald-400/20" />
                                        <div className="absolute left-[43%] top-[48%] h-px w-[28%] -rotate-[20deg] bg-gradient-to-r from-emerald-400/70 to-cyan-400/20" />
                                        <div className="absolute right-[26%] top-[33%] h-px w-[16%] rotate-[70deg] bg-gradient-to-r from-cyan-400/70 to-violet-400/20" />

                                        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
                                    </div>

                                    <div className="mt-5 grid grid-cols-3 gap-3">
                                        <div className="rounded-xl bg-white/5 p-3">
                                            <p className="text-xs text-slate-500">Sites</p>
                                            <p className="mt-1 font-black">Multiple</p>
                                        </div>
                                        <div className="rounded-xl bg-white/5 p-3">
                                            <p className="text-xs text-slate-500">Devices</p>
                                            <p className="mt-1 font-black">Scalable</p>
                                        </div>
                                        <div className="rounded-xl bg-white/5 p-3">
                                            <p className="text-xs text-slate-500">Support</p>
                                            <p className="mt-1 font-black">Ongoing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                SOFTWARE & DATA
            ========================================================= */}

            <section className="bg-slate-950 py-20 text-white lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                                Custom software
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                If the software does not fit the workflow, build the workflow.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-300">
                                Off-the-shelf tools are useful, but some organizations
                                eventually reach processes that are too specific for
                                generic software. That is where custom development can
                                make sense.
                            </p>

                            <button
                                onClick={() => setShowQuotePanel(true)}
                                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-50"
                            >
                                Discuss a software idea
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Database,
                                    title: "Program databases",
                                },
                                {
                                    icon: BarChart3,
                                    title: "M&E dashboards",
                                },
                                {
                                    icon: FileText,
                                    title: "Reporting systems",
                                },
                                {
                                    icon: Users,
                                    title: "Beneficiary portals",
                                },
                                {
                                    icon: Workflow,
                                    title: "Workflow automation",
                                },
                                {
                                    icon: Package,
                                    title: "Inventory systems",
                                },
                                {
                                    icon: BriefcaseBusiness,
                                    title: "Operations platforms",
                                },
                                {
                                    icon: LockKeyhole,
                                    title: "Role-based access",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-sky-400/30 hover:bg-white/[0.07]"
                                    >
                                        <Icon className="h-5 w-5 text-sky-400" />
                                        <p className="mt-4 text-sm font-bold">
                                            {item.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                SECURITY
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                                Security & continuity
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Protect the systems and information your programs depend on.
                            </h2>

                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                                Development organizations can work with sensitive program
                                information, staff records, beneficiary information,
                                operational documents and donor-related data. Technology
                                planning should account for access, backups, security and
                                continuity.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    ["Access control", "Control who can access systems and resources."],
                                    ["Backups", "Reduce the impact of accidental loss and operational failures."],
                                    ["Device security", "Protect endpoints used by office and field teams."],
                                    ["Network security", "Strengthen connectivity environments and infrastructure."],
                                    ["Cloud security", "Apply appropriate controls to hosted environments."],
                                    ["Business continuity", "Plan for recovery when systems or equipment fail."],
                                ].map(([title, text]) => (
                                    <div
                                        key={title}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="h-5 w-5 text-violet-500" />
                                            <h3 className="font-black text-slate-900 dark:text-white">
                                                {title}
                                            </h3>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] to-sky-500/[0.06] p-7">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
                                <LockKeyhole className="h-6 w-6" />
                            </div>

                            <h3 className="mt-7 text-2xl font-black text-slate-950 dark:text-white">
                                Security is part of the architecture.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Instead of treating security as an afterthought, we can
                                consider it during infrastructure planning, software
                                development, user access, deployment and ongoing support.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Identity & access",
                                    "Secure configurations",
                                    "Backups & recovery",
                                    "Monitoring considerations",
                                    "Endpoint protection",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 dark:bg-white/[0.04]"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
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
                MANAGED IT
            ========================================================= */}

            <section className="bg-slate-100 py-20 lg:py-28 dark:bg-slate-900/50">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                            Managed IT
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            Keep the technology working after the project goes live.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            Technology projects do not end at installation. Devices need
                            maintenance, users need assistance, systems need updates and
                            organizations change over time.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Headphones,
                                title: "User Support",
                                text: "Help users resolve common technology issues and get back to work.",
                            },
                            {
                                icon: Wrench,
                                title: "Maintenance",
                                text: "Keep devices, infrastructure and systems operational.",
                            },
                            {
                                icon: Activity,
                                title: "Monitoring",
                                text: "Monitor relevant infrastructure and identify potential issues early.",
                            },
                            {
                                icon: RefreshCcw,
                                title: "Improvements",
                                text: "Continuously improve systems as operational requirements change.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-950"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black text-slate-900 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT / QUOTE PROCESS
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-10 lg:p-14 dark:border-white/10 dark:bg-white/[0.035]">

                        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">

                            <div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                    Request & procurement
                                </span>

                                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                    Tell us what you need. We help make it actionable.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    You can start with a simple description. It could be
                                    “we need computers for a 30-person office,” “we need
                                    technology for a field project,” or “we need a system
                                    to manage program reporting.”
                                </p>

                                <button
                                    onClick={() => setShowQuotePanel(true)}
                                    className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                                >
                                    Request a Consultation
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        icon: MessageSquare,
                                        title: "Describe",
                                        text: "Explain the outcome you need.",
                                    },
                                    {
                                        icon: ClipboardCheck,
                                        title: "Structure",
                                        text: "We organize the technical requirement.",
                                    },
                                    {
                                        icon: Search,
                                        title: "Research",
                                        text: "We identify suitable approaches.",
                                    },
                                    {
                                        icon: FileCheck2,
                                        title: "Compare",
                                        text: "Review options and relevant trade-offs.",
                                    },
                                    {
                                        icon: ShoppingCart,
                                        title: "Procure",
                                        text: "Coordinate approved purchases.",
                                    },
                                    {
                                        icon: Wrench,
                                        title: "Implement",
                                        text: "Deploy and configure where required.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950"
                                        >
                                            <Icon className="h-5 w-5 text-sky-500" />
                                            <p className="mt-4 text-sm font-black text-slate-900 dark:text-white">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section className="bg-slate-100 py-20 lg:py-28 dark:bg-slate-900/50">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                            Frequently asked questions
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Questions organizations often ask.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const open = activeFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950"
                                >
                                    <button
                                        onClick={() =>
                                            setActiveFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                                    >
                                        <span className="text-sm font-bold leading-6 text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        {open ? (
                                            <Minus className="h-5 w-5 shrink-0 text-sky-500" />
                                        ) : (
                                            <Plus className="h-5 w-5 shrink-0 text-slate-400" />
                                        )}
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

            <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-700 to-emerald-700 py-20 text-white lg:py-28">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full border border-white/20" />
                    <div className="absolute right-[-10rem] bottom-[-12rem] h-[35rem] w-[35rem] rounded-full border border-white/20" />
                </div>

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                        <HeartHandshake className="h-8 w-8" />
                    </div>

                    <h2 className="mt-8 text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl">
                        Have a development project?
                        <span className="block text-sky-100">
                            Start with the requirement.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-sky-50 sm:text-lg">
                        Whether you are planning a new office, launching a field program,
                        procuring equipment, modernizing your systems or building a
                        custom platform, AB Technologies can help you work through the
                        technology side from the ground up.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button" onClick={() => startSupportChat("I'd like to start a technology or procurement project for our NGO or development organization.", { Intent: "Start project" })}
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-sky-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-sky-50"
                        >
                            Start Your Project
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <a
                            href="#capabilities"
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                        >
                            View Our Capabilities
                            <ChevronRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-semibold text-sky-100">
                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Procurement
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Software
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Infrastructure
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Deployment
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Support
                        </span>
                    </div>
                </div>
            </section>

            {/* =========================================================
                QUOTE / CONSULTATION MODAL
            ========================================================= */}

            {showQuotePanel && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
                    onClick={() => setShowQuotePanel(false)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowQuotePanel(false)}
                            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15 dark:hover:text-white"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-7 sm:p-9">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
                                <Sparkles className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">
                                Tell us what you are trying to accomplish.
                            </h2>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                                You do not need to know the exact technical solution.
                                Describe the project, requirement or challenge and we can
                                help structure the next step.
                            </p>

                            <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300">
                                        Organization
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Organization name"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300">
                                        Project type
                                    </label>
                                    <select
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select one
                                        </option>
                                        <option>Procurement</option>
                                        <option>Software</option>
                                        <option>Networking</option>
                                        <option>Cloud</option>
                                        <option>Security</option>
                                        <option>Deployment</option>
                                        <option>Managed IT</option>
                                        <option>Multiple requirements</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300">
                                        Requirement
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us what you need, what you are trying to achieve, number of users/sites/devices if known, location, timeline, or any other useful information..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
                                <div className="flex gap-3">
                                    <Bot className="h-5 w-5 shrink-0 text-emerald-500" />
                                    <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            Future-ready workflow:
                                        </span>{" "}
                                        this form can later be connected to your AI-powered
                                        request-quote system so requirements can be analyzed
                                        and routed automatically.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowQuotePanel(false)}
                                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-300"
                            >
                                Submit Project Requirement
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}