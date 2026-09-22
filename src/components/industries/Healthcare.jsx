import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    BadgeCheck,
    BarChart3,
    BellRing,
    Building2,
    CheckCircle2,
    ChevronRight,
    Cloud,
    Cpu,
    Database,
    FileCheck2,
    Headphones,
    HeartPulse,
    Hospital,
    KeyRound,
    Laptop,
    LockKeyhole,
    MonitorSmartphone,
    Network,
    PackageCheck,
    Pill,
    Radio,
    ScanLine,
    Server,
    ShieldCheck,
    Stethoscope,
    Tablets,
    Users,
    Wifi,
    Workflow,
    Wrench,
    Zap,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

export default function Healthcare() {
    const navigate = useNavigate();

    // Queue a contextual healthcare request, then hand the visitor to AI support.
    const startSupportChat = (message, metadata = {}) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss a healthcare technology project for my organization.",
            metadata: {
                Source: "Healthcare",
                ...metadata,
            },
        });

        navigate("/support/ai");
    };
    const solutions = [
        {
            icon: HeartPulse,
            title: "Healthcare IT Infrastructure",
            description:
                "Plan, source, deploy and support the technology infrastructure healthcare organizations need for reliable day-to-day operations.",
            items: [
                "Workstations and clinical computers",
                "Servers and storage infrastructure",
                "Network infrastructure",
                "Wi-Fi deployment",
                "Structured cabling",
                "Backup infrastructure",
            ],
        },
        {
            icon: Hospital,
            title: "Hospital & Clinic Technology",
            description:
                "Technology procurement and implementation support for hospitals, clinics, diagnostic centers, pharmacies and other healthcare facilities.",
            items: [
                "Hospital workstations",
                "Reception systems",
                "Nursing stations",
                "Administrative systems",
                "Patient-facing technology",
                "Facility-wide connectivity",
            ],
        },
        {
            icon: Database,
            title: "Healthcare Data Systems",
            description:
                "Build and support secure systems that help healthcare organizations manage information, workflows, records and operational data.",
            items: [
                "Database infrastructure",
                "Digital records",
                "Data management",
                "Reporting systems",
                "Information workflows",
                "Secure storage",
            ],
        },
        {
            icon: Workflow,
            title: "Workflow Automation",
            description:
                "Reduce repetitive administrative work by connecting systems, automating workflows and creating smarter operational processes.",
            items: [
                "Patient workflow automation",
                "Administrative automation",
                "Notifications",
                "Approvals",
                "Document workflows",
                "System integrations",
            ],
        },
        {
            icon: ShieldCheck,
            title: "Security & Access Control",
            description:
                "Help healthcare organizations strengthen access control, device security, network protection and information security practices.",
            items: [
                "User access management",
                "Endpoint protection",
                "Network security",
                "Secure authentication",
                "Access monitoring",
                "Security configuration",
            ],
        },
        {
            icon: Cloud,
            title: "Cloud & Digital Infrastructure",
            description:
                "Modernize healthcare technology with appropriate cloud, hosting, backup, collaboration and digital infrastructure services.",
            items: [
                "Cloud hosting",
                "Managed infrastructure",
                "Backup solutions",
                "Cloud migration",
                "Remote access",
                "Digital collaboration",
            ],
        },
    ];

    const procurement = [
        {
            icon: Laptop,
            title: "Computers & Workstations",
            description:
                "Desktop computers, laptops, monitors, docking stations, keyboards, mice and complete workstation packages.",
        },
        {
            icon: Server,
            title: "Servers & Storage",
            description:
                "Server hardware, NAS, storage systems, backup devices and infrastructure components for organizational workloads.",
        },
        {
            icon: Network,
            title: "Networking Equipment",
            description:
                "Switches, routers, access points, firewalls, network accessories, racks and structured cabling components.",
        },
        {
            icon: Tablets,
            title: "Mobile & Clinical Devices",
            description:
                "Tablets, mobile workstations and appropriate technology devices for healthcare staff and operational teams.",
        },
        {
            icon: ScanLine,
            title: "Printing & Scanning",
            description:
                "Printers, scanners, multifunction devices, consumables and document-management hardware.",
        },
        {
            icon: Radio,
            title: "Communication Equipment",
            description:
                "Communication devices and supporting infrastructure for coordination between departments and teams.",
        },
        {
            icon: PackageCheck,
            title: "Bulk Procurement",
            description:
                "Consolidated purchasing for healthcare groups, hospital projects, branch rollouts and institutional requirements.",
        },
        {
            icon: Wrench,
            title: "Installation & Configuration",
            description:
                "Device preparation, deployment, configuration, connectivity and practical implementation support.",
        },
    ];

    const departments = [
        "Hospitals",
        "Private clinics",
        "Diagnostic centers",
        "Medical laboratories",
        "Pharmacies",
        "Dental practices",
        "Specialist centers",
        "Health insurance organizations",
        "Medical training institutions",
        "Healthcare NGOs",
        "Public health organizations",
        "Healthcare administration offices",
    ];

    const capabilities = [
        {
            icon: Users,
            title: "Patient-Facing Operations",
            text:
                "Support the technology used across reception, registration, scheduling, communications and other patient-facing operational workflows.",
        },
        {
            icon: Stethoscope,
            title: "Clinical Workflows",
            text:
                "Provide infrastructure and digital systems that help clinical teams access the technology and information they need to perform their roles efficiently.",
        },
        {
            icon: BarChart3,
            title: "Administration & Reporting",
            text:
                "Improve administrative visibility with dashboards, reporting systems, workflow tools and structured information management.",
        },
        {
            icon: LockKeyhole,
            title: "Information Protection",
            text:
                "Design technology environments around appropriate access controls, security practices, backups and operational safeguards.",
        },
        {
            icon: MonitorSmartphone,
            title: "Connected Facilities",
            text:
                "Connect offices, departments, branches and facilities through reliable network and communication infrastructure.",
        },
        {
            icon: Headphones,
            title: "Ongoing IT Support",
            text:
                "Provide continuing technical support, troubleshooting, maintenance and technology lifecycle assistance.",
        },
    ];

    const process = [
        {
            number: "01",
            title: "Understand the Facility",
            text:
                "We begin by understanding your organization, departments, users, facilities, existing technology, operational requirements and planned growth.",
        },
        {
            number: "02",
            title: "Assess Requirements",
            text:
                "We translate operational requirements into practical technology, procurement, infrastructure, software and support requirements.",
        },
        {
            number: "03",
            title: "Design the Solution",
            text:
                "We develop a suitable solution architecture covering equipment, software, connectivity, security, deployment and support.",
        },
        {
            number: "04",
            title: "Source & Verify",
            text:
                "We identify suitable products and suppliers, compare options and verify specifications before procurement.",
        },
        {
            number: "05",
            title: "Procure & Coordinate",
            text:
                "We coordinate purchasing, quantities, documentation, supplier communication and delivery requirements.",
        },
        {
            number: "06",
            title: "Deploy & Configure",
            text:
                "We can prepare, install, configure and connect the technology according to the agreed implementation plan.",
        },
        {
            number: "07",
            title: "Test & Handover",
            text:
                "We validate the deployment, resolve implementation issues and provide the relevant handover information.",
        },
        {
            number: "08",
            title: "Support & Improve",
            text:
                "After deployment, we can continue supporting the environment and identify opportunities for improvement and modernization.",
        },
    ];

    const reasons = [
        {
            icon: BadgeCheck,
            title: "One Technology Partner",
            text:
                "Instead of coordinating several disconnected technology vendors, organizations can use one partner across sourcing, infrastructure, software, deployment and support.",
        },
        {
            icon: FileCheck2,
            title: "Clear Procurement",
            text:
                "We help structure requirements, specifications, quantities and procurement documentation so projects are easier to understand and manage.",
        },
        {
            icon: ShieldCheck,
            title: "Security-Conscious",
            text:
                "Healthcare technology requires careful handling of systems, accounts, devices and information. Security is considered throughout the technology lifecycle.",
        },
        {
            icon: Zap,
            title: "Built for Operations",
            text:
                "Our goal is not simply to supply devices. We focus on whether the technology works within the organization's actual operational environment.",
        },
        {
            icon: BarChart3,
            title: "Scalable Approach",
            text:
                "Solutions can be planned for a single clinic, a hospital facility, multiple branches or a growing healthcare organization.",
        },
        {
            icon: Headphones,
            title: "Long-Term Support",
            text:
                "Technology does not end at delivery. We can remain involved through maintenance, troubleshooting, upgrades and future projects.",
        },
    ];

    const projects = [
        "New clinic technology setup",
        "Hospital IT infrastructure deployment",
        "Healthcare branch expansion",
        "Clinic networking project",
        "Medical office workstation rollout",
        "Server and storage deployment",
        "Cloud migration project",
        "Digital records infrastructure",
        "Healthcare communication systems",
        "Cybersecurity improvement project",
        "Bulk computer procurement",
        "IT maintenance and support",
    ];

    const faqs = [
        {
            q: "Can you help a healthcare organization starting from scratch?",
            a:
                "Yes. We can support projects from the planning stage through requirements definition, sourcing, procurement, infrastructure, software, deployment, training coordination and ongoing support.",
        },
        {
            q: "Can you supply hardware in bulk?",
            a:
                "Yes. We can assist with bulk technology procurement based on required specifications, quantities, budget, delivery requirements and deployment timelines.",
        },
        {
            q: "Can you work with existing IT infrastructure?",
            a:
                "Yes. We can assess existing environments and help improve, extend, replace or integrate existing technology where appropriate.",
        },
        {
            q: "Do you provide software development?",
            a:
                "Yes. We can design and develop custom web applications, business systems, portals, dashboards, workflow tools and integrations where an off-the-shelf product does not meet the organization's requirements.",
        },
        {
            q: "Can you support multiple healthcare locations?",
            a:
                "Yes. Multi-location projects can be planned around standardized equipment, connectivity, deployment procedures, security requirements and centralized support.",
        },
        {
            q: "Can you help source products internationally?",
            a:
                "We can assist with supplier discovery and international sourcing requirements, subject to product availability, commercial terms, logistics, import requirements and project conditions.",
        },
        {
            q: "Do you provide ongoing IT support?",
            a:
                "Yes. Support can include troubleshooting, maintenance, infrastructure monitoring, user support, device management, upgrades and technology lifecycle planning.",
        },
        {
            q: "Can you help with technology budgeting?",
            a:
                "Yes. We can help translate operational requirements into technology categories, quantities, specifications and procurement options that can be used for budgeting and quotation exercises.",
        },
    ];

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
            {/* HERO */}
            <section className="relative isolate">
                <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.12),transparent_30%),linear-gradient(135deg,#f8fafc,#eef6f7_48%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.14),transparent_30%),linear-gradient(135deg,#020617,#071a22_48%,#020617)]" />

                <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-20 dark:[background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
                        <div>
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-700 shadow-sm backdrop-blur dark:border-sky-900/70 dark:bg-white/[0.04] dark:text-sky-300">
                                <HeartPulse className="h-4 w-4" />
                                Healthcare Technology & Infrastructure
                            </div>

                            <h1 className="max-w-5xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
                                Technology that helps{" "}
                                <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300">
                                    healthcare work better.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                                From a new clinic starting from scratch to an established
                                healthcare organization modernizing its infrastructure, we
                                provide technology sourcing, software, networking, security,
                                cloud, deployment and ongoing IT support under one coordinated
                                approach.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#healthcare-solutions"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                >
                                    Explore Healthcare Solutions
                                    <ArrowRight className="h-4 w-4" />
                                </a>

                                <a
                                    href="#healthcare-process"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    See How We Work
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    ["01", "Source"],
                                    ["02", "Build"],
                                    ["03", "Deploy"],
                                    ["04", "Support"],
                                ].map(([number, label]) => (
                                    <div
                                        key={number}
                                        className="rounded-2xl border border-slate-200/80 bg-white/65 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.035]"
                                    >
                                        <div className="text-xs font-black tracking-widest text-sky-600 dark:text-sky-400">
                                            {number}
                                        </div>
                                        <div className="mt-1 font-bold">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-10 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-400/10" />

                            <div className="relative rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                                Healthcare Technology
                                            </div>
                                            <div className="mt-1 text-lg font-black">
                                                Connected Care Environment
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-300">
                                            <Activity className="h-6 w-6" />
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        {[
                                            {
                                                icon: Network,
                                                title: "Network",
                                                text: "Connected",
                                            },
                                            {
                                                icon: ShieldCheck,
                                                title: "Security",
                                                text: "Protected",
                                            },
                                            {
                                                icon: Cloud,
                                                title: "Cloud",
                                                text: "Available",
                                            },
                                            {
                                                icon: Database,
                                                title: "Data",
                                                text: "Managed",
                                            },
                                        ].map(({ icon: Icon, title, text }) => (
                                            <div
                                                key={title}
                                                className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                                            >
                                                <Icon className="h-5 w-5 text-cyan-300" />
                                                <div className="mt-4 text-sm font-bold">{title}</div>
                                                <div className="mt-1 text-xs text-slate-400">
                                                    {text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-teal-400/5 p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                                                <Workflow className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold">
                                                    Digital Operations
                                                </div>
                                                <div className="mt-1 text-xs text-slate-400">
                                                    Systems • Workflows • People • Infrastructure
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-400">
                                        <span>Technology lifecycle</span>
                                        <span className="font-bold text-emerald-300">
                                            Plan → Deploy → Support
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="relative border-y border-slate-200/70 bg-white py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                                More than hardware
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Healthcare needs an entire technology environment.
                            </h2>
                        </div>

                        <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                            <p>
                                A healthcare organization may need computers, connectivity,
                                servers, software, security, cloud services, communications,
                                backups and technical support at the same time. Buying these
                                independently can create disconnected systems, inconsistent
                                configurations and unnecessary operational complexity.
                            </p>

                            <p>
                                Our healthcare offering is designed around the complete
                                technology lifecycle. We can help define what is needed,
                                identify suitable products, coordinate procurement, implement
                                infrastructure, build software, connect systems and continue
                                supporting the environment after deployment.
                            </p>

                            <p className="font-semibold text-slate-900 dark:text-white">
                                The objective is simple: give healthcare organizations a
                                technology partner that understands the relationship between
                                equipment, software, infrastructure, people and operations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOLUTIONS */}
            <section
                id="healthcare-solutions"
                className="relative overflow-hidden py-20 lg:py-28"
            >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(14,165,233,0.08),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(20,184,166,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(14,165,233,0.1),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(20,184,166,0.08),transparent_28%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                            Healthcare solutions
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Everything from the infrastructure underneath to the systems
                            your teams use every day.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            Our capabilities can be combined into one project or selected
                            individually depending on the organization's needs.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {solutions.map(
                            ({ icon: Icon, title, description, items }, index) => (
                                <button
                                    type="button"
                                    key={title}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss ${title} for our healthcare organization.`,
                                            {
                                                Intent: "Healthcare solution",
                                                Solution: title,
                                            }
                                        )
                                    }
                                    className="group rounded-[1.75rem] border border-slate-200 bg-white/80 p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-900/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.055]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="rounded-2xl bg-sky-50 p-3.5 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <span className="text-xs font-black text-slate-300 dark:text-slate-700">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 text-xl font-black">{title}</h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>

                                    <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 dark:border-white/10">
                                        {items.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300"
                                            >
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-7 flex items-center gap-2 text-sm font-bold text-sky-600 transition group-hover:gap-3 dark:text-sky-400">
                                        Explore capability
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </button>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* PROCUREMENT */}
            <section className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-slate-900/50 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
                        <div className="max-w-3xl">
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                                Procurement
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Source the technology your facility actually needs.
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                From individual devices to complete technology packages, we
                                can help structure requirements and coordinate procurement
                                around specifications, quantities, budgets and deployment
                                plans.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-teal-200 bg-white px-5 py-4 text-sm font-bold text-teal-700 shadow-sm dark:border-teal-900/60 dark:bg-white/[0.04] dark:text-teal-300">
                            Hardware • Software • Infrastructure
                        </div>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {procurement.map(({ icon: Icon, title, description }) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like help sourcing or procuring ${title} for a healthcare organization.`,
                                        {
                                            Intent: "Healthcare procurement",
                                            Procurement: title,
                                        }
                                    )
                                }
                                className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:border-teal-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/50 dark:hover:border-teal-800"
                            >
                                <Icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                                <h3 className="mt-5 font-black">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                                Operational coverage
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Technology aligned with the way healthcare organizations
                                operate.
                            </h2>

                            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
                                Different departments have different technology requirements.
                                We approach the environment as a connected ecosystem rather
                                than a collection of isolated devices.
                            </p>

                            <div className="mt-8 rounded-3xl border border-sky-200 bg-sky-50/70 p-6 dark:border-sky-900/60 dark:bg-sky-950/20">
                                <div className="flex gap-4">
                                    <div className="rounded-xl bg-sky-600 p-2.5 text-white dark:bg-sky-500">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black">Connected technology model</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            People + devices + networks + applications + data +
                                            security + support.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {capabilities.map(({ icon: Icon, title, text }) => (
                                <div
                                    key={title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-white/[0.07] dark:text-slate-200">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-black">{title}</h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FROM SCRATCH */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-20 bg-slate-950" />

                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_30%,rgba(14,165,233,0.22),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(20,184,166,0.18),transparent_30%)]" />

                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                        <div className="text-white">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                                <Zap className="h-4 w-4" />
                                Starting from scratch?
                            </div>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                You don't have to figure out the entire technology stack
                                yourself.
                            </h2>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                                If you are opening a new clinic, expanding a healthcare
                                facility or creating a new department, we can help turn the
                                idea into a structured technology plan.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Requirements planning",
                                    "Technology architecture",
                                    "Hardware sourcing",
                                    "Software development",
                                    "Network deployment",
                                    "Security configuration",
                                    "Cloud & hosting",
                                    "Staff technology setup",
                                    "Documentation",
                                    "Ongoing support",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
                            <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Example project journey
                            </div>

                            <div className="mt-6 space-y-3">
                                {[
                                    ["01", "Facility requirements", Building2],
                                    ["02", "Technology blueprint", Cpu],
                                    ["03", "Procurement & sourcing", PackageCheck],
                                    ["04", "Infrastructure deployment", Network],
                                    ["05", "Applications & workflows", Workflow],
                                    ["06", "Testing & handover", CheckCircle2],
                                    ["07", "Support & optimization", Headphones],
                                ].map(([number, title, Icon]) => (
                                    <div
                                        key={number}
                                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                                    >
                                        <div className="text-xs font-black text-cyan-300">
                                            {number}
                                        </div>

                                        <div className="rounded-xl bg-white/[0.07] p-2.5 text-slate-200">
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        <div className="flex-1 text-sm font-bold text-white">
                                            {title}
                                        </div>

                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRIES / ORGANIZATIONS */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                            Healthcare organizations
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Designed for different healthcare environments.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            The technology model can be adapted to the size, structure,
                            operational complexity and growth plans of the organization.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        {departments.map((department) => (
                            <div
                                key={department}
                                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300"
                            >
                                {department}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                                Project types
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                From individual requirements to complete technology projects.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Whether you need a few devices or a coordinated technology
                                deployment, the engagement can be structured around the scope
                                of your project.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {projects.map((project, index) => (
                                <button
                                    type="button"
                                    key={project}
                                    onClick={() =>
                                        startSupportChat(
                                            `I'd like to discuss a ${project} for our healthcare organization.`,
                                            {
                                                Intent: "Healthcare project",
                                                Project: project,
                                            }
                                        )
                                    }
                                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/50"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xs font-black text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <span className="flex-1 text-sm font-bold">{project}</span>

                                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-sky-500" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section
                id="healthcare-process"
                className="py-20 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                            How we work
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            A structured path from requirement to reliable operation.
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            We keep the process practical, transparent and focused on the
                            actual outcome the organization needs.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {process.map(({ number, title, text }) => (
                            <div
                                key={number}
                                className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                            >
                                <div className="text-4xl font-black tracking-tight text-sky-100 dark:text-sky-950">
                                    {number}
                                </div>

                                <h3 className="mt-3 text-lg font-black">{title}</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECURITY */}
            <section className="relative overflow-hidden border-y border-slate-200/70 bg-white py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28">
                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-400/10 dark:text-emerald-300">
                                <ShieldCheck className="h-4 w-4" />
                                Security by design
                            </div>

                            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
                                Protect the technology environment without making it harder to
                                use.
                            </h2>

                            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
                                Healthcare environments depend on reliable access to systems
                                and information. Our technology approach considers identity,
                                devices, networks, backups, access controls and operational
                                resilience as part of the overall solution.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                ["Identity", "User access and authentication", KeyRound],
                                ["Endpoints", "Device configuration and protection", Laptop],
                                ["Networks", "Segmentation and secure connectivity", Network],
                                ["Backups", "Recovery-focused data protection", Database],
                                ["Monitoring", "Visibility into technology operations", BellRing],
                                ["Continuity", "Planning for operational resilience", Activity],
                            ].map(([title, text, Icon]) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]"
                                >
                                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    <div className="mt-4 font-black">{title}</div>
                                    <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        {text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MANAGED SUPPORT */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-8 dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/30 sm:p-10 lg:p-14">
                        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                            <div>
                                <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
                                    Managed IT support
                                </div>

                                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                    Don't let your technology become a problem after deployment.
                                </h2>

                                <p className="mt-5 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
                                    We can continue working with healthcare organizations after
                                    implementation to keep systems maintained, users supported
                                    and infrastructure aligned with changing operational needs.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {[
                                        "Technical support",
                                        "Troubleshooting",
                                        "Maintenance",
                                        "Device support",
                                        "Network support",
                                        "Cloud support",
                                        "Updates",
                                        "Technology planning",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold dark:border-white/10 dark:bg-white/[0.05]"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl dark:border-white/10 dark:bg-black/20">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                                        <Headphones className="h-7 w-7" />
                                    </div>

                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">
                                            Ongoing partnership
                                        </div>
                                        <div className="mt-1 text-xl font-black">
                                            Technology support lifecycle
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7 space-y-3">
                                    {[
                                        "Monitor",
                                        "Maintain",
                                        "Troubleshoot",
                                        "Improve",
                                        "Upgrade",
                                        "Plan next",
                                    ].map((item, index) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/[0.04]"
                                        >
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500 text-xs font-black text-white">
                                                {index + 1}
                                            </div>
                                            <span className="text-sm font-bold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CUSTOM SOFTWARE */}
            <section className="border-y border-slate-200/70 bg-slate-100/60 py-20 dark:border-white/10 dark:bg-slate-900/40 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl dark:border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                                    Custom healthcare systems
                                </div>
                                <Cpu className="h-5 w-5 text-cyan-300" />
                            </div>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Patient-facing portals",
                                    "Internal dashboards",
                                    "Administrative systems",
                                    "Inventory management",
                                    "Appointment workflows",
                                    "Document management",
                                    "Reporting platforms",
                                    "Custom integrations",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                                        <span className="text-sm font-semibold text-slate-200">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
                                Software & digital solutions
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                When your workflow is unique, your software can be too.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                Not every healthcare organization works the same way. Where
                                existing software does not fit the workflow, custom software
                                can be designed around specific operational requirements.
                            </p>

                            <div className="mt-7 space-y-4">
                                {[
                                    "Analyze the existing workflow",
                                    "Define users, roles and permissions",
                                    "Design the required experience",
                                    "Develop the application",
                                    "Integrate required systems",
                                    "Test, deploy and support",
                                ].map((item, index) => (
                                    <div key={item} className="flex items-center gap-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                                            {index + 1}
                                        </div>
                                        <span className="text-sm font-bold">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                            Why work with us
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            One coordinated technology relationship instead of fragmented
                            projects.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {reasons.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                            >
                                <div className="inline-flex rounded-2xl bg-slate-100 p-3.5 text-slate-700 dark:bg-white/[0.07] dark:text-slate-200">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <h3 className="mt-6 text-lg font-black">{title}</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCUREMENT CHECKLIST */}
            <section className="border-y border-slate-200/70 bg-slate-100/70 py-20 dark:border-white/10 dark:bg-slate-900/50 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                                Better procurement planning
                            </div>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                                Start with the requirement, not the product.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                                A good procurement project begins with understanding what the
                                organization needs to accomplish. We can help convert that
                                requirement into specifications that make supplier evaluation
                                easier.
                            </p>

                            <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900/60 dark:bg-orange-400/5">
                                <div className="flex gap-4">
                                    <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400" />
                                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                                        Procurement can include specification development,
                                        comparative quotations, supplier sourcing, product
                                        verification, quantity planning and delivery coordination.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-slate-950/40">
                            <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                                Procurement considerations
                            </div>

                            <div className="mt-6 space-y-4">
                                {[
                                    ["Requirements", "What must the technology accomplish?"],
                                    ["Specifications", "What technical characteristics are required?"],
                                    ["Quantity", "How many users, departments or locations?"],
                                    ["Compatibility", "Will the solution work with existing systems?"],
                                    ["Security", "What security and access requirements apply?"],
                                    ["Budget", "What options fit the available investment?"],
                                    ["Delivery", "Where and when must the technology arrive?"],
                                    ["Support", "How will the technology be maintained afterward?"],
                                ].map(([title, text]) => (
                                    <div
                                        key={title}
                                        className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-white/10"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                                        <div>
                                            <div className="text-sm font-black">{title}</div>
                                            <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                {text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCALE */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.035] sm:p-10 lg:p-14">
                        <div className="grid gap-10 lg:grid-cols-3">
                            <div>
                                <div className="text-4xl font-black text-sky-600 dark:text-sky-400">
                                    01
                                </div>
                                <h3 className="mt-4 text-xl font-black">Small facility</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    Start with essential workstations, networking, security,
                                    connectivity, software and support.
                                </p>
                            </div>

                            <div className="border-t border-slate-200 pt-8 dark:border-white/10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                                <div className="text-4xl font-black text-teal-600 dark:text-teal-400">
                                    02
                                </div>
                                <h3 className="mt-4 text-xl font-black">
                                    Growing organization
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    Standardize technology across departments, users and
                                    locations while improving infrastructure and support.
                                </p>
                            </div>

                            <div className="border-t border-slate-200 pt-8 dark:border-white/10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                                <div className="text-4xl font-black text-violet-600 dark:text-violet-400">
                                    03
                                </div>
                                <h3 className="mt-4 text-xl font-black">
                                    Enterprise healthcare
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    Coordinate complex infrastructure, applications, security,
                                    procurement and managed support across larger environments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden pb-20 lg:pb-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-14 text-white shadow-2xl sm:px-10 lg:px-16 lg:py-20">
                        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
                        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />

                        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div className="max-w-3xl">
                                <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
                                    Start a healthcare technology project
                                </div>

                                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                    Tell us what your healthcare organization needs.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                                    Whether you need a few devices, a complete clinic setup,
                                    infrastructure modernization, custom software or ongoing IT
                                    support, we can help you structure the next step.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to request a quote for a healthcare technology project.",
                                            {
                                                Intent: "Request a quote",
                                                Department: "Healthcare",
                                            }
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                                >
                                    Request a Quote
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                <a
                                    href="#healthcare-solutions"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/[0.1]"
                                >
                                    Explore Solutions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-slate-200/70 bg-white py-20 dark:border-white/10 dark:bg-slate-900/30 lg:py-28">
                <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                            Frequently asked questions
                        </div>

                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                            Common healthcare technology questions.
                        </h2>
                    </div>

                    <div className="mt-12 space-y-3">
                        {faqs.map(({ q, a }) => (
                            <details
                                key={q}
                                className="group rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 dark:border-white/10 dark:bg-white/[0.035]"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-black">
                                    <span>{q}</span>
                                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-90" />
                                </summary>

                                <p className="mt-4 max-w-4xl pr-8 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL TRUST STRIP */}
            <section className="py-14">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                            <BadgeCheck className="h-6 w-6 text-emerald-500" />
                            <div>
                                <div className="text-sm font-black">Requirement-led</div>
                                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Solutions start with your actual needs.
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                            <PackageCheck className="h-6 w-6 text-sky-500" />
                            <div>
                                <div className="text-sm font-black">Procurement-ready</div>
                                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    From specifications to delivery coordination.
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                            <Headphones className="h-6 w-6 text-violet-500" />
                            <div>
                                <div className="text-sm font-black">Support beyond delivery</div>
                                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    Technology can be supported throughout its lifecycle.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}