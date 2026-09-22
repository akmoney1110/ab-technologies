import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock3,
    Compass,
    Container,
    Cpu,
    FileCheck2,
    Globe2,
    Headphones,
    MapPin,
    Package,
    PackageCheck,
    Route,
    ScanLine,
    ShieldCheck,
    Ship,
    ShoppingCart,
    Truck,
    Warehouse,
    Boxes,
    BarChart3,
    Building2,
    BriefcaseBusiness,
    ClipboardCheck,
    FileText,
    LockKeyhole,
    Navigation,
    Plane,
    RefreshCw,
    Send,
    Settings2,
    Sparkles,
    Target,
    Users,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function LogisticsDelivery() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);
    const [activeService, setActiveService] = useState("End-to-End Delivery");

    /* -----------------------------------------------------
       Hand off a contextual request to the support page.
       The support page auto-sends it and continues the
       conversation with AB AI.
    ----------------------------------------------------- */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss logistics and delivery for my organization.",
            metadata: metadata || {
                Source: "Logistics & Delivery",
            },
        });

        navigate("/support/ai");
    };

    const services = [
        {
            title: "End-to-End Delivery",
            icon: Truck,
            description:
                "From supplier collection and consolidation to final delivery, we coordinate the complete movement of your technology, equipment, documents, and business supplies.",
        },
        {
            title: "Domestic Logistics",
            icon: Navigation,
            description:
                "Reliable movement of equipment and goods between cities, offices, warehouses, branches, schools, institutions, and project locations.",
        },
        {
            title: "International Freight",
            icon: Globe2,
            description:
                "Coordinate international sourcing movements through appropriate air, sea, courier, and freight channels based on urgency, volume, value, and destination.",
        },
        {
            title: "Procurement Delivery",
            icon: ShoppingCart,
            description:
                "We connect procurement and logistics so purchased equipment does not simply stop at the supplier. We coordinate getting it where it needs to go.",
        },
        {
            title: "Corporate Distribution",
            icon: Building2,
            description:
                "Structured distribution for organizations with multiple branches, offices, teams, campuses, project locations, or deployment sites.",
        },
        {
            title: "Equipment Handling",
            icon: PackageCheck,
            description:
                "Careful handling and movement of laptops, desktops, networking equipment, peripherals, servers, displays, and other technology assets.",
        },
    ];

    const capabilities = [
        "Supplier pickup coordination",
        "Warehouse receiving",
        "Cargo consolidation",
        "Domestic transportation",
        "International freight coordination",
        "Courier coordination",
        "Air freight coordination",
        "Sea freight coordination",
        "Last-mile delivery",
        "Branch-to-branch distribution",
        "Project-site delivery",
        "Delivery scheduling",
        "Proof of delivery",
        "Shipment documentation",
        "Asset identification",
        "Packaging coordination",
        "Delivery status reporting",
        "Exception management",
    ];

    const industries = [
        {
            title: "Corporate",
            icon: Building2,
            description:
                "Office equipment, technology deployments, branch distribution, employee equipment, and business-critical deliveries.",
        },
        {
            title: "Education",
            icon: Users,
            description:
                "Schools, universities, training centers, laboratories, computer labs, and institutional technology projects.",
        },
        {
            title: "Government",
            icon: BriefcaseBusiness,
            description:
                "Structured delivery support for public-sector technology, equipment, supplies, and institutional projects.",
        },
        {
            title: "Healthcare",
            icon: ShieldCheck,
            description:
                "Technology and equipment logistics requiring careful handling, documentation, scheduling, and delivery coordination.",
        },
        {
            title: "SMEs",
            icon: Target,
            description:
                "Practical logistics support for growing businesses without requiring an internal logistics department.",
        },
        {
            title: "Projects",
            icon: Settings2,
            description:
                "Equipment movement for construction, technology rollouts, office openings, expansions, and field projects.",
        },
    ];

    const process = [
        {
            number: "01",
            title: "Understand the Requirement",
            icon: ClipboardCheck,
            text:
                "We establish what needs to move, where it is located, where it needs to go, how quickly it is required, and any handling or documentation requirements.",
        },
        {
            number: "02",
            title: "Plan the Movement",
            icon: Route,
            text:
                "We determine the appropriate logistics approach based on distance, volume, urgency, cargo characteristics, delivery window, and project requirements.",
        },
        {
            number: "03",
            title: "Coordinate Pickup",
            icon: Package,
            text:
                "We coordinate with suppliers, vendors, warehouses, or designated pickup locations to organize collection and movement.",
        },
        {
            number: "04",
            title: "Receive & Verify",
            icon: ScanLine,
            text:
                "Where required, goods can be checked against available procurement or shipment information before onward delivery.",
        },
        {
            number: "05",
            title: "Transport",
            icon: Truck,
            text:
                "The shipment moves through the selected domestic or international logistics channel toward its destination.",
        },
        {
            number: "06",
            title: "Track & Communicate",
            icon: Compass,
            text:
                "We maintain shipment visibility and communicate important status updates, exceptions, delays, or changes where applicable.",
        },
        {
            number: "07",
            title: "Final Delivery",
            icon: MapPin,
            text:
                "The shipment reaches the agreed destination, office, branch, institution, warehouse, or project site.",
        },
        {
            number: "08",
            title: "Confirm Completion",
            icon: FileCheck2,
            text:
                "Delivery confirmation and relevant documentation are captured to provide a clear completion record.",
        },
    ];

    const solutions = [
        {
            title: "Technology Equipment",
            icon: Cpu,
            items: [
                "Laptops",
                "Desktop computers",
                "Monitors",
                "Servers",
                "Network switches",
                "Routers",
                "Access points",
                "Printers",
                "UPS systems",
                "Peripherals",
            ],
        },
        {
            title: "Office & Business Supplies",
            icon: Boxes,
            items: [
                "Office equipment",
                "Furniture coordination",
                "Business supplies",
                "Training materials",
                "Documents",
                "Promotional materials",
                "Branch supplies",
                "Project materials",
                "Consumables",
                "Corporate assets",
            ],
        },
        {
            title: "Procurement Cargo",
            icon: ShoppingCart,
            items: [
                "Supplier purchases",
                "Bulk orders",
                "Imported equipment",
                "Consolidated shipments",
                "Vendor collections",
                "Replacement equipment",
                "Project equipment",
                "Institutional orders",
                "Corporate orders",
                "Technology deployments",
            ],
        },
    ];

    const advantages = [
        {
            icon: ShieldCheck,
            title: "Controlled Handling",
            text:
                "We treat technology and business equipment as assets that require appropriate handling, packaging, movement, and delivery coordination.",
        },
        {
            icon: Clock3,
            title: "Time-Aware Planning",
            text:
                "Urgent deliveries and planned shipments can be structured around realistic delivery windows and operational priorities.",
        },
        {
            icon: FileText,
            title: "Documentation",
            text:
                "Shipment information, delivery instructions, relevant records, and completion confirmation can be maintained throughout the process.",
        },
        {
            icon: BarChart3,
            title: "Visibility",
            text:
                "Clear shipment status and exception communication help clients understand where a delivery stands.",
        },
        {
            icon: Users,
            title: "One Coordination Point",
            text:
                "Instead of coordinating multiple suppliers, transport providers, warehouses, and destinations independently, you can work through one coordination layer.",
        },
        {
            icon: RefreshCw,
            title: "Flexible Support",
            text:
                "Logistics can be arranged as a one-off delivery, procurement-related movement, recurring distribution program, or broader project requirement.",
        },
    ];

    const faqs = [
        {
            question: "Can you deliver equipment purchased through AB Technologies?",
            answer:
                "Yes. Logistics and delivery can be coordinated as part of a broader procurement engagement. This allows sourcing, verification, consolidation, transportation, and final delivery to be treated as one coordinated project where appropriate.",
        },
        {
            question: "Can you handle bulk deliveries?",
            answer:
                "Yes. Bulk and corporate deliveries can be coordinated based on quantity, destinations, timing, packaging, and project requirements. For multi-location projects, deliveries can also be structured by branch, department, campus, or deployment site.",
        },
        {
            question: "Do you support international shipments?",
            answer:
                "Yes. We can coordinate international logistics requirements through suitable freight, courier, air, sea, and delivery channels depending on the shipment and destination. International shipments may involve third-party logistics and customs providers.",
        },
        {
            question: "Can you deliver to different branches?",
            answer:
                "Yes. Multi-location distribution is one of the use cases for structured corporate logistics. Equipment can be allocated and delivered according to an agreed branch or destination schedule.",
        },
        {
            question: "Can you coordinate urgent deliveries?",
            answer:
                "Urgent requests can be assessed and prioritized based on the location, availability of transportation, shipment characteristics, distance, and required delivery window. We do not promise unrealistic delivery times; instead, we establish what is operationally achievable.",
        },
        {
            question: "Can you provide proof of delivery?",
            answer:
                "Delivery confirmation can be incorporated into the logistics workflow, including recipient confirmation and other agreed completion records where supported by the delivery arrangement.",
        },
        {
            question: "Can you collect equipment from another supplier?",
            answer:
                "Yes. Supplier pickup coordination can be part of the engagement. This is especially useful when procurement and delivery are being handled together.",
        },
        {
            question: "Can you consolidate goods from multiple suppliers?",
            answer:
                "Where practical, shipments from multiple suppliers can be coordinated for consolidation before onward transportation. This can simplify delivery management and may improve logistical efficiency depending on the circumstances.",
        },
    ];

    const stats = [
        {
            value: "01",
            label: "Coordination Point",
            text: "One structured workflow from pickup to delivery.",
        },
        {
            value: "24/7",
            label: "Visibility Mindset",
            text: "Shipment progress and exceptions should never be left unclear.",
        },
        {
            value: "B2B",
            label: "Business Focus",
            text: "Designed around organizations, projects and operational needs.",
        },
        {
            value: "A→Z",
            label: "Coverage",
            text: "From supplier collection to final destination.",
        },
    ];

    return (
        <main className=" mt-25 relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* GLOBAL PAGE BACKGROUND */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-[-180px] top-[500px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
                <div className="absolute left-[30%] top-[1100px] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />

                <div
                    className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(100,116,139,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.8) 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                    }}
                />
            </div>

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/10">
                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">

                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">

                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                                <Truck className="h-4 w-4" />
                                Logistics & Delivery
                            </div>

                            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                                Move what your business needs.
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
                                    From source to destination.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                We coordinate the movement of technology, equipment,
                                procurement orders, business supplies, and project
                                materials from suppliers and warehouses to the place
                                your organization needs them.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                Whether you need a single delivery, a bulk corporate
                                shipment, supplier pickup, multi-branch distribution,
                                or international logistics coordination, we help turn
                                the movement of goods into a structured business process.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to plan a delivery. Here's what needs to move:",
                                            {
                                                Source: "Logistics & Delivery",
                                                Stage: "Hero — plan a delivery",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
                                >
                                    Plan a Delivery
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your logistics and delivery services for my organization.",
                                            {
                                                Source: "Logistics & Delivery",
                                                Stage: "Hero — explore services",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-6 py-4 font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                                >
                                    Explore Logistics
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                                {stats.map((stat) => (
                                    <button
                                        type="button"
                                        key={stat.label}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to understand "${stat.label}": ${stat.text}`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    Highlight: stat.label,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-left backdrop-blur transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                    >
                                        <div className="text-xl font-black text-blue-600 dark:text-blue-400">
                                            {stat.value}
                                        </div>
                                        <div className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">
                                            {stat.label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-indigo-500/10 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">

                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                            Shipment overview
                                        </p>
                                        <h2 className="mt-1 text-lg font-black">
                                            Technology Deployment
                                        </h2>
                                    </div>

                                    <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        Coordinated
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-950">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                                <Warehouse className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    Origin
                                                </p>
                                                <p className="font-bold">
                                                    Supplier / Warehouse
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Status
                                            </p>
                                            <p className="font-bold text-emerald-600 dark:text-emerald-400">
                                                Ready
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative my-8">
                                        <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-slate-300 dark:bg-slate-700" />

                                        <div className="relative flex items-center justify-between">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-slate-100 bg-blue-600 dark:border-slate-950">
                                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                            </div>

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                                                <Truck className="h-5 w-5" />
                                            </div>

                                            <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-slate-100 bg-indigo-600 dark:border-slate-950">
                                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                                                <Building2 className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    Destination
                                                </p>
                                                <p className="font-bold">
                                                    Client / Project Site
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Delivery
                                            </p>
                                            <p className="font-bold text-blue-600 dark:text-blue-400">
                                                Planned
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-3 gap-3">
                                    {[
                                        [Package, "Cargo", "Equipment", "text-blue-500"],
                                        [ScanLine, "Tracking", "Monitored", "text-cyan-500"],
                                        [FileCheck2, "Delivery", "Confirmed", "text-indigo-500"],
                                    ].map(([Icon, label, value, color]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to know more about the "${label}" aspect of a shipment — specifically: ${value}.`,
                                                    {
                                                        Source: "Logistics & Delivery",
                                                        "Shipment aspect": label,
                                                    }
                                                )
                                            }
                                            className="rounded-xl border border-slate-200 p-3 text-left transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-white/10 dark:hover:border-blue-400/30 dark:hover:bg-blue-400/5"
                                        >
                                            <Icon className={`mb-2 h-4 w-4 ${color}`} />
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                {label}
                                            </p>
                                            <p className="mt-1 text-sm font-bold">
                                                {value}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block dark:border-white/10 dark:bg-slate-900">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Delivery control
                                        </p>
                                        <p className="text-sm font-bold">
                                            Documented
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                More than transportation
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Logistics that fits into the bigger picture.
                            </h2>
                        </div>

                        <div className="space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                Moving equipment from one place to another sounds
                                simple until the shipment involves multiple suppliers,
                                large quantities, different destinations, tight
                                timelines, expensive technology, or an international
                                supply chain.
                            </p>

                            <p>
                                Our logistics and delivery service is designed to
                                connect that movement to the rest of your business
                                process. Procurement, supplier sourcing, product
                                verification, consolidation, transportation, delivery,
                                and deployment can be coordinated as connected stages.
                            </p>

                            <p>
                                That means you do not necessarily have to manage every
                                handoff yourself. We help establish the plan, coordinate
                                the relevant parties, maintain visibility, and bring
                                the shipment to its intended destination.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like help coordinating logistics as part of a broader business or procurement process.",
                                        {
                                            Source: "Logistics & Delivery",
                                            Stage: "Intro enquiry",
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400"
                            >
                                Start with your requirement
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section
                id="services"
                className="relative border-y border-slate-200/70 bg-white/70 py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What we coordinate
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            A logistics layer built around your operation.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Select the type of logistics support you need. We can
                            combine multiple capabilities into one coordinated
                            engagement.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => {
                            const Icon = service.icon;
                            const active = activeService === service.title;

                            return (
                                <button
                                    key={service.title}
                                    type="button"
                                    onClick={() => {
                                        setActiveService(service.title);
                                        startSupportChat(
                                            `I'd like to discuss the logistics service: ${service.title}. ${service.description}`,
                                            {
                                                Source: "Logistics & Delivery",
                                                Service: service.title,
                                            }
                                        );
                                    }}
                                    className={`group rounded-3xl border p-6 text-left transition duration-300 ${active
                                        ? "border-blue-500 bg-blue-50 shadow-xl shadow-blue-500/10 dark:border-blue-400/40 dark:bg-blue-400/10"
                                        : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/50 dark:hover:border-blue-400/30"
                                        }`}
                                >
                                    <div
                                        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${active
                                            ? "bg-blue-600 text-white dark:bg-blue-500"
                                            : "bg-slate-100 text-blue-600 dark:bg-white/5 dark:text-blue-300"
                                            }`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="text-xl font-black">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {service.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                                        Explore capability
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-7 dark:border-blue-400/20 dark:from-blue-500/10 dark:to-cyan-500/5">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    Selected capability
                                </p>

                                <h3 className="mt-1 text-2xl font-black">
                                    {activeService}
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss the logistics service: ${activeService}.`,
                                        {
                                            Source: "Logistics & Delivery",
                                            Service: activeService,
                                            Stage: "Selected capability panel",
                                        }
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
                            >
                                Discuss this service
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex rounded-2xl bg-indigo-500/10 p-4 text-indigo-600 dark:text-indigo-300">
                                <Route className="h-8 w-8" />
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                From the first pickup to the final handover.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Our logistics capability can cover the operational
                                stages surrounding the movement of your goods. The
                                exact services included depend on your shipment and
                                agreed scope.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Procurement",
                                    "Sourcing",
                                    "Verification",
                                    "Consolidation",
                                    "Transportation",
                                    "Delivery",
                                    "Deployment",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to include "${item}" in a logistics engagement.`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    "Pipeline stage": item,
                                                }
                                            )
                                        }
                                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {capabilities.map((capability) => (
                                <button
                                    type="button"
                                    key={capability}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to know more about the logistics capability: ${capability}.`,
                                            {
                                                Source: "Logistics & Delivery",
                                                Capability: capability,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-blue-400/30"
                                >
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {capability}
                                    </span>
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* WHAT WE MOVE */}
            <section className="relative overflow-hidden border-y border-slate-200 bg-slate-100 py-20 dark:border-white/10 dark:bg-slate-900/50 lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,.08),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What can move
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Built for technology and business cargo.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Our logistics offering is especially suited to the
                            equipment and operational materials involved in modern
                            businesses, institutions, procurement programs, and
                            technology projects.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {solutions.map((solution) => {
                            const Icon = solution.icon;

                            return (
                                <div
                                    key={solution.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-slate-950/70"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to move ${solution.title.toLowerCase()}: ${solution.items.join(", ")}.`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    "Cargo category": solution.title,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-4 text-left"
                                    >
                                        <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="text-xl font-black">
                                            {solution.title}
                                        </h3>
                                    </button>

                                    <div className="mt-7 grid grid-cols-2 gap-3">
                                        {solution.items.map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I need to move: ${item}.`,
                                                        {
                                                            Source: "Logistics & Delivery",
                                                            "Cargo category": solution.title,
                                                            Item: item,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl bg-slate-50 px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
                                            >
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

            {/* DOMESTIC / INTERNATIONAL */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-7 lg:grid-cols-2">

                        <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70">
                            <div className="flex items-start justify-between gap-5">
                                <div className="rounded-2xl bg-blue-500/10 p-4 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                    <Navigation className="h-7 w-7" />
                                </div>

                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                                    Domestic
                                </span>
                            </div>

                            <h3 className="mt-7 text-3xl font-black">
                                Deliver across locations.
                            </h3>

                            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                                Coordinate movement between suppliers, warehouses,
                                offices, branches, institutions, project sites,
                                customers, and other approved destinations.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Supplier-to-office delivery",
                                    "Warehouse-to-branch distribution",
                                    "Inter-city equipment movement",
                                    "Corporate multi-location delivery",
                                    "Project-site delivery",
                                    "Last-mile coordination",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss domestic logistics — specifically: ${item}.`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    "Domestic topic": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 text-left text-sm font-semibold text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10">
                            <div className="flex items-start justify-between gap-5">
                                <div className="rounded-2xl bg-white/10 p-4 text-cyan-300">
                                    <Globe2 className="h-7 w-7" />
                                </div>

                                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                                    International
                                </span>
                            </div>

                            <h3 className="mt-7 text-3xl font-black">
                                Coordinate beyond borders.
                            </h3>

                            <p className="mt-4 leading-8 text-slate-300">
                                International sourcing becomes more useful when the
                                movement of goods is considered from the supplier
                                location through freight, destination handling, and
                                final delivery.
                            </p>

                            <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                {[
                                    { icon: Plane, text: "Air freight coordination" },
                                    { icon: Ship, text: "Sea freight coordination" },
                                    { icon: Package, text: "Courier shipments" },
                                    { icon: FileText, text: "Shipment documentation" },
                                    { icon: Globe2, text: "International supplier movement" },
                                    { icon: Truck, text: "Destination delivery" },
                                ].map(({ icon: Icon, text }) => (
                                    <button
                                        type="button"
                                        key={text}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss international logistics: ${text}.`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    "International topic": text,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
                                    >
                                        <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
                                        <span className="text-sm font-semibold text-slate-200">
                                            {text}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CORPORATE DISTRIBUTION */}
            <section className="relative overflow-hidden border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-950 lg:py-28">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-500/[0.06] to-transparent" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Corporate distribution
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                One order can become many destinations.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                When an organization purchases equipment for multiple
                                branches, offices, campuses, departments, or field
                                teams, simply delivering everything to one location
                                may not be enough.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We can help structure the logistics around the
                                destination list, quantities, delivery sequence,
                                schedules, and completion records.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss a corporate distribution project — one order, multiple destinations.",
                                        {
                                            Source: "Logistics & Delivery",
                                            Stage: "Corporate distribution enquiry",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                            >
                                Discuss a distribution project
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]">
                            <div className="space-y-3">
                                {[
                                    ["HQ", "40 devices", "Ready"],
                                    ["Branch A", "25 devices", "Scheduled"],
                                    ["Branch B", "30 devices", "Scheduled"],
                                    ["Branch C", "20 devices", "In transit"],
                                    ["Project Site", "85 devices", "Planned"],
                                ].map(([location, quantity, status]) => (
                                    <button
                                        type="button"
                                        key={location}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss a distribution delivery to ${location} (${quantity}, status: ${status}).`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    Location: location,
                                                    Quantity: quantity,
                                                    Status: status,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-blue-500/10 p-2 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                                <MapPin className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold">
                                                    {location}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">
                                            {status}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            How it works
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            A clear path from pickup to delivery.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We keep the logistics workflow structured so everyone
                            understands what happens next.
                        </p>
                    </div>

                    <div className="relative mt-16">
                        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-indigo-500 lg:left-1/2 lg:block" />

                        <div className="space-y-8">
                            {process.map((step, index) => {
                                const Icon = step.icon;
                                const left = index % 2 === 0;

                                return (
                                    <div
                                        key={step.number}
                                        className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${left ? "" : ""
                                            }`}
                                    >
                                        <div
                                            className={`${left
                                                ? "lg:pr-16"
                                                : "lg:col-start-2 lg:pl-16"
                                                }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to understand the logistics step: "${step.title}" — ${step.text}`,
                                                        {
                                                            Source: "Logistics & Delivery",
                                                            Step: `${step.number} — ${step.title}`,
                                                        }
                                                    )
                                                }
                                                className="group w-full rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/30"
                                            >
                                                <div className="flex items-start gap-5">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white dark:bg-blue-500">
                                                        {step.number}
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                            <h3 className="text-xl font-black">
                                                                {step.title}
                                                            </h3>
                                                        </div>

                                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                            {step.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="absolute left-[calc(50%-12px)] top-10 hidden h-6 w-6 rounded-full border-4 border-slate-50 bg-blue-600 lg:block dark:border-slate-950" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ADVANTAGES */}
            <section className="relative border-y border-slate-200 bg-slate-100 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Why structured logistics
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Less chasing. More control.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                The objective is not simply to move a package. It is
                                to make the movement fit into the way your organization
                                operates.
                            </p>

                            <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-400/20 dark:bg-blue-400/10">
                                <div className="flex gap-4">
                                    <Sparkles className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />
                                    <div>
                                        <p className="text-sm leading-7 text-blue-900 dark:text-blue-100">
                                            Logistics can be integrated with procurement,
                                            supplier sourcing, product verification,
                                            deployment, and support when those services
                                            are part of the same project.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to integrate logistics with procurement, sourcing, verification and deployment as one coordinated project.",
                                                    {
                                                        Source: "Logistics & Delivery",
                                                        Stage: "Integrated logistics",
                                                    }
                                                )
                                            }
                                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-blue-700"
                                        >
                                            Ask AB AI
                                            <Sparkles className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {advantages.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to understand this logistics advantage: ${item.title} — ${item.text}`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    Advantage: item.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-blue-600 dark:bg-white/5 dark:text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-black">
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
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Built for organizations
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Logistics support across industries.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Different organizations have different delivery
                            requirements. We adapt the coordination model to the
                            project, destination, cargo, and operational environment.
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
                                            `I'd like to discuss logistics for ${industry.title}: ${industry.description}`,
                                            {
                                                Source: "Logistics & Delivery",
                                                Industry: industry.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-blue-400/30"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="text-xl font-black">
                                            {industry.title}
                                        </h3>
                                    </div>

                                    <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {industry.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PROCUREMENT + LOGISTICS */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="absolute right-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-cyan-300">
                                <ShoppingCart className="h-4 w-4" />
                                Procurement + Logistics
                            </div>

                            <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
                                Why stop at buying the equipment?
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                A successful procurement project does not end when
                                the supplier confirms an order. The equipment still
                                needs to be collected, transported, received, checked,
                                distributed, and ultimately placed where it belongs.
                            </p>

                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Where appropriate, we can coordinate these stages as
                                part of one broader project rather than treating
                                procurement and logistics as completely separate
                                activities.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to build a procurement + logistics plan. Here's what we're working on:",
                                        {
                                            Source: "Logistics & Delivery",
                                            Stage: "Procurement + logistics plan",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
                            >
                                Build my procurement plan
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: ShoppingCart,
                                        title: "Source",
                                        text: "Identify and procure the required equipment.",
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Verify",
                                        text: "Coordinate relevant product and shipment checks.",
                                    },
                                    {
                                        icon: Warehouse,
                                        title: "Consolidate",
                                        text: "Bring multiple procurement movements into a manageable flow where practical.",
                                    },
                                    {
                                        icon: Truck,
                                        title: "Move",
                                        text: "Coordinate transportation to the required destination.",
                                    },
                                    {
                                        icon: PackageCheck,
                                        title: "Deliver",
                                        text: "Complete the handover and delivery record.",
                                    },
                                ].map(({ icon: Icon, title, text }, index) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the procurement + logistics stage: "${title}" — ${text}`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    "Pipeline stage": title,
                                                }
                                            )
                                        }
                                        className="relative flex w-full gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-cyan-400/40 hover:bg-black/30"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="font-black">
                                                {title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-slate-400">
                                                {text}
                                            </p>
                                        </div>

                                        {index < 4 && (
                                            <div className="absolute bottom-[-17px] left-[33px] z-10 hidden h-4 w-px bg-blue-400/50 sm:block" />
                                        )}
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* HANDLING & RISK */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-8 lg:grid-cols-3">

                        {[
                            {
                                icon: ShieldCheck,
                                accent: "emerald",
                                title: "Asset-aware handling",
                                text: "Technology equipment can be expensive, sensitive, and operationally important. Logistics arrangements should account for the nature of the cargo and the environment through which it will move.",
                            },
                            {
                                icon: FileCheck2,
                                accent: "blue",
                                title: "Documentation-aware",
                                text: "Relevant shipment information and delivery records can be incorporated into the project workflow, helping organizations maintain a clearer operational trail.",
                            },
                            {
                                icon: LockKeyhole,
                                accent: "indigo",
                                title: "Exception awareness",
                                text: "Delays, damaged packaging, unavailable recipients, route issues, supplier delays, and other exceptions should be surfaced instead of silently becoming someone else's problem.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            const accentClass =
                                item.accent === "emerald"
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : item.accent === "blue"
                                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                        : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss "${item.title}": ${item.text}`,
                                            {
                                                Source: "Logistics & Delivery",
                                                "Handling topic": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-[2rem] border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-400/30"
                                >
                                    <div className={`rounded-2xl p-3 w-fit ${accentClass}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* DELIVERY TYPES */}
            <section className="relative border-y border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                icon: Package,
                                title: "One-Off Delivery",
                                text: "For individual shipments, urgent equipment movements, or specific business requirements.",
                            },
                            {
                                icon: Boxes,
                                title: "Bulk Delivery",
                                text: "For larger quantities of equipment, supplies, and procurement orders.",
                            },
                            {
                                icon: Building2,
                                title: "Multi-Site",
                                text: "For organizations distributing goods to several offices, branches, campuses, or sites.",
                            },
                            {
                                icon: RefreshCw,
                                title: "Recurring",
                                text: "For businesses requiring repeated movement of equipment, supplies, or operational materials.",
                            },
                        ].map(({ icon: Icon, title, text }) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss ${title}: ${text}`,
                                        {
                                            Source: "Logistics & Delivery",
                                            "Delivery type": title,
                                        }
                                    )
                                }
                                className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950 dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-6 text-xl font-black">
                                    {title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {text}
                                </p>
                            </button>
                        ))}

                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Logistics questions, answered.
                        </h2>
                    </div>

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
                                            setOpenFaq(open ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-6 p-5 text-left"
                                    >
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""
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
                                                            Source: "Logistics & Delivery",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:gap-3 dark:text-blue-400"
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

            {/* REQUEST CTA */}
            <section
                id="request"
                className="relative overflow-hidden px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28"
            >
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl shadow-blue-900/20 sm:p-12 lg:p-16">

                    <div className="absolute right-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-300/10 blur-3xl" />

                    <div className="relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold">
                                <Send className="h-4 w-4" />
                                Start with the requirement
                            </div>

                            <h2 className="mt-7 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                                Tell us what needs to move.
                            </h2>

                            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                                Give us the origin, destination, what you need
                                transported, approximate quantity, timeline, and any
                                special requirements. We can help you determine the
                                appropriate next step.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to request a logistics plan. Here's what needs to move:",
                                            {
                                                Source: "Logistics & Delivery",
                                                Stage: "Request a logistics plan",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-blue-700 transition hover:bg-blue-50"
                                >
                                    Request a Logistics Plan
                                    <ArrowRight className="h-5 w-5" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to review your logistics services before submitting a request.",
                                            {
                                                Source: "Logistics & Delivery",
                                                Stage: "Review services",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/20"
                                >
                                    Review Services
                                </button>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/15 bg-black/10 p-6 backdrop-blur">
                            <p className="text-sm font-bold text-blue-100">
                                Useful information to provide
                            </p>

                            <div className="mt-5 space-y-3">
                                {[
                                    "Pickup location",
                                    "Delivery destination",
                                    "Type of equipment or goods",
                                    "Approximate quantity / weight",
                                    "Required delivery timeline",
                                    "Domestic or international movement",
                                    "Special handling requirements",
                                    "Number of delivery locations",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to provide logistics information: ${item}.`,
                                                {
                                                    Source: "Logistics & Delivery",
                                                    "Info item": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-xl bg-white/10 p-3 text-left transition hover:bg-white/20"
                                    >
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-200" />
                                        <span className="text-sm font-medium text-blue-50">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FINAL STATEMENT */}
            <section className="relative border-t border-slate-200 py-16 dark:border-white/10">
                <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                        <Truck className="h-7 w-7" />
                    </div>

                    <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                        Procurement should end where your operation begins.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Whether it is one laptop, hundreds of devices, a complete
                        office deployment, institutional equipment, or an
                        international procurement project, we can help coordinate
                        the movement from source to destination.
                    </p>

                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a conversation about logistics and delivery for my organization.",
                                    {
                                        Source: "Logistics & Delivery",
                                        Stage: "Final CTA",
                                    }
                                )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
                        >
                            Start a Conversation
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>

                    <p className="mt-8 text-xs leading-6 text-slate-500 dark:text-slate-500">
                        Logistics services may involve third-party transportation,
                        courier, freight, customs, warehousing, or delivery providers.
                        Specific routes, timelines, costs, insurance arrangements,
                        customs responsibilities, and delivery conditions are subject
                        to the shipment and agreed engagement.
                    </p>
                </div>
            </section>

        </main>
    );
}