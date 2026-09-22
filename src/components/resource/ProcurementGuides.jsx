import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";

const ProcurementGuides = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState(null);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like help with a technology procurement requirement.",
            metadata: {
                Source: "Procurement Guides",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    const categories = [
        "All",
        "Hardware",
        "Software",
        "Cloud",
        "Networking",
        "Security",
        "Bulk Procurement",
        "International",
        "Organizations",
    ];

    const guides = [
        {
            id: 1,
            category: "Hardware",
            title: "How to Buy Business Computers",
            description:
                "A practical framework for selecting laptops, desktops, workstations and accessories based on workload, users, lifecycle and total cost.",
            level: "Essential",
            readTime: "8 min read",
            tag: "Hardware",
        },
        {
            id: 2,
            category: "Hardware",
            title: "Laptop Procurement Guide",
            description:
                "Understand processors, memory, storage, displays, warranty, operating systems and business-grade device requirements.",
            level: "Essential",
            readTime: "10 min read",
            tag: "Buying Guide",
        },
        {
            id: 3,
            category: "Hardware",
            title: "How to Procure Computers in Bulk",
            description:
                "A structured approach to specifying, comparing, sourcing, verifying and deploying large quantities of computers.",
            level: "Advanced",
            readTime: "12 min read",
            tag: "Bulk",
        },
        {
            id: 4,
            category: "Software",
            title: "Business Software Procurement Guide",
            description:
                "Learn how to evaluate software functionality, licensing, integrations, security, support and long-term ownership costs.",
            level: "Essential",
            readTime: "9 min read",
            tag: "Software",
        },
        {
            id: 5,
            category: "Software",
            title: "SaaS Subscription Buying Guide",
            description:
                "Evaluate recurring software subscriptions without overpaying for unused seats, features or unnecessary contract commitments.",
            level: "Essential",
            readTime: "7 min read",
            tag: "SaaS",
        },
        {
            id: 6,
            category: "Cloud",
            title: "Cloud Procurement Guide",
            description:
                "A framework for comparing cloud infrastructure, hosting, managed services, storage, backup and support.",
            level: "Advanced",
            readTime: "11 min read",
            tag: "Cloud",
        },
        {
            id: 7,
            category: "Networking",
            title: "Network Equipment Buying Guide",
            description:
                "How to select switches, routers, access points, firewalls, cabling and related infrastructure for organizations.",
            level: "Advanced",
            readTime: "13 min read",
            tag: "Networking",
        },
        {
            id: 8,
            category: "Security",
            title: "Cybersecurity Procurement Guide",
            description:
                "How to assess endpoint security, firewalls, identity tools, backup, monitoring and security services.",
            level: "Advanced",
            readTime: "12 min read",
            tag: "Security",
        },
        {
            id: 9,
            category: "Bulk Procurement",
            title: "Bulk Technology Procurement",
            description:
                "A complete framework for organizations purchasing technology at scale with controlled specifications and documented acceptance.",
            level: "Advanced",
            readTime: "15 min read",
            tag: "Procurement",
        },
        {
            id: 10,
            category: "International",
            title: "International Technology Sourcing",
            description:
                "Understand supplier verification, quotations, shipping, documentation, warranty and international procurement risks.",
            level: "Advanced",
            readTime: "14 min read",
            tag: "International",
        },
        {
            id: 11,
            category: "Organizations",
            title: "Procurement for Schools",
            description:
                "A practical technology procurement framework for schools, universities, training centers and education programs.",
            level: "Essential",
            readTime: "10 min read",
            tag: "Education",
        },
        {
            id: 12,
            category: "Organizations",
            title: "Procurement for NGOs",
            description:
                "How development organizations can structure technology purchases around budgets, accountability and project requirements.",
            level: "Essential",
            readTime: "9 min read",
            tag: "NGO",
        },
        {
            id: 13,
            category: "Organizations",
            title: "Government Technology Procurement",
            description:
                "Considerations for specifications, competitive quotations, documentation, delivery, acceptance and accountability.",
            level: "Advanced",
            readTime: "14 min read",
            tag: "Public Sector",
        },
        {
            id: 14,
            category: "Hardware",
            title: "Printer & Office Equipment Guide",
            description:
                "Compare printers, scanners, multifunction devices, consumables, duty cycles and support requirements.",
            level: "Essential",
            readTime: "8 min read",
            tag: "Office",
        },
        {
            id: 15,
            category: "Security",
            title: "CCTV & Surveillance Procurement",
            description:
                "Understand cameras, storage, networking, monitoring, installation and maintenance considerations.",
            level: "Advanced",
            readTime: "11 min read",
            tag: "Security",
        },
        {
            id: 16,
            category: "Networking",
            title: "Wi-Fi Infrastructure Buying Guide",
            description:
                "Plan access point coverage, user density, bandwidth, authentication, switching and network management.",
            level: "Advanced",
            readTime: "10 min read",
            tag: "Wi-Fi",
        },
    ];

    const filteredGuides = useMemo(() => {
        return guides.filter((guide) => {
            const categoryMatch =
                activeCategory === "All" ||
                guide.category === activeCategory;

            const searchMatch =
                guide.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                guide.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                guide.tag
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            return categoryMatch && searchMatch;
        });
    }, [activeCategory, searchQuery]);

    const procurementStages = [
        {
            number: "01",
            title: "Define the requirement",
            description:
                "Start with the business problem rather than a product name. Identify users, workloads, quantity, locations, timeline and expected outcomes.",
        },
        {
            number: "02",
            title: "Build the specification",
            description:
                "Translate the requirement into clear technical and commercial specifications that suppliers can understand and quote against.",
        },
        {
            number: "03",
            title: "Identify suppliers",
            description:
                "Build a supplier shortlist based on capability, product availability, reputation, authorization, delivery capacity and support.",
        },
        {
            number: "04",
            title: "Request quotations",
            description:
                "Issue a consistent RFQ or RFP so competing suppliers respond against comparable requirements.",
        },
        {
            number: "05",
            title: "Evaluate offers",
            description:
                "Compare more than headline price. Consider specification compliance, warranty, delivery, support, licensing and total cost.",
        },
        {
            number: "06",
            title: "Verify products",
            description:
                "Confirm model numbers, serial numbers, configuration, condition, warranty and documentation before acceptance.",
        },
        {
            number: "07",
            title: "Deliver and deploy",
            description:
                "Coordinate logistics, installation, configuration, asset tagging, user assignment and deployment.",
        },
        {
            number: "08",
            title: "Close and manage",
            description:
                "Document acceptance, warranties, invoices, assets, licenses and support contacts for the operational lifecycle.",
        },
    ];

    const evaluationCriteria = [
        {
            title: "Technical compliance",
            weight: "25%",
            description:
                "Does the proposed product actually satisfy the required specification and workload?",
        },
        {
            title: "Total cost",
            weight: "20%",
            description:
                "Consider acquisition, licenses, accessories, maintenance, support, shipping and future renewal costs.",
        },
        {
            title: "Warranty & support",
            weight: "15%",
            description:
                "Evaluate warranty duration, service availability, replacement procedures and escalation channels.",
        },
        {
            title: "Supplier capability",
            weight: "15%",
            description:
                "Can the supplier consistently source, deliver and support the required products?",
        },
        {
            title: "Delivery",
            weight: "10%",
            description:
                "Consider lead time, logistics reliability, delivery location and deployment schedule.",
        },
        {
            title: "Product lifecycle",
            weight: "10%",
            description:
                "Consider availability, support horizon, replacement options and expected useful life.",
        },
        {
            title: "Commercial terms",
            weight: "5%",
            description:
                "Review payment terms, quotation validity, contractual obligations and other commercial conditions.",
        },
    ];

    const mistakes = [
        "Choosing equipment solely because it has the lowest price.",
        "Writing specifications around a particular brand without a business reason.",
        "Buying different device models when standardization would simplify support.",
        "Ignoring warranty and after-sales support.",
        "Failing to verify supplier identity and product authenticity.",
        "Comparing quotations that use different specifications.",
        "Ignoring shipping, installation, taxes and other acquisition costs.",
        "Buying excessive specifications that users do not actually need.",
        "Underestimating deployment, configuration and training requirements.",
        "Failing to maintain an asset register.",
        "Purchasing software without understanding renewal costs.",
        "Failing to document acceptance criteria before delivery.",
    ];

    const checklist = [
        "Business requirement documented",
        "Number of users confirmed",
        "Quantity confirmed",
        "Technical specification completed",
        "Budget approved",
        "Delivery location confirmed",
        "Required delivery date confirmed",
        "Supplier shortlist created",
        "Supplier verification completed",
        "RFQ/RFP prepared",
        "Comparable quotations collected",
        "Technical evaluation completed",
        "Commercial evaluation completed",
        "Warranty confirmed",
        "Support arrangements confirmed",
        "Delivery terms confirmed",
        "Acceptance criteria defined",
        "Asset records prepared",
        "Deployment plan prepared",
        "Final documentation archived",
    ];

    const faqs = [
        {
            question: "What is technology procurement?",
            answer:
                "Technology procurement is the structured process of identifying a technology requirement, defining specifications, sourcing suppliers, evaluating quotations, purchasing products or services, verifying delivery and managing the resulting assets or subscriptions.",
        },
        {
            question: "Should I choose the cheapest quotation?",
            answer:
                "Not necessarily. The lowest purchase price can become expensive when warranty coverage, poor quality, short product lifespan, missing accessories, licensing, support or replacement costs are considered. A better approach is to evaluate total value and total cost of ownership.",
        },
        {
            question: "How many suppliers should I request quotations from?",
            answer:
                "There is no universal number because requirements and procurement policies differ. For competitive procurement, the important principle is to obtain enough comparable offers to make a defensible decision while maintaining a fair and transparent process.",
        },
        {
            question: "What should a hardware specification contain?",
            answer:
                "A useful specification normally includes device type, processor class, memory, storage, display requirements, operating system, connectivity, accessories, warranty, quantity, delivery requirements and any deployment or configuration requirements.",
        },
        {
            question: "What is total cost of ownership?",
            answer:
                "Total cost of ownership looks beyond the initial purchase price. It can include licenses, installation, support, maintenance, consumables, upgrades, energy, renewal fees, downtime and eventual replacement.",
        },
        {
            question: "Can AB Technologies help with procurement?",
            answer:
                "Yes. AB Technologies can support requirement definition, specification development, supplier sourcing, competitive quotations, product verification, procurement coordination, delivery and technology deployment.",
        },
    ];

    const iconBox =
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-white";

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#07101f] dark:text-white">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(14,165,233,0.10),transparent_30%),linear-gradient(180deg,#f8fafc,#eef4f9)] dark:bg-[radial-gradient(circle_at_10%_10%,rgba(37,99,235,0.20),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(180deg,#07101f,#091525)]" />

                <div className="absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute right-0 top-10 -z-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 backdrop-blur dark:border-blue-400/20 dark:bg-white/[0.05] dark:text-blue-300">
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                                Technology Resources
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
                                Procurement
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
                                    Guides
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:text-xl">
                                Make better technology purchasing decisions with
                                practical guides for hardware, software, cloud,
                                networking, security, bulk procurement and
                                supplier sourcing.
                            </p>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Built for organizations that want procurement to
                                be structured, transparent, commercially sound
                                and aligned with real operational requirements.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#guides"
                                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                                >
                                    Explore Procurement Guides
                                    <span className="ml-2">→</span>
                                </a>

                                <a
                                    href="#framework"
                                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09]"
                                >
                                    View Procurement Framework
                                </a>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <span className="font-black text-slate-900 dark:text-white">
                                        16+
                                    </span>
                                    Practical guides
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-black text-slate-900 dark:text-white">
                                        8
                                    </span>
                                    Procurement stages
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-black text-slate-900 dark:text-white">
                                        20
                                    </span>
                                    Checklist items
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-white/10 dark:bg-[#0b1728]/85 dark:shadow-black/30 sm:p-7">

                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                                            Procurement intelligence
                                        </p>
                                        <h2 className="mt-2 text-xl font-black">
                                            A better buying decision
                                        </h2>
                                    </div>

                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        Structured
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        ["Requirement", "Business need defined"],
                                        ["Specification", "Technical scope aligned"],
                                        ["Suppliers", "Sources evaluated"],
                                        ["Quotations", "Offers compared"],
                                        ["Verification", "Products validated"],
                                        ["Delivery", "Deployment coordinated"],
                                    ].map(([label, value], index) => (
                                        <div
                                            key={label}
                                            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/20 dark:hover:bg-blue-500/[0.06]"
                                        >
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-xs font-black text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-300">
                                                {String(index + 1).padStart(2, "0")}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                    {label}
                                                </p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                    {value}
                                                </p>
                                            </div>

                                            <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-500">
                                                →
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-400/20 dark:bg-blue-500/[0.08]">
                                    <p className="text-sm font-bold text-blue-900 dark:text-blue-200">
                                        Procurement principle
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-blue-800/80 dark:text-blue-200/70">
                                        Buy for the requirement, evaluate for
                                        value, verify before acceptance and
                                        document the decision.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                INTRODUCTION
            ========================================================= */}

            <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-[#091525]">
                <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Why procurement matters
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Technology procurement is more than buying a
                                product.
                            </h2>
                        </div>

                        <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                A laptop, server, software subscription,
                                network switch or cloud platform is only one
                                part of a procurement decision. The bigger
                                question is whether the technology will solve
                                the actual business requirement and continue
                                to provide value after purchase.
                            </p>

                            <p>
                                Good procurement connects requirements,
                                technical specifications, commercial
                                evaluation, supplier capability, delivery,
                                verification and long-term support.
                            </p>

                            <p>
                                These guides are designed to help teams move
                                from{" "}
                                <strong className="text-slate-900 dark:text-white">
                                    "What should we buy?"
                                </strong>{" "}
                                to a much better question:
                                <strong className="text-slate-900 dark:text-white">
                                    {" "}
                                    "What solution gives us the right value,
                                    reliability and lifecycle?"
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                SEARCH + GUIDE LIBRARY
            ========================================================= */}

            <section
                id="guides"
                className="relative bg-slate-100/80 dark:bg-[#07111f]"
            >
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Guide library
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Practical guidance for real procurement decisions.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            Browse by category or search for the exact
                            procurement question you are trying to solve.
                        </p>
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div className="relative flex-1">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    ⌕
                                </span>

                                <input
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search procurement guides..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3.5 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-black/10 dark:text-white dark:placeholder:text-slate-500"
                                />
                            </div>

                            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                {filteredGuides.length} guide
                                {filteredGuides.length === 1 ? "" : "s"}
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        setActiveCategory(category)
                                    }
                                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${activeCategory === category
                                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredGuides.map((guide) => (
                            <article
                                key={guide.id}
                                className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 dark:border-white/10 dark:bg-[#0b1728] dark:hover:border-blue-400/20"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                                        {guide.tag}
                                    </span>

                                    <span className="text-xs font-semibold text-slate-400">
                                        {guide.readTime}
                                    </span>
                                </div>

                                <h3 className="mt-7 text-xl font-black tracking-tight transition group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                    {guide.title}
                                </h3>

                                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {guide.description}
                                </p>

                                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/10">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                        {guide.level}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like guidance on ${guide.title}.`,
                                                {
                                                    Intent: "Procurement guide enquiry",
                                                    Guide: guide.title,
                                                    Category: guide.category,
                                                    Level: guide.level,
                                                }
                                            )
                                        }
                                        className="text-sm font-black text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400"
                                    >
                                        Discuss guide →
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredGuides.length === 0 && (
                        <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-14 text-center dark:border-white/10 dark:bg-white/[0.03]">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-white/10">
                                ⌕
                            </div>

                            <h3 className="mt-5 text-xl font-black">
                                No guides found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Try another search term or choose a different
                                procurement category.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT FRAMEWORK
            ========================================================= */}

            <section
                id="framework"
                className="relative overflow-hidden bg-white dark:bg-[#091525]"
            >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">

                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                The framework
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                From requirement to deployment.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A disciplined procurement process reduces
                                uncertainty and creates a clear trail from
                                business requirement to delivered technology.
                            </p>

                            <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-400/20 dark:bg-blue-500/[0.07]">
                                <p className="text-sm font-black text-blue-900 dark:text-blue-200">
                                    The objective
                                </p>

                                <p className="mt-3 text-sm leading-7 text-blue-900/70 dark:text-blue-100/70">
                                    Purchase the right solution, from a
                                    capable source, at an appropriate total
                                    cost, with clear delivery and support
                                    expectations.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {procurementStages.map((stage) => (
                                <div
                                    key={stage.number}
                                    className="group flex gap-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-blue-50/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/20 dark:hover:bg-blue-500/[0.04]"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                                        {stage.number}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-black">
                                            {stage.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {stage.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                BUYING PRINCIPLES
            ========================================================= */}

            <section className="bg-slate-950 text-white dark:bg-black">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                            Procurement principles
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Buy intelligently, not impulsively.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-300">
                            Mature procurement decisions balance technical
                            requirements, commercial realities and the
                            operational life of the solution.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                number: "01",
                                title: "Requirement first",
                                text: "Start with what the organization needs to accomplish.",
                            },
                            {
                                number: "02",
                                title: "Value over price",
                                text: "Consider quality, lifecycle, support and total ownership cost.",
                            },
                            {
                                number: "03",
                                title: "Verify before acceptance",
                                text: "Confirm that what arrives is what was specified and purchased.",
                            },
                            {
                                number: "04",
                                title: "Document everything",
                                text: "Keep specifications, quotations, approvals, warranties and acceptance records.",
                            },
                        ].map((item) => (
                            <div
                                key={item.number}
                                className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6"
                            >
                                <div className="text-sm font-black text-blue-300">
                                    {item.number}
                                </div>

                                <h3 className="mt-8 text-xl font-black">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                EVALUATION
            ========================================================= */}

            <section className="bg-slate-50 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Evaluation
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                How to compare suppliers.
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                A quotation comparison should make differences
                                visible rather than hiding them inside a
                                single price column.
                            </p>

                            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
                                <p className="text-sm font-black">
                                    Important
                                </p>

                                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    Weights shown here are an example framework.
                                    Actual evaluation criteria should reflect
                                    the organization's procurement policy and
                                    the specific requirement.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1728]">
                            <div className="grid grid-cols-[1fr_auto] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                                <span>Evaluation factor</span>
                                <span>Example weight</span>
                            </div>

                            {evaluationCriteria.map((item, index) => (
                                <div
                                    key={item.title}
                                    className="grid grid-cols-[1fr_auto] gap-6 border-b border-slate-100 px-6 py-5 last:border-0 dark:border-white/[0.07]"
                                >
                                    <div>
                                        <h3 className="text-sm font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 max-w-xl text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                                        {item.weight}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                SPECIFICATION SECTION
            ========================================================= */}

            <section className="bg-white dark:bg-[#091525]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Specifications
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                A good specification makes comparison easier.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Weak specifications create inconsistent
                                quotations. Strong specifications make it
                                easier to understand exactly what each
                                supplier is offering.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "Describe the required outcome.",
                                    "Define measurable technical requirements.",
                                    "Separate mandatory requirements from preferences.",
                                    "Specify quantities and delivery locations.",
                                    "Define warranty and support expectations.",
                                    "Include accessories and deployment requirements.",
                                    "Avoid unnecessary restrictions.",
                                    "Allow equivalent products where appropriate.",
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
                                            {index + 1}
                                        </div>

                                        <p className="text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl dark:border-white/10">

                                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                                            Example specification
                                        </p>

                                        <h3 className="mt-2 text-xl font-black">
                                            Business Laptop
                                        </h3>
                                    </div>

                                    <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold">
                                        Draft
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {[
                                        ["Processor", "Business-class performance"],
                                        ["Memory", "Minimum 16 GB"],
                                        ["Storage", "Minimum 512 GB SSD"],
                                        ["Display", "14–15.6 inch class"],
                                        ["Connectivity", "Wi-Fi + Bluetooth"],
                                        ["OS", "Business-compatible OS"],
                                        ["Warranty", "Defined business warranty"],
                                        ["Quantity", "As required"],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex items-start justify-between gap-6 border-b border-white/[0.07] pb-3"
                                        >
                                            <span className="text-xs font-bold text-slate-500">
                                                {label}
                                            </span>

                                            <span className="text-right text-sm font-semibold text-slate-200">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5">
                                    <p className="text-xs font-black uppercase tracking-wider text-blue-300">
                                        Procurement note
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-slate-300">
                                        Specifications should describe the
                                        organization's requirement rather than
                                        simply copying a product listing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                TOTAL COST OF OWNERSHIP
            ========================================================= */}

            <section className="bg-slate-100 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">

                    <div className="mx-auto max-w-3xl text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Total cost of ownership
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            The purchase price is only the beginning.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            A mature procurement decision considers what the
                            technology will cost throughout its useful
                            lifecycle.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Acquisition", "Product, accessories and initial licenses."],
                            ["Deployment", "Installation, configuration, migration and training."],
                            ["Operations", "Support, maintenance, consumables and administration."],
                            ["Renewal", "Subscriptions, warranties, upgrades and replacement."],
                        ].map(([title, text], index) => (
                            <div
                                key={title}
                                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1728]"
                            >
                                <div className="text-xs font-black text-blue-600 dark:text-blue-400">
                                    0{index + 1}
                                </div>

                                <h3 className="mt-7 text-lg font-black">
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

            {/* =========================================================
                PROCUREMENT CHECKLIST
            ========================================================= */}

            <section className="bg-white dark:bg-[#091525]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Checklist
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Procurement readiness checklist.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Use this as a practical pre-purchase checklist
                                before approving a technology procurement.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {checklist.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        ✓
                                    </span>

                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                COMMON MISTAKES
            ========================================================= */}

            <section className="bg-slate-50 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
                            Avoidable mistakes
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Procurement mistakes can become expensive.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            Most procurement problems do not start at delivery.
                            They start earlier with unclear requirements,
                            weak comparisons or incomplete due diligence.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {mistakes.map((mistake, index) => (
                            <div
                                key={mistake}
                                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0b1728]"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-black text-red-600 dark:bg-red-400/10 dark:text-red-300">
                                    !
                                </span>

                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {mistake}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                BULK PROCUREMENT
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-950 text-white dark:bg-black">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-blue-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                                Bulk procurement
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Buying 10 is different from buying 1,000.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                Larger procurements introduce additional
                                considerations around standardization,
                                availability, configuration, logistics,
                                verification, deployment and support.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Standardization",
                                    "Volume pricing",
                                    "Supplier capacity",
                                    "Product verification",
                                    "Logistics",
                                    "Deployment",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                                Bulk procurement sequence
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Define standard configuration",
                                    "Confirm quantities and locations",
                                    "Validate supplier capacity",
                                    "Request comparable quotations",
                                    "Review samples where appropriate",
                                    "Confirm final commercial terms",
                                    "Verify delivered inventory",
                                    "Deploy and asset-tag",
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-4 rounded-xl bg-white/[0.04] p-3"
                                    >
                                        <span className="text-xs font-black text-blue-300">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="text-sm font-semibold text-slate-300">
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
                INTERNATIONAL SOURCING
            ========================================================= */}

            <section className="bg-white dark:bg-[#091525]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                International sourcing
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Sourcing beyond your local market.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                International sourcing can expand product
                                availability and supplier options, but it
                                also introduces additional commercial and
                                logistical considerations.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Supplier identity",
                                    "Product authenticity",
                                    "Model verification",
                                    "Incoterms",
                                    "Shipping",
                                    "Insurance",
                                    "Import requirements",
                                    "Warranty coverage",
                                    "Payment risk",
                                    "Documentation",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-white/10"
                                    >
                                        <span className="text-blue-600 dark:text-blue-400">
                                            ✓
                                        </span>

                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035]">
                            <div className={iconBox}>
                                ⇄
                            </div>

                            <h3 className="mt-6 text-2xl font-black">
                                Don't compare supplier price alone.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                An overseas quotation that appears cheaper may
                                have different shipping terms, warranty
                                coverage, tax treatment, configuration,
                                delivery obligations or support arrangements.
                            </p>

                            <div className="mt-7 rounded-2xl bg-white p-5 shadow-sm dark:bg-white/[0.05]">
                                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                    Compare
                                </p>

                                <div className="mt-4 space-y-3">
                                    {[
                                        "Product cost",
                                        "Logistics cost",
                                        "Insurance",
                                        "Taxes / duties where applicable",
                                        "Warranty",
                                        "Support",
                                        "Lead time",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm last:border-0 dark:border-white/10"
                                        >
                                            <span className="text-slate-500 dark:text-slate-400">
                                                {item}
                                            </span>

                                            <span className="font-bold">
                                                Review
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
                SOFTWARE PROCUREMENT
            ========================================================= */}

            <section className="bg-slate-100 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Software procurement
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Software has a lifecycle too.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            A software purchase should consider licensing,
                            implementation, integrations, security, data,
                            users, support and future renewals.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Licensing",
                                text: "Understand users, seats, devices, usage limits and licensing models.",
                            },
                            {
                                title: "Implementation",
                                text: "Determine configuration, migration, integration and onboarding requirements.",
                            },
                            {
                                title: "Security",
                                text: "Review access controls, data handling, authentication and organizational security needs.",
                            },
                            {
                                title: "Integrations",
                                text: "Identify systems the software must connect with before committing.",
                            },
                            {
                                title: "Support",
                                text: "Understand support channels, service levels and escalation options.",
                            },
                            {
                                title: "Renewals",
                                text: "Model recurring costs so renewal obligations are not a surprise.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1728]"
                            >
                                <div className={iconBox}>
                                    ✓
                                </div>

                                <h3 className="mt-6 text-lg font-black">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                AI PROCUREMENT
            ========================================================= */}

            <section className="bg-white dark:bg-[#091525]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="overflow-hidden rounded-[2.5rem] border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:border-blue-400/20 dark:from-blue-500/[0.08] dark:via-white/[0.02] dark:to-cyan-500/[0.06]">

                        <div className="grid gap-12 p-8 sm:p-10 lg:grid-cols-[1fr_.9fr] lg:p-14">

                            <div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
                                    AI-assisted procurement
                                </span>

                                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                    Turn a simple requirement into a
                                    structured procurement brief.
                                </h2>

                                <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Your future procurement experience can use
                                    AI to help structure requirements,
                                    identify missing information, organize
                                    product categories and prepare a clearer
                                    request for quotation.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {[
                                        "Requirement builder",
                                        "Specification assistant",
                                        "Quotation comparison",
                                        "Product discovery",
                                        "Procurement checklist",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-700 dark:border-blue-400/20 dark:bg-white/[0.05] dark:text-blue-200"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#0b1728]">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                        AI
                                    </div>

                                    <div>
                                        <p className="text-sm font-black">
                                            Procurement Assistant
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Example workflow
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-sm leading-6 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                                        I need computers for a new training
                                        center with 60 users.
                                    </div>

                                    <div className="rounded-2xl rounded-tr-sm bg-blue-600 p-4 text-sm leading-6 text-white">
                                        I can help structure this requirement.
                                        Let's define the workload, preferred
                                        device type, operating environment,
                                        accessories, warranty and delivery
                                        requirements.
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to turn my requirement into a structured procurement brief.",
                                                {
                                                    Intent: "Procurement brief",
                                                    Tool: "Procurement Assistant",
                                                }
                                            )
                                        }
                                        className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-100/70 dark:border-blue-400/20 dark:bg-blue-500/[0.08] dark:hover:bg-blue-500/[0.12]"
                                    >
                                        <p className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                            Suggested next step
                                        </p>

                                        <p className="mt-2 text-sm font-bold leading-6 text-blue-900/80 dark:text-blue-100/70">
                                            Generate a procurement brief →
                                        </p>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT FOR DIFFERENT ORGANIZATIONS
            ========================================================= */}

            <section className="bg-slate-50 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Organization-specific procurement
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Procurement looks different across industries.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            A school, hospital, government agency, retail
                            company and startup may all purchase technology,
                            but their requirements, constraints and operating
                            environments are different.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "Schools",
                                text: "Labs, devices, networking, smart classrooms and administration systems.",
                            },
                            {
                                title: "Healthcare",
                                text: "Reliable infrastructure, communication, devices and security-conscious systems.",
                            },
                            {
                                title: "Government",
                                text: "Structured specifications, competitive quotations and documented delivery.",
                            },
                            {
                                title: "Businesses",
                                text: "Productivity, infrastructure, security, software and scalable operations.",
                            },
                            {
                                title: "NGOs",
                                text: "Project budgets, donor requirements, deployment locations and accountability.",
                            },
                            {
                                title: "Retail",
                                text: "POS, connectivity, devices, surveillance and operational systems.",
                            },
                            {
                                title: "Manufacturing",
                                text: "Industrial connectivity, infrastructure, workstations and operational technology.",
                            },
                            {
                                title: "Startups",
                                text: "Cost-conscious technology foundations designed to scale.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#0b1728]"
                            >
                                <h3 className="text-lg font-black">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {item.text}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss technology procurement for ${item.title}.`,
                                            {
                                                Intent: "Organization procurement",
                                                Organization: item.title,
                                            }
                                        )
                                    }
                                    className="mt-6 text-sm font-black text-blue-600 dark:text-blue-400"
                                >
                                    Discuss procurement →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SUPPLIER DUE DILIGENCE
            ========================================================= */}

            <section className="bg-white dark:bg-[#091525]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div className="order-2 lg:order-1">
                            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white dark:border-white/10">

                                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-wider text-blue-300">
                                            Supplier review
                                        </p>

                                        <h3 className="mt-2 text-xl font-black">
                                            Due diligence areas
                                        </h3>
                                    </div>

                                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                                        Review
                                    </span>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {[
                                        "Business identity",
                                        "Product sourcing capability",
                                        "Authorization where relevant",
                                        "References and track record",
                                        "Delivery capacity",
                                        "Warranty capability",
                                        "After-sales support",
                                        "Commercial terms",
                                        "Documentation",
                                    ].map((item, index) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3"
                                        >
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[10px] font-black">
                                                {index + 1}
                                            </span>

                                            <span className="text-sm text-slate-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Supplier due diligence
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                A supplier is part of the solution.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A technically suitable product is not enough if
                                the supply chain cannot reliably deliver it or
                                support it.
                            </p>

                            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Supplier evaluation should be proportional to
                                the value, complexity and risk of the
                                procurement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                RFQ / RFP
            ========================================================= */}

            <section className="bg-slate-100 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="max-w-3xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            RFQ & RFP
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Ask suppliers the right questions.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            A strong request for quotation or proposal reduces
                            ambiguity and creates a better basis for comparison.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {[
                            {
                                title: "Requirement",
                                items: [
                                    "Business context",
                                    "Technical specification",
                                    "Quantity",
                                    "Delivery location",
                                    "Required timeline",
                                ],
                            },
                            {
                                title: "Commercial",
                                items: [
                                    "Unit price",
                                    "Total price",
                                    "Taxes / charges",
                                    "Payment terms",
                                    "Quotation validity",
                                ],
                            },
                            {
                                title: "Support",
                                items: [
                                    "Warranty",
                                    "Support model",
                                    "Lead time",
                                    "Replacement process",
                                    "Escalation process",
                                ],
                            },
                        ].map((group) => (
                            <div
                                key={group.title}
                                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-[#0b1728]"
                            >
                                <h3 className="text-xl font-black">
                                    {group.title}
                                </h3>

                                <div className="mt-6 space-y-3">
                                    {group.items.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                                        >
                                            <span className="text-blue-600 dark:text-blue-400">
                                                →
                                            </span>

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
                DELIVERY & VERIFICATION
            ========================================================= */}

            <section className="bg-white dark:bg-[#091525]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Delivery & verification
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Receiving the product is not the end.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Organizations should have clear acceptance
                                criteria before technology arrives.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                "Quantity verification",
                                "Model verification",
                                "Serial number capture",
                                "Physical condition",
                                "Accessories",
                                "Configuration",
                                "Warranty evidence",
                                "Documentation",
                                "Installation",
                                "Acceptance sign-off",
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 dark:border-white/10"
                                >
                                    <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="text-sm font-bold">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROCUREMENT DATA
            ========================================================= */}

            <section className="bg-slate-950 text-white dark:bg-black">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">

                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                                Procurement records
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Build an evidence trail.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                Good procurement creates documentation that
                                remains useful long after the purchase has
                                been completed.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                "Requirement",
                                "Specification",
                                "Approval",
                                "Supplier shortlist",
                                "RFQ / RFP",
                                "Quotations",
                                "Evaluation",
                                "Purchase order",
                                "Delivery note",
                                "Invoice",
                                "Warranty",
                                "Acceptance",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-300"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================= */}

            <section className="bg-slate-50 dark:bg-[#07111f]">
                <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Frequently asked questions
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Procurement questions, answered.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b1728]"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen ? null : index
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                    >
                                        <span className="text-sm font-black sm:text-base">
                                            {faq.question}
                                        </span>

                                        <span
                                            className={`text-xl text-blue-600 transition-transform dark:text-blue-400 ${isOpen ? "rotate-45" : ""
                                                }`}
                                        >
                                            +
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-100 px-6 pb-6 pt-5 dark:border-white/10">
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
                RESOURCE CTA
            ========================================================= */}

            <section className="relative overflow-hidden bg-white dark:bg-[#091525]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.16),transparent_50%)]" />

                <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-28">

                    <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                        Need help with a real procurement?
                    </span>

                    <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                        Turn your requirement into a procurement plan.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                        Tell us what you need, how many you need and where you
                        need it. We can help structure the requirement, identify
                        the appropriate procurement path and coordinate the
                        next steps.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like help planning and quoting a technology procurement requirement.",
                                    {
                                        Intent: "Request procurement quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                        >
                            Request a Quote
                            <span className="ml-2">→</span>
                        </button>

                        <a
                            href="/resources"
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-800 transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                        >
                            Explore More Resources
                        </a>
                    </div>
                </div>
            </section>

            {/* =========================================================
                RESOURCE FOOTER STRIP
            ========================================================= */}

            <section className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

                    <div className="grid gap-8 md:grid-cols-3">

                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                                Technology buying guides
                            </p>

                            <h3 className="mt-3 text-lg font-black">
                                Buy with more confidence.
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Practical information for technology purchasing
                                and planning.
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                Procurement guides
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    "Hardware",
                                    "Software",
                                    "Cloud",
                                    "Networking",
                                    "Security",
                                    "Bulk",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="md:text-right">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                AB Technologies
                            </p>

                            <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Technology. Simplified.
                            </p>

                            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-500">
                                Procurement • Software • Infrastructure •
                                Digital Solutions
                            </p>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default ProcurementGuides;