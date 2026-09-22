import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    Factory,
    Cpu,
    Boxes,
    Network,
    ShieldCheck,
    Cloud,
    Bot,
    Database,
    Server,
    MonitorCog,
    Settings2,
    Workflow,
    BarChart3,
    LineChart,
    PackageCheck,
    Truck,
    ClipboardCheck,
    SearchCheck,
    Wrench,
    Headphones,
    FileCheck2,
    Users,
    Building2,
    HardHat,
    Gauge,
    Cog,
    CircuitBoard,
    ScanLine,
    LockKeyhole,
    Activity,
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Layers3,
    RadioTower,
    Wifi,
    Zap,
    ShoppingCart,
    BriefcaseBusiness,
    Globe2,
    RefreshCw,
    ShieldAlert,
    LifeBuoy,
    BoxesIcon,
    NetworkIcon,
    BrainCircuit,
    WorkflowIcon,
    Timer,
    TrendingUp,
    Target,
    BadgeCheck,
    FileText,
    PhoneCall,
    Mail,
    MessageSquare,
    CalendarCheck,
    Eye,
    EyeOff,
    Plus,
    Minus,
    FactoryIcon,
    Computer,
    Laptop,
    Printer,
    Router,
    Cable,
    ServerCog,
    HardDrive,
    KeyRound,
    UserCheck,
    Settings,
    CircleDollarSign,
    Receipt,
    ShoppingBag,
    TruckIcon,
    Warehouse,
    QrCode,
    Barcode,
    ScanBarcode,
    Presentation,
    GraduationCap,
    BookOpenCheck,
    AlertTriangle,
    CircleCheck,
    CircleX,
    X,
} from "lucide-react";

const services = [
    {
        icon: PackageCheck,
        title: "Industrial IT Procurement",
        description:
            "Source computers, workstations, servers, networking equipment, printers, accessories and other technology required to operate modern industrial environments.",
        items: [
            "Business laptops and desktops",
            "Engineering workstations",
            "Servers and storage",
            "Networking equipment",
            "Printers and scanners",
            "UPS and power protection",
        ],
    },
    {
        icon: Workflow,
        title: "Industrial Process Automation",
        description:
            "Connect business processes and operational workflows so repetitive activities can become faster, more measurable and easier to control.",
        items: [
            "Workflow automation",
            "Approval systems",
            "Production workflows",
            "Inventory automation",
            "Notifications",
            "Business integrations",
        ],
    },
    {
        icon: Network,
        title: "Industrial Networking",
        description:
            "Design and deploy dependable networks for offices, factories, warehouses, branches, production environments and connected facilities.",
        items: [
            "LAN infrastructure",
            "Wi-Fi deployment",
            "Network segmentation",
            "Structured cabling",
            "Network monitoring",
            "Remote connectivity",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Security & Access Control",
        description:
            "Help organizations protect systems, devices, users and operational information through layered security controls.",
        items: [
            "Endpoint security",
            "Access control",
            "User permissions",
            "Network protection",
            "Security monitoring",
            "Backup planning",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud & Digital Infrastructure",
        description:
            "Build and maintain cloud-connected infrastructure that supports collaboration, applications, backups, communication and business continuity.",
        items: [
            "Cloud hosting",
            "Cloud applications",
            "Backup infrastructure",
            "Email infrastructure",
            "Remote access",
            "Digital workspaces",
        ],
    },
    {
        icon: MonitorCog,
        title: "Business Software",
        description:
            "Deploy or develop software that helps industrial organizations manage operations, people, assets, documents, customers and reporting.",
        items: [
            "ERP-style systems",
            "Inventory management",
            "Asset management",
            "HR systems",
            "CRM solutions",
            "Custom applications",
        ],
    },
    {
        icon: Bot,
        title: "AI & Intelligent Operations",
        description:
            "Introduce practical AI into business processes to improve decision-making, reporting, document handling, customer support and operational efficiency.",
        items: [
            "AI assistants",
            "Document intelligence",
            "AI reporting",
            "Knowledge systems",
            "Predictive insights",
            "Process intelligence",
        ],
    },
    {
        icon: Headphones,
        title: "Managed IT & Support",
        description:
            "Provide ongoing technical support, maintenance and monitoring so your team can focus on production and business operations.",
        items: [
            "Technical support",
            "Device management",
            "Network support",
            "System maintenance",
            "Troubleshooting",
            "IT monitoring",
        ],
    },
];

const solutions = [
    {
        icon: Factory,
        title: "Factory Technology",
        text: "Technology infrastructure for production facilities, plants and manufacturing environments.",
    },
    {
        icon: Warehouse,
        title: "Warehouse Systems",
        text: "Digital tools and infrastructure for inventory, scanning, tracking and warehouse operations.",
    },
    {
        icon: Boxes,
        title: "Inventory Management",
        text: "Improve visibility over stock, movement, procurement, consumption and replenishment.",
    },
    {
        icon: BarChart3,
        title: "Production Reporting",
        text: "Turn operational information into useful reports, dashboards and management insights.",
    },
    {
        icon: ScanLine,
        title: "Asset Tracking",
        text: "Track equipment, devices, assets, assignments, locations and maintenance history.",
    },
    {
        icon: Users,
        title: "Workforce Systems",
        text: "Support employees with attendance, workflow, communication, approvals and productivity systems.",
    },
    {
        icon: ShieldCheck,
        title: "Operational Security",
        text: "Protect endpoints, networks, applications, accounts and sensitive business information.",
    },
    {
        icon: RadioTower,
        title: "Connected Operations",
        text: "Connect people, devices, systems and locations to create a more coordinated operation.",
    },
];

const procurementCategories = [
    {
        icon: Computer,
        title: "Computing",
        products: [
            "Business desktops",
            "Laptops",
            "Engineering workstations",
            "Mini PCs",
            "Monitors",
            "Docking stations",
        ],
    },
    {
        icon: Server,
        title: "Servers & Storage",
        products: [
            "Rack servers",
            "Tower servers",
            "NAS systems",
            "Enterprise storage",
            "Backup drives",
            "Server accessories",
        ],
    },
    {
        icon: Network,
        title: "Networking",
        products: [
            "Switches",
            "Routers",
            "Access points",
            "Firewalls",
            "Network racks",
            "Structured cabling",
        ],
    },
    {
        icon: Printer,
        title: "Printing & Scanning",
        products: [
            "Laser printers",
            "Multifunction printers",
            "Barcode printers",
            "Document scanners",
            "Label printers",
            "Consumables",
        ],
    },
    {
        icon: Zap,
        title: "Power & Protection",
        products: [
            "UPS systems",
            "Power conditioners",
            "Surge protection",
            "Power distribution",
            "Backup power",
            "Batteries",
        ],
    },
    {
        icon: Barcode,
        title: "Industrial Accessories",
        products: [
            "Barcode scanners",
            "POS equipment",
            "Rugged devices",
            "Cables",
            "Adapters",
            "Peripherals",
        ],
    },
];

const processSteps = [
    {
        number: "01",
        icon: MessageSquare,
        title: "Tell Us What You Need",
        text: "Share your business challenge, project requirement, equipment list or operational goal.",
    },
    {
        number: "02",
        icon: SearchCheck,
        title: "We Assess",
        text: "We review your requirements, environment, users, budget and technical considerations.",
    },
    {
        number: "03",
        icon: ClipboardCheck,
        title: "We Design the Approach",
        text: "We recommend an appropriate combination of products, infrastructure, software and services.",
    },
    {
        number: "04",
        icon: ShoppingCart,
        title: "We Source",
        text: "We identify suitable products and suppliers based on availability, specifications and project requirements.",
    },
    {
        number: "05",
        icon: Settings2,
        title: "We Deploy",
        text: "Where required, our team can assist with installation, configuration, integration and rollout.",
    },
    {
        number: "06",
        icon: Headphones,
        title: "We Support",
        text: "After deployment, ongoing support and maintenance can help keep your environment running.",
    },
];

const benefits = [
    "One technology partner across multiple requirements",
    "Hardware sourcing and procurement support",
    "Software development and implementation",
    "Networking and infrastructure",
    "Cloud and hosting services",
    "Automation and AI solutions",
    "Security and access controls",
    "Deployment and technical support",
    "Vendor and supplier sourcing",
    "Product verification",
    "Competitive quotation support",
    "Bulk and institutional procurement",
];

const industries = [
    "Manufacturing plants",
    "Factories",
    "Processing facilities",
    "Warehouses",
    "Distribution centres",
    "Engineering companies",
    "Construction companies",
    "Industrial estates",
    "Logistics companies",
    "Oil & gas support companies",
    "Food processing companies",
    "Agricultural processing businesses",
];

const faqs = [
    {
        q: "Can AB TECHNOLOGIES help us from scratch?",
        a: "Yes. You do not need to already have a complete technology plan. We can start from your business objective or problem, understand the environment and help determine what hardware, software, infrastructure, security, automation and support may be appropriate.",
    },
    {
        q: "Can you supply hardware in bulk?",
        a: "Yes. We can support corporate, project-based, institutional and bulk technology procurement requirements. Requirements can include computers, servers, networking equipment, printers, accessories, power equipment and other technology products.",
    },
    {
        q: "Can you build software specifically for our factory?",
        a: "Yes. Custom software can be designed around your actual workflows. Examples include inventory systems, production tracking, asset management, approval workflows, reporting dashboards, workforce systems and other business applications.",
    },
    {
        q: "Can you work with our existing systems?",
        a: "Yes. The objective does not always have to be replacing everything. We can assess existing infrastructure and identify opportunities for integration, improvement, migration, automation or selective replacement.",
    },
    {
        q: "Do you provide ongoing support?",
        a: "Yes. Depending on the engagement, support can include troubleshooting, maintenance, monitoring, user assistance, infrastructure support, software support and technology advisory services.",
    },
    {
        q: "Can you help us compare suppliers and quotations?",
        a: "Yes. Procurement support can include requirement clarification, product specification comparison, quotation evaluation, supplier sourcing and helping organizations make informed purchasing decisions.",
    },
    {
        q: "Can you support multiple factory locations?",
        a: "Yes. Multi-site environments can be approached through centralized infrastructure planning, networking, cloud services, remote support, standardized devices and consistent technology policies.",
    },
    {
        q: "Do you provide AI solutions for manufacturing?",
        a: "Yes. Practical AI applications can include internal assistants, document processing, knowledge retrieval, reporting assistance, workflow automation, data analysis and other use cases appropriate to the organization's information and processes.",
    },
];

function SectionHeading({
    eyebrow,
    title,
    description,
    centered = false,
}) {
    return (
        <div
            className={`mb-14 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
                }`}
        >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {title}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                {description}
            </p>
        </div>
    );
}

function ServiceCard({ service, onDiscuss }) {
    const Icon = service.icon;

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/[0.035]">
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20" />

            <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                    {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {service.description}
                </p>

                <div className="mt-6 space-y-3">
                    {service.items.map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                        >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => onDiscuss?.(service)}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3 dark:text-blue-400"
                >
                    Discuss this service
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

function SolutionCard({ solution, onDiscuss }) {
    const Icon = solution.icon;

    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                {solution.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {solution.text}
            </p>

            <button
                type="button"
                onClick={() => onDiscuss?.(solution)}
                className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400"
            >
                Explore capability
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
        </div>
    );
}

function ProcurementCard({ category, onDiscuss }) {
    const Icon = category.icon;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/60">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-bold text-slate-950 dark:text-white">
                    {category.title}
                </h3>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {category.products.map((product) => (
                    <div
                        key={product}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                        <CircleCheck className="h-4 w-4 text-blue-500" />
                        {product}
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => onDiscuss?.(category)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3 dark:text-blue-400"
            >
                Discuss procurement
                <ArrowRight className="h-4 w-4" />
            </button>
        </div>
    );
}

function FAQItem({ faq, open, onClick }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]">
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-center justify-between gap-6 p-6 text-left"
            >
                <span className="font-bold text-slate-950 dark:text-white">
                    {faq.q}
                </span>

                <span className="shrink-0 text-blue-600 dark:text-blue-400">
                    {open ? (
                        <Minus className="h-5 w-5" />
                    ) : (
                        <Plus className="h-5 w-5" />
                    )}
                </span>
            </button>

            {open && (
                <div className="border-t border-slate-200 px-6 pb-6 pt-5 dark:border-white/10">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {faq.a}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function ManufacturingIndustrial() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(0);

    /* =========================================================
       SUPPORT HANDOFF
       ---------------------------------------------------------
       Queue the visitor's manufacturing/industrial context, then
       continue the conversation in the AI support page.
    ========================================================= */
    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a manufacturing or industrial technology project.",
            metadata: {
                Source: "Manufacturing & Industrial",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050912] dark:text-white">

            {/* =========================================================
                HERO
            ========================================================== */}

            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.14),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.10),transparent_30%),linear-gradient(135deg,#f8fafc,#eef4ff_55%,#f8fafc)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,#050912,#08111f_55%,#050912)]" />

                <div className="absolute left-[-10%] top-20 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute right-[-10%] top-40 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

                        <div>
                            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-xl dark:bg-white/[0.045] dark:text-blue-400">
                                <Factory className="h-4 w-4" />
                                Manufacturing & Industrial
                            </div>

                            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                                Technology built around
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                                    industrial operations.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                                From the first computer and network connection to
                                complete digital operations, AB TECHNOLOGIES helps
                                manufacturing and industrial organizations source,
                                deploy, connect, automate, secure and support the
                                technology they depend on.
                            </p>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-500">
                                You do not have to know exactly what technology you
                                need. Bring us the business problem, project,
                                facility or operational goal — we can help you
                                work out the technology path from the ground up.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start a manufacturing or industrial technology project.",
                                            {
                                                Intent: "Start project",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Start Your Project
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <a
                                    href="#capabilities"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur-xl transition hover:border-blue-500 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-400"
                                >
                                    Explore Capabilities
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    ["01", "Procurement"],
                                    ["02", "Infrastructure"],
                                    ["03", "Software"],
                                    ["04", "Support"],
                                ].map(([number, label]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="text-xs font-black text-blue-600 dark:text-blue-400">
                                            {number}
                                        </div>

                                        <div className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 dark:border-white/10">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                                                Operations Overview
                                            </div>

                                            <div className="mt-1 text-lg font-bold text-white">
                                                Connected Industrial Environment
                                            </div>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        {[
                                            [Factory, "Production", "Connected"],
                                            [Network, "Network", "Healthy"],
                                            [Database, "Data", "Protected"],
                                            [Bot, "Automation", "Active"],
                                        ].map(([Icon, title, status]) => (
                                            <div
                                                key={title}
                                                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                                            >
                                                <Icon className="h-5 w-5 text-blue-400" />

                                                <div className="mt-4 text-sm font-bold text-white">
                                                    {title}
                                                </div>

                                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                    {status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                                Technology Coverage
                                            </span>

                                            <span className="text-sm font-bold text-blue-400">
                                                End-to-End
                                            </span>
                                        </div>

                                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                                            <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                                        </div>

                                        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                                            <div>
                                                <div className="text-xl font-black text-white">
                                                    IT
                                                </div>
                                                <div className="text-[10px] uppercase text-slate-500">
                                                    Infrastructure
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xl font-black text-white">
                                                    AI
                                                </div>
                                                <div className="text-[10px] uppercase text-slate-500">
                                                    Intelligence
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xl font-black text-white">
                                                    Ops
                                                </div>
                                                <div className="text-[10px] uppercase text-slate-500">
                                                    Support
                                                </div>
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
            ========================================================== */}

            <section className="border-y border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
                    {[
                        [ClipboardCheck, "Requirement-led", "We start with what your organization actually needs."],
                        [Boxes, "Procurement-ready", "Hardware and technology sourcing for projects of different sizes."],
                        [Network, "Connected", "Infrastructure, applications and people can work together."],
                        [Headphones, "Supported", "Technology does not stop at delivery — support matters."],
                    ].map(([Icon, title, text]) => (
                        <div key={title} className="flex gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <Icon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">
                                    {text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* =========================================================
                INTRO
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.08),transparent_35%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                        <SectionHeading
                            eyebrow="Built for industry"
                            title="Your operation is the starting point."
                            description="Manufacturing environments are rarely simple. There are people, equipment, facilities, suppliers, inventory, production processes, data, communication channels and customers. Technology should connect these moving parts rather than create another layer of complexity."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Target,
                                    title: "Start with the objective",
                                    text: "Tell us what you want to achieve, improve, replace, automate or build.",
                                },
                                {
                                    icon: Layers3,
                                    title: "Build in layers",
                                    text: "Infrastructure, software, security and support can be introduced progressively.",
                                },
                                {
                                    icon: RefreshCw,
                                    title: "Improve existing systems",
                                    text: "Not every environment needs a complete replacement. We can work with what already exists.",
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Prepare for growth",
                                    text: "Design technology with future users, locations, workloads and operational requirements in mind.",
                                },
                            ].map(({ icon: Icon, title, text }) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />

                                    <h3 className="mt-5 font-bold text-slate-950 dark:text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                CAPABILITIES
            ========================================================== */}

            <section id="capabilities" className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-slate-100/70 dark:bg-[#07101d]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Our capabilities"
                        title="One partner across the technology lifecycle."
                        description="From procurement and infrastructure to software, automation, security and ongoing support, our services can be combined around the specific requirements of your manufacturing or industrial operation."
                        centered
                    />

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.title}
                                service={service}
                                onDiscuss={(selectedService) =>
                                    startSupportChat(
                                        `I'd like to discuss ${selectedService.title} for our manufacturing or industrial operation.`,
                                        {
                                            Intent: "Service enquiry",
                                            Service: selectedService.title,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                INDUSTRIAL SOLUTIONS
            ========================================================== */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Industrial solutions"
                        title="Technology that supports the operation behind the product."
                        description="A manufacturing organization needs more than computers. It needs dependable systems that help people communicate, manage information, track assets, understand operations and make decisions."
                    />

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {solutions.map((solution) => (
                            <SolutionCard
                                key={solution.title}
                                solution={solution}
                                onDiscuss={(selectedSolution) =>
                                    startSupportChat(
                                        `I'd like to explore ${selectedSolution.title} for our organization.`,
                                        {
                                            Intent: "Industrial solution",
                                            Solution: selectedSolution.title,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.10),transparent_30%),linear-gradient(135deg,#f1f5f9,#ffffff)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.10),transparent_30%),linear-gradient(135deg,#07101c,#050912)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                                <ShoppingCart className="h-4 w-4" />
                                Industrial procurement
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                Need equipment?
                                <span className="mt-1 block text-blue-600 dark:text-blue-400">
                                    Start with the requirement.
                                </span>
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                We can help organizations define what they need,
                                compare suitable options, source products and
                                coordinate procurement requirements.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Corporate equipment procurement",
                                    "Bulk hardware requirements",
                                    "Project-based procurement",
                                    "Institutional technology supply",
                                    "Supplier and vendor sourcing",
                                    "Product verification",
                                    "Competitive quotations",
                                    "Delivery coordination",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300"
                                    >
                                        <BadgeCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {procurementCategories.map((category) => (
                                <ProcurementCard
                                    key={category.title}
                                    category={category}
                                    onDiscuss={(selectedCategory) =>
                                        startSupportChat(
                                            `I'd like help sourcing or planning ${selectedCategory.title} for our organization.`,
                                            {
                                                Intent: "Procurement",
                                                Category: selectedCategory.title,
                                            }
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                SOFTWARE
            ========================================================== */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="grid lg:grid-cols-2">
                            <div className="p-8 sm:p-12 lg:p-16">
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    <CircuitBoard className="h-4 w-4" />
                                    Software for operations
                                </div>

                                <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                    When off-the-shelf software does not fit, build around your workflow.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    Industrial businesses often have processes
                                    that are unique to their operation. Custom
                                    software can turn those processes into
                                    structured digital workflows.
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {[
                                        ["Inventory", "Stock visibility and movement"],
                                        ["Production", "Operational tracking"],
                                        ["Assets", "Equipment and assignments"],
                                        ["Approvals", "Controlled business workflows"],
                                        ["Reports", "Management information"],
                                        ["Documents", "Digital records and access"],
                                        ["Workforce", "People and operational tasks"],
                                        ["Customers", "CRM and service workflows"],
                                    ].map(([title, text]) => (
                                        <div
                                            key={title}
                                            className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.035]"
                                        >
                                            <div className="text-sm font-bold text-slate-950 dark:text-white">
                                                {title}
                                            </div>

                                            <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">
                                                {text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-slate-950 p-8 sm:p-12 lg:p-16">
                                <div className="absolute right-[-20%] top-[-20%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

                                <div className="relative">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs uppercase tracking-widest text-blue-400">
                                                Industrial command centre
                                            </div>

                                            <div className="mt-2 text-xl font-black text-white">
                                                Operations Dashboard
                                            </div>
                                        </div>

                                        <BarChart3 className="h-7 w-7 text-blue-400" />
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        {[
                                            ["Production", "94.8%", "+8.4%"],
                                            ["Inventory", "82.1%", "+4.7%"],
                                            ["Assets", "98.2%", "+2.1%"],
                                            ["Tasks", "91.4%", "+6.9%"],
                                        ].map(([name, value, change]) => (
                                            <div
                                                key={name}
                                                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                                            >
                                                <div className="text-xs text-slate-500">
                                                    {name}
                                                </div>

                                                <div className="mt-3 text-2xl font-black text-white">
                                                    {value}
                                                </div>

                                                <div className="mt-2 text-xs font-bold text-emerald-400">
                                                    {change}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-white">
                                                Workflow automation
                                            </span>

                                            <span className="text-xs text-blue-400">
                                                Active
                                            </span>
                                        </div>

                                        <div className="mt-5 space-y-4">
                                            {[
                                                "Inventory request",
                                                "Manager approval",
                                                "Purchase order",
                                                "Delivery confirmation",
                                            ].map((item, index) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400">
                                                        0{index + 1}
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="h-2 rounded-full bg-white/10">
                                                            <div
                                                                className="h-2 rounded-full bg-blue-500"
                                                                style={{
                                                                    width: `${70 + index * 7}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
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
                AUTOMATION & AI
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-slate-100/70 dark:bg-[#07101c]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                <BrainCircuit className="h-4 w-4" />
                                AI & automation
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                                Make repetitive work more intelligent.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                AI should not be added simply because it is
                                fashionable. We focus on practical applications
                                where intelligent tools and automation can
                                reduce repetitive work, improve access to
                                information and help teams make better decisions.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Automated document processing",
                                    "Internal AI assistants",
                                    "Operational reporting",
                                    "Knowledge search",
                                    "Workflow automation",
                                    "Data analysis",
                                    "Email and notification automation",
                                    "System-to-system integrations",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.035] dark:bg-[#0b1320]">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                            <Bot className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-slate-950 dark:text-white">
                                                Industrial AI Assistant
                                            </div>

                                            <div className="mt-1 text-xs text-slate-500">
                                                Connected to approved business information
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-7 space-y-4">
                                        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-blue-600 p-4 text-sm text-white">
                                            Which production lines require attention today?
                                        </div>

                                        <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                                            Based on the available operational
                                            data, Line 03 has the highest number
                                            of open maintenance tasks. Two
                                            inventory items are also approaching
                                            their defined reorder threshold.
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                            AI analysis completed
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
            ========================================================== */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.035] sm:p-12 lg:p-16">
                        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
                            <div>
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>

                                <h2 className="text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">
                                    Security cannot be an afterthought.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    Manufacturing and industrial organizations
                                    increasingly depend on connected systems.
                                    Protecting those systems, users, devices and
                                    business information is part of building a
                                    dependable technology environment.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    [LockKeyhole, "Identity & access", "Control who can access systems and information."],
                                    [ShieldAlert, "Endpoint protection", "Help protect computers and business devices."],
                                    [Network, "Network security", "Segment, monitor and protect connected environments."],
                                    [Database, "Backup & recovery", "Prepare for accidental loss and operational disruption."],
                                    [Eye, "Monitoring", "Gain visibility into important infrastructure activity."],
                                    [UserCheck, "User controls", "Apply appropriate permissions and access policies."],
                                ].map(([Icon, title, text]) => (
                                    <div
                                        key={title}
                                        className="rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.035]"
                                    >
                                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />

                                        <h3 className="mt-4 text-sm font-bold text-slate-950 dark:text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-500">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                NETWORK
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#eff6ff,transparent_50%,#f8fafc)] dark:bg-[linear-gradient(135deg,#071529,transparent_50%,#050912)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
                                <div className="rounded-3xl bg-slate-950 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-bold text-white">
                                            Industrial Network
                                        </div>

                                        <Wifi className="h-5 w-5 text-blue-400" />
                                    </div>

                                    <div className="relative mt-10">
                                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                                            <Server className="h-9 w-9" />
                                        </div>

                                        <div className="mx-auto h-12 w-px bg-blue-500/30" />

                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                [Factory, "Factory"],
                                                [Warehouse, "Warehouse"],
                                                [Building2, "Office"],
                                            ].map(([Icon, label]) => (
                                                <div
                                                    key={label}
                                                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center"
                                                >
                                                    <Icon className="mx-auto h-6 w-6 text-blue-400" />

                                                    <div className="mt-2 text-[10px] font-bold text-slate-400">
                                                        {label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl bg-emerald-500/10 p-4">
                                            <div className="text-xs text-slate-500">
                                                Network status
                                            </div>

                                            <div className="mt-1 text-sm font-bold text-emerald-400">
                                                Operational
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-blue-500/10 p-4">
                                            <div className="text-xs text-slate-500">
                                                Locations
                                            </div>

                                            <div className="mt-1 text-sm font-bold text-blue-400">
                                                Connected
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <SectionHeading
                                eyebrow="Infrastructure"
                                title="Connect your facilities, people and systems."
                                description="A dependable network provides the foundation for communication, cloud applications, security, shared resources, business systems and connected operations."
                            />

                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    "Network design",
                                    "Structured cabling",
                                    "Wi-Fi deployment",
                                    "Network segmentation",
                                    "Routers & switches",
                                    "Firewall deployment",
                                    "Remote connectivity",
                                    "Network monitoring",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <Network className="h-4 w-4 text-blue-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                CLOUD
            ========================================================== */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Cloud & digital infrastructure"
                        title="Keep information available wherever your team works."
                        description="Modern industrial organizations often have teams across offices, warehouses, production sites and remote locations. Cloud and digital infrastructure can help make approved information and applications available where they are needed."
                    />

                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: Cloud,
                                title: "Cloud Applications",
                                text: "Business applications and services accessible across approved locations and devices.",
                            },
                            {
                                icon: Database,
                                title: "Backup Infrastructure",
                                text: "Structured backup approaches for important business information and systems.",
                            },
                            {
                                icon: Globe2,
                                title: "Multi-Site Access",
                                text: "Connectivity and remote access for organizations operating across locations.",
                            },
                        ].map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]"
                            >
                                <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />

                                <h3 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPORT
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#07101d]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[1fr_.8fr]">
                        <div>
                            <SectionHeading
                                eyebrow="After deployment"
                                title="Technology needs someone to look after it."
                                description="Devices fail. Users need help. Networks change. Software requires maintenance. Business requirements evolve. Our support capabilities are designed to help organizations maintain and improve their technology environment over time."
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    "User technical support",
                                    "Hardware troubleshooting",
                                    "Network troubleshooting",
                                    "Software maintenance",
                                    "System administration",
                                    "Cloud support",
                                    "Device configuration",
                                    "Technology advisory",
                                    "Preventive maintenance",
                                    "Remote support",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <Wrench className="h-4 w-4 text-blue-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-slate-950">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <LifeBuoy className="h-7 w-7" />
                            </div>

                            <h3 className="mt-7 text-2xl font-black text-slate-950 dark:text-white">
                                A technology partner, not just a delivery point.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Our relationship with an organization can
                                continue after implementation. As your
                                requirements change, we can help evaluate new
                                equipment, software, infrastructure and
                                operational improvements.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "Assess",
                                    "Implement",
                                    "Maintain",
                                    "Improve",
                                    "Scale",
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-white/[0.035]"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-600 dark:text-blue-400">
                                            {index + 1}
                                        </div>

                                        <span className="font-semibold text-slate-800 dark:text-slate-200">
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
                HOW WE WORK
            ========================================================== */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="How we work"
                        title="From the first conversation to ongoing support."
                        description="You can approach us with a detailed specification or simply explain what you are trying to accomplish. We help turn the requirement into a practical technology plan."
                        centered
                    />

                    <div className="relative">
                        <div className="absolute left-[8.33%] right-[8.33%] top-12 hidden h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent lg:block" />

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
                            {processSteps.map((step) => {
                                const Icon = step.icon;

                                return (
                                    <div key={step.number} className="relative">
                                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-500/20 bg-white text-blue-600 shadow-lg dark:bg-slate-950 dark:text-blue-400">
                                            <Icon className="h-8 w-8" />
                                        </div>

                                        <div className="mt-6 text-center">
                                            <div className="text-xs font-black tracking-widest text-blue-600 dark:text-blue-400">
                                                {step.number}
                                            </div>

                                            <h3 className="mt-2 text-sm font-bold text-slate-950 dark:text-white">
                                                {step.title}
                                            </h3>

                                            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-500">
                                                {step.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                BENEFITS
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_35%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
                        <SectionHeading
                            eyebrow="Why organizations choose us"
                            title="Reduce the number of technology problems you have to coordinate alone."
                            description="Instead of managing disconnected conversations for hardware, software, networking, cloud, security and support, organizations can bring multiple technology requirements together under one relationship."
                        />

                        <div className="grid gap-3 sm:grid-cols-2">
                            {benefits.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-600 dark:text-blue-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <span className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                INDUSTRIES / USE CASES
            ========================================================== */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Who we support"
                        title="Built for organizations with real operational complexity."
                        description="Our manufacturing and industrial capabilities can support organizations ranging from growing businesses to established operations with multiple facilities and technology requirements."
                    />

                    <div className="flex flex-wrap gap-3">
                        {industries.map((industry) => (
                            <div
                                key={industry}
                                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300"
                            >
                                {industry}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                MATURITY MODEL
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#07101d]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Start where you are"
                        title="You don't need to be digitally mature before you call us."
                        description="Some organizations need their first proper network. Others need to modernize a complex environment. Our approach can scale with where you are today."
                        centered
                    />

                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: Building2,
                                level: "Foundation",
                                title: "Getting Started",
                                text: "For organizations establishing dependable IT infrastructure, devices, connectivity, security and core business systems.",
                                items: [
                                    "Devices",
                                    "Network",
                                    "Internet",
                                    "Email",
                                    "Security",
                                ],
                            },
                            {
                                icon: Settings2,
                                level: "Optimization",
                                title: "Growing Operations",
                                text: "For organizations that already have technology but need better integration, control, reporting and support.",
                                items: [
                                    "Integration",
                                    "Automation",
                                    "Cloud",
                                    "Dashboards",
                                    "Managed support",
                                ],
                            },
                            {
                                icon: BrainCircuit,
                                level: "Transformation",
                                title: "Advanced Operations",
                                text: "For organizations looking to use data, AI, automation and connected systems to create smarter operations.",
                                items: [
                                    "AI",
                                    "Advanced automation",
                                    "Analytics",
                                    "Digital workflows",
                                    "Intelligent systems",
                                ],
                            },
                        ].map(({ icon: Icon, level, title, text, items }) => (
                            <div
                                key={level}
                                className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]"
                            >
                                <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />

                                <div className="mt-6 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    {level}
                                </div>

                                <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {text}
                                </p>

                                <div className="mt-6 space-y-3">
                                    {items.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT + PROJECT SUPPORT
            ========================================================== */}

            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.035] lg:p-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <FileCheck2 className="h-7 w-7" />
                            </div>

                            <h3 className="mt-7 text-2xl font-black text-slate-950 dark:text-white">
                                Have a specification?
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Send your equipment list, technical
                                specification, bill of quantities or project
                                requirement. We can help organize the
                                procurement and sourcing process.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Review requirements",
                                    "Identify suitable products",
                                    "Compare specifications",
                                    "Source quotations",
                                    "Coordinate procurement",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300"
                                    >
                                        <CircleCheck className="h-4 w-4 text-blue-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white dark:border-white/10 lg:p-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-400">
                                <BriefcaseBusiness className="h-7 w-7" />
                            </div>

                            <h3 className="mt-7 text-2xl font-black">
                                Have only an idea?
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-400">
                                That's fine too. Tell us the problem you are
                                trying to solve. We can help turn the idea into
                                a structured technology requirement.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Understand the business problem",
                                    "Map the workflow",
                                    "Identify technology opportunities",
                                    "Prioritize the investment",
                                    "Create an implementation path",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-semibold text-slate-300"
                                    >
                                        <CircleCheck className="h-4 w-4 text-blue-400" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-[#07101d]" />

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Questions"
                        title="Before you get started."
                        description="A few of the questions organizations commonly have when considering technology procurement, infrastructure, software and digital transformation."
                        centered
                    />

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={faq.q}
                                faq={faq}
                                open={openFaq === index}
                                onClick={() =>
                                    setOpenFaq(
                                        openFaq === index ? -1 : index
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                CTA
            ========================================================== */}

            <section id="start" className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 -z-20 bg-slate-950" />

                <div className="absolute left-[-10%] top-[-30%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />

                <div className="absolute bottom-[-30%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-blue-400">
                        <Factory className="h-8 w-8" />
                    </div>

                    <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                        <Sparkles className="h-3.5 w-3.5" />
                        Let's build something practical
                    </div>

                    <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Your next technology project can start with a conversation.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                        Whether you need 10 computers, a complete factory
                        network, custom business software, automation,
                        cybersecurity, cloud infrastructure or ongoing IT
                        support, start with what you are trying to accomplish.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a quote for a manufacturing or industrial technology project.",
                                    {
                                        Intent: "Request quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                        >
                            Request a Quote
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to talk to your team about our manufacturing or industrial technology requirements.",
                                    {
                                        Intent: "Talk to team",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white transition hover:bg-white/[0.08]"
                        >
                            Talk to Our Team
                            <MessageSquare className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-12 grid gap-3 text-left sm:grid-cols-3">
                        {[
                            [
                                PhoneCall,
                                "Discuss your requirement",
                                "Start with a conversation.",
                            ],
                            [
                                FileText,
                                "Define the project",
                                "Turn the requirement into a plan.",
                            ],
                            [
                                Settings2,
                                "Build and support",
                                "Implement and keep improving.",
                            ],
                        ].map(([Icon, title, text]) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                            >
                                <Icon className="h-5 w-5 text-blue-400" />

                                <div className="mt-4 text-sm font-bold text-white">
                                    {title}
                                </div>

                                <div className="mt-1 text-xs text-slate-500">
                                    {text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                FINAL INFORMATION BAR
            ========================================================== */}

            <section className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#050912]">
                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <Factory className="h-5 w-5" />
                                </div>

                                <div>
                                    <div className="font-black text-slate-950 dark:text-white">
                                        AB TECHNOLOGIES
                                    </div>

                                    <div className="text-xs text-slate-500">
                                        Technology. Simplified.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-xl text-sm leading-7 text-slate-500">
                            Technology procurement, infrastructure, software,
                            automation, security, cloud and managed IT
                            services for organizations building dependable
                            operations.
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a manufacturing or industrial technology project.",
                                    {
                                        Intent: "Start project",
                                    }
                                )
                            }
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                            Start a Project
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}