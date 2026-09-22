import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    Building2,
    Check,
    ChevronDown,
    Cloud,
    Code2,
    Cpu,
    GraduationCap,
    Headphones,
    Laptop,
    Library,
    Lock,
    Mail,
    Monitor,
    Network,
    Play,
    Server,
    ShieldCheck,
    Sparkles,
    Wifi,
    Wrench,
    Users,
    BarChart3,
    Database,
    Globe2,
    Layers3,
    MessageSquare,
    Settings,
    Smartphone,
    Tablet,
    Video,
    Zap,
    CircleCheck,
    School,
    Microscope,
    Calculator,
    BriefcaseBusiness,
    ClipboardCheck,
    Boxes,
    HardDrive,
    Printer,
    Router,
    Projector,
    Cable,
    KeyRound,
    FileCheck2,
    LifeBuoy,
    Search,
    Quote,
    Menu,
    X,
} from "lucide-react";

import { queueSupportRequest } from "../AI";

/**
 * SchoolsUniversities.jsx
 *
 * INDUSTRY PAGE
 * Schools & Universities
 */

const solutions = [
    {
        icon: Laptop,
        title: "Computers & Student Devices",
        text: "Equip classrooms, laboratories, offices, libraries and student programs with laptops, desktops, tablets, monitors and essential accessories.",
        items: [
            "Student laptops",
            "Faculty computers",
            "Administrative workstations",
            "Computer laboratory systems",
            "Monitors and peripherals",
        ],
    },
    {
        icon: Network,
        title: "Campus Networking",
        text: "Design and deploy dependable wired and wireless infrastructure for classrooms, offices, libraries, hostels and shared campus spaces.",
        items: [
            "Enterprise Wi-Fi",
            "Switching infrastructure",
            "Structured cabling",
            "Network segmentation",
            "Internet connectivity",
        ],
    },
    {
        icon: Cloud,
        title: "Cloud & Digital Infrastructure",
        text: "Build reliable cloud and digital environments for applications, storage, collaboration, learning platforms and institutional operations.",
        items: [
            "Cloud hosting",
            "Managed servers",
            "Cloud storage",
            "Backup infrastructure",
            "Digital platforms",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Security & Access",
        text: "Protect institutional systems, devices, networks, accounts and information with practical security controls and managed support.",
        items: [
            "Endpoint security",
            "Access management",
            "Network security",
            "Backup protection",
            "Security monitoring",
        ],
    },
    {
        icon: GraduationCap,
        title: "Digital Learning",
        text: "Support modern teaching and learning with technology designed around students, lecturers, teachers and administrators.",
        items: [
            "Learning platforms",
            "Virtual classrooms",
            "Digital course delivery",
            "Computer-based testing",
            "Student portals",
        ],
    },
    {
        icon: Code2,
        title: "Software & Applications",
        text: "Create or deploy applications that help educational institutions manage people, processes, records, communication and services.",
        items: [
            "School management systems",
            "Student portals",
            "Staff portals",
            "Custom web applications",
            "Mobile applications",
        ],
    },
];

const procurementCategories = [
    {
        icon: Laptop,
        title: "Computing",
        description:
            "Laptops, desktops, workstations, mini PCs, monitors and computer laboratory systems.",
    },
    {
        icon: Printer,
        title: "Printing",
        description:
            "Printers, scanners, multifunction devices, consumables and document workflow equipment.",
    },
    {
        icon: Network,
        title: "Networking",
        description:
            "Routers, switches, access points, firewalls, racks, cabling and network accessories.",
    },
    {
        icon: Projector,
        title: "Classroom Technology",
        description:
            "Projectors, displays, interactive screens, presentation systems and classroom accessories.",
    },
    {
        icon: Server,
        title: "Servers & Storage",
        description:
            "Servers, NAS systems, storage devices, backup equipment and infrastructure components.",
    },
    {
        icon: Smartphone,
        title: "Mobile Devices",
        description:
            "Tablets, mobile devices and accessories for students, staff, field programs and administration.",
    },
    {
        icon: Wifi,
        title: "Connectivity",
        description:
            "Wireless infrastructure, internet equipment, connectivity accessories and campus networking.",
    },
    {
        icon: Cable,
        title: "Infrastructure",
        description:
            "Racks, patch panels, structured cabling, power accessories and installation materials.",
    },
];

const institutionTypes = [
    "Primary schools",
    "Secondary schools",
    "Private schools",
    "Public schools",
    "Colleges",
    "Polytechnics",
    "Universities",
    "Professional institutes",
    "Vocational institutions",
    "Training centres",
    "Research institutions",
    "Educational NGOs",
];

const deploymentSteps = [
    {
        number: "01",
        icon: Search,
        title: "Understand the institution",
        text: "We begin with your goals, current infrastructure, users, budget, constraints and immediate priorities.",
    },
    {
        number: "02",
        icon: ClipboardCheck,
        title: "Assess the environment",
        text: "We review classrooms, laboratories, offices, connectivity, devices, applications and operational requirements.",
    },
    {
        number: "03",
        icon: Layers3,
        title: "Design the solution",
        text: "We translate requirements into a practical technology, procurement, deployment and support plan.",
    },
    {
        number: "04",
        icon: Boxes,
        title: "Source and procure",
        text: "We identify appropriate products and sourcing options based on specification, quantity, availability and budget.",
    },
    {
        number: "05",
        icon: Wrench,
        title: "Deploy and configure",
        text: "Devices, infrastructure, applications and services are installed, configured and prepared for use.",
    },
    {
        number: "06",
        icon: Users,
        title: "Train users",
        text: "Teachers, lecturers, administrators, technical teams and other users can receive practical onboarding.",
    },
    {
        number: "07",
        icon: ShieldCheck,
        title: "Secure and document",
        text: "We establish appropriate security controls, documentation, asset information and operational procedures.",
    },
    {
        number: "08",
        icon: LifeBuoy,
        title: "Support and improve",
        text: "After deployment, support can continue through managed services, maintenance, monitoring and improvements.",
    },
];

const outcomes = [
    {
        icon: Zap,
        title: "Better learning environments",
        text: "Technology becomes easier for teachers and students to access and use.",
    },
    {
        icon: BarChart3,
        title: "More efficient operations",
        text: "Administrative teams can reduce repetitive work and improve visibility across processes.",
    },
    {
        icon: ShieldCheck,
        title: "Stronger protection",
        text: "Institutional systems and information receive practical security and backup measures.",
    },
    {
        icon: Globe2,
        title: "Connected campuses",
        text: "Students, staff, departments and facilities can communicate through dependable infrastructure.",
    },
    {
        icon: Settings,
        title: "Simpler management",
        text: "Technology environments can be standardized, documented and easier to maintain.",
    },
    {
        icon: Sparkles,
        title: "Room to grow",
        text: "Solutions can be designed to support future users, campuses, departments and programs.",
    },
];

const faqs = [
    {
        q: "Can you help an institution that is starting from scratch?",
        a: "Yes. We can work from the beginning by helping define requirements, recommend an appropriate technology environment, source equipment, deploy infrastructure, configure systems and establish ongoing support.",
    },
    {
        q: "Can you work with an existing IT department?",
        a: "Yes. Our services can complement an internal IT team. We can provide procurement, infrastructure projects, specialist implementation, software development, documentation, training or additional managed support.",
    },
    {
        q: "Can you handle large institutional procurement?",
        a: "Yes. We can support structured procurement requirements involving multiple device categories, departments, campuses or deployment phases. Final quantities, product availability and commercial terms are assessed per project.",
    },
    {
        q: "Can you supply computers for a computer laboratory?",
        a: "Yes. We can help plan laboratory specifications, source compatible systems and peripherals, prepare the network and deploy the environment according to the institution's requirements.",
    },
    {
        q: "Do you provide networking services?",
        a: "Yes. Services can include network planning, structured cabling, switching, wireless access, segmentation, internet infrastructure, configuration, testing and ongoing support.",
    },
    {
        q: "Can you build custom school or university software?",
        a: "Yes. Custom applications can be designed around specific institutional processes rather than forcing the institution into an unsuitable workflow.",
    },
    {
        q: "Can you support online learning?",
        a: "Yes. We can help institutions plan and deploy digital learning environments, collaboration tools, learning platforms, content delivery systems and supporting infrastructure.",
    },
    {
        q: "Do you provide training?",
        a: "Yes. Training can be tailored for administrators, lecturers, teachers, technical teams, students and other users depending on the solution being deployed.",
    },
];

function SectionLabel({ children, icon: Icon = Sparkles }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
            <Icon className="h-3.5 w-3.5" />
            <span>{children}</span>
        </div>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
}) {
    return (
        <div
            className={
                align === "center"
                    ? "mx-auto max-w-3xl text-center"
                    : "max-w-3xl"
            }
        >
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
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

function SoftGridBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />
            <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />

            <div
                className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(30,41,59,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.7) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />
        </div>
    );
}

function CTAButton({
    children,
    secondary = false,
    onClick,
    href = "#contact",
}) {
    const classes = secondary
        ? "group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/25 dark:hover:bg-white/10"
        : "group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-50";

    if (onClick) {
        return (
            <button type="button" onClick={onClick} className={classes}>
                {children}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
        );
    }

    return (
        <a href={href} className={classes}>
            {children}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
    );
}

function StatCard({ value, label }) {
    return (
        <div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="text-2xl font-black text-slate-950 dark:text-white">
                {value}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {label}
            </div>
        </div>
    );
}

function FAQItem({ item, open, onToggle, onDiscuss }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm transition dark:border-white/10 dark:bg-white/[0.04]">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
            >
                <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base dark:text-white">
                    {item.q}
                </span>

                <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-white/10 sm:px-6">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {item.a}
                    </p>

                    {onDiscuss && (
                        <button
                            type="button"
                            onClick={onDiscuss}
                            className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-600 transition hover:gap-3 dark:text-blue-400"
                        >
                            Discuss this with AB AI
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default function SchoolsUniversities() {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(0);
    const [activeType, setActiveType] = useState("All");

    /* ============================================================
       SUPPORT REQUEST HELPER
       ============================================================ */
    const startSupportChat = (message, metadata) => {
        queueSupportRequest({
            message:
                message ||
                "I'd like to discuss Schools & Universities technology solutions for our institution.",
            metadata: metadata || {
                Source: "Schools & Universities",
            },
        });

        navigate("/support/ai");
    };

    const filters = ["All", "Schools", "Universities", "Institutions"];

    const filteredTypes =
        activeType === "All"
            ? institutionTypes
            : activeType === "Schools"
                ? institutionTypes.filter((item) =>
                    item.toLowerCase().includes("school")
                )
                : activeType === "Universities"
                    ? institutionTypes.filter((item) =>
                        ["university", "polytechnic", "college"].some((word) =>
                            item.toLowerCase().includes(word)
                        )
                    )
                    : institutionTypes.filter((item) =>
                        [
                            "institute",
                            "vocational",
                            "training",
                            "research",
                            "educational",
                        ].some((word) => item.toLowerCase().includes(word))
                    );

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#07111f] dark:text-white">
            {/* =========================================================
          HERO
      ========================================================== */}
            <section className="relative isolate">
                <SoftGridBackground />

                <div className="absolute right-[8%] top-28 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_35px_8px_rgba(59,130,246,0.35)] dark:shadow-[0_0_35px_8px_rgba(59,130,246,0.5)]" />
                <div className="absolute left-[10%] top-[55%] h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_30px_8px_rgba(99,102,241,0.3)] dark:shadow-[0_0_30px_8px_rgba(99,102,241,0.5)]" />

                <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
                        <div>
                            <SectionLabel icon={GraduationCap}>
                                Schools & Universities
                            </SectionLabel>

                            <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
                                Build a better
                                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300">
                                    digital institution.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                From a school starting its first computer laboratory to a
                                university modernizing an entire campus, we help educational
                                institutions plan, source, deploy, connect, secure and support
                                the technology they need to operate and teach effectively.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <CTAButton
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to plan technology for our educational institution. Here's what we're trying to achieve:",
                                            {
                                                Source: "Schools & Universities",
                                                Stage: "Hero — plan institution",
                                            }
                                        )
                                    }
                                >
                                    Plan Your Institution
                                </CTAButton>
                                <CTAButton
                                    secondary
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to explore your education technology solutions.",
                                            {
                                                Source: "Schools & Universities",
                                                Stage: "Hero — explore solutions",
                                            }
                                        )
                                    }
                                >
                                    Explore Solutions
                                </CTAButton>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                {[
                                    "Procurement",
                                    "Infrastructure",
                                    "Software",
                                    "Digital Learning",
                                    "Security",
                                    "Managed Support",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Education technology — I'd like to explore: ${item}.`,
                                                {
                                                    Source: "Schools & Universities",
                                                    Focus: item,
                                                }
                                            )
                                        }
                                        className="rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 shadow-sm transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
                                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />

                                <div className="relative rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                                                Institution Technology
                                            </p>
                                            <h2 className="mt-2 text-xl font-black">
                                                Campus Technology Map
                                            </h2>
                                        </div>

                                        <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                                            <School className="h-6 w-6 text-blue-300" />
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        {[
                                            ["Classrooms", Monitor],
                                            ["Laboratories", Microscope],
                                            ["Administration", BriefcaseBusiness],
                                            ["Library", Library],
                                            ["Campus Network", Network],
                                            ["Digital Learning", GraduationCap],
                                        ].map(([name, Icon]) => (
                                            <button
                                                type="button"
                                                key={name}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Campus technology — I'd like to discuss: ${name}.`,
                                                        {
                                                            Source: "Schools & Universities",
                                                            "Campus area": name,
                                                        }
                                                    )
                                                }
                                                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left transition hover:bg-white/[0.1]"
                                            >
                                                <Icon className="h-5 w-5 text-blue-300" />
                                                <p className="mt-3 text-xs font-bold text-slate-200">
                                                    {name}
                                                </p>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to build a fully connected educational environment — devices, network, software, security and support.",
                                                {
                                                    Source: "Schools & Universities",
                                                    Stage: "Hero — connected environment",
                                                }
                                            )
                                        }
                                        className="mt-5 w-full rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-left transition hover:border-blue-400/40"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CircleCheck className="h-5 w-5 text-blue-300" />
                                            <div>
                                                <p className="text-xs font-bold text-white">
                                                    Connected environment
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Devices • Network • Software • Security • Support
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-5 grid grid-cols-3 gap-3">
                                    <StatCard value="360°" label="Technology support" />
                                    <StatCard value="A → Z" label="Project coverage" />
                                    <StatCard value="Scale" label="For every institution" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          TRUST STRIP
      ========================================================== */}
            <section className="border-y border-slate-200 bg-white/60 dark:border-white/10 dark:bg-slate-900/40">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-5 sm:grid-cols-4 sm:px-6 lg:px-8 dark:divide-white/10">
                    {[
                        ["Plan", "Start with your goals"],
                        ["Source", "Find the right products"],
                        ["Deploy", "Make technology work"],
                        ["Support", "Keep it running"],
                    ].map(([title, text]) => (
                        <button
                            type="button"
                            key={title}
                            onClick={() =>
                                startSupportChat(
                                    `Education lifecycle — ${title}: ${text}.`,
                                    {
                                        Source: "Schools & Universities",
                                        Stage: title,
                                    }
                                )
                            }
                            className="px-4 py-6 text-center transition hover:bg-blue-50/50 sm:px-6 dark:hover:bg-blue-500/5"
                        >
                            <p className="text-sm font-black text-slate-950 dark:text-white">
                                {title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {text}
                            </p>
                        </button>
                    ))}
                </div>
            </section>

            {/* =========================================================
          INTRO
      ========================================================== */}
            <section className="relative bg-slate-100 py-20 lg:py-28 dark:bg-[#0a1728]">
                <SoftGridBackground />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                        <SectionHeading
                            eyebrow="More than equipment"
                            title="An institution needs an ecosystem, not a pile of devices."
                            description="A laptop alone does not create a digital campus. Students and staff need reliable connectivity, useful applications, secure access, working devices, support and a clear plan for how everything fits together."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: Cpu,
                                    title: "The right technology",
                                    text: "Specify technology around actual teaching, administration and operational requirements.",
                                },
                                {
                                    icon: Network,
                                    title: "The right infrastructure",
                                    text: "Connect people, devices and systems through a dependable campus environment.",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "The right protection",
                                    text: "Build sensible security, backup and access controls into the environment.",
                                },
                                {
                                    icon: Users,
                                    title: "The right people",
                                    text: "Give users practical training and give technical teams documentation and support.",
                                },
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Institution ecosystem — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Schools & Universities",
                                                Pillar: item.title,
                                            }
                                        )
                                    }
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 font-black text-slate-950 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          SOLUTIONS
      ========================================================== */}
            <section id="solutions" className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Our education solutions"
                        title="Everything your institution needs to move from fragmented technology to a connected environment."
                        description="Choose one service or combine multiple areas into a complete institutional technology program."
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {solutions.map((solution) => (
                            <button
                                type="button"
                                key={solution.title}
                                onClick={() =>
                                    startSupportChat(
                                        `Education solution — ${solution.title}: ${solution.text} Includes: ${solution.items.join(", ")}.`,
                                        {
                                            Source: "Schools & Universities",
                                            Solution: solution.title,
                                        }
                                    )
                                }
                                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/20 dark:hover:bg-white/[0.06]"
                            >
                                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20 dark:bg-blue-400/10 dark:group-hover:bg-blue-400/20" />

                                <div className="relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-300">
                                            <solution.icon className="h-6 w-6" />
                                        </div>

                                        <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-400" />
                                    </div>

                                    <h3 className="mt-7 text-lg font-black text-slate-950 dark:text-white">
                                        {solution.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {solution.text}
                                    </p>

                                    <ul className="mt-6 space-y-3">
                                        {solution.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          START FROM SCRATCH
      ========================================================== */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.18),transparent_35%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.25),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.2),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <SectionLabel icon={Sparkles}>Starting from scratch?</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                You don't have to know what to buy before you talk to us.
                            </h2>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                Tell us what you are trying to achieve. We can help turn the
                                objective into requirements, specifications, procurement
                                options, implementation steps and a support plan.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "New computer laboratory",
                                    "Campus-wide Wi-Fi",
                                    "School management platform",
                                    "Digital learning program",
                                    "University technology refresh",
                                    "Office & administration setup",
                                    "Student device program",
                                    "Complete IT deployment",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Starting from scratch — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Schools & Universities",
                                                    "Starting point": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left transition hover:border-blue-400/40 hover:bg-white/[0.08]"
                                    >
                                        <CircleCheck className="h-4 w-4 shrink-0 text-blue-300" />
                                        <span className="text-sm font-semibold text-slate-200">
                                            {item}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-9">
                                <CTAButton
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to start with our institutional requirement — here's what we need:",
                                            {
                                                Source: "Schools & Universities",
                                                Stage: "From scratch — start with requirement",
                                            }
                                        )
                                    }
                                >
                                    Start With Your Requirement
                                </CTAButton>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />

                            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6">
                                    <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                                            <MessageSquare className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                                                Requirement
                                            </p>
                                            <p className="mt-1 text-sm font-bold">
                                                "We are building a new campus."
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 py-6">
                                        {[
                                            ["Discover", "Campus requirements"],
                                            ["Design", "Technology architecture"],
                                            ["Source", "Equipment & services"],
                                            ["Deploy", "Infrastructure & systems"],
                                            ["Train", "Users & administrators"],
                                            ["Support", "Ongoing operations"],
                                        ].map(([step, text], index) => (
                                            <button
                                                type="button"
                                                key={step}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Project stage — ${step}: ${text}.`,
                                                        {
                                                            Source: "Schools & Universities",
                                                            Stage: `${String(index + 1).padStart(2, "0")} — ${step}`,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-300">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>

                                                <div>
                                                    <p className="text-xs font-black">{step}</p>
                                                    <p className="text-xs text-slate-400">{text}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to discuss how one coordinated approach can reduce the gap between procurement, infrastructure, software and support.",
                                                {
                                                    Source: "Schools & Universities",
                                                    Stage: "From scratch — coordinated approach",
                                                }
                                            )
                                        }
                                        className="w-full rounded-xl bg-blue-500/10 p-4 text-left transition hover:bg-blue-500/15"
                                    >
                                        <p className="text-xs font-semibold leading-6 text-blue-100">
                                            One coordinated approach can reduce the gap between
                                            procurement, infrastructure, software and support.
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          PROCUREMENT
      ========================================================== */}
            <section
                id="procurement"
                className="relative bg-slate-100 py-20 lg:py-28 dark:bg-[#0a1728]"
            >
                <SoftGridBackground />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
                        <SectionHeading
                            eyebrow="Institutional procurement"
                            title="From a single device to a complete campus technology requirement."
                            description="Procurement can be handled as an individual requirement or as part of a larger project involving multiple departments, device categories and deployment phases."
                        />

                        <CTAButton
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to discuss institutional procurement for our school or university.",
                                    {
                                        Source: "Schools & Universities",
                                        Stage: "Procurement CTA",
                                    }
                                )
                            }
                        >
                            Discuss Procurement
                        </CTAButton>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {procurementCategories.map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `Procurement category — ${item.title}: ${item.description}`,
                                        {
                                            Source: "Schools & Universities",
                                            "Procurement category": item.title,
                                        }
                                    )
                                }
                                className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                    <item.icon className="h-5 w-5" />
                                </div>

                                <h3 className="mt-5 text-sm font-black text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
                        <div className="grid gap-8 lg:grid-cols-3">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">
                                    Procurement support
                                </p>
                                <h3 className="mt-3 text-xl font-black text-slate-950 dark:text-white">
                                    We can help define the specification before sourcing.
                                </h3>
                            </div>

                            <div className="lg:col-span-2 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Requirement gathering",
                                    "Technical specifications",
                                    "Product comparison",
                                    "Quantity planning",
                                    "Vendor sourcing",
                                    "Competitive quotations",
                                    "Delivery coordination",
                                    "Asset documentation",
                                    "Installation planning",
                                    "Post-delivery support",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Procurement support — I'd like help with: ${item}.`,
                                                {
                                                    Source: "Schools & Universities",
                                                    "Procurement support": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-left text-xs font-bold text-slate-700 transition hover:bg-blue-50 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-blue-500/10"
                                    >
                                        <Check className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          DIGITAL LEARNING
      ========================================================== */}
            <section className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                        <div className="relative order-2 lg:order-1">
                            <div className="absolute -inset-10 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl dark:border-white/10">
                                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                                                Digital Learning
                                            </p>
                                            <h3 className="mt-2 text-xl font-black text-white">
                                                Connected learning environment
                                            </h3>
                                        </div>
                                        <BookOpen className="h-6 w-6 text-cyan-300" />
                                    </div>

                                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                        {[
                                            ["Courses", BookOpen],
                                            ["Live Classes", Video],
                                            ["Assessments", ClipboardCheck],
                                            ["Resources", Library],
                                            ["Student Access", Users],
                                            ["Analytics", BarChart3],
                                        ].map(([name, Icon]) => (
                                            <button
                                                type="button"
                                                key={name}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Digital learning — I'd like to discuss: ${name}.`,
                                                        {
                                                            Source: "Schools & Universities",
                                                            "Digital learning": name,
                                                        }
                                                    )
                                                }
                                                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-cyan-400/40"
                                            >
                                                <Icon className="h-5 w-5 text-cyan-300" />
                                                <p className="mt-3 text-xs font-bold text-slate-200">
                                                    {name}
                                                </p>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                                    </div>

                                    <p className="mt-3 text-xs text-slate-400">
                                        Designed to support flexible teaching and learning.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <SectionHeading
                                eyebrow="Digital learning"
                                title="Technology that supports the classroom beyond the classroom."
                                description="Modern education increasingly depends on digital access. We help institutions create the infrastructure and software foundation needed for online resources, collaboration, assessments and learning workflows."
                            />

                            <div className="mt-8 space-y-4">
                                {[
                                    {
                                        icon: BookOpen,
                                        title: "Learning platforms",
                                        text: "Support digital course organization, learning resources, assignments and student access.",
                                    },
                                    {
                                        icon: Video,
                                        title: "Virtual collaboration",
                                        text: "Enable remote and hybrid teaching with appropriate communication and collaboration tools.",
                                    },
                                    {
                                        icon: Calculator,
                                        title: "Digital assessment",
                                        text: "Support computer-based testing, online assignments and structured assessment workflows.",
                                    },
                                    {
                                        icon: BarChart3,
                                        title: "Visibility & reporting",
                                        text: "Help administrators understand usage, participation and operational performance.",
                                    },
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item.title}
                                        onClick={() =>
                                            startSupportChat(
                                                `Digital learning — ${item.title}: ${item.text}`,
                                                {
                                                    Source: "Schools & Universities",
                                                    "Digital learning area": item.title,
                                                }
                                            )
                                        }
                                        className="flex w-full gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-300">
                                            <item.icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-black text-slate-950 dark:text-white">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                {item.text}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          NETWORK
      ========================================================== */}
            <section className="relative overflow-hidden bg-blue-50 py-20 lg:py-28 dark:bg-[#0a1b30]">
                <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-400/10" />
                <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-400/10" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Campus connectivity"
                        title="A campus is only as useful as its ability to connect people and systems."
                        description="We can help institutions plan connectivity across classrooms, administrative offices, laboratories, libraries, halls, hostels and other relevant areas."
                    />

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {[
                            {
                                icon: Wifi,
                                title: "Wireless campus",
                                text: "Design practical Wi-Fi coverage for users, devices and high-demand learning spaces.",
                            },
                            {
                                icon: Cable,
                                title: "Structured infrastructure",
                                text: "Build organized cabling and physical infrastructure that can be maintained and expanded.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Secure network",
                                text: "Separate users, devices and services where appropriate and establish sensible access controls.",
                            },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `Campus connectivity — ${item.title}: ${item.text}`,
                                        {
                                            Source: "Schools & Universities",
                                            "Connectivity area": item.title,
                                        }
                                    )
                                }
                                className="rounded-[1.75rem] border border-blue-100 bg-white/80 p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                    <item.icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-6 text-lg font-black text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.text}
                                </p>

                                <div className="mt-6 h-px bg-slate-200 dark:bg-white/10" />

                                <div className="mt-5 space-y-3">
                                    {[
                                        "Planning",
                                        "Configuration",
                                        "Testing",
                                        "Documentation",
                                    ].map((point) => (
                                        <div
                                            key={point}
                                            className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300"
                                        >
                                            <CircleCheck className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                            {point}
                                        </div>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          SOFTWARE
      ========================================================== */}
            <section className="relative bg-slate-950 py-20 text-white lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.15),transparent_32%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <SectionLabel icon={Code2}>Software & applications</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                Software built around how your institution actually works.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                When off-the-shelf software does not fit the workflow, a
                                custom application can connect students, staff, departments,
                                records and services in one environment.
                            </p>

                            <div className="mt-8">
                                <CTAButton
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to discuss a custom software project for our institution.",
                                            {
                                                Source: "Schools & Universities",
                                                Stage: "Software — discuss project",
                                            }
                                        )
                                    }
                                >
                                    Discuss a Software Project
                                </CTAButton>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: GraduationCap,
                                    title: "Student management",
                                    text: "Student records, portals, enrollment workflows and access.",
                                },
                                {
                                    icon: Users,
                                    title: "Staff management",
                                    text: "Staff portals, workflows, permissions and institutional communication.",
                                },
                                {
                                    icon: Calculator,
                                    title: "Fees & finance",
                                    text: "Digital workflows for fees, invoices, receipts and financial records.",
                                },
                                {
                                    icon: Library,
                                    title: "Library systems",
                                    text: "Digital catalogues, resource access and library operations.",
                                },
                                {
                                    icon: ClipboardCheck,
                                    title: "Assessment",
                                    text: "Examinations, assignments, grading and reporting workflows.",
                                },
                                {
                                    icon: MessageSquare,
                                    title: "Communication",
                                    text: "Notices, alerts, messaging and stakeholder communication.",
                                },
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Institutional software — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Schools & Universities",
                                                "Software area": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-left transition hover:border-blue-400/40 hover:bg-white/[0.08]"
                                >
                                    <item.icon className="h-6 w-6 text-blue-300" />
                                    <h3 className="mt-5 text-sm font-black">{item.title}</h3>
                                    <p className="mt-2 text-xs leading-6 text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          SECURITY
      ========================================================== */}
            <section className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <SectionHeading
                                eyebrow="Security & resilience"
                                title="Protect the systems that keep education moving."
                                description="Educational institutions hold valuable information and operate many connected devices. Security should therefore be part of the design, not an afterthought."
                            />

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Identity & access",
                                    "Endpoint protection",
                                    "Network controls",
                                    "Backup strategy",
                                    "Data protection",
                                    "Security awareness",
                                    "Device policies",
                                    "Recovery planning",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Institutional security — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Schools & Universities",
                                                    "Security area": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs font-bold text-slate-700 transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-blue-400/30"
                                    >
                                        <ShieldCheck className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />

                            <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">
                                                Protection layers
                                            </p>
                                            <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                                                Institutional resilience
                                            </h3>
                                        </div>
                                        <Lock className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                                    </div>

                                    <div className="mt-8 space-y-3">
                                        {[
                                            ["Users", "Identity & access"],
                                            ["Devices", "Endpoint controls"],
                                            ["Network", "Traffic & segmentation"],
                                            ["Applications", "Permissions & protection"],
                                            ["Data", "Backup & recovery"],
                                        ].map(([layer, description], index) => (
                                            <button
                                                type="button"
                                                key={layer}
                                                onClick={() =>
                                                    startSupportChat(
                                                        `Protection layer — ${layer}: ${description}.`,
                                                        {
                                                            Source: "Schools & Universities",
                                                            "Protection layer": layer,
                                                        }
                                                    )
                                                }
                                                className="flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 dark:text-white">
                                                        {layer}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                        {description}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          IT LABS
      ========================================================== */}
            <section className="relative bg-slate-100 py-20 lg:py-28 dark:bg-[#0a1728]">
                <SoftGridBackground />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Computer laboratories"
                        title="Plan the lab as a complete environment."
                        description="A successful computer laboratory requires more than computers. Power, networking, furniture, software, security, user management and support all contribute to the final experience."
                        align="center"
                    />

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [Laptop, "Workstations"],
                            [Monitor, "Displays"],
                            [Network, "Networking"],
                            [Server, "Server / Services"],
                            [Cable, "Structured Cabling"],
                            [ShieldCheck, "Security"],
                            [Zap, "Power"],
                            [Wrench, "Maintenance"],
                            [Code2, "Software"],
                            [Printer, "Printing"],
                            [Users, "User Accounts"],
                            [BarChart3, "Monitoring"],
                        ].map(([Icon, title]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `Computer laboratory — I'd like to discuss: ${title}.`,
                                        {
                                            Source: "Schools & Universities",
                                            "Lab component": title,
                                        }
                                    )
                                }
                                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-black text-slate-800 dark:text-white">
                                    {title}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-4 lg:grid-cols-3">
                        {[
                            "New laboratory planning",
                            "Existing laboratory upgrades",
                            "Laboratory networking",
                            "Device deployment",
                            "Software preparation",
                            "Ongoing maintenance",
                        ].map((item) => (
                            <button
                                type="button"
                                key={item}
                                onClick={() =>
                                    startSupportChat(
                                        `Computer laboratory — I'd like to discuss: ${item}.`,
                                        {
                                            Source: "Schools & Universities",
                                            "Lab project": item,
                                        }
                                    )
                                }
                                className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-left transition hover:border-blue-300 dark:border-blue-400/10 dark:bg-blue-500/[0.06] dark:hover:border-blue-400/40"
                            >
                                <CircleCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <p className="mt-4 text-sm font-black text-slate-900 dark:text-white">
                                    {item}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          CAMPUS INFRASTRUCTURE
      ========================================================== */}
            <section className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        {[
                            {
                                icon: Building2,
                                title: "Academic spaces",
                                text: "Classrooms, lecture halls, laboratories, libraries, research spaces and teaching environments.",
                            },
                            {
                                icon: BriefcaseBusiness,
                                title: "Administrative spaces",
                                text: "Admissions, finance, HR, management, registrars, faculty offices and departmental operations.",
                            },
                            {
                                icon: Globe2,
                                title: "Connected facilities",
                                text: "Hostels, campuses, shared spaces, student services and other facilities that depend on technology.",
                            },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `Campus infrastructure — ${item.title}: ${item.text}`,
                                        {
                                            Source: "Schools & Universities",
                                            "Campus space": item.title,
                                        }
                                    )
                                }
                                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <item.icon className="h-7 w-7 text-blue-600 dark:text-blue-300" />
                                <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          HOW WE WORK
      ========================================================== */}
            <section
                id="how-we-work"
                className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_40%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="How we work"
                        title="One structured process from requirement to reliable operation."
                        description="We can enter the project at any stage, but the strongest results come from understanding the full picture before technology is purchased or deployed."
                        align="center"
                    />

                    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {deploymentSteps.map((step) => (
                            <button
                                type="button"
                                key={step.number}
                                onClick={() =>
                                    startSupportChat(
                                        `Deployment process — ${step.title}: ${step.text}`,
                                        {
                                            Source: "Schools & Universities",
                                            Step: `${step.number} — ${step.title}`,
                                        }
                                    )
                                }
                                className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 text-left transition hover:border-blue-400/40 hover:bg-white/[0.07]"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-black text-white/15">
                                        {step.number}
                                    </span>
                                    <step.icon className="h-5 w-5 text-blue-300" />
                                </div>

                                <h3 className="mt-7 text-sm font-black">{step.title}</h3>

                                <p className="mt-3 text-xs leading-6 text-slate-400">
                                    {step.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          INSTITUTION TYPES
      ========================================================== */}
            <section className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Built for education"
                        title="Support for institutions at different stages and scales."
                        description="Whether you are a small school, a growing institution, a university department or a large multi-campus environment, the starting point is understanding your specific requirements."
                    />

                    <div className="mt-10 flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                type="button"
                                key={filter}
                                onClick={() => {
                                    setActiveType(filter);
                                    startSupportChat(
                                        `I'd like to explore support for "${filter}" institutions.`,
                                        {
                                            Source: "Schools & Universities",
                                            Filter: filter,
                                        }
                                    );
                                }}
                                className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${activeType === filter
                                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:bg-white/[0.07]"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredTypes.map((type) => (
                            <button
                                type="button"
                                key={type}
                                onClick={() =>
                                    startSupportChat(
                                        `Institution type — I'd like to discuss solutions for: ${type}.`,
                                        {
                                            Source: "Schools & Universities",
                                            "Institution type": type,
                                        }
                                    )
                                }
                                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <GraduationCap className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                    {type}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          USE CASES
      ========================================================== */}
            <section className="relative bg-slate-100 py-20 lg:py-28 dark:bg-[#0a1728]">
                <SoftGridBackground />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Common projects"
                        title="What can we actually help you build or improve?"
                        description="These are examples of the kinds of institutional technology programs we can support."
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Laptop,
                                title: "New computer laboratory",
                                text: "Plan equipment, network, software, security, installation and ongoing maintenance.",
                            },
                            {
                                icon: Wifi,
                                title: "Campus Wi-Fi project",
                                text: "Assess coverage, design access points, configure infrastructure and improve connectivity.",
                            },
                            {
                                icon: Code2,
                                title: "Custom school platform",
                                text: "Create a tailored system for institutional workflows, users, records and services.",
                            },
                            {
                                icon: Cloud,
                                title: "Cloud migration",
                                text: "Move suitable applications, storage or workloads into a more manageable cloud environment.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Security improvement",
                                text: "Review access, devices, networks, backups and practical security controls.",
                            },
                            {
                                icon: Boxes,
                                title: "Technology refresh",
                                text: "Replace aging infrastructure and standardize equipment across departments or locations.",
                            },
                            {
                                icon: GraduationCap,
                                title: "Digital learning rollout",
                                text: "Build the technical foundation for online learning, content and collaboration.",
                            },
                            {
                                icon: Server,
                                title: "Server deployment",
                                text: "Deploy appropriate servers, storage, applications, backups and supporting infrastructure.",
                            },
                            {
                                icon: Headphones,
                                title: "Managed IT support",
                                text: "Provide ongoing technical assistance, maintenance and technology management.",
                            },
                        ].map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `Education project — ${item.title}: ${item.text}`,
                                        {
                                            Source: "Schools & Universities",
                                            Project: item.title,
                                        }
                                    )
                                }
                                className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/30"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <h3 className="mt-6 text-base font-black text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          MANAGED SUPPORT
      ========================================================== */}
            <section className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/70 p-7 dark:border-white/10 dark:from-white/[0.035] dark:to-blue-500/[0.05] sm:p-10 lg:p-14">
                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                            <div>
                                <SectionLabel icon={Headphones}>Managed support</SectionLabel>

                                <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                    Technology should not stop working when the project ends.
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    Ongoing support can help institutions maintain devices,
                                    networks, applications, users and infrastructure after
                                    deployment.
                                </p>

                                <div className="mt-8">
                                    <CTAButton
                                        onClick={() =>
                                            startSupportChat(
                                                "I'd like to talk about managed support for our institution.",
                                                {
                                                    Source: "Schools & Universities",
                                                    Stage: "Managed support CTA",
                                                }
                                            )
                                        }
                                    >
                                        Talk About Support
                                    </CTAButton>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    "Remote technical support",
                                    "On-site assistance",
                                    "Device troubleshooting",
                                    "Network troubleshooting",
                                    "Software support",
                                    "User assistance",
                                    "Maintenance planning",
                                    "System monitoring",
                                    "Backup checks",
                                    "Technology documentation",
                                    "Vendor coordination",
                                    "Upgrade planning",
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() =>
                                            startSupportChat(
                                                `Managed support — I'd like to discuss: ${item}.`,
                                                {
                                                    Source: "Schools & Universities",
                                                    "Support area": item,
                                                }
                                            )
                                        }
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-xs font-bold text-slate-700 transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/30"
                                    >
                                        <Headphones className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          AI ASSISTED REQUIREMENTS
      ========================================================== */}
            <section className="relative overflow-hidden bg-blue-600 py-20 text-white lg:py-28 dark:bg-blue-700">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-slate-950/20 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                                <Sparkles className="h-3.5 w-3.5" />
                                Smarter project discovery
                            </div>

                            <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                                Describe what your institution needs. Start from the outcome,
                                not the product.
                            </h2>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100">
                                An AI-assisted request workflow can help turn a natural
                                language requirement into a structured project brief for
                                review, refinement and quotation.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Computer lab for 100 students",
                                    "Campus Wi-Fi upgrade",
                                    "School management system",
                                    "University device procurement",
                                ].map((prompt) => (
                                    <button
                                        type="button"
                                        key={prompt}
                                        onClick={() =>
                                            startSupportChat(
                                                `Requirement example: "${prompt}"`,
                                                {
                                                    Source: "Schools & Universities",
                                                    "Example prompt": prompt,
                                                }
                                            )
                                        }
                                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20"
                                    >
                                        "{prompt}"
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                            <div className="w-full max-w-sm rounded-[1.5rem] bg-white p-6 text-slate-950 shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black">AI Project Assistant</p>
                                        <p className="text-[11px] text-slate-500">
                                            Requirement discovery
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-xl bg-slate-100 p-4">
                                    <p className="text-xs leading-6 text-slate-700">
                                        "We need to equip a new secondary school with computers,
                                        internet, Wi-Fi and software."
                                    </p>
                                </div>

                                <div className="mt-4 space-y-2">
                                    {[
                                        "Computer laboratory",
                                        "Campus networking",
                                        "Internet infrastructure",
                                        "Software & licensing",
                                        "Security & support",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5"
                                        >
                                            <Check className="h-3.5 w-3.5 text-blue-600" />
                                            <span className="text-[11px] font-bold">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startSupportChat(
                                            "I'd like to use the AI-assisted request workflow. Here's what our institution needs:",
                                            {
                                                Source: "Schools & Universities",
                                                Stage: "AI assistant — start request",
                                            }
                                        )
                                    }
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-700"
                                >
                                    Start an AI-Assisted Request
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          OUTCOMES
      ========================================================== */}
            <section className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="What good technology should achieve"
                        title="The goal is not more technology. The goal is a better institution."
                        description="Technology investments should make teaching, learning, administration, communication and decision-making easier—not simply increase the number of devices on campus."
                        align="center"
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {outcomes.map((item) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() =>
                                    startSupportChat(
                                        `Institutional outcome — ${item.title}: ${item.text}`,
                                        {
                                            Source: "Schools & Universities",
                                            Outcome: item.title,
                                        }
                                    )
                                }
                                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                            >
                                <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          PROCUREMENT JOURNEY
      ========================================================== */}
            <section className="relative bg-slate-100 py-20 lg:py-28 dark:bg-[#0a1728]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <SectionHeading
                                eyebrow="From request to delivery"
                                title="A procurement process that can connect purchasing with implementation."
                                description="For larger requirements, the value is not only finding equipment. It is ensuring that what is purchased is appropriate, compatible and ready to become part of the institution."
                            />
                        </div>

                        <div className="space-y-3">
                            {[
                                ["01", "Requirement", "What does the institution actually need?"],
                                ["02", "Specification", "What technical characteristics should the solution have?"],
                                ["03", "Sourcing", "Which appropriate products and suppliers are available?"],
                                ["04", "Quotation", "What are the viable commercial options?"],
                                ["05", "Approval", "Which option aligns with the approved requirement and budget?"],
                                ["06", "Delivery", "How will the equipment reach the institution?"],
                                ["07", "Deployment", "How will devices and infrastructure be installed?"],
                                ["08", "Support", "How will the environment be maintained afterward?"],
                            ].map(([number, title, text]) => (
                                <button
                                    type="button"
                                    key={number}
                                    onClick={() =>
                                        startSupportChat(
                                            `Procurement journey — ${title}: ${text}`,
                                            {
                                                Source: "Schools & Universities",
                                                Step: `${number} — ${title}`,
                                            }
                                        )
                                    }
                                    className="flex w-full gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                        {number}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-950 dark:text-white">
                                            {title}
                                        </h3>
                                        <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                                            {text}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          HARDWARE CATALOGUE CONCEPT
      ========================================================== */}
            <section className="relative bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Technology categories"
                        title="A broader technology market for education."
                        description="Institutional requirements often span multiple product categories. Your technology plan can bring hardware, software, infrastructure and services together instead of treating every purchase as an isolated transaction."
                    />

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {[
                            [Laptop, "Laptops"],
                            [Monitor, "Monitors"],
                            [Tablet, "Tablets"],
                            [Printer, "Printers"],
                            [Server, "Servers"],
                            [Router, "Routers"],
                            [Network, "Switches"],
                            [Wifi, "Access Points"],
                            [Projector, "Projectors"],
                            [HardDrive, "Storage"],
                            [Cable, "Cabling"],
                            [Cpu, "Workstations"],
                            [Smartphone, "Mobile Devices"],
                            [Database, "Data Systems"],
                            [Cloud, "Cloud Services"],
                        ].map(([Icon, title]) => (
                            <button
                                type="button"
                                key={title}
                                onClick={() =>
                                    startSupportChat(
                                        `Education technology category — I'd like to discuss: ${title}.`,
                                        {
                                            Source: "Schools & Universities",
                                            Category: title,
                                        }
                                    )
                                }
                                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.06] dark:hover:border-blue-400/30"
                            >
                                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                <p className="mt-4 text-xs font-black text-slate-800 dark:text-white">
                                    {title}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          WHY US
      ========================================================== */}
            <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.15),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                        <div>
                            <SectionLabel icon={CircleCheck}>Why work with us</SectionLabel>

                            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                                One technology partner across the journey.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                Instead of coordinating every technology requirement with a
                                different provider, institutions can use one structured
                                relationship across procurement, software, infrastructure,
                                deployment and support.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    title: "End-to-end thinking",
                                    text: "We look beyond the immediate purchase and consider how the solution will be deployed and supported.",
                                },
                                {
                                    title: "Practical recommendations",
                                    text: "Requirements and budgets differ. We focus on fit rather than simply presenting the most expensive option.",
                                },
                                {
                                    title: "Technology + services",
                                    text: "Hardware can be combined with networking, software, security, cloud and support.",
                                },
                                {
                                    title: "Built to scale",
                                    text: "Projects can be phased so institutions can expand as budgets, users and requirements grow.",
                                },
                                {
                                    title: "Clear communication",
                                    text: "Requirements, specifications, implementation steps and support expectations can be documented.",
                                },
                                {
                                    title: "Long-term relationship",
                                    text: "The objective is to remain useful after delivery through maintenance, upgrades and support.",
                                },
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item.title}
                                    onClick={() =>
                                        startSupportChat(
                                            `Why partner with AB Technologies — ${item.title}: ${item.text}`,
                                            {
                                                Source: "Schools & Universities",
                                                "Why us": item.title,
                                            }
                                        )
                                    }
                                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 text-left transition hover:border-blue-400/40 hover:bg-white/[0.07]"
                                >
                                    <Check className="h-5 w-5 text-blue-300" />
                                    <h3 className="mt-5 text-sm font-black">{item.title}</h3>
                                    <p className="mt-2 text-xs leading-6 text-slate-400">
                                        {item.text}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          FAQ
      ========================================================== */}
            <section className="relative bg-slate-100 py-20 lg:py-28 dark:bg-[#0a1728]">
                <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Questions"
                        title="Before you start, here are some practical answers."
                        description="Every institutional project is different, so the final scope should be defined around your environment and objectives."
                        align="center"
                    />

                    <div className="mt-10 space-y-3">
                        {faqs.map((item, index) => (
                            <FAQItem
                                key={item.q}
                                item={item}
                                open={openFaq === index}
                                onToggle={() =>
                                    setOpenFaq(openFaq === index ? -1 : index)
                                }
                                onDiscuss={() =>
                                    startSupportChat(
                                        `I have a question about: "${item.q}"`,
                                        {
                                            Source: "Schools & Universities",
                                            FAQ: item.q,
                                        }
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          FINAL CTA
      ========================================================== */}
            <section id="contact" className="relative overflow-hidden bg-white py-20 lg:py-28 dark:bg-[#07111f]">
                <div className="absolute inset-0">
                    <div className="absolute left-[10%] top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />
                    <div className="absolute bottom-0 right-[10%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
                </div>

                <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
                    <SectionLabel icon={GraduationCap}>
                        Let's build something useful
                    </SectionLabel>

                    <h2 className="mt-7 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                        Tell us what your institution is trying to achieve.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                        Whether you need ten computers, a new computer laboratory, campus
                        networking, custom software, digital learning infrastructure,
                        institutional procurement or a complete technology deployment,
                        start with the requirement. We can help you work out the rest.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <CTAButton
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to request a quote for our institution's technology needs. Here's what we need:",
                                    {
                                        Source: "Schools & Universities",
                                        Stage: "Final CTA — request quote",
                                    }
                                )
                            }
                        >
                            Request a Quote
                        </CTAButton>
                        <CTAButton
                            secondary
                            onClick={() =>
                                startSupportChat(
                                    "I'd like to explore your education solutions.",
                                    {
                                        Source: "Schools & Universities",
                                        Stage: "Final CTA — explore solutions",
                                    }
                                )
                            }
                        >
                            Explore Education Solutions
                        </CTAButton>
                    </div>

                    <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
                        {[
                            [Mail, "Discuss a project"],
                            [Headphones, "Talk to support"],
                            [Sparkles, "Start from scratch"],
                        ].map(([Icon, text]) => (
                            <button
                                type="button"
                                key={text}
                                onClick={() =>
                                    startSupportChat(
                                        `I'd like to: ${text}.`,
                                        {
                                            Source: "Schools & Universities",
                                            "Final action": text,
                                        }
                                    )
                                }
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-blue-400/30 dark:hover:text-blue-400"
                            >
                                <Icon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                {text}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
          PAGE FOOTER CTA STRIP
      ========================================================== */}
            <section className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>
                        <p className="text-sm font-black text-slate-950 dark:text-white">
                            Schools & Universities
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Procurement • Infrastructure • Software • Security • Digital Learning • Support
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            startSupportChat(
                                "I'd like to start a conversation about education technology for our institution.",
                                {
                                    Source: "Schools & Universities",
                                    Stage: "Footer — start conversation",
                                }
                            )
                        }
                        className="group inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:gap-3 dark:text-blue-300"
                    >
                        Start a conversation
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </section>
        </main>
    );
}