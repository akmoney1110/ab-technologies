import React from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    BellRing,
    Boxes,
    Building2,
    Camera,
    Check,
    ChevronRight,
    Cloud,
    Code2,
    CreditCard,
    Database,
    Globe2,
    Headphones,
    Layers3,
    LockKeyhole,
    MapPin,
    Monitor,
    Network,
    Package,
    Phone,
    PieChart,
    PlugZap,
    QrCode,
    Receipt,
    RefreshCw,
    Router,
    ScanBarcode,
    Server,
    Settings2,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart,
    Smartphone,
    Sparkles,
    Store,
    Tablet,
    Tags,
    Target,
    Truck,
    Users,
    Wifi,
    Workflow,
    Wrench,
    Zap,
} from "lucide-react";

export default function RetailHospitality() {
    const navigate = useNavigate();

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss technology for our retail or hospitality business.",
            metadata: {
                Source: "Retail & Hospitality",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    const solutions = [
        {
            icon: ShoppingCart,
            title: "Point of Sale Systems",
            text: "Modern POS environments for supermarkets, stores, restaurants, cafés, hotels and multi-location operations.",
        },
        {
            icon: Boxes,
            title: "Inventory Management",
            text: "Track stock, movement, replenishment, product quantities, branches, warehouses and inventory activity.",
        },
        {
            icon: CreditCard,
            title: "Payment Infrastructure",
            text: "Build dependable payment environments around your operational requirements and preferred payment providers.",
        },
        {
            icon: ScanBarcode,
            title: "Barcode & Product Systems",
            text: "Barcode scanners, label printers, product identification and checkout hardware configured for your operation.",
        },
        {
            icon: Network,
            title: "Business Networking",
            text: "Reliable wired and wireless networks connecting stores, offices, POS terminals, cameras, servers and staff.",
        },
        {
            icon: Camera,
            title: "Security & Surveillance",
            text: "CCTV, access control, monitoring and security infrastructure designed around your premises and risk profile.",
        },
        {
            icon: Cloud,
            title: "Cloud Infrastructure",
            text: "Cloud hosting, backups, business applications and digital infrastructure that can scale with your organization.",
        },
        {
            icon: Sparkles,
            title: "AI & Automation",
            text: "Intelligent workflows, automation, reporting, customer support and operational tools that reduce repetitive work.",
        },
    ];

    const retailServices = [
        "Supermarket technology deployment",
        "Convenience store technology",
        "Fashion and apparel stores",
        "Electronics retail environments",
        "Pharmacies and specialty stores",
        "Wholesale and distribution environments",
        "Multi-branch retail networks",
        "Shopping centres and commercial outlets",
        "Franchise technology deployment",
        "Warehouse and stockroom infrastructure",
        "Retail office technology",
        "Customer-facing digital systems",
    ];

    const hospitalityServices = [
        "Hotels and resorts",
        "Restaurants",
        "Cafés and coffee shops",
        "Bars and lounges",
        "Quick-service restaurants",
        "Fine dining environments",
        "Guest houses",
        "Event venues",
        "Catering businesses",
        "Food service operations",
        "Hospitality groups",
        "Multi-property operations",
    ];

    const procurementItems = [
        "Desktop computers",
        "Business laptops",
        "POS terminals",
        "POS displays",
        "Barcode scanners",
        "Receipt printers",
        "Label printers",
        "Cash drawers",
        "Tablets",
        "Digital signage",
        "Network switches",
        "Wi-Fi access points",
        "Routers",
        "Firewalls",
        "CCTV cameras",
        "NVR systems",
        "Access control devices",
        "Servers",
        "UPS systems",
        "Storage devices",
        "Printers",
        "Projectors",
        "Conference equipment",
        "Structured cabling",
    ];

    const workflow = [
        {
            number: "01",
            icon: Target,
            title: "Understand the operation",
            text: "We begin by understanding your stores, branches, properties, staff, customers, existing systems, challenges and growth plans.",
        },
        {
            number: "02",
            icon: MapPin,
            title: "Assess the environment",
            text: "We evaluate locations, connectivity, devices, infrastructure, workflows, security requirements and operational dependencies.",
        },
        {
            number: "03",
            icon: Layers3,
            title: "Design the solution",
            text: "We combine hardware, software, networking, security, cloud and support into a practical technology environment.",
        },
        {
            number: "04",
            icon: Package,
            title: "Source what you need",
            text: "We can help identify, compare and procure suitable devices, equipment, software and infrastructure.",
        },
        {
            number: "05",
            icon: Wrench,
            title: "Deploy everything",
            text: "Our deployment approach brings together installation, configuration, networking, testing, security and user readiness.",
        },
        {
            number: "06",
            icon: Headphones,
            title: "Support the operation",
            text: "After deployment, we can provide ongoing technical assistance, maintenance, monitoring and improvement.",
        },
    ];

    const retailChallenges = [
        {
            icon: RefreshCw,
            title: "Stock inaccuracies",
            text: "Disconnected stock processes can create inaccurate inventory, lost sales and unnecessary purchasing.",
        },
        {
            icon: Wifi,
            title: "Unreliable connectivity",
            text: "Weak networks can interrupt POS, payments, cloud applications, staff systems and customer services.",
        },
        {
            icon: ShieldCheck,
            title: "Security concerns",
            text: "Retail and hospitality environments need protection across physical premises, devices, accounts and data.",
        },
        {
            icon: Database,
            title: "Disconnected information",
            text: "When systems cannot communicate, management has a harder time seeing what is happening across the business.",
        },
        {
            icon: Users,
            title: "Growing operations",
            text: "Opening additional branches or properties requires technology that can expand without unnecessary complexity.",
        },
        {
            icon: Zap,
            title: "Operational pressure",
            text: "Customer-facing environments need technology that works reliably during busy periods.",
        },
    ];

    const businessSystems = [
        "POS and checkout",
        "Inventory management",
        "Product catalogue",
        "Customer management",
        "Staff management",
        "Accounting integrations",
        "Procurement workflows",
        "Supplier management",
        "Sales reporting",
        "Branch reporting",
        "Expense tracking",
        "Digital receipts",
        "Online ordering",
        "Customer communications",
        "Business dashboards",
        "Appointment systems",
    ];

    const hotelSystems = [
        "Property management systems",
        "Reservation workflows",
        "Guest communications",
        "Front-desk technology",
        "Wi-Fi infrastructure",
        "Digital signage",
        "CCTV",
        "Access control",
        "Staff communication",
        "Housekeeping workflows",
        "Maintenance tracking",
        "Business reporting",
        "Cloud applications",
        "Backup infrastructure",
        "Network monitoring",
        "Guest-facing digital services",
    ];

    const metrics = [
        {
            value: "01",
            title: "One technology partner",
            text: "Reduce the need to coordinate multiple technology vendors for every part of an implementation.",
        },
        {
            value: "02",
            title: "End-to-end delivery",
            text: "Move from planning and procurement through deployment, training, support and future improvements.",
        },
        {
            value: "03",
            title: "Built around operations",
            text: "Technology is selected around the way your business actually works rather than technology for technology's sake.",
        },
        {
            value: "04",
            title: "Designed for growth",
            text: "Create foundations that can support new branches, employees, locations, products and services.",
        },
    ];

    return (
        <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/10" />
                    <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                    <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] [background-size:48px_48px]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">

                        <div>
                            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                                <Store className="h-4 w-4" />
                                Retail & Hospitality Solutions
                            </div>

                            <h1 className="max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
                                Technology built for
                                <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-blue-600 bg-clip-text text-transparent">
                                    businesses that serve people.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                From a single retail outlet, restaurant or hotel to a growing
                                multi-branch operation, we help you plan, source, deploy,
                                connect and support the technology behind your business.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                You do not have to know exactly what technology you need.
                                Tell us what you are trying to achieve, and we can help you
                                work from the ground up.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start a retail or hospitality technology project.",
                                            {
                                                Intent: "Start project",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                                >
                                    Start Your Project
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        document
                                            .getElementById("retail-hospitality-solutions")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                                >
                                    Explore Solutions
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    Retail technology
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    Hospitality technology
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    Procurement
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    Deployment & support
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950">

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                                Business Technology
                                            </p>
                                            <h3 className="mt-2 text-xl font-black">
                                                Connected Operations
                                            </h3>
                                        </div>

                                        <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
                                            <Workflow className="h-6 w-6" />
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        {[
                                            ["POS", ShoppingCart],
                                            ["Network", Wifi],
                                            ["Security", Camera],
                                            ["Cloud", Cloud],
                                            ["Inventory", Boxes],
                                            ["Analytics", BarChart3],
                                        ].map(([label, Icon]) => (
                                            <div
                                                key={label}
                                                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-orange-300 hover:bg-orange-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-orange-500/30 dark:hover:bg-orange-500/5"
                                            >
                                                <Icon className="h-5 w-5 text-slate-500 transition group-hover:text-orange-500 dark:text-slate-400" />
                                                <p className="mt-3 text-sm font-bold">{label}</p>
                                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                                                    Connected
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white dark:bg-white dark:text-slate-950">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs uppercase tracking-wider opacity-60">
                                                    Operational visibility
                                                </p>
                                                <p className="mt-2 text-2xl font-black">
                                                    One connected environment
                                                </p>
                                            </div>

                                            <BarChart3 className="h-8 w-8 opacity-70" />
                                        </div>

                                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10 dark:bg-slate-950/10">
                                            <div className="h-full w-[84%] rounded-full bg-current" />
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
            ========================================================= */}

            <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-start">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                                More than equipment
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Your technology should support the business, not slow it down.
                            </h2>
                        </div>

                        <div className="space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                Retail and hospitality businesses operate in environments where
                                technology directly affects customers, employees, revenue and
                                daily operations.
                            </p>

                            <p>
                                A checkout terminal that fails, a weak Wi-Fi network, inaccurate
                                inventory, disconnected branches, poor security or unreliable
                                business software can quickly become an operational problem.
                            </p>

                            <p>
                                That is why we look beyond individual devices. We help bring
                                together the <strong className="text-slate-900 dark:text-white">
                                    hardware, software, networking, security, cloud,
                                    communication, automation and support
                                </strong> required to create a dependable operating environment.
                            </p>
                        </div>

                    </div>

                    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {metrics.map((item) => (
                            <div
                                key={item.value}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950"
                            >
                                <p className="text-sm font-black text-orange-500">
                                    {item.value}
                                </p>

                                <h3 className="mt-4 text-lg font-black">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =========================================================
                CHALLENGES
            ========================================================= */}

            <section className="relative py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-600 dark:bg-white/5 dark:text-slate-300">
                            <Target className="h-4 w-4" />
                            Built around real business challenges
                        </div>

                        <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                            Technology problems become business problems.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            We help identify the underlying technology issues and build
                            practical solutions around them.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {retailChallenges.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/50 dark:hover:shadow-black/20"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* =========================================================
                RETAIL
            ========================================================= */}

            <section className="overflow-hidden bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-orange-300">
                                <ShoppingBag className="h-4 w-4" />
                                Retail
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Technology for modern retail operations.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                Whether you operate one store or a growing network of branches,
                                we can help create the technology foundation behind your retail
                                operation.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {retailServices.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                                    >
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                                        <span className="text-sm text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-10 rounded-full bg-orange-500/10 blur-3xl" />

                            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                                <div className="rounded-[1.5rem] bg-white p-6 text-slate-950">

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Retail control
                                            </p>
                                            <h3 className="mt-2 text-xl font-black">
                                                Branch Overview
                                            </h3>
                                        </div>

                                        <ShoppingCart className="h-7 w-7 text-orange-500" />
                                    </div>

                                    <div className="mt-7 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl bg-slate-100 p-4">
                                            <p className="text-xs text-slate-500">Sales</p>
                                            <p className="mt-2 text-xl font-black">
                                                Connected
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-slate-100 p-4">
                                            <p className="text-xs text-slate-500">Inventory</p>
                                            <p className="mt-2 text-xl font-black">
                                                Visible
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-slate-100 p-4">
                                            <p className="text-xs text-slate-500">Branches</p>
                                            <p className="mt-2 text-xl font-black">
                                                Unified
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-slate-100 p-4">
                                            <p className="text-xs text-slate-500">Network</p>
                                            <p className="mt-2 text-xl font-black">
                                                Managed
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                                                <Wifi className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold">
                                                    Store infrastructure
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    POS • Network • Security • Cloud
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
                HOSPITALITY
            ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">

                                {[
                                    {
                                        icon: Building2,
                                        title: "Hotels",
                                    },
                                    {
                                        icon: Store,
                                        title: "Restaurants",
                                    },
                                    {
                                        icon: Wifi,
                                        title: "Guest Wi-Fi",
                                    },
                                    {
                                        icon: Camera,
                                        title: "Security",
                                    },
                                    {
                                        icon: Tablet,
                                        title: "Guest Devices",
                                    },
                                    {
                                        icon: Cloud,
                                        title: "Cloud Systems",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]"
                                        >
                                            <Icon className="h-6 w-6 text-blue-500" />
                                            <p className="mt-5 font-black">
                                                {item.title}
                                            </p>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-300">
                                <Building2 className="h-4 w-4" />
                                Hospitality
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Create a smoother experience for guests and staff.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Hospitality businesses need technology that supports the
                                guest experience while making the operation easier for
                                employees and management.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {hospitalityServices.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                                            <Check className="h-4 w-4" />
                                        </div>

                                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
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
                CORE SOLUTIONS
            ========================================================= */}

            <section id="retail-hospitality-solutions" className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                            Our technology stack
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Everything can work together.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            We do not look at POS, networking, security, software and
                            cloud as isolated purchases. We help you build a connected
                            technology environment.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {solutions.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${item.title} for our retail or hospitality business.`,
                                            {
                                                Intent: "Solution enquiry",
                                                Solution: item.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-950 dark:hover:border-orange-500/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-orange-500 group-hover:text-white dark:bg-white/5 dark:text-slate-300 dark:group-hover:bg-orange-500">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>

                                    <div className="mt-5 flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                                        Explore capability
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* =========================================================
                POS
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-orange-50 via-white to-blue-50 p-8 dark:border-white/10 dark:from-orange-500/10 dark:via-slate-950 dark:to-blue-500/10 sm:p-10 lg:p-14">

                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm dark:bg-white/10 dark:text-orange-300">
                                    <Receipt className="h-4 w-4" />
                                    POS & Checkout
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                    Build a checkout environment around your business.
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                    We can help with the technology surrounding your point of
                                    sale environment, including terminals, displays, scanners,
                                    receipt printers, cash drawers, networking, power protection,
                                    software and support.
                                </p>

                                <div className="mt-7 space-y-3">
                                    {[
                                        "POS terminals and computers",
                                        "Barcode scanners and product identification",
                                        "Receipt and label printers",
                                        "Cash drawers and accessories",
                                        "Network connectivity",
                                        "UPS and power protection",
                                        "Multi-terminal environments",
                                        "Branch deployment",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                                            <Check className="h-5 w-5 text-emerald-500" />
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">

                                <div className="rounded-2xl bg-slate-950 p-6 text-white dark:bg-white dark:text-slate-950">

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider opacity-50">
                                                Checkout environment
                                            </p>

                                            <p className="mt-2 text-xl font-black">
                                                Ready for business
                                            </p>
                                        </div>

                                        <Receipt className="h-7 w-7 opacity-70" />
                                    </div>

                                    <div className="mt-7 grid grid-cols-3 gap-3">
                                        <div className="rounded-xl bg-white/10 p-4 dark:bg-slate-950/10">
                                            <Monitor className="h-5 w-5 opacity-60" />
                                            <p className="mt-3 text-xs opacity-60">
                                                Terminal
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-white/10 p-4 dark:bg-slate-950/10">
                                            <ScanBarcode className="h-5 w-5 opacity-60" />
                                            <p className="mt-3 text-xs opacity-60">
                                                Scanner
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-white/10 p-4 dark:bg-slate-950/10">
                                            <PrinterIcon />
                                            <p className="mt-3 text-xs opacity-60">
                                                Printer
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-xl bg-orange-500 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold">
                                                System status
                                            </span>

                                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                                                Operational
                                            </span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                INVENTORY
            ========================================================= */}

            <section className="bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                                Inventory & operations
                            </p>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                                Know what you have, where it is and what needs attention.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-400">
                                Inventory technology can connect products, branches,
                                warehouses, purchasing and management reporting into a
                                clearer operational picture.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss inventory management, stock visibility and operational systems for our business.",
                                        {
                                            Intent: "Inventory enquiry",
                                            Solution: "Inventory Management",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
                            >
                                Discuss your inventory environment
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {businessSystems.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                                        <span className="text-xs font-black">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold text-slate-300">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                HOTEL SYSTEMS
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-300">
                                <Building2 className="h-4 w-4" />
                                Hospitality infrastructure
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                Connect the systems behind the guest experience.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                From the front desk to guest Wi-Fi, security, staff
                                communication and management systems, we can help create
                                an infrastructure that supports your property.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {hotelSystems.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 dark:border-white/10"
                                    >
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900">

                                <div className="grid gap-4">

                                    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-950">
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-500">
                                                <Wifi className="h-6 w-6" />
                                            </div>

                                            <div>
                                                <p className="font-black">
                                                    Guest connectivity
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            "I'd like to discuss technology systems and infrastructure for our hotel or hospitality business.",
                                                            {
                                                                Intent: "Solution enquiry",
                                                                Solution: "Hospitality technology",
                                                            }
                                                        )
                                                    }
                                                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3 dark:text-orange-400"
                                                >
                                                    Discuss Hospitality Technology
                                                    <ArrowRight className="h-4 w-4" />
                                                </button>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Reliable wireless infrastructure
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">

                                        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-950">
                                            <Camera className="h-6 w-6 text-orange-500" />
                                            <p className="mt-4 font-black">
                                                Security
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                CCTV & access
                                            </p>
                                        </div>

                                        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-950">
                                            <Smartphone className="h-6 w-6 text-blue-500" />
                                            <p className="mt-4 font-black">
                                                Communication
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Staff & guests
                                            </p>
                                        </div>

                                    </div>

                                    <div className="rounded-3xl bg-slate-950 p-6 text-white dark:bg-white dark:text-slate-950">
                                        <div className="flex items-center gap-4">
                                            <Cloud className="h-7 w-7" />

                                            <div>
                                                <p className="font-black">
                                                    Digital infrastructure
                                                </p>

                                                <p className="mt-1 text-sm opacity-60">
                                                    Cloud • Applications • Backup
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
                PROCUREMENT
            ========================================================= */}

            <section className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                                Hardware procurement
                            </p>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                                Need the equipment too? We can help from the beginning.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                You can come to us with a simple requirement such as
                                “I am opening a supermarket” or “I need to equip a hotel.”
                                We can help turn that requirement into a technology
                                procurement plan.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Requirement identification",
                                    "Product specification",
                                    "Supplier sourcing",
                                    "Competitive quotations",
                                    "Bulk procurement",
                                    "Product verification",
                                    "Delivery coordination",
                                    "Deployment",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <Check className="h-5 w-5 text-emerald-500" />
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-slate-950">

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                        Example procurement catalogue
                                    </p>

                                    <h3 className="mt-2 text-xl font-black">
                                        Technology equipment
                                    </h3>
                                </div>

                                <Package className="h-7 w-7 text-orange-500" />
                            </div>

                            <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                {procurementItems.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-orange-500" />

                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like help planning and procuring technology equipment for our retail or hospitality business.",
                                        {
                                            Intent: "Procurement",
                                            Category: "Retail & Hospitality Technology Equipment",
                                        }
                                    )
                                }
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500 dark:bg-white dark:text-slate-950 dark:hover:bg-orange-400"
                            >
                                Discuss Procurement
                                <ArrowRight className="h-4 w-4" />
                            </button>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                NETWORK
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-950 sm:p-10 lg:p-14">

                        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-500">
                                        <Network className="h-6 w-6" />
                                    </div>

                                    <p className="text-sm font-black uppercase tracking-wider text-blue-600 dark:text-blue-300">
                                        Networking & infrastructure
                                    </p>
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                    One network connecting your operation.
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                    Retail and hospitality technology depends heavily on
                                    connectivity. We can design and deploy networks for
                                    POS terminals, staff devices, guest Wi-Fi, cameras,
                                    servers, offices and cloud applications.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {[
                                        "Wi-Fi",
                                        "Routers",
                                        "Switches",
                                        "Firewalls",
                                        "Structured cabling",
                                        "VLANs",
                                        "CCTV networks",
                                        "Guest networks",
                                        "Branch connectivity",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">

                                <div className="rounded-3xl bg-slate-950 p-7 text-white dark:bg-slate-900">

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-slate-500">
                                                Infrastructure map
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        "I'd like to discuss networking and infrastructure for our retail or hospitality operation.",
                                                        {
                                                            Intent: "Solution enquiry",
                                                            Solution: "Networking & infrastructure",
                                                        }
                                                    )
                                                }
                                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3 dark:text-orange-400"
                                            >
                                                Discuss Your Network
                                                <ArrowRight className="h-4 w-4" />
                                            </button>

                                            <p className="mt-2 text-lg font-black">
                                                Connected environment
                                            </p>
                                        </div>

                                        <Router className="h-7 w-7 text-blue-400" />
                                    </div>

                                    <div className="mt-8 space-y-3">

                                        {[
                                            ["Internet", Globe2],
                                            ["Firewall", LockKeyhole],
                                            ["Core Network", Router],
                                            ["POS & Devices", Monitor],
                                            ["Security", Camera],
                                            ["Cloud Services", Cloud],
                                        ].map(([label, Icon], index) => (
                                            <div
                                                key={label}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                                                    <Icon className="h-5 w-5 text-blue-400" />
                                                </div>

                                                <div className="flex-1">
                                                    <p className="text-sm font-bold">
                                                        {label}
                                                    </p>

                                                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                                                        <div
                                                            className="h-full rounded-full bg-blue-500"
                                                            style={{
                                                                width: `${70 + index * 4}%`,
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
            </section>

            {/* =========================================================
                SECURITY
            ========================================================= */}

            <section className="bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                            <ShieldCheck className="h-7 w-7" />
                        </div>

                        <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                            Protect the environment around your business.
                        </h2>

                        <p className="mt-5 leading-8 text-slate-400">
                            Physical and digital security should be considered as part
                            of the same technology environment.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                icon: Camera,
                                title: "CCTV",
                                text: "Surveillance infrastructure for stores, offices, warehouses, hotels and other premises.",
                            },
                            {
                                icon: LockKeyhole,
                                title: "Access Control",
                                text: "Technology for controlling and monitoring access to selected areas.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Cybersecurity",
                                text: "Security considerations across accounts, devices, networks and business applications.",
                            },
                            {
                                icon: BellRing,
                                title: "Monitoring",
                                text: "Visibility into systems and infrastructure so problems can be identified earlier.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
                                >
                                    <Icon className="h-6 w-6 text-emerald-400" />

                                    <h3 className="mt-6 text-lg font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        {item.text}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss CCTV, access control, cybersecurity or monitoring for our retail or hospitality business.",
                                                {
                                                    Intent: "Solution enquiry",
                                                    Solution: "Security",
                                                }
                                            )
                                        }
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3 dark:text-orange-400"
                                    >
                                        Discuss Security
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* =========================================================
                SOFTWARE
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                                Software & applications
                            </p>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                                Your business may need software, not another spreadsheet.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                We can help with existing business applications,
                                integrations and custom software when off-the-shelf
                                solutions do not fully match your operation.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Business management systems",
                                    "Inventory applications",
                                    "Customer management",
                                    "Staff management",
                                    "Reporting dashboards",
                                    "Booking systems",
                                    "Ordering systems",
                                    "Supplier workflows",
                                    "Internal portals",
                                    "Custom web applications",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <Code2 className="h-4 w-4 text-purple-500" />
                                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900">

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950">

                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
                                        <Code2 className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-black">
                                            Business application layer
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to discuss business software, integrations or a custom application for our retail or hospitality operation.",
                                                    {
                                                        Intent: "Solution enquiry",
                                                        Solution: "Software & applications",
                                                    }
                                                )
                                            }
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3 dark:text-orange-400"
                                        >
                                            Discuss Software
                                            <ArrowRight className="h-4 w-4" />
                                        </button>

                                        <p className="text-xs text-slate-500">
                                            Built around your workflows
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-7 space-y-3">
                                    {[
                                        ["Sales", "Connected"],
                                        ["Inventory", "Connected"],
                                        ["Customers", "Connected"],
                                        ["Staff", "Connected"],
                                        ["Reporting", "Connected"],
                                    ].map(([label, status]) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-white/[0.03]"
                                        >
                                            <span className="text-sm font-bold">
                                                {label}
                                            </span>

                                            <span className="text-xs font-bold text-emerald-500">
                                                {status}
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
                CLOUD
            ========================================================= */}

            <section className="bg-blue-50 py-20 dark:bg-blue-500/5 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-300">
                                <Cloud className="h-4 w-4" />
                                Cloud & digital infrastructure
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                Keep your business systems available wherever your teams work.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Cloud infrastructure can support centralized applications,
                                backups, remote teams, branch operations and management
                                visibility.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        icon: Server,
                                        title: "Hosting",
                                    },
                                    {
                                        icon: Cloud,
                                        title: "Cloud applications",
                                    },
                                    {
                                        icon: Database,
                                        title: "Backup",
                                    },
                                    {
                                        icon: Globe2,
                                        title: "Remote access",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-blue-100 bg-white p-5 dark:border-white/10 dark:bg-slate-950"
                                        >
                                            <Icon className="h-5 w-5 text-blue-500" />

                                            <p className="mt-4 font-black">
                                                {item.title}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <div className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl dark:bg-black">

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Digital infrastructure
                                        </p>

                                        <p className="mt-2 text-xl font-black">
                                            Multi-location ready
                                        </p>
                                    </div>

                                    <Cloud className="h-8 w-8 text-blue-400" />
                                </div>

                                <div className="mt-8 space-y-3">
                                    {[
                                        "Centralized systems",
                                        "Secure remote access",
                                        "Automated backups",
                                        "Scalable infrastructure",
                                        "Monitoring",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-xl bg-white/5 p-4"
                                        >
                                            <Check className="h-4 w-4 text-emerald-400" />
                                            <span className="text-sm font-semibold text-slate-300">
                                                {item}
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
                AI
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8 dark:border-purple-500/20 dark:from-purple-500/10 dark:via-slate-950 dark:to-blue-500/10 sm:p-10 lg:p-14">

                        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-bold text-purple-600 dark:text-purple-300">
                                    <Sparkles className="h-4 w-4" />
                                    AI & automation
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                    Use intelligence where it actually improves the operation.
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                    AI should not simply be added because it is fashionable.
                                    We look for practical opportunities where automation,
                                    intelligent search, reporting, recommendations or
                                    conversational interfaces can improve your operation.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "Automated business workflows",
                                        "AI-powered customer assistance",
                                        "Intelligent reporting",
                                        "Document and information processing",
                                        "Operational alerts",
                                        "Internal AI assistants",
                                        "Data-driven recommendations",
                                        "Workflow integrations",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                                                <Check className="h-4 w-4" />
                                            </div>

                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-950/70">

                                <div className="rounded-2xl bg-slate-950 p-6 text-white dark:bg-white dark:text-slate-950">

                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-purple-500/20 p-3 text-purple-300 dark:text-purple-600">
                                            <Sparkles className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="font-black">
                                                Intelligent operations
                                            </p>

                                            <p className="text-xs opacity-50">
                                                Ask. Analyze. Act.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-7 rounded-2xl bg-white/5 p-5 dark:bg-slate-950/5">
                                        <p className="text-xs opacity-50">
                                            Example request
                                        </p>

                                        <p className="mt-3 text-sm leading-6">
                                            “Show me which branches have unusual
                                            inventory movement this week.”
                                        </p>
                                    </div>

                                    <div className="mt-3 rounded-2xl bg-purple-500 p-5">
                                        <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                                            Intelligent response
                                        </p>

                                        <p className="mt-3 text-sm leading-6">
                                            Your system can process the relevant data,
                                            identify patterns and present the information
                                            in a management-friendly format.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                COMMUNICATION
            ========================================================= */}

            <section className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                            Communication
                        </p>

                        <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                            Keep customers, staff and locations connected.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Communication infrastructure becomes increasingly important
                            as businesses grow across multiple branches and properties.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: MailIcon,
                                title: "Business email",
                                text: "Professional communication infrastructure for teams and organizations.",
                            },
                            {
                                icon: Phone,
                                title: "Business calling",
                                text: "Communication solutions designed around operational requirements.",
                            },
                            {
                                icon: Smartphone,
                                title: "Mobile workflows",
                                text: "Connect employees and managers using appropriate mobile technology.",
                            },
                            {
                                icon: BellRing,
                                title: "Notifications",
                                text: "Automate useful operational and customer-facing notifications.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-950"
                                >
                                    <Icon className="h-6 w-6 text-blue-500" />

                                    <h3 className="mt-5 font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* =========================================================
                DEPLOYMENT
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                            From idea to operation
                        </p>

                        <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                            You can start with almost nothing.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            If you are opening a new store, restaurant, hotel or office,
                            you do not need to arrive with a technology plan already
                            written.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {workflow.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.number}
                                    className="relative rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-950"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-4xl font-black text-slate-100 dark:text-white/5">
                                            {item.number}
                                        </span>

                                        <div className="rounded-2xl bg-orange-500/10 p-3 text-orange-500">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* =========================================================
                MULTI-BRANCH
            ========================================================= */}

            <section className="bg-slate-950 py-20 text-white dark:bg-black lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                                Multi-location operations
                            </p>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                                Open one branch today. Build for the next ten.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-400">
                                Technology decisions made at the beginning can either make
                                future expansion easier or force you to rebuild everything.
                                We help you think beyond the first location.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Centralized administration",
                                    "Branch connectivity",
                                    "Consistent hardware standards",
                                    "Shared applications",
                                    "Centralized reporting",
                                    "User and access management",
                                    "Remote support",
                                    "Scalable infrastructure",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <Check className="h-5 w-5 text-orange-400" />
                                        <span className="text-sm font-semibold text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">

                            <div className="grid grid-cols-2 gap-4">

                                {[
                                    ["Branch 01", "Connected"],
                                    ["Branch 02", "Connected"],
                                    ["Branch 03", "Connected"],
                                    ["Branch 04", "Connected"],
                                ].map(([branch, status]) => (
                                    <div
                                        key={branch}
                                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                                                <Store className="h-5 w-5" />
                                            </div>

                                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                        </div>

                                        <p className="mt-5 font-black">
                                            {branch}
                                        </p>

                                        <p className="mt-1 text-xs text-emerald-400">
                                            {status}
                                        </p>
                                    </div>
                                ))}

                            </div>

                            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400">
                                        <BarChart3 className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="font-black">
                                            Central management
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            One view across multiple locations
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                MANAGED IT
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-3">

                        <div className="lg:col-span-1">
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                                Managed IT
                            </p>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                                We can stay involved after deployment.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                Technology needs attention after it has been installed.
                                Our support approach can help keep your environment
                                operational and improve it as your business changes.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                            {[
                                ["Technical support", Headphones],
                                ["System maintenance", Wrench],
                                ["Network support", Network],
                                ["Device management", Monitor],
                                ["Cloud support", Cloud],
                                ["Security reviews", ShieldCheck],
                                ["Backup management", Database],
                                ["Technology planning", Target],
                            ].map(([title, Icon]) => (
                                <div
                                    key={title}
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <p className="font-bold">
                                        {title}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                TRAINING
            ========================================================= */}

            <section className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-600 dark:text-amber-300">
                                <Users className="h-4 w-4" />
                                People & training
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                                Good technology still needs people who know how to use it.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                We can help your team understand the systems they depend
                                on, from basic device usage to business applications,
                                operational workflows and security awareness.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                "Staff technology onboarding",
                                "POS training",
                                "System training",
                                "Security awareness",
                                "Digital productivity",
                                "Business software training",
                                "Manager dashboards",
                                "Operational procedures",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950"
                                >
                                    <Check className="h-5 w-5 text-amber-500" />

                                    <p className="mt-4 text-sm font-bold">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                CUSTOM START
            ========================================================= */}

            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-7 py-14 text-white sm:px-10 lg:px-16 lg:py-20">

                        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
                        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

                        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">

                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                                    Starting from scratch?
                                </p>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                    Tell us what you are trying to build.
                                </h2>

                                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                                    You can start with an idea, a problem, a shopping list,
                                    a new location or simply a business goal. We can help
                                    turn it into a technology plan.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {[
                                        "New store",
                                        "New hotel",
                                        "New restaurant",
                                        "Branch expansion",
                                        "Technology upgrade",
                                        "Digital transformation",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

                                <p className="text-sm font-bold">
                                    We can help with
                                </p>

                                <div className="mt-5 space-y-3">
                                    {[
                                        "Planning",
                                        "Procurement",
                                        "Implementation",
                                        "Integration",
                                        "Training",
                                        "Support",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-xl bg-white/5 p-4"
                                        >
                                            <Check className="h-4 w-4 text-orange-400" />
                                            <span className="text-sm font-semibold text-slate-300">
                                                {item}
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
                CTA
            ========================================================= */}

            <section className="border-t border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-950 lg:py-28">
                <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500/10 text-orange-500">
                        <Store className="h-8 w-8" />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                        Let us build the technology behind your operation.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Whether you need one device, a complete retail environment,
                        a hotel infrastructure, multiple branches or a custom
                        digital solution, AB TECHNOLOGIES can help you plan the
                        right next step.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                        >
                            Request a Quote
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-white"
                        >
                            Talk to Our Team
                            <Headphones className="h-4 w-4" />
                        </button>

                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-400">
                        <span>Retail</span>
                        <span>Hospitality</span>
                        <span>Procurement</span>
                        <span>Networking</span>
                        <span>Software</span>
                        <span>Cloud</span>
                        <span>Security</span>
                        <span>AI</span>
                        <span>Managed IT</span>
                    </div>

                </div>
            </section>

        </main >
    );
}


/* =============================================================
   SMALL ICON HELPERS
   ============================================================= */

function PrinterIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 opacity-60"
        >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
        </svg>
    );
}