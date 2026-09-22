import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    Clock3,
    Cpu,
    Database,
    FileCheck2,
    Globe2,
    HardDrive,
    Headphones,
    Laptop,
    Layers3,
    LockKeyhole,
    Mail,
    MapPin,
    MessageSquare,
    Package,
    PackageCheck,
    Phone,
    Plane,
    Search,
    Server,
    ShieldCheck,
    ShoppingCart,
    SlidersHorizontal,
    Sparkles,
    Truck,
    Users,
    Wifi,
    Wrench,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

/* =========================================================
   DATA (unchanged — kept identical to your original)
   ========================================================= */

const sourcingCategories = [
    {
        title: "Business Laptops",
        description:
            "Professional laptops for executives, employees, remote teams, field staff, schools and institutional deployments.",
        icon: Laptop,
        examples: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "Microsoft", "Apple"],
    },
    {
        title: "Desktop Computers",
        description:
            "Business desktops, compact systems, workstations and complete desktop setups for offices and institutions.",
        icon: Cpu,
        examples: ["Tower desktops", "Mini PCs", "All-in-one PCs", "Workstations", "Office desktops"],
    },
    {
        title: "Servers & Storage",
        description:
            "Server hardware and storage equipment for applications, databases, virtualization, backups and infrastructure.",
        icon: Server,
        examples: ["Rack servers", "Tower servers", "NAS", "SAN", "SSDs", "Hard drives"],
    },
    {
        title: "Networking Equipment",
        description:
            "Hardware required to build reliable wired and wireless networks across offices, campuses and facilities.",
        icon: Wifi,
        examples: ["Switches", "Routers", "Access points", "Firewalls", "Network racks", "Controllers"],
    },
    {
        title: "Monitors & Displays",
        description:
            "Professional displays and monitors for workstations, control rooms, meeting rooms, reception areas and training environments.",
        icon: Layers3,
        examples: ["Business monitors", "4K displays", "Ultrawide monitors", "Interactive displays", "Digital signage"],
    },
    {
        title: "Printers & Scanners",
        description:
            "Office printing, scanning and document-management hardware for organizations of different sizes.",
        icon: FileCheck2,
        examples: ["Laser printers", "Inkjet printers", "Multifunction printers", "Scanners", "Label printers"],
    },
    {
        title: "Power & Protection",
        description:
            "Power infrastructure and protection equipment that helps keep technology operational and protected.",
        icon: Zap,
        examples: ["UPS systems", "Surge protection", "Power banks", "Voltage protection", "Power distribution"],
    },
    {
        title: "Accessories & Peripherals",
        description:
            "The small but important equipment required to complete a professional technology deployment.",
        icon: Package,
        examples: ["Keyboards", "Mice", "Webcams", "Headsets", "Docking stations", "Cables"],
    },
];

const sourcingSteps = [
    {
        number: "01",
        title: "Tell us what you need",
        description:
            "Send a product name, specification, quantity, budget, preferred brand or simply describe the business requirement.",
        icon: MessageIcon,
    },
    {
        number: "02",
        title: "We define the requirement",
        description:
            "We turn your request into a clear procurement specification, identifying important technical and commercial requirements.",
        icon: ClipboardCheck,
    },
    {
        number: "03",
        title: "We source suitable options",
        description:
            "We identify suitable products and sourcing channels based on availability, specification, quantity, budget and delivery requirements.",
        icon: Search,
    },
    {
        number: "04",
        title: "We compare the options",
        description:
            "We compare specifications, configurations, warranty, commercial terms and other relevant factors before recommending an option.",
        icon: BarChart3,
    },
    {
        number: "05",
        title: "You approve",
        description:
            "You receive a clear procurement recommendation or quotation for review before the order proceeds.",
        icon: CheckCircle2,
    },
    {
        number: "06",
        title: "We coordinate fulfillment",
        description:
            "Once approved, we coordinate procurement, verification, logistics and delivery according to the agreed arrangement.",
        icon: Truck,
    },
];

const useCases = [
    {
        title: "Office Setup",
        description:
            "Equip a new office or expand an existing workforce with standardized computers, monitors, networking equipment and accessories.",
        icon: Building2,
    },
    {
        title: "Employee Deployment",
        description:
            "Source standardized devices for new employees, departments, branches, remote teams or replacement cycles.",
        icon: Users,
    },
    {
        title: "School & Training Labs",
        description:
            "Source computers and supporting infrastructure for schools, computer laboratories, training centers and educational institutions.",
        icon: GraduationIcon,
    },
    {
        title: "Enterprise Rollouts",
        description:
            "Coordinate larger technology purchases where consistency, documentation, quantities and deployment planning matter.",
        icon: Database,
    },
    {
        title: "Infrastructure Projects",
        description:
            "Source servers, storage, networking, power and other equipment required for broader IT infrastructure projects.",
        icon: Server,
    },
    {
        title: "Replacement & Refresh",
        description:
            "Replace aging equipment with suitable current-generation hardware while maintaining consistency across your environment.",
        icon: Wrench,
    },
];

const trustPoints = [
    {
        title: "Specification-first sourcing",
        description:
            "We focus on matching the hardware to the actual requirement instead of simply finding the cheapest item.",
        icon: SlidersHorizontal,
    },
    {
        title: "Brand flexibility",
        description:
            "You can specify a preferred manufacturer or allow us to recommend suitable alternatives.",
        icon: Globe2,
    },
    {
        title: "Quantity-aware procurement",
        description:
            "Single-device requirements and larger orders can be evaluated differently because quantity affects availability and pricing.",
        icon: PackageCheck,
    },
    {
        title: "Verification mindset",
        description:
            "Product identity, specifications, configuration and documentation should be checked before final acceptance where applicable.",
        icon: ShieldCheck,
    },
    {
        title: "Business-focused recommendations",
        description:
            "We consider how the equipment will actually be used instead of treating every procurement request as a generic product search.",
        icon: BadgeCheck,
    },
    {
        title: "Clear communication",
        description:
            "We aim to keep the procurement process understandable from requirement definition through fulfillment.",
        icon: Headphones,
    },
];

const procurementTypes = [
    "Single laptop or desktop",
    "Multiple employee devices",
    "Complete office hardware",
    "Computer laboratory setup",
    "Server and storage hardware",
    "Network equipment",
    "Security hardware",
    "Meeting-room technology",
    "Printers and scanners",
    "UPS and power equipment",
    "Accessories and peripherals",
    "Multi-location deployment",
];

const faqs = [
    {
        question: "Can you source a specific HP, Dell or Lenovo model?",
        answer:
            "Yes. You can provide the exact model number or product specification you are looking for. We can then assess sourcing options based on availability, configuration, quantity and other procurement requirements.",
    },
    {
        question: "Do I have to know the exact model I want?",
        answer:
            "No. You can describe the requirement instead. For example, you can say you need 50 laptops for office employees within a particular budget, and we can help translate that requirement into a suitable specification.",
    },
    {
        question: "Can you handle bulk orders?",
        answer:
            "Yes. Hardware sourcing can support larger procurement requirements such as employee deployments, school laboratories, branch rollouts and infrastructure projects. Larger orders may require additional availability and quotation checks.",
    },
    {
        question: "Can you source Apple products too?",
        answer:
            "You can request Apple hardware alongside other brands. Availability, procurement route, warranty and commercial terms depend on the specific product and sourcing channel.",
    },
    {
        question: "Can you source products internationally?",
        answer:
            "International sourcing may be considered where appropriate. The final route depends on product availability, destination, shipping, duties, warranty considerations, lead time and the commercial structure of the order.",
    },
    {
        question: "Can you help if the product is not available locally?",
        answer:
            "Yes. When local availability is limited, alternative sourcing routes may be evaluated. We can also help compare an equivalent locally available configuration against an international option.",
    },
    {
        question: "Can you help me choose between two laptops?",
        answer:
            "Yes. Send the two specifications and tell us what the devices will be used for. We can help compare processor, memory, storage, display, warranty, upgradeability and other relevant factors.",
    },
    {
        question: "Do you sell hardware directly?",
        answer:
            "Hardware procurement can be handled as a sourcing and fulfillment service. The exact commercial arrangement depends on the requested product, quantity, sourcing route and agreed quotation.",
    },
    {
        question: "Can you supply complete office setups?",
        answer:
            "Yes. A requirement can include laptops or desktops, monitors, networking, UPS systems, printers, accessories, meeting-room equipment and other technology components.",
    },
    {
        question: "Can you source equipment for schools?",
        answer:
            "Yes. Educational procurement can include computer laboratory equipment, networking, displays, printers, power protection, accessories and other technology infrastructure.",
    },
];

const brandGroups = [
    {
        title: "Business Computing",
        items: ["HP", "Dell", "Lenovo", "Acer", "ASUS", "Microsoft"],
    },
    {
        title: "Apple Ecosystem",
        items: ["MacBook", "iMac", "Mac mini", "iPad", "iPhone", "Apple accessories"],
    },
    {
        title: "Infrastructure",
        items: ["Servers", "Storage", "Networking", "Firewalls", "UPS", "Rack equipment"],
    },
    {
        title: "Workplace Technology",
        items: ["Monitors", "Printers", "Webcams", "Docking stations", "Headsets", "Peripherals"],
    },
];

const requestExamples = [
    {
        label: "Example 01",
        title: "Employee laptops",
        text:
            "We need 25 business laptops for employees. Minimum Core i5/Ryzen 5, 16GB RAM, 512GB SSD, Windows 11 Pro. Please recommend suitable HP, Dell or Lenovo options.",
    },
    {
        label: "Example 02",
        title: "Computer laboratory",
        text:
            "We need 50 desktop computers for a training center, including monitors, keyboards, mice, UPS and networking. Budget and durability are important.",
    },
    {
        label: "Example 03",
        title: "Office infrastructure",
        text:
            "We are opening a new office and need laptops, monitors, printer, router, switches, Wi-Fi access points, UPS units and accessories for approximately 30 employees.",
    },
];

/* =========================================================
   ICON HELPERS (unchanged)
   ========================================================= */

function MessageIcon(props) {
    return <Mail {...props} />;
}

function GraduationIcon(props) {
    return <BookOpenIcon {...props} />;
}

function BookOpenIcon(props) {
    return <BookOpenFallback {...props} />;
}

function BookOpenFallback(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H20v17H4.5A2.5 2.5 0 0 0 2 21.5z" />
            <path d="M2 21.5A2.5 2.5 0 0 1 4.5 19H20" />
            <path d="M7 6h8" />
            <path d="M7 10h8" />
        </svg>
    );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function HardwareSourcing() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [requestType, setRequestType] = useState("Hardware sourcing");
    const [quantity, setQuantity] = useState("");
    const [budget, setBudget] = useState("");
    const [requirement, setRequirement] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const visibleCategories = showAllCategories
        ? sourcingCategories
        : sourcingCategories.slice(0, 6);

    /* -----------------------------------------------------
       Hand off a contextual request to the support page.
       The support page auto-sends it and continues the
       conversation with AB AI.
    ----------------------------------------------------- */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss hardware sourcing or procurement.",
            metadata: metadata || {
                Source: "Hardware Sourcing & Procurement",
            },
        });

        navigate("/support/ai");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        // Build a rich, contextual message from the form fields
        const composedMessage = [
            "I'd like to submit a hardware sourcing request.",
            "",
            `Requirement type: ${requestType}`,
            quantity ? `Quantity: ${quantity}` : null,
            budget ? `Budget: ${budget}` : null,
            requirement ? `Details: ${requirement}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        startSupportChat(composedMessage, {
            Source: "Hardware Sourcing & Procurement",
            "Request type": requestType,
            Quantity: quantity || "Not specified",
            Budget: budget || "Not specified",
            Stage: "Sourcing request form",
        });

        setTimeout(() => {
            setSubmitted(false);
        }, 5000);
    };

    return (
        <main className="mt-25 min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-white">
            {/* ============================================================
                HERO
            ============================================================ */}

            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.12),transparent_25%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.20),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.14),transparent_25%),linear-gradient(to_bottom,#070b19,#050816)]" />

                <div className="absolute left-[-10rem] top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-[-8rem] top-40 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                                Hardware Sourcing & Procurement
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                The right hardware.
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
                                    Sourced with purpose.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                From one laptop to a complete enterprise deployment,
                                we help businesses, institutions, schools and teams
                                identify, source, compare and procure the hardware
                                they actually need.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not need to know every model number, supplier
                                or technical specification. Start with your
                                requirement. We can help from the scratch.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#request"
                                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                >
                                    Start a sourcing request
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </a>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss hardware sourcing. I need help identifying, comparing or procuring hardware for my organization.",
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                Stage: "Initial conversation",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white/70 px-6 py-3.5 text-sm font-bold text-blue-700 backdrop-blur transition hover:border-blue-400 hover:bg-white dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-300 dark:hover:border-blue-400/40 dark:hover:bg-white/[0.07]"
                                >
                                    Chat with AB AI
                                    <Sparkles className="h-4 w-4" />
                                </button>

                                <a
                                    href="#process"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-700 backdrop-blur transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-blue-400/30 dark:hover:bg-white/[0.07]"
                                >
                                    See how sourcing works
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                                {[
                                    ["01", "Requirement"],
                                    ["02", "Sourcing"],
                                    ["03", "Verification"],
                                    ["04", "Fulfillment"],
                                ].map(([number, label]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="text-xs font-black text-blue-600 dark:text-blue-400">
                                            {number}
                                        </div>
                                        <div className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero visual — unchanged */}
                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                            <div className="relative rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-2xl shadow-slate-300/30 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1020]/80 dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white dark:border-white/10">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                                                Sourcing workspace
                                            </div>
                                            <div className="mt-1 text-lg font-black">
                                                Procurement request
                                            </div>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                            <ShoppingCart className="h-5 w-5 text-blue-300" />
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-400">
                                                Requirement
                                            </span>
                                            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                                                Processing
                                            </span>
                                        </div>

                                        <div className="mt-2 text-base font-bold">
                                            25 Business Laptops
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            {[
                                                ["Memory", "16 GB"],
                                                ["Storage", "512 GB SSD"],
                                                ["OS", "Windows 11 Pro"],
                                                ["Quantity", "25 units"],
                                            ].map(([label, value]) => (
                                                <div
                                                    key={label}
                                                    className="rounded-xl bg-white/[0.04] p-3"
                                                >
                                                    <div className="text-[10px] uppercase tracking-wider text-slate-500">
                                                        {label}
                                                    </div>
                                                    <div className="mt-1 text-sm font-bold">
                                                        {value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        {[
                                            ["Requirement defined", true],
                                            ["Supplier options identified", true],
                                            ["Product details reviewed", true],
                                            ["Final procurement approval", false],
                                        ].map(([text, complete]) => (
                                            <div
                                                key={text}
                                                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-2.5"
                                            >
                                                <div
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full ${complete
                                                        ? "bg-emerald-400/15 text-emerald-300"
                                                        : "bg-white/10 text-slate-500"
                                                        }`}
                                                >
                                                    {complete ? (
                                                        <Check className="h-3.5 w-3.5" />
                                                    ) : (
                                                        <Clock3 className="h-3.5 w-3.5" />
                                                    )}
                                                </div>
                                                <span className="text-xs font-medium text-slate-300">
                                                    {text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {[
                                        [Laptop, "Computing", "text-blue-500"],
                                        [Server, "Infrastructure", "text-cyan-500"],
                                        [ShieldCheck, "Verification", "text-indigo-500"],
                                    ].map(([Icon, label, color]) => (
                                        <div
                                            key={label}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                                        >
                                            <Icon className={`h-5 w-5 ${color}`} />
                                            <div className="mt-3 text-xs font-bold text-slate-700 dark:text-slate-200">
                                                {label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                TRUST STRIP — each item now clickable to chat
            ============================================================ */}
            <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-[#070b17]">
                <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
                    <div className="grid gap-5 md:grid-cols-4">
                        {[
                            {
                                icon: Search,
                                title: "Source intelligently",
                                text: "Start with the requirement, not the product list.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Verify the details",
                                text: "Keep configuration and product identity in focus.",
                            },
                            {
                                icon: PackageCheck,
                                title: "Procure confidently",
                                text: "Review the recommendation before proceeding.",
                            },
                            {
                                icon: Headphones,
                                title: "Support the deployment",
                                text: "Hardware can connect to wider IT services.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to learn more about: ${item.title} — ${item.text}`,
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                Topic: item.title,
                                            }
                                        )
                                    }
                                    className="flex gap-3 rounded-2xl p-2 text-left transition hover:bg-blue-50 dark:hover:bg-white/[0.04]"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-sm font-black text-slate-900 dark:text-white">
                                            {item.title}
                                        </div>
                                        <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
                INTRODUCTION
            ============================================================ */}
            <section className="relative bg-slate-50 py-20 lg:py-28 dark:bg-[#050816]">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.07),transparent_30%)] dark:bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.09),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div className="lg:sticky lg:top-28">
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                More than finding products
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                Hardware procurement should solve a business problem.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Buying technology is easy when all you need is a
                                product link. Business procurement is different.
                                The hardware has to match the people using it,
                                the work being performed, the infrastructure around
                                it, the budget available and the operational
                                expectations of the organization.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like help understanding how hardware procurement should solve a business problem — not just find products.",
                                        {
                                            Source: "Hardware Sourcing & Procurement",
                                            Topic: "Procurement philosophy",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400"
                            >
                                Tell us what you are trying to accomplish
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {trustPoints.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss this sourcing principle: ${item.title} — ${item.description}`,
                                                {
                                                    Source: "Hardware Sourcing & Procurement",
                                                    Principle: item.title,
                                                }
                                            )
                                        }
                                        className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/20"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-300 dark:group-hover:bg-blue-500">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-black text-slate-900 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                WHAT WE SOURCE — category cards now chat-enabled
            ============================================================ */}
            <section
                id="categories"
                className="relative overflow-hidden bg-white py-20 lg:py-28 dark:bg-[#070b17]"
            >
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What we can source
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            From individual devices to complete technology environments.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            Hardware sourcing does not have to stop at laptops.
                            Build a complete requirement around your workplace,
                            institution, project or infrastructure.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {visibleCategories.map((category, index) => {
                            const Icon = category.icon;
                            const active = activeCategory === index;

                            return (
                                <button
                                    type="button"
                                    key={category.title}
                                    onClick={() => setActiveCategory(index)}
                                    className={`group text-left rounded-3xl border p-6 transition ${active
                                        ? "border-blue-300 bg-blue-50/70 shadow-xl shadow-blue-500/5 dark:border-blue-400/30 dark:bg-blue-500/[0.07]"
                                        : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-400/20 dark:hover:bg-white/[0.05]"
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-blue-600 dark:bg-white/10 dark:text-blue-300"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <ArrowUpRight
                                            className={`h-5 w-5 transition ${active
                                                ? "text-blue-600 dark:text-blue-300"
                                                : "text-slate-400 group-hover:text-blue-500"
                                                }`}
                                        />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
                                        {category.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {category.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {category.examples.map((example) => (
                                            <span
                                                key={example}
                                                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                                            >
                                                {example}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Chat handoff button */}
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startSupportChat(
                                                `I'd like to source ${category.title.toLowerCase()}. ${category.description} Examples: ${category.examples.join(", ")}.`,
                                                {
                                                    Source: "Hardware Sourcing & Procurement",
                                                    Category: category.title,
                                                }
                                            );
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                startSupportChat(
                                                    `I'd like to source ${category.title.toLowerCase()}.`,
                                                    {
                                                        Source: "Hardware Sourcing & Procurement",
                                                        Category: category.title,
                                                    }
                                                );
                                            }
                                        }}
                                        className="mt-5 inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:gap-3 dark:text-blue-400"
                                    >
                                        Request this category
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            type="button"
                            onClick={() =>
                                setShowAllCategories((previous) => !previous)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                        >
                            {showAllCategories
                                ? "Show fewer categories"
                                : "View all sourcing categories"}
                            <ChevronDown
                                className={`h-4 w-4 transition ${showAllCategories ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </section>

            {/* ============================================================
                PRODUCT SCOPE — each item clickable
            ============================================================ */}
            <section className="bg-slate-50 py-20 lg:py-28 dark:bg-[#050816]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                                <Package className="h-3.5 w-3.5" />
                                Procurement scope
                            </div>

                            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                If it is part of the technology environment, it can be part of the conversation.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A good hardware procurement project often involves
                                more than the main device. We can help organize the
                                complete requirement so important supporting
                                equipment does not get forgotten.
                            </p>

                            <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-400/20 dark:bg-blue-500/[0.06]">
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                        <Sparkles className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-900 dark:text-white">
                                            Not sure what you need?
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            That is okay. Tell us your number of
                                            users, business activity, location,
                                            budget and intended use. We can help
                                            turn that into a procurement brief.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'm not sure exactly what hardware I need. Can you help me turn my business situation into a procurement brief?",
                                                    {
                                                        Source: "Hardware Sourcing & Procurement",
                                                        Stage: "Requirement discovery",
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

                        <div className="grid gap-3 sm:grid-cols-2">
                            {procurementTypes.map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to procure: ${item}. Can you help me scope this requirement?`,
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                "Procurement type": item,
                                            }
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Check className="h-4 w-4" />
                                    </div>

                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                        {item}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                HOW IT WORKS — each step clickable
            ============================================================ */}
            <section
                id="process"
                className="relative overflow-hidden bg-white py-20 lg:py-28 dark:bg-[#070b17]"
            >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            How it works
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            From “I need this” to a structured procurement process.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            You do not need to manage every supplier, product
                            specification and procurement detail yourself.
                        </p>
                    </div>

                    <div className="relative mt-16">
                        <div className="absolute left-[8.333%] right-[8.333%] top-10 hidden h-px bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 lg:block dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-blue-500/20" />

                        <div className="grid gap-8 lg:grid-cols-6">
                            {sourcingSteps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <button
                                        type="button"
                                        key={step.number}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to understand the sourcing step: "${step.title}" — ${step.description}`,
                                                {
                                                    Source: "Hardware Sourcing & Procurement",
                                                    Step: `${step.number} — ${step.title}`,
                                                }
                                            )
                                        }
                                        className="relative text-center transition hover:-translate-y-1"
                                    >
                                        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-200 bg-white text-blue-600 shadow-xl shadow-blue-500/5 dark:border-blue-400/20 dark:bg-[#0b1020] dark:text-blue-300">
                                            <Icon className="h-7 w-7" />

                                            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white shadow-lg">
                                                {step.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-base font-black text-slate-900 dark:text-white">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                REQUIREMENT BUILDER
            ============================================================ */}
            <section className="bg-slate-950 py-20 text-white lg:py-28 dark:bg-[#03050d]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-blue-300">
                                <ClipboardCheck className="h-3.5 w-3.5" />
                                Start with the requirement
                            </div>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                You do not have to speak “hardware”.
                            </h2>

                            <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
                                Tell us what you are trying to accomplish. We can
                                help turn the business requirement into a hardware
                                specification that can be sourced and compared.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "How many people will use the equipment?",
                                    "What applications or workload will they run?",
                                    "Where will the equipment be used?",
                                    "What budget range should we work within?",
                                    "Do you require a specific brand?",
                                    "Is this a one-time purchase or a larger deployment?",
                                ].map((question) => (
                                    <div
                                        key={question}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                                        <span className="text-sm text-slate-300">
                                            {question}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur">
                            <div className="rounded-3xl border border-white/10 bg-[#0a0f1e] p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                                        <SlidersHorizontal className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-sm font-black">
                                            Requirement builder
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            Start simple. Add details as you go.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-xs font-bold text-slate-400">
                                            Requirement type
                                        </label>

                                        <select
                                            value={requestType}
                                            onChange={(e) =>
                                                setRequestType(e.target.value)
                                            }
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-400"
                                        >
                                            <option className="bg-slate-900">Hardware sourcing</option>
                                            <option className="bg-slate-900">Laptop procurement</option>
                                            <option className="bg-slate-900">Desktop procurement</option>
                                            <option className="bg-slate-900">Server & storage</option>
                                            <option className="bg-slate-900">Networking equipment</option>
                                            <option className="bg-slate-900">Complete office setup</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold text-slate-400">
                                            Quantity
                                        </label>

                                        <input
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                            placeholder="e.g. 25 units"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-400"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-xs font-bold text-slate-400">
                                            Budget range
                                        </label>

                                        <input
                                            value={budget}
                                            onChange={(e) =>
                                                setBudget(e.target.value)
                                            }
                                            placeholder="e.g. ₦700,000 - ₦900,000 per laptop"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-400"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-xs font-bold text-slate-400">
                                            What do you need?
                                        </label>

                                        <textarea
                                            rows={5}
                                            value={requirement}
                                            onChange={(e) =>
                                                setRequirement(e.target.value)
                                            }
                                            placeholder="Describe the equipment, users, location, preferred brands, specifications, deadline or anything else you already know."
                                            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-400"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const composed = [
                                            "I'd like to discuss a hardware sourcing requirement.",
                                            "",
                                            `Requirement type: ${requestType}`,
                                            quantity ? `Quantity: ${quantity}` : null,
                                            budget ? `Budget: ${budget}` : null,
                                            requirement ? `Details: ${requirement}` : null,
                                        ]
                                            .filter(Boolean)
                                            .join("\n");

                                        startSupportChat(composed, {
                                            Source: "Hardware Sourcing & Procurement",
                                            "Request type": requestType,
                                            Quantity: quantity || "Not specified",
                                            Budget: budget || "Not specified",
                                            Stage: "Requirement builder",
                                        });
                                    }}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
                                >
                                    Continue with this requirement
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                USE CASES — cards now chat-enabled
            ============================================================ */}
            <section className="bg-slate-50 py-20 lg:py-28 dark:bg-[#050816]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Built around real requirements
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            Hardware sourcing for the way organizations actually work.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            Different environments need different procurement
                            strategies. A laptop for an executive, a computer lab
                            and a server room are not the same problem.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {useCases.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss hardware sourcing for: ${item.title}. ${item.description}`,
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                "Use case": item.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/20"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white dark:bg-white/10 dark:text-slate-200 dark:group-hover:bg-blue-500">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.description}
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-1 text-xs font-black text-blue-600 dark:text-blue-400">
                                        Explore this requirement
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
                BRANDS — groups now chat-enabled
            ============================================================ */}
            <section className="bg-white py-20 lg:py-28 dark:bg-[#070b17]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Brands & ecosystems
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Start with your preferred brand — or let us help you compare.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                We can work from an exact product request or from
                                a business requirement where several brands may
                                provide suitable alternatives.
                            </p>

                            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                                <Globe2 className="h-5 w-5 text-blue-500" />
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    Availability and sourcing routes vary by product,
                                    location and order size.
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {brandGroups.map((group) => (
                                <button
                                    type="button"
                                    key={group.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to source from the "${group.title}" ecosystem. Items: ${group.items.join(", ")}.`,
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                "Brand group": group.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-black text-slate-900 dark:text-white">
                                            {group.title}
                                        </h3>

                                        <ArrowUpRight className="h-4 w-4 text-slate-400" />
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                VERIFICATION — unchanged visual, added chat CTA
            ============================================================ */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28 dark:bg-[#03050d]">
                <div className="absolute left-[-12rem] top-[-8rem] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-[-10rem] right-[-10rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-blue-300">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Procurement discipline
                            </div>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                A product is more than its picture.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-400">
                                Hardware procurement can go wrong when the model,
                                configuration, operating system, warranty,
                                quantity or other details are misunderstood.
                                That is why requirement clarity and verification
                                are important parts of the process.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Model identification",
                                    "Processor configuration",
                                    "RAM capacity",
                                    "Storage capacity",
                                    "Display specification",
                                    "Operating system",
                                    "Warranty information",
                                    "Quantity and packaging",
                                    "Accessories",
                                    "Delivery requirements",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to make sure this procurement detail is verified: ${item}.`,
                                                {
                                                    Source: "Hardware Sourcing & Procurement",
                                                    "Verification item": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-left transition hover:border-blue-400/30 hover:bg-white/[0.06]"
                                    >
                                        <Check className="h-4 w-4 text-emerald-400" />
                                        <span className="text-xs font-semibold text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to understand how you verify hardware specifications, model identity, warranty and configuration before procurement.",
                                        {
                                            Source: "Hardware Sourcing & Procurement",
                                            Topic: "Verification process",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-100"
                            >
                                Ask about verification
                                <Sparkles className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
                            <div className="rounded-3xl border border-white/10 bg-[#0a0f1e] p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Example procurement record
                                        </div>
                                        <div className="mt-2 text-xl font-black">
                                            Business Laptop
                                        </div>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                                        <FileCheck2 className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {[
                                        ["Product category", "Business laptop"],
                                        ["Requested quantity", "25 units"],
                                        ["Memory", "16 GB"],
                                        ["Storage", "512 GB SSD"],
                                        ["Operating system", "Windows 11 Pro"],
                                        ["Preferred brands", "HP / Dell / Lenovo"],
                                        ["Warranty", "To be confirmed"],
                                        ["Delivery", "To be confirmed"],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between gap-4 border-b border-white/5 py-3 last:border-0"
                                        >
                                            <span className="text-xs text-slate-500">
                                                {label}
                                            </span>
                                            <span className="text-right text-xs font-bold text-slate-200">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                                    <div className="flex gap-3">
                                        <BadgeCheck className="h-5 w-5 shrink-0 text-blue-300" />
                                        <p className="text-xs leading-6 text-blue-100/80">
                                            Example only. Final specifications
                                            should be agreed and verified against
                                            the actual procurement requirement.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                BULK PROCUREMENT — cards + CTA chat-enabled
            ============================================================ */}
            <section className="bg-slate-50 py-20 lg:py-28 dark:bg-[#050816]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        {[
                            {
                                icon: Package,
                                title: "Standardize",
                                text: "Larger deployments benefit from consistent configurations. Standardization can simplify support, training, replacement and management.",
                                accent: false,
                            },
                            {
                                icon: BarChart3,
                                title: "Compare",
                                text: "Larger quantities may create different sourcing possibilities. We can structure options around the required quantity and specifications.",
                                accent: true,
                            },
                            {
                                icon: Truck,
                                title: "Coordinate",
                                text: "Larger orders require attention to quantities, packaging, logistics, documentation and delivery coordination.",
                                accent: false,
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss bulk procurement — specifically the "${item.title}" aspect: ${item.text}`,
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                "Bulk topic": item.title,
                                            }
                                        )
                                    }
                                    className={`rounded-[2rem] border p-7 text-left transition hover:-translate-y-1 ${item.accent
                                        ? "border-blue-200 bg-blue-50 shadow-xl shadow-blue-500/5 dark:border-blue-400/20 dark:bg-blue-500/[0.06]"
                                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]"
                                        }`}
                                >
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.accent
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Bulk & corporate orders
                                </div>

                                <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                                    Need 10, 50, 100 or more devices?
                                </h3>

                                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    Send the requirement. We can help structure
                                    the procurement around quantities, technical
                                    specifications, preferred brands and delivery
                                    expectations.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss bulk hardware sourcing — quantities, specification, brands and delivery.",
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                Stage: "Bulk procurement",
                                            }
                                        )
                                    }
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                                >
                                    Discuss bulk sourcing
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                INTERNATIONAL SOURCING — items clickable
            ============================================================ */}
            <section className="bg-white py-20 lg:py-28 dark:bg-[#070b17]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                        <div>
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Local & international options
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                When local availability is not enough, explore the wider sourcing picture.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Some products may be easier to source through
                                another market or supplier route. International
                                procurement can introduce additional considerations,
                                including shipping, customs, taxes, warranty,
                                lead times and after-sales support.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    { icon: Globe2, title: "Market availability", text: "Check whether the requested configuration is available in the relevant market." },
                                    { icon: Plane, title: "Logistics", text: "Consider transportation, shipping time, customs and delivery arrangements." },
                                    { icon: ShieldCheck, title: "Warranty", text: "Understand warranty coverage and whether it applies in the destination market." },
                                    { icon: BarChart3, title: "Total landed cost", text: "Compare the full cost rather than looking only at the advertised product price." },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            type="button"
                                            key={item.title}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss international sourcing — specifically: ${item.title}. ${item.text}`,
                                                    {
                                                        Source: "Hardware Sourcing & Procurement",
                                                        "International topic": item.title,
                                                    }
                                                )
                                            }
                                            className="flex w-full gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-300">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl dark:border-white/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.18em] text-blue-300">
                                            Sourcing map
                                        </div>
                                        <div className="mt-2 text-2xl font-black">
                                            Requirement → Market → Fulfillment
                                        </div>
                                    </div>

                                    <Globe2 className="h-7 w-7 text-blue-300" />
                                </div>

                                <div className="relative mt-8 space-y-4">
                                    {[
                                        ["01", "Requirement", "What exactly is needed?"],
                                        ["02", "Market", "Where is the right configuration available?"],
                                        ["03", "Commercials", "What is the total procurement cost?"],
                                        ["04", "Fulfillment", "How will it reach the client?"],
                                    ].map(([num, title, text], index) => (
                                        <button
                                            type="button"
                                            key={title}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss the sourcing stage: ${title} — ${text}`,
                                                    {
                                                        Source: "Hardware Sourcing & Procurement",
                                                        "Sourcing stage": title,
                                                    }
                                                )
                                            }
                                            className="relative flex w-full gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-300">
                                                {num}
                                            </div>

                                            <div>
                                                <div className="text-sm font-black">
                                                    {title}
                                                </div>
                                                <div className="mt-1 text-xs leading-5 text-slate-500">
                                                    {text}
                                                </div>
                                            </div>

                                            {index < 3 && (
                                                <div className="absolute -bottom-5 left-9 h-5 w-px bg-blue-400/20" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                EXAMPLES — cards now chat-enabled
            ============================================================ */}
            <section className="bg-slate-50 py-20 lg:py-28 dark:bg-[#050816]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            What you can send us
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Your request does not need to be perfect.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                            These are examples of the kind of information that can
                            start a conversation.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {requestExamples.map((example) => (
                            <div
                                key={example.title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                            >
                                <div className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                    {example.label}
                                </div>

                                <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-white">
                                    {example.title}
                                </h3>

                                <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-black/10 dark:text-slate-400">
                                    “{example.text}”
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(example.text, {
                                            Source: "Hardware Sourcing & Procurement",
                                            Example: example.label,
                                            "Example title": example.title,
                                        })
                                    }
                                    className="mt-5 inline-flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400"
                                >
                                    Use this approach
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                RELATED SERVICES — cards chat-enabled
            ============================================================ */}
            <section className="bg-white py-20 lg:py-28 dark:bg-[#070b17]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                More than hardware
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Your hardware can become part of a complete IT solution.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Procurement is often the first step. Once the
                                equipment is selected, organizations may need
                                networking, deployment, security, cloud services,
                                software and ongoing support.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                [Server, "Networking & infrastructure", "Connect and structure the environment around the hardware."],
                                [ShieldCheck, "Security", "Protect devices, accounts, networks and business information."],
                                [Wrench, "Deployment & support", "Configure, deploy, maintain and support technology."],
                                [Sparkles, "Software & automation", "Connect hardware to applications, workflows and digital systems."],
                            ].map(([Icon, title, text]) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the related service: ${title} — ${text}`,
                                            {
                                                Source: "Hardware Sourcing & Procurement",
                                                "Related service": title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />

                                    <h3 className="mt-4 font-black text-slate-900 dark:text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                FAQ — each open item now has a chat button
            ============================================================ */}
            <section className="bg-slate-50 py-20 lg:py-28 dark:bg-[#050816]">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Hardware sourcing, clarified.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                            A few answers to common questions before you begin.
                        </p>
                    </div>

                    <div className="mt-10 space-y-3">
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
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${isOpen
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-white/5">
                                                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                    {faq.answer}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I have a question about: "${faq.question}"`,
                                                            {
                                                                Source: "Hardware Sourcing & Procurement",
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
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================================================
                REQUEST FORM — submit now sends to support
            ============================================================ */}
            <section
                id="request"
                className="relative overflow-hidden bg-blue-600 py-20 text-white lg:py-28 dark:bg-blue-700"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(0,0,0,0.12),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                                <ShoppingCart className="h-3.5 w-3.5" />
                                Request hardware sourcing
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Tell us what you need. We will help you work it out.
                            </h2>

                            <p className="mt-5 max-w-xl text-base leading-8 text-blue-100">
                                Whether you know the exact product or only know the
                                problem you need to solve, start here.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Exact model or product name",
                                    "Technical specification",
                                    "Quantity required",
                                    "Budget or target price",
                                    "Preferred brand",
                                    "Required delivery timeline",
                                    "Destination/location",
                                    "Any other procurement instructions",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-blue-200" />
                                        <span className="text-sm text-blue-50">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                                <div className="flex gap-4">
                                    <Headphones className="h-5 w-5 shrink-0 text-white" />
                                    <div>
                                        <div className="text-sm font-black">
                                            Not sure what to write?
                                        </div>
                                        <p className="mt-1 text-xs leading-6 text-blue-100">
                                            Simply tell us the number of users,
                                            what they do, what equipment they need
                                            and your approximate budget.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[2rem] border border-white/20 bg-white p-5 text-slate-900 shadow-2xl dark:bg-[#0b1020] dark:text-white"
                        >
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.035]">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            What are you sourcing?
                                        </label>

                                        <select
                                            value={requestType}
                                            onChange={(e) =>
                                                setRequestType(e.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                                        >
                                            <option className="text-slate-900">Hardware sourcing</option>
                                            <option className="text-slate-900">Laptops</option>
                                            <option className="text-slate-900">Desktops</option>
                                            <option className="text-slate-900">Servers & storage</option>
                                            <option className="text-slate-900">Networking</option>
                                            <option className="text-slate-900">Office technology</option>
                                            <option className="text-slate-900">School / institutional setup</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Quantity
                                        </label>

                                        <input
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                            placeholder="e.g. 20"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Budget
                                        </label>

                                        <input
                                            value={budget}
                                            onChange={(e) =>
                                                setBudget(e.target.value)
                                            }
                                            placeholder="e.g. ₦15m total"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Requirement details
                                        </label>

                                        <textarea
                                            required
                                            rows={7}
                                            value={requirement}
                                            onChange={(e) =>
                                                setRequirement(e.target.value)
                                            }
                                            placeholder="Tell us everything you know: model, specifications, quantity, preferred brand, intended use, location, deadline and any other requirements."
                                            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    {submitted
                                        ? "Request received"
                                        : "Submit sourcing request"}
                                    {submitted ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <ArrowRight className="h-4 w-4" />
                                    )}
                                </button>

                                {submitted && (
                                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-xs font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        Your request has been sent to AB AI.
                                        Redirecting you to continue the
                                        conversation…
                                    </div>
                                )}

                                <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                                    Final pricing, availability, warranty and
                                    delivery terms are subject to confirmation
                                    before procurement.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* ============================================================
                FINAL CTA
            ============================================================ */}
            <section className="bg-slate-50 py-20 dark:bg-[#050816]">
                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                        <Cpu className="h-7 w-7" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                        Start with the requirement.
                        <span className="block text-blue-600 dark:text-blue-400">
                            We will help with the rest.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                        One device, a complete office, a school laboratory, an
                        infrastructure project or a large corporate deployment —
                        hardware sourcing can start with a simple conversation.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a hardware sourcing request. Here's what I need:",
                                    {
                                        Source: "Hardware Sourcing & Procurement",
                                        Stage: "Final CTA",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
                        >
                            Start a sourcing request
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to chat with AB AI about hardware sourcing before submitting a request.",
                                    {
                                        Source: "Hardware Sourcing & Procurement",
                                        Stage: "Pre-request chat",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-200 dark:hover:border-blue-400/20 dark:hover:text-blue-300"
                        >
                            Chat with AB AI
                            <MessageSquare className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
                        <span className="inline-flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            Requirement-focused
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Sourcing support
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <PackageCheck className="h-4 w-4" />
                            Procurement coordination
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Headphones className="h-4 w-4" />
                            Technology support
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}