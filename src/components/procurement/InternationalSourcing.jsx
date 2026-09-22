import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Boxes,
    BriefcaseBusiness,
    Building2,
    Check,
    ChevronDown,
    ChevronRight,
    CircleDollarSign,
    ClipboardCheck,
    Clock3,
    Container,
    Cpu,
    FileCheck2,
    Globe2,
    Headphones,
    Landmark,
    Languages,
    MapPin,
    MessageSquare,
    PackageCheck,
    Plane,
    Search,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Truck,
    Users,
    Warehouse,
    Workflow,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

/* =========================================================
   DATA
   ========================================================= */

const countries = [
    {
        name: "China",
        code: "CN",
        description:
            "Manufacturers, distributors, OEM/ODM suppliers and technology product sourcing across major Chinese supply markets.",
        tags: ["OEM / ODM", "Electronics", "Hardware", "Manufacturing"],
    },
    {
        name: "Canada",
        code: "CA",
        description:
            "Technology products, business equipment, refurbished and new devices, software-related products and specialist suppliers.",
        tags: ["Technology", "Business Equipment", "Devices", "Suppliers"],
    },
    {
        name: "United States",
        code: "US",
        description:
            "Enterprise technology, hardware, software products, specialist equipment and established distribution channels.",
        tags: ["Enterprise", "Software", "Hardware", "Specialist"],
    },
    {
        name: "United Kingdom",
        code: "GB",
        description:
            "Business technology, educational equipment, IT hardware, specialist products and established European supply channels.",
        tags: ["Business", "Education", "IT", "Equipment"],
    },
    {
        name: "United Arab Emirates",
        code: "AE",
        description:
            "Regional technology distributors, electronics, business equipment and products available through Middle East supply networks.",
        tags: ["Distribution", "Electronics", "IT", "Regional"],
    },
    {
        name: "Europe",
        code: "EU",
        description:
            "Access to European suppliers, manufacturers and specialist distributors where quality, compliance or availability matters.",
        tags: ["EU Suppliers", "Specialist", "Compliance", "Equipment"],
    },
];

const services = [
    {
        icon: Search,
        title: "Supplier Discovery",
        description:
            "We identify manufacturers, distributors, wholesalers and specialist suppliers that match your product, specification, quantity and commercial requirements.",
    },
    {
        icon: ShieldCheck,
        title: "Supplier Verification",
        description:
            "We help assess supplier legitimacy, business information, product claims, documentation, track record and other available verification signals before you commit.",
    },
    {
        icon: ClipboardCheck,
        title: "Product Verification",
        description:
            "We compare specifications, model numbers, configurations, warranty information and product details against your actual requirements.",
    },
    {
        icon: CircleDollarSign,
        title: "Price & Quote Comparison",
        description:
            "We can collect and organize quotations so you can compare unit pricing, quantity breaks, shipping, lead time, warranty and other commercial terms.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Commercial Negotiation",
        description:
            "Where appropriate, we can assist with supplier communication and commercial discussions around quantities, pricing, delivery timelines and requirements.",
    },
    {
        icon: PackageCheck,
        title: "Order Coordination",
        description:
            "We help coordinate the procurement process from approved supplier selection through order documentation and fulfillment planning.",
    },
    {
        icon: Container,
        title: "Logistics Coordination",
        description:
            "We help coordinate the information required for shipping and delivery, including quantities, packaging, destination and preferred logistics arrangements.",
    },
    {
        icon: FileCheck2,
        title: "Procurement Documentation",
        description:
            "Keep quotations, specifications, supplier information, purchase records and related documentation organized throughout the procurement process.",
    },
];

const sourcingSteps = [
    {
        number: "01",
        title: "Tell us what you need",
        description:
            "Send a product name, model number, specification, photo, quantity, target budget or simply explain the business problem.",
    },
    {
        number: "02",
        title: "We structure the requirement",
        description:
            "We turn your request into a clear sourcing brief covering specifications, quantities, preferred origin, commercial expectations and delivery requirements.",
    },
    {
        number: "03",
        title: "We research the market",
        description:
            "We identify potential suppliers and sourcing routes across suitable international markets.",
    },
    {
        number: "04",
        title: "We compare options",
        description:
            "Supplier options can be organized around price, availability, specifications, warranty, lead time and other relevant factors.",
    },
    {
        number: "05",
        title: "You approve the direction",
        description:
            "You remain in control of the final supplier, product, quantity and commercial decision.",
    },
    {
        number: "06",
        title: "We coordinate procurement",
        description:
            "Once approved, we help move the requirement through the agreed procurement and fulfillment process.",
    },
];

const useCases = [
    {
        icon: Building2,
        title: "Corporate Procurement",
        text: "Source laptops, desktops, monitors, networking equipment, printers, accessories and other business technology at scale.",
    },
    {
        icon: Landmark,
        title: "Government & Institutions",
        text: "Support structured technology and equipment sourcing requirements for institutions, projects and organizational deployments.",
    },
    {
        icon: GraduationCapIcon,
        title: "Education",
        text: "Source computers, smart classroom equipment, networking devices, displays, accessories and technology infrastructure.",
    },
    {
        icon: Warehouse,
        title: "Retail & Resellers",
        text: "Identify products and supply channels suitable for businesses that need inventory for resale.",
    },
    {
        icon: Cpu,
        title: "Technology Projects",
        text: "Source specialized hardware and technology components required for software, infrastructure and digital transformation projects.",
    },
    {
        icon: Boxes,
        title: "Bulk Procurement",
        text: "Handle larger sourcing requirements where quantity, consistency, supplier reliability and delivery planning matter.",
    },
];

function GraduationCapIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 10l10-5 10 5-10 5L2 10Z" />
            <path d="M6 12.5V17c3 2 9 2 12 0v-4.5" />
            <path d="M22 10v6" />
        </svg>
    );
}

const faqs = [
    {
        question: "Can you source products that are not listed on your website?",
        answer:
            "Yes. Our sourcing service is requirement-driven. You can send us a specific product, model, specification, image, quantity or business requirement and we can help determine suitable sourcing options.",
    },
    {
        question: "Can you source from China?",
        answer:
            "Yes. China is one of the major international sourcing markets we can consider, particularly for electronics, hardware, components, accessories, OEM/ODM products and manufacturing requirements.",
    },
    {
        question: "Can you source branded HP, Dell, Lenovo or similar products?",
        answer:
            "We can help research suitable authorized or established supply channels where available. For branded products, supplier authorization, warranty coverage, model authenticity and regional availability are important considerations.",
    },
    {
        question: "Can you source in bulk?",
        answer:
            "Yes. Bulk sourcing is an important use case. We can structure requirements around quantities, specifications, supplier capacity, pricing tiers, lead times and fulfillment considerations.",
    },
    {
        question: "Do I have to know the exact product I want?",
        answer:
            "No. You can describe what you are trying to accomplish instead. For example, you could say you need 200 computers for an office or school, and we can help structure the technical requirement.",
    },
    {
        question: "Can you compare suppliers?",
        answer:
            "Yes. Supplier comparison can include product specification, unit price, quantity pricing, warranty, lead time, shipping considerations and available supplier information.",
    },
    {
        question: "Can you guarantee that an international supplier is legitimate?",
        answer:
            "No responsible sourcing company should promise absolute certainty based only on remote information. We can perform reasonable verification and due diligence checks, identify risks and present the available evidence so you can make an informed decision.",
    },
    {
        question: "Can you handle the shipping?",
        answer:
            "We can help coordinate procurement and logistics information and work with appropriate freight or logistics providers. The exact arrangement depends on the product, origin, destination, quantity and shipping method.",
    },
];

/* =========================================================
   REUSABLE UI
   ========================================================= */

function SectionLabel({ children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {children}
        </div>
    );
}

function PrimaryButton({ children, href = "#request-sourcing", icon = true, onClick }) {
    // When an onClick is supplied, render a button so we can hand off to chat.
    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
            >
                {children}
                {icon && (
                    <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                )}
            </button>
        );
    }

    return (
        <a
            href={href}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
        >
            {children}
            {icon && (
                <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            )}
        </a>
    );
}

function SecondaryButton({ children, href = "#how-it-works", onClick }) {
    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
                {children}
                <ChevronRight size={17} />
            </button>
        );
    }

    return (
        <a
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-400"
        >
            {children}
            <ChevronRight size={17} />
        </a>
    );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function InternationalSourcing() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);
    const [requestType, setRequestType] = useState("Product Sourcing");
    const [quantity, setQuantity] = useState("");
    const [origin, setOrigin] = useState("Any suitable market");

    // New controlled fields for the request form
    const [requirement, setRequirement] = useState("");
    const [budget, setBudget] = useState("");
    const [timeline, setTimeline] = useState("");
    const [contactName, setContactName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    /* -----------------------------------------------------
       Hand off a contextual request to the support page.
    ----------------------------------------------------- */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss international sourcing or procurement.",
            metadata: metadata || {
                Source: "International Sourcing & Procurement",
            },
        });

        navigate("/support/ai");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        const composed = [
            "I'd like to submit an international sourcing request.",
            "",
            `Request type: ${requestType}`,
            `Preferred market: ${origin}`,
            quantity ? `Quantity: ${quantity}` : null,
            budget ? `Estimated budget: ${budget}` : null,
            timeline ? `Required timeline: ${timeline}` : null,
            contactName ? `Contact name: ${contactName}` : null,
            email ? `Contact email: ${email}` : null,
            requirement ? `\nRequirement details:\n${requirement}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        startSupportChat(composed, {
            Source: "International Sourcing & Procurement",
            "Request type": requestType,
            Market: origin,
            Quantity: quantity || "Not specified",
            Budget: budget || "Not specified",
            Timeline: timeline || "Not specified",
            Stage: "International sourcing request form",
        });

        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <main className="mt-25 min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#070b12] dark:text-white">
            {/* =========================================================
                HERO
            ========================================================== */}
            <section className="relative isolate border-b border-slate-200/70 dark:border-white/[0.06]">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.11),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef5ff_48%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,#070b12_0%,#0b1220_50%,#070b12_100%)]" />

                <div className="absolute inset-0 -z-10 opacity-[0.22] dark:opacity-[0.12]">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)",
                            backgroundSize: "44px 44px",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <SectionLabel>International Sourcing & Procurement</SectionLabel>

                            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
                                Find the right products.
                                <span className="block text-blue-600 dark:text-blue-400">
                                    From the right markets.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                AB Technologies helps businesses, institutions and
                                organizations source technology, equipment and
                                specialized products from suitable international
                                supply markets — from requirement definition and
                                supplier discovery to verification, comparison and
                                procurement coordination.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <PrimaryButton
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start an international sourcing request. Here's what I need:",
                                            {
                                                Source: "International Sourcing & Procurement",
                                                Stage: "Hero — start request",
                                            }
                                        )
                                    }
                                >
                                    Start an International Request
                                </PrimaryButton>

                                <SecondaryButton
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to understand how international sourcing works at AB Technologies before submitting a request.",
                                            {
                                                Source: "International Sourcing & Procurement",
                                                Stage: "Hero — process query",
                                            }
                                        )
                                    }
                                >
                                    See How It Works
                                </SecondaryButton>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-5 border-t border-slate-300/70 pt-7 sm:grid-cols-4 dark:border-white/10">
                                <div>
                                    <p className="text-2xl font-black">Global</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        sourcing reach
                                    </p>
                                </div>

                                <div>
                                    <p className="text-2xl font-black">B2B</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        focused
                                    </p>
                                </div>

                                <div>
                                    <p className="text-2xl font-black">Bulk</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        procurement
                                    </p>
                                </div>

                                <div>
                                    <p className="text-2xl font-black">End-to-End</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        coordination
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Global sourcing visual */}
                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                                                Global Supply Network
                                            </p>
                                            <h2 className="mt-2 text-xl font-black">
                                                Source beyond borders
                                            </h2>
                                        </div>

                                        <div className="rounded-xl bg-white/10 p-3">
                                            <Globe2 size={24} />
                                        </div>
                                    </div>

                                    <div className="relative mt-8 h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-950">
                                        <div className="absolute left-[18%] top-[25%] h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_24px_8px_rgba(96,165,250,0.3)]" />
                                        <div className="absolute left-[45%] top-[43%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_8px_rgba(103,232,249,0.3)]" />
                                        <div className="absolute left-[68%] top-[31%] h-3 w-3 rounded-full bg-blue-300 shadow-[0_0_24px_8px_rgba(147,197,253,0.3)]" />
                                        <div className="absolute left-[75%] top-[65%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_24px_8px_rgba(125,211,252,0.3)]" />

                                        <svg
                                            className="absolute inset-0 h-full w-full"
                                            viewBox="0 0 600 300"
                                            fill="none"
                                        >
                                            <path
                                                d="M110 80 C210 30 300 190 410 95"
                                                stroke="rgba(96,165,250,.65)"
                                                strokeWidth="1.5"
                                                strokeDasharray="5 7"
                                            />
                                            <path
                                                d="M270 130 C350 80 420 190 455 195"
                                                stroke="rgba(103,232,249,.55)"
                                                strokeWidth="1.5"
                                                strokeDasharray="5 7"
                                            />
                                            <path
                                                d="M110 80 C220 230 390 210 455 195"
                                                stroke="rgba(147,197,253,.35)"
                                                strokeWidth="1"
                                                strokeDasharray="4 8"
                                            />
                                        </svg>

                                        <div className="absolute left-5 top-5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                            Asia
                                        </div>

                                        <div className="absolute left-[41%] top-[48%] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                            Africa
                                        </div>

                                        <div className="absolute right-5 top-5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                            North America
                                        </div>

                                        <div className="absolute bottom-5 right-5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                            Europe / Middle East
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                            <Search size={18} className="text-blue-300" />
                                            <p className="mt-3 text-sm font-bold">Discover</p>
                                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                                Suitable suppliers
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                            <ShieldCheck size={18} className="text-cyan-300" />
                                            <p className="mt-3 text-sm font-bold">Verify</p>
                                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                                Before committing
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {[
                                        ["01", "Requirement"],
                                        ["02", "Sourcing"],
                                        ["03", "Fulfillment"],
                                    ].map(([num, label]) => (
                                        <div
                                            key={num}
                                            className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.03]"
                                        >
                                            <span className="text-[10px] font-black text-blue-500">
                                                {num}
                                            </span>
                                            <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                                                {label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                TRUST STRIP
            ========================================================== */}
            <section className="border-b border-slate-200 bg-white dark:border-white/[0.06] dark:bg-[#090e17]">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-5 py-7 sm:grid-cols-4 sm:px-6 lg:px-8 dark:divide-white/10">
                    {[
                        {
                            icon: Globe2,
                            title: "International reach",
                            text: "Multiple sourcing markets",
                        },
                        {
                            icon: BadgeCheck,
                            title: "Supplier diligence",
                            text: "Verification before commitment",
                        },
                        {
                            icon: BarChart3,
                            title: "Compare options",
                            text: "Price, specs & terms",
                        },
                        {
                            icon: Headphones,
                            title: "Human support",
                            text: "From request to delivery",
                        },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to know more about "${item.title}" — ${item.text}.`,
                                        {
                                            Source: "International Sourcing & Procurement",
                                            Topic: item.title,
                                        }
                                    )
                                }
                                className="px-4 py-1 text-left transition hover:bg-blue-50/60 first:pl-0 sm:px-7 dark:hover:bg-white/[0.03]"
                            >
                                <Icon size={20} className="text-blue-500" />
                                <p className="mt-3 text-sm font-bold">{item.title}</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* =========================================================
                INTRO
            ========================================================== */}
            <section className="relative py-20 lg:py-28">
                <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.10),transparent_65%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_65%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <SectionLabel>Beyond Local Availability</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                                If the product exists somewhere, we help you find the path to it.
                            </h2>
                        </div>

                        <div className="space-y-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                International procurement can become complicated
                                quickly. Different suppliers use different product
                                names, specifications, pricing structures, warranty
                                terms, minimum order quantities and shipping
                                arrangements.
                            </p>

                            <p>
                                Our role is to make that process more structured.
                                Instead of simply asking you to search the internet
                                yourself, AB Technologies can help translate your
                                requirement into a sourcing brief, research suitable
                                markets, identify potential supply channels, organize
                                options and support the procurement process.
                            </p>

                            <p>
                                Whether you need a single specialized device or
                                hundreds of computers for an organization, the
                                objective remains the same: <strong className="text-slate-950 dark:text-white">
                                    better information before you make a purchasing decision.
                                </strong>
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like help structuring an international sourcing requirement — supplier discovery, verification, comparison and coordination.",
                                        {
                                            Source: "International Sourcing & Procurement",
                                            Stage: "Intro enquiry",
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400"
                            >
                                Start with your requirement
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHAT WE SOURCE
            ========================================================== */}
            <section className="relative border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/[0.06] dark:bg-[#0b111b] lg:py-28">
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>What We Can Source</SectionLabel>

                        <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                            From everyday business equipment to specialized technology.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
                            Your requirement does not have to fit into a predefined
                            catalog. We can work from a product name, model number,
                            technical specification, image, quantity or business need.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Cpu,
                                title: "Computers",
                                items: ["Laptops", "Desktops", "Workstations", "Servers"],
                            },
                            {
                                icon: WifiIcon,
                                title: "Networking",
                                items: ["Switches", "Routers", "Access points", "Firewalls"],
                            },
                            {
                                icon: MonitorIcon,
                                title: "Displays",
                                items: ["Monitors", "Projectors", "Interactive displays", "Digital signage"],
                            },
                            {
                                icon: PackageIcon,
                                title: "Accessories",
                                items: ["Keyboards", "Mice", "Cables", "Power equipment"],
                            },
                            {
                                icon: ServerIcon,
                                title: "Infrastructure",
                                items: ["Servers", "Racks", "Storage", "UPS systems"],
                            },
                            {
                                icon: PrinterIcon,
                                title: "Office Equipment",
                                items: ["Printers", "Scanners", "POS equipment", "Office devices"],
                            },
                            {
                                icon: CameraIcon,
                                title: "Security",
                                items: ["CCTV", "Access control", "Biometrics", "Monitoring"],
                            },
                            {
                                icon: Boxes,
                                title: "Specialized Products",
                                items: ["Components", "OEM products", "Project equipment", "Custom requests"],
                            },
                        ].map((category) => {
                            const Icon = category.icon;

                            return (
                                <button
                                    type="button"
                                    key={category.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to source ${category.title.toLowerCase()}: ${category.items.join(", ")}.`,
                                            {
                                                Source: "International Sourcing & Procurement",
                                                Category: category.title,
                                            }
                                        )
                                    }
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/40"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon size={21} />
                                    </div>

                                    <h3 className="mt-5 font-black">
                                        {category.title}
                                    </h3>

                                    <ul className="mt-4 space-y-2">
                                        {category.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
                                            >
                                                <Check size={14} className="shrink-0 text-blue-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400">
                                        Request this category
                                        <ArrowRight size={13} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SERVICES
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <SectionLabel>Our Sourcing Services</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                                More than finding a product.
                            </h2>

                            <p className="mt-5 max-w-lg leading-7 text-slate-600 dark:text-slate-400">
                                International sourcing is a process. We can support
                                the important stages around discovery, verification,
                                comparison, coordination and fulfillment.
                            </p>

                            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-500/20 dark:bg-blue-500/[0.07]">
                                <Sparkles size={21} className="text-blue-600 dark:text-blue-400" />

                                <p className="mt-4 text-sm font-bold">
                                    Need help from scratch?
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    You do not need to know the supplier, country,
                                    model or exact product. Tell us the outcome you
                                    need and we can help structure the sourcing brief.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I need help from scratch with international sourcing — I don't know the supplier, country, model or exact product yet.",
                                            {
                                                Source: "International Sourcing & Procurement",
                                                Stage: "From-scratch enquiry",
                                            }
                                        )
                                    }
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-blue-700"
                                >
                                    Ask AB AI
                                    <Sparkles size={13} />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {services.map((service, index) => {
                                const Icon = service.icon;

                                return (
                                    <button
                                        type="button"
                                        key={service.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the sourcing service: ${service.title} — ${service.description}`,
                                                {
                                                    Source: "International Sourcing & Procurement",
                                                    Service: service.title,
                                                }
                                            )
                                        }
                                        className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/40"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/[0.07] dark:text-slate-200">
                                                <Icon size={21} />
                                            </div>

                                            <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-lg font-black">
                                            {service.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {service.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                COUNTRIES
            ========================================================== */}
            <section className="relative overflow-hidden border-y border-slate-200/70 bg-white py-20 dark:border-white/[0.06] dark:bg-[#090e17] lg:py-28">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
                <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>Sourcing Markets</SectionLabel>

                        <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                            The best source is not always the nearest source.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            Different markets offer different advantages. Depending
                            on the product, quantity, budget, warranty requirements,
                            lead time and compliance considerations, we can explore
                            different sourcing routes.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {countries.map((country) => (
                            <button
                                type="button"
                                key={country.code}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to source from ${country.name}. ${country.description} Focus areas: ${country.tags.join(", ")}.`,
                                        {
                                            Source: "International Sourcing & Procurement",
                                            Market: country.name,
                                        }
                                    )
                                }
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/40"
                            >
                                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-xs font-black tracking-wider text-white dark:bg-white dark:text-slate-950">
                                        {country.code}
                                    </div>

                                    <Globe2 size={19} className="text-slate-300 dark:text-slate-600" />
                                </div>

                                <h3 className="relative mt-6 text-xl font-black">
                                    {country.name}
                                </h3>

                                <p className="relative mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {country.description}
                                </p>

                                <div className="relative mt-5 flex flex-wrap gap-2">
                                    {country.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                AI SOURCING
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-2xl dark:border-white/10">
                        <div className="relative grid lg:grid-cols-[1fr_0.9fr]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,.22),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(6,182,212,.14),transparent_30%)]" />

                            <div className="relative p-7 sm:p-10 lg:p-14">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                                    <Sparkles size={14} />
                                    AI-Assisted Sourcing
                                </div>

                                <h2 className="mt-6 max-w-2xl text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                                    You can start with a prompt.
                                </h2>

                                <p className="mt-5 max-w-xl leading-7 text-slate-300">
                                    You do not have to understand procurement language
                                    to begin. Describe what you need naturally and
                                    our sourcing workflow can help turn your request
                                    into a structured procurement requirement.
                                </p>

                                <div className="mt-8 space-y-3">
                                    {[
                                        "“I need 200 laptops for a new office.”",
                                        "“Find reliable networking equipment for a school.”",
                                        "“I need a cheaper alternative to this product.”",
                                        "“We need 50 business desktops with 16GB RAM.”",
                                    ].map((prompt) => (
                                        <button
                                            type="button"
                                            key={prompt}
                                            onClick={() =>
                                                startSupportChat(prompt, {
                                                    Source: "International Sourcing & Procurement",
                                                    Stage: "AI prompt example",
                                                })
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-blue-400/40 hover:bg-white/[0.08]"
                                        >
                                            <Sparkles size={15} className="shrink-0 text-blue-300" />
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative border-t border-white/10 bg-white/[0.025] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
                                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                                            <Sparkles size={19} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-black">Sourcing Assistant</p>
                                            <p className="text-xs text-slate-500">Requirement analysis</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-xl bg-white/5 p-4">
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Your request
                                        </p>

                                        <p className="mt-3 text-sm leading-6 text-slate-300">
                                            “We need computers for 200 employees,
                                            mostly office applications, with a
                                            reasonable budget.”
                                        </p>
                                    </div>

                                    <div className="my-4 flex justify-center">
                                        <ArrowDownIcon size={19} className="text-blue-300" />
                                    </div>

                                    <div className="space-y-2">
                                        {[
                                            "Quantity: 200 units",
                                            "Use case: Office productivity",
                                            "Performance: Business class",
                                            "Budget: To be evaluated",
                                            "Market: International",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-slate-400"
                                            >
                                                <Check size={13} className="text-blue-300" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to try the AI sourcing assistant. Please help me structure my international sourcing requirement.",
                                            {
                                                Source: "International Sourcing & Procurement",
                                                Stage: "AI assistant trial",
                                            }
                                        )
                                    }
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-500"
                                >
                                    Try the sourcing assistant
                                    <Sparkles size={14} />
                                </button>

                                <p className="mt-4 text-xs leading-5 text-slate-500">
                                    AI can assist with requirement structuring and
                                    research workflows; supplier verification and
                                    purchasing decisions still require appropriate
                                    human review.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                HOW IT WORKS
            ========================================================== */}
            <section
                id="how-it-works"
                className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/[0.06] dark:bg-[#0b111b] lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                        <div>
                            <SectionLabel>How It Works</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                                From “I need this” to a structured procurement process.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                We make international sourcing easier to understand,
                                easier to compare and easier to manage.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {sourcingSteps.map((step) => (
                                <button
                                    type="button"
                                    key={step.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to understand the sourcing step: "${step.title}" — ${step.description}`,
                                            {
                                                Source: "International Sourcing & Procurement",
                                                Step: `${step.number} — ${step.title}`,
                                            }
                                        )
                                    }
                                    className="group flex w-full gap-5 rounded-2xl border border-slate-200 bg-white p-5 text-left transition duration-300 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/40"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white dark:bg-white dark:text-slate-950">
                                        {step.number}
                                    </div>

                                    <div>
                                        <h3 className="font-black">{step.title}</h3>

                                        <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        size={17}
                                        className="ml-auto shrink-0 text-slate-300 transition group-hover:text-blue-500 dark:text-slate-700"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                BULK PROCUREMENT
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <SectionLabel>Bulk & Enterprise Sourcing</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                                Buying 10, 50, 200 or more units?
                                <span className="text-blue-600 dark:text-blue-400">
                                    {" "}Let's structure it properly.
                                </span>
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                Large procurement is not simply a larger version of
                                ordinary shopping. Quantity introduces additional
                                considerations around consistency, supplier capacity,
                                model availability, pricing tiers, warranties,
                                packaging, delivery schedules and documentation.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Define one consistent specification",
                                    "Compare supplier capacity",
                                    "Evaluate quantity-based pricing",
                                    "Review warranty and support terms",
                                    "Plan delivery and fulfillment",
                                    "Maintain procurement documentation",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss bulk sourcing — specifically: ${item}.`,
                                                {
                                                    Source: "International Sourcing & Procurement",
                                                    "Bulk topic": item,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 text-left text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50/50 dark:text-slate-300 dark:hover:border-blue-500/20 dark:hover:bg-blue-500/[0.05]"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Check size={13} />
                                        </div>
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss bulk / enterprise international sourcing. Here's my requirement:",
                                        {
                                            Source: "International Sourcing & Procurement",
                                            Stage: "Bulk procurement enquiry",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                            >
                                Discuss bulk sourcing
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-white/[0.035]">
                                <div className="rounded-2xl bg-slate-950 p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                                                Procurement Overview
                                            </p>
                                            <h3 className="mt-2 text-lg font-black">
                                                Example requirement
                                            </h3>
                                        </div>

                                        <ShoppingCart size={22} className="text-blue-300" />
                                    </div>

                                    <div className="mt-7 space-y-3">
                                        {[
                                            ["Quantity", "200 units"],
                                            ["Product", "Business laptops"],
                                            ["Memory", "8GB / 16GB"],
                                            ["Storage", "256GB / 512GB SSD"],
                                            ["Warranty", "Business warranty preferred"],
                                            ["Destination", "Nigeria"],
                                        ].map(([label, value]) => (
                                            <div
                                                key={label}
                                                className="flex items-center justify-between gap-5 border-b border-white/10 pb-3 last:border-0 last:pb-0"
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
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {[
                                        [BarChart3, "Compare"],
                                        [ShieldCheck, "Verify"],
                                        [Truck, "Deliver"],
                                    ].map(([Icon, label]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I'd like to discuss the bulk procurement stage: ${label}.`,
                                                    {
                                                        Source: "International Sourcing & Procurement",
                                                        "Bulk stage": label,
                                                    }
                                                )
                                            }
                                            className="rounded-xl bg-slate-100 p-4 text-left transition hover:bg-blue-50 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
                                        >
                                            <Icon size={18} className="text-blue-500" />
                                            <p className="mt-3 text-xs font-black">{label}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                USE CASES
            ========================================================== */}
            <section className="border-y border-slate-200/70 bg-slate-50 py-20 dark:border-white/[0.06] dark:bg-[#090e17] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <SectionLabel>Built For Different Organizations</SectionLabel>

                        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                            International sourcing for real business requirements.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                            From an individual business requirement to a large
                            institutional procurement project, our sourcing workflow
                            can be adapted to the scale of the requirement.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {useCases.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss international sourcing for: ${item.title}. ${item.text}`,
                                            {
                                                Source: "International Sourcing & Procurement",
                                                "Use case": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon size={21} />
                                    </div>

                                    <h3 className="mt-5 font-black">{item.title}</h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                SOURCING VS ORDINARY SHOPPING
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.035] sm:p-10">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.07]">
                                <ShoppingCart size={22} />
                            </div>

                            <h2 className="mt-6 text-2xl font-black">
                                Ordinary product search
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                You search, compare dozens of listings, try to
                                understand specifications, contact sellers and hope
                                the product and supplier are what they claim.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Many disconnected listings",
                                    "Hard to compare supplier quality",
                                    "Specifications may differ",
                                    "Limited procurement structure",
                                    "You handle most of the research",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                                    >
                                        <X size={17} className="mt-0.5 shrink-0 text-slate-400" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-blue-200 bg-blue-50/70 p-7 shadow-sm dark:border-blue-500/20 dark:bg-blue-500/[0.06] sm:p-10">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <Workflow size={22} />
                            </div>

                            <h2 className="mt-6 text-2xl font-black">
                                Structured sourcing
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                Start with your requirement, then move through a
                                structured process designed to help you understand
                                your options before purchasing.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Requirement-first approach",
                                    "Supplier discovery",
                                    "Verification and diligence",
                                    "Structured comparison",
                                    "Procurement coordination",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200"
                                    >
                                        <Check size={17} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to use your structured sourcing process instead of doing an ordinary product search. Here's my requirement:",
                                        {
                                            Source: "International Sourcing & Procurement",
                                            Stage: "Structured sourcing enquiry",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                            >
                                Start structured sourcing
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                REQUEST FORM
            ========================================================== */}
            <section
                id="request-sourcing"
                className="relative border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/[0.06] dark:bg-[#0b111b] lg:py-28"
            >
                <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,.12),transparent_65%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <SectionLabel>Start a Sourcing Request</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                                Tell us what you need.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                You don't need a perfect procurement brief. Give us
                                whatever information you have and we can help turn it
                                into a more useful sourcing requirement.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    {
                                        icon: Languages,
                                        title: "Any language of business",
                                        text: "Describe your requirement naturally.",
                                    },
                                    {
                                        icon: Search,
                                        title: "Any starting point",
                                        text: "Product, image, model or business need.",
                                    },
                                    {
                                        icon: Users,
                                        title: "Any organization size",
                                        text: "Individual, SME, enterprise or institution.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                <Icon size={18} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-black">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-white/[0.035] sm:p-8"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        What do you need?
                                    </label>

                                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                                        {[
                                            "Product Sourcing",
                                            "Bulk Procurement",
                                            "Supplier Search",
                                        ].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setRequestType(type)}
                                                className={`rounded-xl border px-4 py-3 text-left text-xs font-bold transition ${requestType === type
                                                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-500/10 dark:text-blue-300"
                                                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="sourcing-description"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        Describe your requirement
                                    </label>

                                    <textarea
                                        id="sourcing-description"
                                        required
                                        rows={6}
                                        value={requirement}
                                        onChange={(e) => setRequirement(e.target.value)}
                                        placeholder="Example: We need 200 HP business laptops for an office. We want reliable suppliers, competitive pricing and warranty coverage."
                                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-600"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        Quantity
                                    </label>

                                    <input
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="e.g. 200"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="origin"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        Preferred market
                                    </label>

                                    <select
                                        id="origin"
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#101722] dark:text-white"
                                    >
                                        <option>Any suitable market</option>
                                        <option>China</option>
                                        <option>Canada</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>UAE</option>
                                        <option>Europe</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="budget"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        Estimated budget
                                    </label>

                                    <input
                                        id="budget"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        placeholder="Optional"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="timeline"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        Required timeline
                                    </label>

                                    <input
                                        id="timeline"
                                        value={timeline}
                                        onChange={(e) => setTimeline(e.target.value)}
                                        placeholder="e.g. ASAP / 30 days"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        placeholder="Your name"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                {submitted ? "Request received" : "Submit Sourcing Request"}
                                {submitted ? (
                                    <Check size={17} />
                                ) : (
                                    <ArrowRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                )}
                            </button>

                            {submitted && (
                                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-xs font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                    Your request has been sent to AB AI.
                                    Redirecting you to continue the conversation…
                                </div>
                            )}

                            <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                                No obligation. Your request can be reviewed before
                                any procurement commitment is made.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* =========================================================
                LOGISTICS
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="order-2 lg:order-1">
                            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-white/[0.035]">
                                <div className="rounded-2xl bg-slate-950 p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                                                Fulfillment Planning
                                            </p>

                                            <h3 className="mt-2 text-xl font-black">
                                                From supplier to destination
                                            </h3>
                                        </div>

                                        <Plane size={22} className="text-blue-300" />
                                    </div>

                                    <div className="relative mt-10">
                                        <div className="absolute left-6 right-6 top-5 h-px bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

                                        <div className="relative grid grid-cols-4 gap-2">
                                            {[
                                                ["01", "Supplier"],
                                                ["02", "Inspection"],
                                                ["03", "Freight"],
                                                ["04", "Destination"],
                                            ].map(([num, label]) => (
                                                <button
                                                    type="button"
                                                    key={num}
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I'd like to understand the logistics stage: ${label}.`,
                                                            {
                                                                Source: "International Sourcing & Procurement",
                                                                "Logistics stage": label,
                                                            }
                                                        )
                                                    }
                                                    className="text-center"
                                                >
                                                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-slate-900 text-xs font-black text-blue-300">
                                                        {num}
                                                    </div>

                                                    <p className="mt-3 text-[10px] font-bold text-slate-400">
                                                        {label}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-9 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                            <Clock3 size={18} className="text-cyan-300" />
                                            <p className="mt-2 text-xs font-bold">Lead time</p>
                                        </div>

                                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                            <MapPin size={18} className="text-cyan-300" />
                                            <p className="mt-2 text-xs font-bold">Destination</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <SectionLabel>Logistics Coordination</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                                Procurement doesn't end when you find the supplier.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                                International procurement also requires thinking
                                about packaging, lead times, shipping methods,
                                documentation, destination, customs considerations
                                and final delivery.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Shipping method",
                                    "Packaging requirements",
                                    "Lead-time planning",
                                    "Destination coordination",
                                    "Documentation",
                                    "Freight coordination",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss logistics: ${item}.`,
                                                {
                                                    Source: "International Sourcing & Procurement",
                                                    "Logistics topic": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-500/40"
                                    >
                                        <Truck size={16} className="text-blue-500" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                VERIFICATION
            ========================================================== */}
            <section className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/[0.06] dark:bg-[#0b111b] lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>Verification First</SectionLabel>

                        <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                            A cheap quote is not automatically a good deal.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                            International procurement should consider the complete
                            picture. A supplier offering a low unit price may have
                            different specifications, warranty conditions, minimum
                            quantities, lead times or shipping costs.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: BadgeCheck,
                                title: "Supplier identity",
                                text: "Review available business and supplier information.",
                            },
                            {
                                icon: FileCheck2,
                                title: "Product details",
                                text: "Check models, specifications and configurations.",
                            },
                            {
                                icon: CircleDollarSign,
                                title: "True cost",
                                text: "Look beyond the headline unit price.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Risk review",
                                text: "Identify important procurement risks before commitment.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss verification: ${item.title} — ${item.text}`,
                                            {
                                                Source: "International Sourcing & Procurement",
                                                "Verification topic": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/40"
                                >
                                    <Icon size={22} className="text-blue-500" />

                                    <h3 className="mt-5 font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================
                WHY AB
            ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <SectionLabel>Why AB Technologies</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                                One partner across the technology procurement journey.
                            </h2>

                            <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
                                We are not limited to sourcing a box. Our broader
                                technology capability allows us to understand the
                                relationship between equipment, software, networking,
                                security, cloud services, deployment and ongoing IT
                                support.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Cpu,
                                    title: "Technology knowledge",
                                    text: "We understand the technology behind the products being sourced.",
                                },
                                {
                                    icon: Workflow,
                                    title: "End-to-end thinking",
                                    text: "Procurement can connect with deployment and support.",
                                },
                                {
                                    icon: BarChart3,
                                    title: "Commercial focus",
                                    text: "We consider value, not just the lowest listed price.",
                                },
                                {
                                    icon: Headphones,
                                    title: "Ongoing support",
                                    text: "The relationship can continue beyond procurement.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to know more about ${item.title}: ${item.text}`,
                                                {
                                                    Source: "International Sourcing & Procurement",
                                                    "Why AB": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-500/40"
                                    >
                                        <Icon size={21} className="text-blue-500" />

                                        <h3 className="mt-5 font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                FAQ
            ========================================================== */}
            <section className="border-y border-slate-200/70 bg-white py-20 dark:border-white/[0.06] dark:bg-[#090e17] lg:py-28">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <SectionLabel>Frequently Asked Questions</SectionLabel>

                        <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                            Questions about international sourcing?
                        </h2>
                    </div>

                    <div className="mt-10 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border transition ${isOpen
                                        ? "border-blue-300 bg-blue-50/50 dark:border-blue-500/30 dark:bg-blue-500/[0.05]"
                                        : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.025]"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >
                                        <span className="text-sm font-black sm:text-base">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={19}
                                            className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-5 pb-5">
                                                <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                    {faq.answer}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `I have a question about: "${faq.question}"`,
                                                            {
                                                                Source: "International Sourcing & Procurement",
                                                                FAQ: faq.question,
                                                            }
                                                        )
                                                    }
                                                    className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:gap-3 dark:text-blue-400"
                                                >
                                                    Discuss this with AB AI
                                                    <ArrowRight size={13} />
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

            {/* =========================================================
                FINAL CTA
            ========================================================== */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.16),transparent_38%),linear-gradient(180deg,#f8fafc,#eef5ff)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.18),transparent_38%),linear-gradient(180deg,#070b12,#0a101a)]" />

                <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl dark:bg-white dark:text-slate-950">
                        <Globe2 size={25} />
                    </div>

                    <h2 className="mt-7 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        Your next procurement project can start here.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                        Whether you already know exactly what you want or only know
                        the result you need, AB Technologies can help you structure
                        the requirement and explore a practical sourcing path.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <PrimaryButton
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start an international sourcing request. Here's what I need:",
                                    {
                                        Source: "International Sourcing & Procurement",
                                        Stage: "Final CTA — start request",
                                    }
                                )
                            }
                        >
                            Start a Sourcing Request
                        </PrimaryButton>

                        <SecondaryButton
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to understand your international sourcing process in more detail.",
                                    {
                                        Source: "International Sourcing & Procurement",
                                        Stage: "Final CTA — process",
                                    }
                                )
                            }
                        >
                            Understand Our Process
                        </SecondaryButton>
                    </div>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                            <Check size={14} className="text-blue-500" />
                            Requirement-first
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Check size={14} className="text-blue-500" />
                            Supplier-focused
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Check size={14} className="text-blue-500" />
                            Transparent process
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Check size={14} className="text-blue-500" />
                            Human review
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* =============================================================
   SMALL ICON COMPONENTS
   Kept local so this page does not require additional packages.
============================================================= */

function WifiIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 9.5a11 11 0 0 1 14 0" />
            <path d="M8 13a6.5 6.5 0 0 1 8 0" />
            <path d="M11 16.5a2.5 2.5 0 0 1 2 0" />
            <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function MonitorIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="4" width="18" height="13" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
        </svg>
    );
}

function PackageIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
            <path d="m4 7.5 8 4.5 8-4.5" />
            <path d="M12 12v9" />
        </svg>
    );
}

function ServerIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="4" y="3" width="16" height="7" rx="1.5" />
            <rect x="4" y="14" width="16" height="7" rx="1.5" />
            <path d="M8 6.5h.01" />
            <path d="M8 17.5h.01" />
            <path d="M12 6.5h5" />
            <path d="M12 17.5h5" />
        </svg>
    );
}

function PrinterIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9V3h12v6" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 14h12v7H6z" />
            <path d="M18 12h.01" />
        </svg>
    );
}

function CameraIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
            <circle cx="12" cy="13" r="3.5" />
        </svg>
    );
}

function ArrowDownIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 4v14" />
            <path d="m7 13 5 5 5-5" />
        </svg>
    );
}