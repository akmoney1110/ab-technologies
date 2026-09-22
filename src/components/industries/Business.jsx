import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Building2,
    BriefcaseBusiness,
    Check,
    ChevronDown,
    Cloud,
    Code2,
    Database,
    Factory,
    FileCheck2,
    Globe2,
    Headphones,
    Layers3,
    LineChart,
    LockKeyhole,
    Mail,
    Network,
    PackageCheck,
    Settings2,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Target,
    Users,
    Workflow,
    Zap,
    BarChart3,
    Boxes,
    ClipboardCheck,
    Cpu,
    Landmark,
    Laptop,
    LifeBuoy,
    MonitorSmartphone,
    Server,
    Truck,
    WalletCards,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

const managedServices = [
    {
        icon: Settings2,
        title: "Managed Operations",
        description:
            "Structured technology and operational support for organizations that need dependable systems without building every capability internally.",
        points: [
            "Day-to-day technology coordination",
            "Operational workflow support",
            "Systems monitoring and administration",
            "Issue escalation and resolution",
        ],
    },
    {
        icon: Network,
        title: "Infrastructure Management",
        description:
            "Keep networks, devices, servers, cloud environments and business infrastructure organized, monitored and maintained.",
        points: [
            "Network administration",
            "Infrastructure monitoring",
            "Server and endpoint support",
            "Configuration management",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud & Digital Infrastructure",
        description:
            "Design, deploy and maintain practical cloud environments that support collaboration, applications, data and business continuity.",
        points: [
            "Cloud environment setup",
            "Hosting and deployment",
            "Backup planning",
            "Digital infrastructure management",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Security Management",
        description:
            "Improve organizational security through access controls, endpoint protection, monitoring, policies and practical security practices.",
        points: [
            "Access management",
            "Endpoint security",
            "Security configuration",
            "Risk-aware infrastructure practices",
        ],
    },
    {
        icon: Workflow,
        title: "Automation & Integration",
        description:
            "Connect systems and automate repetitive processes so teams can spend less time moving information manually.",
        points: [
            "Workflow automation",
            "API integrations",
            "Business process automation",
            "Data synchronization",
        ],
    },
    {
        icon: Headphones,
        title: "Technical Support",
        description:
            "Responsive technical assistance for employees, systems, applications, devices and infrastructure.",
        points: [
            "User support",
            "Remote troubleshooting",
            "Application assistance",
            "Technical escalation",
        ],
    },
];

const corporateCapabilities = [
    {
        icon: Building2,
        title: "Corporate Technology",
        text:
            "Technology planning and implementation aligned with organizational structure, employee needs and business objectives.",
    },
    {
        icon: Users,
        title: "Employee Enablement",
        text:
            "Equip employees with the devices, applications, connectivity and support they need to work effectively.",
    },
    {
        icon: Boxes,
        title: "Asset Coordination",
        text:
            "Coordinate hardware, software and technology assets from requirement definition through deployment and support.",
    },
    {
        icon: ClipboardCheck,
        title: "Procurement Governance",
        text:
            "Create clearer procurement processes with specifications, competitive quotations, supplier coordination and documentation.",
    },
    {
        icon: LineChart,
        title: "Business Intelligence",
        text:
            "Turn operational data into useful reports, dashboards and decision-support tools.",
    },
    {
        icon: Target,
        title: "Technology Strategy",
        text:
            "Help organizations determine what to build, buy, deploy, automate or improve next.",
    },
];

const solutions = [
    {
        number: "01",
        title: "Business Management Systems",
        icon: BriefcaseBusiness,
        description:
            "Centralize important business processes into structured digital systems.",
        items: [
            "Operations management",
            "Customer records",
            "Staff management",
            "Inventory workflows",
            "Reporting dashboards",
            "Document management",
        ],
    },
    {
        number: "02",
        title: "Procurement & Supply Operations",
        icon: ShoppingCart,
        description:
            "Build a more organized technology procurement and supplier-management process.",
        items: [
            "Requirement analysis",
            "Product sourcing",
            "Supplier comparison",
            "Competitive quotations",
            "Bulk procurement",
            "Delivery coordination",
        ],
    },
    {
        number: "03",
        title: "Communication Systems",
        icon: Mail,
        description:
            "Improve how employees, departments, customers and partners communicate.",
        items: [
            "Business email",
            "Collaboration platforms",
            "Internal communication",
            "Notification systems",
            "Customer communication",
            "Digital correspondence",
        ],
    },
    {
        number: "04",
        title: "Data & Reporting",
        icon: Database,
        description:
            "Give management better visibility into operations, performance and activity.",
        items: [
            "Management dashboards",
            "Operational reports",
            "Data collection",
            "Data organization",
            "Performance indicators",
            "Exportable reports",
        ],
    },
    {
        number: "05",
        title: "Cloud & Hosting",
        icon: Server,
        description:
            "Deploy applications and business services on reliable digital infrastructure.",
        items: [
            "Application hosting",
            "Cloud deployments",
            "Server configuration",
            "Domain management",
            "SSL configuration",
            "Backup planning",
        ],
    },
    {
        number: "06",
        title: "AI & Intelligent Workflows",
        icon: Sparkles,
        description:
            "Introduce AI where it genuinely improves productivity, information access or decision-making.",
        items: [
            "AI assistants",
            "Document intelligence",
            "AI-powered requests",
            "Content processing",
            "Intelligent search",
            "Workflow recommendations",
        ],
    },
];

const industries = [
    {
        icon: Factory,
        title: "Manufacturing",
        description:
            "Technology systems for production environments, inventory, staff operations, procurement and reporting.",
    },
    {
        icon: Truck,
        title: "Logistics & Distribution",
        description:
            "Digital tools for fleet operations, dispatch, inventory, delivery coordination and business communication.",
    },
    {
        icon: Landmark,
        title: "Financial & Professional Services",
        description:
            "Structured systems for internal operations, documentation, client management and reporting.",
    },
    {
        icon: ShoppingCart,
        title: "Retail & Commerce",
        description:
            "Technology infrastructure, devices, software and management systems for growing commercial organizations.",
    },
    {
        icon: GraduationCapIcon,
        title: "Education",
        description:
            "Technology procurement, connectivity, digital learning platforms and administrative systems.",
    },
    {
        icon: Globe2,
        title: "Organizations & Institutions",
        description:
            "Procurement, deployment and managed technology support for institutions with complex operational requirements.",
    },
];

const processSteps = [
    {
        step: "01",
        title: "Understand",
        icon: Target,
        description:
            "We begin by understanding your organization, current environment, goals, problems and constraints.",
    },
    {
        step: "02",
        title: "Assess",
        icon: ClipboardCheck,
        description:
            "We review your existing infrastructure, processes, applications, procurement requirements and operational gaps.",
    },
    {
        step: "03",
        title: "Design",
        icon: Layers3,
        description:
            "We create a practical solution covering technology, systems, procurement, implementation and support.",
    },
    {
        step: "04",
        title: "Source",
        icon: PackageCheck,
        description:
            "Where products or third-party services are required, we help identify suitable options and suppliers.",
    },
    {
        step: "05",
        title: "Deploy",
        icon: Zap,
        description:
            "We configure, install, integrate and deploy the solution according to the agreed requirements.",
    },
    {
        step: "06",
        title: "Support",
        icon: LifeBuoy,
        description:
            "After deployment, we remain available for maintenance, support, optimization and future improvements.",
    },
];

const procurementItems = [
    "Desktop computers",
    "Business laptops",
    "Monitors",
    "Printers",
    "Servers",
    "Networking equipment",
    "Wi-Fi equipment",
    "Storage devices",
    "UPS and power equipment",
    "Accessories",
    "Communication equipment",
    "Software licenses",
];

const supportAreas = [
    "Desktop and laptop troubleshooting",
    "Network troubleshooting",
    "Software installation",
    "User account assistance",
    "Business application support",
    "Server administration",
    "Cloud administration",
    "Backup monitoring",
    "Security configuration",
    "Device configuration",
    "System maintenance",
    "Technical documentation",
];

const faqs = [
    {
        question: "Can you help an organization that is starting from scratch?",
        answer:
            "Yes. We can work from the beginning by helping define requirements, recommend an approach, source the required technology, build or configure systems, deploy the environment and provide ongoing support.",
    },
    {
        question: "Do you only provide software?",
        answer:
            "No. Our model covers technology procurement, hardware, networking, infrastructure, software, cloud, security, automation, deployment and managed support.",
    },
    {
        question: "Can you handle bulk corporate procurement?",
        answer:
            "Yes. We can support structured procurement requirements involving multiple devices, software, networking equipment, accessories and related technology needs.",
    },
    {
        question: "Can you work with our existing IT team?",
        answer:
            "Yes. We can complement an internal IT team by handling specific projects, procurement, infrastructure work, software development, automation or additional technical capacity.",
    },
    {
        question: "Can you develop a custom business management system?",
        answer:
            "Yes. Custom software can be designed around your actual workflows rather than forcing the organization to change its processes to fit a generic application.",
    },
    {
        question: "Can you support organizations after implementation?",
        answer:
            "Yes. Support can continue after deployment through maintenance, troubleshooting, monitoring, system improvements and ongoing technical assistance.",
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
            <path d="M22 10 12 5 2 10l10 5 10-5Z" />
            <path d="M6 12v5c3 2 9 2 12 0v-5" />
            <path d="M22 10v6" />
        </svg>
    );
}

function SectionLabel({ children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            {children}
        </div>
    );
}

function ManagedBusinessCorporations() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(0);

    /* ============================================================
       SUPPORT REQUEST HELPER
       ============================================================ */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss managed business & corporate technology for my organization.",
            metadata: metadata || {
                Source: "Managed Business & Corporations",
            },
        });

        navigate("/support/ai");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* ========================================================= */}
            {/* HERO */}
            {/* ========================================================= */}

            <section className="relative isolate">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.14),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,#f8fafc,#eef6ff_48%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,#020617,#071426_50%,#020617)]" />

                <div className="absolute left-[-12rem] top-24 -z-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute right-[-10rem] top-72 -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">

                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

                        <div>
                            <SectionLabel>
                                Managed Business & Corporate Technology
                            </SectionLabel>

                            <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Technology that works
                                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                                    around your business.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                We help businesses, corporations and institutions
                                build, modernize and manage the technology behind
                                their operations — from the first requirement to
                                procurement, deployment, software, infrastructure,
                                automation and ongoing support.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                Whether you are starting from scratch, replacing
                                outdated systems, expanding to new locations or
                                simply need a dependable technology partner, we
                                can help turn your requirements into a practical,
                                maintainable solution.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss our organization's technology requirements. Here's what we need:",
                                            {
                                                Source: "Managed Business & Corporations",
                                                Stage: "Hero — discuss requirements",
                                            }
                                        )
                                    }
                                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50"
                                >
                                    Discuss Your Requirements
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your managed business technology capabilities.",
                                            {
                                                Source: "Managed Business & Corporations",
                                                Stage: "Hero — explore capabilities",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:border-blue-400 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-blue-400/50 dark:hover:text-blue-300"
                                >
                                    Explore Capabilities
                                    <ArrowDownIcon />
                                </button>
                            </div>

                            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-5 border-t border-slate-200 pt-8 sm:grid-cols-4 dark:border-white/10">
                                {[
                                    ["End-to-end", "Technology delivery"],
                                    ["B2B", "Business focused"],
                                    ["Scalable", "Built to grow"],
                                    ["Ongoing", "Support available"],
                                ].map(([title, text]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Managed technology — ${title}: ${text}.`,
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Pillar: title,
                                                }
                                            )
                                        }
                                        className="text-left transition hover:text-blue-700 dark:hover:text-blue-400"
                                    >
                                        <p className="text-2xl font-black text-slate-950 dark:text-white">
                                            {title}
                                        </p>
                                        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-indigo-500/20 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/75 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30">

                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white dark:border-white/10">

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                                Business Technology
                                            </p>
                                            <p className="mt-2 text-xl font-black">
                                                Operations Overview
                                            </p>
                                        </div>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                                            <BarChart3 className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <DashboardCard
                                            icon={Laptop}
                                            label="Devices"
                                            value="Managed"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to discuss device management for our organization.",
                                                    {
                                                        Source: "Managed Business & Corporations",
                                                        Focus: "Devices",
                                                    }
                                                )
                                            }
                                        />
                                        <DashboardCard
                                            icon={Network}
                                            label="Network"
                                            value="Connected"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to discuss network and connectivity for our organization.",
                                                    {
                                                        Source: "Managed Business & Corporations",
                                                        Focus: "Network",
                                                    }
                                                )
                                            }
                                        />
                                        <DashboardCard
                                            icon={Cloud}
                                            label="Cloud"
                                            value="Running"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to discuss our cloud environment and infrastructure.",
                                                    {
                                                        Source: "Managed Business & Corporations",
                                                        Focus: "Cloud",
                                                    }
                                                )
                                            }
                                        />
                                        <DashboardCard
                                            icon={ShieldCheck}
                                            label="Security"
                                            value="Protected"
                                            onClick={() =>
                                                startSupportChat(
                                                    "I'd like to discuss security management for our organization.",
                                                    {
                                                        Source: "Managed Business & Corporations",
                                                        Focus: "Security",
                                                    }
                                                )
                                            }
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss overall technology operations and how they can be managed.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Stage: "Hero — tech operations",
                                                }
                                            )
                                        }
                                        className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-blue-400/40"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold">
                                                Technology operations
                                            </span>
                                            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">
                                                Active
                                            </span>
                                        </div>

                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                            <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                                        </div>

                                        <div className="mt-3 flex justify-between text-xs text-slate-500">
                                            <span>Infrastructure</span>
                                            <span>84%</span>
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <MiniCapability
                                        icon={Code2}
                                        title="Software"
                                        text="Custom systems"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss custom software and systems for our organization.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Focus: "Software",
                                                }
                                            )
                                        }
                                    />
                                    <MiniCapability
                                        icon={PackageCheck}
                                        title="Procurement"
                                        text="Source & deploy"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss technology procurement for our organization.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Focus: "Procurement",
                                                }
                                            )
                                        }
                                    />
                                    <MiniCapability
                                        icon={Workflow}
                                        title="Automation"
                                        text="Connect workflows"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss workflow automation and integration.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Focus: "Automation",
                                                }
                                            )
                                        }
                                    />
                                    <MiniCapability
                                        icon={Headphones}
                                        title="Support"
                                        text="Keep teams moving"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss technical support for our teams.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Focus: "Support",
                                                }
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* INTRO */}
            {/* ========================================================= */}

            <section className="relative border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">

                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:42px_42px] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

                        <div>
                            <SectionLabel>
                                Built Around Your Organization
                            </SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                                Not just another IT vendor.
                            </h2>
                        </div>

                        <div>
                            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Your organization does not need disconnected
                                technology purchases. It needs systems that
                                work together.
                            </p>

                            <p className="mt-5 leading-8 text-slate-500 dark:text-slate-400">
                                Our approach brings procurement, software,
                                infrastructure, cloud, security, automation,
                                communication and support into one coordinated
                                technology relationship. That means fewer
                                disconnected decisions and a clearer path from
                                business requirement to working solution.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss a coordinated technology relationship for our organization.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            Stage: "Intro — coordinated relationship",
                                        }
                                    )
                                }
                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3 dark:text-blue-400"
                            >
                                Discuss a coordinated approach
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-3">

                        <InfoCard
                            icon={Target}
                            title="Start With the Problem"
                            text="We begin with what your organization needs to accomplish, not with a product we want to sell."
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start with our business problem, not a specific product.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Principle: "Start with the problem",
                                    }
                                )
                            }
                        />

                        <InfoCard
                            icon={Layers3}
                            title="Connect the Pieces"
                            text="Hardware, software, infrastructure, cloud and people are considered as one operating environment."
                            onClick={() =>
                                startSupportChat(
                                    "I'd like our technology pieces to work together as one operating environment.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Principle: "Connect the pieces",
                                    }
                                )
                            }
                        />

                        <InfoCard
                            icon={LineChart}
                            title="Plan for the Future"
                            text="Solutions are designed with maintainability, expansion and future requirements in mind."
                            onClick={() =>
                                startSupportChat(
                                    "I'd like our technology to be planned for future growth and maintainability.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Principle: "Plan for the future",
                                    }
                                )
                            }
                        />

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* CAPABILITIES */}
            {/* ========================================================= */}

            <section id="capabilities" className="relative py-20 lg:py-28">

                <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-50/70 to-transparent dark:from-blue-950/20 dark:to-transparent" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>
                            Our Managed Capabilities
                        </SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                            One partner for the technology behind your operations.
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            From infrastructure and support to automation and
                            cloud, we can provide the technical capability your
                            organization needs at the stage where you need it.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {managedServices.map((service) => {
                            const Icon = service.icon;

                            return (
                                <button
                                    type="button"
                                    key={service.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore the managed capability: ${service.title} — ${service.description} Points: ${service.points.join(", ")}.`,
                                            {
                                                Source: "Managed Business & Corporations",
                                                Capability: service.title,
                                            }
                                        )
                                    }
                                    className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/5 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-blue-400/30 dark:hover:shadow-black/20"
                                >
                                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

                                    <div className="relative">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="mt-6 text-xl font-black">
                                            {service.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {service.description}
                                        </p>

                                        <ul className="mt-6 space-y-3">
                                            {service.points.map((point) => (
                                                <li
                                                    key={point}
                                                    className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"
                                                >
                                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                                                        <Check className="h-3 w-3" />
                                                    </span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </button>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* CORPORATE OPERATING MODEL */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden border-y border-slate-200 bg-slate-950 py-20 text-white dark:border-white/10 lg:py-28">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(6,182,212,0.14),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">

                        <div>
                            <SectionLabel>
                                Corporate Technology Model
                            </SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                Technology should support the organization — not become another problem to manage.
                            </h2>

                            <p className="mt-6 leading-8 text-slate-300">
                                We structure our services around the practical
                                realities of running an organization: employees,
                                customers, departments, suppliers, assets,
                                information, infrastructure and growth.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss business continuity as part of our technology model.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            Focus: "Business continuity",
                                        }
                                    )
                                }
                                className="mt-8 w-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
                            >
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            Designed for business continuity
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            We consider reliability, access,
                                            maintenance, security, backups and
                                            support as part of the overall
                                            solution.
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {corporateCapabilities.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Corporate technology model — ${item.title}: ${item.text}`,
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    "Corporate capability": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-left transition hover:border-blue-400/40 hover:bg-white/[0.07]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-blue-300">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            {item.text}
                                        </p>
                                    </button>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* SOLUTIONS */}
            {/* ========================================================= */}

            <section className="py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                        <div className="max-w-3xl">
                            <SectionLabel>
                                Business Solutions
                            </SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                From individual tools to complete business environments.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We can help you acquire, build, connect and
                                manage the technology your organization needs.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to explore your business solutions in more detail.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Stage: "Solutions — view all",
                                    }
                                )
                            }
                            className="inline-flex items-center gap-2 font-bold text-blue-700 transition hover:gap-3 dark:text-blue-300"
                        >
                            View solutions
                            <ArrowUpRight className="h-4 w-4" />
                        </button>

                    </div>

                    <div className="mt-14 space-y-4">

                        {solutions.map((solution) => {
                            const Icon = solution.icon;

                            return (
                                <button
                                    type="button"
                                    key={solution.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore the solution: ${solution.title} — ${solution.description} Includes: ${solution.items.join(", ")}.`,
                                            {
                                                Source: "Managed Business & Corporations",
                                                Solution: solution.title,
                                            }
                                        )
                                    }
                                    className="group w-full rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left transition hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/30"
                                >
                                    <div className="grid gap-6 lg:grid-cols-[80px_280px_1fr_1fr] lg:items-center">

                                        <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                                            {solution.number}
                                        </span>

                                        <div className="flex items-center gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-200">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <h3 className="font-black">
                                                {solution.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {solution.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                                            {solution.items.map((item) => (
                                                <span
                                                    key={item}
                                                    className="text-xs font-medium text-slate-500 dark:text-slate-400"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>

                                    </div>
                                </button>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* PROCUREMENT */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden bg-blue-50 py-20 dark:bg-blue-950/20 lg:py-28">

                <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <SectionLabel>
                                Corporate Procurement
                            </SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                Need technology for 5 people, 50 people or 500?
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We can help organizations define requirements,
                                source suitable products, compare options,
                                coordinate suppliers and prepare technology
                                for deployment.
                            </p>

                            <p className="mt-5 leading-7 text-slate-500 dark:text-slate-400">
                                The goal is not simply to buy equipment. It is
                                to make sure what you acquire is appropriate for
                                the users, environment, applications and
                                operational requirements.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Requirement Definition",
                                    "Supplier Sourcing",
                                    "Quotation Comparison",
                                    "Bulk Procurement",
                                    "Product Verification",
                                    "Deployment",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Procurement — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    "Procurement step": item,
                                                }
                                            )
                                        }
                                        className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-800 transition hover:border-blue-400 dark:border-blue-400/20 dark:bg-white/[0.04] dark:text-blue-200 dark:hover:border-blue-400/50"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss corporate technology procurement for our organization.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            Stage: "Procurement CTA",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                            >
                                Discuss Procurement
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="rounded-[2rem] border border-blue-200 bg-white p-7 shadow-xl shadow-blue-950/5 dark:border-blue-400/10 dark:bg-slate-900/70">

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                                    <PackageCheck className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="font-black">
                                        Common procurement categories
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Hardware and technology requirements
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7 grid grid-cols-2 gap-3">
                                {procurementItems.map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Procurement category — I'd like to source: ${item}.`,
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    "Procurement item": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-left text-xs font-semibold text-slate-700 transition hover:bg-blue-50 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-blue-500/10"
                                    >
                                        <Check className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* FROM SCRATCH */}
            {/* ========================================================= */}

            <section className="py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">

                        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                            <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-12 lg:p-14">

                                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

                                <div className="relative">
                                    <SectionLabel>
                                        Starting From Scratch
                                    </SectionLabel>

                                    <h2 className="mt-7 text-3xl font-black leading-tight sm:text-4xl">
                                        You do not need to have everything figured out before contacting us.
                                    </h2>

                                    <p className="mt-6 leading-8 text-slate-300">
                                        If you know what you want your
                                        organization to achieve but are unsure
                                        what technology you need, that is
                                        exactly where we can help.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "We're starting from scratch. Here's what we want our organization to achieve:",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Stage: "From scratch — business problem",
                                                }
                                            )
                                        }
                                        className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-cyan-400/40"
                                    >
                                        <div className="flex gap-4">
                                            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                                            <p className="text-sm leading-6 text-slate-300">
                                                Tell us the business problem.
                                                We can help translate it into
                                                technology requirements.
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 sm:p-12 lg:p-14">

                                <div className="grid gap-5 sm:grid-cols-2">

                                    <StartingCard
                                        number="01"
                                        title="Define"
                                        text="Clarify goals, users, workflows, requirements and priorities."
                                        onClick={() =>
                                            startSupportChat(
                                                "From-scratch step 01 — Define: I'd like to clarify goals, users, workflows and priorities.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Step: "01 — Define",
                                                }
                                            )
                                        }
                                    />

                                    <StartingCard
                                        number="02"
                                        title="Plan"
                                        text="Develop the technology, procurement and implementation roadmap."
                                        onClick={() =>
                                            startSupportChat(
                                                "From-scratch step 02 — Plan: I'd like to develop a technology roadmap.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Step: "02 — Plan",
                                                }
                                            )
                                        }
                                    />

                                    <StartingCard
                                        number="03"
                                        title="Build"
                                        text="Develop custom systems or configure suitable existing solutions."
                                        onClick={() =>
                                            startSupportChat(
                                                "From-scratch step 03 — Build: I'd like to develop or configure systems.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Step: "03 — Build",
                                                }
                                            )
                                        }
                                    />

                                    <StartingCard
                                        number="04"
                                        title="Equip"
                                        text="Source hardware, software, connectivity and infrastructure."
                                        onClick={() =>
                                            startSupportChat(
                                                "From-scratch step 04 — Equip: I'd like to source hardware, software and infrastructure.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Step: "04 — Equip",
                                                }
                                            )
                                        }
                                    />

                                    <StartingCard
                                        number="05"
                                        title="Deploy"
                                        text="Install, configure, integrate and prepare the environment."
                                        onClick={() =>
                                            startSupportChat(
                                                "From-scratch step 05 — Deploy: I'd like to install, configure and integrate our environment.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Step: "05 — Deploy",
                                                }
                                            )
                                        }
                                    />

                                    <StartingCard
                                        number="06"
                                        title="Operate"
                                        text="Provide support, maintenance, monitoring and improvements."
                                        onClick={() =>
                                            startSupportChat(
                                                "From-scratch step 06 — Operate: I'd like ongoing support and improvements.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Step: "06 — Operate",
                                                }
                                            )
                                        }
                                    />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* SOFTWARE */}
            {/* ========================================================= */}

            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">

                        <div>
                            <SectionLabel>
                                Custom Software
                            </SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                When your business needs software built around the way it actually works.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                We can design and develop web-based business
                                applications, portals, dashboards, internal
                                systems and workflow tools for organizations
                                that have requirements existing products do not
                                adequately address.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Business management systems",
                                    "Customer portals",
                                    "Employee portals",
                                    "Procurement platforms",
                                    "Inventory systems",
                                    "Reporting dashboards",
                                    "Document management",
                                    "Workflow applications",
                                    "Internal tools",
                                    "API integrations",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Custom software — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    "Software type": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 text-left text-sm font-semibold text-slate-700 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                                    >
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                                            <Check className="h-3.5 w-3.5" />
                                        </span>
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss custom business software built around our actual workflows.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            Stage: "Custom software CTA",
                                        }
                                    )
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                            >
                                Discuss Custom Software
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-cyan-400/10 blur-2xl" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">

                                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                                                <Code2 className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-black">
                                                    Business Platform
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    Operations workspace
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-xs font-bold text-emerald-600">
                                            Online
                                        </span>
                                    </div>

                                    <div className="mt-6 grid grid-cols-3 gap-3">
                                        <MetricBox value="248" label="Records" />
                                        <MetricBox value="96%" label="Complete" />
                                        <MetricBox value="18" label="Tasks" />
                                    </div>

                                    <div className="mt-5 space-y-3">
                                        <FakeRow label="Operations" percentage="92%" />
                                        <FakeRow label="Procurement" percentage="78%" />
                                        <FakeRow label="Reporting" percentage="86%" />
                                        <FakeRow label="Customer service" percentage="94%" />
                                    </div>

                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss automated workflows for our business platform.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Focus: "Automated workflows",
                                                }
                                            )
                                        }
                                        className="rounded-2xl bg-blue-600 p-4 text-left text-white transition hover:bg-blue-700"
                                    >
                                        <Workflow className="h-5 w-5" />
                                        <p className="mt-4 text-sm font-bold">
                                            Automated workflows
                                        </p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss centralized data for our business platform.",
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Focus: "Centralized data",
                                                }
                                            )
                                        }
                                        className="rounded-2xl bg-slate-900 p-4 text-left text-white transition hover:bg-slate-800 dark:bg-white/5 dark:hover:bg-white/10"
                                    >
                                        <Database className="h-5 w-5 text-cyan-300" />
                                        <p className="mt-4 text-sm font-bold">
                                            Centralized data
                                        </p>
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* SUPPORT */}
            {/* ========================================================= */}

            <section className="py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>
                            Ongoing Support
                        </SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                            Deployment is not the end of the relationship.
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Business technology needs attention after it goes
                            live. Users need assistance, systems need updates,
                            devices need maintenance and infrastructure needs
                            monitoring.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to discuss ongoing support for our technology after deployment.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Stage: "Support section CTA",
                                    }
                                )
                            }
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                        >
                            Discuss Ongoing Support
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                        {supportAreas.map((item, index) => (
                            <button
                                type="button"
                                key={item}
                                onClick={() =>
                                    startSupportChat(
                                        `Ongoing support — I'd like to discuss: ${item}.`,
                                        {
                                            Source: "Managed Business & Corporations",
                                            "Support area": item,
                                        }
                                    )
                                }
                                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/30"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-500 dark:bg-white/5 dark:text-slate-400">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {item}
                                </span>
                            </button>
                        ))}

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* INDUSTRIES */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden bg-slate-100 py-20 dark:bg-slate-900/70 lg:py-28">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.12),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <SectionLabel>
                            Industries & Organizations
                        </SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                            Technology that adapts to different operating environments.
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Every organization has different processes,
                            budgets, people and technology requirements. Our
                            solutions are structured around those differences.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {industries.map((industry) => {
                            const Icon = industry.icon;

                            return (
                                <button
                                    type="button"
                                    key={industry.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Industry focus — ${industry.title}: ${industry.description}`,
                                            {
                                                Source: "Managed Business & Corporations",
                                                Industry: industry.title,
                                            }
                                        )
                                    }
                                    className="rounded-[1.75rem] border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/70 dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {industry.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                                        Explore possibilities
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </div>
                                </button>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* PROCESS */}
            {/* ========================================================= */}

            <section className="py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>
                            How We Work
                        </SectionLabel>

                        <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
                            A structured path from requirement to reliable operation.
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We keep the process clear so you understand what is
                            being recommended, why it is needed and what happens
                            next.
                        </p>
                    </div>

                    <div className="relative mt-16">

                        <div className="absolute left-[8%] right-[8%] top-10 hidden h-px bg-slate-200 lg:block dark:bg-white/10" />

                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">

                            {processSteps.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.step}
                                        onClick={() =>
                                            startSupportChat(
                                                `Process step ${item.step} — ${item.title}: ${item.description}`,
                                                {
                                                    Source: "Managed Business & Corporations",
                                                    Step: `${item.step} — ${item.title}`,
                                                }
                                            )
                                        }
                                        className="relative text-center transition hover:opacity-90"
                                    >
                                        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-white text-blue-700 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-blue-300">
                                            <Icon className="h-7 w-7" />

                                            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-[10px] font-black text-white dark:bg-white dark:text-slate-950">
                                                {item.step}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 font-black">
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

            {/* ========================================================= */}
            {/* GOVERNANCE */}
            {/* ========================================================= */}

            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <SectionLabel>
                                Business Discipline
                            </SectionLabel>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                Technology decisions should be documented, understandable and accountable.
                            </h2>

                            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
                                For organizations, technology is more than
                                plugging in devices or launching software. It
                                involves requirements, approvals, suppliers,
                                users, assets, access, documentation and
                                ongoing responsibility.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I'd like to discuss technology governance — documentation, access, cost awareness and visibility.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            Stage: "Governance CTA",
                                        }
                                    )
                                }
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                            >
                                Discuss Governance
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            <GovernanceCard
                                icon={FileCheck2}
                                title="Documentation"
                                text="Keep important technical and operational information organized."
                                onClick={() =>
                                    startSupportChat(
                                        "Governance — I'd like to discuss documentation for our technology.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            "Governance": "Documentation",
                                        }
                                    )
                                }
                            />

                            <GovernanceCard
                                icon={LockKeyhole}
                                title="Access"
                                text="Structure user access and permissions around organizational responsibilities."
                                onClick={() =>
                                    startSupportChat(
                                        "Governance — I'd like to discuss user access and permissions.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            "Governance": "Access",
                                        }
                                    )
                                }
                            />

                            <GovernanceCard
                                icon={WalletCards}
                                title="Cost Awareness"
                                text="Make procurement and technology decisions with total requirements in view."
                                onClick={() =>
                                    startSupportChat(
                                        "Governance — I'd like to discuss cost awareness in technology decisions.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            "Governance": "Cost awareness",
                                        }
                                    )
                                }
                            />

                            <GovernanceCard
                                icon={BarChart3}
                                title="Visibility"
                                text="Give management clearer visibility into systems, assets and operations."
                                onClick={() =>
                                    startSupportChat(
                                        "Governance — I'd like to discuss management visibility into systems and operations.",
                                        {
                                            Source: "Managed Business & Corporations",
                                            "Governance": "Visibility",
                                        }
                                    )
                                }
                            />

                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* CTA */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden py-20 lg:py-28">

                <div className="absolute inset-5 rounded-[2.5rem] bg-slate-950 sm:inset-8 lg:inset-12 dark:bg-blue-950/40" />

                <div className="relative mx-auto max-w-6xl px-10 py-16 text-center text-white sm:px-14 lg:py-24">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        <Sparkles className="h-7 w-7 text-cyan-300" />
                    </div>

                    <h2 className="mx-auto mt-7 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
                        Tell us what your organization needs. We will help you figure out the technology.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        Whether you need equipment, software, networking,
                        cloud, automation, security, deployment or ongoing
                        support, start with the requirement.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a consultation for our organization's technology needs.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Stage: "CTA — request consultation",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-blue-50"
                        >
                            Request a Consultation
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to contact your team about our organization's technology requirements.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Stage: "CTA — contact team",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10"
                        >
                            Contact Our Team
                            <ArrowUpRight className="h-4 w-4" />
                        </button>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* FAQ */}
            {/* ========================================================= */}

            <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-slate-950 lg:py-28">

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <SectionLabel>
                            Frequently Asked Questions
                        </SectionLabel>

                        <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                            Questions organizations often ask.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">

                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border transition ${isOpen
                                        ? "border-blue-300 bg-white shadow-sm dark:border-blue-400/30 dark:bg-slate-900"
                                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/50"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen ? -1 : index
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 pb-6">
                                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                {faq.answer}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startSupportChat(
                                                        `I have a question about: "${faq.question}"`,
                                                        {
                                                            Source: "Managed Business & Corporations",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-700 transition hover:gap-3 dark:text-blue-400"
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

            {/* ========================================================= */}
            {/* FINAL VALUE STRIP */}
            {/* ========================================================= */}

            <section className="border-t border-slate-200 bg-white py-14 dark:border-white/10 dark:bg-slate-900/30">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                                AB Technologies
                            </p>

                            <h3 className="mt-3 text-2xl font-black">
                                Technology. Simplified.
                            </h3>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Procurement, software, infrastructure,
                                automation and support — coordinated around
                                your organization.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to start a conversation about managed business technology for our organization.",
                                    {
                                        Source: "Managed Business & Corporations",
                                        Stage: "Final value strip — start conversation",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                        >
                            Start a Conversation
                            <ArrowRight className="h-4 w-4" />
                        </button>

                    </div>
                </div>
            </section>

        </main>
    );
}

/* ============================================================= */
/* SMALL COMPONENTS */
/* ============================================================= */

function ArrowDownIcon() {
    return (
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
        </svg>
    );
}

function DashboardCard({ icon: Icon, label, value, onClick }) {
    const content = (
        <>
            <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-blue-300" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {label}
                </span>
            </div>

            <p className="mt-5 text-sm font-black">{value}</p>
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
            >
                {content}
            </button>
        );
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            {content}
        </div>
    );
}

function MiniCapability({ icon: Icon, title, text, onClick }) {
    const content = (
        <>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-700 dark:bg-white/5 dark:text-blue-300">
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <p className="text-xs font-black">{title}</p>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    {text}
                </p>
            </div>
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-400/30"
            >
                {content}
            </button>
        );
    }

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
            {content}
        </div>
    );
}

function InfoCard({ icon: Icon, title, text, onClick }) {
    const content = (
        <>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-5 font-black">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {text}
            </p>
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-blue-400/30"
            >
                {content}
            </button>
        );
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/70">
            {content}
        </div>
    );
}

function StartingCard({ number, title, text, onClick }) {
    const content = (
        <>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                {number}
            </span>

            <h3 className="mt-3 font-black">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {text}
            </p>
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
            >
                {content}
            </button>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            {content}
        </div>
    );
}

function MetricBox({ value, label }) {
    return (
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]">
            <p className="text-lg font-black">{value}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>
        </div>
    );
}

function FakeRow({ label, percentage }) {
    return (
        <div>
            <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {label}
                </span>
                <span className="font-bold text-slate-400">
                    {percentage}
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    style={{ width: percentage }}
                />
            </div>
        </div>
    );
}

function GovernanceCard({ icon: Icon, title, text, onClick }) {
    const content = (
        <>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-5 font-black">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {text}
            </p>
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-blue-400/30"
            >
                {content}
            </button>
        );
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900">
            {content}
        </div>
    );
}

export default ManagedBusinessCorporations;