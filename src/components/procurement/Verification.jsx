import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    Barcode,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    Cloud,
    Cpu,
    Database,
    FileCheck2,
    FileSearch,
    Fingerprint,
    Globe2,
    Headphones,
    Info,
    Laptop,
    Lock,
    Mail,
    MapPin,
    Package,
    PackageCheck,
    QrCode,
    Search,
    Shield,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Tag,
    Truck,
    UserCheck,
    Users,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function ProductVerification() {
    const navigate = useNavigate();

    const [activeFaq, setActiveFaq] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [verificationType, setVerificationType] = useState("device");
    const [showRequestForm, setShowRequestForm] = useState(false);

    // Controlled fields for request modal
    const [reqName, setReqName] = useState("");
    const [reqEmail, setReqEmail] = useState("");
    const [reqDetails, setReqDetails] = useState("");

    /* -----------------------------------------------------
       Hand off a contextual request to the support page.
    ----------------------------------------------------- */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to request product or procurement verification.",
            metadata: metadata || {
                Source: "Product Verification",
            },
        });

        navigate("/support/ai");
    };

    const handleRequestSubmit = (event) => {
        event.preventDefault();
        setShowRequestForm(false);

        const composed = [
            "I'd like to request product verification.",
            "",
            `Verification type: ${verificationType}`,
            reqName ? `Name: ${reqName}` : null,
            reqEmail ? `Email: ${reqEmail}` : null,
            reqDetails ? `\nDetails:\n${reqDetails}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        startSupportChat(composed, {
            Source: "Product Verification",
            Stage: "Verification request modal",
            "Verification type": verificationType,
            Name: reqName || "Not specified",
            Email: reqEmail || "Not specified",
        });

        setReqName("");
        setReqEmail("");
        setReqDetails("");
    };

    const verificationTypes = [
        {
            id: "device",
            title: "Hardware & Devices",
            description:
                "Verify laptops, desktops, servers, networking equipment, phones, monitors, printers and other technology products.",
            icon: Laptop,
        },
        {
            id: "software",
            title: "Software & Licenses",
            description:
                "Review software editions, licensing information, subscription details, product keys and entitlement information.",
            icon: Database,
        },
        {
            id: "supplier",
            title: "Supplier & Vendor",
            description:
                "Assess supplier information, documentation, product claims, availability and procurement details.",
            icon: Building2,
        },
        {
            id: "document",
            title: "Documents & Records",
            description:
                "Review quotations, invoices, serial lists, product documents, warranty information and supporting records.",
            icon: FileCheck2,
        },
    ];

    const verificationSteps = [
        {
            number: "01",
            title: "Submit the details",
            description:
                "Provide the product name, model, part number, serial number, quotation, supplier information or other relevant details.",
            icon: ClipboardCheck,
        },
        {
            number: "02",
            title: "We review the information",
            description:
                "Our process examines the submitted information for consistency, completeness and potential discrepancies.",
            icon: FileSearch,
        },
        {
            number: "03",
            title: "Cross-check product data",
            description:
                "We compare available product specifications, identifiers, configurations, documentation and relevant manufacturer information.",
            icon: Search,
        },
        {
            number: "04",
            title: "Assess the supplier",
            description:
                "Where applicable, we review supplier information and procurement details to identify potential concerns before purchase.",
            icon: UserCheck,
        },
        {
            number: "05",
            title: "Receive findings",
            description:
                "You receive a clear assessment highlighting verified information, inconsistencies, missing information and recommended next steps.",
            icon: BadgeCheck,
        },
    ];

    const verificationAreas = [
        {
            icon: Fingerprint,
            title: "Product Identity",
            description:
                "We help determine whether the product being quoted appears to correspond with the stated manufacturer, model, family and configuration.",
            items: ["Manufacturer", "Product family", "Model number", "Part number", "Product configuration"],
        },
        {
            icon: Barcode,
            title: "Serial & Identifier Review",
            description:
                "Product identifiers can provide important clues about whether a device matches the information presented during procurement.",
            items: ["Serial number", "SKU", "Part number", "Service tag", "Asset identifier"],
        },
        {
            icon: Tag,
            title: "Specification Validation",
            description:
                "We compare the advertised configuration against the specifications associated with the stated product.",
            items: ["Processor", "Memory", "Storage", "Display", "Connectivity"],
        },
        {
            icon: ShieldCheck,
            title: "Warranty Information",
            description:
                "Warranty information can be an important part of procurement verification, particularly for institutional and bulk purchases.",
            items: ["Warranty period", "Warranty type", "Coverage information", "Support eligibility", "Documentation"],
        },
        {
            icon: FileCheck2,
            title: "Documentation Review",
            description:
                "We review relevant product and procurement documents for inconsistencies or missing information.",
            items: ["Quotation", "Invoice", "Product sheet", "Warranty document", "Delivery documentation"],
        },
        {
            icon: Building2,
            title: "Supplier Information",
            description:
                "Supplier information is considered alongside product and transaction details when evaluating a procurement opportunity.",
            items: ["Business information", "Contact details", "Product claims", "Availability", "Procurement terms"],
        },
    ];

    const industries = [
        { icon: Building2, title: "Corporate", description: "Support procurement teams purchasing computers, networking equipment, software and other technology at scale." },
        { icon: GraduationCapIcon, title: "Education", description: "Help schools, universities and training organizations review technology purchases before committing funds." },
        { icon: Shield, title: "Government", description: "Support structured procurement processes where documentation, accountability and product accuracy matter." },
        { icon: Database, title: "Technology Companies", description: "Help IT teams validate equipment, software and infrastructure components before deployment." },
        { icon: Package, title: "Distributors", description: "Provide an additional layer of product information review before inventory acquisition or resale." },
        { icon: Users, title: "Organizations", description: "Help growing businesses make more informed technology purchasing decisions." },
    ];

    const commonChecks = [
        "Does the quoted model exist?",
        "Does the part number correspond to the stated product?",
        "Does the specification match the model?",
        "Is the configuration consistent?",
        "Is the warranty information clear?",
        "Are there missing product details?",
        "Are there conflicting specifications?",
        "Does the quotation contain unusual inconsistencies?",
        "Does the supplier information appear complete?",
        "Is additional verification recommended?",
    ];

    const procurementScenarios = [
        { title: "Before you pay", description: "Have product information reviewed before transferring significant funds to a supplier.", icon: Lock },
        { title: "Before bulk procurement", description: "Review a proposed product configuration before committing to a large quantity.", icon: PackageCheck },
        { title: "Before delivery acceptance", description: "Use documented product information as part of your receiving and acceptance process.", icon: Truck },
        { title: "Before deployment", description: "Confirm that the equipment you received corresponds with the intended configuration.", icon: Cpu },
    ];

    const faqs = [
        { question: "What exactly does product verification mean?", answer: "Product verification is the process of reviewing available product information and comparing it against reliable product, documentation and procurement information. The goal is to identify inconsistencies, missing information or potential concerns before a purchasing or deployment decision is made." },
        { question: "Can you verify HP, Dell, Lenovo, Apple and other brands?", answer: "Yes. We can review products from a wide range of technology manufacturers. The exact verification available depends on the product, identifiers, documentation and information provided." },
        { question: "Can you verify a laptop before I buy it?", answer: "Yes. You can provide the laptop model, part number, specifications, quotation and supplier information. We can review the information and identify areas that should be confirmed before purchase." },
        { question: "Can you verify serial numbers?", answer: "Serial numbers and other identifiers can be reviewed as part of a verification request. However, verification depth depends on the manufacturer, product category and whether authoritative information is available." },
        { question: "Can you verify if a product is genuine?", answer: "We can help assess authenticity indicators and identify inconsistencies, but verification should not be represented as an absolute guarantee unless the information has been confirmed through an authoritative manufacturer or authorized channel." },
        { question: "Can you verify a supplier too?", answer: "Yes. Supplier and vendor information can be reviewed alongside product information. This can help you identify missing details, inconsistencies and areas requiring additional due diligence." },
        { question: "Can you verify bulk orders?", answer: "Yes. Bulk procurement is one of the areas where structured verification can be especially useful. We can help organize product details, quantities, identifiers, specifications and documentation for review." },
        { question: "Can you verify software licenses?", answer: "Yes. Software verification can include reviewing product editions, licensing information, subscription details, keys, entitlements and documentation where those details are available." },
        { question: "Can I submit a quotation?", answer: "Yes. A quotation can be useful because it may contain the supplier's product description, part number, quantity, price, warranty and other information required for review." },
        { question: "Does verification guarantee that I will not be scammed?", answer: "No. Verification reduces uncertainty and can identify warning signs, but it cannot eliminate every commercial or fraud risk. We recommend combining product verification with supplier due diligence, secure payment practices, contractual protections and appropriate procurement controls." },
    ];

    const benefits = [
        { icon: ShieldCheck, title: "Reduce uncertainty", description: "Make purchasing decisions with a clearer understanding of the product and information presented." },
        { icon: Search, title: "Spot inconsistencies", description: "Identify differences between advertised specifications, product identifiers and supporting documentation." },
        { icon: FileCheck2, title: "Improve documentation", description: "Create a more structured record of the product information reviewed before procurement." },
        { icon: UserCheck, title: "Support supplier review", description: "Consider supplier information as part of a broader procurement due diligence process." },
        { icon: PackageCheck, title: "Protect bulk purchases", description: "Add another review layer before committing to larger technology orders." },
        { icon: Zap, title: "Move faster", description: "Use a structured workflow instead of manually comparing scattered product information." },
    ];

    function GraduationCapIcon(props) {
        return (
            <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 10l10-5 10 5-10 5L2 10Z" />
                <path d="M6 12.5V17c3 2 9 2 12 0v-4.5" />
                <path d="M22 10v6" />
            </svg>
        );
    }

    return (
        <main className="mt-25 min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* HERO */}
            <section className="relative isolate border-b border-slate-200/70 dark:border-white/10">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.14),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(99,102,241,0.12),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef6ff_48%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(99,102,241,0.16),transparent_30%),linear-gradient(135deg,#020617_0%,#081426_48%,#020617_100%)]" />
                <div className="absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/10" />
                <div className="absolute right-0 top-40 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/10" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.04] dark:text-sky-300">
                                <ShieldCheck className="h-4 w-4" />
                                Product & Procurement Verification
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                                Know what you are buying
                                <span className="block bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-blue-300 dark:to-indigo-300">
                                    before you commit.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                Technology procurement can involve confusing model
                                numbers, inconsistent specifications, unfamiliar
                                suppliers, unclear warranties and expensive mistakes.
                                We help you review the information before the money
                                moves.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                From a single laptop to a large institutional
                                technology order, our verification workflow helps
                                bring product information, documentation and
                                procurement details into one structured review.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to request product verification. Here's what I need reviewed:",
                                            {
                                                Source: "Product Verification",
                                                Stage: "Hero — request verification",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                >
                                    Request Verification
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to understand your product verification process before submitting a request.",
                                            {
                                                Source: "Product Verification",
                                                Stage: "Hero — process query",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    See how it works
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                                {[
                                    ["01", "Product details"],
                                    ["02", "Evidence review"],
                                    ["03", "Clear findings"],
                                ].map(([number, label]) => (
                                    <button
                                        type="button"
                                        key={number}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to understand the "${label}" stage of your product verification process.`,
                                                {
                                                    Source: "Product Verification",
                                                    Stage: `${number} — ${label}`,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-left backdrop-blur transition hover:border-sky-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                    >
                                        <div className="text-xs font-black tracking-[0.2em] text-sky-600 dark:text-sky-300">
                                            {number}
                                        </div>
                                        <div className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                                            {label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Verification visual */}
                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-sky-500/10 blur-3xl dark:bg-sky-500/10" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                Verification Workspace
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Product review in progress
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Active
                                    </span>
                                </div>

                                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/60">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-white/[0.06]">
                                            <Laptop className="h-7 w-7 text-sky-600 dark:text-sky-300" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Product submitted
                                            </p>
                                            <h3 className="mt-1 truncate text-base font-black text-slate-900 dark:text-white">
                                                Business Laptop / Notebook
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                Model and configuration under review
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        {[
                                            ["Manufacturer", "Provided"],
                                            ["Model / Part Number", "Reviewing"],
                                            ["Specifications", "Cross-checking"],
                                            ["Warranty", "Pending review"],
                                        ].map(([label, status], index) => (
                                            <button
                                                type="button"
                                                key={label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss the verification item: ${label} — currently ${status}.`,
                                                        {
                                                            Source: "Product Verification",
                                                            "Workspace item": label,
                                                            Status: status,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-sky-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-sky-400/30"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${index === 0
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                                                            : "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300"
                                                            }`}
                                                    >
                                                        {index === 0 ? (
                                                            <Check className="h-4 w-4" />
                                                        ) : (
                                                            <Search className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                        {label}
                                                    </span>
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                                    {status}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to know how my procurement review readiness is assessed.",
                                                {
                                                    Source: "Product Verification",
                                                    "Workspace summary": "Procurement",
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-sky-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-sky-400/30"
                                    >
                                        <PackageCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                            Procurement
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                            Review ready
                                        </p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to know how documentation is organized during verification.",
                                                {
                                                    Source: "Product Verification",
                                                    "Workspace summary": "Documentation",
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-sky-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-sky-400/30"
                                    >
                                        <FileCheck2 className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                            Documentation
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                            Organized
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto grid max-w-7xl gap-px px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                    {[
                        { icon: ShieldCheck, title: "Evidence-led", text: "Review based on available product and procurement information." },
                        { icon: Search, title: "Detail-focused", text: "Models, identifiers, specifications and documentation matter." },
                        { icon: Users, title: "Procurement-ready", text: "Designed for individuals, teams and larger organizations." },
                        { icon: Lock, title: "Decision support", text: "Built to help you make better-informed purchasing decisions." },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to know more about "${item.title}": ${item.text}`,
                                        {
                                            Source: "Product Verification",
                                            Highlight: item.title,
                                        }
                                    )
                                }
                                className="flex gap-4 border-slate-200 px-4 py-7 text-left transition hover:bg-sky-50/40 sm:border-r sm:px-6 lg:py-8 dark:border-white/10 dark:hover:bg-white/[0.035]"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                                    <Icon className="h-5 w-5" />
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
                        );
                    })}
                </div>
            </section>

            {/* WHY VERIFICATION */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_20%,rgba(59,130,246,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_90%_20%,rgba(59,130,246,0.09),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                                Why verification matters
                            </div>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                A product can look right and still deserve another look.
                            </h2>
                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Technology products often have very similar names but
                                significantly different configurations. A small
                                difference in a model number, processor, memory,
                                storage, operating system, region or warranty can
                                change what you are actually purchasing.
                            </p>
                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Our verification service adds a structured review
                                before procurement decisions are finalized.
                            </p>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-slate-500 dark:border-slate-950 dark:bg-slate-800 dark:text-slate-300"
                                        >
                                            <UserCheck className="h-4 w-4" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                    Useful for buyers, procurement teams and IT
                                    departments.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {benefits.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the verification benefit: ${item.title} — ${item.description}`,
                                                {
                                                    Source: "Product Verification",
                                                    Benefit: item.title,
                                                }
                                            )
                                        }
                                        className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-sky-400/30 dark:hover:shadow-black/20"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-400/10 dark:text-sky-300 dark:group-hover:bg-sky-500 dark:group-hover:text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE VERIFY */}
            <section className="relative border-y border-slate-200 bg-slate-100/80 py-20 dark:border-white/10 dark:bg-slate-900/50 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                            What we review
                        </div>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            More than checking a product name
                        </h2>
                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            Product verification is most useful when the surrounding
                            information is considered together. We look at the
                            identifiers, specifications and documentation available
                            for the particular request.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {verificationAreas.map((area) => {
                            const Icon = area.icon;
                            return (
                                <article
                                    key={area.title}
                                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/70"
                                >
                                    <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-sky-500/5 blur-2xl transition group-hover:bg-sky-500/10" />
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to verify: ${area.title}. ${area.description} Focus items: ${area.items.join(", ")}.`,
                                                    {
                                                        Source: "Product Verification",
                                                        "Verification area": area.title,
                                                    }
                                                )
                                            }
                                            className="flex w-full flex-col items-start text-left"
                                        >
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sky-600 dark:bg-white/[0.06] dark:text-sky-300">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="mt-6 text-lg font-black text-slate-900 dark:text-white">
                                                {area.title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {area.description}
                                            </p>
                                        </button>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {area.items.map((item) => (
                                                <button
                                                    type="button"
                                                    key={item}
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I'd like to review this verification item: ${item}.`,
                                                            {
                                                                Source: "Product Verification",
                                                                Area: area.title,
                                                                Item: item,
                                                            }
                                                        )
                                                    }
                                                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* VERIFICATION TYPES */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                                One service, many use cases
                            </div>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Tell us what you need checked.
                            </h2>
                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Product verification is not limited to laptops. We
                                can structure the review around the type of product
                                or procurement information you are dealing with.
                            </p>

                            <div className="mt-8 rounded-3xl border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-400/20 dark:bg-indigo-400/[0.06]">
                                <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                                <h3 className="mt-4 text-base font-black text-slate-900 dark:text-white">
                                    AI-assisted request preparation
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    We can structure your submitted product details,
                                    identify missing information and help organize
                                    the request before human review.
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to try the AI-assisted verification intake to organize my product details before review.",
                                            {
                                                Source: "Product Verification",
                                                Stage: "AI-assisted intake",
                                            }
                                        )
                                    }
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-indigo-700"
                                >
                                    Ask AB AI
                                    <Sparkles className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {verificationTypes.map((type) => {
                                const Icon = type.icon;
                                const active = verificationType === type.id;
                                return (
                                    <button
                                        type="button"
                                        key={type.id}
                                        onClick={() => {
                                            setVerificationType(type.id);
                                            startSupportChat(
                                                `I'd like to verify: ${type.title}. ${type.description}`,
                                                {
                                                    Source: "Product Verification",
                                                    "Verification type": type.title,
                                                }
                                            );
                                        }}
                                        className={`group rounded-3xl border p-6 text-left transition ${active
                                            ? "border-sky-400 bg-sky-50 shadow-xl shadow-sky-900/5 dark:border-sky-400/40 dark:bg-sky-400/[0.07]"
                                            : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${active
                                                ? "bg-sky-600 text-white dark:bg-sky-500"
                                                : "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300"
                                                }`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mt-5 text-base font-black text-slate-900 dark:text-white">
                                            {type.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {type.description}
                                        </p>
                                        <div className="mt-5 inline-flex items-center gap-2 text-xs font-black text-sky-600 dark:text-sky-300">
                                            Explore verification
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                id="how-it-works"
                className="relative overflow-hidden border-y border-slate-200 bg-slate-950 py-20 text-white dark:border-white/10 lg:py-28"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(99,102,241,0.18),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-300">
                            How it works
                        </div>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            A structured path from product information to a clearer decision.
                        </h2>
                        <p className="mt-5 text-base leading-8 text-slate-300">
                            We keep the process straightforward. You provide what you
                            have, we organize and review it, and you receive findings
                            that help you decide what to confirm next.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 lg:grid-cols-5">
                        {verificationSteps.map((step, index) => {
                            const Icon = step.icon;
                            const active = activeStep === index;
                            return (
                                <button
                                    type="button"
                                    key={step.number}
                                    onClick={() => {
                                        setActiveStep(index);
                                        startSupportChat(
                                            `I'd like to understand the verification step: "${step.title}" — ${step.description}`,
                                            {
                                                Source: "Product Verification",
                                                Step: `${step.number} — ${step.title}`,
                                            }
                                        );
                                    }}
                                    className={`group relative rounded-3xl border p-6 text-left transition ${active
                                        ? "border-sky-400/60 bg-white/[0.09]"
                                        : "border-white/10 bg-white/[0.035] hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black tracking-[0.2em] text-sky-300">
                                            {step.number}
                                        </span>
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-sky-300">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <h3 className="mt-7 text-base font-black">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        {step.description}
                                    </p>
                                    <div
                                        className={`mt-6 h-1 rounded-full transition ${active ? "bg-sky-400" : "bg-white/10"}`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                                    <Info className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                                        Current step
                                    </p>
                                    <h3 className="mt-1 text-xl font-black">
                                        {verificationSteps[activeStep].title}
                                    </h3>
                                </div>
                            </div>
                            <p className="max-w-2xl text-sm leading-7 text-slate-400">
                                {verificationSteps[activeStep].description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMON CHECKS */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                        <div className="lg:sticky lg:top-28">
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                                Verification checklist
                            </div>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Questions worth answering before you buy.
                            </h2>
                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Every procurement situation is different, but the
                                right questions can expose gaps in product and
                                supplier information early.
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to start a verification request.",
                                        {
                                            Source: "Product Verification",
                                            Stage: "Checklist — start request",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
                            >
                                Start a verification request
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {commonChecks.map((check, index) => (
                                <button
                                    type="button"
                                    key={check}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like help answering this verification question: ${check}`,
                                            {
                                                Source: "Product Verification",
                                                "Checklist item": check,
                                            }
                                        )
                                    }
                                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-sky-200 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-sky-400/20"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-black text-slate-400 dark:text-slate-500">
                                            CHECK {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                                            {check}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCUREMENT SCENARIOS */}
            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                            Built around procurement
                        </div>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Verification can happen at different points in the buying journey.
                        </h2>
                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            The earlier you identify a problem, the easier it usually
                            is to resolve it.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {procurementScenarios.map((scenario) => {
                            const Icon = scenario.icon;
                            return (
                                <button
                                    type="button"
                                    key={scenario.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss verification timing: ${scenario.title} — ${scenario.description}`,
                                            {
                                                Source: "Product Verification",
                                                "Procurement scenario": scenario.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-indigo-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-6 text-lg font-black text-slate-900 dark:text-white">
                                        {scenario.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {scenario.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* BULK PROCUREMENT */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-500/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
                        <div className="grid lg:grid-cols-[1fr_0.8fr]">
                            <div className="p-8 sm:p-10 lg:p-14">
                                <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                    <Package className="h-3.5 w-3.5" />
                                    Bulk & Institutional Procurement
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                    Buying 10, 50, 200 or more devices?
                                </h2>

                                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Large purchases deserve more than a quick glance
                                    at a quotation. We can help structure product
                                    information across quantities, configurations,
                                    part numbers, warranties and supplier details.
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Product-by-product review",
                                        "Model and part-number comparison",
                                        "Quantity consistency",
                                        "Specification consistency",
                                        "Warranty documentation",
                                        "Supplier information",
                                        "Quotation review",
                                        "Procurement documentation",
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like bulk verification support for: ${item}.`,
                                                    {
                                                        Source: "Product Verification",
                                                        "Bulk item": item,
                                                    }
                                                )
                                            }
                                            className="flex items-center gap-3 text-left text-sm font-semibold text-slate-700 transition hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-300"
                                        >
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a bulk order verification. Here's my requirement:",
                                            {
                                                Source: "Product Verification",
                                                Stage: "Bulk order",
                                            }
                                        )
                                    }
                                    className="mt-9 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
                                >
                                    Discuss a bulk order
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="relative border-t border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-slate-950/60 lg:border-l lg:border-t-0 lg:p-10">
                                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />
                                <div className="relative">
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                        Example workflow
                                    </p>

                                    <div className="mt-6 space-y-4">
                                        {[
                                            ["200", "Devices requested"],
                                            ["01", "Approved configuration"],
                                            ["Multiple", "Identifiers reviewed"],
                                            ["Final", "Procurement decision"],
                                        ].map(([value, label], index) => (
                                            <button
                                                type="button"
                                                key={label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `In a bulk verification workflow, I'd like to discuss: ${label} (${value}).`,
                                                        {
                                                            Source: "Product Verification",
                                                            "Bulk workflow step": label,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-sky-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                            >
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sm font-black text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div className="text-lg font-black text-slate-900 dark:text-white">
                                                        {value}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        {label}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-400/20 dark:bg-amber-400/[0.06]">
                                        <div className="flex gap-3">
                                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                                            <p className="text-xs leading-5 text-amber-800 dark:text-amber-200">
                                                Verification is a decision-support
                                                service and does not replace
                                                manufacturer confirmation, legal
                                                due diligence or appropriate
                                                procurement controls.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI VERIFICATION */}
            <section className="relative overflow-hidden border-y border-slate-200 bg-slate-950 py-20 text-white dark:border-white/10 lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_75%_80%,rgba(129,140,248,0.18),transparent_32%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black text-sky-300">
                                <Sparkles className="h-4 w-4" />
                                AI-assisted verification
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Smarter intake. Better organized evidence.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                Your verification request can be assisted by AI to
                                organize product information, summarize documents,
                                identify missing fields and prepare the request for
                                structured review.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Extract product details from submitted information",
                                    "Organize model and specification data",
                                    "Identify missing verification fields",
                                    "Highlight potentially conflicting information",
                                    "Prepare a concise review summary",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to use AI-assisted verification for: ${item}.`,
                                                {
                                                    Source: "Product Verification",
                                                    "AI capability": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-start gap-3 text-left transition hover:opacity-90"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                                        <span className="text-sm leading-6 text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <p className="mt-7 text-xs leading-5 text-slate-500">
                                AI-assisted analysis should be treated as support,
                                not as an unconditional authenticity guarantee.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-sky-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">
                                                AI Review Assistant
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Structured analysis
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                                        Ready
                                    </span>
                                </div>

                                <div className="mt-5 rounded-2xl bg-black/20 p-5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Submitted information
                                    </p>

                                    <div className="mt-4 space-y-2">
                                        {[
                                            "Product: Business laptop",
                                            "Manufacturer: Provided",
                                            "Model: Provided",
                                            "Part number: Provided",
                                            "Quantity: 200 units",
                                        ].map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss this submitted verification item: ${item}.`,
                                                        {
                                                            Source: "Product Verification",
                                                            "AI submitted item": item,
                                                        }
                                                    )
                                                }
                                                className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-sky-400/40 hover:bg-white/[0.05]"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 rounded-2xl border border-sky-400/20 bg-sky-400/[0.05] p-5">
                                    <div className="flex items-center gap-3">
                                        <Search className="h-5 w-5 text-sky-300" />
                                        <span className="text-sm font-black">
                                            Review areas identified
                                        </span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        {["Model", "Part number", "Specification", "Warranty"].map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to review this AI-identified area: ${item}.`,
                                                        {
                                                            Source: "Product Verification",
                                                            "AI review area": item,
                                                        }
                                                    )
                                                }
                                                className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2 text-left transition hover:bg-white/[0.08]"
                                            >
                                                <Check className="h-3.5 w-3.5 text-sky-300" />
                                                <span className="text-xs text-slate-300">
                                                    {item}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                                Who we help
                            </div>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Verification for real-world technology procurement.
                            </h2>
                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Whether you are purchasing one device or coordinating
                                a large technology deployment, the same principle
                                applies: know what you are purchasing before it becomes
                                difficult to change.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {industries.map((industry) => {
                                const Icon = industry.icon;
                                return (
                                    <button
                                        type="button"
                                        key={industry.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like verification support for the ${industry.title} sector: ${industry.description}`,
                                                {
                                                    Source: "Product Verification",
                                                    Industry: industry.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-sky-400/30"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-sky-600 dark:bg-white/[0.06] dark:text-sky-300">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="mt-5 text-base font-black text-slate-900 dark:text-white">
                                            {industry.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {industry.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT TO SUBMIT */}
            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                                Prepare your request
                            </div>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Send whatever information you already have.
                            </h2>
                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                You do not need to have a perfect procurement file
                                before starting. We can help identify what is missing
                                and what should be confirmed.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "Product name",
                                    "Manufacturer",
                                    "Model number",
                                    "Part number / SKU",
                                    "Serial number where available",
                                    "Quoted specifications",
                                    "Quantity",
                                    "Supplier information",
                                    "Quotation or invoice",
                                    "Warranty details",
                                    "Product photos where relevant",
                                    "Any concerns you already have",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to submit this for verification: ${item}.`,
                                                {
                                                    Source: "Product Verification",
                                                    "Submission item": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 text-left transition hover:opacity-90"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm dark:bg-white/[0.06] dark:text-emerald-300">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-slate-950/70 sm:p-9">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                                    <FileSearch className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 dark:text-white">
                                        Don't have all the information?
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        That's okay.
                                    </p>
                                </div>
                            </div>

                            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Start with what you have. Our request process can
                                help organize the information and identify the
                                important fields that still need confirmation.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "We organize your request",
                                    "We identify missing details",
                                    "We review available evidence",
                                    "We highlight items requiring confirmation",
                                ].map((item, index) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like help with: ${item}.`,
                                                {
                                                    Source: "Product Verification",
                                                    "Process item": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-indigo-400/30"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white dark:bg-indigo-500">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to submit what I have for verification. Here's what I know:",
                                        {
                                            Source: "Product Verification",
                                            Stage: "Submit what I have",
                                        }
                                    )
                                }
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                            >
                                Submit what I have
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIMITATIONS */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] border border-amber-200 bg-amber-50/70 p-7 dark:border-amber-400/20 dark:bg-amber-400/[0.05] sm:p-10">
                        <div className="flex flex-col gap-7 sm:flex-row">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-950 dark:text-white">
                                    Verification should increase confidence — not create false certainty.
                                </h2>
                                <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    <p>
                                        Product verification is designed to help you
                                        make better-informed decisions. It does not
                                        automatically guarantee authenticity,
                                        ownership, condition, warranty eligibility,
                                        supplier legitimacy or future performance.
                                    </p>
                                    <p>
                                        Where authoritative manufacturer confirmation
                                        is required, we recommend obtaining it
                                        directly from the manufacturer or an
                                        authorized channel.
                                    </p>
                                    <p>
                                        For high-value purchases, combine product
                                        verification with appropriate contracts,
                                        supplier due diligence, secure payment
                                        methods, delivery inspection and internal
                                        procurement controls.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to understand the limits of your product verification service before proceeding.",
                                            {
                                                Source: "Product Verification",
                                                Stage: "Limitations enquiry",
                                            }
                                        )
                                    }
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-amber-700"
                                >
                                    Ask AB AI
                                    <Sparkles className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                            Frequently asked questions
                        </div>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            Questions before you submit a request?
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const open = activeFaq === index;
                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border bg-white transition dark:bg-slate-950/60 ${open
                                        ? "border-sky-300 shadow-lg shadow-sky-900/5 dark:border-sky-400/30"
                                        : "border-slate-200 dark:border-white/10"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setActiveFaq(open ? null : index)}
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                                    >
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition ${open ? "rotate-180 text-sky-500" : ""}`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="border-t border-slate-200 px-5 py-5 dark:border-white/10 sm:px-6">
                                                <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                    {faq.answer}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I have a question about: "${faq.question}"`,
                                                            {
                                                                Source: "Product Verification",
                                                                FAQ: faq.question,
                                                            }
                                                        )
                                                    }
                                                    className="mt-4 inline-flex items-center gap-2 text-xs font-black text-sky-600 hover:gap-3 dark:text-sky-300"
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

            {/* FINAL CTA */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.12),transparent_38%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.13),transparent_38%)]" />

                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-50 text-sky-600 shadow-sm dark:bg-sky-400/10 dark:text-sky-300">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h2 className="mt-7 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                        Before you buy, verify what you are buying.
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                        Send us the product details, quotation or procurement
                        information you have. We will help structure the review and
                        identify what should be confirmed before you proceed.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request product verification. Here's what I need reviewed:",
                                    {
                                        Source: "Product Verification",
                                        Stage: "Final CTA — request verification",
                                    }
                                )
                            }
                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                        >
                            Request Product Verification
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to learn about your product verification process before submitting a request.",
                                    {
                                        Source: "Product Verification",
                                        Stage: "Final CTA — learn process",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-800 transition hover:bg-slate-50 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                        >
                            Learn the process
                        </button>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
                        <span className="inline-flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            Product review
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            Documentation review
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            Procurement support
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            Bulk order support
                        </span>
                    </div>
                </div>
            </section>

            {/* REQUEST MODAL */}
            {showRequestForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm">
                    <div className="absolute inset-0" onClick={() => setShowRequestForm(false)} />

                    <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
                        <div className="flex items-start justify-between border-b border-slate-200 p-6 dark:border-white/10 sm:p-7">
                            <div>
                                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                                    Request product verification
                                </h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Tell us what you want reviewed.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowRequestForm(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.06] dark:hover:text-white"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleRequestSubmit} className="space-y-5 p-6 sm:p-7">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        value={reqName}
                                        onChange={(e) => setReqName(e.target.value)}
                                        placeholder="Full name"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={reqEmail}
                                        onChange={(e) => setReqEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    What are you verifying?
                                </label>
                                <select
                                    value={verificationType}
                                    onChange={(event) => setVerificationType(event.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                                >
                                    <option value="device">Hardware & Devices</option>
                                    <option value="software">Software & Licenses</option>
                                    <option value="supplier">Supplier & Vendor</option>
                                    <option value="document">Documents & Records</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Product / request details
                                </label>
                                <textarea
                                    rows={6}
                                    required
                                    value={reqDetails}
                                    onChange={(e) => setReqDetails(e.target.value)}
                                    placeholder="Tell us the product, model, part number, quantity, supplier, quoted specifications, warranty information or anything else you want reviewed..."
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600"
                                />
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                                <div className="flex gap-3">
                                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-300" />
                                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        Your request will be sent to AB AI so you
                                        can continue the conversation with full
                                        context.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowRequestForm(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.05]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
                                >
                                    Submit Request
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}