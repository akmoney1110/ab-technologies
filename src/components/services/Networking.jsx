import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queueSupportRequest } from "../AI";
import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    BatteryCharging,
    Bell,
    Building2,
    Cable,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    CircleHelp,
    Cloud,
    CloudCog,
    Code2,
    Command,
    Cpu,
    Database,
    Download,
    EthernetPort,
    FileCheck2,
    FileText,
    Fingerprint,
    Gauge,
    Globe2,
    HardDrive,
    Headphones,
    Info,
    KeyRound,
    Laptop,
    Layers3,
    Link2,
    Lock,
    Mail,
    Map,
    Menu,
    MessageSquare,
    Monitor,
    Network,
    Package,
    PenTool,
    Phone,
    PlugZap,
    Radio,
    RefreshCw,
    Router,
    ScanLine,
    Search,
    Server,
    Settings2,
    Shield,
    ShieldCheck,
    ShieldEllipsis,
    ShoppingCart,
    Signal,
    SlidersHorizontal,
    Sparkles,
    Split,
    Star,
    Target,
    Terminal,
    TicketCheck,
    TrendingUp,
    Users,
    Wifi,
    WifiHigh,
    Wrench,
    X,
    Zap,
} from "lucide-react";
import SEO from "../SEO";
const cn = (...classes) => classes.filter(Boolean).join(" ");
<SEO
    title="Business Networking & IT Infrastructure Services"
    description="Professional network design, installation, configuration and IT infrastructure services from AB Technologies."
    path="/services/networking"
    schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Network Infrastructure Services",
        "provider": {
            "@type": "Organization",
            "name": "AB Technologies"
        }
    }}
/>
const primaryNavigation = [
    {
        label: "Services",
        description: "Technology services for organizations at every stage.",
        items: [
            {
                title: "Hardware & Device Procurement",
                description: "Source laptops, desktops, servers, networking equipment and workplace devices.",
                href: "/services/hardware-device-procurement",
                icon: Laptop,
            },
            {
                title: "Networking & IT Infrastructure",
                description: "Design, deploy, secure and support connected technology environments.",
                href: "/services/networking-it-infrastructure",
                icon: Network,
            },
            {
                title: "Software & Application Development",
                description: "Web, mobile, business systems and custom software.",
                href: "/services/software-development",
                icon: Code2,
            },
            {
                title: "Web Design & Development",
                description: "Professional websites, portals and digital experiences.",
                href: "/services/web-development",
                icon: Globe2,
            },
            {
                title: "Cloud & Digital Infrastructure",
                description: "Cloud, hosting, backups, deployments and infrastructure operations.",
                href: "/services/cloud-digital-infrastructure",
                icon: Cloud,
            },
            {
                title: "Cybersecurity & Protection",
                description: "Security controls, hardening, monitoring and risk reduction.",
                href: "/services/cybersecurity",
                icon: ShieldCheck,
            },
            {
                title: "Automation & AI Solutions",
                description: "AI-assisted workflows, automation and intelligent business tools.",
                href: "/services/automation-ai",
                icon: Sparkles,
            },
            {
                title: "Training & Digital Skills",
                description: "Practical technology training for teams, students and professionals.",
                href: "/training",
                icon: Users,
            },
        ],
    },
    {
        label: "Solutions",
        description: "Complete technology environments built around business needs.",
        items: [
            {
                title: "New Office Setup",
                description: "From an empty office to a connected, productive workplace.",
                href: "/solutions/new-office-setup",
                icon: Building2,
            },
            {
                title: "Business Connectivity",
                description: "Reliable LAN, WAN, Wi-Fi and internet infrastructure.",
                href: "/solutions/business-connectivity",
                icon: Signal,
            },
            {
                title: "Secure Remote Work",
                description: "VPN, identity, access and secure remote connectivity.",
                href: "/solutions/remote-work",
                icon: KeyRound,
            },
            {
                title: "Branch & Multi-Site",
                description: "Connect branches, offices and distributed teams.",
                href: "/solutions/multi-site",
                icon: Map,
            },
            {
                title: "Server & Storage",
                description: "Compute, storage, backup and infrastructure environments.",
                href: "/solutions/server-storage",
                icon: Server,
            },
            {
                title: "Network Refresh",
                description: "Modernize aging or unreliable infrastructure.",
                href: "/solutions/network-refresh",
                icon: RefreshCw,
            },
        ],
    },
    {
        label: "Industries",
        description: "Technology environments adapted to the way different organizations operate.",
        items: [
            {
                title: "Small & Medium Businesses",
                description: "Practical infrastructure without unnecessary complexity.",
                href: "/industries/smb",
                icon: Building2,
            },
            {
                title: "Education",
                description: "Connected classrooms, campuses, labs and administration.",
                href: "/industries/education",
                icon: Users,
            },
            {
                title: "Healthcare",
                description: "Reliable and secure connectivity for healthcare environments.",
                href: "/industries/healthcare",
                icon: ShieldCheck,
            },
            {
                title: "Retail",
                description: "POS, staff, guest and operational connectivity.",
                href: "/industries/retail",
                icon: ShoppingCart,
            },
            {
                title: "Professional Services",
                description: "Secure infrastructure for offices and distributed teams.",
                href: "/industries/professional-services",
                icon: FileText,
            },
            {
                title: "Enterprise",
                description: "Scalable infrastructure for complex environments.",
                href: "/industries/enterprise",
                icon: Layers3,
            },
        ],
    },
];

const heroStats = [
    {
        value: "01",
        label: "Assess",
        description: "Understand your people, space, applications and requirements.",
    },
    {
        value: "02",
        label: "Design",
        description: "Create the architecture, equipment plan and implementation roadmap.",
    },
    {
        value: "03",
        label: "Deploy",
        description: "Install, configure, test and document the environment.",
    },
    {
        value: "04",
        label: "Support",
        description: "Monitor, maintain and improve the infrastructure over time.",
    },
];

const serviceCards = [
    {
        icon: Network,
        number: "01",
        title: "Network Architecture",
        description:
            "We plan the underlying architecture of your network before equipment is installed, considering users, applications, locations, bandwidth, security, growth and operational requirements.",
        bullets: [
            "LAN and WAN architecture",
            "Network segmentation",
            "IP addressing and subnet planning",
            "VLAN architecture",
            "Redundancy planning",
            "Capacity planning",
        ],
    },
    {
        icon: Wifi,
        number: "02",
        title: "Business Wi-Fi",
        description:
            "Reliable wireless connectivity starts with proper planning. We can design Wi-Fi environments around coverage, capacity, user density, device types and security requirements.",
        bullets: [
            "Office Wi-Fi",
            "Guest networks",
            "Campus Wi-Fi",
            "High-density environments",
            "Access point planning",
            "Wireless security",
        ],
    },
    {
        icon: Router,
        number: "03",
        title: "Routing & Switching",
        description:
            "We configure the network equipment that moves traffic between users, devices, servers, locations and the internet.",
        bullets: [
            "Managed switches",
            "Layer 2 and Layer 3 networking",
            "Routers and gateways",
            "VLAN configuration",
            "Inter-VLAN routing",
            "Network optimization",
        ],
    },
    {
        icon: ShieldCheck,
        number: "04",
        title: "Firewall & Network Security",
        description:
            "Your network should not simply connect everything. It should control what is allowed to communicate and reduce unnecessary exposure.",
        bullets: [
            "Firewall deployment",
            "Traffic policies",
            "Network segmentation",
            "Access controls",
            "Threat reduction",
            "Security hardening",
        ],
    },
    {
        icon: Cable,
        number: "05",
        title: "Structured Cabling",
        description:
            "We can help plan and coordinate structured cabling for offices, buildings, workspaces and network rooms.",
        bullets: [
            "Ethernet cabling",
            "Patch panels",
            "Network cabinets",
            "Cable organization",
            "Port labeling",
            "Infrastructure documentation",
        ],
    },
    {
        icon: Server,
        number: "06",
        title: "Servers & Infrastructure",
        description:
            "From local servers to hybrid environments, we help organizations plan compute resources around their applications and operational requirements.",
        bullets: [
            "Server deployment",
            "Application servers",
            "File servers",
            "Virtualization planning",
            "Storage infrastructure",
            "Server maintenance",
        ],
    },
    {
        icon: Cloud,
        number: "07",
        title: "Cloud & Hybrid Infrastructure",
        description:
            "We can connect local infrastructure with cloud services to create environments that balance control, accessibility, resilience and scalability.",
        bullets: [
            "Cloud connectivity",
            "Hybrid environments",
            "Cloud migration planning",
            "Remote access",
            "Cloud backup",
            "Infrastructure integration",
        ],
    },
    {
        icon: Radio,
        number: "08",
        title: "Multi-Site Connectivity",
        description:
            "Connect branches and distributed offices with infrastructure designed for centralized access, secure communication and operational continuity.",
        bullets: [
            "Branch networking",
            "Site-to-site VPN",
            "WAN planning",
            "Centralized services",
            "Remote administration",
            "Multi-location monitoring",
        ],
    },
    {
        icon: Database,
        number: "09",
        title: "Backup & Recovery Infrastructure",
        description:
            "Infrastructure planning should include what happens when something fails. We help design practical backup and recovery strategies.",
        bullets: [
            "Data backup planning",
            "Local backup",
            "Cloud backup",
            "Recovery planning",
            "Retention policies",
            "Recovery testing",
        ],
    },
    {
        icon: Gauge,
        number: "10",
        title: "Monitoring & Performance",
        description:
            "We can help organizations understand what is happening across their infrastructure so problems can be identified before they become major disruptions.",
        bullets: [
            "Network monitoring",
            "Availability monitoring",
            "Performance metrics",
            "Bandwidth visibility",
            "Device health",
            "Alerting",
        ],
    },
    {
        icon: Wrench,
        number: "11",
        title: "Maintenance & Support",
        description:
            "Technology infrastructure needs attention after deployment. We provide ongoing support, troubleshooting, maintenance and improvement.",
        bullets: [
            "Remote troubleshooting",
            "On-site support",
            "Configuration changes",
            "Firmware planning",
            "Incident support",
            "Preventive maintenance",
        ],
    },
    {
        icon: RefreshCw,
        number: "12",
        title: "Infrastructure Modernization",
        description:
            "If your existing infrastructure is outdated, unreliable or difficult to manage, we can assess it and build a modernization roadmap.",
        bullets: [
            "Legacy infrastructure review",
            "Equipment replacement",
            "Wi-Fi modernization",
            "Security improvements",
            "Capacity upgrades",
            "Phased migration",
        ],
    },
];

const lifecycle = [
    {
        step: "01",
        title: "Understand",
        icon: Search,
        description:
            "We begin by understanding your organization, physical environment, users, applications, devices, connectivity requirements and business goals.",
        items: [
            "Current infrastructure review",
            "User and device requirements",
            "Office or site assessment",
            "Application requirements",
            "Business continuity considerations",
        ],
    },
    {
        step: "02",
        title: "Architect",
        icon: PenTool,
        description:
            "We turn requirements into an infrastructure plan that explains what should be connected, how it should be protected and how it can grow.",
        items: [
            "Network topology",
            "IP and VLAN strategy",
            "Wi-Fi design",
            "Security architecture",
            "Equipment specifications",
        ],
    },
    {
        step: "03",
        title: "Source",
        icon: Package,
        description:
            "Where equipment is required, procurement can be integrated into the project so the infrastructure plan and hardware acquisition work together.",
        items: [
            "Equipment specifications",
            "Hardware sourcing",
            "Vendor coordination",
            "Compatibility checks",
            "Procurement planning",
        ],
    },
    {
        step: "04",
        title: "Deploy",
        icon: PlugZap,
        description:
            "We configure and deploy the infrastructure according to the approved architecture, with attention to reliability, security and maintainability.",
        items: [
            "Installation",
            "Configuration",
            "Network setup",
            "Security controls",
            "Device onboarding",
        ],
    },
    {
        step: "05",
        title: "Validate",
        icon: FileCheck2,
        description:
            "Before handover, the environment should be tested. Connectivity, access, performance and important security controls are reviewed.",
        items: [
            "Connectivity tests",
            "Wi-Fi validation",
            "Access testing",
            "Performance checks",
            "Documentation review",
        ],
    },
    {
        step: "06",
        title: "Operate",
        icon: Settings2,
        description:
            "After deployment, we can continue supporting the infrastructure through monitoring, maintenance, troubleshooting and planned improvements.",
        items: [
            "Technical support",
            "Monitoring",
            "Maintenance",
            "Change management",
            "Infrastructure reviews",
        ],
    },
];

const infrastructureLayers = [
    {
        icon: Cable,
        title: "Physical Layer",
        description:
            "Cabling, racks, patch panels, power, network rooms, access points and physical infrastructure.",
    },
    {
        icon: EthernetPort,
        title: "Connectivity Layer",
        description:
            "Switches, routers, gateways, internet connectivity and communication between devices.",
    },
    {
        icon: Shield,
        title: "Security Layer",
        description:
            "Firewalls, segmentation, access controls, secure remote connectivity and protection policies.",
    },
    {
        icon: Server,
        title: "Compute Layer",
        description:
            "Servers, virtual machines, applications, storage and local infrastructure services.",
    },
    {
        icon: CloudCog,
        title: "Cloud Layer",
        description:
            "Cloud services, hybrid infrastructure, remote resources and cloud-connected applications.",
    },
    {
        icon: BarChart3,
        title: "Operations Layer",
        description:
            "Monitoring, alerts, documentation, maintenance, support and continuous improvement.",
    },
];

const solutionPackages = [
    {
        name: "Essential",
        label: "Small Workplace",
        description:
            "A practical starting point for a small office that needs reliable connectivity without unnecessary complexity.",
        features: [
            "Network assessment",
            "Basic LAN design",
            "Managed switching plan",
            "Business Wi-Fi",
            "Basic network security",
            "Device connectivity",
            "Documentation",
        ],
    },
    {
        name: "Professional",
        label: "Growing Organization",
        description:
            "A more structured environment for organizations with multiple teams, more devices and higher operational requirements.",
        features: [
            "Detailed network architecture",
            "VLAN segmentation",
            "Managed switching",
            "Business-grade Wi-Fi",
            "Firewall architecture",
            "Monitoring",
            "Backup planning",
            "Technical documentation",
        ],
        featured: true,
    },
    {
        name: "Enterprise",
        label: "Complex Environment",
        description:
            "A comprehensive approach for larger environments, multiple locations or organizations with demanding infrastructure requirements.",
        features: [
            "Enterprise architecture",
            "Multi-site connectivity",
            "Advanced segmentation",
            "Redundancy planning",
            "Security architecture",
            "Server infrastructure",
            "Cloud/hybrid integration",
            "Monitoring and support",
            "Lifecycle planning",
        ],
    },
];

const industries = [
    {
        icon: Building2,
        title: "Corporate Offices",
        description:
            "Connect employees, meeting rooms, printers, applications, servers and cloud services through a structured business network.",
        examples: [
            "Employee connectivity",
            "Meeting room Wi-Fi",
            "Guest networks",
            "Secure remote access",
        ],
    },
    {
        icon: Users,
        title: "Schools & Education",
        description:
            "Build reliable connectivity across classrooms, offices, laboratories, libraries and shared spaces.",
        examples: [
            "Campus Wi-Fi",
            "Computer labs",
            "Administrative systems",
            "Guest access",
        ],
    },
    {
        icon: ShoppingCart,
        title: "Retail",
        description:
            "Support operational devices and services such as POS systems, inventory systems, staff connectivity and customer Wi-Fi.",
        examples: [
            "POS connectivity",
            "Inventory systems",
            "Staff networks",
            "Guest Wi-Fi",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Healthcare",
        description:
            "Design connectivity with strong attention to availability, access control and the protection of sensitive systems.",
        examples: [
            "Secure workstations",
            "Network segmentation",
            "Staff connectivity",
            "Infrastructure monitoring",
        ],
    },
    {
        icon: HardDrive,
        title: "Professional Services",
        description:
            "Give professional teams reliable infrastructure for cloud applications, collaboration, communication and business operations.",
        examples: [
            "Office networking",
            "VPN",
            "Cloud connectivity",
            "Secure Wi-Fi",
        ],
    },
    {
        icon: Layers3,
        title: "Enterprise",
        description:
            "Support larger and more complex organizations with scalable architectures and structured infrastructure management.",
        examples: [
            "Multi-site networks",
            "Redundancy",
            "Centralized management",
            "Infrastructure lifecycle",
        ],
    },
];

const technologies = [
    "Ethernet",
    "Wi-Fi",
    "VLAN",
    "VPN",
    "LAN",
    "WAN",
    "DNS",
    "DHCP",
    "Firewall",
    "Routing",
    "Switching",
    "PoE",
    "TCP/IP",
    "Network Monitoring",
    "Cloud Connectivity",
    "Server Infrastructure",
];

const faqItems = [
    {
        question: "We are starting from scratch. Can you help us design everything?",
        answer:
            "Yes. You do not need to arrive with a complete technical specification. We can start with your organization, location, number of users, applications, devices, internet requirements and growth plans, then help translate those requirements into an infrastructure plan.",
    },
    {
        question: "Can you supply the networking equipment as well?",
        answer:
            "Yes. Networking infrastructure can be integrated with our hardware and device procurement service. Depending on the project, this can include switches, routers, firewalls, access points, servers, racks, storage and other required equipment.",
    },
    {
        question: "Can you work with equipment we already own?",
        answer:
            "Yes. Existing equipment can be assessed for compatibility, condition, capacity and suitability. We do not automatically recommend replacing everything. Where existing equipment is still appropriate, it can be incorporated into the design.",
    },
    {
        question: "Can you set up Wi-Fi for an entire office or building?",
        answer:
            "Yes. Wi-Fi design can include access point placement, coverage considerations, capacity planning, network separation, guest access and security configuration.",
    },
    {
        question: "Can you connect multiple branches?",
        answer:
            "Yes. We can design multi-site connectivity using appropriate WAN, VPN, cloud or other networking approaches based on your locations, applications and security requirements.",
    },
    {
        question: "Do you provide ongoing support after installation?",
        answer:
            "Yes. Support can be structured around your needs and may include troubleshooting, monitoring, maintenance, configuration changes, infrastructure reviews and planned upgrades.",
    },
    {
        question: "Can you help if our current network is slow or unreliable?",
        answer:
            "Yes. We can start with an assessment rather than immediately replacing equipment. The goal is to identify the actual cause—such as coverage, capacity, configuration, cabling, hardware limitations, internet connectivity or network architecture.",
    },
    {
        question: "Can you work with our existing IT team?",
        answer:
            "Absolutely. We can operate as the primary technology partner, a specialist infrastructure team, or alongside your existing internal IT staff.",
    },
    {
        question: "Do you provide documentation?",
        answer:
            "Documentation can be included as part of the project. Depending on scope, this may include network diagrams, equipment inventories, addressing information, configuration records, port information and operational notes.",
    },
    {
        question: "Can you design around a fixed budget?",
        answer:
            "Yes. A budget does not necessarily determine the exact solution, but it provides an important design constraint. We can prioritize the most important infrastructure requirements and develop a practical phased approach.",
    },
];

const projectSignals = [
    {
        icon: Building2,
        title: "Moving into a new office",
        description:
            "Plan connectivity, Wi-Fi, security, devices and infrastructure before the workplace becomes operational.",
    },
    {
        icon: WifiHigh,
        title: "Wi-Fi is unreliable",
        description:
            "Investigate coverage, interference, capacity, equipment and network configuration instead of guessing.",
    },
    {
        icon: ShieldEllipsis,
        title: "Security needs improvement",
        description:
            "Introduce better segmentation, firewall controls, secure access and infrastructure practices.",
    },
    {
        icon: TrendingUp,
        title: "Your organization is growing",
        description:
            "Build infrastructure that can accommodate additional employees, devices, locations and applications.",
    },
    {
        icon: RefreshCw,
        title: "Your equipment is aging",
        description:
            "Create a modernization plan that prioritizes critical infrastructure instead of replacing everything blindly.",
    },
    {
        icon: Globe2,
        title: "You are opening branches",
        description:
            "Create a consistent infrastructure model that can be deployed across multiple locations.",
    },
];

function SectionLabel({ children, dark = false }) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]",
                dark
                    ? "border-white/10 bg-white/[0.04] text-slate-300"
                    : "border-slate-200 bg-white/80 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
            )}
        >
            <span
                className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    dark ? "bg-cyan-300" : "bg-blue-600 dark:bg-cyan-300"
                )}
            />
            {children}
        </div>
    );
}

function GradientOrb({ className = "" }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute rounded-full bg-blue-500/10 blur-3xl dark:bg-cyan-400/10",
                className
            )}
        />
    );
}

function ServiceCard({ item }) {
    const Icon = item.icon;

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-cyan-400/30">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/[0.04] blur-2xl transition group-hover:bg-blue-500/[0.09] dark:bg-cyan-400/[0.03] dark:group-hover:bg-cyan-400/[0.08]" />

            <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-cyan-400/10 dark:bg-cyan-400/[0.08] dark:text-cyan-300">
                        <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <span className="text-xs font-black tracking-[0.2em] text-slate-300 dark:text-white/20">
                        {item.number}
                    </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                    {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                </p>

                <div className="mt-6 space-y-2.5">
                    {item.bullets.map((bullet) => (
                        <div
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                        >
                            <CheckCircle2
                                size={16}
                                className="mt-0.5 shrink-0 text-blue-600 dark:text-cyan-300"
                            />
                            <span>{bullet}</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}

function LifecycleCard({ item }) {
    const Icon = item.icon;

    return (
        <article className="relative rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.045]">
            <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white dark:bg-cyan-300 dark:text-slate-950">
                    {item.step}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <Icon
                            size={18}
                            className="text-blue-600 dark:text-cyan-300"
                        />
                        <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                            {item.title}
                        </h3>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-2 border-t border-slate-100 pt-5 dark:border-white/10">
                {item.items.map((entry) => (
                    <div
                        key={entry}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-300" />
                        {entry}
                    </div>
                ))}
            </div>
        </article>
    );
}

function FAQItem({ item, open, onClick }) {
    return (
        <div className="border-b border-slate-200/80 dark:border-white/10">
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
                <span className="text-base font-semibold text-slate-950 dark:text-white">
                    {item.question}
                </span>

                <ChevronDown
                    size={20}
                    className={cn(
                        "shrink-0 text-slate-400 transition-transform",
                        open && "rotate-180 text-blue-600 dark:text-cyan-300"
                    )}
                />
            </button>

            {open && (
                <div className="pb-6 pr-10 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.answer}
                </div>
            )}
        </div>
    );
}

export default function NetworkingInfrastructure() {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openNav, setOpenNav] = useState(null);
    const [openFaq, setOpenFaq] = useState(0);
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [activeLayer, setActiveLayer] = useState(0);
    const [activePackage, setActivePackage] = useState(1);
    const [scrolled, setScrolled] = useState(false);

    const [quoteData, setQuoteData] = useState({
        projectType: "",
        organizationSize: "",
        locationCount: "",
        currentSituation: "",
        budget: "",
        details: "",
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
                setQuoteOpen(false);
                setOpenNav(null);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    const quoteSummary = useMemo(() => {
        const values = Object.values(quoteData).filter(Boolean);
        return values.length;
    }, [quoteData]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        setMobileMenuOpen(false);
        setOpenNav(null);
    };

    /* =========================================================
       BUILD SUPPORT MESSAGE FROM QUOTE DATA
    ========================================================= */

    const buildSupportMessage = (data) => {
        const lines = [
            "I would like to discuss a networking & IT infrastructure project.",
            "",
        ];

        if (data.projectType) {
            lines.push(`Project type: ${data.projectType}`);
        }

        if (data.organizationSize) {
            lines.push(`Organization size: ${data.organizationSize}`);
        }

        if (data.locationCount) {
            lines.push(`Locations: ${data.locationCount}`);
        }

        if (data.currentSituation) {
            lines.push(`Current situation: ${data.currentSituation}`);
        }

        if (data.budget) {
            lines.push(`Approximate budget: ${data.budget}`);
        }

        if (data.details) {
            lines.push("", "Additional details:", data.details);
        }

        return lines.join("\n");
    };

    /* =========================================================
       HANDLE QUOTE SUBMIT -> HAND OFF TO SUPPORT
    ========================================================= */

    const handleQuoteSubmit = (event) => {
        event.preventDefault();

        const message = buildSupportMessage(quoteData);

        const metadata = {
            Source: "Networking & IT Infrastructure",
            "Project type": quoteData.projectType || "Not specified",
            "Organization size":
                quoteData.organizationSize || "Not specified",
            Locations: quoteData.locationCount || "Not specified",
            "Current situation":
                quoteData.currentSituation || "Not specified",
            Budget: quoteData.budget || "Not specified",
        };

        // Queue the request for the support page to pick up.
        queueSupportRequest({
            message,
            metadata,
        });

        setQuoteOpen(false);

        // Navigate to the support page. Adjust the route to
        // match your router configuration if different.
        navigate("/support/ai");
    };

    /* =========================================================
       QUICK CHAT HANDOFF (no modal)
    ========================================================= */

    const startSupportChat = (presetMessage, presetMetadata) => {
        queueSupportRequest({
            message:
                presetMessage ||
                "I would like to discuss a networking & IT infrastructure project.",
            metadata: presetMetadata || {
                Source: "Networking & IT Infrastructure",
            },
        });

        navigate("/support/ai");
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 selection:bg-blue-600 selection:text-white dark:bg-[#06101d] dark:text-white">
            {/* =========================================================
                GLOBAL BACKGROUND
            ========================================================== */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.06),transparent_25%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_25%)]" />

                <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:48px_48px] dark:[background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]" />
            </div>

            {/* =========================================================
                MAIN CONTENT
            ========================================================== */}
            <main>
                <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
                    <GradientOrb className="-left-32 top-32 h-80 w-80" />
                    <GradientOrb className="right-[-10rem] top-20 h-[32rem] w-[32rem]" />

                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
                            <div>
                                <SectionLabel>
                                    Networking & IT Infrastructure
                                </SectionLabel>

                                <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                    Build the infrastructure your organization
                                    can{" "}
                                    <span className="text-blue-600 dark:text-cyan-300">
                                        depend on.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
                                    From an empty office to a fully connected,
                                    secure and scalable technology environment,
                                    we help you plan, source, deploy and support
                                    the infrastructure behind your business.
                                </p>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-500">
                                    You do not need to know exactly what you
                                    need. Start with your organization, your
                                    space, your people and your goals. We help
                                    turn that into a practical technology plan.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setQuoteOpen(true)}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
                                    >
                                        Tell Us What You Need
                                        <Sparkles size={17} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            scrollToSection("services")
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                    >
                                        Explore Infrastructure Services
                                        <ArrowDown size={17} />
                                    </button>
                                </div>

                                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <span className="inline-flex items-center gap-2">
                                        <BadgeCheck
                                            size={15}
                                            className="text-blue-600 dark:text-cyan-300"
                                        />
                                        Start from scratch
                                    </span>

                                    <span className="inline-flex items-center gap-2">
                                        <BadgeCheck
                                            size={15}
                                            className="text-blue-600 dark:text-cyan-300"
                                        />
                                        Procurement available
                                    </span>

                                    <span className="inline-flex items-center gap-2">
                                        <BadgeCheck
                                            size={15}
                                            className="text-blue-600 dark:text-cyan-300"
                                        />
                                        Deployment & support
                                    </span>
                                </div>
                            </div>

                            {/* Hero infrastructure visual */}
                            <div className="relative">
                                <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-3xl dark:bg-cyan-400/10" />

                                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#0a1727]">
                                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-[#071321]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                                    Infrastructure Overview
                                                </div>
                                                <div className="mt-1 text-lg font-black">
                                                    Connected Environment
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                Operational
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-2 gap-3">
                                            {[
                                                [
                                                    WifiHigh,
                                                    "Wi-Fi",
                                                    "24 Access Points",
                                                ],
                                                [
                                                    Router,
                                                    "Routing",
                                                    "3 Gateways",
                                                ],
                                                [
                                                    ShieldCheck,
                                                    "Security",
                                                    "Protected",
                                                ],
                                                [
                                                    Server,
                                                    "Servers",
                                                    "8 Systems",
                                                ],
                                            ].map(
                                                ([
                                                    Icon,
                                                    label,
                                                    value,
                                                ]) => (
                                                    <div
                                                        key={label}
                                                        className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]"
                                                    >
                                                        <Icon
                                                            size={18}
                                                            className="text-blue-600 dark:text-cyan-300"
                                                        />
                                                        <div className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                            {label}
                                                        </div>
                                                        <div className="mt-1 text-sm font-bold">
                                                            {value}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Gauge
                                                        size={18}
                                                        className="text-blue-600 dark:text-cyan-300"
                                                    />
                                                    <span className="text-sm font-bold">
                                                        Infrastructure Health
                                                    </span>
                                                </div>
                                                <span className="text-sm font-black">
                                                    98.7%
                                                </span>
                                            </div>

                                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                                <div className="h-full w-[98.7%] rounded-full bg-slate-950 dark:bg-cyan-300" />
                                            </div>

                                            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                                <div>
                                                    <div className="text-sm font-black">
                                                        99.9%
                                                    </div>
                                                    <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">
                                                        Uptime
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black">
                                                        42
                                                    </div>
                                                    <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">
                                                        Devices
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black">
                                                        12ms
                                                    </div>
                                                    <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">
                                                        Latency
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block dark:border-white/10 dark:bg-[#0a1727]">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                                            <ShieldCheck size={19} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold">
                                                Security First
                                            </div>
                                            <div className="mt-0.5 text-[10px] text-slate-500">
                                                Built into the architecture
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero stats */}
                        <div className="mt-20 grid overflow-hidden rounded-3xl border border-slate-200 bg-white/70 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/[0.035]">
                            {heroStats.map((item, index) => (
                                <div
                                    key={item.value}
                                    className={cn(
                                        "p-6 lg:p-7",
                                        index !== 0 &&
                                        "border-t border-slate-200 sm:border-l sm:border-t-0 dark:border-white/10"
                                    )}
                                >
                                    <div className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                                        {item.value}
                                    </div>
                                    <div className="mt-2 text-sm font-bold">
                                        {item.label}
                                    </div>
                                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    TRUST / POSITIONING
                ====================================================== */}
                <section className="relative border-y border-slate-200/70 bg-white py-16 dark:border-white/10 dark:bg-[#081522]">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
                            <div>
                                <SectionLabel>
                                    More Than Installation
                                </SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                                    Infrastructure should be planned as a
                                    system, not a pile of equipment.
                                </h2>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        icon: Target,
                                        title: "Business-first",
                                        text: "We start with what the organization needs to accomplish.",
                                    },
                                    {
                                        icon: Shield,
                                        title: "Security-aware",
                                        text: "Protection and access control are considered from the beginning.",
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Built to grow",
                                        text: "The environment should accommodate future users and requirements.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]"
                                        >
                                            <Icon
                                                size={20}
                                                className="text-blue-600 dark:text-cyan-300"
                                            />
                                            <h3 className="mt-4 text-sm font-bold">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    WHEN TO CALL US
                ====================================================== */}
                <section className="relative py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <SectionLabel>
                                Is This Your Situation?
                            </SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                You may not need more technology.
                                <span className="block text-slate-400 dark:text-slate-600">
                                    You may need better infrastructure.
                                </span>
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Infrastructure problems often show up as
                                symptoms: slow Wi-Fi, unreliable connections,
                                security concerns, equipment that no longer
                                scales or an office that is difficult to set
                                up. We help identify what is actually needed.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {projectSignals.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'm dealing with this situation: ${item.title}. ${item.description}`,
                                                {
                                                    Source:
                                                        "Networking & IT Infrastructure",
                                                    Situation: item.title,
                                                }
                                            )
                                        }
                                        className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-white/[0.06] dark:text-cyan-300">
                                            <Icon size={20} />
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>

                                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-cyan-300">
                                            Discuss this with AB AI
                                            <ArrowRight size={14} />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    SERVICES
                ====================================================== */}
                <section
                    id="services"
                    className="relative scroll-mt-24 overflow-hidden border-y border-slate-200/70 bg-slate-100/70 py-20 lg:py-28 dark:border-white/10 dark:bg-[#071321]"
                >
                    <GradientOrb className="right-[-10rem] top-20 h-96 w-96" />

                    <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <SectionLabel>What We Can Build</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Complete networking and infrastructure
                                services.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Infrastructure rarely consists of one service.
                                A reliable environment usually combines
                                connectivity, security, physical infrastructure,
                                compute, cloud services and ongoing operations.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {serviceCards.map((item) => (
                                <ServiceCard key={item.number} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    NETWORK LAYERS
                ====================================================== */}
                <section className="relative py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
                            <div className="lg:sticky lg:top-28">
                                <SectionLabel>
                                    Infrastructure Architecture
                                </SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                    Every layer has a job.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    A strong infrastructure design considers
                                    more than internet access. We look at the
                                    physical foundation, connectivity, security,
                                    compute, cloud resources and operational
                                    visibility as parts of one environment.
                                </p>

                                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                                            <Layers3 size={19} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">
                                                Integrated approach
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Infrastructure planned as one
                                                system.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {infrastructureLayers.map((layer, index) => {
                                    const Icon = layer.icon;
                                    const active = activeLayer === index;

                                    return (
                                        <button
                                            type="button"
                                            key={layer.title}
                                            onClick={() =>
                                                setActiveLayer(index)
                                            }
                                            className={cn(
                                                "w-full rounded-3xl border p-5 text-left transition",
                                                active
                                                    ? "border-blue-200 bg-white shadow-xl dark:border-cyan-400/20 dark:bg-white/[0.055]"
                                                    : "border-slate-200 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.04]"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={cn(
                                                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                                                        active
                                                            ? "bg-slate-950 text-white dark:bg-cyan-300 dark:text-slate-950"
                                                            : "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300"
                                                    )}
                                                >
                                                    <Icon size={19} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-bold">
                                                        {layer.title}
                                                    </div>

                                                    {active && (
                                                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                                            {
                                                                layer.description
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <ChevronRight
                                                    size={18}
                                                    className={cn(
                                                        "shrink-0 transition",
                                                        active
                                                            ? "text-blue-600 dark:text-cyan-300"
                                                            : "text-slate-300 dark:text-slate-600"
                                                    )}
                                                />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    FROM SCRATCH
                ====================================================== */}
                <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28 dark:bg-[#020a12]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.14),transparent_30%)]" />

                    <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                            <div>
                                <SectionLabel dark>
                                    Starting From Scratch
                                </SectionLabel>

                                <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                    You don't have to know the technology.
                                    <span className="block text-cyan-300">
                                        Tell us what you are trying to build.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                                    Maybe you are opening an office. Maybe you
                                    are moving into a larger building. Maybe
                                    your current network is unreliable. Or
                                    perhaps you simply know that your team needs
                                    better technology.
                                </p>

                                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                                    Start with the business problem. We can help
                                    translate it into infrastructure
                                    requirements, equipment, architecture and
                                    an implementation plan.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'm starting from scratch and need help figuring out what networking & IT infrastructure I need.",
                                            {
                                                Source:
                                                    "Networking & IT Infrastructure",
                                                Situation:
                                                    "Starting from scratch",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                                >
                                    Start With an AI-Assisted Request
                                    <Sparkles size={17} />
                                </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    [
                                        "What do you have?",
                                        "Existing equipment, internet connection, servers, cabling and applications.",
                                        Search,
                                    ],
                                    [
                                        "What do you need?",
                                        "Users, devices, offices, Wi-Fi, servers, cloud services and security.",
                                        Target,
                                    ],
                                    [
                                        "What is changing?",
                                        "Growth, relocation, new branches, new applications or modernization.",
                                        RefreshCw,
                                    ],
                                    [
                                        "What matters most?",
                                        "Budget, reliability, security, performance, flexibility or speed.",
                                        SlidersHorizontal,
                                    ],
                                ].map(([title, text, Icon]) => (
                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `${title} — ${text}`,
                                                {
                                                    Source:
                                                        "Networking & IT Infrastructure",
                                                    Topic: title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-left transition hover:bg-white/[0.08]"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.07] text-cyan-300">
                                            <Icon size={19} />
                                        </div>

                                        <h3 className="mt-5 text-base font-bold">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-400">
                                            {text}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    LIFECYCLE
                ====================================================== */}
                <section
                    id="process"
                    className="scroll-mt-24 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <SectionLabel>How We Work</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                From requirement to reliable infrastructure.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                We structure projects so you can understand
                                what is being built, why it is being built and
                                what happens after deployment.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {lifecycle.map((item) => (
                                <LifecycleCard
                                    key={item.step}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    PROCUREMENT INTEGRATION
                ====================================================== */}
                <section className="relative border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#071321] lg:py-28">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
                            <div>
                                <SectionLabel>
                                    Procurement + Infrastructure
                                </SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                    We can help source the equipment the
                                    infrastructure requires.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    Networking projects often require a mix of
                                    equipment. Instead of separating the design
                                    from procurement, we can coordinate the
                                    technical requirements and equipment
                                    sourcing as part of the same project.
                                </p>

                                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Switches",
                                        "Routers",
                                        "Firewalls",
                                        "Wi-Fi access points",
                                        "Servers",
                                        "NAS & storage",
                                        "Network racks",
                                        "Patch panels",
                                        "Power equipment",
                                        "Business laptops",
                                        "Desktop computers",
                                        "Printers & peripherals",
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I need help procuring ${item} as part of a networking & IT infrastructure project.`,
                                                    {
                                                        Source:
                                                            "Networking & IT Infrastructure",
                                                        "Equipment interest":
                                                            item,
                                                    }
                                                )
                                            }
                                            className="flex items-center gap-2 text-left text-sm font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300"
                                        >
                                            <Check
                                                size={16}
                                                className="text-blue-600 dark:text-cyan-300"
                                            />
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I would like to discuss hardware procurement for my networking & IT infrastructure project.",
                                            {
                                                Source:
                                                    "Networking & IT Infrastructure",
                                                "Equipment interest":
                                                    "General procurement",
                                            }
                                        )
                                    }
                                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-300"
                                >
                                    Explore hardware procurement
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-white/[0.045]">
                                <div className="rounded-3xl bg-slate-950 p-7 text-white dark:bg-[#020a12]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                                Example Project Flow
                                            </div>
                                            <div className="mt-2 text-xl font-black">
                                                New 30-User Office
                                            </div>
                                        </div>

                                        <Network className="text-cyan-300" />
                                    </div>

                                    <div className="mt-8 space-y-3">
                                        {[
                                            [
                                                "01",
                                                "Site assessment",
                                                "Space, users and requirements",
                                            ],
                                            [
                                                "02",
                                                "Network design",
                                                "LAN, Wi-Fi, VLAN and security",
                                            ],
                                            [
                                                "03",
                                                "Equipment plan",
                                                "Switches, APs, firewall and rack",
                                            ],
                                            [
                                                "04",
                                                "Deployment",
                                                "Install, configure and test",
                                            ],
                                            [
                                                "05",
                                                "Handover",
                                                "Documentation and support plan",
                                            ],
                                        ].map(([number, title, text]) => (
                                            <div
                                                key={number}
                                                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                                            >
                                                <span className="text-xs font-black text-cyan-300">
                                                    {number}
                                                </span>
                                                <div>
                                                    <div className="text-sm font-bold">
                                                        {title}
                                                    </div>
                                                    <div className="mt-1 text-xs text-slate-400">
                                                        {text}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I would like to plan a new office setup with 30 users including network design, equipment and deployment.",
                                                {
                                                    Source:
                                                        "Networking & IT Infrastructure",
                                                    "Project type":
                                                        "New office setup",
                                                    "Organization size":
                                                        "11-30 users",
                                                }
                                            )
                                        }
                                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-xs font-black text-slate-950 transition hover:bg-cyan-200"
                                    >
                                        Start a Similar Project
                                        <Sparkles size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    PACKAGES
                ====================================================== */}
                <section
                    id="solutions"
                    className="scroll-mt-24 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <SectionLabel>Infrastructure Paths</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Start with a level. Customize from there.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                Every organization is different, so these are
                                starting frameworks rather than rigid products.
                                Your final infrastructure can be designed
                                around your actual requirements.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 lg:grid-cols-3">
                            {solutionPackages.map((item, index) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() =>
                                        setActivePackage(index)
                                    }
                                    className={cn(
                                        "relative overflow-hidden rounded-3xl border p-7 text-left transition",
                                        activePackage === index
                                            ? "border-blue-300 bg-white shadow-2xl dark:border-cyan-400/30 dark:bg-white/[0.06]"
                                            : "border-slate-200 bg-slate-50 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.045]"
                                    )}
                                >
                                    {item.featured && (
                                        <div className="absolute right-5 top-5 rounded-full bg-slate-950 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white dark:bg-cyan-300 dark:text-slate-950">
                                            Popular path
                                        </div>
                                    )}

                                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-300">
                                        {item.label}
                                    </div>

                                    <h3 className="mt-3 text-2xl font-black">
                                        {item.name}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        {item.description}
                                    </p>

                                    <div className="mt-7 space-y-3">
                                        {item.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-start gap-2.5 text-sm"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    className="mt-0.5 shrink-0 text-blue-600 dark:text-cyan-300"
                                                />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
                                        Discuss this path
                                        <ArrowRight size={16} />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I would like help choosing the right infrastructure path for my organization.",
                                        {
                                            Source:
                                                "Networking & IT Infrastructure",
                                            "Selection stage":
                                                "Choosing package",
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                            >
                                Not sure? Let AB AI guide you
                                <Sparkles size={16} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    INDUSTRIES
                ====================================================== */}
                <section
                    id="industries"
                    className="relative overflow-hidden border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#071321] lg:py-28"
                >
                    <GradientOrb className="-left-40 bottom-0 h-96 w-96" />

                    <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <SectionLabel>Industries</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Infrastructure shaped around how you operate.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                The right network for a school is not necessarily
                                the right network for a retail store or a
                                multi-site enterprise. We consider the
                                environment, users, applications and operational
                                realities of each organization.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {industries.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <article
                                        key={item.title}
                                        className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-300 dark:text-slate-950">
                                            <Icon size={21} />
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {item.examples.map((example) => (
                                                <span
                                                    key={example}
                                                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                                                >
                                                    {example}
                                                </span>
                                            ))}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    TECHNOLOGY STACK
                ====================================================== */}
                <section className="py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                            <div>
                                <SectionLabel>
                                    Technology Building Blocks
                                </SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                    The technologies behind a connected
                                    organization.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    We select technologies according to project
                                    requirements rather than forcing every
                                    organization into the same equipment list.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.035]">
                                <div className="flex flex-wrap gap-2.5">
                                    {technologies.map((technology) => (
                                        <button
                                            type="button"
                                            key={technology}
                                            onClick={() =>
                                                startSupportChat(
                                                    `I would like to discuss ${technology} for my networking & IT infrastructure.`,
                                                    {
                                                        Source:
                                                            "Networking & IT Infrastructure",
                                                        Technology:
                                                            technology,
                                                    }
                                                )
                                            }
                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-300 dark:hover:border-cyan-400/30 dark:hover:bg-cyan-400/[0.06] dark:hover:text-cyan-300"
                                        >
                                            {technology}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-7 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-cyan-400/10 dark:bg-cyan-400/[0.05]">
                                    <Info
                                        size={18}
                                        className="mt-0.5 shrink-0 text-blue-600 dark:text-cyan-300"
                                    />
                                    <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
                                        Technology choices should follow the
                                        environment, requirements, budget and
                                        lifecycle expectations. We can help
                                        determine what is appropriate instead
                                        of asking you to choose equipment
                                        blindly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    SECURITY
                ====================================================== */}
                <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.12),transparent_28%)]" />

                    <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
                            <div>
                                <SectionLabel dark>
                                    Security By Design
                                </SectionLabel>

                                <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                    Connectivity without appropriate
                                    controls can become a liability.
                                </h2>

                                <p className="mt-6 text-base leading-8 text-slate-300">
                                    Network infrastructure should provide the
                                    right access to the right resources—not
                                    simply connect every device to everything.
                                </p>

                                <p className="mt-4 text-sm leading-7 text-slate-400">
                                    Security requirements vary by organization,
                                    so controls are designed around your
                                    environment and risk profile.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    [
                                        ShieldCheck,
                                        "Network segmentation",
                                        "Separate users, guests, critical systems and other environments where appropriate.",
                                    ],
                                    [
                                        Lock,
                                        "Access control",
                                        "Limit who and what can access important network resources.",
                                    ],
                                    [
                                        KeyRound,
                                        "Secure remote access",
                                        "Support remote users and sites through appropriately protected connectivity.",
                                    ],
                                    [
                                        Fingerprint,
                                        "Identity awareness",
                                        "Consider users, devices and permissions when designing access.",
                                    ],
                                    [
                                        Bell,
                                        "Monitoring & alerts",
                                        "Improve visibility into availability and unusual infrastructure events.",
                                    ],
                                    [
                                        FileCheck2,
                                        "Documentation",
                                        "Maintain records that make infrastructure easier to understand and manage.",
                                    ],
                                ].map(([Icon, title, description]) => (
                                    <div
                                        key={title}
                                        className="rounded-3xl border border-white/10 bg-white/[0.045] p-6"
                                    >
                                        <Icon
                                            size={21}
                                            className="text-cyan-300"
                                        />
                                        <h3 className="mt-5 text-sm font-bold">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-6 text-slate-400">
                                            {description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    DOCUMENTATION
                ====================================================== */}
                <section className="py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
                            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035]">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#081522]">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                                            <FileText size={20} />
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold">
                                                Infrastructure Documentation
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Project handover record
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-7 space-y-3">
                                        {[
                                            "Network overview",
                                            "Equipment inventory",
                                            "Network topology",
                                            "IP addressing information",
                                            "Wi-Fi configuration",
                                            "Port & cabling information",
                                            "Security notes",
                                            "Support & maintenance notes",
                                        ].map((item, index) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.03]"
                                            >
                                                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-950 text-[9px] font-black text-white dark:bg-cyan-300 dark:text-slate-950">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>
                                                <span className="text-xs font-semibold">
                                                    {item}
                                                </span>
                                                <Check
                                                    size={14}
                                                    className="ml-auto text-emerald-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <SectionLabel>
                                    Documentation & Handover
                                </SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                    Build it so someone can understand it
                                    later.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    Infrastructure becomes difficult to manage
                                    when nobody knows what was installed, why
                                    it was configured that way or where
                                    important devices are located.
                                </p>

                                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-500">
                                    Depending on the project scope, we can
                                    provide structured documentation to make
                                    future maintenance, troubleshooting,
                                    expansion and handover easier.
                                </p>

                                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Network diagrams",
                                        "Equipment records",
                                        "Configuration notes",
                                        "Infrastructure inventory",
                                        "Handover documentation",
                                        "Support information",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-sm font-semibold"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className="text-blue-600 dark:text-cyan-300"
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    SUPPORT
                ====================================================== */}
                <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#071321] lg:py-28">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                            <div>
                                <SectionLabel>
                                    After Deployment
                                </SectionLabel>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                    The project should not end when the
                                    installation ends.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                    Organizations change. Employees join.
                                    Devices increase. Applications evolve.
                                    Offices move. Infrastructure needs to keep
                                    up.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    [
                                        Headphones,
                                        "Technical Support",
                                        "Help troubleshoot infrastructure and connectivity problems.",
                                    ],
                                    [
                                        Gauge,
                                        "Monitoring",
                                        "Track infrastructure health and availability where appropriate.",
                                    ],
                                    [
                                        Wrench,
                                        "Maintenance",
                                        "Keep configurations and equipment in a maintainable state.",
                                    ],
                                    [
                                        RefreshCw,
                                        "Upgrades",
                                        "Plan improvements before aging infrastructure becomes a major problem.",
                                    ],
                                ].map(([Icon, title, description]) => (
                                    <div
                                        key={title}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <Icon
                                            size={21}
                                            className="text-blue-600 dark:text-cyan-300"
                                        />
                                        <h3 className="mt-5 text-sm font-bold">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    AI QUOTE
                ====================================================== */}
                <section className="relative overflow-hidden py-20 lg:py-28">
                    <GradientOrb className="-right-40 top-0 h-[30rem] w-[30rem]" />

                    <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a1727]">
                            <div className="grid lg:grid-cols-[1fr_.85fr]">
                                <div className="p-8 sm:p-10 lg:p-14">
                                    <SectionLabel>
                                        AI-Assisted Project Discovery
                                    </SectionLabel>

                                    <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                        Not sure what infrastructure you need?
                                    </h2>

                                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
                                        Start with what you know. Tell us about
                                        your organization, current situation,
                                        location, number of users and what you
                                        want to achieve. Your request can then
                                        be organized into a clearer project
                                        brief for review.
                                    </p>

                                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                        {[
                                            "Describe your problem",
                                            "Tell us your organization size",
                                            "Mention your locations",
                                            "Share your approximate budget",
                                            "Explain your goals",
                                            "Add anything you already know",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-2 text-sm font-semibold"
                                            >
                                                <Sparkles
                                                    size={15}
                                                    className="text-blue-600 dark:text-cyan-300"
                                                />
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setQuoteOpen(true)}
                                        className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
                                    >
                                        Build My Request
                                        <Sparkles size={17} />
                                    </button>
                                </div>

                                <div className="border-t border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-white/[0.025] lg:border-l lg:border-t-0 lg:p-10">
                                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                        Request completeness
                                    </div>

                                    <div className="mt-4 flex items-end justify-between">
                                        <div className="text-4xl font-black">
                                            {quoteSummary}/6
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500">
                                            details supplied
                                        </div>
                                    </div>

                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-slate-950 transition-all dark:bg-cyan-300"
                                            style={{
                                                width: `${(quoteSummary / 6) * 100
                                                    }%`,
                                            }}
                                        />
                                    </div>

                                    <div className="mt-8 space-y-3">
                                        {[
                                            "Project type",
                                            "Organization size",
                                            "Number of locations",
                                            "Current situation",
                                            "Budget",
                                            "Project details",
                                        ].map((item, index) => {
                                            const keys = [
                                                "projectType",
                                                "organizationSize",
                                                "locationCount",
                                                "currentSituation",
                                                "budget",
                                                "details",
                                            ];

                                            const completed =
                                                Boolean(quoteData[keys[index]]);

                                            return (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]"
                                                >
                                                    {completed ? (
                                                        <CheckCircle2
                                                            size={17}
                                                            className="text-emerald-500"
                                                        />
                                                    ) : (
                                                        <CircleHelp
                                                            size={17}
                                                            className="text-slate-300 dark:text-slate-600"
                                                        />
                                                    )}

                                                    <span className="text-sm font-semibold">
                                                        {item}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    FAQ
                ====================================================== */}
                <section
                    id="faq"
                    className="border-t border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-[#071321] lg:py-28"
                >
                    <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <SectionLabel>Frequently Asked Questions</SectionLabel>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Before we start.
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
                                A few answers to the questions organizations
                                commonly have before starting an infrastructure
                                project.
                            </p>
                        </div>

                        <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
                            {faqItems.map((item, index) => (
                                <FAQItem
                                    key={item.question}
                                    item={item}
                                    open={openFaq === index}
                                    onClick={() =>
                                        setOpenFaq(
                                            openFaq === index ? null : index
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    FINAL CTA
                ====================================================== */}
                <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28 dark:bg-[#020a12]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_38%)]" />

                    <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
                        <SectionLabel dark>
                            Ready When You Are
                        </SectionLabel>

                        <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
                            Let's build the infrastructure behind your next
                            stage of growth.
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
                            Whether you need a new office network, better
                            Wi-Fi, secure remote access, servers, cloud
                            connectivity, multiple locations or a complete
                            infrastructure plan, we can start from where you
                            are.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setQuoteOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                            >
                                Start a Project
                                <ArrowRight size={17} />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        "I would like to talk to someone about a networking & IT infrastructure project.",
                                        {
                                            Source:
                                                "Networking & IT Infrastructure",
                                        }
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                Talk to AB AI
                                <MessageSquare size={17} />
                            </button>
                        </div>

                        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-2">
                                <ShieldCheck size={14} />
                                Infrastructure planning
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Package size={14} />
                                Equipment procurement
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Wrench size={14} />
                                Deployment & support
                            </span>
                        </div>
                    </div>
                </section>
            </main>

            {/* =========================================================
                FOOTER
            ========================================================== */}
            <footer className="border-t border-white/10 bg-slate-950 text-white dark:bg-[#02070d]">
                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
                        <div className="lg:col-span-2">
                            <a href="/" className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 text-slate-950">
                                    <Command size={20} />
                                </div>

                                <div>
                                    <div className="font-black">
                                        AB TECHNOLOGY
                                    </div>
                                    <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                        Technology. Simplified.
                                    </div>
                                </div>
                            </a>

                            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                                Technology services, infrastructure,
                                procurement, software and digital solutions
                                designed to help organizations build, operate
                                and grow with confidence.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                <a
                                    href="mailto:hello@yourcompany.com"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/[0.08]"
                                >
                                    <Mail size={14} />
                                    Email us
                                </a>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat()
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/[0.08]"
                                >
                                    <MessageSquare size={14} />
                                    Chat with AB AI
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                                Services
                            </div>

                            <div className="mt-5 space-y-3">
                                {[
                                    [
                                        "Hardware Procurement",
                                        "/services/hardware-device-procurement",
                                    ],
                                    [
                                        "Networking & Infrastructure",
                                        "/services/networking-it-infrastructure",
                                    ],
                                    [
                                        "Software Development",
                                        "/services/software-development",
                                    ],
                                    [
                                        "Web Development",
                                        "/services/web-development",
                                    ],
                                    [
                                        "Cybersecurity",
                                        "/services/cybersecurity",
                                    ],
                                ].map(([label, href]) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="block text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                                Solutions
                            </div>

                            <div className="mt-5 space-y-3">
                                {[
                                    ["New Office Setup", "/solutions/new-office-setup"],
                                    ["Business Connectivity", "/solutions/business-connectivity"],
                                    ["Multi-Site Networks", "/solutions/multi-site"],
                                    ["Server & Storage", "/solutions/server-storage"],
                                    ["Remote Work", "/solutions/remote-work"],
                                ].map(([label, href]) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="block text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                                Company
                            </div>

                            <div className="mt-5 space-y-3">
                                <a
                                    href="/about"
                                    className="block text-sm text-slate-400 hover:text-white"
                                >
                                    About
                                </a>

                                <a
                                    href="/resources"
                                    className="block text-sm text-slate-400 hover:text-white"
                                >
                                    Resources
                                </a>

                                <a
                                    href="/training"
                                    className="block text-sm text-slate-400 hover:text-white"
                                >
                                    Training
                                </a>

                                <a
                                    href="/marketplace"
                                    className="block text-sm text-slate-400 hover:text-white"
                                >
                                    Technology Market
                                </a>

                                <a
                                    href="/contact"
                                    className="block text-sm text-slate-400 hover:text-white"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row">
                        <p>
                            © {new Date().getFullYear()} AB Technology. All
                            rights reserved.
                        </p>

                        <div className="flex gap-5">
                            <a
                                href="/privacy"
                                className="hover:text-white"
                            >
                                Privacy
                            </a>
                            <a
                                href="/terms"
                                className="hover:text-white"
                            >
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* =========================================================
                QUOTE MODAL
            ========================================================== */}
            {quoteOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-md">
                    <div className="relative my-8 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#081522]">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-white/10 sm:px-8">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-300">
                                    <Sparkles size={15} />
                                    AI-Assisted Request
                                </div>

                                <h3 className="mt-1 text-xl font-black">
                                    Tell us what you are building
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() => setQuoteOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-300"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleQuoteSubmit}
                            className="max-h-[78vh] overflow-y-auto p-6 sm:p-8"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                        Project type
                                    </span>

                                    <select
                                        value={quoteData.projectType}
                                        onChange={(event) =>
                                            setQuoteData((current) => ({
                                                ...current,
                                                projectType:
                                                    event.target.value,
                                            }))
                                        }
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-cyan-300"
                                    >
                                        <option value="">
                                            Select one
                                        </option>
                                        <option value="New office">
                                            New office
                                        </option>
                                        <option value="Existing network">
                                            Existing network improvement
                                        </option>
                                        <option value="Network refresh">
                                            Network refresh
                                        </option>
                                        <option value="Multi-site">
                                            Multi-site infrastructure
                                        </option>
                                        <option value="Server infrastructure">
                                            Server infrastructure
                                        </option>
                                        <option value="Wi-Fi project">
                                            Wi-Fi project
                                        </option>
                                        <option value="Complete IT infrastructure">
                                            Complete IT infrastructure
                                        </option>
                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                        Organization size
                                    </span>

                                    <select
                                        value={quoteData.organizationSize}
                                        onChange={(event) =>
                                            setQuoteData((current) => ({
                                                ...current,
                                                organizationSize:
                                                    event.target.value,
                                            }))
                                        }
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-cyan-300"
                                    >
                                        <option value="">
                                            Select one
                                        </option>
                                        <option value="1-10 users">
                                            1–10 users
                                        </option>
                                        <option value="11-30 users">
                                            11–30 users
                                        </option>
                                        <option value="31-100 users">
                                            31–100 users
                                        </option>
                                        <option value="101-250 users">
                                            101–250 users
                                        </option>
                                        <option value="250+ users">
                                            250+ users
                                        </option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                        Number of locations
                                    </span>

                                    <select
                                        value={quoteData.locationCount}
                                        onChange={(event) =>
                                            setQuoteData((current) => ({
                                                ...current,
                                                locationCount:
                                                    event.target.value,
                                            }))
                                        }
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-cyan-300"
                                    >
                                        <option value="">
                                            Select one
                                        </option>
                                        <option value="1 location">
                                            1 location
                                        </option>
                                        <option value="2-3 locations">
                                            2–3 locations
                                        </option>
                                        <option value="4-10 locations">
                                            4–10 locations
                                        </option>
                                        <option value="10+ locations">
                                            10+ locations
                                        </option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                        Current situation
                                    </span>

                                    <select
                                        value={quoteData.currentSituation}
                                        onChange={(event) =>
                                            setQuoteData((current) => ({
                                                ...current,
                                                currentSituation:
                                                    event.target.value,
                                            }))
                                        }
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-cyan-300"
                                    >
                                        <option value="">
                                            Select one
                                        </option>
                                        <option value="Starting from scratch">
                                            Starting from scratch
                                        </option>
                                        <option value="Existing but unreliable">
                                            Existing but unreliable
                                        </option>
                                        <option value="Existing but outdated">
                                            Existing but outdated
                                        </option>
                                        <option value="Growing quickly">
                                            Growing quickly
                                        </option>
                                        <option value="Moving office">
                                            Moving office
                                        </option>
                                        <option value="Opening branches">
                                            Opening branches
                                        </option>
                                    </select>
                                </label>

                                <label className="block sm:col-span-2">
                                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                        Approximate budget
                                    </span>

                                    <select
                                        value={quoteData.budget}
                                        onChange={(event) =>
                                            setQuoteData((current) => ({
                                                ...current,
                                                budget: event.target.value,
                                            }))
                                        }
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-cyan-300"
                                    >
                                        <option value="">
                                            Prefer not to say
                                        </option>
                                        <option value="Under budget range">
                                            I need an affordable starting
                                            solution
                                        </option>
                                        <option value="Mid-range">
                                            I have a defined mid-range budget
                                        </option>
                                        <option value="Premium">
                                            I want a premium solution
                                        </option>
                                        <option value="Enterprise">
                                            Enterprise-level budget
                                        </option>
                                        <option value="Need guidance">
                                            I need help determining the budget
                                        </option>
                                    </select>
                                </label>

                                <label className="block sm:col-span-2">
                                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                        Tell us more
                                    </span>

                                    <textarea
                                        value={quoteData.details}
                                        onChange={(event) =>
                                            setQuoteData((current) => ({
                                                ...current,
                                                details: event.target.value,
                                            }))
                                        }
                                        rows={6}
                                        placeholder="Example: We are opening a 25-person office. We need Wi-Fi, wired connections for computers, printers, CCTV, a firewall, a server and guest Wi-Fi. We currently have an internet connection but no network equipment."
                                        className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-300"
                                    />
                                </label>
                            </div>

                            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-cyan-400/10 dark:bg-cyan-400/[0.05]">
                                <div className="flex gap-3">
                                    <Sparkles
                                        size={18}
                                        className="mt-0.5 shrink-0 text-blue-600 dark:text-cyan-300"
                                    />

                                    <div>
                                        <div className="text-xs font-bold">
                                            What happens next?
                                        </div>

                                        <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-400">
                                            Your information will be handed off
                                            to AB AI on the support page, where
                                            the conversation can continue with
                                            full context and technical review.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setQuoteOpen(false)}
                                    className="rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white dark:bg-cyan-300 dark:text-slate-950"
                                >
                                    Continue in Support
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}