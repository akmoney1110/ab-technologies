import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Bell,
    Building2,
    Calculator,
    Check,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    Clock3,
    Cloud,
    FileCheck2,
    FileSearch,
    Filter,
    Globe2,
    HandCoins,
    Headphones,
    Layers3,
    Lightbulb,
    ListChecks,
    Mail,
    MapPin,
    MessageSquare,
    Package,
    Percent,
    Phone,
    Search,
    Send,
    ShieldCheck,
    ShoppingCart,
    SlidersHorizontal,
    Sparkles,
    Target,
    TrendingDown,
    Truck,
    Users,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

const quotationServices = [
    {
        icon: Search,
        title: "Requirement Analysis",
        description:
            "We turn your technical, operational or procurement requirements into a clear quotation brief suppliers can understand and price accurately.",
    },
    {
        icon: Users,
        title: "Supplier Comparison",
        description:
            "We can compare multiple supplier responses across price, specification, warranty, availability, delivery and commercial terms.",
    },
    {
        icon: TrendingDown,
        title: "Competitive Pricing",
        description:
            "For suitable requests, we seek competitive pricing rather than relying on a single supplier or first available quote.",
    },
    {
        icon: ShieldCheck,
        title: "Supplier Verification",
        description:
            "Supplier and product information can be reviewed as part of the procurement process before recommendations are presented.",
    },
    {
        icon: Package,
        title: "Product Matching",
        description:
            "We help ensure quoted products actually correspond with the requested specifications, quantities and intended use.",
    },
    {
        icon: Truck,
        title: "Delivery Planning",
        description:
            "Delivery location, lead time, logistics considerations and fulfillment requirements can be incorporated into the quotation review.",
    },
];

const quotationStages = [
    {
        number: "01",
        title: "Tell us what you need",
        description:
            "Share your product list, technical specifications, quantities, budget expectations, delivery location or project requirements.",
        icon: ClipboardCheck,
    },
    {
        number: "02",
        title: "We structure the request",
        description:
            "Your requirements are organized into a procurement-ready brief that makes it easier to obtain meaningful supplier responses.",
        icon: FileSearch,
    },
    {
        number: "03",
        title: "We seek options",
        description:
            "Where appropriate, we approach relevant suppliers, sourcing channels or procurement partners to identify viable options.",
        icon: Globe2,
    },
    {
        number: "04",
        title: "We compare",
        description:
            "Responses can be assessed against price, specification, availability, warranty, lead time and other important commercial factors.",
        icon: BarChart3,
    },
    {
        number: "05",
        title: "You review",
        description:
            "We present the available options in a clear format so your team can make a more informed purchasing decision.",
        icon: FileCheck2,
    },
    {
        number: "06",
        title: "We help move forward",
        description:
            "Once an option is selected, we can support sourcing, procurement coordination, delivery and deployment where required.",
        icon: ArrowRight,
    },
];

const procurementCategories = [
    {
        title: "Computers & Laptops",
        description:
            "Business laptops, desktops, workstations, monitors, accessories and computing equipment.",
        items: [
            "Business laptops",
            "Desktop computers",
            "Workstations",
            "Monitors",
            "Docking stations",
            "Keyboards and mice",
        ],
        icon: Cloud,
    },
    {
        title: "Networking Equipment",
        description:
            "Infrastructure hardware for offices, institutions, branches, facilities and enterprise environments.",
        items: [
            "Network switches",
            "Routers",
            "Wireless access points",
            "Network racks",
            "Firewalls",
            "Structured cabling",
        ],
        icon: Globe2,
    },
    {
        title: "Servers & Storage",
        description:
            "Server infrastructure and storage solutions for applications, files, databases and business systems.",
        items: [
            "Rack servers",
            "Tower servers",
            "NAS systems",
            "Enterprise storage",
            "Backup systems",
            "UPS systems",
        ],
        icon: Layers3,
    },
    {
        title: "Security & Access",
        description:
            "Technology products supporting physical security, access management and monitoring.",
        items: [
            "CCTV systems",
            "Access control",
            "Biometric devices",
            "Intercom systems",
            "Security monitors",
            "Network video recorders",
        ],
        icon: ShieldCheck,
    },
    {
        title: "Office Technology",
        description:
            "Technology and equipment required to equip modern offices and professional workspaces.",
        items: [
            "Printers",
            "Scanners",
            "Projectors",
            "Conference equipment",
            "UPS and power",
            "Office accessories",
        ],
        icon: Building2,
    },
    {
        title: "Education Technology",
        description:
            "Equipment packages for schools, universities, training centres and digital learning environments.",
        items: [
            "Computer labs",
            "Smart displays",
            "Projectors",
            "Student computers",
            "Networking",
            "Digital classroom equipment",
        ],
        icon: Lightbulb,
    },
];

const comparisonFactors = [
    {
        title: "Price",
        description:
            "We look beyond the headline price and consider the commercial picture around the proposed product or service.",
        icon: HandCoins,
    },
    {
        title: "Specification",
        description:
            "A cheaper item is not useful if it does not meet the required technical specification or intended use.",
        icon: ListChecks,
    },
    {
        title: "Availability",
        description:
            "Stock status and realistic availability matter when a project has a deadline.",
        icon: Package,
    },
    {
        title: "Warranty",
        description:
            "Warranty coverage can be considered alongside product price and supplier terms.",
        icon: BadgeCheck,
    },
    {
        title: "Lead Time",
        description:
            "Expected fulfillment time can influence which supplier represents the better overall option.",
        icon: Clock3,
    },
    {
        title: "Delivery",
        description:
            "Delivery requirements and location can be factored into the procurement decision.",
        icon: Truck,
    },
];

const quotationPackages = [
    {
        title: "Single Requirement",
        subtitle: "For straightforward purchases",
        description:
            "Ideal when you already know the product or service you need and simply want help obtaining a competitive procurement option.",
        features: [
            "Requirement review",
            "Product specification check",
            "Supplier sourcing",
            "Quotation comparison",
            "Commercial summary",
        ],
        icon: Target,
    },
    {
        title: "Bulk Procurement",
        subtitle: "For larger quantities",
        description:
            "Designed for organizations purchasing multiple units, equipment categories or complete technology packages.",
        features: [
            "Quantity planning",
            "Bulk supplier sourcing",
            "Volume pricing review",
            "Specification matching",
            "Delivery coordination",
        ],
        icon: Package,
        featured: true,
    },
    {
        title: "Project Procurement",
        subtitle: "For complete deployments",
        description:
            "For organizations that need technology sourced as part of a broader implementation, infrastructure or digital transformation project.",
        features: [
            "Project requirement analysis",
            "Multi-category sourcing",
            "Supplier coordination",
            "Procurement planning",
            "Deployment support",
        ],
        icon: Layers3,
    },
];

const faqs = [
    {
        question: "What is a competitive quotation?",
        answer:
            "A competitive quotation process involves obtaining and reviewing pricing or commercial options from relevant suppliers instead of automatically accepting a single supplier's first price.",
    },
    {
        question: "Can you source laptops in bulk?",
        answer:
            "Yes. Bulk laptop procurement can include specification matching, quantity planning, supplier sourcing, quotation comparison, warranty review and delivery coordination.",
    },
    {
        question: "Can I send you a list of many products?",
        answer:
            "Yes. You can provide a product list, bill of quantities, spreadsheet or procurement requirement and we can structure it into a clearer sourcing request.",
    },
    {
        question: "Can you work with a specific brand?",
        answer:
            "Yes. If your requirement specifies a particular manufacturer or model, that requirement can be incorporated into the sourcing process. Where alternatives are acceptable, comparable options can also be evaluated.",
    },
    {
        question: "Do you only compare prices?",
        answer:
            "No. Price is important, but it is only one consideration. Specification, availability, warranty, supplier terms, delivery and suitability can also influence the recommendation.",
    },
    {
        question: "Can you help if I do not know exactly what I need?",
        answer:
            "Yes. That is one of the areas where our procurement support can be useful. You can explain the business problem or intended use, and we can help translate it into a technology requirement.",
    },
    {
        question: "Can you help with international sourcing?",
        answer:
            "Yes. International sourcing can be considered when local options do not provide the required specification, availability or commercial fit. Import, shipping and other logistics considerations should be evaluated as part of the final procurement decision.",
    },
    {
        question: "Can you handle delivery?",
        answer:
            "Delivery coordination can be included where appropriate. The exact arrangement depends on the products, location, supplier and procurement scope.",
    },
];

export default function CompetitiveQuotations() {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState("All");
    const [openFaq, setOpenFaq] = useState(null);
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [quantity, setQuantity] = useState("");
    const [urgency, setUrgency] = useState("Standard");
    const [submitted, setSubmitted] = useState(false);

    // Controlled fields for inline quotation form
    const [fullName, setFullName] = useState("");
    const [organization, setOrganization] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [requirementText, setRequirementText] = useState("");

    // Controlled field for modal form
    const [modalRequirement, setModalRequirement] = useState("");

    /* -----------------------------------------------------
       Hand off a contextual request to the support page.
    ----------------------------------------------------- */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to request a competitive quotation or procurement support.",
            metadata: metadata || {
                Source: "Competitive Quotations",
            },
        });

        navigate("/support/ai");
    };

    const categories = [
        "All",
        "Computers",
        "Networking",
        "Servers",
        "Security",
        "Office",
        "Education",
    ];

    const categoryMap = {
        "Computers & Laptops": "Computers",
        "Networking Equipment": "Networking",
        "Servers & Storage": "Servers",
        "Security & Access": "Security",
        "Office Technology": "Office",
        "Education Technology": "Education",
    };

    const filteredCategories = useMemo(() => {
        return procurementCategories.filter((category) => {
            const matchesCategory =
                activeCategory === "All" ||
                categoryMap[category.title] === activeCategory;

            const searchable = [
                category.title,
                category.description,
                ...category.items,
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch = searchable.includes(searchTerm.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchTerm]);

    /* Inline quotation form submit */
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        const composed = [
            "I'd like to submit a competitive quotation request.",
            "",
            fullName ? `Name: ${fullName}` : null,
            organization ? `Organization: ${organization}` : null,
            email ? `Email: ${email}` : null,
            phone ? `Phone: ${phone}` : null,
            quantity ? `Quantity: ${quantity}` : null,
            urgency ? `Urgency: ${urgency}` : null,
            requirementText ? `\nRequirement details:\n${requirementText}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        startSupportChat(composed, {
            Source: "Competitive Quotations",
            Stage: "Inline quotation form",
            Quantity: quantity || "Not specified",
            Urgency: urgency || "Standard",
            Organization: organization || "Not specified",
            Name: fullName || "Not specified",
            Email: email || "Not specified",
            Phone: phone || "Not specified",
        });

        setTimeout(() => {
            setSubmitted(false);
        }, 4500);
    };

    /* Modal quotation form submit */
    const handleModalSubmit = (event) => {
        event.preventDefault();
        setShowQuoteForm(false);

        startSupportChat(
            `I'd like to start a quotation request.\n\n${modalRequirement}`,
            {
                Source: "Competitive Quotations",
                Stage: "Modal quotation form",
            }
        );
    };

    return (
        <main className="min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
            {/* HERO */}
            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.13),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.10),transparent_30%),linear-gradient(to_bottom,#f8fafc,#ffffff)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(to_bottom,#020617,#07111f)]" />

                <div className="absolute left-[-180px] top-32 -z-10 h-[420px] w-[420px] rounded-full border border-blue-200/50 bg-blue-100/20 blur-3xl dark:border-blue-500/10 dark:bg-blue-500/10" />
                <div className="absolute right-[-160px] top-10 -z-10 h-[440px] w-[440px] rounded-full border border-cyan-200/50 bg-cyan-100/20 blur-3xl dark:border-cyan-500/10 dark:bg-cyan-500/10" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur dark:border-blue-500/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <Sparkles className="h-4 w-4" />
                                Competitive Procurement
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Better procurement decisions start with{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                                    better options.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                We help organizations turn technology requirements
                                into structured, competitive procurement
                                opportunities — from a single laptop to complete
                                enterprise technology deployments.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not need to know every product, supplier or
                                technical specification before you contact us.
                                Start with the problem, project or outcome you need,
                                and we can help structure the requirement from the
                                scratch.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => {
                                        startSupportChat(
                                            "I'd like to request a competitive quotation. Here's what I need:",
                                            {
                                                Source: "Competitive Quotations",
                                                Stage: "Hero — request quote",
                                            }
                                        );
                                    }}
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                                >
                                    Request a Competitive Quote
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to understand your competitive quotation process before submitting a request.",
                                            {
                                                Source: "Competitive Quotations",
                                                Stage: "Hero — process query",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-700 backdrop-blur transition hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10"
                                >
                                    See How It Works
                                </button>
                            </div>

                            <div className="mt-9 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                                {[
                                    ["01", "Requirements"],
                                    ["02", "Sourcing"],
                                    ["03", "Comparison"],
                                    ["04", "Decision"],
                                ].map(([number, label]) => (
                                    <button
                                        type="button"
                                        key={number}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to understand the "${label}" stage of your quotation process.`,
                                                {
                                                    Source: "Competitive Quotations",
                                                    Stage: `${number} — ${label}`,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-left backdrop-blur transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/30"
                                    >
                                        <div className="text-xs font-black text-blue-600 dark:text-blue-400">
                                            {number}
                                        </div>
                                        <div className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                                            {label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-indigo-500/20 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-2xl shadow-slate-300/30 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                                Procurement Workspace
                                            </p>
                                            <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white">
                                                Compare your options
                                            </h2>
                                        </div>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                            <BarChart3 className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        {[
                                            { name: "Business Laptop", price: "Competitive", score: "94%" },
                                            { name: "Network Switch", price: "Best Value", score: "91%" },
                                            { name: "Office Workstation", price: "Recommended", score: "96%" },
                                        ].map((item, index) => (
                                            <button
                                                type="button"
                                                key={item.name}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like a competitive quotation for: ${item.name}.`,
                                                        {
                                                            Source: "Competitive Quotations",
                                                            Item: item.name,
                                                        }
                                                    )
                                                }
                                                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/30"
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                            <Package className="h-4 w-4" />
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-xs text-slate-500">
                                                                Option {index + 1}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                            {item.price}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            Match {item.score}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                                                        style={{ width: item.score }}
                                                    />
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-500/10">
                                            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                                                <ShieldCheck className="h-4 w-4" />
                                                <span className="text-xs font-bold">
                                                    Verification
                                                </span>
                                            </div>
                                            <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                                                Review important supplier and
                                                product details.
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-cyan-500/10">
                                            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                                                <TrendingDown className="h-4 w-4" />
                                                <span className="text-xs font-bold">
                                                    Value
                                                </span>
                                            </div>
                                            <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                                                Compare the total procurement
                                                picture.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/10 dark:bg-blue-500/[0.06]">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <Bell className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            Procurement insight
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                                            The lowest price is not always the
                                            lowest total cost.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section className="border-y border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-4">
                        {[
                            { icon: Target, title: "Requirement-first", text: "We start with what you actually need." },
                            { icon: BarChart3, title: "Option-focused", text: "Multiple viable options can be evaluated." },
                            { icon: ShieldCheck, title: "Verification-minded", text: "Important details should be checked before purchase." },
                            { icon: Headphones, title: "End-to-end support", text: "Procurement can connect with delivery and deployment." },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to know more about "${item.title}": ${item.text}`,
                                        {
                                            Source: "Competitive Quotations",
                                            Highlight: item.title,
                                        }
                                    )
                                }
                                className="flex items-start gap-4 rounded-2xl p-2 text-left transition hover:bg-white dark:hover:bg-white/[0.03]"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-blue-400">
                                    <item.icon className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28">
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-500/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Why competitive quotations matter
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                Procurement should be a decision process, not
                                just a price request.
                            </h2>
                        </div>

                        <div className="space-y-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                When an organization needs technology equipment,
                                software, infrastructure or services, the first
                                quotation received is not necessarily the best
                                option. A professional procurement process looks
                                at the requirement, available alternatives,
                                supplier capability and the commercial terms
                                surrounding the purchase.
                            </p>

                            <p>
                                Our competitive quotation service is designed to
                                help make that process more structured. Instead of
                                asking you to navigate suppliers, specifications,
                                product variations and pricing by yourself, we can
                                help organize the requirement and identify options
                                worth considering.
                            </p>

                            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 dark:border-blue-500/10 dark:from-blue-500/[0.08] dark:to-cyan-500/[0.05]">
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                        <Lightbulb className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-900 dark:text-white">
                                            Start with the outcome, not the
                                            product.
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            If you only know that you need to
                                            equip an office, computer lab,
                                            branch, warehouse or organization,
                                            that is enough to start a
                                            conversation. We can help translate
                                            the requirement into technology and
                                            procurement specifications.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like help translating a business outcome or project into a technology procurement requirement.",
                                                    {
                                                        Source: "Competitive Quotations",
                                                        Stage: "Outcome-first enquiry",
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
                    </div>
                </div>
            </section>

            {/* SERVICE CARDS */}
            <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/60 lg:py-28">
                <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:42px_42px] dark:opacity-20 dark:[background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            What we can handle
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                            From a simple quotation request to a structured
                            procurement exercise.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Our approach can scale according to the size and
                            complexity of your requirement.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {quotationServices.map((service, index) => (
                            <button
                                type="button"
                                key={service.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss the quotation service: ${service.title}. ${service.description}`,
                                        {
                                            Source: "Competitive Quotations",
                                            Service: service.title,
                                        }
                                    )
                                }
                                className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-blue-500/30"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                                        <service.icon className="h-5 w-5" />
                                    </div>

                                    <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                                        0{index + 1}
                                    </span>
                                </div>

                                <h3 className="mt-7 text-xl font-black text-slate-900 dark:text-white">
                                    {service.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {service.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCUREMENT CATEGORIES */}
            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Procurement categories
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                What can we help you quote?
                            </h2>

                            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                                From individual equipment to complete technology
                                packages, we can help structure requirements
                                across multiple categories.
                            </p>
                        </div>

                        <div className="relative w-full lg:max-w-xs">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search categories..."
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => {
                                    setActiveCategory(category);
                                    startSupportChat(
                                        `I'm interested in the "${category}" procurement category.`,
                                        {
                                            Source: "Competitive Quotations",
                                            "Category filter": category,
                                        }
                                    );
                                }}
                                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${activeCategory === category
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCategories.map((category) => (
                            <div
                                key={category.title}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-blue-500/20"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like a quotation for ${category.title}: ${category.items.join(", ")}.`,
                                            {
                                                Source: "Competitive Quotations",
                                                "Category": category.title,
                                            }
                                        )
                                    }
                                    className="flex w-full flex-col items-start text-left"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-blue-600 dark:bg-white/[0.06] dark:text-blue-400">
                                        <category.icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
                                        {category.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {category.description}
                                    </p>
                                </button>

                                <div className="mt-6 space-y-3">
                                    {category.items.map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like a quotation for: ${item}.`,
                                                    {
                                                        Source: "Competitive Quotations",
                                                        Category: category.title,
                                                        Item: item,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-center gap-3 text-left text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
                                        >
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCategories.length === 0 && (
                        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-white/10">
                            <Filter className="mx-auto h-8 w-8 text-slate-400" />
                            <h3 className="mt-4 font-black text-slate-900 dark:text-white">
                                No matching category
                            </h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Try another search or choose a different
                                category.
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I can't find my category. Can you help me with a custom quotation request?",
                                        {
                                            Source: "Competitive Quotations",
                                            Stage: "Custom category",
                                        }
                                    )
                                }
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-blue-700"
                            >
                                Ask AB AI
                                <Sparkles className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                id="how-it-works"
                className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28"
            >
                <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-400">
                            How it works
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            A procurement process designed to remove the
                            unnecessary complexity.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-400">
                            You do not have to become a procurement specialist
                            just to purchase technology. We help bring structure
                            to the process.
                        </p>
                    </div>

                    <div className="relative mt-14">
                        <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-blue-500/60 via-cyan-500/30 to-transparent md:block" />

                        <div className="space-y-5">
                            {quotationStages.map((stage) => (
                                <button
                                    type="button"
                                    key={stage.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to understand the quotation step: "${stage.title}" — ${stage.description}`,
                                            {
                                                Source: "Competitive Quotations",
                                                Step: `${stage.number} — ${stage.title}`,
                                            }
                                        )
                                    }
                                    className="group relative grid w-full gap-5 rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-left backdrop-blur transition hover:border-blue-500/30 hover:bg-white/[0.055] md:grid-cols-[64px_1fr]"
                                >
                                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300">
                                        <stage.icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                                                Step {stage.number}
                                            </span>

                                            <h3 className="text-xl font-black">
                                                {stage.title}
                                            </h3>
                                        </div>

                                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                                            {stage.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON FACTORS */}
            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Beyond the price
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                The cheapest quotation is not automatically the
                                best quotation.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A competitive procurement exercise should look at
                                the whole offer. A low-priced product with the
                                wrong specification, uncertain warranty or
                                impractical delivery timeline may create more
                                cost later.
                            </p>

                            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-500/10 dark:bg-amber-500/[0.06]">
                                <div className="flex gap-4">
                                    <Calculator className="mt-1 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />

                                    <div>
                                        <h3 className="font-black text-slate-900 dark:text-white">
                                            Think total value.
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            Product cost + suitability +
                                            warranty + availability + delivery +
                                            support can provide a more useful
                                            picture than price alone.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to understand how to compare procurement options on total value, not just price.",
                                                    {
                                                        Source: "Competitive Quotations",
                                                        Stage: "Total value enquiry",
                                                    }
                                                )
                                            }
                                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-amber-700"
                                        >
                                            Ask AB AI
                                            <Sparkles className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {comparisonFactors.map((factor, index) => (
                                <button
                                    type="button"
                                    key={factor.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the comparison factor: ${factor.title} — ${factor.description}`,
                                            {
                                                Source: "Competitive Quotations",
                                                "Comparison factor": factor.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-blue-200 hover:bg-blue-50/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-500/20 dark:hover:bg-blue-500/[0.05]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-400">
                                            <factor.icon className="h-5 w-5" />
                                        </div>

                                        <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 text-lg font-black text-slate-900 dark:text-white">
                                        {factor.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {factor.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* BULK PROCUREMENT */}
            <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
                <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-blue-700 dark:border-blue-500/20 dark:bg-white/[0.04] dark:text-blue-300">
                                <Package className="h-4 w-4" />
                                Bulk procurement
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                Buying 10, 50, 100 or more units?
                                <span className="block text-blue-600 dark:text-blue-400">
                                    Let the quantity work for you.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                                Larger procurement requirements often need a
                                different approach from buying a single item.
                                Quantities, specifications, packaging,
                                availability, warranty, delivery and supplier
                                capacity all become more important.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Bulk quantity requirements",
                                    "Multi-item procurement lists",
                                    "Office equipment packages",
                                    "Computer laboratory projects",
                                    "Corporate rollouts",
                                    "Institutional procurement",
                                    "Branch deployment",
                                    "Infrastructure projects",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss bulk procurement for: ${item}.`,
                                                {
                                                    Source: "Competitive Quotations",
                                                    "Bulk topic": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:text-blue-300"
                                    >
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950">
                            <div className="rounded-3xl bg-slate-950 p-7 text-white dark:bg-slate-900">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                                    <BarChart3 className="h-5 w-5" />
                                </div>

                                <h3 className="mt-6 text-2xl font-black">
                                    Example procurement scenario
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    Imagine your organization needs 100 business
                                    laptops. The requirement is not simply
                                    “find 100 laptops.”
                                </p>

                                <div className="mt-6 space-y-3">
                                    {[
                                        "Define the required specification",
                                        "Confirm quantity and deployment locations",
                                        "Identify suitable procurement channels",
                                        "Compare commercial options",
                                        "Review warranty and availability",
                                        "Plan delivery and deployment",
                                    ].map((item, index) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `In a bulk procurement scenario, I'd like to discuss: ${item}.`,
                                                    {
                                                        Source: "Competitive Quotations",
                                                        "Bulk scenario step": item,
                                                    }
                                                )
                                            }
                                            className="flex w-full items-start gap-3 text-left transition hover:opacity-90"
                                        >
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-blue-300">
                                                {index + 1}
                                            </div>

                                            <span className="text-sm leading-6 text-slate-300">
                                                {item}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a bulk procurement requirement.",
                                            {
                                                Source: "Competitive Quotations",
                                                Stage: "Bulk requirement discussion",
                                            }
                                        )
                                    }
                                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
                                >
                                    Discuss a Bulk Requirement
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE PACKAGES */}
            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Procurement support levels
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Use as much support as your project needs.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            Some customers already know exactly what they want.
                            Others need help from the first requirement to final
                            deployment. Our procurement model can accommodate
                            both.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {quotationPackages.map((pkg) => (
                            <div
                                key={pkg.title}
                                className={`relative rounded-3xl border p-7 ${pkg.featured
                                    ? "border-blue-500 bg-gradient-to-b from-blue-50 to-white shadow-xl shadow-blue-950/10 dark:border-blue-500/40 dark:from-blue-500/[0.10] dark:to-slate-950"
                                    : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.025]"
                                    }`}
                            >
                                {pkg.featured && (
                                    <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
                                        Popular
                                    </div>
                                )}

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <pkg.icon className="h-5 w-5" />
                                </div>

                                <p className="mt-6 text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                                    {pkg.subtitle}
                                </p>

                                <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                                    {pkg.title}
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {pkg.description}
                                </p>

                                <div className="my-7 h-px bg-slate-200 dark:bg-white/10" />

                                <div className="space-y-3">
                                    {pkg.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                                        >
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to request the "${pkg.title}" procurement package. ${pkg.description}`,
                                            {
                                                Source: "Competitive Quotations",
                                                Package: pkg.title,
                                            }
                                        )
                                    }
                                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black transition ${pkg.featured
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "border border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-500/30"
                                        }`}
                                >
                                    Request Support
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI QUOTATION EXPERIENCE */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 py-20 text-white lg:py-28">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-blue-100 backdrop-blur">
                                <Sparkles className="h-4 w-4" />
                                Smarter quotation intake
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Not sure how to describe what you need?
                                <span className="block text-blue-200">
                                    Just explain the outcome.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100/80">
                                Our broader digital marketplace concept can make
                                quotation requests more conversational. Instead
                                of forcing customers to understand technical
                                terminology first, an AI-assisted intake can
                                help turn natural-language requirements into
                                structured procurement information.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "“I need computers for a 40-person office.”",
                                    "“We want to build a computer lab for a school.”",
                                    "“I need 100 laptops with a specific configuration.”",
                                    "“Help me equip our new branch with networking.”",
                                ].map((example) => (
                                    <button
                                        type="button"
                                        key={example}
                                        onClick={() =>
                                            startSupportChat(example, {
                                                Source: "Competitive Quotations",
                                                Stage: "AI prompt example",
                                            })
                                        }
                                        className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left transition hover:border-blue-400/40 hover:bg-white/[0.10]"
                                    >
                                        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-blue-200" />
                                        <span className="text-sm text-blue-50/90">
                                            {example}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
                            <div className="rounded-3xl bg-slate-950/80 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                                        <Sparkles className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-black">
                                            AI Procurement Assistant
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Requirement discovery
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Customer
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-slate-300">
                                        “I want to equip a new office for 25
                                        employees. We need computers, network,
                                        printers and backup power.”
                                    </p>
                                </div>

                                <div className="mt-3 rounded-2xl border border-blue-500/20 bg-blue-500/[0.08] p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                                        Assistant
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-blue-100">
                                        “I can help structure that. I’ll need to
                                        clarify a few details such as preferred
                                        computer type, operating requirements,
                                        networking coverage and location.”
                                    </p>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl border border-white/10 p-4">
                                        <p className="text-xs text-slate-500">
                                            Requirement
                                        </p>
                                        <p className="mt-1 text-sm font-bold">
                                            Office IT
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 p-4">
                                        <p className="text-xs text-slate-500">
                                            Quantity
                                        </p>
                                        <p className="mt-1 text-sm font-bold">
                                            25 users
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to try the AI procurement assistant for my quotation request.",
                                            {
                                                Source: "Competitive Quotations",
                                                Stage: "AI assistant trial",
                                            }
                                        )
                                    }
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
                                >
                                    Try the AI assistant
                                    <Sparkles className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCUREMENT CHECKLIST */}
            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Procurement readiness
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                The more we know, the better we can source.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                You do not need to have every answer. But the
                                following information can make quotation requests
                                more precise and useful.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to start a quotation request with what I know so far.",
                                        {
                                            Source: "Competitive Quotations",
                                            Stage: "Start with what you know",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                Start With What You Know
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                { title: "Product or outcome", text: "What are you trying to purchase or accomplish?" },
                                { title: "Quantity", text: "How many units, users, locations or sites are involved?" },
                                { title: "Specification", text: "Do you have minimum technical requirements?" },
                                { title: "Budget", text: "Do you have a target or maximum budget?" },
                                { title: "Location", text: "Where should the goods or services be delivered?" },
                                { title: "Timeline", text: "When do you need the project or items?" },
                                { title: "Brand preference", text: "Is a particular manufacturer required?" },
                                { title: "Warranty", text: "Are warranty or support requirements important?" },
                                { title: "Deployment", text: "Do you need installation or configuration?" },
                                { title: "Procurement rules", text: "Are there institutional or corporate purchasing requirements?" },
                            ].map((item, index) => (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to provide procurement information — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Competitive Quotations",
                                                "Checklist item": item.title,
                                            }
                                        )
                                    }
                                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-500/30 dark:hover:bg-blue-500/[0.05]"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERNATIONAL PROCUREMENT */}
            <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {[
                                        { icon: Globe2, title: "Local sourcing", text: "Explore suitable local procurement channels first where appropriate." },
                                        { icon: Package, title: "International", text: "Consider international sourcing where the requirement justifies it." },
                                        { icon: ShieldCheck, title: "Verification", text: "Review supplier and product information before committing." },
                                        { icon: Truck, title: "Logistics", text: "Consider shipping, delivery and fulfillment requirements." },
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item.title}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss ${item.title}: ${item.text}`,
                                                    {
                                                        Source: "Competitive Quotations",
                                                        "Sourcing topic": item.title,
                                                    }
                                                )
                                            }
                                            className="rounded-2xl border border-slate-200 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/40 dark:border-white/10 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/[0.05]"
                                        >
                                            <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                                            <h3 className="mt-4 text-sm font-black text-slate-900 dark:text-white">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                {item.text}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Local & international sourcing
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                When the right option is not nearby, look
                                beyond the obvious.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Some requirements are best fulfilled locally.
                                Others may require broader supplier discovery,
                                especially when the specification, quantity,
                                availability or price makes international
                                sourcing worth considering.
                            </p>

                            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                                We can help structure the sourcing requirement
                                and consider the commercial and logistical
                                implications before an international option is
                                selected.
                            </p>

                            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-500/10 dark:bg-blue-500/[0.06]">
                                <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    International procurement can involve
                                    additional considerations such as shipping,
                                    customs, taxes, warranty handling, lead
                                    times and foreign exchange. These should be
                                    evaluated before comparing international
                                    pricing directly with local pricing.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss international sourcing considerations for a quotation.",
                                        {
                                            Source: "Competitive Quotations",
                                            Stage: "International sourcing",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-700"
                            >
                                Discuss International Sourcing
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* BUSINESS TYPES */}
            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Who we support
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Built for organizations with real procurement needs.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            Competitive quotation support can be useful across
                            different industries and organizational sizes.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "Businesses", icon: Building2, text: "Equip offices, branches and teams." },
                            { title: "Schools", icon: Lightbulb, text: "Build labs and digital learning environments." },
                            { title: "Institutions", icon: ClipboardCheck, text: "Support structured institutional procurement." },
                            { title: "Growing Teams", icon: TrendingDown, text: "Scale technology as the organization grows." },
                            { title: "Projects", icon: Layers3, text: "Source technology for new deployments." },
                            { title: "Corporate Groups", icon: Users, text: "Coordinate multi-unit procurement." },
                            { title: "Startups", icon: Zap, text: "Get the infrastructure needed to launch." },
                            { title: "Public-Facing Services", icon: ShieldCheck, text: "Support operational technology requirements." },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like a quotation for ${item.title}: ${item.text}`,
                                        {
                                            Source: "Competitive Quotations",
                                            "Organization type": item.title,
                                        }
                                    )
                                }
                                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:border-blue-200 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-500/20"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-400">
                                    <item.icon className="h-5 w-5" />
                                </div>

                                <h3 className="mt-5 font-black text-slate-900 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* QUOTATION FORM */}
            <section
                id="request-quote"
                className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_85%_60%,rgba(6,182,212,0.15),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-400">
                                Request a quotation
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Tell us what you need.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-400">
                                You can start with a product list, a rough
                                requirement or simply explain what you are
                                trying to achieve.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "No need to know every technical detail.",
                                    "Bulk and multi-item requirements are welcome.",
                                    "Local and international sourcing can be considered.",
                                    "Procurement can connect with deployment and support.",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                                        <span className="text-sm leading-6 text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                                <div className="flex items-center gap-3">
                                    <Headphones className="h-5 w-5 text-blue-400" />
                                    <div>
                                        <p className="text-sm font-black">
                                            Need help before submitting?
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Start with what you know. We can
                                            clarify the rest.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like help before submitting a competitive quotation request.",
                                                    {
                                                        Source: "Competitive Quotations",
                                                        Stage: "Pre-submission help",
                                                    }
                                                )
                                            }
                                            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white transition hover:bg-blue-500"
                                        >
                                            Ask AB AI
                                            <Sparkles className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-7"
                        >
                            {submitted && (
                                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                                    <div>
                                        <p className="text-sm font-black text-emerald-300">
                                            Request captured
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            Your request has been sent to AB AI.
                                            Redirecting you to continue the
                                            conversation…
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Full name
                                    </label>

                                    <input
                                        required
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Your name"
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Company / Organization
                                    </label>

                                    <input
                                        type="text"
                                        value={organization}
                                        onChange={(e) => setOrganization(e.target.value)}
                                        placeholder="Organization name"
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Email
                                    </label>

                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+234..."
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Quantity
                                    </label>

                                    <input
                                        value={quantity}
                                        onChange={(event) => setQuantity(event.target.value)}
                                        type="text"
                                        placeholder="e.g. 100 laptops"
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Urgency
                                    </label>

                                    <select
                                        value={urgency}
                                        onChange={(event) => setUrgency(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    >
                                        <option>Standard</option>
                                        <option>Urgent</option>
                                        <option>Very Urgent</option>
                                        <option>Project Timeline</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        What do you need?
                                    </label>

                                    <textarea
                                        required
                                        rows={6}
                                        value={requirementText}
                                        onChange={(e) => setRequirementText(e.target.value)}
                                        placeholder="Tell us what you want to buy, the problem you are trying to solve, quantity, preferred brands, budget, delivery location or anything else you already know."
                                        className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.06] p-4">
                                <div className="flex gap-3">
                                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

                                    <p className="text-xs leading-5 text-slate-400">
                                        Your quotation request should contain
                                        enough information for your procurement
                                        team and suppliers to understand the
                                        requirement. Sensitive commercial
                                        information should only be shared when
                                        necessary.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-900/30 transition hover:bg-blue-500"
                            >
                                <Send className="h-4 w-4" />
                                Submit Procurement Request
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Questions about competitive quotations?
                        </h2>
                    </div>

                    <div className="mt-10 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border transition ${isOpen
                                        ? "border-blue-200 bg-blue-50/40 dark:border-blue-500/20 dark:bg-blue-500/[0.05]"
                                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.02]"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
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
                                                            Source: "Competitive Quotations",
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

            {/* FINAL CTA */}
            <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/60 lg:py-24">
                <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                        <ShoppingCart className="h-6 w-6" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                        Need something sourced, compared or procured?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                        Start with what you know. Give us the product, quantity,
                        project, problem or outcome — and we can help you
                        structure the next step.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a competitive quote. Here's what I need:",
                                    {
                                        Source: "Competitive Quotations",
                                        Stage: "Final CTA — request quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                        >
                            Request a Competitive Quote
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to explore your competitive quotation process before submitting a request.",
                                    {
                                        Source: "Competitive Quotations",
                                        Stage: "Final CTA — explore process",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-blue-500/30"
                        >
                            Explore the Process
                        </button>
                    </div>
                </div>
            </section>

            {/* MODAL QUOTATION FORM */}
            {showQuoteForm && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowQuoteForm(false);
                        }
                    }}
                >
                    <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-950">
                        <div className="flex items-start justify-between gap-5 border-b border-slate-200 p-6 dark:border-white/10">
                            <div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                    <Sparkles className="h-5 w-5" />
                                </div>

                                <h3 className="mt-5 text-2xl font-black text-slate-900 dark:text-white">
                                    Start your quotation request
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    Give us the basic information. You can
                                    provide more details later.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowQuoteForm(false)}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/[0.05]"
                                aria-label="Close quotation form"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleModalSubmit} className="p-6">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        What are you looking for?
                                    </label>

                                    <textarea
                                        required
                                        rows={5}
                                        value={modalRequirement}
                                        onChange={(e) => setModalRequirement(e.target.value)}
                                        placeholder="Example: I need 50 laptops for a company. Core i5 or equivalent, 16GB RAM, 512GB SSD, Windows 11 Pro."
                                        className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Quantity
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. 50 units"
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Delivery location
                                    </label>

                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type="text"
                                            placeholder="City / State / Country"
                                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Your email
                                    </label>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <input
                                            required
                                            type="email"
                                            placeholder="you@example.com"
                                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Phone
                                    </label>

                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type="tel"
                                            placeholder="+234..."
                                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.035]">
                                <div className="flex gap-3">
                                    <SlidersHorizontal className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        You can provide a product name, model,
                                        specification, bill of quantities,
                                        spreadsheet details or simply explain
                                        the result you want.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowQuoteForm(false)}
                                    className="rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-black text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.04]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-700"
                                >
                                    <Send className="h-4 w-4" />
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}