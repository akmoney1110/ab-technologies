import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    AlertCircle,
    AlertTriangle,
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BarChart3,
    Bell,
    Blocks,
    Bot,
    BrainCircuit,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    ClipboardCheck,
    Cloud,
    Code2,
    Database,
    Eye,
    FileCheck,
    FileLock2,
    FileSearch,
    FileText,
    Fingerprint,
    Globe,
    Headphones,
    KeyRound,
    Laptop,
    Layers,
    Lock,
    Mail,
    MessageSquare,
    Monitor,
    Network,
    PackageCheck,
    PhoneCall,
    RefreshCw,
    Router,
    Search,
    Server,
    Settings,
    Shield,
    ShieldAlert,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Target,
    Terminal,
    UserCheck,
    Users,
    Video,
    Wifi,
    Workflow,
    XCircle,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

/*
|--------------------------------------------------------------------------
| SECURITY SOLUTIONS
|--------------------------------------------------------------------------
|
| This page intentionally does NOT include:
| - Header
| - Navbar
| - Footer
|
| It is designed to sit underneath your global AB TECHNOLOGIES navigation.
|
| Requirements:
| - React
| - Tailwind CSS
| - lucide-react
|
|--------------------------------------------------------------------------
*/


/* -----------------------------------------------------------------------
   DATA
------------------------------------------------------------------------ */

const securityAreas = [
    {
        icon: ShieldCheck,
        title: "Cybersecurity",
        description:
            "Protect business applications, networks, devices, users and information against common cyber risks and unauthorized activity.",
        features: [
            "Security assessments",
            "Threat identification",
            "Security hardening",
            "Access controls",
            "Security policies",
            "Risk reduction",
        ],
    },
    {
        icon: Network,
        title: "Network Security",
        description:
            "Design and strengthen network environments with appropriate segmentation, access controls, secure configurations and monitoring.",
        features: [
            "Firewall configuration",
            "Network segmentation",
            "Secure Wi-Fi",
            "VPN infrastructure",
            "Traffic controls",
            "Network monitoring",
        ],
    },
    {
        icon: Fingerprint,
        title: "Identity & Access",
        description:
            "Help ensure that the right people have appropriate access to the right systems and information.",
        features: [
            "User accounts",
            "Role-based access",
            "Authentication",
            "MFA planning",
            "Privilege management",
            "Access reviews",
        ],
    },
    {
        icon: Laptop,
        title: "Endpoint Security",
        description:
            "Protect laptops, desktops and other business endpoints through appropriate security controls, configuration and management.",
        features: [
            "Endpoint hardening",
            "Device policies",
            "Patch management",
            "Security configuration",
            "Device inventory",
            "Endpoint monitoring",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud Security",
        description:
            "Improve the security posture of cloud-hosted applications, infrastructure, accounts, storage and connected services.",
        features: [
            "Cloud access controls",
            "Account security",
            "Storage protection",
            "Configuration reviews",
            "Backup planning",
            "Security monitoring",
        ],
    },
    {
        icon: FileLock2,
        title: "Data Protection",
        description:
            "Help organizations protect important information through access controls, backups, policies and appropriate data handling.",
        features: [
            "Data classification",
            "Access controls",
            "Backup strategy",
            "Encryption planning",
            "Retention policies",
            "Data handling",
        ],
    },
    {
        icon: Video,
        title: "Physical Security",
        description:
            "Support physical security environments including surveillance, access control and technology infrastructure.",
        features: [
            "CCTV systems",
            "Access control",
            "IP cameras",
            "Monitoring systems",
            "Network infrastructure",
            "Security deployment",
        ],
    },
    {
        icon: RefreshCw,
        title: "Backup & Recovery",
        description:
            "Build practical strategies for protecting important systems and recovering from accidental deletion, hardware failure or other disruptions.",
        features: [
            "Backup planning",
            "Recovery procedures",
            "Business continuity",
            "System redundancy",
            "Recovery testing",
            "Disaster preparation",
        ],
    },
];

const securityServices = [
    {
        icon: Search,
        title: "Security Assessment",
        text:
            "Review your technology environment, processes, devices and access controls to identify areas requiring attention.",
    },
    {
        icon: ShieldAlert,
        title: "Threat & Risk Review",
        text:
            "Identify realistic security risks based on your organization, systems, users, infrastructure and operating environment.",
    },
    {
        icon: Lock,
        title: "Security Hardening",
        text:
            "Improve system configurations, permissions and security controls to reduce unnecessary exposure.",
    },
    {
        icon: UserCheck,
        title: "Identity Management",
        text:
            "Help structure users, roles, permissions and access procedures across business systems.",
    },
    {
        icon: Wifi,
        title: "Secure Connectivity",
        text:
            "Design safer connections between offices, users, devices, applications and remote workers.",
    },
    {
        icon: Database,
        title: "Information Protection",
        text:
            "Help protect important business information through access controls, backups and appropriate security processes.",
    },
    {
        icon: Activity,
        title: "Monitoring",
        text:
            "Improve visibility into important systems and security events so unusual activity can be investigated.",
    },
    {
        icon: AlertCircle,
        title: "Incident Preparation",
        text:
            "Develop practical response procedures for security events and technology disruptions.",
    },
];

const deploymentSteps = [
    {
        number: "01",
        icon: MessageSquare,
        title: "Understand Your Environment",
        description:
            "We begin by understanding your organization, users, devices, applications, infrastructure and the information that matters most.",
    },
    {
        number: "02",
        icon: Search,
        title: "Identify Risks",
        description:
            "We examine likely weaknesses, unnecessary exposure, access issues and areas where stronger controls may be appropriate.",
    },
    {
        number: "03",
        icon: ClipboardCheck,
        title: "Prioritize",
        description:
            "Not every security improvement has the same urgency. We help separate important immediate actions from longer-term improvements.",
    },
    {
        number: "04",
        icon: ShieldCheck,
        title: "Implement Controls",
        description:
            "We can configure, deploy or coordinate appropriate technical and operational security measures.",
    },
    {
        number: "05",
        icon: Activity,
        title: "Test & Monitor",
        description:
            "Security should not end at installation. We help establish monitoring, review and testing processes where appropriate.",
    },
    {
        number: "06",
        icon: RefreshCw,
        title: "Maintain & Improve",
        description:
            "Technology changes continuously. We can help maintain and improve your security environment as your organization evolves.",
    },
];

const securityPrinciples = [
    {
        icon: Lock,
        title: "Least Privilege",
        description:
            "Users and systems should receive only the access required for their responsibilities.",
    },
    {
        icon: ShieldCheck,
        title: "Defense in Depth",
        description:
            "Important environments benefit from multiple complementary security controls rather than one protective layer.",
    },
    {
        icon: Eye,
        title: "Visibility",
        description:
            "You cannot effectively manage what you cannot see. Visibility helps organizations identify unusual activity and operational gaps.",
    },
    {
        icon: RefreshCw,
        title: "Resilience",
        description:
            "Security includes preparing the organization to continue operating and recover when something goes wrong.",
    },
    {
        icon: Users,
        title: "People & Process",
        description:
            "Technology alone is not enough. Users, policies, procedures and responsibilities matter.",
    },
    {
        icon: Settings,
        title: "Continuous Improvement",
        description:
            "Security is an ongoing process rather than a one-time installation.",
    },
];

const environments = [
    {
        icon: Building2,
        title: "Corporate Offices",
        description:
            "Secure employee devices, office networks, access systems, applications and business information.",
    },
    {
        icon: GraduationCapIcon,
        title: "Schools & Institutions",
        description:
            "Support secure technology environments for staff, students, administrators and institutional systems.",
    },
    {
        icon: Server,
        title: "Data & Server Environments",
        description:
            "Strengthen server environments, access controls, backups and infrastructure security.",
    },
    {
        icon: Cloud,
        title: "Cloud Operations",
        description:
            "Improve security around cloud applications, accounts, infrastructure and stored information.",
    },
    {
        icon: PackageCheck,
        title: "Retail & Operations",
        description:
            "Protect connected devices, networks, point-of-sale environments and operational systems.",
    },
    {
        icon: Globe,
        title: "Distributed Teams",
        description:
            "Help secure remote and hybrid work environments across locations and devices.",
    },
];

const technologyLayers = [
    {
        icon: Router,
        title: "Network Layer",
        items: [
            "Firewalls",
            "Routers",
            "Switches",
            "Wireless infrastructure",
            "VPN",
            "Network segmentation",
        ],
    },
    {
        icon: Laptop,
        title: "Endpoint Layer",
        items: [
            "Laptops",
            "Desktops",
            "Mobile devices",
            "Endpoint policies",
            "Patch management",
            "Device inventory",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud Layer",
        items: [
            "Cloud accounts",
            "Cloud applications",
            "Storage",
            "Virtual infrastructure",
            "Access controls",
            "Configuration",
        ],
    },
    {
        icon: Database,
        title: "Data Layer",
        items: [
            "Databases",
            "Documents",
            "Business records",
            "Backups",
            "Data access",
            "Retention",
        ],
    },
    {
        icon: UserCheck,
        title: "Identity Layer",
        items: [
            "User accounts",
            "Roles",
            "Permissions",
            "Authentication",
            "MFA",
            "Access reviews",
        ],
    },
    {
        icon: Monitor,
        title: "Monitoring Layer",
        items: [
            "Logs",
            "Alerts",
            "Events",
            "Health monitoring",
            "Incident visibility",
            "Reporting",
        ],
    },
];

const riskSignals = [
    "Shared user accounts",
    "Unknown devices on the network",
    "Old or unsupported software",
    "Uncontrolled administrator access",
    "No reliable backup strategy",
    "Employees using weak passwords",
    "Unsecured remote access",
    "Sensitive files stored without proper controls",
    "No documented incident process",
    "Security systems installed but not maintained",
    "Disconnected security technologies",
    "No regular access review",
];

const deliverables = [
    {
        icon: FileText,
        title: "Security Documentation",
        description:
            "Clear documentation covering relevant configurations, procedures, responsibilities and operational recommendations.",
    },
    {
        icon: Network,
        title: "Security Architecture",
        description:
            "A structured view of how your network, devices, applications and security controls should work together.",
    },
    {
        icon: ShieldCheck,
        title: "Security Configuration",
        description:
            "Implementation and configuration of appropriate security controls based on the agreed scope.",
    },
    {
        icon: Users,
        title: "Access Structure",
        description:
            "Logical user, role and permission structures that support controlled access.",
    },
    {
        icon: Database,
        title: "Backup Strategy",
        description:
            "A practical approach to protecting important information and improving recovery readiness.",
    },
    {
        icon: Activity,
        title: "Monitoring Setup",
        description:
            "Visibility into important systems, infrastructure and events where appropriate.",
    },
    {
        icon: ClipboardCheck,
        title: "Security Checklist",
        description:
            "A practical list of security improvements, priorities and maintenance activities.",
    },
    {
        icon: Headphones,
        title: "Ongoing Support",
        description:
            "Technical assistance, maintenance and continuous improvements after deployment.",
    },
];

const faqs = [
    {
        question: "What does AB TECHNOLOGIES mean by Security Solutions?",
        answer:
            "Security Solutions covers the broader protection of your technology environment. This can include cybersecurity, network security, identity and access management, endpoint security, cloud security, data protection, physical security technology, backups, monitoring, assessments and security consulting.",
    },
    {
        question: "Can you secure a business starting from scratch?",
        answer:
            "Yes. We can work from the beginning by understanding your organization, users, devices, applications and operational requirements, then help design a practical security foundation.",
    },
    {
        question: "Can you work with our existing systems?",
        answer:
            "Yes. We can assess an existing environment and determine what can be improved, configured, integrated or replaced rather than assuming everything needs to be rebuilt.",
    },
    {
        question: "Do you provide physical security solutions?",
        answer:
            "Yes. Depending on the project, this can include CCTV, IP cameras, access control technology, networking infrastructure and related deployment and support.",
    },
    {
        question: "Do you provide cybersecurity monitoring?",
        answer:
            "Monitoring requirements vary by organization. We can help assess what should be monitored and how alerts, logs, system health and security events can be managed within the agreed scope.",
    },
    {
        question: "Can you secure remote employees?",
        answer:
            "Yes. Remote work security can involve identity controls, authentication, secure connectivity, endpoint protection, device policies and appropriate access to company resources.",
    },
    {
        question: "Can you help if we do not know what is wrong?",
        answer:
            "Absolutely. You do not need to arrive with a technical diagnosis. You can describe the problem, concern or business requirement and we can help identify the appropriate next steps.",
    },
    {
        question: "Do you provide support after deployment?",
        answer:
            "Yes. Security environments require maintenance and periodic improvement. Depending on the engagement, we can provide technical support, configuration changes, monitoring assistance and ongoing improvements.",
    },
];

const securityStats = [
    {
        value: "01",
        label: "Understand",
        text: "Your environment",
    },
    {
        value: "02",
        label: "Protect",
        text: "Critical systems",
    },
    {
        value: "03",
        label: "Monitor",
        text: "Important activity",
    },
    {
        value: "04",
        label: "Recover",
        text: "When things go wrong",
    },
];


/* -----------------------------------------------------------------------
   HELPER COMPONENTS
------------------------------------------------------------------------ */

function GraduationCapIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 10 12 5 2 10l10 5 10-5Z" />
            <path d="M6 12v5c3 2 9 2 12 0v-5" />
            <path d="M22 10v6" />
        </svg>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
    centered = false,
}) {
    return (
        <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            {eyebrow && (
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
                    <ShieldCheck size={14} />
                    {eyebrow}
                </div>
            )}

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                {title}
            </h2>

            {description && (
                <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                    {description}
                </p>
            )}
        </div>
    );
}

function GlassCard({ children, className = "" }) {
    return (
        <div
            className={
                "rounded-3xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/20 " +
                className
            }
        >
            {children}
        </div>
    );
}

function CheckItem({ children, onClick }) {
    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-start gap-3 text-left transition hover:opacity-90"
            >
                <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400"
                />

                <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {children}
                </span>
            </button>
        );
    }

    return (
        <div className="flex items-start gap-3">
            <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400"
            />

            <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {children}
            </span>
        </div>
    );
}


/* -----------------------------------------------------------------------
   MAIN PAGE
------------------------------------------------------------------------ */

export default function SecuritySolutions() {
    const navigate = useNavigate();

    const [activeArea, setActiveArea] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);
    const [showRiskList, setShowRiskList] = useState(false);

    const selectedArea = securityAreas[activeArea];

    /* ============================================================
       SUPPORT REQUEST HELPER
       ============================================================ */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss Security Solutions for my organization.",
            metadata: metadata || {
                Source: "Security Solutions",
            },
        });

        navigate("/support/ai");
    };

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#070b14] dark:text-white">


            {/* ============================================================
               HERO
            ============================================================ */}

            <section className="relative isolate overflow-hidden border-b border-slate-200 dark:border-white/10">

                <div className="absolute inset-0 -z-20 bg-slate-50 dark:bg-[#070b14]" />

                <div className="absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />

                <div className="absolute right-[-180px] top-[-120px] -z-10 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />

                <div className="absolute bottom-[-180px] left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10" />

                <div className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.06]">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>


                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">

                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">


                        {/* HERO CONTENT */}

                        <div>

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
                                <Shield size={15} />
                                Security Solutions
                            </div>


                            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                                Protect what keeps your
                                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
                                    business moving.
                                </span>
                            </h1>


                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Practical security solutions for your people,
                                devices, networks, applications, information
                                and physical technology environment.
                            </p>


                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Whether you are starting from scratch,
                                strengthening an existing environment,
                                deploying security infrastructure or responding
                                to growing operational risks, we help you
                                understand what needs protection and build a
                                practical path forward.
                            </p>


                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss our security needs. Here's what we're trying to protect:",
                                            {
                                                Source: "Security Solutions",
                                                Stage: "Hero — discuss needs",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                >
                                    Discuss Your Security Needs
                                    <ArrowRight size={17} />
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your security services and capabilities.",
                                            {
                                                Source: "Security Solutions",
                                                Stage: "Hero — explore services",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/70 px-6 py-4 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                                >
                                    Explore Security Services
                                    <ChevronRight size={17} />
                                </button>

                            </div>


                            <div className="mt-9 flex flex-wrap gap-2">

                                {[
                                    "Cybersecurity",
                                    "Network Security",
                                    "Identity & Access",
                                    "Endpoint Security",
                                    "Cloud Security",
                                    "Physical Security",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to explore: ${item}.`,
                                                {
                                                    Source: "Security Solutions",
                                                    Topic: item,
                                                }
                                            )
                                        }
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                                    >
                                        {item}
                                    </button>
                                ))}

                            </div>

                        </div>


                        {/* HERO SECURITY VISUAL */}

                        <div className="relative">

                            <div className="absolute -inset-10 rounded-[3rem] bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#0c1320]/95 dark:shadow-black/30">


                                <div className="mb-5 flex items-center justify-between">

                                    <div>

                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                            Security posture
                                        </div>

                                        <div className="mt-1 text-sm font-black dark:text-white">
                                            Business Environment
                                        </div>

                                    </div>


                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400">
                                        <ShieldCheck size={20} />
                                    </div>

                                </div>


                                <div className="grid gap-3 sm:grid-cols-2">

                                    {[
                                        {
                                            icon: Network,
                                            label: "Network",
                                            value: "Protected",
                                            color: "blue",
                                        },
                                        {
                                            icon: Fingerprint,
                                            label: "Identity",
                                            value: "Controlled",
                                            color: "purple",
                                        },
                                        {
                                            icon: Laptop,
                                            label: "Endpoints",
                                            value: "Managed",
                                            color: "cyan",
                                        },
                                        {
                                            icon: Database,
                                            label: "Data",
                                            value: "Protected",
                                            color: "emerald",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;
                                        const colorMap = {
                                            blue: "bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400",
                                            purple: "bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400",
                                            cyan: "bg-cyan-500/10 text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-400",
                                            emerald: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400",
                                        };

                                        return (
                                            <button
                                                type="button"
                                                key={item.label}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Security posture — I'd like to discuss our ${item.label}: currently ${item.value}.`,
                                                        {
                                                            Source: "Security Solutions",
                                                            "Posture area": item.label,
                                                        }
                                                    )
                                                }
                                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[item.color]}`}>
                                                        <Icon size={19} />
                                                    </div>

                                                    <div>
                                                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                            {item.label}
                                                        </div>

                                                        <div className="text-sm font-black dark:text-white">
                                                            {item.value}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}

                                </div>


                                <div className="my-5 flex items-center justify-center">

                                    <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />

                                    <div className="mx-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-wider text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-500">
                                        Security layers
                                    </div>

                                    <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss our security controls — visibility, protection and recovery.",
                                            {
                                                Source: "Security Solutions",
                                                Stage: "Hero — security controls",
                                            }
                                        )
                                    }
                                    className="w-full rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-left transition hover:border-blue-400/40 dark:border-blue-400/20 dark:bg-blue-400/[0.06]"
                                >

                                    <div className="flex items-start gap-4">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400">
                                            <ShieldCheck size={21} />
                                        </div>

                                        <div className="flex-1">

                                            <div className="flex items-center justify-between gap-4">

                                                <div className="text-sm font-black dark:text-white">
                                                    Security controls
                                                </div>

                                                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                                                    Active
                                                </span>

                                            </div>

                                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">

                                                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-400 dark:to-emerald-400" />

                                            </div>

                                            <div className="mt-2 flex justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500">

                                                <span>
                                                    Visibility
                                                </span>

                                                <span>
                                                    Protection
                                                </span>

                                                <span>
                                                    Recovery
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </button>


                                <div className="mt-4 grid grid-cols-3 gap-3">

                                    {[
                                        ["Access", "Controlled", false],
                                        ["Risk", "Reviewed", false],
                                        ["Recovery", "Ready", true],
                                    ].map(([label, value, highlight]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Security posture — ${label}: ${value}.`,
                                                    {
                                                        Source: "Security Solutions",
                                                        Posture: label,
                                                    }
                                                )
                                            }
                                            className="rounded-xl bg-slate-50 p-3 text-left transition hover:bg-blue-50 dark:bg-white/[0.04] dark:hover:bg-blue-500/10"
                                        >
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                {label}
                                            </div>

                                            <div className={`mt-1 text-sm font-black ${highlight ? "text-emerald-600 dark:text-emerald-400" : "dark:text-white"}`}>
                                                {value}
                                            </div>
                                        </button>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               SECURITY MINDSET
            ============================================================ */}

            <section className="relative bg-white py-20 dark:bg-[#080d17] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Security mindset"
                        title="Security is not one product. It is an environment."
                        description="A firewall, antivirus application or camera system can be useful, but mature security requires multiple layers working together."
                    />


                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {securityPrinciples.map((item) => {

                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the security principle: ${item.title} — ${item.description}`,
                                            {
                                                Source: "Security Solutions",
                                                Principle: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>

                                </button>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* ============================================================
               SECURITY AREAS
            ============================================================ */}

            <section
                id="security-areas"
                className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28"
            >

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Security capabilities"
                        title="Protection across the technology environment."
                        description="Choose the area you need to strengthen, or let us assess your environment and help determine where to begin."
                    />


                    <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">


                        {/* CAPABILITY LIST */}

                        <div className="space-y-3">

                            {securityAreas.map((item, index) => {

                                const Icon = item.icon;

                                const active = activeArea === index;

                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => {
                                            setActiveArea(index);
                                            startSupportChat(
                                                `I'd like to explore the security capability: ${item.title}. ${item.description} Features: ${item.features.join(", ")}.`,
                                                {
                                                    Source: "Security Solutions",
                                                    Capability: item.title,
                                                }
                                            );
                                        }}
                                        className={
                                            "w-full rounded-2xl border p-5 text-left transition " +
                                            (active
                                                ? "border-blue-500/30 bg-white shadow-lg dark:border-blue-400/20 dark:bg-white/[0.07] dark:shadow-blue-400/5"
                                                : "border-slate-200 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.05]")
                                        }
                                    >

                                        <div className="flex items-center gap-4">

                                            <div
                                                className={
                                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl " +
                                                    (active
                                                        ? "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                                                        : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400")
                                                }
                                            >
                                                <Icon size={21} />
                                            </div>


                                            <div className="min-w-0 flex-1">

                                                <div className="font-black dark:text-white">
                                                    {item.title}
                                                </div>

                                                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                    {item.features
                                                        .slice(0, 3)
                                                        .join(" • ")}
                                                </div>

                                            </div>


                                            <ChevronRight
                                                size={18}
                                                className={
                                                    active
                                                        ? "text-blue-500 dark:text-blue-400"
                                                        : "text-slate-400 dark:text-slate-600"
                                                }
                                            />

                                        </div>

                                    </button>
                                );

                            })}

                        </div>


                        {/* SELECTED CAPABILITY */}

                        <GlassCard className="p-7 sm:p-9">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                {React.createElement(
                                    selectedArea.icon,
                                    {
                                        size: 26,
                                    }
                                )}
                            </div>


                            <h3 className="mt-7 text-2xl font-black sm:text-3xl dark:text-white">
                                {selectedArea.title}
                            </h3>


                            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                                {selectedArea.description}
                            </p>


                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {selectedArea.features.map((feature) => (
                                    <CheckItem
                                        key={feature}
                                        onClick={() =>
                                            startSupportChat(
                                                `For "${selectedArea.title}", I'd like to discuss: ${feature}.`,
                                                {
                                                    Source: "Security Solutions",
                                                    Capability: selectedArea.title,
                                                    Feature: feature,
                                                }
                                            )
                                        }
                                    >
                                        {feature}
                                    </CheckItem>
                                ))}

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to explore "${selectedArea.title}" in more detail.`,
                                        {
                                            Source: "Security Solutions",
                                            Capability: selectedArea.title,
                                            Stage: "Capability panel CTA",
                                        }
                                    )
                                }
                                className="mt-9 w-full rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-left transition hover:border-blue-400/40 dark:border-blue-400/20 dark:bg-blue-400/[0.06] dark:hover:border-blue-400/40"
                            >

                                <div className="flex gap-3">

                                    <Sparkles
                                        size={20}
                                        className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400"
                                    />

                                    <div>

                                        <div className="font-black dark:text-white">
                                            Designed around your environment
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            We do not assume that every
                                            organization needs the same
                                            security stack. We consider your
                                            users, infrastructure, budget,
                                            operational requirements and risk
                                            profile before recommending a
                                            practical approach.
                                        </p>

                                    </div>

                                </div>

                            </button>

                        </GlassCard>

                    </div>

                </div>

            </section>


            {/* ============================================================
               WHY SECURITY
            ============================================================ */}

            <section className="py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-14 lg:grid-cols-2">


                        <div>

                            <SectionHeading
                                eyebrow="Think beyond protection"
                                title="Good security protects operations, not just computers."
                                description="The real objective is to help your organization continue working with greater confidence while reducing unnecessary technology and information risks."
                            />


                            <div className="mt-8 space-y-4">

                                {[
                                    "Protect important business information.",
                                    "Control who can access systems and data.",
                                    "Reduce avoidable technology exposure.",
                                    "Improve visibility into important systems.",
                                    "Prepare for failures and disruptions.",
                                    "Build a security environment that can grow with the organization.",
                                ].map((item) => (
                                    <CheckItem
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Regarding security outcomes, I'd like to: ${item}`,
                                                {
                                                    Source: "Security Solutions",
                                                    "Security outcome": item,
                                                }
                                            )
                                        }
                                    >
                                        {item}
                                    </CheckItem>
                                ))}

                            </div>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            {securityStats.map((item) => (

                                <button
                                    type="button"
                                    key={item.value}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss the security stage: ${item.label} — ${item.text}.`,
                                            {
                                                Source: "Security Solutions",
                                                Stage: `${item.value} — ${item.label}`,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >

                                    <div className="text-4xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                                        {item.value}
                                    </div>

                                    <div className="mt-4 text-lg font-black dark:text-white">
                                        {item.label}
                                    </div>

                                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {item.text}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               RISK SIGNALS
            ============================================================ */}

            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400">
                                <AlertTriangle size={14} />
                                Warning signs
                            </div>


                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl dark:text-white">
                                Small security gaps can become operational problems.
                            </h2>


                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                You may not know that your environment has a
                                security weakness until something goes wrong.
                                Looking for warning signs early can help
                                organizations prioritize improvements.
                            </p>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowRiskList(!showRiskList)
                                }
                                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                            >
                                {showRiskList
                                    ? "Hide Warning Signs"
                                    : "View Warning Signs"}

                                <ChevronDown
                                    size={17}
                                    className={
                                        showRiskList
                                            ? "rotate-180 transition-transform"
                                            : "transition-transform"
                                    }
                                />
                            </button>

                        </div>


                        <div className="grid gap-3 sm:grid-cols-2">

                            {riskSignals.map((item, index) => {

                                const visible =
                                    showRiskList || index < 6;

                                if (!visible) {
                                    return null;
                                }

                                return (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `We may be experiencing this security warning sign: "${item}". I'd like to discuss it.`,
                                                {
                                                    Source: "Security Solutions",
                                                    "Risk signal": item,
                                                }
                                            )
                                        }
                                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-amber-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-amber-400/30"
                                    >

                                        <AlertCircle
                                            size={18}
                                            className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-400"
                                        />

                                        <span className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                                            {item}
                                        </span>

                                    </button>
                                );

                            })}

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               SECURITY SERVICES
            ============================================================ */}

            <section className="bg-white py-20 dark:bg-[#080d17] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="What we can help with"
                        title="Security services designed around real business requirements."
                        description="Security projects can range from a focused assessment to a complete technology deployment. We can help determine the appropriate scope."
                    />


                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {securityServices.map((item) => {

                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to explore the security service: ${item.title} — ${item.text}`,
                                            {
                                                Source: "Security Solutions",
                                                Service: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >

                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        <Icon size={21} />
                                    </div>


                                    <h3 className="mt-5 text-lg font-black dark:text-white">
                                        {item.title}
                                    </h3>


                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>

                                </button>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* ============================================================
               TECHNOLOGY LAYERS
            ============================================================ */}

            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Security architecture"
                        title="Think in layers."
                        description="A mature security environment considers multiple parts of the technology stack and how they interact."
                    />


                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {technologyLayers.map((layer) => {

                            const Icon = layer.icon;

                            return (
                                <div
                                    key={layer.title}
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                `I'd like to discuss the ${layer.title} of our security architecture: ${layer.items.join(", ")}.`,
                                                {
                                                    Source: "Security Solutions",
                                                    "Security layer": layer.title,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-4 text-left"
                                    >

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                            <Icon size={21} />
                                        </div>

                                        <h3 className="font-black dark:text-white">
                                            {layer.title}
                                        </h3>

                                    </button>


                                    <div className="mt-6 grid grid-cols-2 gap-2">

                                        {layer.items.map((item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `In the ${layer.title}, I'd like to discuss: ${item}.`,
                                                        {
                                                            Source: "Security Solutions",
                                                            "Security layer": layer.title,
                                                            Item: item,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-blue-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-blue-400/30"
                                            >
                                                {item}
                                            </button>
                                        ))}

                                    </div>

                                </div>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* ============================================================
               PHYSICAL SECURITY
            ============================================================ */}

            <section className="relative overflow-hidden py-20 lg:py-28">

                <div className="absolute left-[-150px] top-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10" />

                <div className="absolute right-[-150px] bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />


                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-black/20">

                        <div className="grid lg:grid-cols-2">


                            <div className="p-8 sm:p-10 lg:p-14">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
                                    <Video size={23} />
                                </div>


                                <div className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                                    Physical & electronic security
                                </div>


                                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl dark:text-white">
                                    Connect physical security with your IT environment.
                                </h2>


                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Security does not stop at the laptop.
                                    Offices, facilities, equipment rooms,
                                    entrances and sensitive areas can also
                                    require appropriate technology and
                                    controls.
                                </p>


                                <div className="mt-8 space-y-4">

                                    {[
                                        "CCTV and IP camera infrastructure",
                                        "Access control technology",
                                        "Secure networking for security devices",
                                        "Monitoring environments",
                                        "Security system deployment and configuration",
                                        "Maintenance and technical support",
                                    ].map((item) => (
                                        <CheckItem
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Regarding physical security, I'd like to discuss: ${item}.`,
                                                    {
                                                        Source: "Security Solutions",
                                                        "Physical security": item,
                                                    }
                                                )
                                            }
                                        >
                                            {item}
                                        </CheckItem>
                                    ))}

                                </div>

                            </div>


                            <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-10 lg:p-14">

                                <div className="absolute inset-0 opacity-20">

                                    <div
                                        className="h-full w-full"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                                            backgroundSize: "36px 36px",
                                        }}
                                    />

                                </div>


                                <div className="relative">

                                    <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                                        Example environment
                                    </div>


                                    <div className="mt-7 space-y-3">

                                        {[
                                            [
                                                "01",
                                                "Entrance",
                                                "Access control",
                                            ],
                                            [
                                                "02",
                                                "Facility",
                                                "IP surveillance",
                                            ],
                                            [
                                                "03",
                                                "Network",
                                                "Secure connectivity",
                                            ],
                                            [
                                                "04",
                                                "Monitoring",
                                                "Central visibility",
                                            ],
                                            [
                                                "05",
                                                "Support",
                                                "Maintenance",
                                            ],
                                        ].map(([number, title, type], index) => (
                                            <React.Fragment key={number}>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `Physical security — ${title}: ${type}.`,
                                                            {
                                                                Source: "Security Solutions",
                                                                "Physical stage": title,
                                                            }
                                                        )
                                                    }
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-white/10"
                                                >

                                                    <div className="flex items-center gap-4">

                                                        <span className="text-xs font-black text-slate-500">
                                                            {number}
                                                        </span>

                                                        <div className="flex-1">

                                                            <div className="font-black text-white">
                                                                {title}
                                                            </div>

                                                            <div className="mt-1 text-xs text-slate-400">
                                                                {type}
                                                            </div>

                                                        </div>

                                                        <CheckCircle2
                                                            size={17}
                                                            className="text-emerald-400"
                                                        />

                                                    </div>

                                                </button>

                                                {index < 4 && (
                                                    <div className="flex justify-center">
                                                        <ArrowDown
                                                            size={14}
                                                            className="text-cyan-400"
                                                        />
                                                    </div>
                                                )}

                                            </React.Fragment>
                                        ))}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               CLOUD SECURITY
            ============================================================ */}

            <section className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#080d17] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">


                        <div>

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-400">
                                <Cloud size={14} />
                                Cloud security
                            </div>


                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl dark:text-white">
                                Security follows your systems wherever they live.
                            </h2>


                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Modern organizations often depend on cloud
                                applications, hosted servers, remote access,
                                online storage and distributed users. These
                                environments need appropriate security
                                controls just like traditional infrastructure.
                            </p>


                            <div className="mt-8 grid gap-3 sm:grid-cols-2">

                                {[
                                    "Cloud account protection",
                                    "Identity and access controls",
                                    "Storage security",
                                    "Backup planning",
                                    "Configuration review",
                                    "Remote access security",
                                    "Application access",
                                    "Security monitoring",
                                ].map((item) => (
                                    <CheckItem
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Cloud security — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Security Solutions",
                                                    "Cloud security": item,
                                                }
                                            )
                                        }
                                    >
                                        {item}
                                    </CheckItem>
                                ))}

                            </div>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            {[
                                {
                                    icon: Cloud,
                                    title: "Cloud Platforms",
                                    text: "Secure access to cloud-hosted services and infrastructure.",
                                },
                                {
                                    icon: KeyRound,
                                    title: "Access",
                                    text: "Control who can reach important cloud resources.",
                                },
                                {
                                    icon: Database,
                                    title: "Storage",
                                    text: "Protect important information stored online.",
                                },
                                {
                                    icon: RefreshCw,
                                    title: "Recovery",
                                    text: "Plan how important information and services can be recovered.",
                                },
                            ].map((item) => {

                                const Icon = item.icon;

                                return (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Cloud security — ${item.title}: ${item.text}`,
                                                {
                                                    Source: "Security Solutions",
                                                    "Cloud area": item.title,
                                                }
                                            )
                                        }
                                        className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-indigo-400/30"
                                    >

                                        <Icon
                                            size={22}
                                            className="text-indigo-500 dark:text-indigo-400"
                                        />

                                        <h3 className="mt-5 font-black dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {item.text}
                                        </p>

                                    </button>
                                );

                            })}

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               BACKUP & RECOVERY
            ============================================================ */}

            <section className="py-20 lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-8 dark:border-emerald-400/20 dark:bg-emerald-400/[0.045] sm:p-10 lg:p-14">

                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">


                            <div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                                    <RefreshCw size={24} />
                                </div>


                                <h2 className="mt-7 text-3xl font-black tracking-tight dark:text-white">
                                    Protection includes recovery.
                                </h2>


                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    A security strategy should consider what
                                    happens when something fails. Reliable
                                    backups, documented recovery procedures
                                    and appropriate redundancy can make a
                                    major difference during disruption.
                                </p>


                                <div className="mt-7">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss recovery planning for our security strategy.",
                                                {
                                                    Source: "Security Solutions",
                                                    Stage: "Recovery planning CTA",
                                                }
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                    >
                                        Discuss Recovery Planning
                                        <ArrowRight size={16} />
                                    </button>

                                </div>

                            </div>


                            <div className="grid gap-4 sm:grid-cols-2">

                                {[
                                    {
                                        icon: Database,
                                        title: "Backup",
                                        text: "Protect important information through an appropriate backup strategy.",
                                    },
                                    {
                                        icon: FileCheck,
                                        title: "Verification",
                                        text: "Do not simply assume that a backup is usable. Recovery should be considered and tested.",
                                    },
                                    {
                                        icon: Server,
                                        title: "Redundancy",
                                        text: "Consider how critical services can remain available when individual components fail.",
                                    },
                                    {
                                        icon: ClipboardCheck,
                                        title: "Recovery Plan",
                                        text: "Document practical steps for restoring important systems and information.",
                                    },
                                ].map((item) => {

                                    const Icon = item.icon;

                                    return (
                                        <button
                                            type="button"
                                            key={item.title}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Recovery planning — ${item.title}: ${item.text}`,
                                                    {
                                                        Source: "Security Solutions",
                                                        "Recovery area": item.title,
                                                    }
                                                )
                                            }
                                            className="rounded-2xl border border-emerald-500/10 bg-white p-5 text-left transition hover:border-emerald-400/40 dark:border-emerald-400/10 dark:bg-white/5 dark:hover:border-emerald-400/40"
                                        >

                                            <Icon
                                                size={21}
                                                className="text-emerald-500 dark:text-emerald-400"
                                            />

                                            <h3 className="mt-4 font-black dark:text-white">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                {item.text}
                                            </p>

                                        </button>
                                    );

                                })}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               WHO WE SERVE
            ============================================================ */}

            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="Designed for different environments"
                        title="Security support across different types of organizations."
                        description="Every environment has different users, systems, operational priorities and risk considerations."
                    />


                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {environments.map((item) => {

                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss security for ${item.title}: ${item.description}`,
                                            {
                                                Source: "Security Solutions",
                                                Environment: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-white/10 dark:text-blue-400">
                                        <Icon size={22} />
                                    </div>


                                    <h3 className="mt-6 text-xl font-black dark:text-white">
                                        {item.title}
                                    </h3>


                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>

                                </button>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* ============================================================
               DEPLOYMENT PROCESS
            ============================================================ */}

            <section className="bg-white py-20 dark:bg-[#080d17] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="How we work"
                        title="Security implementation should be deliberate."
                        description="We take a structured approach so security recommendations are connected to the actual environment and business requirements."
                    />


                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {deploymentSteps.map((step) => {

                            const Icon = step.icon;

                            return (
                                <button
                                    type="button"
                                    key={step.number}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to understand the security step: "${step.title}" — ${step.description}`,
                                            {
                                                Source: "Security Solutions",
                                                Step: `${step.number} — ${step.title}`,
                                            }
                                        )
                                    }
                                    className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-7 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                            <Icon size={21} />
                                        </div>


                                        <div className="text-4xl font-black text-slate-100 dark:text-white/5">
                                            {step.number}
                                        </div>

                                    </div>


                                    <h3 className="mt-7 text-xl font-black dark:text-white">
                                        {step.title}
                                    </h3>


                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {step.description}
                                    </p>

                                </button>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* ============================================================
               SECURITY ASSESSMENT
            ============================================================ */}

            <section className="relative overflow-hidden border-y border-slate-200 py-20 dark:border-white/10 lg:py-28">

                <div className="absolute left-[-120px] top-20 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-400/10" />

                <div className="absolute right-[-120px] bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />


                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">


                        <div>

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400">
                                <FileSearch size={14} />
                                Security assessment
                            </div>


                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl dark:text-white">
                                Not sure where your security stands?
                            </h2>


                            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                Start with understanding. We can review the
                                technology environment, identify areas of
                                concern and help you develop a practical
                                priority list rather than making assumptions.
                            </p>


                            <div className="mt-8 space-y-4">

                                {[
                                    "What systems do you depend on?",
                                    "Who has access to them?",
                                    "Which information is most important?",
                                    "How are devices managed?",
                                    "How is remote access handled?",
                                    "How would you recover from a disruption?",
                                ].map((question) => (
                                    <button
                                        type="button"
                                        key={question}
                                        onClick={() =>
                                            startSupportChat(
                                                `Security assessment question: ${question} I'd like to discuss this.`,
                                                {
                                                    Source: "Security Solutions",
                                                    "Assessment question": question,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-3 text-left transition hover:opacity-90"
                                    >

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400">
                                            <Search size={14} />
                                        </div>

                                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                            {question}
                                        </span>

                                    </button>
                                ))}

                            </div>

                        </div>


                        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] sm:p-9">

                            <div className="flex items-center justify-between">

                                <div>

                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                        Assessment framework
                                    </div>

                                    <div className="mt-1 text-xl font-black dark:text-white">
                                        Security Review
                                    </div>

                                </div>


                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400">
                                    <ClipboardCheck size={21} />
                                </div>

                            </div>


                            <div className="mt-7 space-y-3">

                                {[
                                    [
                                        "People",
                                        "Users & responsibilities",
                                    ],
                                    [
                                        "Devices",
                                        "Endpoints & equipment",
                                    ],
                                    [
                                        "Network",
                                        "Connectivity & controls",
                                    ],
                                    [
                                        "Applications",
                                        "Business software",
                                    ],
                                    [
                                        "Data",
                                        "Important information",
                                    ],
                                    [
                                        "Recovery",
                                        "Backups & continuity",
                                    ],
                                ].map(([title, text]) => (

                                    <button
                                        type="button"
                                        key={title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Security review — ${title}: ${text}`,
                                                {
                                                    Source: "Security Solutions",
                                                    "Review area": title,
                                                }
                                            )
                                        }
                                        className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                    >

                                        <CheckCircle2
                                            size={19}
                                            className="shrink-0 text-emerald-500 dark:text-emerald-400"
                                        />

                                        <div className="flex-1">

                                            <div className="text-sm font-black dark:text-white">
                                                {title}
                                            </div>

                                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {text}
                                            </div>

                                        </div>

                                        <ChevronRight
                                            size={16}
                                            className="text-slate-400 dark:text-slate-600"
                                        />

                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               DELIVERABLES
            ============================================================ */}

            <section className="bg-white py-20 dark:bg-[#080d17] lg:py-28">

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        eyebrow="What you can receive"
                        title="Security work should leave you with something useful."
                        description="Depending on your engagement, we can provide technology, configuration, documentation, recommendations, implementation and ongoing support."
                    />


                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {deliverables.map((item) => {

                            const Icon = item.icon;

                            return (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss this security deliverable: ${item.title} — ${item.description}`,
                                            {
                                                Source: "Security Solutions",
                                                Deliverable: item.title,
                                            }
                                        )
                                    }
                                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-blue-400/30"
                                >

                                    <Icon
                                        size={22}
                                        className="text-blue-600 dark:text-blue-400"
                                    />

                                    <h3 className="mt-5 font-black dark:text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>

                                </button>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* ============================================================
               FROM SCRATCH
            ============================================================ */}

            <section className="relative overflow-hidden py-20 lg:py-28">

                <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />

                <div className="absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-400/10" />


                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:shadow-black/20">

                        <div className="grid lg:grid-cols-2">


                            <div className="p-8 sm:p-10 lg:p-14">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                    <Sparkles size={24} />
                                </div>


                                <div className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                    Start from scratch
                                </div>


                                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl dark:text-white">
                                    You do not have to understand security before contacting us.
                                </h2>


                                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Maybe you are opening a new office, setting
                                    up a company, deploying computers,
                                    connecting branches, moving to the cloud
                                    or simply realizing that your current
                                    security is not where it should be.
                                </p>


                                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Tell us what you are trying to achieve. We
                                    can help turn the requirement into a
                                    practical security plan.
                                </p>


                                <div className="mt-8 space-y-4">

                                    {[
                                        "New business technology environment",
                                        "Existing environment needs strengthening",
                                        "Office or facility security deployment",
                                        "Network security improvement",
                                        "Cloud and remote access security",
                                        "Backup and recovery planning",
                                    ].map((item) => (
                                        <CheckItem
                                            key={item}
                                            onClick={() =>
                                                startSupportChat(
                                                    `Starting security from scratch — I'd like to discuss: ${item}.`,
                                                    {
                                                        Source: "Security Solutions",
                                                        "Starting point": item,
                                                    }
                                                )
                                            }
                                        >
                                            {item}
                                        </CheckItem>
                                    ))}

                                </div>

                            </div>


                            <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-10 lg:p-14">

                                <div className="absolute inset-0 opacity-20">

                                    <div
                                        className="h-full w-full"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                                            backgroundSize: "38px 38px",
                                        }}
                                    />

                                </div>


                                <div className="relative">

                                    <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                                        Security foundation
                                    </div>


                                    <div className="mt-7 space-y-3">

                                        {[
                                            [
                                                "01",
                                                "People",
                                                "Users & responsibilities",
                                            ],
                                            [
                                                "02",
                                                "Access",
                                                "Identity & permissions",
                                            ],
                                            [
                                                "03",
                                                "Infrastructure",
                                                "Networks & devices",
                                            ],
                                            [
                                                "04",
                                                "Information",
                                                "Data & applications",
                                            ],
                                            [
                                                "05",
                                                "Resilience",
                                                "Backup & recovery",
                                            ],
                                        ].map(([number, title, text], index) => (
                                            <React.Fragment key={number}>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startSupportChat(
                                                            `Security foundation — ${title}: ${text}`,
                                                            {
                                                                Source: "Security Solutions",
                                                                "Foundation stage": title,
                                                            }
                                                        )
                                                    }
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-blue-400/40 hover:bg-white/10"
                                                >

                                                    <div className="flex items-center gap-4">

                                                        <span className="text-xs font-black text-slate-500">
                                                            {number}
                                                        </span>

                                                        <div className="flex-1">

                                                            <div className="font-black text-white">
                                                                {title}
                                                            </div>

                                                            <div className="mt-1 text-xs text-slate-400">
                                                                {text}
                                                            </div>

                                                        </div>

                                                        <ShieldCheck
                                                            size={17}
                                                            className="text-blue-400"
                                                        />

                                                    </div>

                                                </button>

                                                {index < 4 && (
                                                    <div className="flex justify-center">
                                                        <ArrowDown
                                                            size={14}
                                                            className="text-blue-400"
                                                        />
                                                    </div>
                                                )}

                                            </React.Fragment>
                                        ))}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ============================================================
               FAQ
            ============================================================ */}

            <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-[#0a101c] lg:py-28">

                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

                    <SectionHeading
                        centered
                        eyebrow="Frequently asked questions"
                        title="Security without the unnecessary complexity."
                        description="A few common questions before starting a security project."
                    />


                    <div className="mt-12 space-y-3">

                        {faqs.map((faq, index) => {

                            const open = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]"
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(
                                                open ? null : index
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                    >

                                        <span className="text-sm font-black sm:text-base dark:text-white">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            size={19}
                                            className={
                                                "shrink-0 text-slate-400 transition-transform dark:text-slate-500 " +
                                                (open ? "rotate-180" : "")
                                            }
                                        />

                                    </button>


                                    {open && (
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
                                                            Source: "Security Solutions",
                                                            FAQ: faq.question,
                                                        }
                                                    )
                                                }
                                                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                                            >
                                                Discuss this with AB AI
                                                <ArrowRight size={13} />
                                            </button>

                                        </div>
                                    )}

                                </div>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* ============================================================
               FINAL CTA
            ============================================================ */}

            <section
                id="start-security"
                className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 dark:bg-[#020812]"
            >

                <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-400/20" />

                <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10" />


                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-300 ring-1 ring-white/10 dark:bg-white/5">
                        <ShieldCheck size={27} />
                    </div>


                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-300 dark:border-white/10 dark:bg-white/5">
                        <Sparkles size={14} />
                        Build with confidence
                    </div>


                    <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Let us help you build a safer technology environment.
                    </h2>


                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        Whether you need a security assessment, network
                        protection, endpoint security, physical security,
                        cloud controls, backup planning or a complete security
                        deployment, start with the problem and we will help
                        you determine the next step.
                    </p>


                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a security solution. Here's what we need:",
                                    {
                                        Source: "Security Solutions",
                                        Stage: "Final CTA — request solution",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                        >
                            Request a Security Solution
                            <ArrowRight size={17} />
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to talk with your team about our security environment.",
                                    {
                                        Source: "Security Solutions",
                                        Stage: "Final CTA — talk to team",
                                    }
                                )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                            Talk to Our Team
                            <ArrowUpRight size={17} />
                        </button>

                    </div>


                    <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-400">

                        {[
                            "Start from scratch",
                            "Strengthen existing systems",
                            "Deploy security infrastructure",
                            "Ongoing support",
                        ].map((label) => (
                            <button
                                type="button"
                                key={label}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to discuss: ${label}.`,
                                        {
                                            Source: "Security Solutions",
                                            "Final bullet": label,
                                        }
                                    )
                                }
                                className="inline-flex items-center gap-2 transition hover:text-white"
                            >
                                <CheckCircle2
                                    size={14}
                                    className="text-emerald-400"
                                />
                                {label}
                            </button>
                        ))}

                    </div>

                </div>

            </section>

        </main>
    );
}