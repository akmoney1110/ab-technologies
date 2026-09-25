import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../SEO";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Boxes,
    Building2,
    Calculator,
    CheckCircle2,
    ChevronRight,
    ClipboardCheck,
    Cloud,
    Code2,
    Cpu,
    Database,
    Factory,
    FileCheck2,
    Headphones,
    HeartPulse,
    Laptop,
    Layers3,
    Lightbulb,
    Lock,
    MessageSquare,
    Monitor,
    Network,
    PenTool,
    Plus,
    Printer,
    Quote,
    RefreshCw,
    Search,
    Server,
    Shield,
    ShoppingCart,
    Sparkles,
    Store,
    Tablets,
    Target,
    Truck,
    Users,
    Wrench,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";


/* =========================================================
   CONSTANTS
========================================================= */

const SUPPORT_SOURCE = "Hardware & Device Procurement";
<SEO
    title="IT Hardware Procurement & Technology Supply"
    description="AB Technologies provides professional IT hardware procurement, technology sourcing, equipment supply and deployment solutions for businesses and organizations."
    path="/services/hardware-procurement"
    schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "IT Hardware Procurement",
        "provider": {
            "@type": "Organization",
            "name": "AB Technologies"
        },
        "url": "https://abtechnologies.com/services/hardware-procurement",
        "description": "IT hardware procurement, technology sourcing, equipment supply and deployment services."
    }}
/>

/* =========================================================
   DATA
========================================================= */

const hardwareCategories = [
    {
        title: "Laptops",
        description:
            "Business, professional, education and high-performance laptops sourced around your workload, budget and deployment requirements.",
        icon: Laptop,
        count: "Business • Professional • Performance",
        tags: ["HP", "Dell", "Lenovo", "Apple"],
    },
    {
        title: "Desktops",
        description:
            "Reliable desktop systems for offices, institutions, workstations, reception areas, laboratories and everyday productivity.",
        icon: Monitor,
        count: "Office • Workstation • Education",
        tags: ["Business", "All-in-One", "Tower", "Mini PC"],
    },
    {
        title: "Workstations",
        description:
            "Higher-performance systems for engineering, architecture, development, design, data workloads, rendering and technical applications.",
        icon: Cpu,
        count: "Engineering • Design • AI",
        tags: ["GPU", "CAD", "Rendering", "Development"],
    },
    {
        title: "Servers",
        description:
            "Server hardware for business applications, virtualization, storage, databases, internal systems and infrastructure projects.",
        icon: Server,
        count: "Rack • Tower • Storage",
        tags: ["Dell", "HPE", "Lenovo", "Custom"],
    },
    {
        title: "Monitors & Displays",
        description:
            "Professional displays for office work, design, trading, control rooms, reception areas, conference rooms and specialized environments.",
        icon: Monitor,
        count: "FHD • QHD • 4K • Professional",
        tags: ["Business", "UltraWide", "4K", "Large Format"],
    },
    {
        title: "Networking",
        description:
            "Switches, routers, wireless access points, firewalls and network equipment for offices, campuses and enterprise environments.",
        icon: Network,
        count: "LAN • Wi-Fi • Security",
        tags: ["Switches", "Routers", "Wi-Fi", "Firewalls"],
    },
    {
        title: "Printers & Scanners",
        description:
            "Business printing, scanning and document management equipment selected for expected volume and operational requirements.",
        icon: Printer,
        count: "Laser • Inkjet • MFP",
        tags: ["Printers", "Scanners", "MFP", "Consumables"],
    },
    {
        title: "Storage & Backup",
        description:
            "External storage, NAS, backup devices and storage infrastructure designed around capacity, performance and continuity requirements.",
        icon: Database,
        count: "SSD • NAS • Backup",
        tags: ["SSD", "NAS", "Backup", "Storage"],
    },
    {
        title: "Power & UPS",
        description:
            "UPS systems, power protection and supporting equipment for computers, networking devices, servers and critical technology.",
        icon: Zap,
        count: "UPS • Protection • Backup",
        tags: ["UPS", "Power", "Protection", "Backup"],
    },
    {
        title: "Security & CCTV",
        description:
            "Cameras, recording systems, access control and related equipment for offices, facilities, campuses and commercial environments.",
        icon: Shield,
        count: "CCTV • Access • Monitoring",
        tags: ["CCTV", "NVR", "Access", "Monitoring"],
    },
    {
        title: "Tablets & Mobile Devices",
        description:
            "Tablets and mobile devices for field operations, education, sales teams, healthcare, inventory and mobile workflows.",
        icon: Tablets,
        count: "Tablets • Mobile • Field",
        tags: ["Android", "iPad", "Business", "Field"],
    },
    {
        title: "Accessories",
        description:
            "Keyboards, mice, bags, docks, adapters, headsets, webcams, cables and other equipment needed for complete deployments.",
        icon: Boxes,
        count: "Workplace • Connectivity • Setup",
        tags: ["Docks", "Headsets", "Bags", "Adapters"],
    },
];

const procurementSteps = [
    {
        number: "01",
        title: "Tell us what you need",
        description:
            "Describe your requirement naturally. You don't need to know the exact model number or specification.",
        icon: MessageSquare,
    },
    {
        number: "02",
        title: "We understand the requirement",
        description:
            "Our procurement process translates your business need into practical specifications, quantities and deployment requirements.",
        icon: Target,
    },
    {
        number: "03",
        title: "We source suitable options",
        description:
            "We identify suitable products based on availability, specifications, budget, warranty and intended use.",
        icon: Search,
    },
    {
        number: "04",
        title: "You review the options",
        description:
            "Receive a clear procurement proposal with recommended equipment, alternatives and relevant commercial details.",
        icon: FileCheck2,
    },
    {
        number: "05",
        title: "We coordinate procurement",
        description:
            "Once approved, we coordinate sourcing, documentation, logistics and the next stages of your order.",
        icon: ShoppingCart,
    },
    {
        number: "06",
        title: "Delivery & deployment",
        description:
            "Where requested, we can assist with configuration, deployment, installation and technology setup.",
        icon: Truck,
    },
];

const industries = [
    {
        title: "Corporate Offices",
        description:
            "Equip new offices, expand existing teams or standardize devices across departments.",
        icon: Building2,
    },
    {
        title: "Education",
        description:
            "Source equipment for schools, universities, training centers, laboratories and digital classrooms.",
        icon: Layers3,
    },
    {
        title: "Healthcare",
        description:
            "Support clinical, administrative and operational environments with appropriate technology equipment.",
        icon: HeartPulse,
    },
    {
        title: "Retail",
        description:
            "Technology for stores, supermarkets, point-of-sale environments, inventory and operations.",
        icon: Store,
    },
    {
        title: "Manufacturing",
        description:
            "Source equipment for administration, production support, monitoring and operational technology environments.",
        icon: Factory,
    },
    {
        title: "Professional Services",
        description:
            "Equip law firms, accounting firms, consultancies, agencies and other professional teams.",
        icon: PenTool,
    },
];

const procurementScenarios = [
    {
        title: "Starting from scratch",
        description:
            "Opening a new office, school, branch or facility? We can help map the technology requirements before you start purchasing.",
        icon: Sparkles,
    },
    {
        title: "Bulk device deployment",
        description:
            "Need 10, 20, 50, 100, 200 or more devices? We can structure the requirement for bulk procurement.",
        icon: Boxes,
    },
    {
        title: "Replacing old equipment",
        description:
            "Modernize your organization's existing devices while considering compatibility, user roles and budget.",
        icon: RefreshCw,
    },
    {
        title: "Standardizing devices",
        description:
            "Create consistent hardware specifications across departments to simplify support, maintenance and replacement.",
        icon: ClipboardCheck,
    },
];

const faqs = [
    {
        question: "Can you help if I don't know the exact model I need?",
        answer:
            "Yes. In fact, that is one of the main reasons to use our procurement service. Tell us what the equipment will be used for, how many you need, your preferred budget and any known requirements. We can help translate that into practical specifications and suitable options.",
    },
    {
        question: "Can you handle bulk orders?",
        answer:
            "Yes. Our procurement model is designed to support individual purchases as well as corporate, institutional and bulk requirements. For larger quantities, we can structure the request around specifications, availability, warranty, logistics and deployment.",
    },
    {
        question: "Can you source specific brands?",
        answer:
            "Yes. You can request a specific manufacturer or ask us to recommend suitable alternatives. Depending on the requirement, we can work around brands such as HP, Dell, Lenovo, Apple and other appropriate manufacturers.",
    },
    {
        question: "Can I request 200 or more computers?",
        answer:
            "Yes. Large requirements can be submitted through the AI-powered quote and procurement workflow. For large deployments, we recommend providing your location, quantity, intended use, preferred specifications, timeline and budget range.",
    },
    {
        question: "Can you recommend cheaper alternatives?",
        answer:
            "Yes. We can present alternatives where appropriate. The goal is not simply to find the cheapest device, but to find equipment that provides a sensible balance between price, performance, reliability, warranty and intended use.",
    },
    {
        question: "Do you only sell hardware?",
        answer:
            "No. Hardware procurement can be combined with software, networking, cloud services, security, installation, configuration, training, support and other technology solutions.",
    },
    {
        question: "Can you help set up the devices after delivery?",
        answer:
            "Where requested and available for the project, deployment services can include configuration, software setup, user preparation, network integration, asset organization and other implementation activities.",
    },
    {
        question: "Can you procure equipment that isn't shown on the website?",
        answer:
            "Yes. The website catalog is not intended to represent every product that can potentially be sourced. If you cannot find what you need, submit a procurement request and describe the requirement.",
    },
];

const popularRequests = [
    "10 business laptops",
    "50 laptops for a new office",
    "200 HP laptops",
    "20 computers for a school",
    "A complete computer laboratory",
    "Office networking equipment",
    "Server and storage setup",
    "CCTV for a business",
];


/* =========================================================
   SHARED HELPERS
========================================================= */

function buildProcurementMessage(form) {
    return [
        "I'd like to submit a hardware procurement request.",
        "",
        "PROCUREMENT REQUIREMENT",
        `Category: ${form.category || "Not specified"}`,
        `Quantity: ${form.quantity || "Not specified"}`,
        `Budget: ${form.budget || "Not specified"}`,
        `Primary requirement / intended use: ${form.requirement || "Not specified"
        }`,
        "",
        "PROJECT DETAILS",
        `Delivery location: ${form.location || "Not specified"}`,
        `Timeline: ${form.timeline || "Not specified"}`,
        "",
        "CONTACT DETAILS",
        `Name: ${form.name || "Not specified"}`,
        `Company / organization: ${form.company || "Not specified"}`,
        `Email: ${form.email || "Not specified"}`,
        `Phone: ${form.phone || "Not specified"}`,
        "",
        "Please help me review this requirement, identify any missing information, recommend suitable procurement options, and guide me through the next step.",
    ].join("\n");
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionEyebrow({ icon: Icon = Sparkles, children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
            <Icon className="h-3.5 w-3.5 text-blue-500" />
            <span>{children}</span>
        </div>
    );
}

function PrimaryButton({
    children,
    onClick,
    type = "button",
    className = "",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50 dark:focus:ring-offset-slate-950 ${className}`}
        >
            {children}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
    );
}

function SecondaryButton({ children, onClick, className = "" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-500/50 dark:hover:text-blue-300 dark:focus:ring-offset-slate-950 ${className}`}
        >
            {children}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
    );
}

function SoftPill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
            {children}
        </span>
    );
}

function GlassCard({ children, className = "" }) {
    return (
        <div
            className={`rounded-2xl border border-slate-200/70 bg-white/75 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.3)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.035] ${className}`}
        >
            {children}
        </div>
    );
}


/* =========================================================
   HERO
========================================================= */

function Hero({ onRequest }) {
    const [prompt, setPrompt] = useState("");

    const submitPrompt = () => {
        const cleanPrompt = prompt.trim();

        if (!cleanPrompt) return;

        onRequest(
            `I have a hardware procurement requirement: ${cleanPrompt}\n\nPlease help me understand the appropriate specifications, suitable options, estimated procurement considerations, and what information you need from me to proceed.`,
            {
                Source: SUPPORT_SOURCE,
                "Request type": "AI procurement request",
                Stage: "Initial procurement enquiry",
                Requirement: cleanPrompt,
            }
        );
    };

    const usePopularRequest = (request) => {
        setPrompt(request);
    };

    return (
        <section className="relative mt-25 overflow-hidden border-b border-slate-200/60 dark:border-white/[0.06]">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.12),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.12),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(79,70,229,0.13),transparent_30%)]" />

            <div className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-30 dark:[background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

            <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
                <div>
                    <SectionEyebrow icon={Boxes}>
                        Hardware & Device Procurement
                    </SectionEyebrow>

                    <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                        Source the right
                        <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                            equipment.
                        </span>
                        Without the guesswork.
                    </h1>

                    <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                        From a single laptop to hundreds of devices, AB Technologies
                        helps businesses, institutions and organizations identify,
                        source and deploy the hardware they need — with procurement
                        guidance built around the actual requirement.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2.5">
                        <SoftPill>Individual & Bulk</SoftPill>
                        <SoftPill>Corporate Procurement</SoftPill>
                        <SoftPill>Institutional Supply</SoftPill>
                        <SoftPill>Deployment Support</SoftPill>
                    </div>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <PrimaryButton
                            onClick={() =>
                                onRequest(
                                    "I'd like to discuss a hardware procurement requirement for my organization.",
                                    {
                                        Source: SUPPORT_SOURCE,
                                        "Request type": "General procurement enquiry",
                                        Stage: "Initial conversation",
                                    }
                                )
                            }
                        >
                            Request a Procurement Quote
                        </PrimaryButton>

                        <SecondaryButton
                            onClick={() =>
                                document
                                    .getElementById("categories")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Explore Hardware
                        </SecondaryButton>
                    </div>

                    <div className="mt-10 grid max-w-2xl grid-cols-2 gap-5 sm:grid-cols-4">
                        {[
                            ["1+", "Device quantities"],
                            ["10+", "Bulk requests"],
                            ["200+", "Large deployments"],
                            ["A–Z", "Technology sourcing"],
                        ].map(([value, label]) => (
                            <div key={label}>
                                <div className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                                    {value}
                                </div>

                                <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-indigo-500/15 blur-2xl" />

                    <GlassCard className="relative overflow-hidden p-5 sm:p-6">
                        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                        <Sparkles className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <div className="text-sm font-black text-slate-950 dark:text-white">
                                            AI Procurement Assistant
                                        </div>

                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            Start with what you know.
                                        </div>
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Ready
                                </span>
                            </div>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-900/70">
                                <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                                    Describe your requirement
                                </label>

                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={5}
                                    placeholder='Example: "I need 50 laptops for an accounting team. They should be reliable, have at least 16GB RAM and 512GB SSD, and stay within our budget."'
                                    className="mt-3 w-full resize-none border-0 bg-transparent text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                                />

                                <div className="mt-3 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-400">
                                        No model number required.
                                    </span>

                                    <button
                                        type="button"
                                        disabled={!prompt.trim()}
                                        onClick={submitPrompt}
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Send to AB AI
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                                    Try a request
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {popularRequests.slice(0, 4).map((request) => (
                                        <button
                                            key={request}
                                            type="button"
                                            onClick={() => usePopularRequest(request)}
                                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:text-blue-300"
                                        >
                                            {request}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                        {[
                            [Shield, "Verified sourcing"],
                            [Quote, "Quote workflow"],
                            [Truck, "Delivery support"],
                        ].map(([Icon, label]) => (
                            <div
                                key={label}
                                className="rounded-xl border border-slate-200/70 bg-white/60 p-3 text-center backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]"
                            >
                                <Icon className="mx-auto h-4 w-4 text-blue-500" />

                                <div className="mt-2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   TRUST STRIP
========================================================= */

function TrustStrip() {
    return (
        <section className="border-b border-slate-200/70 bg-slate-50/70 dark:border-white/[0.06] dark:bg-slate-900/50">
            <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                {[
                    {
                        icon: BadgeCheck,
                        title: "Requirement-led",
                        description: "We start with what you actually need.",
                    },
                    {
                        icon: Search,
                        title: "Sourcing support",
                        description: "Suitable options based on the requirement.",
                    },
                    {
                        icon: FileCheck2,
                        title: "Clear procurement",
                        description: "Structured information before you commit.",
                    },
                    {
                        icon: Headphones,
                        title: "Human support",
                        description: "Complex projects can involve our team.",
                    },
                ].map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className="flex gap-3 border-b border-slate-200/70 py-6 last:border-b-0 md:px-5 md:first:pl-0 md:last:pr-0 lg:border-b-0 lg:border-r lg:first:border-l lg:last:border-r-0 dark:border-white/[0.06]"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-300">
                            <Icon className="h-5 w-5" />
                        </div>

                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">
                                {title}
                            </div>

                            <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                {description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


/* =========================================================
   PROCUREMENT OVERVIEW
========================================================= */

function ProcurementOverview({ onRequest }) {
    return (
        <section
            id="procurement"
            className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28"
        >
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                    <div>
                        <SectionEyebrow icon={ShoppingCart}>
                            More than buying a device
                        </SectionEyebrow>

                        <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                            Procurement built around the{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                requirement.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                            Hardware procurement is rarely just about finding a
                            product. The right device depends on workload,
                            quantity, compatibility, users, environment, budget,
                            warranty and the wider technology setup.
                        </p>

                        <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                            We help you approach the purchase as a technology
                            requirement — whether you need one device or a complete
                            organizational deployment.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <PrimaryButton
                                onClick={() =>
                                    onRequest(
                                        "I'd like to start a hardware procurement request. Please help me define the right specifications, quantities, budget considerations and next steps.",
                                        {
                                            Source: SUPPORT_SOURCE,
                                            "Request type": "Procurement request",
                                            Stage: "Requirement definition",
                                        }
                                    )
                                }
                            >
                                Start a Procurement Request
                            </PrimaryButton>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                icon: Target,
                                title: "Right specification",
                                description:
                                    "Match hardware specifications to the actual workload instead of buying based on marketing labels alone.",
                            },
                            {
                                icon: BarChart3,
                                title: "Budget awareness",
                                description:
                                    "Balance price, performance, lifecycle and the total equipment requirement.",
                            },
                            {
                                icon: Boxes,
                                title: "Quantity planning",
                                description:
                                    "Structure requirements from single devices to large organizational deployments.",
                            },
                            {
                                icon: Shield,
                                title: "Quality considerations",
                                description:
                                    "Consider manufacturer, warranty, configuration, compatibility and support requirements.",
                            },
                            {
                                icon: Network,
                                title: "Infrastructure fit",
                                description:
                                    "Account for networking, power, peripherals, software and other connected requirements.",
                            },
                            {
                                icon: Truck,
                                title: "Delivery & deployment",
                                description:
                                    "Coordinate the next steps beyond the product itself when your project requires it.",
                            },
                        ].map(({ icon: Icon, title, description }) => (
                            <GlassCard
                                key={title}
                                className="p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300/70 dark:hover:border-blue-500/30"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {description}
                                </p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   HARDWARE CATEGORIES
========================================================= */

function HardwareCategories({ onRequest }) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) return hardwareCategories;

        return hardwareCategories.filter((item) => {
            return (
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        });
    }, [search]);

    return (
        <section
            id="categories"
            className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50/80 py-20 dark:border-white/[0.06] dark:bg-slate-900/40 lg:py-28"
        >
            <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_65%)]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <SectionEyebrow icon={Boxes}>
                            Hardware categories
                        </SectionEyebrow>

                        <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                            Equipment for everyday work and{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                complex environments.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            Explore common categories or tell us what you're
                            trying to accomplish. If you don't see a particular
                            product, you can still request it.
                        </p>
                    </div>

                    <div className="relative w-full lg:max-w-sm">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search hardware categories..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 dark:border-white/[0.08] dark:bg-slate-950/60 dark:hover:border-blue-500/30"
                            >
                                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

                                <div className="relative">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-white/[0.06] dark:text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.13em] text-blue-600 dark:text-blue-400">
                                        {item.count}
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {item.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 dark:bg-white/[0.05] dark:text-slate-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onRequest(
                                                `I'd like to request ${item.title.toLowerCase()} through AB Technologies procurement.`,
                                                {
                                                    Source: SUPPORT_SOURCE,
                                                    "Request type":
                                                        "Category procurement request",
                                                    Category: item.title,
                                                    "Category tags":
                                                        item.tags.join(", "),
                                                }
                                            )
                                        }
                                        className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-300"
                                    >
                                        Request this category
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
                        <Search className="mx-auto h-8 w-8 text-slate-400" />

                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                            Can't find what you're looking for?
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                            The catalog does not represent everything we can
                            source. Submit a request and tell us what you need.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                onRequest(
                                    "I couldn't find the hardware I need in the catalog. I'd like help sourcing a specific item.",
                                    {
                                        Source: SUPPORT_SOURCE,
                                        "Request type": "Unlisted item request",
                                        Search: search,
                                    }
                                )
                            }
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                        >
                            Request an Item
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}


/* =========================================================
   BULK PROCUREMENT
========================================================= */

function BulkProcurement({ onRequest }) {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
            <div className="absolute inset-0 opacity-70">
                <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
                <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />
            </div>

            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:56px_56px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">
                    <div>
                        <SectionEyebrow icon={Boxes}>
                            Bulk & enterprise procurement
                        </SectionEyebrow>

                        <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                            Need{" "}
                            <span className="text-blue-400">10, 50, 200+</span>{" "}
                            devices?
                        </h2>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                            Large technology purchases require more than adding
                            products to a cart. We help structure the requirement,
                            compare appropriate options and coordinate the
                            procurement process around the deployment.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {[
                                "Bulk laptop procurement",
                                "Corporate device rollouts",
                                "School computer laboratories",
                                "Office equipment packages",
                                "Multi-location deployments",
                                "Institutional procurement",
                                "Standardized device fleets",
                                "Replacement programs",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200"
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="mt-9">
                            <button
                                type="button"
                                onClick={() =>
                                    onRequest(
                                        "I'd like to submit a bulk hardware procurement request. We may need 10, 50, 100, 200 or more devices. Please help me structure the requirement and procurement process.",
                                        {
                                            Source: SUPPORT_SOURCE,
                                            "Request type":
                                                "Bulk procurement request",
                                            Stage: "Bulk requirement",
                                            Quantity: "Bulk / to be confirmed",
                                        }
                                    )
                                }
                                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
                            >
                                Start a Bulk Procurement Request
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-3xl" />

                        <div className="relative rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                                        Example requirement
                                    </div>

                                    <h3 className="mt-2 text-xl font-black">
                                        200 Business Laptops
                                    </h3>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                                    <Laptop className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {[
                                    ["Quantity", "200 units"],
                                    ["Primary use", "Business productivity"],
                                    ["Memory", "16GB preferred"],
                                    ["Storage", "512GB preferred"],
                                    ["Operating system", "Windows"],
                                    ["Warranty", "Required"],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between gap-5 border-b border-white/[0.07] pb-3 last:border-0 last:pb-0"
                                    >
                                        <span className="text-xs text-slate-400">
                                            {label}
                                        </span>

                                        <span className="text-right text-sm font-bold text-slate-100">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-400/[0.07] p-4">
                                <div className="flex gap-3">
                                    <Sparkles className="h-5 w-5 shrink-0 text-blue-300" />

                                    <div>
                                        <div className="text-sm font-bold">
                                            Procurement strategy
                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-slate-300">
                                            For a requirement at this scale, we
                                            recommend confirming specification,
                                            availability, warranty, delivery
                                            location and deployment timeline before
                                            finalizing the equipment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   SCENARIOS
========================================================= */

function ProcurementScenarios({ onRequest }) {
    return (
        <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <SectionEyebrow icon={Lightbulb}>
                        Procurement scenarios
                    </SectionEyebrow>

                    <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                        Start with the situation, not the product.
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                        Sometimes you know exactly what to buy. Sometimes you
                        only know what you're trying to accomplish. Both are valid
                        starting points.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-2">
                    {procurementScenarios.map(
                        ({ title, description, icon: Icon }) => (
                            <GlassCard
                                key={title}
                                className="group p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500/30"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-black text-slate-950 dark:text-white">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {description}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onRequest(
                                                    `I'd like help with the "${title}" hardware procurement scenario. ${description}`,
                                                    {
                                                        Source: SUPPORT_SOURCE,
                                                        "Request type":
                                                            "Procurement scenario",
                                                        Scenario: title,
                                                    }
                                                )
                                            }
                                            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400"
                                        >
                                            Start with this
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   INDUSTRIES
========================================================= */

function Industries({ onRequest }) {
    return (
        <section
            id="industries"
            className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50/70 py-20 dark:border-white/[0.06] dark:bg-slate-900/40 lg:py-28"
        >
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionEyebrow icon={Building2}>
                        Built for different environments
                    </SectionEyebrow>

                    <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                        Hardware procurement that understands the{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            context.
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                        A laptop requirement for a developer is different from
                        one for a school, healthcare facility or field team. We
                        help approach equipment decisions around the environment
                        where they will actually be used.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {industries.map(({ title, description, icon: Icon }) => (
                        <button
                            key={title}
                            type="button"
                            onClick={() =>
                                onRequest(
                                    `I'd like to discuss hardware procurement for the ${title.toLowerCase()} environment.`,
                                    {
                                        Source: SUPPORT_SOURCE,
                                        "Request type":
                                            "Industry procurement request",
                                        Industry: title,
                                    }
                                )
                            }
                            className="group rounded-2xl border border-slate-200/80 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/[0.08] dark:bg-slate-950/60 dark:hover:shadow-black/20"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-white/[0.06] dark:text-white">
                                <Icon className="h-5 w-5" />
                            </div>

                            <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
                                {title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                {description}
                            </p>

                            <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                                Discuss this requirement
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   COMPLETE TECHNOLOGY SETUP
========================================================= */

function CompleteTechnologySetup({ onRequest }) {
    const setupItems = [
        {
            icon: Laptop,
            title: "End-user devices",
            text: "Laptops, desktops, workstations and mobile devices.",
        },
        {
            icon: Monitor,
            title: "Displays & peripherals",
            text: "Monitors, docks, keyboards, mice, headsets and accessories.",
        },
        {
            icon: Network,
            title: "Connectivity",
            text: "Switches, Wi-Fi, routers, firewalls and network infrastructure.",
        },
        {
            icon: Server,
            title: "Servers & storage",
            text: "Servers, NAS, storage and backup equipment.",
        },
        {
            icon: Shield,
            title: "Security",
            text: "CCTV, access control and endpoint protection equipment.",
        },
        {
            icon: Zap,
            title: "Power",
            text: "UPS and supporting power-protection requirements.",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                    <div>
                        <SectionEyebrow icon={Layers3}>
                            Beyond the device
                        </SectionEyebrow>

                        <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                            Build the environment, not just the shopping list.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            A successful technology deployment often involves
                            several connected pieces. We can help you think
                            through the wider equipment requirement.
                        </p>

                        <div className="mt-7 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-400/20 dark:bg-blue-400/[0.06]">
                            <div className="flex gap-3">
                                <Lightbulb className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />

                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                                        Starting a new office?
                                    </div>

                                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        Don't start by buying random equipment.
                                        Tell us the size of the organization,
                                        environment and objectives, and we can
                                        help structure the technology requirement.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-7">
                            <PrimaryButton
                                onClick={() =>
                                    onRequest(
                                        "I'm starting a new technology environment and need help building the complete hardware requirement, including end-user devices, networking, infrastructure, security and power.",
                                        {
                                            Source: SUPPORT_SOURCE,
                                            "Request type":
                                                "Complete technology setup",
                                            Stage: "Technology planning",
                                        }
                                    )
                                }
                            >
                                Build My Technology Requirement
                            </PrimaryButton>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {setupItems.map(({ icon: Icon, title, text }, index) => (
                            <div
                                key={title}
                                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/[0.08] dark:bg-white/[0.025]"
                            >
                                <div className="absolute right-0 top-0 text-[70px] font-black leading-none text-slate-200/60 dark:text-white/[0.025]">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="relative">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   PROCESS
========================================================= */

function Process() {
    return (
        <section
            id="process"
            className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50/80 py-20 dark:border-white/[0.06] dark:bg-slate-900/40 lg:py-28"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <SectionEyebrow icon={ClipboardCheck}>
                        How procurement works
                    </SectionEyebrow>

                    <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                        From requirement to delivery.
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                        A structured process helps reduce the uncertainty that
                        often comes with hardware procurement — especially when
                        quantities, specifications or timelines become larger.
                    </p>
                </div>

                <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {procurementSteps.map(
                        ({ number, title, description, icon: Icon }) => (
                            <div
                                key={number}
                                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/[0.08] dark:bg-slate-950/60"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <span className="text-3xl font-black tracking-tight text-slate-200 dark:text-white/[0.08]">
                                        {number}
                                    </span>
                                </div>

                                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {description}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   REQUEST TYPES
========================================================= */

function RequestTypes({ onRequest }) {
    const requests = [
        {
            icon: Laptop,
            title: "Specific product",
            description:
                "Already know the exact device or model you want? Send us the details.",
        },
        {
            icon: Search,
            title: "Product recommendation",
            description:
                "Tell us your workload and budget and let us help narrow down the options.",
        },
        {
            icon: Boxes,
            title: "Bulk procurement",
            description:
                "Need multiple units for employees, students, branches or facilities?",
        },
        {
            icon: Network,
            title: "Complete setup",
            description:
                "Need devices plus networking, power, security or infrastructure?",
        },
        {
            icon: RefreshCw,
            title: "Replacement project",
            description:
                "Replacing an aging fleet? We can help structure the requirement.",
        },
        {
            icon: Calculator,
            title: "Budget planning",
            description:
                "Not sure what your budget should be? Start with the environment and objectives.",
        },
    ];

    return (
        <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionEyebrow icon={Quote}>
                        What can you request?
                    </SectionEyebrow>

                    <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                        You don't have to know the answer before you ask.
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                        Give us as much or as little information as you have.
                        The more we understand about the requirement, the more
                        useful the procurement response can be.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {requests.map(({ icon: Icon, title, description }) => (
                        <button
                            key={title}
                            type="button"
                            onClick={() =>
                                onRequest(
                                    `I'd like help with ${title.toLowerCase()} for a hardware procurement requirement. ${description}`,
                                    {
                                        Source: SUPPORT_SOURCE,
                                        "Request type": title,
                                    }
                                )
                            }
                            className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 text-left transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:bg-white/[0.045]"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-300">
                                <Icon className="h-5 w-5" />
                            </div>

                            <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
                                {title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                {description}
                            </p>
                        </button>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <PrimaryButton
                        onClick={() =>
                            onRequest(
                                "I want to tell AB Technologies what hardware I need and get help defining the procurement requirement.",
                                {
                                    Source: SUPPORT_SOURCE,
                                    "Request type": "General procurement request",
                                }
                            )
                        }
                    >
                        Tell Us What You Need
                    </PrimaryButton>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   TRUST SECTION
========================================================= */

function TrustSection() {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.1),transparent_35%)]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                    <div>
                        <SectionEyebrow icon={Shield}>
                            Procurement with confidence
                        </SectionEyebrow>

                        <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                            We don't believe in selling you a specification you don't need.
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                            Our approach is centered around understanding the
                            requirement first. That means considering the
                            workload, quantity, budget, environment and longer-term
                            needs before making a recommendation.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                icon: BadgeCheck,
                                title: "Requirement first",
                                text: "Start with the business or operational need.",
                            },
                            {
                                icon: FileCheck2,
                                title: "Clear specifications",
                                text: "Make the important specifications understandable.",
                            },
                            {
                                icon: Shield,
                                title: "Warranty awareness",
                                text: "Consider warranty and after-sales requirements.",
                            },
                            {
                                icon: Lock,
                                title: "Responsible handling",
                                text: "Keep procurement information organized and professional.",
                            },
                            {
                                icon: Users,
                                title: "Human review",
                                text: "Complex requirements can involve human procurement support.",
                            },
                            {
                                icon: Headphones,
                                title: "Beyond purchase",
                                text: "Support can continue into setup and implementation.",
                            },
                        ].map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                            >
                                <Icon className="h-5 w-5 text-blue-300" />

                                <h3 className="mt-4 text-sm font-black">
                                    {title}
                                </h3>

                                <p className="mt-2 text-xs leading-5 text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   RELATED SERVICES
========================================================= */

function RelatedServices({ onRequest }) {
    const services = [
        {
            icon: Code2,
            title: "Custom Software",
            description:
                "Need software that doesn't exist? We can design and build applications around your organization.",
        },
        {
            icon: Cloud,
            title: "Cloud & Infrastructure",
            description:
                "Connect your equipment to hosting, cloud, backup and infrastructure services.",
        },
        {
            icon: Shield,
            title: "Security",
            description:
                "Support technology environments with appropriate security solutions and practices.",
        },
        {
            icon: Wrench,
            title: "Deployment & Support",
            description:
                "Go beyond delivery with configuration, installation and ongoing technical support.",
        },
    ];

    return (
        <section className="bg-white py-20 dark:bg-slate-950 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <SectionEyebrow icon={Layers3}>
                            More than hardware
                        </SectionEyebrow>

                        <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                            Connect procurement to the rest of your technology environment.
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            Hardware often works best when it is considered
                            alongside software, infrastructure, security and
                            support.
                        </p>
                    </div>

                    <SecondaryButton
                        onClick={() =>
                            onRequest(
                                "I'd like to discuss a complete technology requirement that may include hardware procurement, software, infrastructure, security and support.",
                                {
                                    Source: SUPPORT_SOURCE,
                                    "Request type":
                                        "Complete technology requirement",
                                }
                            )
                        }
                    >
                        Discuss a Complete Requirement
                    </SecondaryButton>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {services.map(({ icon: Icon, title, description }) => (
                        <button
                            key={title}
                            type="button"
                            onClick={() =>
                                onRequest(
                                    `I'd like to discuss ${title.toLowerCase()} as part of my technology procurement requirement. ${description}`,
                                    {
                                        Source: SUPPORT_SOURCE,
                                        "Request type":
                                            "Related technology service",
                                        Service: title,
                                    }
                                )
                            }
                            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-left transition hover:-translate-y-1 dark:border-white/[0.08] dark:bg-white/[0.025]"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-white/[0.06] dark:text-blue-300">
                                <Icon className="h-5 w-5" />
                            </div>

                            <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
                                {title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                {description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   QUOTE MODAL
========================================================= */

function QuoteModal({
    open,
    onClose,
    onSubmitRequest,
    initialRequest = null,
}) {
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        quantity: "",
        category: "",
        budget: "",
        location: "",
        timeline: "",
        requirement: initialRequest || "",
    });

    if (!open) return null;

    const update = (field, value) => {
        setError("");

        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const continueToNextStep = () => {
        setError("");

        if (step === 1) {
            if (!form.category && !form.requirement.trim()) {
                setError(
                    "Please select a hardware category or describe what you need."
                );
                return;
            }

            if (
                form.quantity &&
                (!Number.isFinite(Number(form.quantity)) ||
                    Number(form.quantity) < 1)
            ) {
                setError("Please enter a valid quantity.");
                return;
            }
        }

        if (step === 2) {
            if (!form.location.trim()) {
                setError("Please provide the delivery location.");
                return;
            }
        }

        setStep((current) => Math.min(current + 1, 3));
    };

    const submit = (e) => {
        e.preventDefault();
        setError("");

        if (!form.name.trim()) {
            setError("Please provide your full name.");
            return;
        }

        if (!form.email.trim()) {
            setError("Please provide your email address.");
            return;
        }

        const message = buildProcurementMessage(form);

        onSubmitRequest(message, {
            Source: SUPPORT_SOURCE,
            "Request type": "Procurement quote",
            Stage: "Qualified procurement request",
            Category: form.category || "Not specified",
            Quantity: form.quantity || "Not specified",
            Budget: form.budget || "Not specified",
            "Delivery location": form.location || "Not specified",
            Timeline: form.timeline || "Not specified",
            Name: form.name || "Not specified",
            Company: form.company || "Not specified",
            Email: form.email || "Not specified",
            Phone: form.phone || "Not specified",
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-5">
            <div className="relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-white shadow-2xl dark:bg-slate-950 sm:rounded-3xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-white/[0.05]"
                    aria-label="Close quote form"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-6 dark:border-white/[0.07] dark:bg-slate-900/60 sm:px-8">
                    <div className="pr-12">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                            <Sparkles className="h-3.5 w-3.5" />
                            AI-assisted procurement request
                        </div>

                        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                            Tell us what you need.
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Give us the information you have. When you submit,
                            your request will be transferred directly into the
                            AB Technologies support workflow.
                        </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                        {[1, 2, 3].map((item) => (
                            <React.Fragment key={item}>
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${step >= item
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-200 text-slate-500 dark:bg-white/[0.08] dark:text-slate-400"
                                        }`}
                                >
                                    {item}
                                </div>

                                {item !== 3 && (
                                    <div
                                        className={`h-px flex-1 ${step > item
                                            ? "bg-blue-600"
                                            : "bg-slate-200 dark:bg-white/[0.08]"
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <form onSubmit={submit} className="p-6 sm:p-8">
                    {step === 1 && (
                        <div>
                            <h3 className="text-lg font-black text-slate-950 dark:text-white">
                                What are you looking for?
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Start with the broad requirement.
                            </p>

                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Hardware category
                                    </label>

                                    <select
                                        value={form.category}
                                        onChange={(e) =>
                                            update("category", e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    >
                                        <option value="">
                                            Select a category
                                        </option>

                                        {hardwareCategories.map((item) => (
                                            <option
                                                key={item.title}
                                                value={item.title}
                                            >
                                                {item.title}
                                            </option>
                                        ))}

                                        <option value="Other">
                                            Other / Not sure
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={form.quantity}
                                        onChange={(e) =>
                                            update("quantity", e.target.value)
                                        }
                                        placeholder="e.g. 20"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Budget range
                                    </label>

                                    <select
                                        value={form.budget}
                                        onChange={(e) =>
                                            update("budget", e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    >
                                        <option value="">
                                            Prefer not to say
                                        </option>

                                        <option>
                                            Under ₦500,000 per unit
                                        </option>

                                        <option>
                                            ₦500,000 – ₦1,000,000
                                        </option>

                                        <option>
                                            ₦1,000,000 – ₦2,000,000
                                        </option>

                                        <option>₦2,000,000+</option>

                                        <option>Project budget</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        What will the equipment be used for?
                                    </label>

                                    <textarea
                                        value={form.requirement}
                                        onChange={(e) =>
                                            update(
                                                "requirement",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        placeholder="Tell us about the users, workload, environment, preferred specifications, brand preferences or anything else you know..."
                                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h3 className="text-lg font-black text-slate-950 dark:text-white">
                                Project details
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                These details help us understand the procurement
                                context.
                            </p>

                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Delivery location
                                    </label>

                                    <input
                                        required
                                        value={form.location}
                                        onChange={(e) =>
                                            update(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                        placeholder="City / State / Country"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Timeline
                                    </label>

                                    <select
                                        value={form.timeline}
                                        onChange={(e) =>
                                            update(
                                                "timeline",
                                                e.target.value
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    >
                                        <option value="">
                                            Select timeline
                                        </option>

                                        <option>As soon as possible</option>
                                        <option>Within 1–2 weeks</option>
                                        <option>Within 1 month</option>
                                        <option>1–3 months</option>
                                        <option>Planning ahead</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-400/20 dark:bg-blue-400/[0.06]">
                                        <div className="flex gap-3">
                                            <Sparkles className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />

                                            <div>
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">
                                                    What happens next?
                                                </div>

                                                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                    After submission, your
                                                    procurement information will
                                                    be passed to AB AI so the
                                                    conversation can continue
                                                    without asking you to repeat
                                                    the details.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h3 className="text-lg font-black text-slate-950 dark:text-white">
                                Your contact details
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Tell us where to send or continue the procurement
                                response.
                            </p>

                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Full name
                                    </label>

                                    <input
                                        required
                                        value={form.name}
                                        onChange={(e) =>
                                            update("name", e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Company / organization
                                    </label>

                                    <input
                                        value={form.company}
                                        onChange={(e) =>
                                            update("company", e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Email
                                    </label>

                                    <input
                                        required
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            update("email", e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Phone
                                    </label>

                                    <input
                                        value={form.phone}
                                        onChange={(e) =>
                                            update("phone", e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/[0.08] dark:bg-white/[0.025]">
                                <Lock className="h-4 w-4 shrink-0 text-slate-500" />

                                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    Your procurement information will be passed
                                    into the AB Technologies support workflow
                                    together with the request context.
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-200 pt-6 dark:border-white/[0.08] sm:flex-row">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setError("");
                                    setStep((current) => current - 1);
                                }}
                                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
                            >
                                Back
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
                            >
                                Cancel
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={continueToNextStep}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                            >
                                Continue
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 dark:bg-white dark:text-slate-950"
                            >
                                Send Procurement Request
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}


/* =========================================================
   FAQ
========================================================= */

function FAQ({ onRequest }) {
    const [active, setActive] = useState(null);

    return (
        <section
            id="faq"
            className="border-t border-slate-200/70 bg-slate-50/80 py-20 dark:border-white/[0.06] dark:bg-slate-900/40 lg:py-28"
        >
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                <div className="text-center">
                    <SectionEyebrow icon={MessageSquare}>
                        Procurement FAQ
                    </SectionEyebrow>

                    <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white">
                        Questions before you source?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                        Here are some of the common questions organizations ask
                        before starting a hardware procurement request.
                    </p>
                </div>

                <div className="mt-12 space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = active === index;

                        return (
                            <div
                                key={faq.question}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-slate-950/60"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActive(isOpen ? null : index)
                                    }
                                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                                >
                                    <span className="text-sm font-bold leading-6 text-slate-900 dark:text-white">
                                        {faq.question}
                                    </span>

                                    {isOpen ? (
                                        <span className="h-5 w-5 shrink-0 text-center text-xl leading-[18px] text-blue-600">
                                            −
                                        </span>
                                    ) : (
                                        <Plus className="h-5 w-5 shrink-0 text-slate-400" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="border-t border-slate-200 px-5 pb-5 pt-4 sm:px-6 dark:border-white/[0.08]">
                                        <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {faq.answer}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onRequest(
                                                    `I have a question about hardware procurement: "${faq.question}"`,
                                                    {
                                                        Source: SUPPORT_SOURCE,
                                                        "Request type":
                                                            "Procurement FAQ",
                                                        FAQ: faq.question,
                                                    }
                                                )
                                            }
                                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400"
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
    );
}


/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA({ onRequest }) {
    return (
        <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 lg:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.14),transparent_50%)]" />

            <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl dark:bg-white dark:text-slate-950">
                    <Boxes className="h-6 w-6" />
                </div>

                <h2 className="mt-7 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                    Tell us what you need.
                    <span className="block text-blue-600 dark:text-blue-400">
                        We'll help you figure out the rest.
                    </span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                    Whether you're buying one laptop, equipping a new office,
                    replacing an aging fleet or planning a large institutional
                    deployment, start with the requirement.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <PrimaryButton
                        onClick={() =>
                            onRequest(
                                "I'd like to start a hardware procurement request with AB Technologies. Please help me define the requirement and next steps.",
                                {
                                    Source: SUPPORT_SOURCE,
                                    "Request type":
                                        "Final procurement request",
                                    Stage: "Project review request",
                                }
                            )
                        }
                    >
                        Start a Procurement Request
                    </PrimaryButton>

                    <SecondaryButton
                        onClick={() =>
                            document
                                .getElementById("categories")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Browse Hardware
                    </SecondaryButton>
                </div>

                <div className="mt-9 flex flex-wrap justify-center gap-2">
                    <SoftPill>Hardware</SoftPill>
                    <SoftPill>Bulk Procurement</SoftPill>
                    <SoftPill>Enterprise</SoftPill>
                    <SoftPill>Education</SoftPill>
                    <SoftPill>Infrastructure</SoftPill>
                    <SoftPill>Deployment</SoftPill>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   FOOTER
========================================================= */

function ProcurementFooter({ onRequest }) {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 dark:border-white/[0.07] dark:bg-slate-900">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                                AB
                            </div>

                            <div>
                                <div className="text-sm font-black text-slate-950 dark:text-white">
                                    AB TECHNOLOGIES
                                </div>

                                <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-500 dark:text-slate-400">
                                    Technology. Simplified.
                                </div>
                            </div>
                        </div>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
                            Helping individuals, businesses and organizations
                            discover, source, build and deploy the technology
                            they need.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                onRequest(
                                    "I'd like to request a hardware procurement quote from AB Technologies.",
                                    {
                                        Source: SUPPORT_SOURCE,
                                        "Request type": "Footer quote request",
                                    }
                                )
                            }
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
                        >
                            Request a Quote
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-slate-950 dark:text-white">
                            Hardware
                        </h3>

                        <div className="mt-5 space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            {[
                                "Laptops",
                                "Desktops",
                                "Workstations",
                                "Servers",
                                "Networking",
                                "Accessories",
                            ].map((item) => (
                                <a
                                    key={item}
                                    className="block hover:text-blue-600"
                                    href="#categories"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-slate-950 dark:text-white">
                            Procurement
                        </h3>

                        <div className="mt-5 space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <a
                                className="block hover:text-blue-600"
                                href="#procurement"
                            >
                                Corporate
                            </a>

                            <a
                                className="block hover:text-blue-600"
                                href="#procurement"
                            >
                                Bulk procurement
                            </a>

                            <a
                                className="block hover:text-blue-600"
                                href="#industries"
                            >
                                Education
                            </a>

                            <a
                                className="block hover:text-blue-600"
                                href="#industries"
                            >
                                Enterprise
                            </a>

                            <a
                                className="block hover:text-blue-600"
                                href="#process"
                            >
                                How it works
                            </a>

                            <a
                                className="block hover:text-blue-600"
                                href="#faq"
                            >
                                FAQ
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-slate-950 dark:text-white">
                            AB Technologies
                        </h3>

                        <div className="mt-5 space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <a className="block hover:text-blue-600" href="#">
                                Software
                            </a>

                            <a className="block hover:text-blue-600" href="#">
                                Tech Market
                            </a>

                            <a className="block hover:text-blue-600" href="#">
                                Tools
                            </a>

                            <a className="block hover:text-blue-600" href="#">
                                Academy
                            </a>

                            <a className="block hover:text-blue-600" href="#">
                                Solutions
                            </a>

                            <a className="block hover:text-blue-600" href="#">
                                About
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-white/[0.07] dark:text-slate-400">
                    <p>
                        © {new Date().getFullYear()} AB Technologies. All rights
                        reserved.
                    </p>

                    <div className="flex flex-wrap gap-5">
                        <a
                            href="#"
                            className="hover:text-slate-900 dark:hover:text-white"
                        >
                            Privacy
                        </a>

                        <a
                            href="#"
                            className="hover:text-slate-900 dark:hover:text-white"
                        >
                            Terms
                        </a>

                        <a
                            href="#"
                            className="hover:text-slate-900 dark:hover:text-white"
                        >
                            Procurement Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


/* =========================================================
   MAIN PAGE
========================================================= */

export default function HardwareProcurementPage() {
    const navigate = useNavigate();

    const [quoteOpen, setQuoteOpen] = useState(false);
    const [quoteInitialRequest, setQuoteInitialRequest] = useState("");

    /*
     * =====================================================
     * CENTRAL AB AI / SUPPORT REQUEST HANDLER
     * =====================================================
     *
     * Every procurement CTA eventually comes through here.
     *
     * Flow:
     *
     * CTA
     *   ↓
     * startSupportRequest()
     *   ↓
     * queueSupportRequest()
     *   ↓
     * /support/ai
     *   ↓
     * Support page consumes queued request
     *   ↓
     * API / AB AI
     */

    const startSupportRequest = (message, metadata = {}) => {
        const cleanMessage =
            typeof message === "string" && message.trim()
                ? message.trim()
                : "I'd like to discuss a hardware procurement requirement.";

        queueSupportRequest({
            message: cleanMessage,
            metadata: {
                Source: SUPPORT_SOURCE,
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    /*
     * Opens the structured procurement form.
     *
     * We deliberately keep the form separate from the AI request
     * so users who want to provide detailed procurement information
     * can do so before entering the support conversation.
     */
    const openQuote = (initialRequest = "") => {
        setQuoteInitialRequest(initialRequest);
        setQuoteOpen(true);
    };

    const closeQuote = () => {
        setQuoteOpen(false);
        setQuoteInitialRequest("");
    };

    /*
     * Called when the structured quote form is finally submitted.
     *
     * This is the important part:
     *
     * The form no longer says "submitted" locally.
     *
     * It actually enters the same AB AI workflow used by the
     * Software & Digital Solutions page.
     */
    const submitProcurementRequest = (message, metadata) => {
        setQuoteOpen(false);
        setQuoteInitialRequest("");

        startSupportRequest(message, metadata);
    };

    return (
        <div className="min-h-screen bg-white text-slate-950 antialiased selection:bg-blue-200 selection:text-blue-950 dark:bg-slate-950 dark:text-white dark:selection:bg-blue-500/30 dark:selection:text-white">
            <main>
                <Hero onRequest={startSupportRequest} />

                <TrustStrip />

                <ProcurementOverview onRequest={startSupportRequest} />

                <HardwareCategories onRequest={startSupportRequest} />

                <BulkProcurement onRequest={startSupportRequest} />

                <ProcurementScenarios onRequest={startSupportRequest} />

                <Industries onRequest={startSupportRequest} />

                <CompleteTechnologySetup onRequest={startSupportRequest} />

                <Process />

                <RequestTypes onRequest={startSupportRequest} />

                <TrustSection />

                <RelatedServices onRequest={startSupportRequest} />

                <FAQ onRequest={startSupportRequest} />

                <FinalCTA onRequest={startSupportRequest} />
            </main>

            <ProcurementFooter onRequest={startSupportRequest} />

            <QuoteModal
                open={quoteOpen}
                onClose={closeQuote}
                onSubmitRequest={submitProcurementRequest}
                initialRequest={quoteInitialRequest}
            />
        </div>
    );
}