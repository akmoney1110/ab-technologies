import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";

import {
    Search,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    MessageCircle,
    Mail,
    Phone,
    ShieldCheck,
    Package,
    Cpu,
    Network,
    Cloud,
    Bot,
    Lock,
    GraduationCap,
    Building2,
    ShoppingBag,
    Truck,
    Users,
    CheckCircle2,
    HelpCircle,
    Sparkles,
    FileText,
    Globe2,
    Settings,
    Zap,
    Headphones,
    Database,
    Server,
    Laptop,
    Monitor,
    Smartphone,
    Boxes,
    BadgeCheck,
    Clock3,
    CircleHelp,
    ExternalLink,
    Filter,
    X,
} from "lucide-react";

const categories = [
    {
        id: "all",
        label: "All Questions",
        icon: HelpCircle,
    },
    {
        id: "general",
        label: "General",
        icon: Building2,
    },
    {
        id: "procurement",
        label: "Procurement",
        icon: Package,
    },
    {
        id: "hardware",
        label: "Hardware",
        icon: Cpu,
    },
    {
        id: "software",
        label: "Software",
        icon: Settings,
    },
    {
        id: "networking",
        label: "Networking",
        icon: Network,
    },
    {
        id: "cloud",
        label: "Cloud & IT",
        icon: Cloud,
    },
    {
        id: "ai",
        label: "AI & Automation",
        icon: Bot,
    },
    {
        id: "security",
        label: "Security",
        icon: Lock,
    },
    {
        id: "training",
        label: "Training",
        icon: GraduationCap,
    },
    {
        id: "marketplace",
        label: "Tech Market",
        icon: ShoppingBag,
    },
    {
        id: "delivery",
        label: "Delivery",
        icon: Truck,
    },
];

const faqs = [
    {
        id: 1,
        category: "general",
        question: "What does AB TECHNOLOGIES do?",
        answer:
            "AB TECHNOLOGIES provides technology products, services, procurement, software, infrastructure, managed IT, digital transformation and technology advisory solutions for businesses, institutions, organizations and individuals. Our approach combines technology sourcing, implementation and ongoing support so clients can solve technology needs through one reliable partner.",
        tags: ["company", "services", "overview"],
        featured: true,
    },
    {
        id: 2,
        category: "general",
        question: "Who can work with AB TECHNOLOGIES?",
        answer:
            "We work with startups, growing businesses, enterprises, schools, universities, healthcare organizations, government and public-sector institutions, NGOs, development organizations, manufacturers, retailers, hospitality businesses and other organizations that need technology products or services.",
        tags: ["business", "organizations", "clients"],
        featured: true,
    },
    {
        id: 3,
        category: "general",
        question: "Do you only sell technology products?",
        answer:
            "No. Product supply is only one part of our model. We also provide software development, technology implementation, infrastructure, networking, cloud services, cybersecurity, automation, AI solutions, managed IT support, procurement services, training and technology advisory.",
        tags: ["products", "services"],
        featured: true,
    },
    {
        id: 4,
        category: "general",
        question: "Can AB TECHNOLOGIES handle an entire technology project?",
        answer:
            "Yes. Depending on the project, we can support requirements gathering, product selection, sourcing, quotations, procurement, configuration, deployment, integration, documentation, training and ongoing support.",
        tags: ["project", "deployment", "support"],
    },
    {
        id: 5,
        category: "general",
        question: "Do you provide technology consultation?",
        answer:
            "Yes. We can help organizations understand what they actually need before they purchase or implement technology. This can include infrastructure planning, hardware recommendations, software selection, cloud planning, security considerations, procurement strategy and digital transformation planning.",
        tags: ["consulting", "advisory"],
    },

    {
        id: 6,
        category: "procurement",
        question: "What technology procurement services do you provide?",
        answer:
            "Our procurement capabilities can cover hardware sourcing, software licensing, networking equipment, servers, storage, endpoint devices, accessories, cloud services, infrastructure components and other technology requirements. We can also help coordinate sourcing, quotation comparison, verification and delivery.",
        tags: ["procurement", "sourcing", "purchasing"],
        featured: true,
    },
    {
        id: 7,
        category: "procurement",
        question: "Can you handle bulk technology procurement?",
        answer:
            "Yes. We can support bulk and corporate procurement requirements where an organization needs multiple devices or technology products. This may include laptops, desktops, monitors, printers, networking equipment, accessories and other IT assets.",
        tags: ["bulk", "corporate", "procurement"],
        featured: true,
    },
    {
        id: 8,
        category: "procurement",
        question: "Can you source products that are not listed on your website?",
        answer:
            "Yes. The online catalog is not intended to represent every product available through our sourcing network. If you have a specific model, specification, brand or technical requirement, you can submit the requirement and we can assess sourcing options.",
        tags: ["sourcing", "products"],
    },
    {
        id: 9,
        category: "procurement",
        question: "Can you source technology internationally?",
        answer:
            "International sourcing may be available depending on the product, supplier, destination, quantity, availability, shipping requirements and applicable regulations. We can help evaluate sourcing options and coordinate procurement requirements.",
        tags: ["international", "sourcing"],
    },
    {
        id: 10,
        category: "procurement",
        question: "Can you compare quotations from different suppliers?",
        answer:
            "Yes. Competitive quotation analysis can compare factors such as unit price, specifications, warranty, supplier reliability, availability, lead time and delivery considerations rather than simply selecting the cheapest quotation.",
        tags: ["quotation", "suppliers", "comparison"],
    },
    {
        id: 11,
        category: "procurement",
        question: "Can you help organizations prepare procurement specifications?",
        answer:
            "Yes. We can help translate business requirements into practical technical specifications. This can make procurement clearer and reduce the risk of buying products that do not adequately meet the organization's needs.",
        tags: ["specifications", "procurement"],
    },
    {
        id: 12,
        category: "procurement",
        question: "Can you help with institutional procurement?",
        answer:
            "Yes. Institutional projects may involve schools, universities, healthcare organizations, government entities, NGOs and other organizations with larger or structured technology requirements. We can help organize requirements, product schedules, quotations and deployment considerations.",
        tags: ["institution", "government", "schools"],
    },

    {
        id: 13,
        category: "hardware",
        question: "What types of hardware can you source?",
        answer:
            "Hardware requirements can include laptops, desktops, workstations, monitors, servers, storage devices, printers, scanners, tablets, smartphones, networking equipment, UPS systems, accessories, peripherals and other business technology equipment.",
        tags: ["hardware", "devices"],
        featured: true,
    },
    {
        id: 14,
        category: "hardware",
        question: "Can you recommend the right laptop for my organization?",
        answer:
            "Yes. Laptop recommendations should be based on workload rather than brand alone. We can consider processor class, memory, storage, display, battery, portability, operating system, warranty, security features and budget.",
        tags: ["laptop", "recommendation"],
    },
    {
        id: 15,
        category: "hardware",
        question: "Can you supply computers for an entire office?",
        answer:
            "Yes. We can help structure device requirements based on departments or employee roles. Different users may require different configurations, allowing organizations to avoid overspending on high-performance equipment where it is unnecessary.",
        tags: ["office", "computers", "employees"],
    },
    {
        id: 16,
        category: "hardware",
        question: "Can you provide monitors and accessories with computers?",
        answer:
            "Yes. A procurement requirement can include monitors, keyboards, mice, docking stations, laptop bags, webcams, headsets, power accessories, surge protection and other peripherals.",
        tags: ["accessories", "monitors"],
    },
    {
        id: 17,
        category: "hardware",
        question: "Can you source servers?",
        answer:
            "Yes. Server requirements can be assessed according to workload, virtualization requirements, storage, memory, CPU capacity, redundancy, networking, operating system and expected growth.",
        tags: ["servers", "infrastructure"],
    },
    {
        id: 18,
        category: "hardware",
        question: "Can you help verify hardware before delivery?",
        answer:
            "Where the procurement arrangement permits it, product verification can include checking model information, quantities, specifications, packaging and other agreed procurement criteria before final delivery or deployment.",
        tags: ["verification", "quality"],
    },

    {
        id: 19,
        category: "software",
        question: "Does AB TECHNOLOGIES develop custom software?",
        answer:
            "Yes. We can design and develop web applications, business systems, internal platforms, dashboards, portals, workflow systems, APIs and other custom digital solutions based on a client's requirements.",
        tags: ["software", "development"],
        featured: true,
    },
    {
        id: 20,
        category: "software",
        question: "Do you sell ready-made software?",
        answer:
            "Yes. Our technology market can include software products developed by AB TECHNOLOGIES, software subscriptions, digital tools and other technology products that are available for purchase or subscription.",
        tags: ["software", "subscriptions"],
        featured: true,
    },
    {
        id: 21,
        category: "software",
        question: "Can I request software that is not currently available?",
        answer:
            "Yes. You can submit a software requirement. If an existing product does not meet the requirement, the request may be evaluated as a customization, integration or new software development opportunity.",
        tags: ["custom", "software"],
    },
    {
        id: 22,
        category: "software",
        question: "Do you offer software subscriptions?",
        answer:
            "Yes. Software products can be offered through subscription models where appropriate. The exact billing structure depends on the product, features, user count, usage and licensing model.",
        tags: ["subscription", "SaaS"],
    },
    {
        id: 23,
        category: "software",
        question: "Can you integrate different business applications?",
        answer:
            "Yes. Integration work can connect systems through APIs, webhooks, scheduled processes, data synchronization and other integration mechanisms. The exact approach depends on the systems involved and their available interfaces.",
        tags: ["integration", "API"],
    },

    {
        id: 24,
        category: "networking",
        question: "Do you design and deploy business networks?",
        answer:
            "Yes. Networking projects can include network planning, structured connectivity, switches, routers, wireless access points, firewalls, segmentation, connectivity testing, documentation and support.",
        tags: ["network", "deployment"],
        featured: true,
    },
    {
        id: 25,
        category: "networking",
        question: "Can you set up Wi-Fi for an office or institution?",
        answer:
            "Yes. We can plan wireless coverage based on building layout, expected users, traffic requirements, access point placement, security requirements and network capacity.",
        tags: ["Wi-Fi", "wireless"],
    },
    {
        id: 26,
        category: "networking",
        question: "Can you help connect multiple offices?",
        answer:
            "Yes. Multi-location connectivity can involve VPNs, dedicated connectivity, cloud networking or other architectures depending on the locations, applications and security requirements.",
        tags: ["branches", "VPN"],
    },
    {
        id: 27,
        category: "networking",
        question: "Do you provide network monitoring?",
        answer:
            "Managed IT arrangements may include monitoring of selected infrastructure components, availability, performance and operational issues depending on the agreed scope.",
        tags: ["monitoring", "managed IT"],
    },

    {
        id: 28,
        category: "cloud",
        question: "What cloud services do you provide?",
        answer:
            "Cloud services can include cloud infrastructure planning, application hosting, backups, storage, deployment support, migration assistance, monitoring and managed cloud environments.",
        tags: ["cloud", "hosting"],
        featured: true,
    },
    {
        id: 29,
        category: "cloud",
        question: "Can you host business applications?",
        answer:
            "Yes. Hosting requirements can be assessed based on application architecture, expected traffic, storage, database requirements, security, backups and availability expectations.",
        tags: ["hosting", "applications"],
    },
    {
        id: 30,
        category: "cloud",
        question: "Can you migrate an existing application to the cloud?",
        answer:
            "Yes. Migration planning can include application assessment, database considerations, infrastructure preparation, deployment, testing, DNS configuration, backups and post-migration monitoring.",
        tags: ["migration", "cloud"],
    },
    {
        id: 31,
        category: "cloud",
        question: "Do you provide managed IT support?",
        answer:
            "Yes. Managed IT support can cover infrastructure, user support, systems administration, monitoring, troubleshooting, maintenance and technology operations depending on the service agreement.",
        tags: ["support", "managed IT"],
    },

    {
        id: 32,
        category: "ai",
        question: "How can AB TECHNOLOGIES help with AI?",
        answer:
            "We can help organizations identify practical AI opportunities such as intelligent assistants, document processing, workflow automation, knowledge search, customer support, data analysis, internal copilots and AI-enabled business applications.",
        tags: ["AI", "automation"],
        featured: true,
    },
    {
        id: 33,
        category: "ai",
        question: "Can you build an AI-powered business application?",
        answer:
            "Yes. AI functionality can be integrated into custom applications where it provides a meaningful business benefit. The solution may combine an AI model with application logic, databases, permissions, workflows and business rules.",
        tags: ["AI", "software"],
    },
    {
        id: 34,
        category: "ai",
        question: "Can the request-a-quote system be AI powered?",
        answer:
            "Yes. An AI-powered request workflow can help users describe what they need in natural language, ask relevant questions, structure the requirement and prepare it for quotation or human review.",
        tags: ["quote", "AI", "procurement"],
        featured: true,
    },
    {
        id: 35,
        category: "ai",
        question: "Can AI automatically recommend products?",
        answer:
            "Yes. A product recommendation experience can analyze a user's stated requirements and suggest relevant product categories or products. For procurement decisions, AI recommendations should still be validated against current specifications, availability and commercial information.",
        tags: ["recommendation", "AI"],
    },
    {
        id: 36,
        category: "ai",
        question: "Can AI automate repetitive business processes?",
        answer:
            "Yes. Suitable workflows may include document processing, notifications, data entry, reporting, approvals, lead qualification, customer communication, inventory processes and system synchronization.",
        tags: ["automation", "workflow"],
    },

    {
        id: 37,
        category: "security",
        question: "What cybersecurity services do you provide?",
        answer:
            "Security services can include security planning, endpoint protection considerations, network security, access control, authentication, backup strategy, monitoring and security-focused technology implementation.",
        tags: ["security", "cybersecurity"],
        featured: true,
    },
    {
        id: 38,
        category: "security",
        question: "Can you secure an office network?",
        answer:
            "Yes. Network security can include firewall configuration, segmentation, secure wireless configuration, access controls, secure administration and other measures appropriate to the organization's environment.",
        tags: ["network", "security"],
    },
    {
        id: 39,
        category: "security",
        question: "Can you help with backups?",
        answer:
            "Yes. Backup planning can consider what needs to be protected, how frequently data changes, retention requirements, recovery objectives, storage locations and restoration testing.",
        tags: ["backup", "data"],
    },
    {
        id: 40,
        category: "security",
        question: "Can you implement access controls for employees?",
        answer:
            "Yes. Depending on the environment, access controls can involve user accounts, roles, permissions, authentication policies, device management and other identity or security mechanisms.",
        tags: ["access", "identity"],
    },

    {
        id: 41,
        category: "training",
        question: "Does AB TECHNOLOGIES provide technology training?",
        answer:
            "Yes. Training can cover software development, productivity tools, technology operations, digital skills, cybersecurity awareness, business applications and other technology-related subjects.",
        tags: ["training", "education"],
        featured: true,
    },
    {
        id: 42,
        category: "training",
        question: "Can I buy courses through the technology market?",
        answer:
            "Yes. The technology market can include paid training courses and learning products. Course availability, pricing and delivery format may vary by course.",
        tags: ["courses", "learning"],
    },
    {
        id: 43,
        category: "training",
        question: "Can organizations purchase training for employees?",
        answer:
            "Yes. Organizations can request training for teams or departments. Training can be structured around the organization's existing tools, workflows and skill requirements.",
        tags: ["corporate", "training"],
    },
    {
        id: 44,
        category: "training",
        question: "Do you provide practical technology training?",
        answer:
            "Training can be designed around practical exercises, demonstrations, projects and real-world workflows where appropriate rather than relying exclusively on theoretical material.",
        tags: ["practical", "training"],
    },

    {
        id: 45,
        category: "marketplace",
        question: "What is the AB TECHNOLOGIES Tech Market?",
        answer:
            "The Tech Market is intended to be a central digital marketplace for technology products and services. It can bring together hardware, software, subscriptions, digital tools, training, free downloads, technology services and request-based procurement.",
        tags: ["marketplace", "technology market"],
        featured: true,
    },
    {
        id: 46,
        category: "marketplace",
        question: "Will the Tech Market sell hardware?",
        answer:
            "Yes. Hardware categories can include computers, laptops, monitors, networking equipment, servers, storage, peripherals, accessories and other technology products.",
        tags: ["hardware", "marketplace"],
    },
    {
        id: 47,
        category: "marketplace",
        question: "Will the Tech Market have free software?",
        answer:
            "Yes. The platform can include a dedicated free downloads area containing useful software, utilities, templates, tools and other resources that are legally available for free distribution.",
        tags: ["free", "downloads"],
        featured: true,
    },
    {
        id: 48,
        category: "marketplace",
        question: "Will the Tech Market sell software subscriptions?",
        answer:
            "Yes. Software products can be presented with product information, screenshots, feature descriptions, pricing or subscription information where applicable.",
        tags: ["software", "subscription"],
    },
    {
        id: 49,
        category: "marketplace",
        question: "Can software ideas be displayed before they are built?",
        answer:
            "Yes. A product roadmap or ideas section can display concepts that AB TECHNOLOGIES is considering or products that may be available for future development. This can also help collect interest and feedback.",
        tags: ["ideas", "roadmap"],
    },
    {
        id: 50,
        category: "marketplace",
        question: "Can users request a product that is not in the Tech Market?",
        answer:
            "Yes. A request workflow can allow users to describe a desired hardware product, software product, service or technology requirement even when it is not currently listed.",
        tags: ["request", "products"],
    },

    {
        id: 51,
        category: "delivery",
        question: "Do you provide technology delivery?",
        answer:
            "Delivery can be arranged for applicable procurement orders depending on location, product availability, supplier arrangements and the agreed delivery terms.",
        tags: ["delivery", "logistics"],
    },
    {
        id: 52,
        category: "delivery",
        question: "Can you coordinate delivery for large orders?",
        answer:
            "Yes. Larger procurement projects may require coordinated logistics, scheduling, receiving procedures and delivery documentation. These requirements can be planned as part of the procurement process.",
        tags: ["bulk", "logistics"],
    },
    {
        id: 53,
        category: "delivery",
        question: "Can products be delivered to different locations?",
        answer:
            "Multi-location delivery may be possible depending on the procurement arrangement. Requirements should be identified before quotation so logistics can be considered properly.",
        tags: ["locations", "delivery"],
    },

    {
        id: 54,
        category: "general",
        question: "How do I request a quotation?",
        answer:
            "You can use the request-a-quote experience to describe what you need. For complex requirements, provide as much information as possible including quantity, technical specifications, location, desired timeframe and intended use.",
        tags: ["quote", "quotation"],
        featured: true,
    },
    {
        id: 55,
        category: "general",
        question: "Can I request a quotation using natural language?",
        answer:
            "Yes. An AI-assisted request workflow can allow users to describe requirements conversationally instead of requiring them to know the exact technical terminology.",
        tags: ["AI", "quote"],
    },
    {
        id: 56,
        category: "general",
        question: "What happens after I submit a request?",
        answer:
            "The requirement can be reviewed, clarified where necessary, matched against available products or services and prepared for a quotation or consultation. More complex requirements may require human review before a final commercial response.",
        tags: ["request", "process"],
    },
    {
        id: 57,
        category: "general",
        question: "Can AB TECHNOLOGIES build something specifically for my business?",
        answer:
            "Yes. Custom software and digital transformation projects can be designed around your organization's processes, users, integrations and operational requirements.",
        tags: ["custom", "business"],
    },

    {
        id: 58,
        category: "procurement",
        question: "How do you select suppliers?",
        answer:
            "Supplier evaluation can consider product authenticity, specifications, commercial terms, availability, reliability, warranty, delivery capability and other factors relevant to the procurement requirement.",
        tags: ["suppliers", "vendors"],
    },
    {
        id: 59,
        category: "procurement",
        question: "Can suppliers work with AB TECHNOLOGIES?",
        answer:
            "Yes. Suppliers and vendors with relevant products or services can be considered for appropriate procurement opportunities, subject to the applicable business and verification processes.",
        tags: ["vendors", "suppliers"],
    },
    {
        id: 60,
        category: "procurement",
        question: "Can AB TECHNOLOGIES source products directly from manufacturers?",
        answer:
            "Depending on the product and commercial arrangement, sourcing may involve manufacturers, authorized distributors, wholesalers or other suitable supply channels.",
        tags: ["manufacturer", "sourcing"],
    },

    {
        id: 61,
        category: "enterprise",
        question: "Can large organizations use AB TECHNOLOGIES as a technology partner?",
        answer:
            "Yes. Enterprise and institutional clients can use AB TECHNOLOGIES for procurement, software, infrastructure, managed IT, technology projects, support and related services.",
        tags: ["enterprise", "institution"],
    },
    {
        id: 62,
        category: "enterprise",
        question: "Can you support schools and universities?",
        answer:
            "Yes. Education technology requirements may include computer labs, networking, Wi-Fi, software, digital learning tools, institutional procurement, training and ongoing technology support.",
        tags: ["schools", "universities"],
    },
    {
        id: 63,
        category: "enterprise",
        question: "Can you support healthcare organizations?",
        answer:
            "Yes. Healthcare organizations can require secure infrastructure, devices, software, networking, connectivity, data protection, procurement and operational support. Projects should be designed around applicable organizational and regulatory requirements.",
        tags: ["healthcare", "security"],
    },
    {
        id: 64,
        category: "enterprise",
        question: "Can NGOs and development organizations work with you?",
        answer:
            "Yes. We can support technology procurement, digital systems, connectivity, devices, software, training and other technology requirements for NGOs and development-focused organizations.",
        tags: ["NGO", "development"],
    },
];

const quickTopics = [
    {
        title: "Hardware",
        description: "Computers, devices, infrastructure and accessories.",
        icon: Cpu,
        category: "hardware",
    },
    {
        title: "Software",
        description: "Applications, subscriptions and custom systems.",
        icon: Settings,
        category: "software",
    },
    {
        title: "Procurement",
        description: "Sourcing, quotations and bulk purchasing.",
        icon: Package,
        category: "procurement",
    },
    {
        title: "Cloud",
        description: "Hosting, infrastructure and managed services.",
        icon: Cloud,
        category: "cloud",
    },
    {
        title: "AI",
        description: "Intelligent systems and business automation.",
        icon: Bot,
        category: "ai",
    },
    {
        title: "Security",
        description: "Secure systems, networks and data.",
        icon: ShieldCheck,
        category: "security",
    },
];

function FAQItem({ faq, isOpen, onToggle }) {
    return (
        <div
            className={`
                group overflow-hidden rounded-2xl border
                transition-all duration-300
                ${isOpen
                    ? "border-blue-500/40 bg-blue-50/70 dark:border-blue-400/30 dark:bg-blue-950/20"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/40 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30 dark:hover:shadow-black/20"
                }
            `}
        >
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
                aria-expanded={isOpen}
            >
                <div className="flex min-w-0 items-start gap-4">
                    <div
                        className={`
                            mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-xl
                            ${isOpen
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                            }
                        `}
                    >
                        <HelpCircle size={18} />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-base font-bold leading-7 text-slate-900 dark:text-white sm:text-lg">
                            {faq.question}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                            {faq.tags?.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className={`
                        flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                        transition-all
                        ${isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"
                        }
                    `}
                >
                    {isOpen ? (
                        <ChevronUp size={19} />
                    ) : (
                        <ChevronDown size={19} />
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="border-t border-slate-200/80 px-6 pb-7 pt-5 dark:border-white/10 sm:px-7">
                    <div className="pl-0 sm:pl-[52px]">
                        <p className="max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                            {faq.answer}
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                            <CheckCircle2 size={15} />
                            <span>AB TECHNOLOGIES INFORMATION</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function FAQs() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [openItems, setOpenItems] = useState(new Set());
    const [showAllCategories, setShowAllCategories] = useState(false);

    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like help with a technology question or requirement.",
            metadata: {
                Source: "FAQs",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };

    const filteredFAQs = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return faqs.filter((faq) => {
            const categoryMatch =
                activeCategory === "all" ||
                faq.category === activeCategory;

            if (!normalizedSearch) {
                return categoryMatch;
            }

            const searchTarget = [
                faq.question,
                faq.answer,
                faq.category,
                ...(faq.tags || []),
            ]
                .join(" ")
                .toLowerCase();

            return (
                categoryMatch &&
                searchTarget.includes(normalizedSearch)
            );
        });
    }, [activeCategory, search]);

    const featuredFAQs = useMemo(() => {
        return faqs.filter((faq) => faq.featured).slice(0, 6);
    }, []);

    const toggleFAQ = (id) => {
        setOpenItems((current) => {
            const next = new Set(current);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    };

    const openAll = () => {
        setOpenItems(new Set(filteredFAQs.map((faq) => faq.id)));
    };

    const closeAll = () => {
        setOpenItems(new Set());
    };

    const clearSearch = () => {
        setSearch("");
        setActiveCategory("all");
    };

    const visibleCategories = showAllCategories
        ? categories
        : categories.slice(0, 7);

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-white">

            {/* =========================================================
                HERO
            ========================================================== */}

            <section className="relative isolate overflow-hidden border-b border-slate-200 dark:border-white/10">

                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-[-15%] top-[-30%] h-[550px] w-[550px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10" />
                    <div className="absolute right-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />
                    <div className="absolute bottom-[-30%] left-[35%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />

                    <div
                        className="
                            absolute inset-0 opacity-[0.035]
                            [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)]
                            [background-size:48px_48px]
                            dark:opacity-[0.06]
                        "
                    />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">

                    <div className="mx-auto max-w-4xl text-center">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                            <Sparkles size={15} />
                            Technology Knowledge Centre
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-7xl">
                            Questions?
                            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
                                Start Here.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                            Find practical answers about technology procurement,
                            software, hardware, cloud, networking, AI,
                            cybersecurity, training and our complete technology
                            market.
                        </p>

                        {/* Search */}

                        <div className="mx-auto mt-10 max-w-3xl">
                            <div className="group relative">

                                <Search
                                    size={21}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500"
                                />

                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    type="text"
                                    placeholder="Search questions, products, procurement, software..."
                                    className="
                                        w-full rounded-2xl border
                                        border-slate-200 bg-white
                                        py-5 pl-14 pr-14 text-sm
                                        font-medium text-slate-900
                                        shadow-xl shadow-slate-200/50
                                        outline-none
                                        transition-all
                                        placeholder:text-slate-400
                                        focus:border-blue-500
                                        focus:ring-4
                                        focus:ring-blue-500/10
                                        dark:border-white/10
                                        dark:bg-white/[0.06]
                                        dark:text-white
                                        dark:shadow-black/20
                                        dark:placeholder:text-slate-500
                                    "
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
                                    >
                                        <X size={17} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Stats */}

                        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">

                            {[
                                {
                                    value: `${faqs.length}+`,
                                    label: "Answers",
                                },
                                {
                                    value: "12",
                                    label: "Categories",
                                },
                                {
                                    value: "24/7",
                                    label: "Online Access",
                                },
                                {
                                    value: "AI",
                                    label: "Ready",
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
                                >
                                    <div className="text-xl font-black text-slate-950 dark:text-white">
                                        {item.value}
                                    </div>
                                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        {item.label}
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                QUICK TOPICS
            ========================================================== */}

            <section className="relative border-b border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-[#070b18]">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                        <div>
                            <div className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                Browse by topic
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                What are you looking for?
                            </h2>
                        </div>

                        <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                            Jump directly into the area that matches your
                            technology requirement.
                        </p>

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {quickTopics.map((topic) => {
                            const Icon = topic.icon;

                            return (
                                <button
                                    type="button"
                                    key={topic.title}
                                    onClick={() => {
                                        setActiveCategory(topic.category);
                                        setSearch("");
                                        window.scrollTo({
                                            top:
                                                document.body.scrollHeight >
                                                    0
                                                    ? window.scrollY + 450
                                                    : 0,
                                            behavior: "smooth",
                                        });
                                    }}
                                    className="
                                        group flex items-center gap-5
                                        rounded-2xl border border-slate-200
                                        bg-slate-50 p-5 text-left
                                        transition-all duration-300
                                        hover:-translate-y-1
                                        hover:border-blue-300
                                        hover:bg-blue-50
                                        hover:shadow-xl
                                        hover:shadow-blue-100/40
                                        dark:border-white/10
                                        dark:bg-white/[0.035]
                                        dark:hover:border-blue-400/30
                                        dark:hover:bg-blue-500/10
                                        dark:hover:shadow-black/20
                                    "
                                >

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-blue-500/10 dark:text-blue-400">
                                        <Icon size={22} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-bold text-slate-900 dark:text-white">
                                            {topic.title}
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                            {topic.description}
                                        </p>
                                    </div>

                                    <ArrowRight
                                        size={18}
                                        className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-500"
                                    />

                                </button>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* =========================================================
                FEATURED QUESTIONS
            ========================================================== */}

            {!search && activeCategory === "all" && (
                <section className="relative overflow-hidden py-20 lg:py-24">

                    <div className="absolute right-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl dark:bg-cyan-500/5" />

                    <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                        <div className="mb-10">

                            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                <Sparkles size={15} />
                                Most asked
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                Start with the essentials
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                These are some of the questions that help
                                visitors understand how AB TECHNOLOGIES works.
                            </p>

                        </div>

                        <div className="grid gap-5 lg:grid-cols-2">

                            {featuredFAQs.map((faq) => (
                                <FAQItem
                                    key={faq.id}
                                    faq={faq}
                                    isOpen={openItems.has(faq.id)}
                                    onToggle={() => toggleFAQ(faq.id)}
                                />
                            ))}

                        </div>

                    </div>
                </section>
            )}

            {/* =========================================================
                FAQ DATABASE
            ========================================================== */}

            <section
                id="faq-database"
                className="relative border-t border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-[#050816] lg:py-28"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">

                        {/* Sidebar */}

                        <aside className="lg:sticky lg:top-28 lg:self-start">

                            <div className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                <Filter size={15} />
                                Categories
                            </div>

                            <div className="space-y-2">

                                {visibleCategories.map((category) => {
                                    const Icon = category.icon;
                                    const active =
                                        activeCategory === category.id;

                                    return (
                                        <button
                                            type="button"
                                            key={category.id}
                                            onClick={() => {
                                                setActiveCategory(category.id);
                                                setSearch("");
                                            }}
                                            className={`
                                                flex w-full items-center gap-3
                                                rounded-xl px-4 py-3
                                                text-left text-sm font-bold
                                                transition-all
                                                ${active
                                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                    : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                                                }
                                            `}
                                        >
                                            <Icon size={17} />
                                            <span className="flex-1">
                                                {category.label}
                                            </span>
                                        </button>
                                    );
                                })}

                            </div>

                            {categories.length > 7 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAllCategories(
                                            (value) => !value
                                        )
                                    }
                                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                                >
                                    {showAllCategories
                                        ? "Show fewer"
                                        : "Show all categories"}
                                    <ChevronDown
                                        size={15}
                                        className={
                                            showAllCategories
                                                ? "rotate-180"
                                                : ""
                                        }
                                    />
                                </button>
                            )}

                        </aside>

                        {/* FAQ Content */}

                        <div>

                            <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035] sm:p-6 lg:flex-row lg:items-center lg:justify-between">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                                            <CircleHelp size={21} />
                                        </div>

                                        <div>
                                            <h2 className="font-black text-slate-950 dark:text-white">
                                                {activeCategory === "all"
                                                    ? "All questions"
                                                    : categories.find(
                                                        (item) =>
                                                            item.id ===
                                                            activeCategory
                                                    )?.label}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {filteredFAQs.length}{" "}
                                                questions available
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <div className="flex flex-wrap gap-2">

                                    <button
                                        type="button"
                                        onClick={openAll}
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                                    >
                                        Expand all
                                    </button>

                                    <button
                                        type="button"
                                        onClick={closeAll}
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                                    >
                                        Collapse all
                                    </button>

                                </div>

                            </div>

                            {filteredFAQs.length > 0 ? (
                                <div className="space-y-3">

                                    {filteredFAQs.map((faq) => (
                                        <FAQItem
                                            key={faq.id}
                                            faq={faq}
                                            isOpen={openItems.has(faq.id)}
                                            onToggle={() =>
                                                toggleFAQ(faq.id)
                                            }
                                        />
                                    ))}

                                </div>
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-white/[0.025]">

                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/10">
                                        <Search size={27} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">
                                        We couldn't find that.
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        Try a different search phrase or browse
                                        another category.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                                    >
                                        Clear search
                                        <X size={16} />
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                TECHNOLOGY MARKET FAQ INTRO
            ========================================================== */}

            <section className="relative overflow-hidden border-t border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#070b18] lg:py-28">

                <div className="absolute inset-0">

                    <div className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="absolute right-[5%] bottom-[10%] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

                </div>

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        <div>

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                                <ShoppingBag size={15} />
                                The Tech Market
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                                One place for
                                <span className="block text-blue-600 dark:text-blue-400">
                                    technology decisions.
                                </span>
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                                We are building the Tech Market as more than
                                another online store. It can become a
                                technology discovery and procurement
                                environment where businesses can explore
                                products, software, services, training and
                                solutions.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                {[
                                    {
                                        icon: Laptop,
                                        title: "Hardware",
                                        text: "Devices and infrastructure.",
                                    },
                                    {
                                        icon: Settings,
                                        title: "Software",
                                        text: "Applications and subscriptions.",
                                    },
                                    {
                                        icon: FileText,
                                        title: "Guides",
                                        text: "Technology buying resources.",
                                    },
                                    {
                                        icon: GraduationCap,
                                        title: "Training",
                                        text: "Courses and learning.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]"
                                        >
                                            <Icon
                                                size={21}
                                                className="text-blue-600 dark:text-blue-400"
                                            />

                                            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                        {/* Market visual */}

                        <div className="relative">

                            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl shadow-slate-300/30 dark:border-white/10 dark:shadow-black/40 sm:p-7">

                                <div className="flex items-center justify-between border-b border-white/10 pb-5">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                                            <ShoppingBag size={20} />
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-white">
                                                AB Tech Market
                                            </div>

                                            <div className="text-[10px] uppercase tracking-wider text-slate-500">
                                                Technology marketplace
                                            </div>
                                        </div>

                                    </div>

                                    <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-300">
                                        LIVE CONCEPT
                                    </div>

                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">

                                    {[
                                        {
                                            icon: Monitor,
                                            title: "Devices",
                                            number: "120+",
                                        },
                                        {
                                            icon: Settings,
                                            title: "Software",
                                            number: "40+",
                                        },
                                        {
                                            icon: Database,
                                            title: "Solutions",
                                            number: "30+",
                                        },
                                        {
                                            icon: GraduationCap,
                                            title: "Courses",
                                            number: "25+",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                            >
                                                <Icon
                                                    size={19}
                                                    className="text-cyan-300"
                                                />

                                                <div className="mt-5 text-2xl font-black text-white">
                                                    {item.number}
                                                </div>

                                                <div className="mt-1 text-xs text-slate-500">
                                                    {item.title}
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>

                                <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">

                                    <div className="flex items-center gap-3">

                                        <Bot
                                            size={20}
                                            className="text-blue-300"
                                        />

                                        <div className="text-sm font-bold text-white">
                                            AI Technology Assistant
                                        </div>

                                    </div>

                                    <p className="mt-3 text-xs leading-6 text-slate-400">
                                        "Tell us what you need. We can help
                                        structure your technology requirement
                                        and guide you toward the right
                                        solution."
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                FREE DOWNLOADS
            ========================================================== */}

            <section className="relative overflow-hidden border-t border-slate-200 py-20 dark:border-white/10 lg:py-24">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950/20 dark:via-[#050816] dark:to-cyan-950/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

                        <div>

                            <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                <Globe2 size={15} />
                                Technology resources
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                Free technology resources
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                The platform can also provide useful free
                                resources such as utilities, templates,
                                guides, checklists, calculators and
                                downloadable software where distribution
                                rights permit.
                            </p>

                        </div>

                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-200 bg-white text-blue-600 shadow-xl shadow-blue-100/40 dark:border-blue-400/20 dark:bg-white/5 dark:text-blue-400 dark:shadow-black/20">
                            <Zap size={34} />
                        </div>

                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                icon: FileText,
                                title: "PDF Tools",
                                text: "Useful document utilities.",
                            },
                            {
                                icon: Boxes,
                                title: "File Tools",
                                text: "Compression and conversion.",
                            },
                            {
                                icon: Settings,
                                title: "Utilities",
                                text: "Everyday technology tools.",
                            },
                            {
                                icon: DownloadIcon,
                                title: "Downloads",
                                text: "Free resources and software.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <Icon
                                        size={21}
                                        className="text-blue-600 dark:text-blue-400"
                                    />

                                    <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* =========================================================
                AI ASSISTED HELP
            ========================================================== */}

            <section className="relative py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 p-8 text-white shadow-2xl shadow-blue-900/20 sm:p-12 lg:p-16">

                        <div className="absolute right-[-10%] top-[-30%] h-[450px] w-[450px] rounded-full bg-cyan-400/20 blur-3xl" />

                        <div className="absolute bottom-[-35%] left-[20%] h-[400px] w-[400px] rounded-full bg-indigo-300/10 blur-3xl" />

                        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">

                            <div className="max-w-3xl">

                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-100">
                                    <Bot size={15} />
                                    AI-assisted support
                                </div>

                                <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                    Can't find the answer?
                                </h2>

                                <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                                    Instead of searching through hundreds of
                                    pages, describe what you are trying to
                                    achieve. Our AI-assisted experience can
                                    help structure your requirement before it
                                    reaches the appropriate solution or human
                                    specialist.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I have a technology question and would like some help.",
                                                {
                                                    Intent: "Ask a question",
                                                    Category:
                                                        activeCategory === "all"
                                                            ? "General"
                                                            : categories.find(
                                                                (item) =>
                                                                    item.id === activeCategory
                                                            )?.label,
                                                }
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-xl hover:bg-blue-50"
                                    >
                                        Ask a question
                                        <ArrowRight size={17} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to request a quote for a technology product, service or project.",
                                                {
                                                    Intent: "Request quote",
                                                }
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15"
                                    >
                                        Request a quote
                                        <FileText size={17} />
                                    </button>

                                </div>

                            </div>

                            <div className="hidden h-36 w-36 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 lg:flex">
                                <Bot
                                    size={64}
                                    strokeWidth={1.3}
                                    className="text-cyan-200"
                                />
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                CONTACT / SUPPORT
            ========================================================== */}

            <section className="border-t border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#070b18] lg:py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="mb-12 text-center">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                            <Headphones size={15} />
                            Need human assistance?
                        </div>

                        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                            Our team can help
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                            Some technology requirements are too specific for
                            a simple FAQ. Tell us what you are trying to
                            accomplish and we can help you determine the next
                            step.
                        </p>

                    </div>

                    <div className="grid gap-5 md:grid-cols-3">

                        <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30 dark:hover:bg-blue-500/5">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                <MessageCircle size={21} />
                            </div>

                            <h3 className="mt-6 font-black text-slate-950 dark:text-white">
                                Talk to us
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Discuss a requirement with our team.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss a technology requirement with the team.",
                                        {
                                            Intent: "Talk to team",
                                        }
                                    )
                                }
                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
                            >
                                Start a conversation
                                <ArrowRight size={15} />
                            </button>

                        </div>

                        <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30 dark:hover:bg-blue-500/5">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">
                                <FileText size={21} />
                            </div>

                            <h3 className="mt-6 font-black text-slate-950 dark:text-white">
                                Request a quote
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Tell us exactly what products or services you
                                need.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like pricing for a technology product, service or project.",
                                        {
                                            Intent: "Request pricing",
                                        }
                                    )
                                }
                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
                            >
                                Request pricing
                                <ArrowRight size={15} />
                            </button>

                        </div>

                        <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30 dark:hover:bg-blue-500/5">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                                <ShieldCheck size={21} />
                            </div>

                            <h3 className="mt-6 font-black text-slate-950 dark:text-white">
                                Get expert guidance
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Make technology decisions with greater
                                confidence.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like expert guidance on the right technology solution for our needs.",
                                        {
                                            Intent: "Expert guidance",
                                        }
                                    )
                                }
                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400"
                            >
                                Explore solutions
                                <ArrowRight size={15} />
                            </button>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================================
                FINAL CTA
            ========================================================== */}

            <section className="relative overflow-hidden border-t border-slate-200 py-20 dark:border-white/10 lg:py-28">

                <div className="absolute inset-0 bg-slate-100 dark:bg-[#050816]" />

                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20">
                        <Sparkles size={27} />
                    </div>

                    <h2 className="mt-7 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                        Your technology question can become
                        <span className="block text-blue-600 dark:text-blue-400">
                            your next solution.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                        Whether you need one laptop, a complete office
                        infrastructure, custom software, cloud services,
                        procurement support or a long-term technology partner,
                        AB TECHNOLOGIES can help you take the next step.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a quote and discuss the technology solution we need.",
                                    {
                                        Intent: "Request quote",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            Request a Quote
                            <ArrowRight size={17} />
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                        >
                            Explore Tech Market
                            <ShoppingBag size={17} />
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}

/*
|--------------------------------------------------------------------------
| Small local icon helper
|--------------------------------------------------------------------------
|
| Keeping this icon definition inside this file means you don't need
| another dependency just for the downloads/resource section.
|
*/

function DownloadIcon({ size = 24, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
        </svg>
    );
}