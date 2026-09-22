import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowDownRight,
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Boxes,
    Building2,
    Calculator,
    Check,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    Clock3,
    Cloud,
    Code2,
    Cpu,
    Database,
    FileCheck2,
    FileSearch,
    Globe2,
    Handshake,
    Headphones,
    Laptop,
    Layers3,
    Mail,
    MapPin,
    MessageSquare,
    Network,
    Package,
    PackageCheck,
    PenTool,
    Phone,
    Plus,
    Radar,
    RefreshCw,
    Search,
    Send,
    Server,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Store,
    Tablet,
    Target,
    Truck,
    Users,
    WalletCards,
    Wrench,
    X,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function SuppliersVendorSourcing() {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [openFaq, setOpenFaq] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    // Controlled fields for Sourcing Request modal
    const [requestName, setRequestName] = useState("");
    const [requestOrg, setRequestOrg] = useState("");
    const [requestEmail, setRequestEmail] = useState("");
    const [requestPhone, setRequestPhone] = useState("");
    const [requestQuantity, setRequestQuantity] = useState("");
    const [requestTimeline, setRequestTimeline] = useState("");
    const [requestDescription, setRequestDescription] = useState("");
    const [requestAdditional, setRequestAdditional] = useState("");

    // Controlled fields for Supplier Application modal
    const [supplierCompany, setSupplierCompany] = useState("");
    const [supplierContact, setSupplierContact] = useState("");
    const [supplierEmail, setSupplierEmail] = useState("");
    const [supplierProducts, setSupplierProducts] = useState("");
    const [supplierAdditional, setSupplierAdditional] = useState("");

    /* -----------------------------------------------------
       Hand off a contextual request to the support page.
    ----------------------------------------------------- */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss suppliers and vendor sourcing.",
            metadata: metadata || {
                Source: "Suppliers & Vendor Sourcing",
            },
        });

        navigate("/support/ai");
    };

    /* Sourcing Request modal submit */
    const handleRequestSubmit = (event) => {
        event?.preventDefault();
        setShowRequestModal(false);

        const composed = [
            "I'd like to submit a sourcing request.",
            "",
            requestName ? `Name: ${requestName}` : null,
            requestOrg ? `Organization: ${requestOrg}` : null,
            requestEmail ? `Email: ${requestEmail}` : null,
            requestPhone ? `Phone: ${requestPhone}` : null,
            requestQuantity ? `Quantity: ${requestQuantity}` : null,
            requestTimeline ? `Timeline: ${requestTimeline}` : null,
            requestDescription ? `\nWhat I'm sourcing:\n${requestDescription}` : null,
            requestAdditional ? `\nAdditional requirements:\n${requestAdditional}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        startSupportChat(composed, {
            Source: "Suppliers & Vendor Sourcing",
            Stage: "Sourcing request modal",
            Category: selectedService?.title || "Custom",
            Quantity: requestQuantity || "Not specified",
            Timeline: requestTimeline || "Not specified",
            Name: requestName || "Not specified",
            Organization: requestOrg || "Not specified",
            Email: requestEmail || "Not specified",
            Phone: requestPhone || "Not specified",
        });

        setSelectedService(null);
        setRequestName("");
        setRequestOrg("");
        setRequestEmail("");
        setRequestPhone("");
        setRequestQuantity("");
        setRequestTimeline("");
        setRequestDescription("");
        setRequestAdditional("");
    };

    /* Supplier Application modal submit */
    const handleSupplierSubmit = () => {
        setShowSupplierModal(false);

        const composed = [
            "I'd like to register as a supplier / vendor.",
            "",
            supplierCompany ? `Company: ${supplierCompany}` : null,
            supplierContact ? `Contact person: ${supplierContact}` : null,
            supplierEmail ? `Business email: ${supplierEmail}` : null,
            supplierProducts ? `\nProducts / services supplied:\n${supplierProducts}` : null,
            supplierAdditional ? `\nAdditional information:\n${supplierAdditional}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        startSupportChat(composed, {
            Source: "Suppliers & Vendor Sourcing",
            Stage: "Supplier application",
            Company: supplierCompany || "Not specified",
            Contact: supplierContact || "Not specified",
            Email: supplierEmail || "Not specified",
        });

        setSupplierCompany("");
        setSupplierContact("");
        setSupplierEmail("");
        setSupplierProducts("");
        setSupplierAdditional("");
    };

    const supplierCategories = [
        "All",
        "Computers",
        "Networking",
        "Servers",
        "Security",
        "Software",
        "Cloud",
        "Power",
        "Accessories",
        "Office Technology",
        "Education",
        "Enterprise",
    ];

    const sourcingServices = [
        {
            id: 1,
            category: "Computers",
            icon: Laptop,
            title: "Business Laptop Sourcing",
            description:
                "Source business laptops based on processor, memory, storage, display, operating system, warranty and budget requirements.",
            examples: [
                "Business laptops",
                "Developer workstations",
                "Executive laptops",
                "Student devices",
                "Engineering laptops",
            ],
        },
        {
            id: 2,
            category: "Computers",
            icon: Cpu,
            title: "Desktop & Workstation Sourcing",
            description:
                "Find desktop computers and professional workstations for offices, engineering teams, creative teams, developers and specialized users.",
            examples: [
                "Office desktops",
                "Workstations",
                "Mini PCs",
                "Tower systems",
                "Performance PCs",
            ],
        },
        {
            id: 3,
            category: "Networking",
            icon: Network,
            title: "Networking Equipment",
            description:
                "Source routers, switches, access points, firewalls, transceivers, racks, cabling and supporting network infrastructure.",
            examples: [
                "Managed switches",
                "Enterprise Wi-Fi",
                "Routers",
                "Firewalls",
                "Network accessories",
            ],
        },
        {
            id: 4,
            category: "Servers",
            icon: Server,
            title: "Server & Data Center Equipment",
            description:
                "Source servers, storage, racks, UPS systems, networking hardware and supporting data-center components.",
            examples: [
                "Rack servers",
                "Tower servers",
                "NAS",
                "SAN",
                "Server accessories",
            ],
        },
        {
            id: 5,
            category: "Security",
            icon: ShieldCheck,
            title: "Cybersecurity Products",
            description:
                "Source security hardware and software that support endpoint, network, identity, access and infrastructure protection.",
            examples: [
                "Firewalls",
                "Endpoint security",
                "Security licenses",
                "Access control",
                "Security appliances",
            ],
        },
        {
            id: 6,
            category: "Software",
            icon: Code2,
            title: "Software & Licensing",
            description:
                "Help identify appropriate software licensing options, subscriptions, business applications and productivity platforms.",
            examples: [
                "Productivity software",
                "Developer tools",
                "Business software",
                "Security software",
                "SaaS subscriptions",
            ],
        },
        {
            id: 7,
            category: "Cloud",
            icon: Cloud,
            title: "Cloud & Hosting Services",
            description:
                "Source cloud, hosting, infrastructure and related managed services based on workload, users and business requirements.",
            examples: [
                "Cloud infrastructure",
                "Web hosting",
                "Managed servers",
                "Backup",
                "Cloud subscriptions",
            ],
        },
        {
            id: 8,
            category: "Power",
            icon: Zap,
            title: "Power & Backup Equipment",
            description:
                "Source UPS systems, backup power equipment, surge protection and related technology power infrastructure.",
            examples: [
                "UPS systems",
                "Power backup",
                "Surge protection",
                "Power distribution",
                "Battery systems",
            ],
        },
        {
            id: 9,
            category: "Accessories",
            icon: Boxes,
            title: "IT Accessories",
            description:
                "Source keyboards, mice, displays, docks, adapters, bags, cables and other technology accessories.",
            examples: [
                "Monitors",
                "Docking stations",
                "Keyboards",
                "Mice",
                "Adapters",
            ],
        },
        {
            id: 10,
            category: "Office Technology",
            icon: Building2,
            title: "Office Technology",
            description:
                "Equip offices with the technology needed for productive, connected and professionally managed workplaces.",
            examples: [
                "Printers",
                "Displays",
                "Meeting room equipment",
                "Scanners",
                "Office peripherals",
            ],
        },
        {
            id: 11,
            category: "Education",
            icon: Users,
            title: "Education Technology",
            description:
                "Source technology for schools, universities, training centers, laboratories and educational programs.",
            examples: [
                "Student laptops",
                "Computer labs",
                "Projectors",
                "Networking",
                "Learning technology",
            ],
        },
        {
            id: 12,
            category: "Enterprise",
            icon: Building2,
            title: "Enterprise Technology",
            description:
                "Coordinate complex enterprise technology requirements involving multiple product categories, vendors and deployment locations.",
            examples: [
                "Enterprise endpoints",
                "Infrastructure",
                "Security",
                "Collaboration",
                "Multi-site deployments",
            ],
        },
    ];

    const sourcingProcess = [
        {
            number: "01",
            icon: MessageSquare,
            title: "Tell us what you need",
            description:
                "Start with a product, specification, quantity, project or business problem. You do not need to know the exact supplier.",
        },
        {
            number: "02",
            icon: FileSearch,
            title: "We understand the requirement",
            description:
                "We clarify specifications, quantities, preferred brands, alternatives, delivery location, timeline and commercial expectations.",
        },
        {
            number: "03",
            icon: Search,
            title: "We identify sourcing routes",
            description:
                "We look across suitable supplier channels, distributors, manufacturers, wholesalers and other legitimate procurement routes.",
        },
        {
            number: "04",
            icon: ShieldCheck,
            title: "We review supplier suitability",
            description:
                "We examine available supplier information, product details, documentation, warranty information and commercial conditions.",
        },
        {
            number: "05",
            icon: BarChart3,
            title: "We compare options",
            description:
                "Quotes are evaluated beyond the headline price, including specification, warranty, availability, delivery and other relevant terms.",
        },
        {
            number: "06",
            icon: Target,
            title: "We present practical options",
            description:
                "You receive a clearer picture of the available routes, trade-offs and alternatives so you can make an informed decision.",
        },
        {
            number: "07",
            icon: CheckCircle2,
            title: "You approve the direction",
            description:
                "The preferred product, supplier or sourcing route is selected before the next procurement stage proceeds.",
        },
        {
            number: "08",
            icon: Handshake,
            title: "We coordinate",
            description:
                "We can assist with supplier communication, commercial clarification, documentation and order coordination.",
        },
        {
            number: "09",
            icon: Truck,
            title: "Delivery is coordinated",
            description:
                "Where included in the engagement, delivery expectations, locations, quantities and receiving requirements are coordinated.",
        },
        {
            number: "10",
            icon: RefreshCw,
            title: "We support the next order",
            description:
                "Procurement information can become a foundation for repeat orders, preferred vendors and future technology projects.",
        },
    ];

    const qualificationFactors = [
        {
            icon: BadgeCheck,
            title: "Supplier identity",
            text: "Understand who is actually supplying the goods or service.",
        },
        {
            icon: FileCheck2,
            title: "Documentation",
            text: "Review quotations, product descriptions and supporting documents.",
        },
        {
            icon: PackageCheck,
            title: "Product accuracy",
            text: "Confirm that the quoted configuration matches the requirement.",
        },
        {
            icon: Clock3,
            title: "Availability",
            text: "Distinguish confirmed availability from estimated availability.",
        },
        {
            icon: Truck,
            title: "Delivery",
            text: "Consider delivery destination, timing and applicable terms.",
        },
        {
            icon: ShieldCheck,
            title: "Warranty",
            text: "Review the stated warranty and applicable support arrangements.",
        },
        {
            icon: WalletCards,
            title: "Commercial terms",
            text: "Consider price, payment terms, taxes and other stated costs.",
        },
        {
            icon: Headphones,
            title: "After-sales support",
            text: "Understand what happens when something requires attention after delivery.",
        },
    ];

    const procurementScenarios = [
        {
            icon: Zap,
            label: "URGENT",
            title: "You need something quickly",
            description:
                "Your team suddenly needs laptops, networking equipment, software or other technology and you do not have time to contact multiple vendors yourself.",
            points: [
                "Fast requirement clarification",
                "Availability-focused sourcing",
                "Alternative product identification",
                "Supplier comparison",
            ],
        },
        {
            icon: BarChart3,
            label: "COMPETITIVE",
            title: "You want better commercial options",
            description:
                "You already know what you need but want multiple sourcing options before committing your organization's money.",
            points: [
                "Multi-vendor comparison",
                "Specification normalization",
                "Commercial review",
                "Alternative sourcing",
            ],
        },
        {
            icon: Building2,
            label: "INSTITUTIONAL",
            title: "You are equipping an organization",
            description:
                "You need technology for a school, company, branch network, department, project or institution.",
            points: [
                "Bulk procurement",
                "Standardized configurations",
                "Multi-location planning",
                "Deployment-aware sourcing",
            ],
        },
        {
            icon: Layers3,
            label: "PROJECT",
            title: "You are building something from scratch",
            description:
                "You are launching an office, digital business, school lab, branch, data environment or technology project and need help determining what to buy.",
            points: [
                "Requirement discovery",
                "Technology planning",
                "Procurement lists",
                "Supplier coordination",
            ],
        },
    ];

    const industries = [
        { icon: Building2, title: "Corporate", description: "Technology procurement for offices, departments, branches and growing teams." },
        { icon: Users, title: "Education", description: "Devices, networking, software and infrastructure for schools and training organizations." },
        { icon: ShieldCheck, title: "Financial Services", description: "Secure endpoints, networking, communications, backup and productivity technology." },
        { icon: HospitalIcon, title: "Healthcare", description: "Technology sourcing for administrative, operational and supporting environments." },
        { icon: Building2, title: "Government", description: "Structured technology sourcing for departments, agencies and institutions." },
        { icon: Store, title: "Retail", description: "Technology for branches, stores, back-office operations and connectivity." },
        { icon: Globe2, title: "Hospitality", description: "Connectivity, communication and operational technology for hospitality environments." },
        { icon: Wrench, title: "Construction", description: "Technology for project offices, field operations and construction teams." },
        { icon: FactoryIcon, title: "Manufacturing", description: "Infrastructure, endpoints, networking and technology for industrial environments." },
        { icon: Laptop, title: "Professional Services", description: "Workstations, software, collaboration and technology procurement for professional teams." },
        { icon: Sparkles, title: "Startups", description: "Right-sized technology procurement for companies building and scaling quickly." },
        { icon: Handshake, title: "Nonprofits", description: "Cost-conscious technology sourcing for organizations working within defined budgets." },
    ];

    const faqs = [
        { question: "Can you source a specific HP, Dell, Lenovo or Apple model?", answer: "Yes. You can provide the exact manufacturer and model you want. We can structure the request around that specification and explore suitable sourcing channels. If the exact model is unavailable, we can also identify alternatives for your approval." },
        { question: "Can you source products that are not displayed on the website?", answer: "Yes. The website is not intended to be a complete product catalog. Our sourcing service is requirement-driven. You can send us a product, specification, quantity or project requirement even when it is not listed anywhere on the website." },
        { question: "Do you only source from local suppliers?", answer: "No. Depending on the requirement, local distributors, manufacturer channels, authorized distribution routes and international sourcing options may all be considered. The appropriate route depends on price, availability, warranty, logistics and your timeline." },
        { question: "Can you handle bulk orders?", answer: "Yes. Bulk procurement is an important part of the service. We can structure larger requirements around quantities, standardized configurations, delivery locations, supplier capacity and project timelines." },
        { question: "Can you help if I do not know exactly what computer I need?", answer: "Yes. In fact, that is one of the situations where the service becomes especially useful. You can tell us what your employees, students, developers, accountants, designers or other users need to accomplish, and we can help turn that into a technology specification." },
        { question: "Can you find alternatives when my preferred product is unavailable?", answer: "Yes. We can look for alternative models or brands that meet the required performance and functional criteria. Alternatives are clearly presented as alternatives so you remain in control of the final decision." },
        { question: "Do you compare supplier quotations?", answer: "Yes. We can help organize competing quotations around comparable specifications. Price is considered alongside configuration, quantity, warranty, availability, delivery and other relevant terms." },
        { question: "Can you source software subscriptions?", answer: "Yes. Software and cloud subscriptions can be included where the required supplier and licensing arrangement is commercially appropriate." },
        { question: "Can you source networking equipment?", answer: "Yes. Networking requirements can include routers, switches, firewalls, access points, racks, structured cabling, optics, network accessories and other infrastructure components." },
        { question: "Can you equip an entire office?", answer: "Yes. We can help structure a complete technology procurement list covering computers, displays, networking, printers, collaboration equipment, power protection, accessories, software and related infrastructure." },
        { question: "Can you help with recurring procurement?", answer: "Yes. Repeat purchases can be organized into recurring procurement workflows, preferred-vendor lists and standardized configurations." },
        { question: "Do you guarantee every supplier is authorized?", answer: "We do not make blanket claims without evidence. Supplier suitability and authorization are reviewed based on the information available for the specific sourcing exercise. Where something cannot be independently established, it should be treated as requiring confirmation." },
        { question: "What happens after I submit a sourcing request?", answer: "We review the requirement, identify missing information where necessary, determine appropriate sourcing routes and work toward presenting practical options. The exact workflow depends on the size and complexity of the request." },
        { question: "Can you help with technology projects from scratch?", answer: "Yes. You can start with a business objective rather than a shopping list. For example, if you are opening a new office, building a computer lab or deploying technology to several branches, we can help turn the project into a structured procurement requirement." },
    ];

    const filteredServices = useMemo(() => {
        return sourcingServices.filter((service) => {
            const categoryMatch =
                activeCategory === "All" || service.category === activeCategory;

            const searchable =
                `${service.title} ${service.description} ${service.category} ${service.examples.join(
                    " "
                )}`.toLowerCase();

            return categoryMatch && searchable.includes(searchTerm.toLowerCase());
        });
    }, [activeCategory, searchTerm]);

    function openService(service) {
        setSelectedService(service);
        startSupportChat(
            `I'd like to source: ${service.title}. ${service.description} Examples: ${service.examples.join(", ")}.`,
            {
                Source: "Suppliers & Vendor Sourcing",
                Service: service.title,
                Category: service.category,
            }
        );
    }

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white">

            {/* HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200 dark:border-white/10">
                <div className="absolute inset-0 -z-20 bg-slate-50 dark:bg-slate-950" />
                <div className="absolute -left-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/10" />
                <div className="absolute -right-40 top-20 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/10" />
                <div className="absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(circle_at_30%_10%,rgba(14,165,233,.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,.10),transparent_32%)] dark:bg-[radial-gradient(circle_at_30%_10%,rgba(14,165,233,.13),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,.13),transparent_32%)]" />

                <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-32">
                    <div className="flex flex-col justify-center">
                        <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.04] dark:text-sky-300">
                            <Handshake className="h-4 w-4" />
                            Suppliers & Vendor Sourcing
                        </div>

                        <h1 className="max-w-5xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                            The right technology
                            <span className="block bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-blue-300 dark:to-indigo-300">
                                starts with the right source.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                            We help businesses, institutions and project teams find,
                            compare and coordinate technology suppliers — from one urgent
                            laptop requirement to large-scale procurement projects.
                        </p>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-500 dark:text-slate-400">
                            You do not have to know the supplier, distributor, model or
                            complete specification before contacting us. Start with what
                            you are trying to accomplish and we can help turn it into a
                            practical sourcing requirement.
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to start a sourcing request. Here's what I need:",
                                        {
                                            Source: "Suppliers & Vendor Sourcing",
                                            Stage: "Hero — start request",
                                        }
                                    )
                                }
                                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-7 py-4 font-black text-white shadow-2xl shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                Start a sourcing request
                                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to understand how your supplier sourcing process works before submitting a request.",
                                        {
                                            Source: "Suppliers & Vendor Sourcing",
                                            Stage: "Hero — process query",
                                        }
                                    )
                                }
                                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-7 py-4 font-black backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                            >
                                See how it works
                            </button>
                        </div>

                        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                ["12+", "technology categories"],
                                ["10", "structured stages"],
                                ["B2B", "procurement focused"],
                                ["A–Z", "project support"],
                            ].map(([number, label]) => (
                                <button
                                    type="button"
                                    key={label}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to know more about "${label}" in your supplier sourcing service.`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                Highlight: label,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-left backdrop-blur transition hover:border-sky-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                >
                                    <div className="text-2xl font-black">{number}</div>
                                    <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        {label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative flex items-center">
                        <div className="absolute -inset-10 rounded-[4rem] bg-sky-400/10 blur-3xl dark:bg-sky-500/10" />
                        <div className="relative w-full rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30 sm:p-7">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                                <div>
                                    <div className="text-xs font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                                        Procurement desk
                                    </div>
                                    <div className="mt-1 text-xl font-black">
                                        One requirement.
                                        <br />
                                        Multiple sourcing routes.
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                    <Radar className="h-6 w-6" />
                                </div>
                            </div>

                            <div className="space-y-3 py-6">
                                {[
                                    { icon: ClipboardCheck, title: "Requirement", value: "50 business laptops + accessories" },
                                    { icon: Globe2, title: "Sourcing", value: "Local + distribution + international routes" },
                                    { icon: BarChart3, title: "Comparison", value: "Specification • price • warranty • delivery" },
                                    { icon: BadgeCheck, title: "Decision", value: "Clear options before commitment" },
                                ].map(({ icon: Icon, title, value }) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the procurement desk stage: "${title}" — ${value}`,
                                                {
                                                    Source: "Suppliers & Vendor Sourcing",
                                                    "Desk stage": title,
                                                }
                                            )
                                        }
                                        className="flex w-full gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-sky-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                    >
                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-800">
                                            <Icon className="h-5 w-5 text-sky-600 dark:text-sky-300" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black">{title}</div>
                                            <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {value}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'm starting a technology sourcing requirement from scratch. Can you help me turn it into a procurement plan?",
                                        {
                                            Source: "Suppliers & Vendor Sourcing",
                                            Stage: "Hero — from scratch",
                                        }
                                    )
                                }
                                className="w-full rounded-2xl bg-slate-950 p-5 text-left text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                <div className="flex gap-3">
                                    <Sparkles className="mt-1 h-5 w-5 shrink-0" />
                                    <div>
                                        <div className="font-black">Starting from scratch?</div>
                                        <p className="mt-2 text-sm leading-6 opacity-75">
                                            Tell us what you are building, how many people or sites
                                            are involved, and what you need the technology to do.
                                            We can help turn that into a procurement plan.
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                    {[
                        { icon: ShieldCheck, title: "Structured sourcing", text: "Requirements are organized before comparison." },
                        { icon: BadgeCheck, title: "Evidence-led", text: "We separate confirmed information from items requiring confirmation." },
                        { icon: Layers3, title: "End-to-end", text: "Sourcing can connect to deployment and support." },
                        { icon: Handshake, title: "Vendor-neutral", text: "The goal is the right fit, not simply the first quote." },
                    ].map(({ icon: Icon, title, text }) => (
                        <button
                            type="button"
                            key={title}
                            onClick={() =>
                                startSupportChat(
                                    `I'd like to know more about "${title}": ${text}`,
                                    {
                                        Source: "Suppliers & Vendor Sourcing",
                                        Highlight: title,
                                    }
                                )
                            }
                            className="flex gap-4 rounded-2xl p-4 text-left transition hover:bg-slate-50 dark:hover:bg-white/[0.035]"
                        >
                            <Icon className="mt-1 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-300" />
                            <div>
                                <div className="font-black">{title}</div>
                                <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {text}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* INTRO */}
            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,.07),transparent_40%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,.08),transparent_40%)]" />
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                                More than a supplier list
                            </div>
                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                We help you navigate the technology market.
                            </h2>
                        </div>
                        <div className="space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                Finding a product is easy. Finding the right product from an
                                appropriate supplier, at a commercially sensible price, with
                                suitable warranty and realistic availability, can be much
                                harder.
                            </p>
                            <p>
                                Our sourcing service is designed to bridge that gap. Instead
                                of treating procurement as a simple shopping exercise, we
                                approach it as a structured business process.
                            </p>
                            <p>
                                That means we can help from the very beginning — even when all
                                you have is an idea, a budget, a deadline or a business need.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE DIRECTORY */}
            <section
                id="services"
                className="border-y border-slate-200 bg-slate-100/70 py-24 dark:border-white/10 dark:bg-slate-900/60 lg:py-32"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                            Sourcing capabilities
                        </div>
                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Source across the technology stack.
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            From everyday business computers to enterprise infrastructure,
                            software, security and cloud services, we can structure sourcing
                            around your actual requirement.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 lg:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search sourcing capabilities..."
                                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                            />
                        </div>
                        <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-bold dark:border-white/10 dark:bg-white/[0.04] lg:hidden"
                        >
                            Categories
                            <ChevronDown
                                className={`h-4 w-4 transition ${mobileServicesOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>

                    <div className={`mt-5 flex-wrap gap-2 ${mobileServicesOpen ? "flex" : "hidden"} lg:flex`}>
                        {supplierCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setMobileServicesOpen(false);
                                    startSupportChat(
                                        `I'd like to source from the "${category}" category.`,
                                        {
                                            Source: "Suppliers & Vendor Sourcing",
                                            "Category filter": category,
                                        }
                                    );
                                }}
                                className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeCategory === category
                                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:text-sky-300"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredServices.map((service) => {
                            const Icon = service.icon;
                            return (
                                <article
                                    key={service.id}
                                    className="group flex flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.055]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                                            {service.category}
                                        </div>
                                    </div>

                                    <h3 className="mt-7 text-xl font-black">{service.title}</h3>

                                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {service.description}
                                    </p>

                                    <div className="mt-6 space-y-2">
                                        {service.examples.map((example) => (
                                            <div
                                                key={example}
                                                className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                                            >
                                                <Check className="h-4 w-4 text-sky-500" />
                                                {example}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => openService(service)}
                                        className="mt-7 inline-flex items-center gap-2 text-sm font-black text-sky-700 transition hover:gap-3 dark:text-sky-300"
                                    >
                                        Source this category
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </article>
                            );
                        })}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-white/[0.03]">
                            <Search className="mx-auto h-10 w-10 text-slate-400" />
                            <h3 className="mt-5 text-xl font-black">No matching sourcing category</h3>
                            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Your requirement may still be something we can help with.
                                Submit the request directly and describe what you need.
                            </p>
                            <button
                                onClick={() =>
                                    startSupportChat(
                                        "I have a custom sourcing requirement that isn't in your standard categories.",
                                        {
                                            Source: "Suppliers & Vendor Sourcing",
                                            Stage: "Custom requirement",
                                        }
                                    )
                                }
                                className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"
                            >
                                Submit custom requirement
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* WHY SOURCING */}
            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                                Why structured sourcing matters
                            </div>
                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                The lowest quote is not always the lowest total cost.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Two suppliers can quote apparently similar products while
                                offering very different configurations, warranties,
                                availability, delivery conditions and after-sales support.
                            </p>
                            <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
                                Our approach is designed to make those differences visible
                                before you commit to a procurement decision.
                            </p>
                            <button
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss a sourcing requirement and how you compare total value beyond the headline price.",
                                        {
                                            Source: "Suppliers & Vendor Sourcing",
                                            Stage: "Value discussion",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-black text-white dark:bg-white dark:text-slate-950"
                            >
                                Discuss a requirement
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {qualificationFactors.map(({ icon: Icon, title, text }) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the qualification factor: ${title} — ${text}`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                "Qualification factor": title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/[0.06] dark:text-slate-200">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 font-black">{title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DARK QUALIFICATION */}
            <section className="relative overflow-hidden bg-slate-950 py-24 text-white dark:bg-black lg:py-32">
                <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-300">
                                Vendor intelligence
                            </div>
                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Before comparing suppliers, understand what you are actually comparing.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                Procurement becomes clearer when the requirement is consistent
                                and the supplier information is presented in a way that makes
                                meaningful comparison possible.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { title: "Same requirement", text: "Suppliers should be compared against the same baseline specification." },
                                { title: "Same quantity", text: "A unit price means little if quantities or included items differ." },
                                { title: "Same scope", text: "Accessories, software, installation and delivery should be considered." },
                                { title: "Clear assumptions", text: "Unknown or unverified information should remain clearly identified." },
                                { title: "Warranty visibility", text: "Warranty terms can materially affect the real value of a purchase." },
                                { title: "Delivery visibility", text: "An attractive quote is less useful if delivery cannot meet the project timeline." },
                                { title: "Alternative options", text: "Equivalent solutions can create additional choices when preferred products are unavailable." },
                                { title: "Approval control", text: "The final purchasing direction remains with the customer." },
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss vendor intelligence: ${item.title} — ${item.text}`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                "Vendor intelligence": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-left transition hover:border-sky-400/30 hover:bg-white/[0.08]"
                                >
                                    <div className="flex gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                                        <div>
                                            <h3 className="font-black">{item.title}</h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section id="how-it-works" className="relative py-24 lg:py-32">
                <div className="absolute inset-x-0 top-1/2 -z-10 h-[30rem] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,.06),transparent_65%)]" />
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                            How we work
                        </div>
                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            From “we need this” to a procurement-ready path.
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            A disciplined workflow helps separate the business requirement
                            from the supplier response and makes the procurement decision
                            easier to understand.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {sourcingProcess.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to understand the sourcing step: "${item.title}" — ${item.description}`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                Step: `${item.number} — ${item.title}`,
                                            }
                                        )
                                    }
                                    className="group relative rounded-3xl border border-slate-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black tracking-[0.2em] text-sky-600 dark:text-sky-300">
                                            {item.number}
                                        </span>
                                        <Icon className="h-5 w-5 text-slate-300 transition group-hover:text-sky-500" />
                                    </div>
                                    <h3 className="mt-6 text-lg font-black">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SCENARIOS */}
            <section className="border-y border-slate-200 bg-slate-100/70 py-24 dark:border-white/10 dark:bg-slate-900/50 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                            Built for real procurement situations
                        </div>
                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Different requirement. Same disciplined approach.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-2">
                        {procurementScenarios.map((scenario) => {
                            const Icon = scenario.icon;
                            return (
                                <article
                                    key={scenario.title}
                                    className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black tracking-[0.18em] text-sky-600 dark:text-sky-300">
                                                {scenario.label}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I'd like to discuss this procurement scenario: ${scenario.title}. ${scenario.description}`,
                                                        {
                                                            Source: "Suppliers & Vendor Sourcing",
                                                            Scenario: scenario.title,
                                                            Label: scenario.label,
                                                        }
                                                    )
                                                }
                                                className="mt-2 text-2xl font-black hover:text-sky-700 dark:hover:text-sky-300"
                                            >
                                                {scenario.title}
                                            </button>
                                        </div>
                                    </div>

                                    <p className="mt-6 leading-7 text-slate-500 dark:text-slate-400">
                                        {scenario.description}
                                    </p>

                                    <div className="mt-7 grid gap-2 sm:grid-cols-2">
                                        {scenario.points.map((point) => (
                                            <button
                                                type="button"
                                                key={point}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `In the "${scenario.title}" scenario, I'd like to discuss: ${point}.`,
                                                        {
                                                            Source: "Suppliers & Vendor Sourcing",
                                                            Scenario: scenario.title,
                                                            "Scenario point": point,
                                                        }
                                                    )
                                                }
                                                className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-left text-sm font-semibold transition hover:bg-sky-50 dark:bg-white/[0.04] dark:hover:bg-sky-400/10"
                                            >
                                                <Check className="h-4 w-4 text-sky-500" />
                                                {point}
                                            </button>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* COMPLETE OFFICE */}
            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
                        <div className="grid lg:grid-cols-[.75fr_1.25fr]">
                            <div className="relative overflow-hidden bg-slate-950 p-8 text-white dark:bg-black lg:p-12">
                                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
                                <div className="relative">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                                        <Building2 className="h-6 w-6 text-sky-300" />
                                    </div>
                                    <h2 className="mt-8 text-3xl font-black">
                                        Equipping an entire organization?
                                    </h2>
                                    <p className="mt-5 leading-7 text-slate-300">
                                        We can help break a large requirement into logical
                                        procurement categories instead of treating everything as
                                        one generic shopping list.
                                    </p>
                                    <button
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to plan a complete technology procurement requirement for our organization.",
                                                {
                                                    Source: "Suppliers & Vendor Sourcing",
                                                    Stage: "Complete office plan",
                                                }
                                            )
                                        }
                                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-black text-slate-950"
                                    >
                                        Plan the requirement
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2">
                                {[
                                    { icon: Laptop, title: "Endpoints", text: "Laptops, desktops, workstations and mobile devices." },
                                    { icon: Network, title: "Connectivity", text: "Routers, switches, wireless and structured network equipment." },
                                    { icon: ShieldCheck, title: "Security", text: "Security appliances, endpoint protection and access technology." },
                                    { icon: Cloud, title: "Software & Cloud", text: "Business software, subscriptions, cloud and hosting services." },
                                    { icon: Package, title: "Accessories", text: "Displays, docks, cables, adapters and peripherals." },
                                    { icon: Zap, title: "Power", text: "UPS, backup systems and technology power protection." },
                                ].map(({ icon: Icon, title, text }) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to source "${title}" as part of a complete office setup: ${text}`,
                                                {
                                                    Source: "Suppliers & Vendor Sourcing",
                                                    "Office category": title,
                                                }
                                            )
                                        }
                                        className="border-b border-slate-200 p-7 text-left transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/[0.035]"
                                    >
                                        <Icon className="h-6 w-6 text-sky-600 dark:text-sky-300" />
                                        <h3 className="mt-5 font-black">{title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="border-y border-slate-200 bg-white py-24 dark:border-white/10 dark:bg-slate-900/40 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                            Industries
                        </div>
                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                            Procurement shaped around the environment.
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Different industries have different requirements, budgets,
                            operating conditions and technology priorities.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {industries.map((industry) => {
                            const Icon = industry.icon;
                            return (
                                <button
                                    type="button"
                                    key={industry.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss sourcing for the ${industry.title} industry: ${industry.description}`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                Industry: industry.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.05]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 text-lg font-black">{industry.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {industry.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* INTERNATIONAL SOURCING */}
            <section className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_40%,rgba(14,165,233,.08),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(99,102,241,.08),transparent_30%)]" />
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                <Globe2 className="h-6 w-6" />
                            </div>
                            <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
                                Local when practical.
                                <span className="block text-sky-600 dark:text-sky-300">
                                    International when appropriate.
                                </span>
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Some products are easier to obtain through local distributors.
                                Others may require manufacturer channels, international
                                distributors or alternative sourcing routes.
                            </p>
                            <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
                                We consider the sourcing route alongside availability,
                                logistics, warranty, lead time, commercial terms and the
                                customer's requirements.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: MapPin, title: "Local sourcing", text: "Useful when speed, local support and straightforward delivery are important." },
                                { icon: Globe2, title: "International sourcing", text: "Useful when a product, configuration or commercial opportunity is difficult to obtain locally." },
                                { icon: Truck, title: "Logistics awareness", text: "International sourcing requires attention to shipping, timing, documentation and landed cost." },
                                { icon: ShieldCheck, title: "Warranty awareness", text: "Warranty and after-sales implications should be understood before selecting an international route." },
                            ].map(({ icon: Icon, title, text }) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${title}: ${text}`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                "Sourcing topic": title,
                                            }
                                        )
                                    }
                                    className="flex w-full gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-sky-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.06]">
                                        <Icon className="h-5 w-5 text-sky-600 dark:text-sky-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-black">{title}</h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
                        <div className="grid lg:grid-cols-[.7fr_1.3fr]">
                            <div className="bg-slate-950 p-8 text-white dark:bg-black lg:p-12">
                                <BarChart3 className="h-8 w-8 text-sky-300" />
                                <h2 className="mt-7 text-3xl font-black">
                                    Compare more than price.
                                </h2>
                                <p className="mt-5 leading-7 text-slate-300">
                                    A structured procurement comparison helps expose important
                                    differences between supplier proposals.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2">
                                {[
                                    ["Unit price", "Compare the quoted cost per unit."],
                                    ["Configuration", "Confirm processor, memory, storage, display and other requirements."],
                                    ["Quantity", "Make sure suppliers are quoting the same quantity."],
                                    ["Warranty", "Review stated warranty coverage and terms."],
                                    ["Availability", "Separate confirmed stock from estimated availability."],
                                    ["Delivery", "Consider timing, destination and delivery terms."],
                                    ["Accessories", "Check whether required accessories are included."],
                                    ["Additional costs", "Identify stated exclusions, fees or other commercial conditions."],
                                ].map(([title, text]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss comparison criteria: ${title} — ${text}`,
                                                {
                                                    Source: "Suppliers & Vendor Sourcing",
                                                    "Comparison criteria": title,
                                                }
                                            )
                                        }
                                        className="border-b border-slate-200 p-6 text-left transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/[0.035]"
                                    >
                                        <h3 className="font-black">{title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REPEAT PROCUREMENT */}
            <section className="border-y border-slate-200 bg-slate-100/60 py-24 dark:border-white/10 dark:bg-slate-900/50 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                                Beyond the first order
                            </div>
                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                                Build a procurement system, not just a transaction.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Organizations often purchase the same categories of technology
                                repeatedly. Standardizing preferred configurations and
                                supplier information can make future procurement more
                                predictable.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { icon: RefreshCw, title: "Repeat orders", text: "Make future purchasing easier by keeping successful requirements organized." },
                                { icon: Users, title: "Preferred vendors", text: "Maintain a shortlist of suppliers that have performed well for your requirements." },
                                { icon: PackageCheck, title: "Standard configurations", text: "Reduce unnecessary variation across employee or institutional devices." },
                                { icon: ClipboardCheck, title: "Procurement records", text: "Keep important product, supplier, warranty and delivery information accessible." },
                            ].map(({ icon: Icon, title, text }) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${title}: ${text}`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                "Repeat procurement": title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-sky-400/30"
                                >
                                    <Icon className="h-6 w-6 text-sky-600 dark:text-sky-300" />
                                    <h3 className="mt-5 font-black">{title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE NEED FROM YOU */}
            <section className="py-24 lg:py-32">
                <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-slate-900 lg:p-12">
                        <div className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                                <ClipboardCheck className="h-7 w-7" />
                            </div>
                            <h2 className="mt-7 text-3xl font-black sm:text-4xl">
                                You do not need a perfect procurement brief.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500 dark:text-slate-400">
                                Give us whatever information you already have. The more
                                detail you provide, the easier it is to make the sourcing
                                exercise precise, but we can help identify the missing pieces.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {[
                                ["What you need", "Laptop, server, network, software, office setup, etc."],
                                ["Quantity", "One item, ten devices, hundreds of units or multiple sites."],
                                ["Specification", "Exact model if known, or simply what the equipment needs to do."],
                                ["Budget", "A target budget or commercial range if available."],
                                ["Timeline", "When the technology is required."],
                                ["Location", "Where the products or services need to be delivered."],
                                ["Preferred brand", "Optional. Tell us if a specific manufacturer is required."],
                                ["Business purpose", "Especially useful when you are unsure which product to choose."],
                            ].map(([title, text]) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Procurement brief item — ${title}: ${text}`,
                                            {
                                                Source: "Suppliers & Vendor Sourcing",
                                                "Brief item": title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl bg-slate-50 p-5 text-left transition hover:bg-sky-50 dark:bg-white/[0.04] dark:hover:bg-sky-400/10"
                                >
                                    <div className="font-black">{title}</div>
                                    <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {text}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-9 text-center">
                            <button
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to start a sourcing request with what I know so far.",
                                        {
                                            Source: "Suppliers & Vendor Sourcing",
                                            Stage: "Start with what you know",
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-black text-white dark:bg-white dark:text-slate-950"
                            >
                                Start with what you know
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SUPPLIER NETWORK CTA */}
            <section className="relative overflow-hidden bg-slate-950 py-24 text-white dark:bg-black lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,.15),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,.13),transparent_30%)]" />
                <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-6">
                    <Globe2 className="mx-auto h-9 w-9 text-sky-300" />
                    <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
                        Looking for a dependable sourcing partner?
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                        Whether you need one product, a recurring supply relationship or
                        a complete technology procurement project, start with the
                        requirement and let us structure the next step.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request sourcing support. Here's what I need:",
                                    {
                                        Source: "Suppliers & Vendor Sourcing",
                                        Stage: "Supplier network CTA — request",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-slate-950 transition hover:bg-slate-100"
                        >
                            Request sourcing
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <button
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to register as a supplier / vendor in your network.",
                                    {
                                        Source: "Suppliers & Vendor Sourcing",
                                        Stage: "Supplier network CTA — apply",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-4 font-black text-white transition hover:bg-white/[0.1]"
                        >
                            Become a supplier
                            <Handshake className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-slate-200 bg-slate-100/60 py-24 dark:border-white/10 dark:bg-slate-900/50 lg:py-32">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-sm font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                            Frequently asked questions
                        </div>
                        <h2 className="mt-4 text-4xl font-black tracking-tight">
                            Supplier sourcing, explained.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between gap-5 p-5 text-left font-bold"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 text-sm leading-7 text-slate-500 dark:border-white/10 dark:text-slate-400">
                                            <p>{faq.answer}</p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source: "Suppliers & Vendor Sourcing",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-sky-700 hover:gap-3 dark:text-sky-300"
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
            <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-blue-700 to-indigo-800 py-24 text-white lg:py-28">
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6">
                    <Sparkles className="mx-auto h-8 w-8 text-sky-100" />
                    <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
                        Tell us what you need.
                        <span className="block text-sky-100">
                            We will help structure the sourcing.
                        </span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-sky-50/90">
                        Start with a product, a specification, a quantity, a deadline,
                        a project or simply a business problem. We can help turn it into
                        a practical procurement requirement.
                    </p>

                    <button
                        onClick={() =>
                            startSupportChat(
                                "I'd like to start a sourcing request. Here's what I need:",
                                {
                                    Source: "Suppliers & Vendor Sourcing",
                                    Stage: "Final CTA — start request",
                                }
                            )
                        }
                        className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-black text-slate-950 shadow-2xl transition hover:-translate-y-1 hover:bg-slate-100"
                    >
                        Start a sourcing request
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </section>

            {/* SOURCING REQUEST MODAL */}
            {showRequestModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-8">
                        <div className="flex items-start justify-between gap-5">
                            <div>
                                <div className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                                    Procurement request
                                </div>
                                <h2 className="mt-2 text-3xl font-black">
                                    Tell us what you need
                                </h2>
                                {selectedService && (
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Starting category: <strong>{selectedService.title}</strong>
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    setShowRequestModal(false);
                                    setSelectedService(null);
                                }}
                                className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-white/[0.08]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleRequestSubmit}>
                            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                <label className="text-sm font-black">
                                    Full name
                                    <input
                                        value={requestName}
                                        onChange={(e) => setRequestName(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="Your name"
                                    />
                                </label>

                                <label className="text-sm font-black">
                                    Company / organization
                                    <input
                                        value={requestOrg}
                                        onChange={(e) => setRequestOrg(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="Company name"
                                    />
                                </label>

                                <label className="text-sm font-black">
                                    Email
                                    <input
                                        type="email"
                                        value={requestEmail}
                                        onChange={(e) => setRequestEmail(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="name@company.com"
                                    />
                                </label>

                                <label className="text-sm font-black">
                                    Phone
                                    <input
                                        value={requestPhone}
                                        onChange={(e) => setRequestPhone(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="Phone number"
                                    />
                                </label>

                                <label className="text-sm font-black">
                                    Quantity
                                    <input
                                        value={requestQuantity}
                                        onChange={(e) => setRequestQuantity(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="e.g. 50"
                                    />
                                </label>

                                <label className="text-sm font-black">
                                    Required timeline
                                    <input
                                        value={requestTimeline}
                                        onChange={(e) => setRequestTimeline(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="e.g. 2 weeks"
                                    />
                                </label>

                                <label className="text-sm font-black sm:col-span-2">
                                    What are you sourcing?
                                    <textarea
                                        rows={5}
                                        required
                                        value={requestDescription}
                                        onChange={(e) => setRequestDescription(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="Tell us about the product, specification, project or business requirement..."
                                    />
                                </label>

                                <label className="text-sm font-black sm:col-span-2">
                                    Additional requirements
                                    <textarea
                                        rows={4}
                                        value={requestAdditional}
                                        onChange={(e) => setRequestAdditional(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                        placeholder="Preferred brand, budget, location, warranty requirements, delivery information, etc."
                                    />
                                </label>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowRequestModal(false);
                                        setSelectedService(null);
                                    }}
                                    className="rounded-xl border border-slate-200 px-5 py-3 font-black dark:border-white/10"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-black text-white dark:bg-white dark:text-slate-950"
                                >
                                    Send sourcing request
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* SUPPLIER APPLICATION MODAL */}
            {showSupplierModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                                    Supplier network
                                </div>
                                <h2 className="mt-2 text-3xl font-black">
                                    Become a supplier
                                </h2>
                            </div>

                            <button
                                onClick={() => setShowSupplierModal(false)}
                                className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="mt-5 leading-7 text-slate-500 dark:text-slate-400">
                            If your company supplies technology products or services and you
                            are interested in future sourcing opportunities, you can submit
                            your business information for consideration.
                        </p>

                        <div className="mt-7 space-y-5">
                            <label className="block text-sm font-black">
                                Company name
                                <input
                                    value={supplierCompany}
                                    onChange={(e) => setSupplierCompany(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                    placeholder="Company name"
                                />
                            </label>

                            <label className="block text-sm font-black">
                                Contact person
                                <input
                                    value={supplierContact}
                                    onChange={(e) => setSupplierContact(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                    placeholder="Full name"
                                />
                            </label>

                            <label className="block text-sm font-black">
                                Business email
                                <input
                                    type="email"
                                    value={supplierEmail}
                                    onChange={(e) => setSupplierEmail(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                    placeholder="business@example.com"
                                />
                            </label>

                            <label className="block text-sm font-black">
                                Products / services supplied
                                <textarea
                                    rows={4}
                                    value={supplierProducts}
                                    onChange={(e) => setSupplierProducts(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                    placeholder="Tell us what your company supplies..."
                                />
                            </label>

                            <label className="block text-sm font-black">
                                Additional information
                                <textarea
                                    rows={4}
                                    value={supplierAdditional}
                                    onChange={(e) => setSupplierAdditional(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
                                    placeholder="Locations served, brands, distribution capabilities, certifications, etc."
                                />
                            </label>
                        </div>

                        <button
                            onClick={handleSupplierSubmit}
                            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-black text-white dark:bg-white dark:text-slate-950"
                        >
                            Submit supplier information
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

        </main>
    );
}

/* LOCAL ICON FALLBACK COMPONENTS */
function HospitalIcon({ className = "" }) {
    return (
        <div className={`relative ${className}`}>
            <Building2 className="h-full w-full" />
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="h-1/2 w-1/6 rounded-sm bg-current opacity-70" />
            </span>
        </div>
    );
}

function FactoryIcon({ className = "" }) {
    return (
        <div className={`relative ${className}`}>
            <Building2 className="h-full w-full" />
        </div>
    );
}