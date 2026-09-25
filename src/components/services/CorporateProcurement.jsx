import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Boxes,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    ClipboardCheck,
    Clock3,
    Cloud,
    Code2,
    CreditCard,
    FileCheck2,
    FileSpreadsheet,
    Globe2,
    Headphones,
    Layers3,
    LifeBuoy,
    Mail,
    MapPin,
    Package,
    PackageCheck,
    Percent,
    Phone,
    Printer,
    RefreshCw,
    Search,
    Send,
    Settings2,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Truck,
    Users,
    WalletCards,
    Workflow,
    X,
    Zap,
} from "lucide-react";
import SEO from "../SEO";
import { queueSupportRequest } from "../AI";
<SEO
    title="Corporate IT Procurement & Technology Sourcing"
    description="Corporate technology procurement, vendor sourcing, hardware supply and IT equipment acquisition services for organizations."
    path="/services/corporate-procurement"
/>
const procurementCategories = [
    {
        icon: Boxes,
        title: "Computers & Workstations",
        description:
            "Corporate laptops, desktops, workstations, monitors, docking stations, accessories and complete employee computing setups.",
        items: [
            "Business laptops",
            "Desktop computers",
            "Engineering workstations",
            "Monitors & displays",
            "Docking stations",
            "Keyboards & mice",
            "Webcams & headsets",
            "Power accessories",
        ],
    },
    {
        icon: Network,
        title: "Networking Equipment",
        description:
            "Enterprise-grade networking equipment for offices, branches, campuses, warehouses and distributed organizations.",
        items: [
            "Routers",
            "Managed switches",
            "Wireless access points",
            "Firewalls",
            "Network racks",
            "Patch panels",
            "SFP modules",
            "Network accessories",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Security & Access",
        description:
            "Technology procurement for physical security, access control, monitoring and organizational protection.",
        items: [
            "CCTV systems",
            "IP cameras",
            "NVR systems",
            "Access control",
            "Biometric devices",
            "Intercom systems",
            "Door controllers",
            "Security accessories",
        ],
    },
    {
        icon: Printer,
        title: "Office Technology",
        description:
            "Everything organizations need to equip modern offices, administrative departments and operational teams.",
        items: [
            "Printers",
            "Scanners",
            "Projectors",
            "Conference displays",
            "UPS systems",
            "Power backup",
            "Office peripherals",
            "Presentation equipment",
        ],
    },
    {
        icon: Server,
        title: "Servers & Data Infrastructure",
        description:
            "Procurement of server hardware, storage, backup systems and infrastructure components for business environments.",
        items: [
            "Rack servers",
            "Tower servers",
            "NAS systems",
            "Storage arrays",
            "Backup hardware",
            "Server memory",
            "Enterprise drives",
            "Rack accessories",
        ],
    },
    {
        icon: Smartphone,
        title: "Mobile & Field Devices",
        description:
            "Devices for mobile employees, field teams, sales teams, logistics operations and distributed workforces.",
        items: [
            "Business smartphones",
            "Tablets",
            "Rugged devices",
            "Mobile accessories",
            "Portable printers",
            "Barcode devices",
            "POS equipment",
            "Charging systems",
        ],
    },
];

const procurementStages = [
    {
        number: "01",
        title: "Tell us what you need",
        description:
            "Send us a specification, product list, quantity, budget range or simply explain the business problem you need solved.",
        icon: Send,
    },
    {
        number: "02",
        title: "Requirement analysis",
        description:
            "We review your requirements, identify gaps, clarify specifications and determine the right procurement strategy.",
        icon: Search,
    },
    {
        number: "03",
        title: "Sourcing & verification",
        description:
            "We identify suitable brands, distributors and supply channels while evaluating availability, specifications and commercial suitability.",
        icon: ShieldCheck,
    },
    {
        number: "04",
        title: "Quote & comparison",
        description:
            "You receive a structured commercial proposal showing quantities, specifications, pricing, lead times and relevant terms.",
        icon: FileSpreadsheet,
    },
    {
        number: "05",
        title: "Approval & ordering",
        description:
            "Once approved, we coordinate the order, documentation and procurement process according to the agreed scope.",
        icon: ClipboardCheck,
    },
    {
        number: "06",
        title: "Delivery & coordination",
        description:
            "We coordinate delivery, receiving, quantity checks and the required handover documentation.",
        icon: Truck,
    },
    {
        number: "07",
        title: "Deployment support",
        description:
            "Where required, procurement can be combined with installation, configuration, networking, software and deployment services.",
        icon: Settings2,
    },
    {
        number: "08",
        title: "After-sales support",
        description:
            "We remain available for support coordination, warranty matters, replacement requirements and future procurement.",
        icon: LifeBuoy,
    },
];

const businessSizes = [
    {
        icon: Building2,
        title: "Small & Growing Businesses",
        description:
            "Equip your team professionally without spending time searching through dozens of vendors.",
        points: [
            "Complete office setup",
            "Employee laptops",
            "Networking",
            "Printers & accessories",
            "Software requirements",
        ],
    },
    {
        icon: Users,
        title: "Mid-Sized Organizations",
        description:
            "Standardize devices and procurement across departments while keeping purchasing organized.",
        points: [
            "Multi-device procurement",
            "Departmental requirements",
            "Standardized specifications",
            "Branch deployments",
            "Replacement programs",
        ],
    },
    {
        icon: Globe2,
        title: "Large Organizations",
        description:
            "Coordinate high-volume procurement programs with structured documentation and operational support.",
        points: [
            "Large-volume orders",
            "Multi-location delivery",
            "Standardization",
            "Procurement schedules",
            "Asset coordination",
        ],
    },
    {
        icon: GraduationCap,
        title: "Schools & Institutions",
        description:
            "Equip classrooms, laboratories, administrative offices and learning environments.",
        points: [
            "Computer labs",
            "Staff devices",
            "Smart classroom equipment",
            "Networking",
            "Printing & accessories",
        ],
    },
];

const benefits = [
    {
        icon: Clock3,
        title: "Save procurement time",
        description:
            "Instead of contacting multiple suppliers for every item, use one coordinated procurement partner.",
    },
    {
        icon: BadgeCheck,
        title: "Specification-focused sourcing",
        description:
            "We focus on the exact configuration your organization needs rather than simply finding the cheapest device.",
    },
    {
        icon: BarChart3,
        title: "Commercial comparison",
        description:
            "Compare options based on specification, availability, warranty, lead time and total commercial value.",
    },
    {
        icon: Layers3,
        title: "One coordinated scope",
        description:
            "Hardware, software, networking, security and deployment can be handled as one connected technology project.",
    },
    {
        icon: FileCheck2,
        title: "Clear documentation",
        description:
            "Keep your procurement process organized with quotations, specifications, invoices and delivery documentation.",
    },
    {
        icon: RefreshCw,
        title: "Repeat procurement",
        description:
            "Establish repeat purchasing processes for new hires, replacements, branches and recurring technology needs.",
    },
];

const procurementModels = [
    {
        title: "Single Project",
        label: "For immediate requirements",
        description:
            "Ideal when you need a defined quantity of equipment for a particular office, project, department or deployment.",
        icon: PackageCheck,
    },
    {
        title: "Bulk Procurement",
        label: "For larger quantities",
        description:
            "Suitable for organizations purchasing dozens, hundreds or more devices and technology products.",
        icon: Boxes,
    },
    {
        title: "Scheduled Procurement",
        label: "For recurring needs",
        description:
            "Plan technology purchasing around hiring cycles, expansion plans, branch openings and replacement schedules.",
        icon: Workflow,
    },
    {
        title: "End-to-End Project",
        label: "For complete deployments",
        description:
            "Combine procurement with networking, software, security, installation, configuration and ongoing support.",
        icon: Zap,
    },
];

const industries = [
    "Corporate offices",
    "Schools & universities",
    "Healthcare organizations",
    "Financial services",
    "Retail businesses",
    "Hospitality",
    "Manufacturing",
    "Construction",
    "Logistics",
    "Professional services",
    "Government & institutions",
    "Non-profit organizations",
];

const faqs = [
    {
        question: "Can you handle large quantities?",
        answer:
            "Yes. Our corporate and bulk procurement service is designed for organizations purchasing multiple units across one or several technology categories. We can structure the requirement by quantity, specification, department, location and delivery schedule.",
    },
    {
        question: "Do I need to know the exact product I want?",
        answer:
            "No. You can provide an exact model, a technical specification, a budget or simply describe what your employees or organization need to accomplish. We can help translate the requirement into a practical procurement specification.",
    },
    {
        question: "Can you source different brands?",
        answer:
            "Yes. We can work with brand-specific requirements or compare suitable alternatives. The appropriate choice depends on your budget, specification, availability, warranty requirements and deployment environment.",
    },
    {
        question: "Can you supply more than computers?",
        answer:
            "Yes. Corporate procurement can cover computers, networking equipment, servers, storage, printers, security equipment, mobile devices, office technology, accessories and other technology-related requirements.",
    },
    {
        question: "Can procurement include installation?",
        answer:
            "Yes. Procurement can be combined with our other technology services. Depending on the project, we can coordinate installation, configuration, networking, software deployment, security setup and technical support.",
    },
    {
        question: "Can you handle recurring purchases?",
        answer:
            "Yes. Recurring procurement can be structured around employee onboarding, replacement cycles, branch expansion, project milestones or other predictable purchasing requirements.",
    },
    {
        question: "Can I send you my own list?",
        answer:
            "Absolutely. You can send a spreadsheet, quotation, specification document, product list or simple message. We can review the requirement and help organize it into a procurement-ready scope.",
    },
    {
        question: "Do you support organizations outside my city?",
        answer:
            "We can coordinate procurement and delivery requirements across locations depending on the product, supplier and logistics arrangement. For multi-location deployments, the delivery schedule can be planned as part of the project.",
    },
];

function Network(props) {
    return <Workflow {...props} />;
}

function Server(props) {
    return <Cloud {...props} />;
}

function Smartphone(props) {
    return <Phone {...props} />;
}

function GraduationCap(props) {
    return <Building2 {...props} />;
}

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
            {eyebrow && (
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-300" />
                    {eyebrow}
                </div>
            )}

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                {title}
            </h2>

            {description && (
                <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                    {description}
                </p>
            )}
        </div>
    );
}

function StatCard({ value, label }) {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
            <div className="text-2xl font-black text-slate-950 dark:text-white">
                {value}
            </div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {label}
            </div>
        </div>
    );
}

export default function CorporateBulkProcurement() {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState(0);
    const [activeModel, setActiveModel] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);
    const [quantity, setQuantity] = useState(25);
    const [showQuoteForm, setShowQuoteForm] = useState(false);

    const selectedCategory = procurementCategories[activeCategory];

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
                "I'd like to discuss corporate or bulk technology procurement.",
            metadata: metadata || {
                Source: "Corporate & Bulk Procurement",
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
        const company = formData.get("company") || "";
        const email = formData.get("email") || "";
        const phone = formData.get("phone") || "";
        const details = formData.get("details") || "";
        const estimatedQuantity = formData.get("quantity") || quantity;
        const procurementType = formData.get("procurementType") || "";
        const includesHardware = formData.get("hardware") === "on";
        const includesSoftware = formData.get("software") === "on";
        const includesInfrastructure =
            formData.get("infrastructure") === "on";

        const lines = [
            "I'd like to request a corporate procurement quote.",
            "",
        ];

        if (estimatedQuantity) {
            lines.push(`Estimated quantity: ${estimatedQuantity}`);
        }

        if (procurementType) {
            lines.push(`Procurement type: ${procurementType}`);
        }

        const scopeItems = [];
        if (includesHardware) scopeItems.push("Hardware");
        if (includesSoftware) scopeItems.push("Software");
        if (includesInfrastructure) scopeItems.push("Infrastructure");
        if (scopeItems.length) {
            lines.push(`Scope: ${scopeItems.join(", ")}`);
        }

        if (company) {
            lines.push("", `Company: ${company}`);
        }

        if (details) {
            lines.push("", "Requirements:", details);
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
            Source: "Corporate & Bulk Procurement",
            "Procurement type": procurementType || "Not specified",
            Quantity: estimatedQuantity || "Not specified",
            Scope: scopeItems.length
                ? scopeItems.join(", ")
                : "Not specified",
            Company: company || "Not specified",
            Contact:
                name || email || phone ? "Provided" : "Not provided",
        };

        queueSupportRequest({
            message: lines.filter(Boolean).join("\n"),
            metadata,
        });

        setShowQuoteForm(false);
        navigate("/support/ai");
    };

    return (
        <main className="mt-25 min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
            {/* =========================================================
                HERO
            ========================================================== */}

            <section className="relative isolate overflow-hidden border-b border-slate-200/70 dark:border-white/10">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_28%),linear-gradient(135deg,#f8fafc,#eef6ff_48%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.14),transparent_28%),linear-gradient(135deg,#020617,#07152c_48%,#020617)]" />

                <div className="absolute left-0 top-32 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-0 top-20 -z-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-xl dark:border-blue-400/20 dark:bg-white/[0.05] dark:text-blue-300">
                                <Boxes className="h-4 w-4" />
                                Corporate & Bulk Procurement
                            </div>

                            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Equip your organization without turning
                                procurement into another full-time job.
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                From a few employee laptops to large-scale
                                corporate deployments, we help you source,
                                compare, coordinate and procure the technology
                                your organization needs — with the option to
                                combine procurement with implementation and
                                technical services.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to request a procurement quote for my organization.",
                                            {
                                                Source:
                                                    "Corporate & Bulk Procurement",
                                                Intent:
                                                    "Procurement quote",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                >
                                    Request a Procurement Quote
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </button>

                                <a
                                    href="#how-it-works"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09]"
                                >
                                    See How It Works
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                                <StatCard value="1 → 1000+" label="Units & projects" />
                                <StatCard value="Multi-brand" label="Sourcing options" />
                                <StatCard value="End-to-end" label="Technology support" />
                                <StatCard value="B2B" label="Business focused" />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">
                                                Procurement Workspace
                                            </p>
                                            <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                                                Corporate Technology Order
                                            </h3>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <ShoppingCart className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        {[
                                            ["Business laptops", "120 units", "Verified"],
                                            ["27” monitors", "120 units", "Available"],
                                            ["Docking stations", "120 units", "Sourcing"],
                                            ["Network switches", "12 units", "Verified"],
                                            ["UPS systems", "24 units", "Available"],
                                        ].map(([name, qty, status]) => (
                                            <div
                                                key={name}
                                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]"
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                                        <Package className="h-4 w-4" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                                                            {name}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            {qty}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                                                    {status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 dark:bg-blue-400/5">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                    One coordinated requirement
                                                </p>
                                                <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                    Procurement, delivery,
                                                    deployment and support can
                                                    be planned together.
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
                INTRO
            ========================================================== */}

            <section className="relative py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.07),transparent_30%)] dark:bg-[radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.08),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
                        <SectionHeading
                            eyebrow="More than buying equipment"
                            title="Procurement should support the business, not create another operational headache."
                            description="Technology purchases become complicated when specifications, quantities, suppliers, delivery schedules, warranties and deployment requirements are handled separately."
                        />

                        <div className="grid gap-5 sm:grid-cols-2">
                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;

                                return (
                                    <button
                                        type="button"
                                        key={benefit.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss: ${benefit.title} — ${benefit.description}`,
                                                {
                                                    Source:
                                                        "Corporate & Bulk Procurement",
                                                    Benefit:
                                                        benefit.title,
                                                }
                                            )
                                        }
                                        className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition group-hover:scale-105 dark:bg-blue-400/10 dark:text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                            {benefit.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
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
                PROCUREMENT CATEGORIES
            ========================================================== */}

            <section className="relative border-y border-slate-200/70 bg-white py-20 lg:py-28 dark:border-white/10 dark:bg-slate-900/40">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="What we can procure"
                        title="A complete technology procurement scope."
                        description="You do not have to coordinate separate suppliers for every technology category. Build one requirement and let the procurement scope cover the connected pieces."
                    />

                    <div className="mt-12 grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
                        <div className="space-y-2">
                            {procurementCategories.map((category, index) => {
                                const Icon = category.icon;
                                const active = index === activeCategory;

                                return (
                                    <button
                                        key={category.title}
                                        type="button"
                                        onClick={() =>
                                            setActiveCategory(index)
                                        }
                                        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${active
                                            ? "border-blue-500/30 bg-blue-500/10 shadow-sm"
                                            : "border-transparent bg-slate-100/60 hover:border-slate-200 hover:bg-white dark:bg-white/[0.025] dark:hover:border-white/10 dark:hover:bg-white/[0.05]"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${active
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-slate-500 dark:bg-white/10 dark:text-slate-300"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-slate-900 dark:text-white">
                                                {category.title}
                                            </p>
                                            <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                                                {category.description}
                                            </p>
                                        </div>

                                        <ChevronRight
                                            className={`h-4 w-4 ${active
                                                ? "text-blue-600 dark:text-blue-300"
                                                : "text-slate-400"
                                                }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-slate-950/70 lg:p-10">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                <div className="max-w-2xl">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                        <selectedCategory.icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">
                                        {selectedCategory.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                        {selectedCategory.description}
                                    </p>
                                </div>

                                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                                    Procurement scope
                                </span>
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {selectedCategory.items.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss procurement for ${selectedCategory.title.toLowerCase()}.`,
                                        {
                                            Source:
                                                "Corporate & Bulk Procurement",
                                            Category:
                                                selectedCategory.title,
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                            >
                                Discuss this procurement category
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                BUSINESS SIZES
            ========================================================== */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Built for different organizations"
                        title="Whether you need 5 devices or a company-wide rollout."
                        description="Procurement requirements are different for every organization. We structure the engagement around your actual operational needs."
                        align="center"
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {businessSizes.map((business) => {
                            const Icon = business.icon;

                            return (
                                <button
                                    type="button"
                                    key={business.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'm interested in procurement for ${business.title.toLowerCase()}. ${business.description}`,
                                            {
                                                Source:
                                                    "Corporate & Bulk Procurement",
                                                "Organization type":
                                                    business.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">
                                        {business.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {business.description}
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {business.points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                                            >
                                                <Check className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                                                {point}
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
                PROCUREMENT MODELS
            ========================================================== */}

            <section className="border-y border-slate-200/70 bg-slate-100/60 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
                        <SectionHeading
                            eyebrow="Flexible procurement models"
                            title="Choose the procurement structure that fits your organization."
                            description="Not every technology purchase needs the same process. We can support immediate purchases, bulk projects, recurring requirements and complete deployments."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {procurementModels.map((model, index) => {
                                const Icon = model.icon;
                                const active = index === activeModel;

                                return (
                                    <button
                                        type="button"
                                        key={model.title}
                                        onClick={() => {
                                            setActiveModel(index);
                                            startSupportChat(
                                                `I'm interested in ${model.title.toLowerCase()} procurement. ${model.description}`,
                                                {
                                                    Source:
                                                        "Corporate & Bulk Procurement",
                                                    "Procurement model":
                                                        model.title,
                                                }
                                            );
                                        }}
                                        className={`rounded-2xl border p-6 text-left transition ${active
                                            ? "border-blue-500/30 bg-white shadow-lg dark:bg-white/[0.06]"
                                            : "border-slate-200 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.05]"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            {active && (
                                                <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                                    Selected
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                            {model.title}
                                        </h3>

                                        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
                                            {model.label}
                                        </p>

                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {model.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                HOW IT WORKS
            ========================================================== */}

            <section
                id="how-it-works"
                className="relative py-20 lg:py-28"
            >
                <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="How it works"
                        title="From requirement to delivery — one coordinated process."
                        description="We help turn an idea, spreadsheet or technical specification into a procurement project that can actually be executed."
                        align="center"
                    />

                    <div className="relative mt-14">
                        <div className="absolute left-[22px] top-4 hidden h-[calc(100%-30px)] w-px bg-gradient-to-b from-blue-500 via-slate-300 to-transparent dark:via-white/20 lg:block" />

                        <div className="space-y-6">
                            {procurementStages.map((stage) => {
                                const Icon = stage.icon;

                                return (
                                    <div
                                        key={stage.number}
                                        className="relative grid gap-5 lg:grid-cols-[70px_1fr]"
                                    >
                                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <span className="text-xs font-black tracking-widest text-blue-600 dark:text-blue-300">
                                                        {stage.number}
                                                    </span>

                                                    <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                                                        {stage.title}
                                                    </h3>
                                                </div>

                                                <ArrowUpRight className="hidden h-5 w-5 text-slate-400 sm:block" />
                                            </div>

                                            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {stage.description}
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
                BULK PROCUREMENT CALCULATOR
            ========================================================== */}

            <section className="relative overflow-hidden border-y border-slate-200/70 bg-slate-950 py-20 text-white dark:border-white/10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(14,165,233,0.18),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                                <BarChart3 className="h-4 w-4" />
                                Bulk planning
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Buying at scale requires more than multiplying a unit price.
                            </h2>

                            <p className="mt-5 max-w-xl leading-8 text-slate-300">
                                Quantity, configuration, warranty, availability,
                                delivery, deployment and replacement planning
                                can all affect the actual value of a corporate
                                technology purchase.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Standardize employee configurations",
                                    "Separate requirements by department",
                                    "Plan phased delivery",
                                    "Coordinate deployment",
                                    "Create repeat procurement schedules",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-slate-200"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-blue-300" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl lg:p-8">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                                        Planning tool
                                    </p>

                                    <h3 className="mt-2 text-2xl font-black">
                                        Procurement quantity
                                    </h3>
                                </div>

                                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-300">
                                    <Boxes className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-end justify-between">
                                    <span className="text-sm text-slate-400">
                                        Units
                                    </span>

                                    <span className="text-4xl font-black">
                                        {quantity}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="500"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                    className="mt-5 w-full accent-blue-500"
                                />

                                <div className="mt-3 flex justify-between text-xs text-slate-500">
                                    <span>1</span>
                                    <span>100</span>
                                    <span>250</span>
                                    <span>500+</span>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                                    <p className="text-xs text-slate-500">
                                        Requirement
                                    </p>
                                    <p className="mt-1 font-bold">
                                        Structured
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                                    <p className="text-xs text-slate-500">
                                        Sourcing
                                    </p>
                                    <p className="mt-1 font-bold">
                                        Compared
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                                    <p className="text-xs text-slate-500">
                                        Delivery
                                    </p>
                                    <p className="mt-1 font-bold">
                                        Coordinated
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to build a procurement request for approximately ${quantity} units.`,
                                        {
                                            Source:
                                                "Corporate & Bulk Procurement",
                                            Quantity: `${quantity} units`,
                                        }
                                    )
                                }
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                            >
                                Build My Procurement Request
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHAT WE CAN DO
            ========================================================== */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Beyond the purchase"
                        title="Procurement can connect to the rest of your technology environment."
                        description="A box arriving at your office is not always the end of the project. We can help you think about what happens before, during and after the equipment arrives."
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Settings2,
                                title: "Configuration",
                                text: "Prepare devices according to your organization's software, network and operational requirements.",
                            },
                            {
                                icon: Users,
                                title: "Employee Deployment",
                                text: "Support device allocation and deployment for new employees, departments and replacement programs.",
                            },
                            {
                                icon: Network,
                                title: "Network Integration",
                                text: "Connect procurement with network infrastructure, Wi-Fi, security and other technical requirements.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Security Setup",
                                text: "Coordinate endpoint, access, monitoring and physical security requirements where applicable.",
                            },
                            {
                                icon: Code2,
                                title: "Software",
                                text: "Procure or implement the software and digital tools required to make the hardware useful.",
                            },
                            {
                                icon: LifeBuoy,
                                title: "Ongoing Support",
                                text: "Continue supporting your organization after deployment through technical services and future procurement.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${item.title.toLowerCase()} as part of our procurement project. ${item.text}`,
                                            {
                                                Source:
                                                    "Corporate & Bulk Procurement",
                                                "Beyond purchase":
                                                    item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                DOCUMENTATION
            ========================================================== */}

            <section className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <SectionHeading
                                eyebrow="Procurement documentation"
                                title="Keep the commercial side as organized as the technology."
                                description="Corporate purchasing often involves multiple people, departments and approval stages. Clear documentation helps everyone understand exactly what is being purchased."
                            />

                            <div className="mt-8 space-y-3">
                                {[
                                    "Requirement lists",
                                    "Technical specifications",
                                    "Supplier quotations",
                                    "Commercial comparisons",
                                    "Purchase documentation",
                                    "Invoices",
                                    "Delivery records",
                                    "Warranty information",
                                    "Deployment records",
                                    "Future replacement references",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <FileCheck2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950 lg:p-8">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                            <FileSpreadsheet className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="font-black text-slate-950 dark:text-white">
                                                Procurement Summary
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Corporate requirement
                                            </p>
                                        </div>
                                    </div>

                                    <BadgeCheck className="h-5 w-5 text-emerald-500" />
                                </div>

                                <div className="mt-6 space-y-5">
                                    {[
                                        ["Department", "Operations"],
                                        ["Requirement", "Employee computing"],
                                        ["Quantity", `${quantity} units`],
                                        ["Specification", "Business class"],
                                        ["Delivery", "Coordinated"],
                                        ["Deployment", "Available"],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between gap-5"
                                        >
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {label}
                                            </span>

                                            <span className="text-right text-sm font-bold text-slate-900 dark:text-slate-200">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7 rounded-xl bg-slate-100 p-4 dark:bg-white/[0.05]">
                                    <div className="flex gap-3">
                                        <ClipboardCheck className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-300" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                Ready for review
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                Procurement information can be
                                                organized before an order is
                                                placed.
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
                INDUSTRIES
            ========================================================== */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Industries"
                        title="Technology procurement across different operating environments."
                        description="The equipment may change from industry to industry, but the goal remains the same: get the right technology into the right hands at the right time."
                        align="center"
                    />

                    <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
                        {industries.map((industry) => (
                            <button
                                type="button"
                                key={industry}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss technology procurement for ${industry.toLowerCase()}.`,
                                        {
                                            Source:
                                                "Corporate & Bulk Procurement",
                                            Industry: industry,
                                        }
                                    )
                                }
                                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                            >
                                {industry}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT CHECKLIST
            ========================================================== */}

            <section className="border-y border-slate-200/70 bg-white py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_.8fr]">
                        <div>
                            <SectionHeading
                                eyebrow="Before you request a quote"
                                title="You don't need a perfect procurement document."
                                description="Give us whatever information you already have. We can help turn it into a clearer requirement."
                            />

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "What you need",
                                    "How many you need",
                                    "Who will use it",
                                    "Where it will be delivered",
                                    "Preferred brands",
                                    "Required specifications",
                                    "Approximate budget",
                                    "Desired delivery date",
                                    "Warranty expectations",
                                    "Installation requirements",
                                    "Software requirements",
                                    "Special project constraints",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.025]"
                                    >
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-600 to-blue-700 p-7 text-white shadow-2xl shadow-blue-600/20 lg:p-9">
                            <Sparkles className="h-7 w-7 text-blue-200" />

                            <h3 className="mt-6 text-2xl font-black">
                                Starting from scratch?
                            </h3>

                            <p className="mt-4 leading-7 text-blue-100">
                                That's okay. Tell us about your organization,
                                number of employees, departments, locations
                                and what you want to accomplish. We can help
                                shape the technology requirement from the
                                ground up.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "No finalized product list required",
                                    "No technical procurement expertise required",
                                    "Start with your business objective",
                                    "Build the requirement together",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-medium"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-blue-200" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'm starting from scratch and need help defining our technology procurement requirement.",
                                        {
                                            Source:
                                                "Corporate & Bulk Procurement",
                                            "Starting point":
                                                "From scratch",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                            >
                                Start From Scratch
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================== */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Frequently asked questions"
                        title="Corporate procurement, explained."
                        description="A few answers to common questions organizations have before starting a procurement project."
                        align="center"
                    />

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border transition ${open
                                        ? "border-blue-500/30 bg-blue-500/[0.035]"
                                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.025]"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""
                                                }`}
                                        />
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
                                                        {
                                                            Source:
                                                                "Corporate & Bulk Procurement",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:gap-3 dark:text-blue-300"
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

            <section className="relative overflow-hidden border-t border-slate-200/70 py-20 dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.14),transparent_45%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.18),transparent_45%)]" />

                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <ShoppingCart className="h-6 w-6" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-6xl dark:text-white">
                        Need technology for your organization?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                        Send us your requirement — whether it's a single
                        project, a bulk order, a new office, a company-wide
                        deployment or an idea that still needs to be defined.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a quote for corporate technology procurement.",
                                    {
                                        Source:
                                            "Corporate & Bulk Procurement",
                                        Intent: "Quote request",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                        >
                            Request a Quote
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to talk to someone about procurement for our organization.",
                                    {
                                        Source:
                                            "Corporate & Bulk Procurement",
                                        Intent: "Talk to procurement",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-black text-slate-800 transition hover:bg-slate-50 dark:border-white/15 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09]"
                        >
                            <Mail className="h-4 w-4" />
                            Talk to Procurement
                        </button>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            Business-focused
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Boxes className="h-4 w-4" />
                            Bulk capable
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Workflow className="h-4 w-4" />
                            End-to-end options
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Headphones className="h-4 w-4" />
                            Ongoing support
                        </span>
                    </div>
                </div>
            </section>

            {/* =========================================================
                QUOTE MODAL
            ========================================================== */}

            {showQuoteForm && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
                    onClick={() => setShowQuoteForm(false)}
                >
                    <div
                        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/95">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">
                                    Corporate Procurement
                                </p>

                                <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                                    Request a procurement quote
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowQuoteForm(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form
                            className="space-y-6 p-6 lg:p-8"
                            onSubmit={handleQuoteSubmit}
                        >
                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 dark:bg-blue-400/5">
                                <div className="flex gap-3">
                                    <Sparkles className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />

                                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        Don't have a finalized product list?
                                        That's fine. Describe what your
                                        organization needs and we'll continue
                                        the conversation in AB AI support.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Full name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Your name"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Company
                                    </label>

                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company name"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="you@company.com"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone number"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                    What do you need?
                                </label>

                                <textarea
                                    name="details"
                                    required
                                    rows={5}
                                    placeholder="Tell us what you want to procure, how many units you need, who will use them, your preferred specifications, delivery location, timeline, budget or anything else you think is relevant..."
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Estimated quantity
                                    </label>

                                    <select
                                        name="quantity"
                                        defaultValue={quantity}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    >
                                        <option value="1-10">1–10 units</option>
                                        <option value="11-50">11–50 units</option>
                                        <option value="51-100">51–100 units</option>
                                        <option value="101-250">101–250 units</option>
                                        <option value="251-500">251–500 units</option>
                                        <option value="500+">500+ units</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Procurement type
                                    </label>

                                    <select
                                        name="procurementType"
                                        defaultValue="bulk"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    >
                                        <option value="Single project">
                                            Single project
                                        </option>
                                        <option value="Bulk procurement">
                                            Bulk procurement
                                        </option>
                                        <option value="Recurring procurement">
                                            Recurring procurement
                                        </option>
                                        <option value="Full deployment">
                                            Full deployment
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {[
                                    {
                                        icon: Package,
                                        text: "Hardware",
                                        name: "hardware",
                                    },
                                    {
                                        icon: Code2,
                                        text: "Software",
                                        name: "software",
                                    },
                                    {
                                        icon: Network,
                                        text: "Infrastructure",
                                        name: "infrastructure",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <label
                                            key={item.text}
                                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                                        >
                                            <input
                                                type="checkbox"
                                                name={item.name}
                                                className="h-4 w-4 accent-blue-600"
                                            />
                                            <Icon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {item.text}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>

                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                Continue in Support
                                <ArrowRight className="h-4 w-4" />
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
            )}
        </main>
    );
}