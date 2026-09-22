import React, { useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Building2,
    CalendarCheck2,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    ClipboardCheck,
    Cloud,
    Code2,
    Cpu,
    Database,
    Download,
    FileCheck2,
    FileText,
    GraduationCap,
    HardDrive,
    Headphones,
    Layers3,
    Laptop,
    LifeBuoy,
    LockKeyhole,
    Mail,
    MapPin,
    Monitor,
    Network,
    Package,
    PackageCheck,
    PhoneCall,
    Printer,
    RefreshCw,
    Router,
    Search,
    Server,
    Settings2,
    ShieldCheck,
    ShoppingCart,
    Smartphone,
    Sparkles,
    Target,
    Truck,
    Users,
    Wifi,
    Workflow,
    Wrench,
    XCircle,
    Zap,
} from "lucide-react";


/* ================================================================
   DATA
================================================================ */

const institutionTypes = [
    {
        icon: GraduationCap,
        title: "Schools & Universities",
        description:
            "Technology procurement for classrooms, laboratories, administration offices, libraries, computer centers, staff and students.",
        items: [
            "Student computers",
            "Staff workstations",
            "Computer laboratories",
            "Smart classroom equipment",
            "Networking equipment",
            "Printers and accessories",
        ],
    },
    {
        icon: Building2,
        title: "Government & Public Institutions",
        description:
            "Structured procurement support for public offices, departments, agencies and institutional technology programs.",
        items: [
            "Office computing",
            "Network infrastructure",
            "Servers and storage",
            "Communication equipment",
            "Security technology",
            "Deployment support",
        ],
    },
    {
        icon: Users,
        title: "NGOs & Nonprofits",
        description:
            "Practical technology procurement designed around organizational budgets, programs, field teams and operational requirements.",
        items: [
            "Staff devices",
            "Remote work equipment",
            "Connectivity",
            "Office infrastructure",
            "Software subscriptions",
            "Technology refreshes",
        ],
    },
    {
        icon: LifeBuoy,
        title: "Healthcare Organizations",
        description:
            "Technology sourcing for administrative, operational, communication and infrastructure requirements.",
        items: [
            "Workstations",
            "Networking",
            "Printers",
            "Servers",
            "Backup systems",
            "Communication tools",
        ],
    },
    {
        icon: Building2,
        title: "Religious Institutions",
        description:
            "Technology procurement for offices, media teams, education programs, administration and multi-location operations.",
        items: [
            "Office computers",
            "Media equipment",
            "Networking",
            "Displays",
            "Printers",
            "Communication systems",
        ],
    },
    {
        icon: GraduationCap,
        title: "Training & Research Centers",
        description:
            "Equipment and infrastructure procurement for laboratories, training environments, research teams and learning facilities.",
        items: [
            "Training computers",
            "Lab equipment",
            "Servers",
            "Networking",
            "Displays",
            "Storage systems",
        ],
    },
];

const procurementCategories = [
    {
        icon: Laptop,
        title: "Computers & Workstations",
        description:
            "Business laptops, desktops, workstations and specialized computing systems.",
        examples: [
            "Business laptops",
            "Desktop computers",
            "Professional workstations",
            "All-in-one computers",
            "Mini PCs",
            "Computer lab systems",
        ],
    },
    {
        icon: Monitor,
        title: "Displays & Accessories",
        description:
            "Monitors and essential accessories required to complete institutional workstations.",
        examples: [
            "Monitors",
            "Docking stations",
            "Keyboards",
            "Mice",
            "Webcams",
            "Headsets",
        ],
    },
    {
        icon: Network,
        title: "Networking Equipment",
        description:
            "Connectivity hardware for offices, campuses, branches and institutional facilities.",
        examples: [
            "Switches",
            "Routers",
            "Access points",
            "Firewalls",
            "Network accessories",
            "Connectivity equipment",
        ],
    },
    {
        icon: Server,
        title: "Servers & Storage",
        description:
            "Infrastructure equipment for applications, files, databases, backups and institutional systems.",
        examples: [
            "Rack servers",
            "Tower servers",
            "NAS systems",
            "Storage drives",
            "Backup systems",
            "Server accessories",
        ],
    },
    {
        icon: Printer,
        title: "Printing & Scanning",
        description:
            "Printing, scanning and document-management hardware for institutional environments.",
        examples: [
            "Laser printers",
            "Multifunction printers",
            "Scanners",
            "Consumables",
            "Print accessories",
            "Document equipment",
        ],
    },
    {
        icon: Smartphone,
        title: "Mobile Technology",
        description:
            "Mobile devices and accessories for staff, field teams, management and operational programs.",
        examples: [
            "Smartphones",
            "Tablets",
            "Mobile accessories",
            "Chargers",
            "Protective equipment",
            "Connectivity devices",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Security Technology",
        description:
            "Technology that helps institutions protect facilities, systems, users and information.",
        examples: [
            "Security systems",
            "Access technology",
            "Endpoint protection",
            "Network security",
            "Monitoring systems",
            "Identity solutions",
        ],
    },
    {
        icon: Cloud,
        title: "Software & Subscriptions",
        description:
            "Software licensing, cloud subscriptions and digital services required by institutional teams.",
        examples: [
            "Productivity software",
            "Cloud platforms",
            "Business applications",
            "Security software",
            "Collaboration tools",
            "Specialized software",
        ],
    },
];

const procurementStages = [
    {
        number: "01",
        icon: Search,
        title: "Requirement Discovery",
        description:
            "We understand exactly what the institution needs, why it needs it, who will use it, where it will be deployed and what outcomes are expected.",
    },
    {
        number: "02",
        icon: ClipboardCheck,
        title: "Specification",
        description:
            "We help translate requirements into clear technical specifications, quantities, configurations and acceptable product options.",
    },
    {
        number: "03",
        icon: BarChart3,
        title: "Sourcing",
        description:
            "We identify suitable products and sourcing options based on availability, specifications, budget, timelines and project requirements.",
    },
    {
        number: "04",
        icon: FileCheck2,
        title: "Quotation",
        description:
            "We prepare a structured commercial proposal showing the requested items, quantities, specifications and applicable service components.",
    },
    {
        number: "05",
        icon: BadgeCheck,
        title: "Verification",
        description:
            "Before fulfillment, product specifications, quantities, availability and other agreed requirements are reviewed.",
    },
    {
        number: "06",
        icon: PackageCheck,
        title: "Fulfillment",
        description:
            "Approved equipment is coordinated for procurement, preparation, delivery and, where applicable, deployment.",
    },
    {
        number: "07",
        icon: CheckCircle2,
        title: "Acceptance",
        description:
            "Delivered equipment can be checked against the agreed order, quantities, specifications and deployment requirements.",
    },
    {
        number: "08",
        icon: Headphones,
        title: "Lifecycle Support",
        description:
            "After procurement, we can continue with deployment, maintenance, support, upgrades, replacements and technology planning.",
    },
];

const procurementPrinciples = [
    {
        icon: Target,
        title: "Requirement First",
        description:
            "We begin with what the institution actually needs rather than forcing a product into the project.",
    },
    {
        icon: BadgeCheck,
        title: "Specification Driven",
        description:
            "Equipment is evaluated against agreed specifications, compatibility requirements and intended use.",
    },
    {
        icon: BarChart3,
        title: "Budget Conscious",
        description:
            "We consider the available budget while avoiding unnecessary compromises that create future problems.",
    },
    {
        icon: FileCheck2,
        title: "Documented",
        description:
            "Important procurement information can be organized into quotations, schedules, inventories and handover records.",
    },
    {
        icon: RefreshCw,
        title: "Lifecycle Minded",
        description:
            "We consider what happens after purchase, including deployment, support, maintenance and eventual replacement.",
    },
    {
        icon: ShieldCheck,
        title: "Security Aware",
        description:
            "Security considerations can be incorporated into device, network, software and infrastructure decisions.",
    },
];

const institutionalProjects = [
    {
        title: "Computer Laboratory",
        description:
            "Equip a learning environment with computers, displays, networking, power considerations, accessories and deployment support.",
        items: [
            "Student workstations",
            "Instructor workstation",
            "Network infrastructure",
            "Printing",
            "Software setup",
            "Deployment",
        ],
    },
    {
        title: "Administrative Office",
        description:
            "Create a complete office technology environment for administrators, finance teams, HR, management and support staff.",
        items: [
            "Business laptops",
            "Monitors",
            "Printers",
            "Networking",
            "Productivity software",
            "Security",
        ],
    },
    {
        title: "New Institutional Branch",
        description:
            "Support a new location from initial requirements through equipment sourcing, connectivity, deployment and handover.",
        items: [
            "Office equipment",
            "Network setup",
            "Internet infrastructure",
            "User devices",
            "Security",
            "Technical support",
        ],
    },
    {
        title: "Technology Refresh",
        description:
            "Replace aging technology systematically while reducing disruption to institutional operations.",
        items: [
            "Existing asset review",
            "Replacement planning",
            "New equipment",
            "Data migration",
            "User transition",
            "Old equipment disposition",
        ],
    },
];

const serviceAddOns = [
    {
        icon: Truck,
        title: "Delivery Coordination",
        description:
            "Coordinate delivery requirements and help organize equipment movement to the required location.",
    },
    {
        icon: Settings2,
        title: "Configuration",
        description:
            "Prepare and configure equipment before it reaches users where the project requires it.",
    },
    {
        icon: Network,
        title: "Network Installation",
        description:
            "Connect and configure network infrastructure as part of a broader institutional deployment.",
    },
    {
        icon: Code2,
        title: "Software Setup",
        description:
            "Install and configure agreed applications, productivity tools and required software.",
    },
    {
        icon: ShieldCheck,
        title: "Security Configuration",
        description:
            "Apply appropriate security settings and access controls to supported environments.",
    },
    {
        icon: GraduationCap,
        title: "User Training",
        description:
            "Help staff and designated users understand their new technology environment.",
    },
    {
        icon: FileText,
        title: "Documentation",
        description:
            "Create equipment schedules, deployment records, inventories and handover documentation.",
    },
    {
        icon: Headphones,
        title: "Ongoing Support",
        description:
            "Continue assisting the institution after the procurement and deployment stages.",
    },
];

const faqItems = [
    {
        question: "What makes institutional procurement different from normal buying?",
        answer:
            "Institutional procurement often involves larger quantities, multiple departments or locations, technical specifications, documentation, budgets, approval processes, deployment requirements and longer-term support. The objective is not simply to buy equipment but to make sure the technology works within the institution's operational environment.",
    },
    {
        question: "Can you procure equipment for an entire school or university?",
        answer:
            "Yes. Projects can cover computer laboratories, administration offices, classrooms, staff devices, networking, servers, printing, accessories, security technology and related deployment services.",
    },
    {
        question: "Can you work from our existing specification?",
        answer:
            "Yes. If your institution already has a bill of quantities, equipment list, technical specification or procurement request, we can work from it and help organize the sourcing and fulfillment process.",
    },
    {
        question: "Can you help us create the specification?",
        answer:
            "Yes. If you know what you want to achieve but do not have the technical specification, we can help translate the operational requirement into an equipment and technology specification.",
    },
    {
        question: "Can we request different options at different budgets?",
        answer:
            "Yes. A procurement proposal can be structured around different suitable configurations so decision-makers can compare options based on capability, quantity, budget and intended use.",
    },
    {
        question: "Do you only supply hardware?",
        answer:
            "No. Hardware can be combined with software, networking, deployment, configuration, security, cloud services, training, documentation and ongoing support.",
    },
    {
        question: "Can you handle procurement and deployment together?",
        answer:
            "Yes. Combining procurement with deployment can make the project easier to coordinate because the equipment can be prepared according to the actual implementation requirements.",
    },
    {
        question: "Can you support multiple locations?",
        answer:
            "Yes. Multi-location institutional projects can be organized around centralized procurement, standardized configurations, delivery schedules, deployment teams and consolidated documentation.",
    },
    {
        question: "Can you support technology after the warranty period?",
        answer:
            "Yes. Depending on the equipment and support arrangement, we can continue providing technical assistance, maintenance, troubleshooting, upgrades and replacement planning.",
    },
    {
        question: "Can institutions request a formal quotation?",
        answer:
            "Yes. The website's request process can be used to submit requirements for review and quotation. Larger projects can be handled as structured procurement engagements.",
    },
];


/* ================================================================
   SMALL COMPONENTS
================================================================ */

function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
}) {
    return (
        <div
            className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""
                }`}
        >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
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


function ProcurementCard({ item }) {
    const Icon = item.icon;

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-blue-500/40">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition group-hover:bg-blue-500/10" />

            <div className="relative">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Icon size={25} />
                    </div>

                    <ArrowUpRight
                        size={20}
                        className="text-slate-300 transition group-hover:text-blue-500 dark:text-slate-700"
                    />
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-950 dark:text-white">
                    {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                </p>

                <div className="mt-6 space-y-3">
                    {item.items.map((entry) => (
                        <div
                            key={entry}
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                        >
                            <CheckCircle2
                                size={17}
                                className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                            />
                            <span>{entry}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


/* ================================================================
   MAIN PAGE
================================================================ */

export default function InstitutionalProcurement() {
    const [openFaq, setOpenFaq] = useState(0);
    const [activeCategory, setActiveCategory] = useState(0);

    const activeProcurementCategory = procurementCategories[activeCategory];

    return (
        <main className=" mt-25 min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">

            {/* ========================================================
               HERO
            ======================================================== */}

            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="absolute right-[-120px] top-20 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-indigo-500/10" />

                    <div
                        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
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
                                <Building2 size={14} />
                                Institutional Procurement
                            </div>

                            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                                Technology procurement built for{" "}
                                <span className="text-blue-600 dark:text-blue-400">
                                    institutions.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                From schools and universities to public
                                institutions, NGOs, healthcare organizations,
                                training centers and large operational teams,
                                we help turn technology requirements into
                                structured procurement projects.
                            </p>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                We can help from the beginning — understanding
                                your requirements, defining specifications,
                                sourcing equipment, organizing fulfillment,
                                coordinating deployment and supporting the
                                technology after delivery.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="/request-quote"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    Request Institutional Quote
                                    <ArrowRight size={18} />
                                </a>

                                <a
                                    href="#procurement-process"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-900 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
                                >
                                    How It Works
                                    <ChevronRight size={18} />
                                </a>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-blue-600 dark:text-blue-400"
                                    />
                                    Multi-item procurement
                                </span>

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-blue-600 dark:text-blue-400"
                                    />
                                    Multi-location projects
                                </span>

                                <span className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-blue-600 dark:text-blue-400"
                                    />
                                    Deployment support
                                </span>
                            </div>
                        </div>

                        {/* Hero procurement dashboard */}

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-300/30 backdrop-blur dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/30">

                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">

                                    <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                                        <div>
                                            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                                Institutional Project
                                            </div>

                                            <div className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                                                Technology Procurement
                                            </div>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                            <ShoppingCart size={19} />
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        {[
                                            [
                                                "Employee Devices",
                                                "120 units",
                                                "Ready",
                                            ],
                                            [
                                                "Network Equipment",
                                                "18 units",
                                                "Reviewed",
                                            ],
                                            [
                                                "Printing",
                                                "12 units",
                                                "Ready",
                                            ],
                                            [
                                                "Software",
                                                "120 licenses",
                                                "Planned",
                                            ],
                                        ].map(([title, quantity, status]) => (
                                            <div
                                                key={title}
                                                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-2 w-2 rounded-full bg-blue-500" />

                                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                            {title}
                                                        </span>
                                                    </div>

                                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                                        {status}
                                                    </span>
                                                </div>

                                                <div className="mt-2 pl-5 text-xs text-slate-400">
                                                    {quantity}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white dark:bg-white dark:text-slate-950">
                                        <div className="flex items-center gap-3">
                                            <ClipboardCheck size={19} />

                                            <span className="font-bold">
                                                Procurement workflow
                                            </span>
                                        </div>

                                        <div className="mt-4 grid grid-cols-4 gap-2">
                                            {[
                                                "Need",
                                                "Spec",
                                                "Source",
                                                "Deliver",
                                            ].map((step, index) => (
                                                <div key={step}>
                                                    <div className="flex items-center">
                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-black dark:bg-slate-900/10">
                                                            {index + 1}
                                                        </div>

                                                        {index < 3 && (
                                                            <div className="h-px flex-1 bg-white/10 dark:bg-slate-900/10" />
                                                        )}
                                                    </div>

                                                    <div className="mt-2 text-[10px] opacity-60">
                                                        {step}
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


            {/* ========================================================
               TRUST STRIP
            ======================================================== */}

            <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-7 md:grid-cols-4">

                        {[
                            [
                                FileCheck2,
                                "Structured",
                                "Requirements, specifications and procurement information organized clearly.",
                            ],
                            [
                                BadgeCheck,
                                "Specification-focused",
                                "Products selected around actual requirements rather than guesswork.",
                            ],
                            [
                                PackageCheck,
                                "End-to-end",
                                "Procurement can connect directly into deployment and support.",
                            ],
                            [
                                Headphones,
                                "Long-term",
                                "Support does not have to end when equipment is delivered.",
                            ],
                        ].map(([Icon, title, text]) => (
                            <div
                                key={title}
                                className="flex gap-4"
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
                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* ========================================================
               INTRODUCTION
            ======================================================== */}

            <section className="relative py-24 lg:py-32">
                <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

                        <SectionHeading
                            eyebrow="More than a supplier"
                            title="Procurement should solve a technology requirement, not simply produce a delivery."
                            description="Institutions often need much more than a list of products. They need the right specifications, quantities, compatibility, deployment planning, documentation, user readiness and a clear path for support."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">

                            {procurementPrinciples.map((principle) => {
                                const Icon = principle.icon;

                                return (
                                    <div
                                        key={principle.title}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                                    >
                                        <Icon
                                            size={21}
                                            className="text-blue-600 dark:text-blue-400"
                                        />

                                        <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                                            {principle.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {principle.description}
                                        </p>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </section>


            {/* ========================================================
               WHO WE SERVE
            ======================================================== */}

            <section className="relative overflow-hidden bg-slate-100 py-24 dark:bg-slate-900/60 lg:py-32">

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Who we serve"
                        title="Built around the way institutions actually operate."
                        description="Different institutions have different technology requirements. Our procurement approach can be adapted to your organization, users, locations, budget and operational priorities."
                    />

                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {institutionTypes.map((item) => (
                            <ProcurementCard
                                key={item.title}
                                item={item}
                            />
                        ))}
                    </div>

                </div>
            </section>


            {/* ========================================================
               PROCUREMENT CATEGORIES
            ======================================================== */}

            <section className="py-24 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="What we can source"
                        title="A broad technology procurement portfolio."
                        description="From individual devices to complete infrastructure packages, institutional requirements can combine multiple technology categories into one coordinated procurement project."
                    />

                    <div className="mt-14 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">

                        <div className="space-y-2">
                            {procurementCategories.map((category, index) => {
                                const Icon = category.icon;

                                const active =
                                    activeCategory === index;

                                return (
                                    <button
                                        type="button"
                                        key={category.title}
                                        onClick={() =>
                                            setActiveCategory(index)
                                        }
                                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${active
                                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:border-blue-500/50 dark:bg-blue-500/10 dark:text-blue-400"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${active
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white"
                                                }`}
                                        >
                                            <Icon size={20} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="font-bold">
                                                {category.title}
                                            </div>

                                            <div className="mt-1 truncate text-xs opacity-60">
                                                {category.description}
                                            </div>
                                        </div>

                                        <ChevronRight
                                            size={18}
                                            className="shrink-0 opacity-50"
                                        />
                                    </button>
                                );
                            })}
                        </div>


                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-slate-900">

                            <div className="flex items-start justify-between gap-5">

                                <div>
                                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                        Procurement category
                                    </div>

                                    <h3 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                                        {activeProcurementCategory.title}
                                    </h3>
                                </div>

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    {React.createElement(
                                        activeProcurementCategory.icon,
                                        {
                                            size: 25,
                                        }
                                    )}
                                </div>

                            </div>

                            <p className="mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                                {activeProcurementCategory.description}
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {activeProcurementCategory.examples.map(
                                    (example) => (
                                        <div
                                            key={example}
                                            className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-white/[0.04] dark:text-slate-300"
                                        >
                                            <CheckCircle2
                                                size={17}
                                                className="text-blue-600 dark:text-blue-400"
                                            />
                                            {example}
                                        </div>
                                    )
                                )}

                            </div>

                            <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-5">
                                <div className="flex gap-3">
                                    <Sparkles
                                        size={19}
                                        className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                                    />

                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">
                                            Need help choosing the right
                                            configuration?
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            Tell us what your institution is
                                            trying to accomplish and how many
                                            users or locations are involved.
                                            We can help structure the
                                            requirement before procurement.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            {/* ========================================================
               PROJECT TYPES
            ======================================================== */}

            <section className="bg-slate-100 py-24 dark:bg-slate-900/60 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Project examples"
                        title="Procurement can be organized around the project you are actually trying to complete."
                        description="Instead of treating every item as a separate purchase, we can help structure technology requirements around a larger institutional objective."
                    />

                    <div className="mt-14 grid gap-6 md:grid-cols-2">

                        {institutionalProjects.map((project) => (
                            <div
                                key={project.title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                                            {project.title}
                                        </h3>

                                        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                            {project.description}
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        size={20}
                                        className="shrink-0 text-slate-300 dark:text-slate-700"
                                    />
                                </div>

                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {project.items.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                                        >
                                            <Check
                                                size={16}
                                                className="text-blue-600 dark:text-blue-400"
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* ========================================================
               FROM SCRATCH
            ======================================================== */}

            <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32">

                <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />

                <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-300">
                                <Sparkles size={14} />
                                Start from the beginning
                            </div>

                            <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
                                You don't need to know exactly what to buy.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                You can start with the problem rather than the
                                product. Tell us that you are opening a school
                                laboratory, equipping a new office, expanding
                                to another branch or replacing outdated
                                computers.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                We can help translate that requirement into a
                                practical technology plan and procurement list.
                            </p>

                            <a
                                href="/request-quote"
                                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:bg-slate-100"
                            >
                                Start With Your Requirement
                                <ArrowRight size={18} />
                            </a>

                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                [
                                    Search,
                                    "Tell us the objective",
                                    "Explain what your institution needs to accomplish.",
                                ],
                                [
                                    Settings2,
                                    "We structure it",
                                    "Turn the objective into technology requirements.",
                                ],
                                [
                                    ShoppingCart,
                                    "We source it",
                                    "Identify suitable equipment and technology options.",
                                ],
                                [
                                    PackageCheck,
                                    "We fulfill it",
                                    "Coordinate approved procurement and delivery.",
                                ],
                                [
                                    Network,
                                    "We deploy it",
                                    "Connect and configure the technology where required.",
                                ],
                                [
                                    Headphones,
                                    "We support it",
                                    "Remain available after implementation.",
                                ],
                            ].map(([Icon, title, text]) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                                >
                                    <Icon
                                        size={22}
                                        className="text-blue-400"
                                    />

                                    <h3 className="mt-5 font-bold">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>


            {/* ========================================================
               PROCESS
            ======================================================== */}

            <section
                id="procurement-process"
                className="py-24 lg:py-32"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Our process"
                        title="A structured path from requirement to deployment."
                        description="Institutional procurement can involve many moving parts. A clear process makes it easier to understand what is happening at each stage and what needs to happen next."
                    />

                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {procurementStages.map((stage) => {
                            const Icon = stage.icon;

                            return (
                                <div
                                    key={stage.number}
                                    className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-black tracking-widest text-blue-600 dark:text-blue-400">
                                            {stage.number}
                                        </span>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                            <Icon size={21} />
                                        </div>
                                    </div>

                                    <h3 className="mt-7 text-xl font-bold text-slate-950 dark:text-white">
                                        {stage.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {stage.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>


            {/* ========================================================
               BULK / MULTI LOCATION
            ======================================================== */}

            <section className="bg-slate-100 py-24 dark:bg-slate-900/60 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-slate-950 sm:p-12 lg:p-16">

                        <div className="grid gap-14 lg:grid-cols-[1fr_.8fr] lg:items-center">

                            <div>

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                    <Layers3 size={26} />
                                </div>

                                <h2 className="mt-7 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                    Built for large quantities and multiple locations.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Institutional technology projects often
                                    involve more than one department, office,
                                    branch, campus or facility. We can help
                                    organize the procurement around quantities,
                                    locations and deployment schedules.
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                    {[
                                        "Centralized requirements",
                                        "Department-level quantities",
                                        "Location-based schedules",
                                        "Standardized configurations",
                                        "Asset and serial tracking",
                                        "Delivery coordination",
                                        "Deployment planning",
                                        "Consolidated documentation",
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
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]">

                                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                    Example project structure
                                </div>

                                <div className="mt-6 space-y-3">

                                    {[
                                        ["Head Office", "65 devices"],
                                        ["Branch A", "30 devices"],
                                        ["Branch B", "20 devices"],
                                        ["Training Center", "40 devices"],
                                        ["Network Infrastructure", "Central"],
                                    ].map(([location, quantity]) => (
                                        <div
                                            key={location}
                                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-slate-900"
                                        >
                                            <div className="flex items-center gap-3">
                                                <MapPin
                                                    size={17}
                                                    className="text-blue-600 dark:text-blue-400"
                                                />

                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    {location}
                                                </span>
                                            </div>

                                            <span className="text-sm font-black text-slate-950 dark:text-white">
                                                {quantity}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                                <div className="mt-5 rounded-xl bg-blue-500/10 p-4 text-sm leading-6 text-blue-700 dark:text-blue-300">
                                    Large procurement projects can be
                                    structured into phases instead of requiring
                                    everything to happen at once.
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* ========================================================
               ADD-ON SERVICES
            ======================================================== */}

            <section className="py-24 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Beyond procurement"
                        title="Connect procurement with implementation."
                        description="Buying technology is only one part of the project. Where required, procurement can be combined with technical services so your institution receives technology that is ready to use."
                    />

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {serviceAddOns.map((service) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={service.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-6 font-bold text-slate-950 dark:text-white">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>


            {/* ========================================================
               PROCUREMENT CHECKLIST
            ======================================================== */}

            <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32">

                <div className="absolute inset-0 opacity-30">
                    <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-300">
                                <ClipboardCheck size={14} />
                                Before you purchase
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                A better procurement conversation starts with the right questions.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                The cheapest device is not always the lowest-cost
                                solution. Institutional procurement should also
                                consider compatibility, lifecycle, support,
                                deployment effort, security and the actual
                                requirements of the users.
                            </p>

                        </div>

                        <div className="space-y-3">

                            {[
                                "Who will use the equipment?",
                                "What applications will they run?",
                                "How many users are involved?",
                                "Are there multiple locations?",
                                "What network infrastructure is required?",
                                "Does existing equipment need to integrate?",
                                "What security requirements apply?",
                                "How will devices be deployed?",
                                "What documentation is required?",
                                "What support is needed after delivery?",
                            ].map((question, index) => (
                                <div
                                    key={question}
                                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-black text-blue-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <span className="text-sm leading-6 text-slate-300">
                                        {question}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </section>


            {/* ========================================================
               DOCUMENTATION
            ======================================================== */}

            <section className="py-24 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">

                        <div>

                            <SectionHeading
                                eyebrow="Procurement documentation"
                                title="Make the project easier to understand, approve and manage."
                                description="Institutions often need more than a verbal conversation. We can structure procurement information into practical documents that make requirements, quantities, specifications and fulfillment easier to review."
                            />

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {[
                                    "Requirement summaries",
                                    "Product specifications",
                                    "Quotation documents",
                                    "Equipment schedules",
                                    "Quantity breakdowns",
                                    "Asset inventories",
                                    "Deployment records",
                                    "Handover documents",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
                                    >
                                        <FileCheck2
                                            size={17}
                                            className="text-blue-600 dark:text-blue-400"
                                        />
                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>


                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-slate-900">

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <FileText size={22} />
                                </div>

                                <div>
                                    <div className="font-bold text-slate-950 dark:text-white">
                                        Institutional Procurement
                                        Schedule
                                    </div>

                                    <div className="text-xs text-slate-500">
                                        Example structure
                                    </div>
                                </div>

                            </div>

                            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">

                                <div className="grid grid-cols-[1fr_auto] border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:border-white/10 dark:bg-white/[0.03]">
                                    <span>Category</span>
                                    <span>Qty.</span>
                                </div>

                                {[
                                    ["Business laptops", "80"],
                                    ["Desktop computers", "40"],
                                    ["Monitors", "60"],
                                    ["Network switches", "8"],
                                    ["Wireless access points", "18"],
                                    ["Printers", "12"],
                                ].map(([category, quantity]) => (
                                    <div
                                        key={category}
                                        className="grid grid-cols-[1fr_auto] border-b border-slate-200 px-4 py-4 text-sm last:border-0 dark:border-white/10"
                                    >
                                        <span className="text-slate-600 dark:text-slate-300">
                                            {category}
                                        </span>

                                        <span className="font-bold text-slate-950 dark:text-white">
                                            {quantity}
                                        </span>
                                    </div>
                                ))}

                            </div>

                            <div className="mt-5 flex items-center gap-3 rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-400">
                                <CheckCircle2 size={17} />
                                Requirements can be organized by category,
                                quantity and location.
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            {/* ========================================================
               TECHNOLOGY LIFECYCLE
            ======================================================== */}

            <section className="bg-slate-100 py-24 dark:bg-slate-900/60 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Technology lifecycle"
                        title="Procurement is the beginning of the technology lifecycle."
                        description="A well-managed technology environment needs attention after purchase. We can help institutions think beyond acquisition and plan for deployment, support, upgrades and eventual replacement."
                    />

                    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">

                        {[
                            [
                                ShoppingCart,
                                "Acquire",
                                "Source suitable technology.",
                            ],
                            [
                                Settings2,
                                "Deploy",
                                "Configure and implement.",
                            ],
                            [
                                ShieldCheck,
                                "Protect",
                                "Apply security controls.",
                            ],
                            [
                                Headphones,
                                "Support",
                                "Maintain operational continuity.",
                            ],
                            [
                                RefreshCw,
                                "Refresh",
                                "Plan future upgrades and replacement.",
                            ],
                        ].map(([Icon, title, text], index) => (
                            <div
                                key={title}
                                className="relative rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900"
                            >
                                <div className="text-xs font-black text-blue-600 dark:text-blue-400">
                                    0{index + 1}
                                </div>

                                <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <Icon size={21} />
                                </div>

                                <h3 className="mt-5 font-bold text-slate-950 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* ========================================================
               SUPPORT AFTER PROCUREMENT
            ======================================================== */}

            <section className="py-24 lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.06] via-white to-cyan-500/[0.04] p-8 dark:from-blue-500/[0.08] dark:via-slate-900 dark:to-indigo-500/[0.05] sm:p-12 lg:p-16">

                        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                            <div>

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                    <Headphones size={26} />
                                </div>

                                <h2 className="mt-7 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                                    The relationship doesn't have to end after delivery.
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Once equipment reaches your institution,
                                    your users still need technology to work.
                                    We can continue supporting the environment
                                    through technical assistance, maintenance,
                                    troubleshooting, upgrades and future
                                    procurement.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {[
                                        "Troubleshooting",
                                        "Maintenance",
                                        "Upgrades",
                                        "User support",
                                        "Infrastructure support",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {[
                                    [
                                        Wrench,
                                        "Technical Assistance",
                                        "Help diagnose and resolve technology problems.",
                                    ],
                                    [
                                        RefreshCw,
                                        "Technology Refresh",
                                        "Plan future replacements and upgrades.",
                                    ],
                                    [
                                        ShieldCheck,
                                        "Security",
                                        "Review and improve supported technology environments.",
                                    ],
                                    [
                                        BarChart3,
                                        "IT Planning",
                                        "Help align future purchases with institutional priorities.",
                                    ],
                                ].map(([Icon, title, text]) => (
                                    <div
                                        key={title}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900"
                                    >
                                        <Icon
                                            size={21}
                                            className="text-blue-600 dark:text-blue-400"
                                        />

                                        <h3 className="mt-4 font-bold text-slate-950 dark:text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* ========================================================
               WHY US
            ======================================================== */}

            <section className="bg-slate-950 py-24 text-white lg:py-32">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Why work with us"
                        title="One coordinated approach to institutional technology."
                        description="When procurement, implementation and support are considered together, institutions can make better technology decisions and create a clearer path from purchase to productive use."
                    />

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            [
                                Search,
                                "Understand",
                                "We start with the institution's actual requirements.",
                            ],
                            [
                                Target,
                                "Recommend",
                                "We help connect requirements to appropriate technology.",
                            ],
                            [
                                PackageCheck,
                                "Deliver",
                                "We coordinate the approved procurement process.",
                            ],
                            [
                                Headphones,
                                "Support",
                                "We remain available for the technology lifecycle.",
                            ],
                        ].map(([Icon, title, text]) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                            >
                                <Icon
                                    size={23}
                                    className="text-blue-400"
                                />

                                <h3 className="mt-6 text-lg font-bold">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* ========================================================
               FAQ
            ======================================================== */}

            <section className="py-24 lg:py-32">

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Frequently asked questions"
                        title="Questions institutions often ask."
                        description="If your procurement requirement is more complex, you can also submit the project details directly and we can structure the next conversation around your specific needs."
                        align="center"
                    />

                    <div className="mt-12 space-y-3">

                        {faqItems.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen ? -1 : index
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold text-slate-950 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={19}
                                            className={`shrink-0 text-slate-400 transition ${isOpen
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-200 px-6 py-5 dark:border-white/10">
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


            {/* ========================================================
               REQUEST INFORMATION
            ======================================================== */}

            <section className="border-y border-slate-200 bg-slate-100 py-20 dark:border-white/10 dark:bg-slate-900/60">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-8 md:grid-cols-3">

                        {[
                            [
                                Building2,
                                "Institution",
                                "Tell us what type of institution or organization you represent.",
                            ],
                            [
                                Package,
                                "Requirement",
                                "Tell us what you need, including quantities, locations and timelines where known.",
                            ],
                            [
                                CalendarCheck2,
                                "Timeline",
                                "Let us know when the technology needs to be available or deployed.",
                            ],
                        ].map(([Icon, title, text]) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-900"
                            >
                                <Icon
                                    size={23}
                                    className="text-blue-600 dark:text-blue-400"
                                />

                                <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* ========================================================
               FINAL CTA
            ======================================================== */}

            <section
                id="contact"
                className="relative overflow-hidden py-24 lg:py-32"
            >

                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.08] via-transparent to-cyan-500/[0.08] dark:from-blue-500/[0.08] dark:to-indigo-500/[0.08]" />

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                        <Building2 size={29} />
                    </div>

                    <h2 className="mt-7 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                        Have an institutional technology requirement?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                        Start with what you are trying to accomplish. You don't
                        need to have every specification figured out before
                        contacting us. Give us the institution type, project
                        objective, approximate quantities and timeline, and we
                        can help structure the procurement conversation.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                        <a
                            href="/request-quote"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
                        >
                            Request a Procurement Quote
                            <ArrowRight size={18} />
                        </a>

                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-900 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            Talk to Our Team
                            <PhoneCall size={18} />
                        </a>

                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-500 dark:text-slate-400">

                        <span className="flex items-center gap-2">
                            <CheckCircle2
                                size={16}
                                className="text-blue-600"
                            />
                            Schools & universities
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2
                                size={16}
                                className="text-blue-600"
                            />
                            Public institutions
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2
                                size={16}
                                className="text-blue-600"
                            />
                            NGOs & organizations
                        </span>

                        <span className="flex items-center gap-2">
                            <CheckCircle2
                                size={16}
                                className="text-blue-600"
                            />
                            Multi-location projects
                        </span>

                    </div>
                </div>
            </section>

        </main>
    );
}